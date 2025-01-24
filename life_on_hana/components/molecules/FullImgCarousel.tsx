import { Carousel } from 'nuka-carousel';
import Image from 'next/image';
import { type TRecommendCarouselColumnProps } from '@/types/componentTypes';
import Link from 'next/link';
import logo_white from '@/assets/logo.svg';
export function FullImgCarousel({
  items,
}: {
  items: TRecommendCarouselColumnProps[];
}) {
  function CarouselItem({
    article_id,
    title,
    thumbnail_s3_key,
  }: TRecommendCarouselColumnProps) {
    return (
      <div className='w-48 h-64 flex-shrink-0 mx-1' key={article_id}>
        <Link href={`/column/detail/${article_id}`}>
          <div className='relative h-full rounded-[.9375rem] overflow-hidden'>
            <Image
              src={thumbnail_s3_key || logo_white}
              alt='Carousel Image'
              fill
              style={{ objectFit: 'cover' }}
              className='rounded-[.9375rem] overflow-hidden'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <p className='w-[90%] font-SCDream4 text-white text-lg text-center'>
                {title}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <Carousel
      autoplay={true}
      wrapMode='wrap'
      className='relative h-64 shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] rounded-[.9375rem]'
      autoplayInterval={10000}
      scrollDistance='screen'
    >
      {items.map((item) => (
        <CarouselItem
          key={item.article_id}
          article_id={item.article_id}
          thumbnail_s3_key={item.thumbnail_s3_key}
          title={item.title}
        />
      ))}
    </Carousel>
  );
}
