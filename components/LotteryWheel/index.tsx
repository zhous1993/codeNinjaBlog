/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-05-06 11:29:24
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-06 15:24:31
 * @FilePath: \study\codeNinjaBlog\components\LotteryWheel\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react';
import styles from './index.module.scss';
export default function LotteryWheel({ awardList }: { awardList: Array<{ name: string; id: string }> }) {
  const colors = ['#fff', '#8d1d1d', '#ae5c5c', '#78e34e', '#544ee3', '#993699'];
  const [playIng, setPlayIng] = useState(false);
  const [angle, setAngle] = useState<string>('deg');
  const handleStart = () => {
    setPlayIng(true);
    setTimeout(() => {
      const anc = 1800 + Math.ceil(Math.random() * 360);
      setAngle(anc + 'deg');
      setPlayIng(false);
    }, 5000);
  };
  return (
    <div>
      <div className={styles.arrowdown}></div>
      <div
        className={`${styles.wheelWraper} ${playIng ? styles.myRotate : ``}`}
        style={{ transform: `rotate(${angle})` }}
      >
        {awardList.map((award, index) => (
          <div
            className={`${styles.wheelItem} bg-[${colors[index]}]`}
            style={{ background: colors[index % 6] }}
            key={award.id}
          >
            {/* 文字反拉伸，保持正常 */}
            <span style={{ transform: 'skew(-50deg)' }}>{award.name}</span>
          </div>
        ))}
      </div>
      <button className="z-10 absolute text-white" onClick={handleStart} disabled={playIng}>
        {playIng ? '抽奖中' : '开始'}
      </button>
    </div>
  );
}
