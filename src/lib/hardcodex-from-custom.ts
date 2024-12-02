import type { Ability } from '@/types/monster';
import type Monster from '@/types/monster';
import {
  formatNumber,
  joinArray,
  sensesString,
  capitalize,
  speedString,
  type TagTypes,
  type EntryMapping,
  mapAttackType,
  mapEntryToList,
  typeString,
} from './utils';

export const joinEntries = (obj: Record<string, string>): string =>
  Object.entries(obj)
    .map(([key, val]) => `${capitalize(key)} ${val}`)
    .join(', ');

const entryMappings: Record<TagTypes, EntryMapping> = {
  atk: { postProcessing: (abbrev) => `${mapAttackType(abbrev)}: ` },
  condition: {},
  creature: {},
  damage: {},
  dc: { postProcessing: (text) => `DC ${text}` },
  dice: {},
  h: { postProcessing: () => 'Hit:' },
  hit: {
    postProcessing: (text) => `${Number(text) > 0 ? '+' : ''}${text}`,
  },
  note: { wrapper: 'em' },
  recharge: {
    postProcessing: (text) => `(Recharge ${text === '6' ? 6 : `${text}-6`})`,
  },
  skill: {},
  spell: {},
  status: {
    postProcessing: (text) => text.replace(/.*\|\|/, ''),
  },
};

const abilityToText = ({ name, entries }: Ability) =>
  mapEntryToList(
    `${name}. ${entries.map((entry) => entry).join('<br>')}`,
    entryMappings
  )
    .filter((x) => typeof x === 'string')
    .join('');

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
    `${size.map(capitalize)} ${typeString(type)}, ${alignment}`,
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
