import { ReactNode, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import Teleport from '../Teleport';
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
  useEffect(() => {
    containerRef.current?.addEventListener('contextmenu', (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log('contextmenu');
      const x = e.clientX;
      const y = e.clientY;
      if (contextMenuRef.current) {
        contextMenuRef.current.classList.remove('scale-0');
        contextMenuRef.current.style.top = y + 'px';
        contextMenuRef.current.style.left = x + 'px';
      }
    });
    console.log(containerRef.current);
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
      <Teleport to={'body'}>
        <div ref={contextMenuRef} className={`${styles.contextMenu} scale-0`}>
          {menus.map((menu) => (
            <div className={`${styles.menuItem}`} key={menu.id} onClick={() => select(menu)}>
              {menu.text}
            </div>
          ))}
        </div>
      </Teleport>
    </>
  );
}
