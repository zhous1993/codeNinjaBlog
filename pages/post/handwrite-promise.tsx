import Layout from '@/components/layout';
import { MyPromise } from '@/util/myPromise';
import { useEffect } from 'react';

export default function HandwritePromise() {
  useEffect(() => {
    const p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(111);
      }, 1000);
    });
    p1.then(
      (res) => {
        console.log('成功1', res);
      },
      (err) => {
        console.log('失败1', err);
        return 456;
      },
    ).then((data) => {
      console.log('ok', data);
    });
    p1.then(
      (res) => {
        console.log('成功2', res);
      },
      (err) => {
        console.log('失败2', err);
      },
    );
    p1.then((res) => {
      console.log('成功3', res);
    });
    p1.then((res) => {
      console.log('成功4', res);
    });

    const p2 = new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
    p2.then((res) => {
      console.log('p2成功', res);
    });
    p2.then((res) => {
      console.log('p2成功2', res);
    });
  }, []);
  return (
    <Layout>
      <section className="text-white">
        <h2 className="text-lg font-semibold">思路：</h2>
        <p className="text-white leading-8">
          1. 构造函数 接收一个函数executor， 默认执行
          <br />
          2. executor 有两个参数resolve、reject，参数都为函数 用于改变promise状态
          <br />
          3. promise 有状态 state 和结果两个属性 #标记为私有属性
          <br />
          4. resolve 执行成功，改变状态为fullfield reject 拒绝函数，改变状态为reject,
          将resolve和reject公用代码提取为changeState函数 函数接收一个state，和结果
          result,如果promise状态已经改变，则return
          <br />
          5. executor 执行出错会抛出错误 所以将executor 放入try catach， 但是不能捕获executor里的异步错误, 执行出错后
          自动reject，抛出异常
          <br />
          1. promise都有一个then方法,then方法接收两个回调函数，一个成功，一个失败,回调函数接收执行结果， then
          方法返回一个新的promise <br />
          2. 什么时候调用then方法,什么时候执行onFullield，什么时候执行onRejected <br />
          3. 当state 为fullfield时执行onFullfield, 为reject时执行onRejected, 可是不知道什么时候State变化 <br />
          4. changeState函数调用时 state改变，所以在changeState函数里执行onFullfield， onReject <br />
          5.
          为了能在changeState里执行onFullfield和onRejected，将执行函数抽离为#run函数，在then方法和changeState方法里调用#run函数执行
          <br />
          6.
          run方法需要访问onFullfield和onRejected，resolve、reject，在then方法里用变量#handler记录下onFUllfield，onRejected，resolve，reject，因为then方法可以多次调用，所以#handler是个数组，所以用#handlers记录
          <br />
          7. run方法遍历#handlers,执行onFullield，onRejected, 如果state不是pending则return
          <br />
          什么时候调用then方法的resolve、reject <br />
          1. onFullfield、onRejected不是函数 onFullfield调用resolve，onRejected调用reject <br />
          2. 传入的是函数，则看运行是否报错，放入try catch块中执行 <br />
          3. onFullfield、onRejected是promise，穿透， 将resolve，reject穿入promise <br />
          4. 将公共代码提取为函数，runOne <br />
          5. 将promise放入微队列执行
        </p>
        <h2 className="text-lg font-semibold">总结：</h2>
        <p className="leading-8">
          1.promise的两个关键点：1.构造函数:改变状态；2.then方法：执行回调
          <br />
          2.promise包含两个属性：result 结果，state 状态， state有三个值：“pending”、“fullfield”、“rejected”。
          <br />
          3.promise包含changeState、then、run
          三个方法,changeState改变state和调用run方法，then接收参数和调用run方法，run为遍历执行回调函数的方法。
          <br />
          4.promise构造函数接收一个executor函数，在构造里执行executor函数，executor包含resolve 和reject
          两个回调函数，resolve成功，reject失败，回调函数里调用changeState方法改变state。
          <br />
          5.then方法接收两个回调函数，一个成功onFullield，一个失败onRejected，返回一个promise。
          <br />
          6.run方法根据执行结果和传入的参数类型，针对不同情况执行回调函数，返回结果。
        </p>
        <div className="flex mt-4">
          <img className="m-auto" src="/handwrite-promise.png" alt="" />
        </div>
      </section>
    </Layout>
  );
}
