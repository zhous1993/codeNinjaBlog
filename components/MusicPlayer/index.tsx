/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 16:51:00
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-24 17:31:01
 * @FilePath: \study\codeNinjaBlog\components\MusicPlayer\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import Styles from './index.module.scss';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { fm, fetchSongUrlById } from '@/api/music';
export type MusicInfoType = {
  songId: string;
  songUrl: string;
  songName: string;
};
export type MusicPlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  musicList: Array<any>;
  musicInfo?: { songId: string; songUrl: string; songName: string };
  dataArr: Uint8Array;
};
export type MusicPlayerProps = {
  timeUpdate?: Fn;
  draw: Fn;
  change: Fn;
};
class MusicPlayer extends React.Component<MusicPlayerProps, MusicPlayerState> {
  constructor(props: MusicPlayerProps) {
    super(props);

    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      musicList: [],
      dataArr: new Uint8Array(),
    };

    this.audio = null;
  }
  audio: HTMLAudioElement | null;
  analyser: AnalyserNode | null = null;
  audioCtx: AudioContext | null = null;
  source: MediaElementAudioSourceNode | null = null;
  isInit = false;
  fetchMusicList = async () => {
    const { data } = await fm();

    const list = data.map((item: any) => {
      return { name: item.name, id: item.id };
    });
    this.setState({ musicList: list });
    return list;
  };
  async componentDidMount() {
    const list = await this.fetchMusicList();
    this.next();

    this.initAudio();
  }
  initAudio() {
    if (this.isInit) return;
    this.audio = document.querySelector('.audio') as HTMLAudioElement;

    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 512;
    this.setState({ dataArr: new Uint8Array(this.analyser.frequencyBinCount) });
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.next.bind(this));
    this.draw();
    this.isInit = true;
  }
  async next() {
    if (this.state.musicList.length > 0) {
      const list = [...this.state.musicList];
      const music = list.shift();
      this.setState({ musicList: [...list] });
      this.changeSong(music);
    } else {
      const list = await this.fetchMusicList();
      this.setState({ musicList: list });
      this.next();
    }
  }
  async changeSong(music: any) {
    const { id: songId, name: songName } = music;
    const res: any = await fetchSongUrlById(songId);
    if (res.code === 200 && res.data.length > 0) {
      this.setState({ musicInfo: { songUrl: res.data[0].url, songId, songName } });
    }
    this.props.change({ songName, songId });
    return { songUrl: res.data[0].url, songId, songName };
  }
  draw = () => {
    if (this.props.draw) {
      requestAnimationFrame(this.draw);
      this.analyser?.getByteFrequencyData(this.state.dataArr);
      this.props.draw({ dataArr: this.state.dataArr });
    }
  };
  componentWillUnmount() {
    if (this.audio) {
      this.audio.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
      this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
      this.audio.removeEventListener('ended', () => {
        this.next();
      });
    }
  }
  handleLoadedMetadata = () => {
    this.setState({ duration: this.audio!.duration });
  };

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.audio!.currentTime });
    this.props.timeUpdate && this.props.timeUpdate(this.audio?.currentTime);
  };

  togglePlay = () => {
    if (!this.audio) return;

    if (this.state.isPlaying) {
      this.audio!.pause();
    } else {
      this.audio!.play();
    }

    this.setState({ isPlaying: !this.state.isPlaying });
    this.isInit = true;
  };

  formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  render() {
    const { isPlaying, currentTime, duration, musicInfo } = this.state;

    return (
      <div
        className={`fixed w-full bottom-0 left-0 h-50px bg-black text-white ${Styles.playerBar} flex items-center justify-center`}
      >
        {/* <div className="cursor-pointer">
          <SkipPreviousIcon />
        </div>
        <div className="cursor-pointer" onClick={this.togglePlay}>
          {!isPlaying ? <PlayCircleOutlineIcon fontSize="large" /> : <PauseCircleOutlineIcon fontSize="large" />}
        </div>
        
        <div className={Styles.progressBar}>
          <div>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <span>{this.formatTime(currentTime)}</span>/<span>{this.formatTime(duration)}</span>
        </div> */}
        <div
          className="cursor-pointer"
          onClick={() => {
            this.next();
          }}
        >
          <SkipNextIcon />
        </div>
        <audio
          className="audio absolute bottom-0 left-0  "
          src={musicInfo?.songUrl}
          controls
          crossOrigin="anonymous"
          autoPlay
        ></audio>
      </div>
    );
  }
}

export default MusicPlayer;
