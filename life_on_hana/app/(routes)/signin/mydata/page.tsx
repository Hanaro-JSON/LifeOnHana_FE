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
  const [isLoading, setIsLoading] = useState(false);

  const moveToHomeEvent = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (clickedNum !== 0) {
        router.replace('/home');
      }
    }, 300);
  };

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    HANA: false,
    NH: false,
    SHINHAN: false,
    KB: false,
    WOORI: false,
    TOSS: false,
    NAVER: false,
    KAKAO: false,
  });

  // 단일 항목 선택
  const handleToggle = (bankName: string, isChecked: boolean) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [bankName]: isChecked };
      setClickedNum(Object.values(updated).filter(Boolean).length);
      return updated;
    });
  };

  // 전체 선택 버튼 클릭
  const selectAllEvent = () => {
    setCheckedItems((prev) => {
      const allChecked = Object.keys(prev).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as { [key: string]: boolean }
      );

      setClickedNum(Object.keys(allChecked).length);
      return allChecked;
    });
  };

  return (
    <>
      <div className='relative h-full'>
        <div className='pt-[5rem] px-[1.5rem] mb-[7.5rem]'>
          <div className='font-SCDream3 text-[1.75rem] mb-2'>
            <span className='font-Hana2heavy text-hanapurple'>
              LIFE on HANA
            </span>{' '}
            가입을 위해
            <br />
            마이데이터 서비스를 <span className='font-SCDream5'>가입</span>
            합니다
          </div>

          <div className='font-SCDream3 text-[.9375rem] text-hanadeepgray mb-14'>
            탈퇴 시 마이데이터로 연결된 모든 자산과 개인정보가 삭제(유효한
            전송요구도 함께 중단)되며, 서비스 재이용을 위해서는 다시 전송동의가
            필요해요.
          </div>

          <div className='flex justify-between items-center gap-3 font-SCDream5 text-[1.25rem] mb-5'>
            <div className='flex items-center gap-3'>
              연결되는 데이터
              <MicroMiniBtn num={clickedNum} />
            </div>

            <button className='text-[.9375rem]' onClick={selectAllEvent}>
              전체선택
            </button>
          </div>

          <div className='flex flex-col items-center gap-2'>
            {Object.keys(checkedItems).map((bank) => (
              <ConnectBankItem
                key={bank}
                bankName={bank}
                onToggle={(isChecked) => handleToggle(bank, isChecked)}
                checked={checkedItems[bank]}
              />
            ))}
          </div>
        </div>

        <button
          onClick={moveToHomeEvent}
          className={twMerge(
            'rounded-t-xl fixed w-full bottom-0 h-[6.5rem] flex justify-center pt-5 font-SCDream3 text-[1.25rem] text-white',
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
