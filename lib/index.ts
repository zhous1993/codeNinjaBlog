import fs from 'fs';
import path from 'path';
import pinyin from 'pinyin';
const postsDirectory = path.join(process.cwd(), 'posts');
const filename = 'poet.tang.0.json';
const API_KEY = process.env.Pixabay_Key;
const API_BASE = process.env.Pixabay_Base;
let poetry: Array<any> = [];
const reg = /[\u4e00-\u9fa5]/g;

const translatePinyin = (params: any) => {
  const res = new Map();
  try {
    const str = JSON.stringify(params);
    const cnArr = str.match(reg);
    cnArr?.forEach((cn) => {
      res.set(cn, pinyin(cn)[0]);
    });
    return Array.from(res);
  } catch (error) {
    return [];
  }
};
const readJSON = async () => {
  const fileContent = await fs.readFileSync(path.join(postsDirectory, filename), 'utf-8');
  let res;
  try {
    res = JSON.parse(fileContent);
  } catch (error) {
    res = [];
  }
  poetry = res;
};
const getDailyPoetry = async () => {
  if (poetry.length <= 0) {
    await readJSON();
  }
  const index = Math.round(Math.random() * 1000);
  const res = { ...poetry[index] };
  res.pinyin = translatePinyin(poetry[index]);
  console.log(res);
  return JSON.stringify(res);
};
const params = {
  orientation: 'horizontal',
};
const page = Math.round(Math.random() * 50);
const fetchBannerImg = async () => {
  const res = await fetch(`${API_BASE}?orientation=horizontal&page=${page}`);
  return JSON.stringify(res);
};
export { getDailyPoetry, fetchBannerImg };
