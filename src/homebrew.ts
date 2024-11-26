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
};
