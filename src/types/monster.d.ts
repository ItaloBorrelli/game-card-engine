export type Ability = { name: string; entries: string[] };

export enum Size {
  fine = 'fine',
  diminutive = 'diminutive',
  tiny = 'tiny',
  small = 'small',
  medium = 'medium',
  large = 'large',
  huge = 'huge',
  gargantuan = 'gargantuan',
  colossal = 'colossal',
  varies = 'varies',
}
export enum CreatureType {
  aberration = 'aberration',
  beast = 'beast',
  celestial = 'celestial',
  construct = 'construct',
  dragon = 'dragon',
  elemental = 'elemental',
  fey = 'fey',
  fiend = 'fiend',
  giant = 'giant',
  humanoid = 'humanoid',
  monstrosity = 'monstrosity',
  ooze = 'ooze',
  plant = 'plant',
  undead = 'undead',
}
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
export enum DamageType {
  acid = 'acid',
  bludgeoning = 'bludgeoning',
  cold = 'cold',
  fire = 'fire',
  force = 'force',
  lightning = 'lightning',
  necrotic = 'necrotic',
  piercing = 'piercing',
  poison = 'poison',
  psychic = 'psychic',
  radiant = 'radiant',
  slashing = 'slashing',
  thunder = 'thunder',
}
export enum Condition {
  blinded = 'blinded',
  charmed = 'charmed',
  deafened = 'deafened',
  exhaustion = 'exhaustion',
  frightened = 'frightened',
  grappled = 'grappled',
  incapacitated = 'incapacitated',
  invisible = 'invisible',
  paralyzed = 'paralyzed',
  petrified = 'petrified',
  poisoned = 'poisoned',
  prone = 'prone',
  restrained = 'restrained',
  stunned = 'stunned',
  unconscious = 'unconscious',
  disease = 'disease',
}

export enum Skill {
  acrobatics = 'acrobatics',
  animalHandling = 'animal handling',
  arcana = 'arcana',
  athletics = 'athletics',
  deception = 'deception',
  history = 'history',
  insight = 'insight',
  intimidation = 'intimidation',
  investigation = 'investigation',
  medicine = 'medicine',
  nature = 'nature',
  perception = 'perception',
  performance = 'performance',
  persuasion = 'persuasion',
  religion = 'religion',
  sleightOfHand = 'sleight of hand',
  stealth = 'stealth',
  survival = 'survival',
}

// "spellcasting": [
// 		{
// 			"name": "Innate Spellcasting",
// 			"type": "spellcasting",
// 			"headerEntries": [
// 				"The hag's innate spellcasting ability is Charisma (spell save {@dc 12}). She can innately cast the following spells, requiring no material components:"
// 			],
// 			"will": [
// 				"{@spell dancing lights}",
// 				"{@spell minor illusion}",
// 				"{@spell vicious mockery}"
// 			],
// 			"ability": "cha"
// 		}
// 	],

export type CRValue =
  `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30}`;
'1/8' | '1/4' | '1/2';

export type Spellcasting = {
  name: string;
  type: string;
  headerEntries: string[];
  will?: string[];
  spells?: Record<'0', { spells: string[] }> &
    Partial<
      Record<
        `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`,
        { spells: string[]; slots: number }
      >
    >;
  ability: string;
};

type Monster = {
  cardSize?: 'S' | 'L';
  name: string;
  size: Size[];
  type: CreatureType | { type: CreatureType; tags: string[] };
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
  spellcasting?: Spellcasting[];
};

export default Monster;
