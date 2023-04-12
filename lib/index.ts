import fs from 'fs';
import path from 'path';
const postsDirectory = path.join(process.cwd(), 'posts');
const filename = 'poet.tang.0.json';
const readJSON = async () => {
  const fileContent = await fs.readFileSync(path.join(postsDirectory, filename));
  console.log(fileContent);
  return { file: fileContent };
};
