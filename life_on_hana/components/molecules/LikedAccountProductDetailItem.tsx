import React, { useState, MouseEvent, ChangeEvent } from 'react';
import Btn from '../atoms/Btn';
import X from '../../assets/X.svg';
import Image from 'next/image';
import HeartNo from '../../assets/HeartNo.svg';
import HeartYes from '../../assets/HeartYes.svg';
import { type TLikedAccountProductDetailItemProps } from '@/types/componentTypes';
import { likeProduct } from '@/api';

export default function LikedAccountProductDetailItem({
  name,
  description,
  link,
  savingsInfo,
  closeBtn = true,
  isLiked,
  productId,
  onClose,
}: TLikedAccountProductDetailItemProps) {
  const [liked, setLiked] = useState({ isLiked });
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [interestRate, setInterestRate] = useState<number>(
    savingsInfo.basicInterestRate
  );
  const [calculatedAmount, setCalculatedAmount] = useState<string>('0');

  const handleLikeToggle = async (e: MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newLikedState = !liked;
      const response = await likeProduct(productId, newLikedState);
      setLiked(response.isLiked);
    } catch (error) {
      console.error('좋아요 상태 변경 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackgroundClick = (e: MouseEvent) => {
    if (closeBtn && (e.target as HTMLElement).id === 'modal-background') {
      onClose?.();
    }
  };

  const handleCloseClick = () => {
    if (closeBtn) {
      onClose?.();
    }
  };

  const handleInterestRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value);
    if (
      rate >= savingsInfo.basicInterestRate &&
      rate <= savingsInfo.maxInterestRate
    ) {
      setInterestRate(rate);
      calculateAmount(amount, years, rate);
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amountToNumber = e.target.value;
    setAmount(amountToNumber);
    calculateAmount(amountToNumber, years, interestRate);
  };

  const handleYearsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const yearsToNumber = e.target.value;
    setYears(yearsToNumber);
    calculateAmount(amount, yearsToNumber, interestRate);
  };

  const calculateAmount = (
    amount: string,
    years: string,
    interestRate: number
  ) => {
    const amountToNumber = parseFloat(amount);
    const yearsToNumber = parseInt(years);
    if (amountToNumber && yearsToNumber && !isNaN(interestRate)) {
      const expectedAmount = (
        amountToNumber * yearsToNumber * (interestRate / 100) +
        amountToNumber
      ).toFixed(0);
      setCalculatedAmount(expectedAmount);
    } else {
      setCalculatedAmount('0');
    }
  };

  const bg = closeBtn
    ? 'fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
    : '';

  return (
    <div id='modal-background' onClick={handleBackgroundClick} className={bg}>
      <div
        className='w-[90%] h-[60%] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6'
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className=' top-[-1rem] right-[-1rem] flex justify-end items-center w-full gap-2'>
          <button
            onClick={handleLikeToggle}
            disabled={isLoading}
            className='focus:outline-none'
          >
            <Image
              src={liked ? HeartYes : HeartNo}
              alt={liked ? 'Liked' : 'Not Liked'}
              width={22}
              height={22}
            />
          </button>
          {closeBtn && (
            <button onClick={handleCloseClick} className='p-1'>
              <Image src={X} alt='Close' width={15} height={15} />
            </button>
          )}
        </div>

        {/* 제목 */}
        <div className='-mt-[0.5rem] text-[1.5rem] font-SCDream8 text-left self-start mb-2'>
          {name}
        </div>

        {/* 내용 */}
        <div className='w-[100%] text-[1.2rem] font-SCDream3 leading-normal text-center overflow-y-auto max-h-[6rem] flex-grow mb-2'>
          <p className='text-left'>{description}</p>
        </div>

        <div className='text-[1.3rem] font-SCDream8 text-left self-start mb-2'>
          나의 예상 혜택
        </div>

        <div className='w-full h-[20%] relative mb-3'>
          <div className='w-full h-[100%] left-0 top-0 bg-[#f4ebfb] rounded-[18px]'>
            <div className='p-4 m-2'>
              <div className='flex justify-between mt-2'>
                <div className='text-black text-[1rem] font-SCDream3'>
                  만기금액(세전)
                </div>
                <div className='text-right text-black text-[1rem] font-SCDream5'>
                  {calculatedAmount
                    ? `${parseInt(calculatedAmount).toLocaleString()}원`
                    : '금액을 입력해주세요'}
                </div>
              </div>
              <div className='flex justify-between mt-2'>
                <div className='text-black text-[1rem] font-SCDream3'>
                  적용금리
                </div>
                <div className='text-right text-black text-[1rem] font-SCDream5'>
                  {calculatedAmount === '0'
                    ? `${savingsInfo.basicInterestRate}% ~ ${savingsInfo.maxInterestRate}%`
                    : `연 ${interestRate}%`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 적금 계산 입력 폼 */}
        <div className='flex flex-col text-[1rem]'>
          <div className='flex items-center'>
            <input
              type='text'
              value={amount}
              onChange={handleAmountChange}
              className='min-w-[4rem] w-[auto] max-w-[14rem] p-2 border-b-2 border-hanalightpurple focus:outline-none focus:border-hanapurple text-hanapurple font-SCDream8'
              style={{ width: `${amount.length + 2}ch` }}
              placeholder='금액'
              maxLength={12}
            />
            <span className='ml-2'>원을</span>
          </div>

          <div className='flex items-center'>
            <input
              type='text'
              value={years}
              onChange={handleYearsChange}
              className='w-[4rem] p-2 border-b-2 border-hanalightpurple focus:outline-none focus:border-hanapurple text-hanapurple font-SCDream8'
              placeholder='년'
              maxLength={3}
            />
            <span className='ml-2'>년 동안</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <div className='flex gap-1'>
                <input
                  type='number'
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className='w-[3rem] p-2 border-b-2 border-hanalightpurple focus:outline-none focus:border-hanapurple text-hanapurple font-SCDream8 text-center'
                  placeholder='금리'
                  min={savingsInfo.basicInterestRate}
                  max={savingsInfo.maxInterestRate}
                  step='0.1'
                />
                {/* 화살표 버튼 */}
                <div className=''>
                  <div className='flex flex-col'>
                    <button
                      type='button'
                      className='text-hanapurple hover:text-hanadarkpurple'
                      onClick={() => {
                        if (interestRate + 0.1 <= savingsInfo.maxInterestRate) {
                          const newRate = parseFloat(
                            (interestRate + 0.1).toFixed(1)
                          );
                          setInterestRate(newRate);
                          calculateAmount(amount, years, newRate);
                        }
                      }}
                    >
                      ▲
                    </button>
                    <button
                      type='button'
                      className='text-hanapurple hover:text-hanadarkpurple'
                      onClick={() => {
                        if (
                          interestRate - 0.1 >=
                          savingsInfo.basicInterestRate
                        ) {
                          const newRate = parseFloat(
                            (interestRate - 0.1).toFixed(1)
                          );
                          setInterestRate(newRate);
                          calculateAmount(amount, years, newRate);
                        }
                      }}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span>로 저축하기</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className='mt-4 w-full flex justify-center'>
          <div className='w-full'>
            <Btn text={'상품정보 자세히보기'} url={link} />
          </div>
        </div>
      </div>
    </div>
  );
}
