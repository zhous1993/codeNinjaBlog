/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 17:05:24
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-10 18:04:47
 * @FilePath: \study\codeNinjaBlog\pages\post\music-player.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MusicPlayer from '@/components/MusicPlayer';
import styles from '@/styles/music-player.module.scss';
import { useEffect, useRef, useState } from 'react';
export default function MusicPlayerView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  const [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight / 2;
    }
    audioRef.current?.addEventListener('play', init);
    draw();
  }, []);
  let audioCtx, source, analyser: AnalyserNode, dataArr: Uint8Array;
  const init = () => {
    if (!isInit) return;
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
    setIsInit(false);
    console.log(dataArr);
  };
  const draw = () => {
    requestAnimationFrame(draw);
    console.log(isInit);
    if (isInit) return;
    analyser.getByteFrequencyData(dataArr);
    console.log(dataArr);
  };
  return (
    <div className={`${styles.playerView}`}>
      <canvas ref={canvasRef}></canvas>
      <audio ref={audioRef} controls src="/小城故事.wav"></audio>
    </div>
  );
}
