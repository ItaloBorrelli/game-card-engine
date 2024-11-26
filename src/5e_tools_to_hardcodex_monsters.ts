import type { Alignment, Monster, Size } from './homebrew';
import homebrew from './homebrew.json' assert { type: 'json' };

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const mapToHardcodex = (monster: Monster) => {
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

  const { name, size, type, str, dex, con, int, wis, cha, alignment, save } =
    monster;

  const alignmentString = alignment.map(alignmentMapping).join('');
  const { ac, from: acType } =
    typeof monster.ac[0] === 'number' ? { ac: monster.ac[0] } : monster.ac[0];
  const { average: hpAverage, formula: hpFormula } = monster.hp;
  const speed = Object.entries(monster.speed)
    .map(([type, val]) =>
      type === 'walk' ? `${val} ft.` : `${capitalize(type)} ${val} ft.`
    )
    .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
    .join(', ');
  const saveString = Object.entries(save)
    .map(([key, val]) => `${capitalize(key)} ${val}`)
    .join(', ');

  const columns: Array<string | number> = [
    name,
    `${size} ${type}`,
    alignmentString,
    ac,
    acType ? acType[0] : '',
    hpAverage,
    hpFormula,
    speed,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    saveString,
  ];
  console.log(columns.join(';'));
  return columns;
};
mapToHardcodex(homebrew.monster[0] as Monster);
