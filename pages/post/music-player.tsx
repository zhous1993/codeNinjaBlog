'use client';
/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 17:05:24
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-14 17:42:07
 * @FilePath: \study\codeNinjaBlog\pages\post\music-player.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fetchLRCById, fetchSongUrlById, fm } from '@/api/music';
import MusicPlayerLogin from '@/components/MusicPlayer/Login';
import Lrc from '@/components/MusicPlayer/Lrc';
import styles from '@/styles/music-player.module.scss';
import { useEffect, useRef, useState } from 'react';
import Draw from '@/components/MusicPlayer/Draw';
export default function MusicPlayerView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  const [isLogged, setIsLogged] = useState(false);
  // const [isInit, setIsInit] = useState<boolean>(true);
  const ctx = useRef<CanvasRenderingContext2D>();
  // 画布宽高
  const w = useRef(0),
    h = useRef(0);
  useEffect(() => {
    if (canvasRef.current) {
      // 初始化canvas
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight / 2;
      w.current = canvasRef.current.width;
      h.current = canvasRef.current.height;
      ctx.current = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      ctx.current.fillStyle = '#fa8072';
    }
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        const index = musicList.findIndex((item) => item.id == songId);
        if (index < musicList.length - 1) {
          setSongId(musicList[index + 1].id);
        } else {
          fetchMusicList();
        }
      });
      audioRef.current.addEventListener('timeupdate', () => {
        console.log(audioRef.current?.currentTime);
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      // audioRef.current?.addEventListener('play', init);
    }
    // draw();
    fetchMusicList();
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {
          setCurrentTime(audioRef.current?.currentTime || 0);
        });
      }
    };
  }, []);
  const audioCtx = useRef<AudioContext>(),
    source = useRef<MediaElementAudioSourceNode>(),
    analyser = useRef<AnalyserNode>(),
    dataArr = useRef<Uint8Array>(new Uint8Array());
  const isInit = useRef(false);

  const init = () => {
    if (isInit.current) return;
    // 音频上下文
    audioCtx.current = new window.AudioContext();
    // 音频源
    source.current = audioCtx.current.createMediaElementSource(audioRef.current as HTMLMediaElement);
    // 分析器
    analyser.current = audioCtx.current.createAnalyser();
    analyser.current.fftSize = 512;
    // 创建byte数组 接收分析器数据
    dataArr.current = new Uint8Array(analyser.current.frequencyBinCount); //
    // 链接分析器
    source.current.connect(analyser.current);
    // 连接输出设备
    analyser.current.connect(audioCtx.current.destination);
    isInit.current = true;
  };
  /**
   * 画波形
   */
  const draw = () => {
    // 逐帧绘画
    requestAnimationFrame(draw);
    if (!isInit.current) return;
    // 将解析数据放到数组里
    analyser.current?.getByteFrequencyData(dataArr.current as Uint8Array);
    // 清空画布
    ctx.current?.clearRect(0, 0, canvasRef.current?.width as number, canvasRef.current?.height as number);
    const barLength = dataArr.current.length / 2.5;
    const barWidth = w.current / barLength / 2;
    for (let i = 0; i < dataArr.current.length; i++) {
      const x1 = i * barWidth + w.current / 2;
      // 对称画图
      const x2 = w.current / 2 - i * barWidth;
      const barHeight = (dataArr.current[i] / 256) * h.current;
      const y = h.current - barHeight;
      ctx.current?.fillRect(x1, y, barWidth - 2, barHeight);
      ctx.current?.fillRect(x2, y, barWidth - 2, barHeight);
    }
  };
  const [musicList, setMusicList] = useState<{ name: string; id: string }[]>([]);
  const [songId, setSongId] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const [songName, setSongName] = useState('');
  const [lrc, setLrc] = useState('');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const fetchMusicList = () => {
    fm().then(({ data }: any) => {
      const list = data.map((item: any) => {
        return { name: item.name, id: item.id };
      });
      setMusicList(list);
    });
  };
  const createSource = (audioCtx: AudioContext) => {
    return audioCtx.createMediaElementSource(audioRef.current as HTMLMediaElement);
  };
  useEffect(() => {
    setSongId(musicList[0]?.id);
  }, [musicList]);
  useEffect(() => {
    if (songId) {
      fetchSongUrlById(songId).then((res: any) => {
        if (res.code === 200 && res.data.length > 0) {
          setSongUrl(res.data[0].url);
        }
      });
      fetchLRCById(songId).then((res: any) => {
        const { lrc } = res;
        setLrc(lrc?.lyric);
      });
      const music = musicList.find((music) => music.id == songId);
      setSongName(music?.name || '');
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
          <Draw createSource={createSource} />
          <div className="text-center py-4 text-2xl text-white">{songName}</div>
          <Lrc lrc={lrc} currentTime={currentTime} />
          <audio
            className="mt-10 mx-auto absolute bottom-0"
            crossOrigin="anonymous"
            ref={audioRef}
            controls
            autoPlay
            src={songUrl}
          ></audio>
        </>
      )}
    </div>
  );
}
