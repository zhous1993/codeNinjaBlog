/*
 * @Author: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @Date: 2023-04-08 14:11:24
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-12 17:08:53
 * @FilePath: \Study\ninja-blog\components\layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Header from './Layout/Header';
import Banner from './Banner';
import styles from '../styles/layout.module.scss';
import Footer from './Layout/Footer';

export default function Layout({ children, home }: any) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <Header />
        <Banner />
        <div className={`${styles.main} w-full flex-1 p-4 min-h-[600px]`}>
          <div className="w-[1280px] mx-auto">{children}</div>
        </div>
        <Footer />
      </main>
    </>
  );
}
