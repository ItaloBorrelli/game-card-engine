export type Size = 'F' | 'D' | 'T' | 'S' | 'M' | 'L' | 'H' | 'G' | 'C' | 'V';
export type Alignment = 'L' | 'N' | 'NX' | 'NY' | 'C' | 'G' | 'E' | 'U' | 'A';
export type CreatureType =
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
export type AC = Array<{ ac: number; from?: string[] }> | Array<number>;
export type HP = { average: number; formula: string };
export type Speed = { walk?: number; burrow?: number; fly?: number };
export type SaveThrow = {
  str?: string;
  dex?: string;
  con?: string;
  int?: string;
  wis?: string;
  cha?: string;
};
export type DamageType =
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
export type Condition =
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
export type Skill = Record<string, string>;
export type CRValues =
  | `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30}`
  | '1/8'
  | '1/4'
  | '1/2';
export type CR = CRValues | { cr: CRValues; xp?: number };
export type Monster = {
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
  skill: Skill;
  resist?: DamageType[];
  immune?: DamageType[];
  conditionImmune?: Condition[];
  senses?: string[];
  passive: number;
  languages?: string[];
  cr: CR;
};
