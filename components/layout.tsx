import { AppProps } from 'next/app';
import Image from 'next/image';
import Link from 'next/link';

/*
 * @Author: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @Date: 2023-04-08 14:11:24
 * @LastEditors: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @LastEditTime: 2023-04-08 16:42:29
 * @FilePath: \Study\ninja-blog\components\layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function Layout({ children, home }: any) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="relative w-full flex justify-center">
          {!home ? (
            <Link className="absolute left-0" href="/">
              返回
            </Link>
          ) : (
            ''
          )}

          <Image src="/next.svg" width={128} height={64} alt="avatar" />
        </div>
        <div className="w-full p-4">{children}</div>
      </main>
    </>
  );
}
