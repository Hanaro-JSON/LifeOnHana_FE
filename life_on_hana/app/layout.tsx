import type { Metadata } from 'next';
import './globals.css';
import { mySignOut, getSession } from '@/actions/myauth';
import { DataProvider } from '@/hooks/useData';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import { Toaster } from '@/components/ui/toaster';
import Nav from '@/components/molecules/Nav';
import QueryWrapper from '@/utils/QueryWrapper';

export const metadata: Metadata = {
  title: 'LIFE on HANA',
  description:
    '소득 크레바스에 맞닥뜨린 당신을 구해줄 든든한 동반자, 라이프 온 하나 (LIFE on HANA)',
  icons: {
    icon: '/assets/logo_purple.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const signOut = async () => {
    'use server';
    await mySignOut();
  };

  return (
    <html lang='en'>
      <body>
        <SessionProvider session={session}>
          <DataProvider getSession={getSession} signOut={signOut}>
            <QueryWrapper>
              {children}
              {session && <Nav />}
            </QueryWrapper>
          </DataProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
