import Link from 'next/link';
import { useState } from 'react';
import styles from './index.module.scss';
export default function Header() {
  const [menus, setMenus] = useState<{ title: string; link: string }[]>([
    { title: 'Home', link: '/' },
    { title: 'BlogList', link: '/blog' },
    { title: 'About CodeNinja', link: '/about' },
  ]);
  return (
    <header className="bg-[#1d1d1d] h-[70px] w-full text-[#999] ">
      <div className="inner w-[1280px] m-auto h-full flex items-center">
        <section className="flex items-center">
          {menus.map((menu, index) => (
            <div key={menu.link}>
              <Link href={menu.link} className={`${styles.menu} px-4 hover:scale-125`}>
                {menu.title}
              </Link>
              {index < menus.length - 1 ? <span className="text-small">/</span> : ''}
            </div>
          ))}
        </section>
      </div>
    </header>
  );
}
