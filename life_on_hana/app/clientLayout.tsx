'use client';

import Nav from '@/components/molecules/Nav';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type TClientLayoutProps = {
  children: ReactNode;
  session: Session | null;
};

export default function ClientLayout({
  children,
  session,
}: TClientLayoutProps) {
  const pathname = usePathname();

  const shouldHideNav = ['/', '/signin', '/signin/mydata'].includes(pathname);

  return (
    <>
      {children}
      {!shouldHideNav && session && <Nav />}
    </>
  );
}
