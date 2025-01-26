'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signin');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <>
      <div className='relative bg-hanapurple min-h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col pb-44 items-center justify-center'>
          <Image
            src='/assets/logo_white.svg'
            alt='로고'
            width={90}
            height={90}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <Image
            src='/assets/logoText_white.svg'
            alt='LogoText'
            className='my-2'
            width={1000}
            height={1000}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <div className='font-SCDream5 text-[1rem] text-white'>
            소득 크레바스에 맞닥뜨린 당신을 구해줄 든든한 동반자
          </div>
        </div>
        <Image
          src='/assets/logo_json.svg'
          alt='팀로고'
          width={100}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          className='absolute bottom-10'
          priority
        />
      </div>
    </>
  );
}
