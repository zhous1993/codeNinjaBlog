import { Card, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export type PoetryType = {
  author: string;
  paragraphs: string[];
  title: string;
  strains: string[];
  pinyin: Array<[string, string]>;
};
export const formatTime = (date: Date) => {
  let _date = new Date(date);
  const yyyy = _date.getFullYear();
  const m = _date.getMonth() + 1;
  const d = _date.getDate();
  const w = _date.getDay();
  return { yyyy, m, d, w };
};
export const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const formatPinyin = (str: string, pinyin: Array<[string, string]>) => {
  const arr = str.split('');
  const _pinyin = new Map(pinyin);
  return (
    <>
      {arr.map((key, index) => (
        <div key={index} className="w-[50px] py-2 inline-block text-center">
          <ruby>
            {key}
            <rp>(</rp>
            <rt>{_pinyin.get(key)}</rt>
            <rp>)</rp>
          </ruby>
        </div>
      ))}
    </>
  );
};
export default function DailyPoetry({ poetry }: { poetry: PoetryType }) {
  useEffect(() => {
    const { yyyy, m, d, w } = formatTime(new Date());
    setDate({ yyyy, m, d, w: WEEKS[w] });
  }, []);
  useEffect(() => {
    let list: string[] = [];
    poetry.paragraphs.forEach((item) => {
      item = item.replace('。', '');
      list = [...list, ...item.split('，')];
    });
    setPoetryList(list);
  }, [poetry]);

  const [poetryList, setPoetryList] = useState<Array<string>>([]);
  const [date, setDate] = useState<any>({});

  return (
    <Card>
      <article className=" text-center tracking-widest p-4">
        <div className="absolute">
          <CalendarMonthIcon />
        </div>
        <div className="text-lg font-semibold">{`${date.yyyy}.${date.m} ${date.w}`}</div>
        <div className="text-4xl font-semibold">{date.d}</div>
        <Divider className="my-4" />
        <div className="text-2xl font-semibold mb-2">{poetry.title}</div>
        <div className="text-[#333] mb-2">{poetry.author}</div>
        <div>
          {poetryList.map((item, index) => (
            <div key={index}>{formatPinyin(item, poetry.pinyin)}</div>
          ))}
        </div>
      </article>
    </Card>
  );
}
