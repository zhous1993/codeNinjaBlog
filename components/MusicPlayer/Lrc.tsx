/*
 * @Author: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @Date: 2023-04-12 20:59:50
 * @LastEditors: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @LastEditTime: 2023-04-12 21:26:53
 * @FilePath: \Study\ninja-blog\components\MusicPlayer\Lrc.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useRef, useState } from 'react';
import styles from './Lrc.module.scss';
export function calcTime(params: string): number {
  if (!params) return 0;
  let arr = params.split(':');
  arr = [arr[0], ...arr[1]?.split('.')];
  const res = +arr[0] * 60 * 1000 + +arr[1] * 1000 + +arr[2];
  return res;
}
export function formatLrc(lrc: string): Array<{ time: number; lrc: string }> {
  const _arr: Array<{ time: number; lrc: string }> = lrc.split('\n').map((item) => {
    let [timeStr, lrc] = item.split(']');
    const time = calcTime(timeStr.substring(1));
    return { time, lrc };
  });
  return _arr;
}
export default function Lrc({ lrc, currentTime }: { lrc: string; currentTime: number }) {
  const lrcBoxRef = useRef<HTMLDivElement>(null);
  const [lrcList, setLrcList] = useState<Array<{ time: number; lrc: string }>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [h, setH] = useState(0);
  useEffect(() => {
    if (lrcBoxRef.current) {
      const height = lrcBoxRef.current.getBoundingClientRect().height;
      setH(height);
    }
  }, []);
  useEffect(() => {
    setLrcList(formatLrc(lrc));
  }, [lrc]);
  useEffect(() => {
    const index = lrcList.findIndex((item) => item.time > currentTime * 1000);
    setActiveIndex(index < 0 ? 0 : index - 1);
  }, [currentTime, lrcList]);
  return (
    <div ref={lrcBoxRef} className={`${styles.lrcBox} text-white`}>
      <div className={styles.list} style={{ transform: `translateY(${h / 2 - activeIndex * 40}px)` }}>
        {lrcList.map((item, index) => (
          <div className={`${styles.item} ${index === activeIndex ? styles.active : ''}`} key={index}>
            {item.lrc}
          </div>
        ))}
      </div>
    </div>
  );
}
