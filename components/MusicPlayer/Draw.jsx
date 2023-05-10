import React, { Component, createRef, LegacyRef } from 'react';

export default class Draw extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.state = {
      isInit: false
    }
    this.isInit = false
  }
  init = () => {
    if (this.isInit) return;
    // 音频上下文
    console.log(111)
    this.audioCtx = new window.AudioContext();
    // 音频源
    this.source = this.props.createSource(this.audioCtx)
    console.log(this.source)
    // 分析器
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 512;
    // 创建byte数组 接收分析器数据
    this.dataArr = new Uint8Array(this.analyser.frequencyBinCount); //
    // 链接分析器
    this.source.connect(this.analyser);
    // 连接输出设备
    this.analyser.connect(this.audioCtx.destination);
    this.isInit = true
  };
    /**
   * 画波形
   */
     draw = () => {
      // 逐帧绘画
      requestAnimationFrame(this.draw);
      if (!this.isInit) return;
      // 将解析数据放到数组里
      this.analyser.getByteFrequencyData(this.dataArr);
      // 清空画布
      this.ctx.clearRect(0, 0, this.w, this.h);
      const barLength = this.dataArr.length / 2.5;
      const barWidth = this.w / barLength / 2;

      for (let i = 0; i < this.dataArr.length; i++) {
        const x1 = i * barWidth + this.w / 2;
        // 对称画图
        const x2 = this.w / 2 - i * barWidth;
        const barHeight = (this.dataArr[i] / 256) * this.h;
        const y = this.h - barHeight;
        console.log(this.dataArr)
        this.ctx.fillRect(x1, y, barWidth - 2, barHeight);
        this.ctx.fillRect(x2, y, barWidth - 2, barHeight);
      }
    };
  componentDidMount() {
    console.log(this.canvasRef)
    this.canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      this.canvasRef.current.height = window.innerHeight / 2;
    this.w = this.canvasRef.current.width;
    this.h = this.canvasRef.current.height;
    this.ctx = this.canvasRef.current.getContext('2d');
    this.ctx.fillStyle = '#fa8072';
    
    
  }
 
  render() {
    return <canvas ref={this.canvasRef} className="w-full absolute bottom-0"></canvas>;
  }
}
