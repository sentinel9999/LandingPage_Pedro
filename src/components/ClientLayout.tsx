'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navbar from './Navbar';
import CursorGlow from './CursorGlow';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <CursorGlow />
      <Navbar />
      {children}
    </>
  );
}