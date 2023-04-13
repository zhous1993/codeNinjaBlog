import fs from 'fs';
import path from 'path';
const postsDirectory = path.join(process.cwd(), 'posts');
const filename = 'poet.tang.0.json';
let poetry: Array<object> = [];
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
  return JSON.stringify(poetry[index]);
};
export default getDailyPoetry;
