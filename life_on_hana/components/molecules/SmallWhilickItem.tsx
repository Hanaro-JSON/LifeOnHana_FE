'use client';

import Image from 'next/image';
import smallWhilick_title from '@/assets/smallWhilick_title.svg';
import { type TSmallWhilickItemProps } from '@/types/componentTypes';
import { getCategory } from '@/utils/convertEnumtoString';
import { useRouter } from 'next/navigation';

export default function SmallWhilickItem({
  article_id,
  variant,
  title,
}: TSmallWhilickItemProps) {
  const getSrc = (variant: string) => {
    switch (variant) {
      case 'REAL_ESTATE':
        return '/assets/smallWhilick_realEstate.svg';
      case 'INVESTMENT':
        return '/assets/smallWhilick_investment.svg';
      case 'INHERITANCE_GIFT':
        return '/assets/smallWhilick_inheritanceGift.svg';
      case 'TRAVEL':
        return '/assets/smallWhilick_travel.svg';
      case 'CULTURE':
        return '/assets/smallWhilick_culture.svg';
      case 'HOBBY':
        return '/assets/smallWhilick_hobby.svg';
      default:
        return '';
    }
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('/whilick', undefined);
    localStorage.setItem('article_id', String(article_id));
  };

  return (
    <>
      {/* <Link href={`/whilick`} state={}> */}
      <button
        onClick={handleClick}
        className='bg-cover bg-center w-[10rem] h-[14.1875rem] flex flex-col items-center justify-center p-5 relative'
        style={{ backgroundImage: `url(${getSrc(variant)})` }}
        title={title}
      >
        <Image
          src={smallWhilick_title}
          alt='큰따옴표'
          width={20}
          height={20}
          className='absolute top-10'
          priority
        />
        <div className='w-full h-1/2  flex justify-center items-center'>
          <div className='line-clamp text-white font-SCDream6 text-[.8125rem]'>
            {title}
          </div>
        </div>
        <div className='text-white font-SCDream5 text-[15px] absolute bottom-5 left-5'>
          {getCategory(variant)}
        </div>
      </button>
      {/* </Link> */}
      <style jsx>{`
        .line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
}
