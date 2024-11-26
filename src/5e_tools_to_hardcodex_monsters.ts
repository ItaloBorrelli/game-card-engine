import type { Alignment, CRValues, Monster, Size } from './monster';
import homebrew from './homebrew.json' assert { type: 'json' };

const sizeMapping = (sizeAbbr: Size) =>
  ({
    F: 'Fine',
    D: 'Diminutive',
    T: 'Tiny',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    H: 'Huge',
    G: 'Gargantuan',
    C: 'Colossal',
    V: 'Varies',
  })[sizeAbbr];

const alignmentMapping = (alignmentAbbr: Alignment) =>
  ({
    L: 'Lawful',
    N: 'Neutral',
    NX: 'Neutral (law/chaos axis)',
    NY: 'Neutral (good/evil axis)',
    C: 'Chaotic',
    G: 'Good',
    E: 'Evil',
    U: 'Unaligned',
    A: 'Any',
  })[alignmentAbbr];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const joinEntries = (obj: Record<string, string>): string =>
  Object.entries(obj)
    .map(([key, val]) => `${capitalize(key)} ${val}`)
    .join(', ');
const joinArray = (arr: string[]): string =>
  arr ? arr.map(capitalize).join(', ') : '';

const crToXp = (cr: CRValues) =>
  ({
    '0': '10',
    '1/8': '25',
    '1/4': '50',
    '1/2': '100',
    '1': '200',
    '2': '450',
    '3': '700',
    '4': '1100',
    '5': '1800',
    '6': '2300',
    '7': '2900',
    '8': '3900',
    '9': '5000',
    '10': '5900',
    '11': '7200',
    '12': '8400',
    '13': '10000',
    '14': '11500',
    '15': '13000',
    '16': '15000',
    '17': '18000',
    '18': '20000',
    '19': '22000',
    '20': '25000',
    '21': '33000',
    '22': '41000',
    '23': '50000',
    '24': '62000',
    '25': '75000',
    '26': '90000',
    '27': '105000',
    '28': '120000',
    '29': '135000',
    '30': '155000',
  })[cr];

export const mapToHardcodex = (monster: Monster) => {
  const {
    name,
    size,
    type,
    hp: { average: hpAverage, formula: hpFormula },
    speed,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    alignment,
    save,
    skill,
    resist,
    immune,
    conditionImmune,
    senses,
    passive,
    languages,
    cr: crValueOrObject,
  } = monster;

  const alignmentString = alignment.map(alignmentMapping).join(' ');
  const { ac, from: acType } =
    typeof monster.ac[0] === 'number' ? { ac: monster.ac[0] } : monster.ac[0];
  const acTypeString = acType ? acType[0] : '';
  const speedString = Object.entries(speed)
    .map(([type, val]) =>
      type === 'walk' ? `${val} ft.` : `${capitalize(type)} ${val} ft.`
    )
    .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
    .join(', ');
  const { cr, xp } =
    typeof crValueOrObject === 'string'
      ? { cr: crValueOrObject, xp: crToXp(crValueOrObject) }
      : {
          cr: crValueOrObject.cr,
          xp: crValueOrObject.xp
            ? crValueOrObject.xp
            : crToXp(crValueOrObject.cr),
        };

  const columns: Array<string | number> = [
    name,
    `${size} ${type}`,
    alignmentString,
    ac,
    acTypeString,
    hpAverage,
    hpFormula,
    speedString,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    joinEntries(save),
    joinEntries(skill),
    joinArray(resist),
    joinArray(immune),
    joinArray(conditionImmune),
    joinArray([...senses, `Passive Perception ${passive}`]),
    languages ? joinArray(languages) : '',
  ];
  console.log(columns.join(';'));
  return columns;
};
mapToHardcodex(homebrew.monster[0] as Monster);
