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

    // 부모에서 넘겨받은 onClick 콜백이 있다면 호출
    if (onClick) {
      onClick();
    }
  };

  const getCategory = (variant: string) => {
    switch (variant) {
      case 'REAL_ESTATE':
        return '부동산';
      case 'INVESTMENT':
        return '투자';
      case 'INHERITANCE_GIFT':
        return '상속∙증여';
      case 'TRAVEL':
        return '여행';
      case 'CULTURE':
        return '문화';
      case 'HOBBY':
        return '취미';
      case 'LOAN':
        return '대출';
      default:
        return '';
    }
  };

  const getSrc = (variant: string) => {
    switch (variant) {
      case 'REAL_ESTATE':
        return '/assets/column_recommend_realEstate.svg';
      case 'INVESTMENT':
        return '/assets/column_recommend_investment.svg';
      case 'INHERITANCE_GIFT':
        return '/assets/column_recommend_inheritanceGift.svg';
      case 'TRAVEL':
        return '/assets/column_recommend_travel.svg';
      case 'CULTURE':
        return '/assets/column_recommend_culture.svg';
      case 'HOBBY':
        return '/assets/column_recommend_hobby.svg';
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
