/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 13:48:45
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-12 16:00:57
 * @FilePath: \study\codeNinjaBlog\components\BlogList.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Divider } from '@mui/material';
import Link from 'next/link';

export type BlogItemType = {
  id: string;
  title: string;
  date: string;
  link: string;
};
export default function BlogList({ list }: { list: Array<BlogItemType> }) {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          <Link className="flex justify-between divide-y-1 divide-white text-white my-2" href={item.link}>
            <span>{item.title}</span>
            <span>{item.date}</span>
          </Link>
          <Divider light flexItem />
        </div>
      ))}
    </div>
  );
}
