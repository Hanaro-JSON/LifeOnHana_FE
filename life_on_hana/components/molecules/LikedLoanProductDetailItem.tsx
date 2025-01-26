import React, { useState, MouseEvent } from 'react';
import Btn from '../atoms/Btn';
import X from '../../assets/X.svg';
import Image from 'next/image';
import HeartNo from '../../assets/HeartNo.svg';
import HeartYes from '../../assets/HeartYes.svg';
import { type TLikedLoanProductDetailItemProps } from '@/types/componentTypes';
import { likeProduct } from '@/api';

export default function LikedLoanProductDetailItem({
  name,
  description,
  feature,
  target,
  link,
  loanInfo,
  closeBtn = true,
  isLiked,
  productId,
  onClose,
}: TLikedLoanProductDetailItemProps) {
  const [liked, setLiked] = useState({ isLiked });
  const [isLoading, setIsLoading] = useState(false);

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

  const formatAmountRange = () => {
    const { minAmount, maxAmount } = loanInfo;
    if (minAmount == null && maxAmount == null) return '한도 정보 없음';
    if (minAmount == null) return `최대 ${maxAmount?.toLocaleString()}원`;
    if (maxAmount == null) return `최소 ${minAmount.toLocaleString()}원`;
    return `${minAmount.toLocaleString()}원 ~ ${maxAmount.toLocaleString()}원`;
  };

  const bg = closeBtn
    ? 'fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
    : '';

  return (
    <div id='modal-background' onClick={handleBackgroundClick} className={bg}>
      <div
        className='w-[90%] min-h-[60%] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-around p-6'
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className='absolute top-3 right-3 flex justify-end items-center w-full gap-2'>
          {closeBtn && (
            <button onClick={handleCloseClick} className='p-1'>
              <Image src={X} alt='Close' width={15} height={15} />
            </button>
          )}
        </div>

        {/* 제목 및 좋아요 버튼 */}
        <div className='flex items-center gap-3 -mt-[0.5rem] text-[1.5rem] font-SCDream8 text-left self-start'>
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
          {name}
        </div>

        {/* 내용 */}
        <div className='w-[100%] text-[1.2rem] font-SCDream3 overflow-y-auto'>
          {description}
        </div>

        {/* 상세정보: 특징/대상/한도/기간 */}
        <div className='space-y-4 mt-2'>
          {[
            { label: '특징', content: feature },
            { label: '대상', content: target },
            { label: '한도', content: formatAmountRange() },
            {
              label: '기간',
              content:
                loanInfo.minPeriod == null && loanInfo.maxPeriod == null
                  ? '기간 정보 없음'
                  : `${loanInfo.minPeriod ? `${loanInfo.minPeriod}개월` : ''}${
                      loanInfo.minPeriod && loanInfo.maxPeriod ? ' ~ ' : ''
                    }${loanInfo.maxPeriod ? `${loanInfo.maxPeriod}개월` : ''}`,
            },
          ].map(({ label, content }) => (
            <div key={label} className='flex items-center'>
              <div className='flex-none'>
                <div className='bg-hanalightpurple rounded-[.9375rem] text-[1.1rem] font-SCDream5 px-3 py-1 mr-4 flex items-center justify-center'>
                  {label}
                </div>
              </div>
              <div className='text-[1rem] font-SCDream3 flex-grow'>
                {content}
              </div>
            </div>
          ))}
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
