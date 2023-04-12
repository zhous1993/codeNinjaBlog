import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Teleport({ children }: { children: ReactNode }) {
  const el = useRef<Element>();
  if (typeof window !== 'undefined') {
    el.current = document.body;
  }
  return el.current ? createPortal(<>{children}</>, el.current as Element) : <div></div>;
}
