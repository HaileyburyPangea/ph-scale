// Exercise the built artifact, including all three simulation screens.
const assert = require( 'node:assert/strict' );
const path = require( 'node:path' );
const { pathToFileURL } = require( 'node:url' );
const puppeteer = require( '../../perennial-alias/node_modules/puppeteer' );

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
