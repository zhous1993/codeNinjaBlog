/*
 * @Author: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @Date: 2023-04-08 13:46:36
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-11 14:03:46
 * @FilePath: \Study\ninja-blog\pages\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import BlogList, { BlogItemType } from '@/components/BlogList';
import { getDailyPoetry } from '../lib/index';
import { PoetryType } from '@/components/DailyPoetry';
const inter = Inter({ subsets: ['latin'] });
const blogList: Array<BlogItemType> = [
  { title: 'day01 todoList', id: '01', date: '2023-4-8', link: '/post/todo-list' },
  { title: 'day02 文字交融', id: '02', date: '2023-4-9', link: '/post/words-blend' },
  { title: 'day03 contextMenu', id: '03', date: '2023-4-10', link: '/post/context-menu' },
  { title: 'day04 音频可视化', id: '04', date: '2023-4-10', link: '/post/music-player' },
  { title: 'day05 转盘大抽奖', id: '05', date: '2023-5-6', link: '/post/css3-lottery-wheel' },
  { title: 'day06 手写Promise', id: '06', date: '2023-5-10', link: '/post/handwrite-promise' },
  { title: 'day07 2048', id: '07', date: '2023-5-11', link: '/post/game2048' },
  { title: 'day08 瀑布流', id: '08', date: '2023-5-16', link: '/post/waterfall' },
];
export async function getServerSideProps() {
  let dailyPoetry = await getDailyPoetry();
  dailyPoetry = JSON.parse(dailyPoetry);
  return {
    props: {
      dailyPoetry,
    },
  };
}

export default function Home({ dailyPoetry }: { dailyPoetry: PoetryType }) {
  return (
    <Layout home dailyPoetry={dailyPoetry}>
      <BlogList list={blogList} />
    </Layout>
  );
}
