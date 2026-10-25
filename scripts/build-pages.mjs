// Build the 1.7 release with its original public dependencies, never upstream main.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sim = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), '..' );
const root = path.dirname( sim );
const pins = JSON.parse( readFileSync( path.join( sim, 'dependencies.json' ), 'utf8' ) );
const run = ( command, args, cwd = sim ) => execFileSync( command, args, {
  cwd, stdio: 'inherit', env: {
    ...process.env, PUPPETEER_SKIP_DOWNLOAD: 'true', PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true'
  }
} );

function checkout( name, sha ) {
  const directory = path.join( root, name );
  if ( existsSync( directory ) ) {
    const actual = execFileSync( 'git', [ 'rev-parse', 'HEAD' ], { cwd: directory, encoding: 'utf8' } ).trim();
    if ( actual !== sha ) {
      throw new Error( `${name} is at ${actual}, expected ${sha}. Use a clean sibling workspace.` );
    }
    return;
  }
  mkdirSync( directory );
  run( 'git', [ 'init', '--quiet' ], directory );
  run( 'git', [ 'remote', 'add', 'origin', `https://github.com/phetsims/${name === 'perennial-alias' ? 'perennial' : name}.git` ], directory );
  if ( name === 'babel' ) {
    // English only: locale metadata is needed, the large translation corpus is not.
    run( 'git', [ 'sparse-checkout', 'set', '--no-cone', '/localeData.json', '/package.json', '/LICENSE' ], directory );
  }
  run( 'git', [ 'fetch', '--depth=1', '--filter=blob:none', 'origin', sha ], directory );
  run( 'git', [ 'checkout', '--detach', 'FETCH_HEAD' ], directory );
}

checkout( 'chipper', pins.chipper.sha );
const libraries = JSON.parse( readFileSync( path.join( root, 'chipper/build.json' ), 'utf8' ) ).common.phetLibs;
// babel is deliberately omitted from PhET release manifests. Pin its last commit
// before the 1.7.5 release instead of following its now unsupported main branch.
const babelSHA = 'd0e14b9519b7d35e326eccc6add5b7a42354931b';
for ( const name of libraries ) {
  const sha = name === 'babel' ? babelSHA : pins[ name ]?.sha;
  if ( !sha ) { throw new Error( `No release pin for ${name}` ); }
  checkout( name, sha );
}
for ( const name of [ 'chipper', 'perennial-alias', 'ph-scale' ] ) {
  run( 'npm', [ 'ci', '--no-audit', '--no-fund' ], path.join( root, name ) );
}
// Invoke the same TypeScript build task as Grunt, without the tsx CLI's IPC server.
run( process.execPath, [
  '--import', path.join( root, 'perennial-alias/node_modules/tsx/dist/loader.mjs' ),
  path.join( root, 'chipper/js/grunt/tasks/build.ts' ),
  '--brands=adapted-from-phet', '--locales=en'
] );

const site = path.join( sim, 'build/pages' );
rmSync( site, { recursive: true, force: true } );
mkdirSync( site, { recursive: true } );
const built = path.join( sim, 'build/adapted-from-phet/ph-scale_en_adapted-from-phet.html' );
copyFileSync( built, path.join( site, 'index.html' ) );
copyFileSync( built, path.join( site, 'ph-scale_en.html' ) );
copyFileSync( path.join( sim, 'LICENSE' ), path.join( site, 'LICENSE' ) );
copyFileSync( path.join( sim, 'build/adapted-from-phet/dependencies.json' ), path.join( site, 'dependencies.json' ) );
writeFileSync( path.join( site, '.nojekyll' ), '' );
console.log( `Standalone GitHub Pages site: ${site}` );
