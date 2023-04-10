import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Teleport({ children, to }: { children: ReactNode; to: string }) {
  return createPortal(<>{children}</>, document.querySelectorAll(to)[0]);
}
