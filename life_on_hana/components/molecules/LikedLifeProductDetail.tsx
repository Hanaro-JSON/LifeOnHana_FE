import React, { useState, MouseEvent } from 'react';
import Btn from '@/components/atoms/Btn';
import X from '@/assets/X.svg';
import Image from 'next/image';
import HeartNo from '@/assets/HeartNo.svg';
import HeartYes from '@/assets/HeartYes.svg';
import { type TLikedLifeProductDetailItemProps } from '@/types/componentTypes';
import { likeProduct } from '@/api';

export default function LikedLifeProductDetailItem({
  name,
  description,
  link,
  isLiked,
  productId,
  closeBtn = true,
  onClose,
}: TLikedLifeProductDetailItemProps) {
  const [liked, setLiked] = useState({ isLiked });
  const [isLoading, setIsLoading] = useState(false);
  const handleBackgroundClick = (e: MouseEvent) => {
    if (closeBtn && (e.target as HTMLElement).id === 'modal-background') {
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

  const handleCloseClick = () => {
    if (closeBtn) {
      onClose?.();
    }
  };

  const bg = closeBtn
    ? 'fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
    : '';

  return (
    <div id='modal-background' onClick={handleBackgroundClick} className={bg}>
      <div
        className='pt-10 w-[90%] min-h-[60%] h-[60%] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='absolute top-3 right-3 flex justify-end items-center w-full gap-2'>
          {closeBtn && (
            <button onClick={handleCloseClick} className='p-1'>
              <Image src={X} alt='Close' width={15} height={15} />
            </button>
          )}
        </div>

        <div className='flex gap-3 -mt-[0.5rem] justify-start mb-2 w-full'>
          <button
            onClick={handleLikeToggle}
            disabled={isLoading}
            className='w-1/8 focus:outline-none'
          >
            <Image
              src={liked ? HeartYes : HeartNo}
              alt={liked ? 'Liked' : 'Not Liked'}
              width={22}
              height={22}
            />
          </button>
          <div className='w-5/6 text-[1.5rem] font-SCDream8'>{name}</div>
        </div>

        <div className='w-[100%] text-[1.2rem] font-SCDream3 leading-normal text-left overflow-y-auto max-h-[19rem] flex-grow'>
          <p>{description}</p>
        </div>

        <div className='mt-4 w-full flex justify-center'>
          <div className='w-full'>
            <Btn text={'상품정보 자세히보기'} url={link} />
          </div>
        </div>
      </div>
    </div>
  );
}
