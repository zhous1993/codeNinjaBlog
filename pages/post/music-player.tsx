'use client';
/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 17:05:24
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-24 13:56:36
 * @FilePath: \study\codeNinjaBlog\pages\post\music-player.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fetchLRCById, fetchSongUrlById, fm } from '@/api/music';
import MusicPlayerLogin from '@/components/MusicPlayer/Login';
import Lrc from '@/components/MusicPlayer/Lrc';
import styles from '@/styles/music-player.module.scss';
import { useEffect, useRef, useState } from 'react';
import Draw from '@/components/MusicPlayer/Draw';
import MusicPlayer from '@/components/MusicPlayer';
export default function MusicPlayerView() {
  const [isLogged, setIsLogged] = useState(false);
  const [dataArr, setDataArr] = useState<Uint8Array>(new Uint8Array());
  const [songName, setSongName] = useState('');
  const [songId, setSongId] = useState('');
  const [lrc, setLrc] = useState('');
  const [currentTime, setCurrentTime] = useState<number>(0);

  const getData = (e: any) => {
    setDataArr(e.dataArr);
  };
  const timeUpdate = (currentTime: number) => {
    setCurrentTime(currentTime);
  };
  useEffect(() => {
    if (songId) {
      fetchLRCById(songId).then((res: any) => {
        const { lrc } = res;
        setLrc(lrc?.lyric);
      });
    }
  }, [songId]);
  return (
    <div className={`${styles.playerView}`}>
      {!isLogged ? (
        <MusicPlayerLogin
          login={(e: boolean) => {
            setIsLogged(e);
          }}
        />
      ) : (
        <>
          {/* <canvas ref={canvasRef} className="w-full absolute bottom-0"></canvas> */}
          <Draw dataArr={dataArr} />
          <div className="text-center py-4 text-2xl text-white">{songName}</div>
          <Lrc lrc={lrc} currentTime={currentTime} />
          <MusicPlayer
            change={({ songId, songName }: { songId: string; songName: string }) => {
              setSongId(songId);
              setSongName(songName);
            }}
            timeUpdate={timeUpdate}
            draw={getData}
          />
        </>
      )}
    </div>
  );
}
