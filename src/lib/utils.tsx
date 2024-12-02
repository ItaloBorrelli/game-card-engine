import type Monster from '@/types/monster';
import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
export const capitalizeEachWord = (str: string) =>
  str.split(' ').map(capitalize).join(' ');

export const mapAttackType = (abbrev: string) =>
  ({
    mw: 'Melee Weapon Attack',
    rw: 'Ranged Weapon Attack',
    'mw,rw': 'Melee or Ranged Weapon Attack',
    'rw,mw': 'Melee or Ranged Weapon Attack',
    ms: 'Melee Spell Attack',
    rs: 'Ranged Spell Attack',
    'ms,rs': 'Melee or Ranged Spell Attack',
    'rs,ms': 'Melee or Ranged Spell Attack',
  })[abbrev] ?? 'Attack';

export type TagTypes =
  | 'atk'
  | 'condition'
  | 'creature'
  | 'damage'
  | 'dc'
  | 'dice'
  | 'h'
  | 'hit'
  | 'note'
  | 'recharge'
  | 'skill'
  | 'spell'
  | 'status';

export type EntryMapping = {
  postProcessing?: (text: string) => string;
  wrapper?: string;
};

export const mapEntryToList = (
  text: string,
  mappings: Record<TagTypes, EntryMapping>
): Array<string | React.ReactElement> => {
  const result: Array<string | React.ReactElement> = [];
  const regex = /\{@(\w+)\s?([^}]*)\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    const type = match[1];
    const content = match[2];
    lastIndex = match.index + match[0].length;
    const mapping = mappings[type as TagTypes];
    if (mapping) {
      const { postProcessing, wrapper } = mapping;
      const processed = postProcessing ? postProcessing(content) : content;
      result.push(
        before,
        wrapper
          ? React.createElement(wrapper, { key: result.length }, processed)
          : processed
      );
    } else {
      result.push(before, match[0]);
    }
  }

  result.push(text.slice(lastIndex));

  return result;
};

export const mapEntryToNode = (
  text: string,
  mappings: Record<TagTypes, EntryMapping>
): React.ReactElement => <>{mapEntryToList(text, mappings)}</>;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const speedString = (speed: Monster['speed'], capitalizeEach = false) =>
  Object.entries(speed)
    .map(([type, val]) =>
      type === 'walk'
        ? `${val} ft.`
        : `${capitalizeEach ? capitalize(type) : type} ${val} ft.`
    )
    .join(', ');

export const typeString = (type: Monster['type']) =>
  typeof type === 'string'
    ? type
    : `${type.type} (${joinArray(type.tags, true)})`;

export const mapAbilityScoreToSave = (score: number) =>
  Math.floor((score - 10) / 2);

export const mapAbilityScoreToModifier = (score: number) => {
  const modifier = mapAbilityScoreToSave(score);
  return modifier >= 0 ? `+${modifier}` : modifier;
};

export const formatNumber = (num: number | string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const joinArray = (arr?: string[], capitalizeEach = false): string =>
  arr ? arr.map(capitalizeEach ? capitalize : (x) => x).join(', ') : '';

export const joinRecord = (
  record: Record<string, string> | Record<string, number>,
  capitalizeEach = false
) =>
  Object.entries(record)
    .map(([key, val]) => `${capitalizeEach ? capitalize(key) : key} ${val}`)
    .join(', ');

export const sensesString = (passive: number, senses: string[] = []) =>
  joinArray([...senses, `passive Perception ${passive}`]);
