import type { Monster, Ability } from '@/types/monster';

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
export const joinEntries = (obj: Record<string, string>): string =>
  Object.entries(obj)
    .map(([key, val]) => `${capitalize(key)} ${val}`)
    .join(', ');
export const joinArray = (arr: string[]): string =>
  arr ? arr.map(capitalize).join(', ') : '';

export const formatNumber = (num: number | string) =>
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
  for (const [regex, replacement] of mappings) {
    entryText = entryText.replace(regex, replacement);
  }
  return entryText;
};

export const abilitiesToText = (abilities: Ability[]) =>
  abilities.map(abilityToText).join('<br><br>');

export const mapToCard = (monster: Monster) => {
  const {
    name,
    size,
    type,
    hp: { average, formula },
    ac,
    armor,
    speed,
    abilityScores: { str, dex, con, int, wis, cha },
    alignment,
    save,
    skill,
    resist,
    immune,
    conditionImmune,
    senses,
    passive,
    languages,
    cr,
    xp,
    trait,
    action,
    legendary,
  } = monster;

  const speedString = Object.entries(speed)
    .map(([type, val]) =>
      type === 'walk' ? `${val} ft.` : `${capitalize(type)} ${val} ft.`
    )
    .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
    .join(', ');

  const columns: Array<string | number> = [
    name,
    `${size} ${type}`,
    alignment,
    ac,
    armor,
    average,
    formula,
    speedString,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    joinEntries(save),
    joinEntries(skill),
    resist ? joinArray(resist) : '',
    immune ? joinArray(immune) : '',
    conditionImmune ? joinArray(conditionImmune) : '',
    joinArray([...(senses ?? []), `Passive Perception ${passive}`]),
    languages ? joinArray(languages) : '',
    cr,
    formatNumber(xp),
    '',
    action ? abilitiesToText(action) : '',
    legendary ? abilitiesToText(legendary) : '',
    trait ? abilitiesToText(trait) : '',
  ];
  console.log(columns.join(';'));
  return columns;
};
