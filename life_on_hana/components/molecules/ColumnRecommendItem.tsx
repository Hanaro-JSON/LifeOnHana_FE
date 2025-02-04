'use client';

import { type TColumnRecommendItemProps } from '@/types/componentTypes';
import { useState } from 'react';

export default function ColumnRecommendItem({
  variant,
  name,
  onClick,
  isSelected,
}: TColumnRecommendItemProps) {
  const [isClicked, setIsClicked] = useState(false);
  const clickEvent = () => {
    setIsClicked(!isClicked);

    if (onClick) {
      onClick();
    }
  };

  const getCategory = (variant: string) => {
    switch (variant) {
      case 'SAVINGS':
        return '예적금';
      case 'LOAN':
        return '대출';
      case 'LIFE':
        return '라이프';
      default:
        return '';
    }
  };

  const getSrc = (variant: string) => {
    switch (variant) {
      case 'SAVINGS':
        return '/assets/column_recommend_realEstate.svg';
      case 'LIFE':
        return '/assets/column_recommend_culture.svg';
      case 'LOAN':
        return '/assets/column_recommend_loan.svg';
      default:
        return '';
    }
  };

  return (
    <>
      <button
        onClick={clickEvent}
        className={`${
          isSelected && 'border-2 border-hanapurple '
        } rounded-[10px] bg-cover bg-center w-full min-h-32 flex flex-col items-start justify-start p-2 shadow-xl`}
        style={{ backgroundImage: `url(${getSrc(variant)})` }}
        title={name}
      >
        <div className='text-hanapurple font-SCDream6 text-[1.2rem] mb-1'>
          {getCategory(variant)}
        </div>
        <div className='line-clamp font-SCDream5 text-[1rem] flex justify-start text-left'>
          {name}
        </div>
      </button>
      <style jsx>{`
        .line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
}
