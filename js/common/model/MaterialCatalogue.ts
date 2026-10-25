// Material catalogue for the expanded fork. Values are representative teaching examples.
// See doc/materials.md for assumptions, references and limitations.
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PhScaleStrings from '../../PhScaleStrings.js';
import Solute from './Solute.js';

export type MaterialGroup = {
  labelProperty: TReadOnlyProperty<string>;
  solutes: Solute[];
};

const tandem = Tandem.GLOBAL_MODEL.createTandem( 'extraMaterials' );
const create = ( nameProperty: PhetioProperty<string>, id: string, pH: number, color: string ): Solute => {
  return new Solute( nameProperty, pH, new Color( color ), nameProperty, {
    tandem: tandem.createTandem( id )
  } );
};

export const materialGroups: MaterialGroup[] = [
  {
    labelProperty: PhScaleStrings.materials.groups.foodStringProperty,
    solutes: [
      Solute.CHICKEN_SOUP,
      Solute.COFFEE,
      Solute.MILK,
      Solute.ORANGE_JUICE,
      Solute.SODA,
      create( PhScaleStrings.materials.names.lemonJuiceStringProperty, 'lemonJuice', 2.2, '#ffe968' ),
      create( PhScaleStrings.materials.names.limeJuiceStringProperty, 'limeJuice', 2.3, '#d9eb79' ),
      create( PhScaleStrings.materials.names.appleJuiceStringProperty, 'appleJuice', 3.6, '#e6bc58' ),
      create( PhScaleStrings.materials.names.grapefruitJuiceStringProperty, 'grapefruitJuice', 3.2, '#ee9c80' ),
      create( PhScaleStrings.materials.names.pineappleJuiceStringProperty, 'pineappleJuice', 3.5, '#efd66b' ),
      create( PhScaleStrings.materials.names.grapeJuiceStringProperty, 'grapeJuice', 3.3, '#784a87' ),
      create( PhScaleStrings.materials.names.cranberryJuiceStringProperty, 'cranberryJuice', 2.5, '#a82d47' ),
      create( PhScaleStrings.materials.names.tomatoJuiceStringProperty, 'tomatoJuice', 4.2, '#d54a36' ),
      create( PhScaleStrings.materials.names.coconutWaterStringProperty, 'coconutWater', 5.2, '#e7e0c8' ),
      create( PhScaleStrings.materials.names.blackTeaStringProperty, 'blackTea', 5.5, '#b2854e' ),
      create( PhScaleStrings.materials.names.greenTeaStringProperty, 'greenTea', 6, '#bdd09a' ),
      create( PhScaleStrings.materials.names.sparklingWaterStringProperty, 'sparklingWater', 4, '#d6edf4' ),
      create( PhScaleStrings.materials.names.yoghurtStringProperty, 'yoghurt', 4.4, '#f1eee5' ),
      create( PhScaleStrings.materials.names.ketchupStringProperty, 'ketchup', 3.9, '#c63c29' ),
      create( PhScaleStrings.materials.names.mustardStringProperty, 'mustard', 3.6, '#c6a62b' ),
      create( PhScaleStrings.materials.names.mayonnaiseStringProperty, 'mayonnaise', 4, '#f3e6b5' ),
      create( PhScaleStrings.materials.names.honeyWaterStringProperty, 'honeyWater', 4, '#d8a52b' ),
      create( PhScaleStrings.materials.names.whiteVinegarStringProperty, 'whiteVinegar', 2.5, '#ecedda' ),
      create( PhScaleStrings.materials.names.appleCiderVinegarStringProperty, 'appleCiderVinegar', 3, '#c39750' ),
      create( PhScaleStrings.materials.names.soySauceStringProperty, 'soySauce', 4.8, '#5b3b2d' ),
      create( PhScaleStrings.materials.names.hotSauceStringProperty, 'hotSauce', 3.4, '#d36c37' ),
      create( PhScaleStrings.materials.names.oatMilkStringProperty, 'oatMilk', 6.7, '#ede3cb' ),
      create( PhScaleStrings.materials.names.eggWhiteStringProperty, 'eggWhite', 8.5, '#ede9d7' ),
    ].sort( ( a, b ) => a.nameProperty.value.localeCompare( b.nameProperty.value, 'en' ) )
  },
  {
    labelProperty: PhScaleStrings.materials.groups.householdStringProperty,
    solutes: [
      Solute.DRAIN_CLEANER,
      Solute.HAND_SOAP,
      create( PhScaleStrings.materials.names.bakingSodaStringProperty, 'bakingSoda', 8.3, '#e8eef1' ),
      create( PhScaleStrings.materials.names.washingSodaStringProperty, 'washingSoda', 11.5, '#dcecf0' ),
      create( PhScaleStrings.materials.names.dishwashingLiquidStringProperty, 'dishwashingLiquid', 8, '#74c8c0' ),
      create( PhScaleStrings.materials.names.laundryDetergentStringProperty, 'laundryDetergent', 10.5, '#81b0e1' ),
      create( PhScaleStrings.materials.names.shampooStringProperty, 'shampoo', 5.5, '#e9bdde' ),
      create( PhScaleStrings.materials.names.conditionerStringProperty, 'conditioner', 4.5, '#eee5bf' ),
      create( PhScaleStrings.materials.names.toothpasteSlurryStringProperty, 'toothpasteSlurry', 9, '#aed9db' ),
      create( PhScaleStrings.materials.names.mouthwashStringProperty, 'mouthwash', 5, '#8eb9df' ),
      create( PhScaleStrings.materials.names.windowCleanerStringProperty, 'windowCleaner', 10.5, '#9dd3ef' ),
      create( PhScaleStrings.materials.names.householdAmmoniaStringProperty, 'householdAmmonia', 11.5, '#e2edf5' ),
      create( PhScaleStrings.materials.names.chlorineBleachStringProperty, 'chlorineBleach', 12.5, '#eee9ba' ),
      create( PhScaleStrings.materials.names.toiletCleanerStringProperty, 'toiletCleaner', 1.5, '#a0c9e8' ),
      create( PhScaleStrings.materials.names.ovenCleanerStringProperty, 'ovenCleaner', 13.5, '#dce4cf' ),
      create( PhScaleStrings.materials.names.antacidStringProperty, 'antacid', 9.5, '#ecece7' ),
      create( PhScaleStrings.materials.names.contactLensSalineStringProperty, 'contactLensSaline', 7.2, '#d9edf1' ),
    ].sort( ( a, b ) => a.nameProperty.value.localeCompare( b.nameProperty.value, 'en' ) )
  },
  {
    labelProperty: PhScaleStrings.materials.groups.natureStringProperty,
    solutes: [
      Solute.WATER,
      Solute.BLOOD,
      Solute.SPIT,
      Solute.VOMIT,
      create( PhScaleStrings.materials.names.rainwaterStringProperty, 'rainwater', 5.6, '#c3e1f2' ),
      create( PhScaleStrings.materials.names.acidRainStringProperty, 'acidRain', 4.3, '#d8dfc0' ),
      create( PhScaleStrings.materials.names.seawaterStringProperty, 'seawater', 8.1, '#77bac9' ),
      create( PhScaleStrings.materials.names.freshwaterStringProperty, 'freshwater', 7.2, '#a7d3d3' ),
      create( PhScaleStrings.materials.names.tearsStringProperty, 'tears', 7.4, '#d7eaf2' ),
      create( PhScaleStrings.materials.names.sweatStringProperty, 'sweat', 5.5, '#d7e8df' ),
      create( PhScaleStrings.materials.names.urineStringProperty, 'urine', 6, '#ede099' ),
      create( PhScaleStrings.materials.names.stomachFluidStringProperty, 'stomachFluid', 1.5, '#d6d698' ),
      create( PhScaleStrings.materials.names.pancreaticFluidStringProperty, 'pancreaticFluid', 8.2, '#dfdfbc' ),
    ].sort( ( a, b ) => a.nameProperty.value.localeCompare( b.nameProperty.value, 'en' ) )
  },
  {
    labelProperty: PhScaleStrings.materials.groups.unusualStringProperty,
    solutes: [
      create( PhScaleStrings.materials.names.pickleBrineStringProperty, 'pickleBrine', 3.5, '#b9c25e' ),
      create( PhScaleStrings.materials.names.sauerkrautBrineStringProperty, 'sauerkrautBrine', 3.6, '#d7d698' ),
      create( PhScaleStrings.materials.names.kimchiBrineStringProperty, 'kimchiBrine', 4.2, '#cf6945' ),
      create( PhScaleStrings.materials.names.kombuchaStringProperty, 'kombucha', 3, '#d5a35f' ),
      create( PhScaleStrings.materials.names.redCabbageJuiceStringProperty, 'redCabbageJuice', 6.5, '#9465a3' ),
      create( PhScaleStrings.materials.names.beetrootJuiceStringProperty, 'beetrootJuice', 6, '#9b3457' ),
      create( PhScaleStrings.materials.names.blackOliveBrineStringProperty, 'blackOliveBrine', 4, '#938064' ),
      create( PhScaleStrings.materials.names.volcanicLakeStringProperty, 'volcanicLake', 2, '#9cc98e' ),
    ].sort( ( a, b ) => a.nameProperty.value.localeCompare( b.nameProperty.value, 'en' ) )
  },
  {
    labelProperty: PhScaleStrings.materials.groups.labStringProperty,
    solutes: [
      Solute.BATTERY_ACID,
      create( PhScaleStrings.materials.names.hcl01StringProperty, 'hcl01', 1, '#e3eef1' ),
      create( PhScaleStrings.materials.names.hcl001StringProperty, 'hcl001', 2, '#e3eef1' ),
      create( PhScaleStrings.materials.names.hcl0001StringProperty, 'hcl0001', 3, '#e3eef1' ),
      create( PhScaleStrings.materials.names.nitricAcidStringProperty, 'nitricAcid', 2, '#e6edf1' ),
      create( PhScaleStrings.materials.names.aceticAcidStringProperty, 'aceticAcid', 2.9, '#e9eee0' ),
      create( PhScaleStrings.materials.names.ammoniumChlorideStringProperty, 'ammoniumChloride', 5.1, '#e6edf0' ),
      create( PhScaleStrings.materials.names.sodiumChlorideStringProperty, 'sodiumChloride', 7, '#d9ebef' ),
      create( PhScaleStrings.materials.names.sodiumAcetateStringProperty, 'sodiumAcetate', 8.9, '#dee9e7' ),
      create( PhScaleStrings.materials.names.ammonia001StringProperty, 'ammonia001', 10.6, '#e4ecf0' ),
      create( PhScaleStrings.materials.names.naoh0001StringProperty, 'naoh0001', 11, '#e0e9ec' ),
      create( PhScaleStrings.materials.names.naoh001StringProperty, 'naoh001', 12, '#e0e9ec' ),
      create( PhScaleStrings.materials.names.naoh01StringProperty, 'naoh01', 13, '#e0e9ec' ),
    ].sort( ( a, b ) => a.nameProperty.value.localeCompare( b.nameProperty.value, 'en' ) )
  },
  {
    labelProperty: PhScaleStrings.materials.groups.fictionStringProperty,
    solutes: [
      create( PhScaleStrings.materials.names.alienSlimeStringProperty, 'alienSlime', 10.8, '#85d439' ),
      create( PhScaleStrings.materials.names.dragonDroolStringProperty, 'dragonDrool', 1.3, '#f19528' ),
      create( PhScaleStrings.materials.names.unicornFizzStringProperty, 'unicornFizz', 4.7, '#e7a2d3' ),
      create( PhScaleStrings.materials.names.moonPuddleStringProperty, 'moonPuddle', 7, '#a3b8ed' ),
      create( PhScaleStrings.materials.names.goblinSoapStringProperty, 'goblinSoap', 12, '#8aab52' ),
    ].sort( ( a, b ) => a.nameProperty.value.localeCompare( b.nameProperty.value, 'en' ) )
  },
];

export const allMaterials = materialGroups.flatMap( group => group.solutes );
