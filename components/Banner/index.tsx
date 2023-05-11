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
