import React from 'react';
import CarouselSection from '@/components/atoms/CarouselSection';
import { type TRecommendCarouselItemProps } from '@/types/componentTypes';

export function RecommendCarouselItem({
  items,
  onClick,
}: {
  items: TRecommendCarouselItemProps[];
  onClick: (productId: string, category: string) => void;
}) {
  const renderProductDetails = (item: TRecommendCarouselItemProps) => {
    const what = item.category ? item.category : item.productType;
    switch (what) {
      case 'LOAN':
        return (
          <div className='flex flex-col items-end '>
            <div className='font-SCDream8 text-sm'>최대</div>
            <div className='font-SCDream8 text-sm text-[#4D00B5]'>
              {Math.round(Number(item.maxAmount) / 10000)}만원
            </div>
          </div>
        );
      case 'SAVINGS':
        return (
          <div className='flex flex-col items-end'>
            <div className='font-SCDream3 text-[.75rem]'>연(세전,1년)</div>
            <div className='font-SCDream8 text-[1rem] text-[#4D00B5]'>
              최고 ~{item.maxInterest_rate}%
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const carouselItems = items.map((item, index) => (
    <div
      onClick={() => onClick(item.productId, item.category ?? '')}
      key={index}
      className='w-full h-full items-center flex flex-row justify-between'
    >
      <div className='flex flex-col flex-[2]'>
        <div className='font-SCDream8 text-[1rem] line-clamp-1 overflow-hidden text-ellipsis'>
          {item.name}
        </div>
        <div className='font-SCDream3 text-[0.8rem] line-clamp-2 overflow-hidden text-ellipsis'>
          {item.description}
        </div>
      </div>
      {renderProductDetails(item) !== null ? (
        <div className='flex flex-col flex-[1]'>
          {renderProductDetails(item)}
        </div>
      ) : (
        <div className='flex flex-col'>{renderProductDetails(item)}</div>
      )}
    </div>
  ));

  return <CarouselSection variant='product' items={carouselItems} />;
}
