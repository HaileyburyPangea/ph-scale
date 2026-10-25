pH Scale
=============

### Expanded materials branch

The `expanded-materials` branch adds **72 new choices (84 total)** in six labelled,
scrollable groups: Food & drinks, Household & cleaning, Nature & body fluids,
Weird & wonderful, Chemical solutions, and Imaginary samples. Fictional choices
are explicitly marked. Both Macro and Micro have the expanded menu.

[Play the expanded version](https://haileyburypangea.github.io/ph-scale/expanded/).
The workflow for this branch preserves the original `1.7` simulation at the site
root and puts the expanded version at `/expanded/`. A later deployment from `1.7`
can remove the preview; re-run this branch's workflow to restore it.

See [the catalogue and modelling notes](doc/materials.md) for example stock pH
values, references, and the limits of the simplified dilution model.

### Run this fork on GitHub Pages

This fork builds the older **1.7.5** release on branch **`1.7`** into a standalone
simulation. The development launcher `ph-scale_en.html` in the source tree needs
sibling PhET repositories and cannot be served directly by GitHub Pages.

1. Open [Settings → Pages](https://github.com/HaileyburyPangea/ph-scale/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open [Actions → Build GitHub Pages](https://github.com/HaileyburyPangea/ph-scale/actions/workflows/pages.yml).
   Run the workflow on **`1.7`** (or re-run its latest deployment after enabling Pages).
4. Open **https://haileyburypangea.github.io/ph-scale/** after deployment succeeds.

If the `github-pages` environment restricts deployment branches, allow **`1.7`**.
Future pushes to `1.7` automatically rebuild and deploy. `main` is retained as the
unsupported upstream snapshot; it is not used for this build.

The workflow uses PhET's `adapted-from-phet` branding and publishes the actual
simulation as `index.html`, with `ph-scale_en.html` as an alternative URL. Both
are self-contained HTML, with no sibling repositories or build tools needed by
visitors. This hosts the simulation itself; it does not embed the PhET website.

### Reproduce the Pages build locally

Clone this fork as a directory named `ph-scale` inside a fresh parent directory,
check out `1.7`, and use Node.js 22:

```sh
git clone --branch 1.7 https://github.com/HaileyburyPangea/ph-scale.git
node ph-scale/scripts/build-pages.mjs
```

The script clones public dependencies beside `ph-scale` at the exact SHAs in
`dependencies.json`, installs the checked-in npm lockfiles, and builds English
only. Babel's locale metadata uses the pinned commit immediately before the
1.7.5 release, because the release manifest omits Babel. Existing sibling
checkouts must match those SHAs; the script refuses to overwrite other versions.
Proprietary PhET-iO dependencies are not needed. Upstream `WARNING404` messages
about those skipped repositories are expected.

The static site is written to `ph-scale/build/pages/`. Its `LICENSE` and
`dependencies.json` retain the licensing and dependency provenance; original
attributions and third-party notices remain inside the generated simulation.

---

"pH Scale" is an educational simulation in HTML5, by <a href="https://phet.colorado.edu/" target="_blank">PhET
Interactive Simulations</a>
at the University of Colorado Boulder. For a description of this simulation, associated resources, and a link to the
published version,
<a href="https://phet.colorado.edu/en/simulation/ph-scale" target="_blank">visit the simulation's web page</a>.

### Try it!

<a href="https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_en.html" target="_blank">Click here to
run "pH Scale".</a>

<a href="https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_en.html" target="_blank">
<img src="https://raw.githubusercontent.com/phetsims/ph-scale/main/assets/ph-scale-screenshot.png" alt="Screenshot" style="width: 400px;"/>
</a>

### Documentation

The <a href="https://github.com/phetsims/phet-info/blob/main/doc/phet-development-overview.md" target="_blank">PhET
Development Overview</a> is the most complete guide to PhET Simulation Development. This guide includes how to obtain
simulation code and its dependencies, notes about architecture & design, how to test and build the sims, as well as
other important information.

### Quick Start

(1) Clone the simulation and its dependencies:

```
git clone https://github.com/phetsims/assert.git
git clone https://github.com/phetsims/axon.git
git clone https://github.com/phetsims/babel.git
git clone https://github.com/phetsims/brand.git
git clone https://github.com/phetsims/chipper.git
git clone https://github.com/phetsims/dot.git
git clone https://github.com/phetsims/joist.git
git clone https://github.com/phetsims/kite.git
git clone https://github.com/phetsims/perennial.git perennial-alias
git clone https://github.com/phetsims/ph-scale.git
git clone https://github.com/phetsims/phet-core.git
git clone https://github.com/phetsims/phetcommon.git
git clone https://github.com/phetsims/phetmarks.git
git clone https://github.com/phetsims/query-string-machine.git
git clone https://github.com/phetsims/scenery.git
git clone https://github.com/phetsims/scenery-phet.git
git clone https://github.com/phetsims/sherpa.git
git clone https://github.com/phetsims/sun.git
git clone https://github.com/phetsims/tambo.git
git clone https://github.com/phetsims/tandem.git
git clone https://github.com/phetsims/twixt.git
git clone https://github.com/phetsims/utterance-queue.git
```

(2) Install dev dependencies:

```
cd chipper
npm install
cd ../perennial-alias
npm install
cd ../ph-scale
npm install
```

(3) Run `grunt dev-server` to start a local development server that will serve the simulation.

(4) Open in the browser: `http://localhost/ph-scale/ph-scale_en.html`

#### Optional: Build the simulation into a single file

(1) Change directory to the simulation directory: `cd ../ph-scale`

(2) Build the sim: `grunt --brands=adapted-from-phet`. It is safe to ignore warnings
like `>> WARNING404: Skipping potentially non-public dependency`, which indicate that non-public PhET-iO code is not
being included in the build.

(3) Open in the
browser: `http://localhost/ph-scale/build/adapted-from-phet/ph-scale_en_adapted-from-phet.html`

### Get Involved

Contact us at our Google
Group: <a href="http://groups.google.com/forum/#!forum/developing-interactive-simulations-in-html5" target="_blank">
Developing Interactive Simulations in HTML5</a>

Help us improve, create a <a href="http://github.com/phetsims/ph-scale/issues/new" target="_blank">New Issue</a>

### License

See the <a href="https://github.com/phetsims/ph-scale/blob/main/LICENSE" target="_blank">LICENSE</a>
