/**
 * 瀑布流思路：
 * 1.根据容器宽度计算图片宽度、列数、间距
 * 2.根据计算出的图片宽度、列数、间距确定每列图片的left值
 * 3.定义一个数组，计算保存每一列图片下一张图片的top值，取数组中top值最小的值为下一张图片所在列。
 * 4.根据计算的left值和top给图片定位，根据top最大值，给容器设置高度
 * 5. 利用IntersectionObserver API代替传统监听滚动高度来实现加载更多；创建IntersectionObserver 对象， 监听scrollerFooter 元素是否进入可视区域，进入可视区域后出发loadMore，加载更多图片
 * 注意点：
 * 1.需要等图片加载完成后再计算位置和高度, IntersectionObserver接受一个回调函数和一个option配置对象，回调函数接收监听对象的entries， option：{threshold：阈值，0~1,0刚接触，1全部进入，rootMargin： 增加视口判断区域，root：监听元素的祖先元素}
 */
import { queryImage } from '@/api';
import Layout from '@/components/layout';
import React, { Component } from 'react';

export default class waterfall extends Component<
  {},
  { imageList: Array<string>; page: number; container: HTMLElement | null; yAxios: number[]; isLoading: boolean }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      imageList: [],
      page: 1,
      container: null,
      yAxios: [0, 0, 0],
      isLoading: false,
    };
  }
  observer: IntersectionObserver | null = null;
  imgW = 420;
  xAxios = [0, 430, 860];
  async loadImage() {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    const {
      data: { hits, totalHits },
    } = await queryImage(this.state.page);
    if (totalHits > this.state.page) {
      this.setState({ page: this.state.page + 1 });
    }
    hits.forEach((item: any) => {
      const { previewURL } = item;
      const imgEl = new Image();
      imgEl.src = previewURL;
      imgEl.style.position = 'absolute';
      imgEl.style.width = 420 + 'px';

      imgEl.onload = () => {
        const { i, x, y } = this.calcPos();

        imgEl.style.left = x + 'px';
        imgEl.style.top = y + 'px';
        const yAxios = this.state.yAxios;
        yAxios[i] += imgEl.height + 10;
        this.setState({ yAxios });
        const el = document.querySelector('.waterfall-container') as HTMLElement;
        el ? (el.style.height = Math.max(...this.state.yAxios) + 'px') : '';
      };
      this.state.container?.appendChild(imgEl);
    });
    this.setState({ isLoading: false });
  }
  /**
   * 计算最小top ，left， index
   */
  calcPos() {
    const y = Math.min(...this.state.yAxios);
    const i = this.state.yAxios.findIndex((n) => n === y);
    const x = this.xAxios[i];
    return { i, x, y };
  }
  /**
   * 滚动到底加载更多
   * @param e
   */
  handleScroll = (e: Event) => {
    //获取网页的总高度
    const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    //clientHeight是网页在浏览器中的可视高度
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //scrollTop是浏览器滚动条的top位置
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop + clientHeight - scrollHeight == 0) {
      this.loadImage();
    }
  };
  componentDidMount(): void {
    this.setState({ container: document.querySelector('.waterfall-container') });
    // 创建observer对象
    this.observer = new IntersectionObserver(
      (entries) => {
        //遍历entries ，如果isIntersecting为true 则元素已进入视口，开始加载更多。。。
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage();
          }
        });
      },
      { threshold: 1 },
    );
    this.observer.observe(document.querySelector('.scrollerFooter') as Element);
    this.loadImage();
    // window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount(): void {
    // window.removeEventListener('scroll', this.handleScroll);
    // 组件销毁取消订阅
    this.observer ? this.observer.disconnect() : '';
  }
  render() {
    return (
      <Layout>
        <section className="waterfall-container relative overflow-hidden"></section>
        <div className="scrollerFooter text-center my-4">加载中...</div>
      </Layout>
    );
  }
}
