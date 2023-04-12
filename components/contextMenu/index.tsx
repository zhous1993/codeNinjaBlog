/*
 * @Author: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @Date: 2023-04-10 22:13:21
 * @LastEditors: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @LastEditTime: 2023-04-12 21:36:06
 * @FilePath: \Study\ninja-blog\components\contextMenu\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ReactNode, useEffect, useRef } from 'react';
import styles from './index.module.scss';
export type MenuItem = {
  id: string;
  text: string;
};
export default function MyContextMenu({
  children,
  menus,
  select,
}: {
  menus: Array<MenuItem>;
  children: ReactNode;
  select: (menu: MenuItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const tag = useRef<Element>();
  useEffect(() => {
    tag.current = document.body;
    containerRef.current?.addEventListener('contextmenu', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;
      if (contextMenuRef.current) {
        contextMenuRef.current.classList.remove('scale-0');
        contextMenuRef.current.style.top = y + 'px';
        contextMenuRef.current.style.left = x + 'px';
      }
    });
    window.addEventListener(
      'click',
      (e) => {
        contextMenuRef.current?.classList.add('scale-0');
      },
      true,
    );
    window.addEventListener(
      'contextmenu',
      (e) => {
        contextMenuRef.current?.classList.add('scale-0');
      },
      true,
    );
    return () => {
      window.removeEventListener(
        'click',
        () => {
          console.log(111);
        },
        true,
      );
      window.removeEventListener(
        'contextmenu',
        (e) => {
          contextMenuRef.current?.classList.add('scale-0');
        },
        true,
      );
      containerRef.current?.removeEventListener('contextmenu', () => {});
    };
  }, []);
  return (
    <>
      <div ref={containerRef}>{children}</div>
      <div ref={contextMenuRef} className={`${styles.contextMenu} scale-0`}>
        {menus.map((menu) => (
          <div className={`${styles.menuItem}`} key={menu.id} onClick={() => select(menu)}>
            {menu.text}
          </div>
        ))}
      </div>
    </>
  );
}
