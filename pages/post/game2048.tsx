import styles from '@/styles/game2048.module.scss';
import Layout from '@/components/layout';
import { DIRECTION, Games } from '@/util/games';
import React, { Component } from 'react';

export default class game2048 extends Component<{}, { matrix: Array<Array<number>>; games: Games; score: number }> {
  constructor(props: {}) {
    super(props);
    const games = new Games();
    this.state = { matrix: [], games: games, score: games.score };
  }
  /**
   * 不同按键向不同方向移动
   * @param e
   */
  handleKeyDown(e: KeyboardEvent) {
    const keyCode = e.keyCode;
    e.stopPropagation();
    switch (keyCode) {
      case 38:
        e.preventDefault();
        this.state.games.move(DIRECTION.UP);
        break;
      case 40:
        e.preventDefault();

        this.state.games.move(DIRECTION.DOWN);
        break;
      case 37:
        e.preventDefault();

        this.state.games.move(DIRECTION.LEFT);
        break;
      case 39:
        e.preventDefault();

        this.state.games.move(DIRECTION.RIGHT);
        break;
    }
    this.setState({ matrix: this.state.games.matrix, score: this.state.games.score });
  }
  /**
   * 重新开始
   */
  handleNewGame() {
    this.state.games.newGame();
    this.setState({ matrix: this.state.games.matrix, score: this.state.games.score });
  }
  componentDidMount() {
    this.setState({ matrix: this.state.games.matrix });
    // 监听键盘事件
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', (e) => this.handleKeyDown(e));
  }
  render() {
    const { matrix,  score } = this.state;
    return (
      <Layout>
        <section className="text-white flex">
          <div>
            <div className="text-5xl font-semibold mb-4">2048</div>
            <div className="mb-4">
              合并数字，组合成<span>2048</span>
            </div>
            <div className="m-auto flex gap-4  mb-4">
              <div
                className="flex items-center px-4 rounded-lg bg-[#8f7a66] cursor-pointer"
                onClick={() => {
                  this.handleNewGame();
                }}
              >
                New Game
              </div>
              <div className="flex flex-col items-center bg-[#bbada0] px-4 rounded-lg">
                <span>score</span>
                <span>{score}</span>
              </div>
            </div>
            <div>玩法说明：使用方向键移动方块, 当两个具有相同数字的方块碰触时,它们会和二为一!</div>
          </div>

          <div className={`${styles.gameBox} text-5xl font-semibold p-4 m-auto`}>
            {matrix.map((row, i) =>
              row.map((col, j) => (
                <div
                  className="flex items-center justify-center  "
                  style={{
                    background: col > 0 ? `rgba(${(238 * col) % 255}, 228, 218, 1)` : 'rgba(238 , 228, 218, 0.35)',
                  }}
                  key={i + '' + j}
                >
                  {/* 为0时不显示 */}
                  {col > 0 ? col : ''}
                </div>
              )),
            )}
          </div>
        </section>
      </Layout>
    );
  }
}
