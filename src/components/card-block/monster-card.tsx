import type { Ability, Monster } from '@/types/monster';
import type React from 'react';
import styles from './monster-card.module.css';
import {
  formatNumber,
  mapAbilityScoreToModifier,
  speedString,
  joinArray,
  sensesString,
  typeString,
  mapEntryToNode,
  capitalize,
  joinRecord,
} from '@/lib/utils';
import * as _ from 'lodash';

const Separator: React.FC = () => (
  <div>
    <svg>
      <title>Separator</title>
      <polyline
        points="0,0 360,2.5 0,5"
        style={{ fill: '#922610', stroke: '#922610' }}
      />
    </svg>
  </div>
);

const stringifyAbilityScore = (score: number) =>
  `${score} (${mapAbilityScoreToModifier(score)})`;

const stat = (s: string, v: string | number) => (
  <>
    <strong>{s}</strong> {v}
  </>
);

const formatAbility = ({ name, entries }: Ability) => (
  <p className={styles.abilities} key={_.uniqueId('ability_')}>
    <strong>
      <em>{mapEntryToNode(name)}. </em>
    </strong>
    {entries.map((e) => (
      <span key={_.uniqueId('entry_')}>
        {mapEntryToNode(e)}
        <br />
      </span>
    ))}
  </p>
);

const createStatBlock = (stat: string, value: number) => (
  <div className={styles.stat}>
    <strong>{stat}</strong>
    <br />
    {stringifyAbilityScore(value)}
  </div>
);

const MonsterCard: React.FC<{ monster: Monster }> = ({
  monster,
}: { monster: Monster }) => {
  const {
    name,
    type,
    size,
    alignment,
    hp,
    speed,
    ac,
    abilityScores: { str, dex, con, int, wis, cha },
    skill,
    languages,
    senses,
    passive,
    xp,
    cr,
    trait,
    action,
    legendary,
  } = monster;
  return (
    <div className={styles.cols2}>
      <div className={styles.monster}>
        <div className={styles.block}>
          <div className={styles.orange} />
          <div className={styles.yellow}>
            <>
              <h1>{name}</h1>
              <div className={styles.sansSerif}>
                <div
                  className={styles.type}
                >{`${size.map(capitalize)} ${typeString(type)}, ${alignment}`}</div>
                <Separator />
                <div className={styles.red}>
                  {stat('Armor Class', ac)}
                  <br />
                  {stat('Hit Points', `${hp.average} (${hp.formula})`)}
                  <br />
                  {stat('Speed', speedString(speed))}
                  <Separator />
                  {createStatBlock('STR', str)}
                  {createStatBlock('DEX', dex)}
                  {createStatBlock('CON', con)}
                  {createStatBlock('INT', int)}
                  {createStatBlock('WIS', wis)}
                  {createStatBlock('CHA', cha)}
                  <Separator />
                  {stat('Skills', joinRecord(skill, true))}
                  <br />
                  {stat('Senses', sensesString(passive, senses))}
                  <br />
                  {languages ? (
                    <>
                      {stat('Languages', joinArray(languages))}
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {stat('Challenge', `${cr} (${formatNumber(xp)} XP)`)}
                </div>
                <Separator />
                {trait ? trait.map(formatAbility) : <></>}
                {action ? (
                  <>
                    <div className={styles.rub}>Actions</div>
                    {action.map(formatAbility)}
                  </>
                ) : (
                  <></>
                )}
                {legendary ? (
                  <>
                    <div className={styles.rub}>Legendary Actions</div>
                    {legendary.map(formatAbility)}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;
