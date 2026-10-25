// Copyright 2013-2025, University of Colorado Boulder
// The expanded fork uses a native select: real optgroup headings, scrolling and
// platform keyboard/type-ahead support remain usable with a large catalogue.
import Property from '../../../../axon/js/Property.js';
import DOM, { DOMOptions } from '../../../../scenery/js/nodes/DOM.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PhScaleStrings from '../../PhScaleStrings.js';
import phScale from '../../phScale.js';
import Solute from '../model/Solute.js';
import { materialGroups } from '../model/MaterialCatalogue.js';

type SoluteComboBoxOptions = { tandem: Tandem; maxWidth?: number };

export default class SoluteComboBox extends DOM {
  public constructor( selectedSoluteProperty: Property<Solute>,
                      soluteListParent: Node,
                      providedOptions: SoluteComboBoxOptions ) {
    const wrapper = document.createElement( 'div' );
    wrapper.style.cssText = 'width:252px;font-family:Arial,sans-serif;color:#222;';
    const label = document.createElement( 'label' );
    label.style.cssText = 'display:block;font-size:15px;font-weight:bold;margin-bottom:5px;';
    const title = document.createElement( 'span' );
    title.style.cssText = 'display:block;margin-bottom:5px;';
    label.appendChild( title );
    const select = document.createElement( 'select' );
    select.className = 'material-select';
    select.style.cssText = 'box-sizing:border-box;width:252px;height:44px;padding:6px 9px;background:white;color:#222;border:2px solid #444;border-radius:8px;font:17px Arial,sans-serif;cursor:pointer;';
    label.appendChild( select );
    wrapper.appendChild( label );
    const note = document.createElement( 'div' );
    note.style.cssText = 'font-size:12px;line-height:1.4;max-width:252px;';
    wrapper.appendChild( note );

    const solutes = selectedSoluteProperty.validValues!;
    for ( const group of materialGroups ) {
      const optgroup = document.createElement( 'optgroup' );
      group.labelProperty.link( value => { optgroup.label = value; } );
      for ( const solute of group.solutes ) {
        if ( !solutes.includes( solute ) ) { continue; }
        const option = document.createElement( 'option' );
        option.value = solute.tandemName;
        solute.nameProperty.link( value => { option.textContent = value; } );
        optgroup.appendChild( option );
      }
      if ( optgroup.children.length ) { select.appendChild( optgroup ); }
    }
    select.addEventListener( 'change', () => {
      const selected = solutes.find( solute => solute.tandemName === select.value );
      if ( selected ) { selectedSoluteProperty.value = selected; }
    } );
    selectedSoluteProperty.link( solute => { select.value = solute.tandemName; } );
    PhScaleStrings.materials.chooseStringProperty.link( value => {
      title.textContent = value;
      select.setAttribute( 'aria-label', value );
    } );
    PhScaleStrings.materials.noteStringProperty.link( value => { note.textContent = value; } );
    PhScaleStrings.materials.modelNoteStringProperty.link( value => { select.title = value; } );

    super( wrapper, { allowInput: true, maxWidth: providedOptions.maxWidth } as DOMOptions );
  }
}

phScale.register( 'SoluteComboBox', SoluteComboBox );
