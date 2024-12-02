import type { Ability, CRValue, Skill, Speed } from './monster';

export type Size = 'F' | 'D' | 'T' | 'S' | 'M' | 'L' | 'H' | 'G' | 'C' | 'V';
export type Alignment = 'L' | 'N' | 'NX' | 'NY' | 'C' | 'G' | 'E' | 'U' | 'A';

type AC = Array<{ ac: number; from?: string[] }> | Array<number>;
type HP = { average: number; formula: string };
type SaveThrow = {
  str?: string;
  dex?: string;
  con?: string;
  int?: string;
  wis?: string;
  cha?: string;
};

type CR = CRValue | { cr: CRValue; xp?: number };

type Trait = Ability & {
  sort?: number;
};
type Action = Ability;
type Legendary = Ability;

export type Monster5eTools = {
  cardSize?: 'S' | 'L';
  name: string;
  size: Size[];
  type: CreatureType | { type: CreatureType; tags: string[] };
  alignment: Alignment[];
  ac: AC;
  hp: HP;
  speed: Speed;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  save?: SaveThrow;
  skill: Record<Skill, string>;
  resist?: DamageType[];
  immune?: DamageType[];
  conditionImmune?: Condition[];
  senses?: string[];
  passive: number;
  languages?: string[];
  cr: CR;
  trait?: Trait[];
  action?: Action[];
  legendary?: Legendary[];
};
