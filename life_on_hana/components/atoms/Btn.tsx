import { type TBtnProps } from '@/types/componentTypes';
import Link from 'next/link';
import arrowRight from '@/assets/arrow-right-white.svg';
import Image from 'next/image';

const getBtnClasses = (variant: string) => {
  switch (variant) {
    // '하나지갑' 버튼들
    case 'hanaWallet':
      return 'bg-hanalightpurple w-full h-[2.9375rem] text-hanapurple text-[1rem] font-SCDream4';
    // '하나 월급통장' 출금계좌 선택 전
    case 'beforeChooseAccount':
      return 'bg-hanagray w-full h-[2.75rem] text-[.9375rem] text-white shadow-xl';
    // '휘릭' 전문보기
    case 'moveToArticle':
      return 'w-[19.1875rem] h-[2.9375rem] bg-hanapurple text-[1.25rem] text-white font-bold';
    // "급하게 목돈이 필요하세요?"
    case 'needLumpSum':
      return 'bg-hanapurple w-full text-[1.25rem] text-white py-6';
    default:
      return 'bg-hanapurple w-full h-[2.75rem] text-[.9375rem] text-white';
  }
};

export default function Btn({
  type,
  text,
  url,
  variant = 'default',
  onClick,
}: TBtnProps) {
  const btnClasses = `${getBtnClasses(variant)} rounded-xl font-SCDream5`;
  return variant === 'needLumpSum' ? (
    <Link href={'/home/lumpsum'} className='flex'>
      <button
        className={`flex items-center justify-center ${btnClasses} rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]`}
        type={type}
        onClick={onClick}
      >
        <span className='absolute left-1/2 -translate-x-1/2'>{text}</span>
        <div className='ml-auto pr-5'>
          <Image src={arrowRight} alt='Right Arrow' />
        </div>
      </button>
    </Link>
  ) : url ? (
    <Link href={url}>
      <button className={btnClasses} onClick={onClick}>
        {text}
      </button>
    </Link>
  ) : (
    <button className={btnClasses} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
