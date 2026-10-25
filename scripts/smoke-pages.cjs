// Exercise the built artifact, including all three simulation screens.
const assert = require( 'node:assert/strict' );
const path = require( 'node:path' );
const { pathToFileURL } = require( 'node:url' );
const puppeteer = require( '../../perennial-alias/node_modules/puppeteer' );
const { mkdirSync } = require( 'node:fs' );

( async () => {
  const browser = await puppeteer.launch( {
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    headless: true,
    args: [ '--no-sandbox', '--disable-dev-shm-usage' ]
  } );
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on( 'pageerror', error => errors.push( error.message ) );
    await page.goto( pathToFileURL( path.resolve( __dirname, '../build/pages/index.html' ) ).href );
    await page.waitForFunction( () => window.phet?.joist?.sim?.isConstructionCompleteProperty.value, { timeout: 60000 } );
    const screens = await page.evaluate( () => {
      const sim = window.phet.joist.sim;
      return sim.screens.map( screen => screen.nameProperty.value );
    } );
    assert.equal( screens.length, 4, 'Expected a home screen and three simulation screens' );
    for ( let index = 0; index < screens.length; index++ ) {
      await page.evaluate( index => {
        const sim = window.phet.joist.sim;
        sim.selectedScreenProperty.value = sim.screens[ index ];
      }, index );
      await page.evaluate( () => new Promise( resolve => requestAnimationFrame( () => requestAnimationFrame( resolve ) ) ) );
      if ( index === 1 || index === 2 ) {
        const result = await page.evaluate( index => {
          const sim = window.phet.joist.sim;
          const model = sim.screens[ index ].model;
          const menu = Array.from( document.querySelectorAll( 'select.material-select' ) )
            .find( select => select.getBoundingClientRect().width > 0 && select.getBoundingClientRect().height > 0 );
          if ( !menu ) { throw new Error( 'No visible material menu' ); }
          const groups = Array.from( menu.querySelectorAll( 'optgroup' ) ).map( group => group.label );
          const values = Array.from( menu.options ).map( option => option.value );
          if ( Array.from( menu.options ).some( option => !option.textContent.trim() ) ) {
            throw new Error( 'A material has an empty label' );
          }
          if ( new Set( values ).size !== values.length ) { throw new Error( 'Duplicate material IDs' ); }
          for ( const value of values ) {
            menu.value = value;
            menu.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            model.step( 20 );
            const solute = model.dropper.soluteProperty.value;
            if ( solute.tandemName !== value || !Number.isFinite( model.solution.pHProperty.value ) ||
                 Math.abs( model.solution.pHProperty.value - solute.pH ) > 0.011 ) {
              throw new Error( `Material selection/pH failed: ${value}` );
            }
          }
          model.reset();
          const resetSolute = model.dropper.soluteProperty.value;
          if ( menu.value !== resetSolute.tandemName || resetSolute.pH !== 7 ) {
            throw new Error( `Reset mismatch: menu=${menu.value}, model=${resetSolute.tandemName}, pH=${resetSolute.pH}, label=${menu.selectedOptions[ 0 ]?.textContent}` );
          }
          return { count: values.length, groups, resetLabel: menu.selectedOptions[ 0 ]?.textContent };
        }, index );
        assert.equal( result.count, 84 );
        assert.equal( result.groups.length, 6 );
        assert( result.groups.some( group => group.includes( 'Imaginary' ) ) );
        console.log( `Verified ${result.count} materials and ${result.groups.length} labelled groups on ${screens[ index ]}` );
        console.log( `Reset selection label: ${JSON.stringify( result.resetLabel )}` );
        mkdirSync( path.resolve( __dirname, '../build/screenshots' ), { recursive: true } );
        await page.screenshot( { path: path.resolve( __dirname, `../build/screenshots/screen-${index}.png` ) } );
      }
    }
    assert.deepEqual( errors, [], 'The simulation must run without uncaught browser errors' );
    console.log( `Browser smoke test passed: ${screens.join( ', ' )}` );
  }
  finally {
    await browser.close();
  }
} )().catch( error => {
  console.error( error );
  process.exitCode = 1;
} );
