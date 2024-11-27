import type { Alignment, CRValues, Monster, Size, Ability } from './monster';
import fs from 'fs';
import path from 'path';
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
const formatNumber = (num: number | string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const mappings: [RegExp, string][] = [
  [/\{\@atk mw\}/g, 'Melee Weapon Attack:'],
  [/\{\@hit (\d+?)\}/g, '+$1'],
  [/\{\@h\}/g, 'Hit:'],
  [/\{\@damage (.+?)\}/g, '$1'],
  [/\{\@dc (\d+?)\}/g, 'DC $1'],
  [/\{\@skill (.+?)\}/g, '$1'],
  [/\{\@condition (.+?)\}/g, '$1'],
  [/\{\@recharge ([1-5])\}/g, '(Recharge $1-6)'],
  [/\{\@recharge (6)\}/g, '(Recharge $1)'],
];

const abilityToText = ({ name, entries }: Ability) => {
  let entryText = `${name}. ${entries.map((entry) => entry).join('<br>')}`;
  mappings.forEach(([regex, replacement]) => {
    entryText = entryText.replace(regex, replacement);
  });
  return entryText;
};

const abilitiesToText = (abilities: Ability[]) =>
  abilities.map(abilityToText).join('<br><br>');

export const mapToCard = (monster: Monster) => {
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
    trait,
    action,
    legendary,
  } = monster;

  const sizeString = size.map(sizeMapping).join('/');
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
  const cr =
    typeof crValueOrObject === 'string' ? crValueOrObject : crValueOrObject.cr;
  const xp = crToXp(cr);

  const columns: Array<string | number> = [
    name,
    `${sizeString} ${type}`,
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
    cr,
    formatNumber(xp),
    '',
    abilitiesToText(action),
    abilitiesToText(legendary),
    abilitiesToText(trait),
  ];
  console.log(columns.join(';'));
  return columns;
};

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path as an argument.');
  process.exit(1);
}

const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
const monsters = JSON.parse(fileContent);

(monsters as Monster[]).forEach(mapToCard);
