import styles from './index.module.css';
import { Typography } from '@mui/material';
export default function Banner() {
  return (
    <section className="w-full p-[150px] relative">
      <div className={`${styles.bgImage} absolute w-full left-0 top-0 z-[-1]`}></div>
      <h1 className="text-center text-6xl font-bold text-white ">
        <span className="hover:text-[#ca2017] transition cursor-pointer">CodeNinja</span>
      </h1>
    </section>
  );
}
