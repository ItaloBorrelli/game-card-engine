import type Monster5eTools from '@/types/monster-5e-tools';
import type {
  Alignment as Alignment5eTools,
  Size as Size5eTools,
} from '@/types/monster-5e-tools';
import type Monster from '@/types/monster';
import type { CRValue, Size } from '@/types/monster';
import { mapAbilityScoreToSave } from './utils';

export const sizeMapping = (sizeAbbr: Size5eTools): Size =>
  ({
    F: 'fine',
    D: 'diminutive',
    T: 'tiny',
    S: 'small',
    M: 'medium',
    L: 'large',
    H: 'huge',
    G: 'gargantuan',
    C: 'colossal',
    V: 'varies',
  })[sizeAbbr] as Size;

export const alignmentMapping = (alignmentAbbr: Alignment5eTools) =>
  ({
    L: 'lawful',
    N: 'neutral',
    NX: 'neutral (law/chaos axis)',
    NY: 'neutral (good/evil axis)',
    C: 'chaotic',
    G: 'good',
    E: 'evil',
    U: 'unaligned',
    A: 'any',
  })[alignmentAbbr];

export const crToXp = (cr: CRValue) =>
  ({
    '0': 10,
    '1/8': 25,
    '1/4': 50,
    '1/2': 100,
    '1': 200,
    '2': 450,
    '3': 700,
    '4': 1100,
    '5': 1800,
    '6': 2300,
    '7': 2900,
    '8': 3900,
    '9': 5000,
    '10': 5900,
    '11': 7200,
    '12': 8400,
    '13': 10000,
    '14': 11500,
    '15': 13000,
    '16': 15000,
    '17': 18000,
    '18': 20000,
    '19': 22000,
    '20': 25000,
    '21': 33000,
    '22': 41000,
    '23': 50000,
    '24': 62000,
    '25': 75000,
    '26': 90000,
    '27': 105000,
    '28': 120000,
    '29': 135000,
    '30': 155000,
  })[cr];

export const customFrom5eTools = (toolsMonster: Monster5eTools): Monster => {
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
    spellcasting,
  } = toolsMonster;

  const { ac, from: acType } =
    typeof toolsMonster.ac[0] === 'number'
      ? { ac: toolsMonster.ac[0] }
      : toolsMonster.ac[0];

  const cr: CRValue =
    typeof crValueOrObject === 'string' ? crValueOrObject : crValueOrObject.cr;
  const xp = crToXp(cr);

  return {
    name,
    size: size.map(sizeMapping),
    type,
    hp: { average: hpAverage, formula: hpFormula },
    ac,
    armor: acType ? acType[0] : '',
    speed,
    abilityScores: {
      str,
      dex,
      con,
      int,
      wis,
      cha,
    },
    alignment: alignment.map(alignmentMapping).join(' '),
    save: save
      ? Object.fromEntries(
          Object.entries(save).map(([key, value]) => [key, Number(value)])
        )
      : {
          str: mapAbilityScoreToSave(str),
          dex: mapAbilityScoreToSave(dex),
          con: mapAbilityScoreToSave(con),
          int: mapAbilityScoreToSave(int),
          wis: mapAbilityScoreToSave(wis),
          cha: mapAbilityScoreToSave(cha),
        },
    skill,
    resist,
    immune,
    conditionImmune,
    senses,
    passive,
    languages,
    cr,
    xp: Number(xp),
    trait,
    action,
    legendary,
    spellcasting,
  };
};
