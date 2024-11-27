export type Size =
  | 'fine'
  | 'diminutive'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'
  | 'colossal'
  | 'varies';
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
export type HP = { average: number; formula: string };
export type Speed = Record<string, number>;
export type AbilityScores = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
};
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
export type Skill =
  | 'acrobatics'
  | 'animal handling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleight of hand'
  | 'stealth'
  | 'survival';

export type CRValue =
  | `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30}`
  | '1/8'
  | '1/4'
  | '1/2';

export type Ability = { name: string; entries: string[] };

export type Monster = {
  cardSize?: 'S' | 'L';
  name: string;
  size: Size[];
  type: CreatureType;
  alignment: string;
  ac: number;
  armor: string;
  hp: HP;
  speed: Speed;
  abilityScores: AbilityScores;
  save: SaveThrow;
  skill: Record<Skill, string>;
  resist?: DamageType[];
  immune?: DamageType[];
  conditionImmune?: Condition[];
  senses?: string[];
  passive: number;
  languages?: string[];
  cr: CRValue;
  xp: number;
  trait?: Ability[];
  action?: Ability[];
  legendary?: Ability[];
};
