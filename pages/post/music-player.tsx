/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 17:05:24
 * @LastEditors: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @LastEditTime: 2023-04-11 20:20:25
 * @FilePath: \study\codeNinjaBlog\pages\post\music-player.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fetchSongUrlById, fm } from '@/api/music';
import MusicPlayerLogin from '@/components/MusicPlayer/Login';
import styles from '@/styles/music-player.module.scss';
import { useEffect, useRef, useState } from 'react';
export default function MusicPlayerView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  // const [isInit, setIsInit] = useState<boolean>(true);
  let ctx: CanvasRenderingContext2D;
  // 画布宽高
  let w = 0,
    h = 0;
  useEffect(() => {
    if (canvasRef.current) {
      // 初始化canvas
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight / 2;
      w = canvasRef.current.width;
      h = canvasRef.current.height;
      ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      ctx.fillStyle = '#fff';
    }
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        const index = musicList.findIndex((item) => item.id == songId);
        if (index < musicList.length - 3) {
          setSongId(musicList[index + 1].id);
        } else {
          fetchMusicList();
        }
      });
    }
    audioRef.current?.addEventListener('play', init);
    draw();
    fetchMusicList();
  }, []);
  let audioCtx, source, analyser: AnalyserNode, dataArr: Uint8Array;
  let isInit = false;

  const init = () => {
    if (isInit) return;
    // 音频上下文
    audioCtx = new window.AudioContext();
    // 音频源
    source = audioCtx.createMediaElementSource(audioRef.current as HTMLMediaElement);
    // 分析器
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    // 创建byte数组 接收分析器数据
    dataArr = new Uint8Array(analyser.frequencyBinCount); //
    // 链接分析器
    source.connect(analyser);
    // 连接输出设备
    analyser.connect(audioCtx.destination);
    isInit = true;
  };
  /**
   * 画波形
   */
  const draw = () => {
    // 逐帧绘画
    requestAnimationFrame(draw);
    if (!isInit) return;
    // 将解析数据放到数组里
    analyser.getByteFrequencyData(dataArr);
    // 清空画布
    ctx.clearRect(0, 0, canvasRef.current?.width as number, canvasRef.current?.height as number);
    const barLength = dataArr.length / 2.5;
    const barWidth = w / barLength / 2;
    for (let i = 0; i < dataArr.length; i++) {
      const x1 = i * barWidth + w / 2;
      // 对称画图
      const x2 = w / 2 - i * barWidth;
      const barHeight = (dataArr[i] / 256) * h;
      const y = h - barHeight;
      ctx.fillRect(x1, y, barWidth - 2, barHeight);
      ctx.fillRect(x2, y, barWidth - 2, barHeight);
    }
  };
  const [musicList, setMusicList] = useState<{ name: string; id: string }[]>([]);
  const [songId, setSongId] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const fetchMusicList = () => {
    fm().then(({ data }: any) => {
      const list = data.map((item: any) => {
        return { name: item.name, id: item.id };
      });
      setMusicList(list);
    });
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
    }
  }, [songId]);
  return (
    <div className={`${styles.playerView}`}>
      <canvas ref={canvasRef} className="w-full"></canvas>
      <audio className="mt-10 mx-auto" crossOrigin="anonymous" ref={audioRef} controls src={songUrl}></audio>
      <MusicPlayerLogin />
    </div>
  );
}
