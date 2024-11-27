import type { CRValue, Skill } from './monster';

export type Size = 'F' | 'D' | 'T' | 'S' | 'M' | 'L' | 'H' | 'G' | 'C' | 'V';
export type Alignment = 'L' | 'N' | 'NX' | 'NY' | 'C' | 'G' | 'E' | 'U' | 'A';
type CreatureType =
  | 'aberration'
  | 'beast'
  | 'celestial'
  | 'construct'
  | 'dragon'
  | 'elemental'
  | 'fey'
  | 'fiend'
  | 'giant'
  | 'humanoid'
  | 'monstrosity'
  | 'ooze'
  | 'plant'
  | 'undead';
type AC = Array<{ ac: number; from?: string[] }> | Array<number>;
type HP = { average: number; formula: string };
type Speed = { walk?: number; burrow?: number; fly?: number };
type SaveThrow = {
  str?: string;
  dex?: string;
  con?: string;
  int?: string;
  wis?: string;
  cha?: string;
};
type DamageType =
  | 'acid'
  | 'bludgeoning'
  | 'cold'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'necrotic'
  | 'piercing'
  | 'poison'
  | 'psychic'
  | 'radiant'
  | 'slashing'
  | 'thunder';
type Condition =
  | 'blinded'
  | 'charmed'
  | 'deafened'
  | 'exhaustion'
  | 'frightened'
  | 'grappled'
  | 'incapacitated'
  | 'invisible'
  | 'paralyzed'
  | 'petrified'
  | 'poisoned'
  | 'prone'
  | 'restrained'
  | 'stunned'
  | 'unconscious'
  | 'disease';

type CR = CRValue | { cr: CRValue; xp?: number };

export type Ability = { name: string; entries: string[] };
type Trait = Ability & {
  sort?: number;
};
type Action = Ability;
type Legendary = Ability;

export type Monster5eTools = {
  cardSize?: 'S' | 'L';
  name: string;
  size: Size[];
  type: CreatureType;
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
  save: SaveThrow;
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
