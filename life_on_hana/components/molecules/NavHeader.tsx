import Image from 'next/image';
import arrowLeft from '@/assets/arrow-left.svg';
import Link from 'next/link';
export function NavHeader({
  location,
  beforePageUrl,
}: {
  location: string;
  beforePageUrl: string;
}) {
  return (
    <div className='relative flex flex-row items-center mb-6'>
      <Link href={beforePageUrl}>
        <Image
          src={arrowLeft}
          alt='before'
          height={10}
          style={{ width: 10, height: 'auto' }}
        />
      </Link>
      <div className='w-full justify-center flex items-center font-Hana2bold text-[1.5625rem]'>
        {location}
      </div>
    </div>
  );
}
