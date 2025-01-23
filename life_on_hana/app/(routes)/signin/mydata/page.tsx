'use client';

import MicroMiniBtn from '@/components/atoms/MicroMiniBtn';
import ConnectBankItem from '@/components/molecules/ConnectBankItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingIcon from '@/components/atoms/LoadingIcon';

export default function Mydata() {
  const router = useRouter();
  const [clickedNum, setClickedNum] = useState(0);

  const handleToggle = (isChecked: boolean) => {
    setClickedNum((prev) => (isChecked ? prev + 1 : prev - 1));
  };
  const [isLoading, setIsLoading] = useState(false);

  const moveToHomeEvent = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (clickedNum !== 0) {
        router.replace('/home');
      }
    }, 300);
  };

  return (
    <>
      <div className='relative h-full'>
        <div className='pt-[5rem] px-[1.5rem] mb-[7.5rem]'>
          <div className='font-SCDream3 text-[1.6rem] mb-2'>
            <span className='font-Hana2heavy text-hanapurple'>
              LIFE on HANA
            </span>{' '}
            가입을 위해
            <br />
            마이데이터 서비스를 <span className='font-SCDream5'>가입</span>
            합니다
          </div>
          <div className='font-SCDream3 text-[.75rem] text-hanadeepgray mb-14'>
            탈퇴 시 마이데이터로 연결된 모든 자산과 개인정보가 삭제(유효한
            전송요구도 함께 중단)되며, 서비스 재이용을 위해서는 다시 전송동의가
            필요해요.{' '}
          </div>
          <div className='flex items-center gap-3 font-SCDream5 text-[1.2rem] mb-5'>
            연결되는 데이터
            <MicroMiniBtn num={clickedNum} />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <ConnectBankItem bankName='HANA' onToggle={handleToggle} />
            <ConnectBankItem bankName='NH' onToggle={handleToggle} />
            <ConnectBankItem bankName='SHINHAN' onToggle={handleToggle} />
            <ConnectBankItem bankName='KB' onToggle={handleToggle} />
            <ConnectBankItem bankName='WOORI' onToggle={handleToggle} />
            <ConnectBankItem bankName='TOSS' onToggle={handleToggle} />
            <ConnectBankItem bankName='NAVER' onToggle={handleToggle} />
            <ConnectBankItem bankName='KAKAO' onToggle={handleToggle} />
          </div>
        </div>

        <button
          onClick={moveToHomeEvent}
          className={twMerge(
            'rounded-t-xl fixed w-full bottom-0 h-[6.5rem] flex justify-center pt-5 font-SCDream3 text-[1rem] text-white',
            clickedNum === 0 ? 'bg-hanadeepgray ' : 'bg-hanapurple'
          )}
        >
          마이데이터 서비스 연결
        </button>

        {/* Home으로 이동 전 300ms 로딩 */}
        {isLoading && <LoadingIcon />}
      </div>
    </>
  );
}
