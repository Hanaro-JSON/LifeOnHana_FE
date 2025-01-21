import React from 'react';
import CarouselSection from '../atoms/CarouselSection';
import { type TRecommendCarouselColumnProps } from '@/types/componentTypes';
import Image from 'next/image';

export function RecommendCarouselColumn({
  items,
}: {
  items: TRecommendCarouselColumnProps[];
}) {
  const carouselItems = items.map((item, index) => (
    <div
      key={index}
      className='w-full items-center flex flex-row justify-between'
    >
      <div className='flex flex-row justify-center gap-5 items-center'>
        <div className='w-2/5 h-20 overflow-hidden rounded-xl'>
          <Image
            src={item.thumbnail_s3_key}
            width={90}
            height={70}
            alt='Right Arrow'
          />
        </div>
        <div className='font-SCDream4 w-3/5 text-sm'>{item.title}</div>
      </div>
    </div>
  ));

  return <CarouselSection variant='column' items={carouselItems} />;
}
