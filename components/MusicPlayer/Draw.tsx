/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-14 16:04:01
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-17 15:49:24
 * @FilePath: \study\codeNinjaBlog\components\MusicPlayer\Draw.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, createRef, LegacyRef } from 'react';
export type DrawProp = {
  getData: () => Uint8Array;
};
export type DrawState = {
  isInit: boolean;
};
export default class Draw extends Component<DrawProp, DrawState> {
  constructor(props: DrawProp) {
    super(props);
  }
  canvasRef = createRef<HTMLCanvasElement>();
  ctx: CanvasRenderingContext2D | null = null;
  w: number = 0;
  h = 0;
  dataArr: Uint8Array = new Uint8Array();
  init = () => {
    if (this.state.isInit) return;

    this.setState({ isInit: true });
  };
  /**
   * 画波形
   */
  draw = () => {
    // 逐帧绘画
    requestAnimationFrame(this.draw);
    if (!this.state.isInit || !this.ctx) return;
    // 将解析数据放到数组里
    this.dataArr = this.props.getData();
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
      console.log(this.dataArr);
      this.ctx.fillRect(x1, y, barWidth - 2, barHeight);
      this.ctx.fillRect(x2, y, barWidth - 2, barHeight);
    }
  };
  componentDidMount() {
    console.log(this.canvasRef);
    const canvas = this.canvasRef.current as HTMLCanvasElement;
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight / 2;
    this.w = canvas.width;
    this.h = canvas.height;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = '#fa8072';
  }

  render() {
    return <canvas ref={this.canvasRef} className="w-full absolute bottom-0"></canvas>;
  }
}
