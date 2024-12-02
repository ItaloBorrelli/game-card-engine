import type { Ability } from '@/types/monster';
import type Monster from '@/types/monster';
import {
  formatNumber,
  joinArray,
  sensesString,
  capitalize,
  speedString,
} from './utils';

export const joinEntries = (obj: Record<string, string>): string =>
  Object.entries(obj)
    .map(([key, val]) => `${capitalize(key)} ${val}`)
    .join(', ');

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

  const columns: Array<string | number> = [
    name,
    `${size} ${type}`,
    alignment,
    ac,
    armor,
    average,
    formula,
    speedString(speed),
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
    sensesString(passive, senses),
    joinArray(languages),
    cr,
    formatNumber(xp),
    '',
    action ? abilitiesToText(action) : '',
    legendary ? abilitiesToText(legendary) : '',
    trait ? abilitiesToText(trait) : '',
  ];
  return columns.join(';');
};
