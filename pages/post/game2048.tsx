import styles from '@/styles/game2048.module.scss';
import Layout from '@/components/layout';
import { DIRECTION, Games } from '@/util/games';
import React, { Component } from 'react';

export default class game2048 extends Component<{}, { matrix: Array<Array<number>>; games: Games }> {
  constructor(props: {}) {
    super(props);
    const games = new Games();
    this.state = { matrix: [], games: games };
  }
  handleKeyDown(e: KeyboardEvent) {
    const keyCode = e.keyCode;
    e.stopPropagation();
    switch (keyCode) {
      case 38:
        e.preventDefault();
        console.log(this);
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
    this.setState({ matrix: this.state.games.matrix });
  }
  componentDidMount() {
    this.setState({ matrix: this.state.games.matrix });
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', (e) => this.handleKeyDown(e));
  }
  render() {
    const { matrix } = this.state;
    return (
      <Layout>
        <section className="text-white">
          <div className={`${styles.gameBox} text-5xl font-semibold p-4 m-auto`}>
            {matrix.map((row, i) =>
              row.map((col, j) => (
                <div
                  className="flex items-center justify-center  "
                  style={{ background: 'rgba(238, 228, 218, 0.35)' }}
                  key={i + '' + j}
                >
                  {col}
                </div>
              )),
            )}
          </div>
        </section>
      </Layout>
    );
  }
}
