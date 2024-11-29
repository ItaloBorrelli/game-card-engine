import type { Monster } from '@/types/monster';
import type React from 'react';
import styles from './monster-card.module.css';

const MonsterCard: React.FC<{ monster: Monster }> = ({
  monster,
}: { monster: Monster }) => {
  const { name } = monster;
  return (
    <div className={styles.monster}>
      <div className={styles.block}>
        <div className={styles.orange} />
        <div className={styles.yellow}>
          <div>
            <h1>{name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
// <div class="bloc">
//   <div class="orange"></div>
//   <div class="jaune">
//     <div class="">
//       <h1>Aarakocra</h1>
//       <div class="sansSerif ">
//         <div class="type">Medium humanoid (Aarakocra), neutral good</div>
//         <div>
//           <svg>
//             <polyline
//               points="0,0 360,2.5 0,5"
//               style="fill:#922610;stroke:#922610;"
//             ></polyline>
//           </svg>
//         </div>
//         <div class="red">
//           <strong>Armor Class</strong> 12
//           <br />
//           <strong>Hit Points</strong> 13 (3d8)
//           <br />
//           <strong>Speed</strong> 20 ft., fly 50 ft.
//           <div>
//             <svg>
//               <polyline
//                 points="0,0 360,2.5 0,5"
//                 style="fill:#922610;stroke:#922610;"
//               ></polyline>
//             </svg>
//           </div>
//           <div class="carac">
//             <strong>STR</strong>
//             <br />
//             10 (+0)
//           </div>
//           <div class="carac">
//             <strong>DEX</strong>
//             <br />
//             14 (+2)
//           </div>
//           <div class="carac">
//             <strong>CON</strong>
//             <br />
//             10 (+0)
//           </div>
//           <div class="carac">
//             <strong>INT</strong>
//             <br />
//             11 (+0)
//           </div>
//           <div class="carac">
//             <strong>WIS</strong>
//             <br />
//             12 (+1)
//           </div>
//           <div class="carac">
//             <strong>CHA</strong>
//             <br />
//             11 (+0)
//           </div>
//           <div>
//             <svg>
//               <polyline
//                 points="0,0 360,2.5 0,5"
//                 style="fill:#922610;stroke:#922610;"
//               ></polyline>
//             </svg>
//           </div>
//           <strong>Skills</strong> Perception +5
//           <br />
//           <strong>Senses</strong> passive Perception 15
//           <br />
//           <strong>Languages</strong> Auran, Aarakocra
//           <br />
//           <strong>Challenge</strong> 1/4 (50 XP)
//         </div>
//         <div>
//           <svg>
//             <polyline
//               points="0,0 360,2.5 0,5"
//               style="fill:#922610;stroke:#922610;"
//             ></polyline>
//           </svg>
//         </div>
//         <p>
//           <strong>
//             <em>Dive Attack</em>
//           </strong>
//           . If the aarakocra is flying and dives at least 30 feet straight
//           toward a target and then hits it with a melee weapon attack, the
//           attack deals an extra 3 (1d6) damage to the target.
//         </p>
//         <div class="rub">Actions</div>
//         <p>
//           <strong>
//             <em>Talon</em>
//           </strong>
//           . <em>Melee Weapon Attack</em>: +4 to hit, reach 5 ft., one
//           target. <em>Hit</em>: 4 (1d4 + 2) slashing damage.
//         </p>
//         <p>
//           <strong>
//             <em>Javelin</em>
//           </strong>
//           . <em>Melee or Ranged Weapon Attack</em>: +4 to hit, reach 5 ft.
//           or range 30/120 ft., one target. <em>Hit</em>: 5 (1d6 + 2)
//           piercing damage.
//         </p>
//       </div>
//     </div>
//   </div>
//   <div class="orange"></div>
//   <div class="description"></div>
// </div>
export default MonsterCard;
