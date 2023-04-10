/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 16:51:00
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-10 16:56:50
 * @FilePath: \study\codeNinjaBlog\components\MusicPlayer\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import Styles from './index.module.scss';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };

    this.audio = null;
  }

  componentDidMount() {
    this.audio = new Audio(this.props.audioSrc);

    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.togglePlay);
  }

  componentWillUnmount() {
    this.audio.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.removeEventListener('ended', this.togglePlay);
  }

  handleLoadedMetadata = () => {
    this.setState({ duration: this.audio.duration });
  };

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.audio.currentTime });
  };

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }

    this.setState({ isPlaying: !this.state.isPlaying });
  };

  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  render() {
    const { isPlaying, currentTime, duration } = this.state;
    const { audioSrc } = this.props;

    return (
      <div
        className={`fixed w-full bottom-0 left-0 h-50px bg-black text-white ${Styles.playerBar} flex items-center justify-center`}
      >
        <div className="cursor-pointer">
          <SkipPreviousIcon />
        </div>
        <div className="cursor-pointer" onClick={this.togglePlay}>
          {!isPlaying ? <PlayCircleOutlineIcon fontSize="large" /> : <PauseCircleOutlineIcon fontSize="large" />}
        </div>
        <div className="cursor-pointer">
          <SkipNextIcon />
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
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
