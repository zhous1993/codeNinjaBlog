/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-12 16:01:44
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-24 10:19:34
 * @FilePath: \study\codeNinjaBlog\components\Banner\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from './index.module.css';
import { Typography } from '@mui/material';
import { fetchBannerImg } from '@/api';
import { useState, useEffect } from 'react';

export default function Banner() {
  const [bannerBg, setBannerBg] = useState('');

  useEffect(() => {
    fetchBannerImg().then(({ data }) => {
      const { hits } = data;
      setBannerBg(hits[0].largeImageURL);
    });
  }, []);

  return (
    <section className="w-full p-[150px] relative">
      <div
        className={`${styles.bgImage} absolute w-full left-0 top-0 z-[-1]`}
        style={{ backgroundImage: `url(${bannerBg})` }}
      ></div>
      <h1 className="text-center text-6xl font-bold text-white ">
        <span className="hover:text-[#ca2017] transition cursor-pointer">CodeNinja</span>
      </h1>
    </section>
  );
}
