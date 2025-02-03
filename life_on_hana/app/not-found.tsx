'use client';

import Image from 'next/image';
import Link from 'next/link';
import notFound from '@/assets/notFound.gif';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center p-6 bg-white'>
      <Image src={notFound} alt='Not Found GIF' width={200} height={200} />
      <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-8'>페이지를 찾을 수 없습니다.</p>
      <Link href='/' legacyBehavior={true}>
        <a className='px-6 py-3 border bg-hanalightpurple text-hanapurple font-semibold rounded-xl'>
          다시 로그인해주세요
        </a>
      </Link>
    </div>
  );
}
