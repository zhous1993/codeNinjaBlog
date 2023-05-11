import { resolve } from 'path';
/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-05-10 14:59:49
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-11 09:40:14
 * @FilePath: \study\codeNinjaBlog\util\myPromise.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE   
 */
/**
 * 1. 构造函数 接收一个函数executor， 默认执行
 * 2. executor 有两个参数resolve、reject，参数都为函数 用于改变promise状态
 * 3. promise 有状态 state 和结果两个属性 #标记为私有属性
 * 4. resolve 执行成功，改变状态为fullfield reject 拒绝函数，改变状态为reject, 将resolve和reject公用代码提取为changeState函数 函数接收一个state，和结果 result,如果promise状态已经改变，则return
 * 5. executor 执行出错会抛出错误 所以将executor 放入try catach， 但是不能捕获executor里的异步错误, 执行出错后 自动reject，抛出异常
 * 
 * then 方法 
 * 1. promise都有一个then方法,then方法接收两个回调函数，一个成功，一个失败,回调函数接收执行结果， then 方法返回一个新的promise
 * 2. 什么时候调用then方法,什么时候执行onFullield，什么时候执行onRejected
 * 3. 当state 为fullfield时执行onFullfield, 为reject时执行onRejected, 可是不知道什么时候State变化
 * 4. changeState函数调用时 state改变，所以在changeState函数里执行onFullfield， onReject
 * 5. 为了能在changeState里执行onFullfield和onRejected，将执行函数抽离为#run函数，在then方法和changeState方法里调用#run函数执行
 * 6. run方法需要访问onFullfield和onRejected，resolve、reject，在then方法里用变量#handler记录下onFUllfield，onRejected，resolve，reject，因为then方法可以多次调用，所以#handler是个数组，所以用#handlers记录
 * 7. run方法遍历#handlers,执行onFullield，onRejected, 如果state不是pending则return
 * 
 * 什么时候调用then方法的resolve、reject 
 * 1. onFullfield、onRejected不是函数 onFullfield调用resolve，onRejected调用reject
 * 2. 传入的是函数，则看运行是否报错，放入try catch块中执行
 * 3. onFullfield、onRejected是promise，穿透， 将resolve，reject穿入promise
 * 4. 将公共代码提取为函数，runOne
 * 5. 将promise放入微队列执行
 *
 */
export enum PROMISE_STATUS {
    PENDING = 'pending',
    FULLFIELD = 'fullfield',
    REJECT = 'reject'
}
export type HandlerType = { onFullfield: Fn, onRejected: Fn, resolve: Fn, reject: Fn }
export class MyPromise {
    #state: PROMISE_STATUS = PROMISE_STATUS.PENDING;
    #result: any = undefined;
    #handlers: Array<HandlerType> = []
    constructor(executor: (resolve: Fn, reject: Fn) => void) {
        const resolve = (res: any) => {
            this.#changeState(PROMISE_STATUS.FULLFIELD, res)
        }
        const reject = (err: any) => {
            this.#changeState(PROMISE_STATUS.REJECT, err)
        }
        try {

            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    };
    #isPromise(obj: Fn): boolean {
        return false
    }
    #runMicroTask(func: Fn) {
        setTimeout(func, 0);
    }
    #changeState(state: PROMISE_STATUS, result: any) {
        if (this.#state !== PROMISE_STATUS.PENDING) return
        this.#state = state
        this.#result = result
        this.#run()
    }

    then(onFullfield: Fn, onRejected: Fn) {

        return new MyPromise((resolve, reject) => {
            this.#handlers ? this.#handlers.push({ onFullfield, onRejected, resolve, reject }) : this.#handlers = [{ onFullfield, onRejected, resolve, reject }]
            this.#run()
        })
    }

    #runOne(callback: Fn, resolve: Fn, reject: Fn) {
        this.#runMicroTask(() => {
            if (typeof callback !== 'function') {
                const settled = this.#state == PROMISE_STATUS.FULLFIELD ? resolve : reject
                settled(this.#result)
                return
            }
            try {
                const data = callback(this.#result)
                if (this.#isPromise(data)) {
                    data.then(resolve, reject)
                } else {
                    resolve(data)
                }
            } catch (error) {
                reject(error)
            }
        })

    }

    #run() {
        if (this.#state === PROMISE_STATUS.PENDING) return
        while (this.#handlers?.length) {
            const { onFullfield, onRejected, resolve, reject } = this.#handlers.shift() as HandlerType
            if (this.#state === PROMISE_STATUS.FULLFIELD) {
                this.#runOne(onFullfield, resolve, reject)

            } else if (this.#state === PROMISE_STATUS.REJECT) {
                this.#runOne(onRejected, resolve, reject)

            }
        }
    }
}

