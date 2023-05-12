/**
 * 游戏2028
 * 1.判断自身是否为0，为0，则向后找第一个非0的值，交换两个位置的值，再次向后找下一个非0的值
 * 2.判断下一个值是否在矩阵内 判断下一个值是否为0，为0跳过，继续寻找下一个值，判断下一个值是否和当前值相等，相等则累加，对应位置值置0
 */
export enum DIRECTION {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}
export class Games {
    matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    score = 0
    /**
     * 将不同移动方向抽离成函数，计算下一个坐标，减少判断
     */
    #next = {
        [DIRECTION.DOWN]: (i: number, j: number): Array<number> => [i - 1, j],
        [DIRECTION.LEFT]: (i: number, j: number): Array<number> => [i, j + 1],
        [DIRECTION.UP]: (i: number, j: number): Array<number> => [i + 1, j],
        [DIRECTION.RIGHT]: (i: number, j: number): Array<number> => [i, j - 1]
    }
    constructor() {
        this.newGame()
    }
    newGame() {
        this.score = 0;
        this.matrix = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.#randomPos()
        this.#randomPos()
    }
    #randomPos() {
        let isEnd = true
        for (let a = 0; a < this.matrix.length; a++) {
            for (let b = 0; b < this.matrix[a].length; b++) {
                if (!this.matrix[a][b]) {
                    isEnd = false
                    break
                }
            }
        }
        if (isEnd) {
            return alert('游戏结束')
        }
        const i = Math.floor(Math.random() * this.matrix.length)
        const j = Math.floor(Math.random() * this.matrix[i].length)
        if (!this.matrix[i][j]) {
            return this.matrix[i][j] = 2
        } else {
            this.#randomPos()
        }
    }
    /**
     * 判断是否在矩阵内
     * @param i 纵坐标
     * @param j 横坐标
     * @returns 
     */
    #inRange(i: number, j: number) {
        return this.matrix[i] && this.matrix[i][j] !== undefined
    }
    /**
     * 获取下一个值
     */
    #getNext(direction: DIRECTION, i: number, j: number) {
        // 根据方向获取下一个坐标
        let [nextI, nextJ] = this.#next[direction](i, j)
        // 判断是否在矩阵内
        while (this.#inRange(nextI, nextJ)) {
            const nextValue = this.matrix[nextI][nextJ]
            // 如果该坐标不为0 返回结果 为0寻找下一个坐标，知道找到为止
            if (nextValue !== 0) {
                return [nextI, nextJ, nextValue]
            } else {
                [nextI, nextJ] = this.#next[direction](nextI, nextJ)
            }
        }

    }
    /**
     * 计算值
     * @param direction 方向
     * @param i 纵坐标
     * @param j 横坐标
     * @returns 
     */
    #calculate(direction: DIRECTION, i: number, j: number) {
        if (!this.#inRange(i, j)) return
        // 计算这个位置的值
        const result = this.#getNext(direction, i, j)
        if (!result) return
        const [nextI, nextJ, nextValue] = result
        // 判断当前值是否为0 为0则交换值后继续计算
        if (this.matrix[i][j] === 0) {
            this.matrix[i][j] = nextValue
            this.matrix[nextI][nextJ] = 0
            // 为0 交换位置后再计算一次
            this.#calculate(direction, i, j)
            // 判断当前值和下一个值是否相等 相等累加 
        } else if (this.matrix[i][j] === nextValue) {
            // 和下一个值相等则累加
            this.matrix[i][j] += nextValue
            this.matrix[nextI][nextJ] = 0
            this.score += 2
        }
        // 计算下个位置的值
        const [_nextI, _nextJ] = this.#next[direction](i, j)
        this.#calculate(direction, _nextI, _nextJ)
    }
    move(direction: DIRECTION) {
        switch (direction) {
            case DIRECTION.DOWN:
                // 向下：从左向右遍历 从最后一行计算
                for (let j = 0; j < 4; j++) {
                    this.#calculate(direction, 3, j)
                }
                break;
            case DIRECTION.UP:
                // 向上：从左向右遍历列 从第一行开始计算
                for (let j = 0; j < 4; j++) {

                    this.#calculate(direction, 0, j)
                }
                break;
            case DIRECTION.LEFT:
                // 向左：从上往下遍历行 从第一列开始计算
                for (let i = 0; i < 4; i++) {
                    this.#calculate(direction, i, 0)
                }
                break;
            case DIRECTION.RIGHT:
            default:
                // 向右：从上往下遍历行 从最后一列开始计算
                for (let i = 0; i < 4; i++) {
                    this.#calculate(direction, i, 3)
                }
                break;
        }
        // 每次移动后新加一个方块
        this.#randomPos()
    }

}