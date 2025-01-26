import { Carousel } from 'nuka-carousel';
import SmallWhilickItem from '@/components/molecules/SmallWhilickItem';
import { type TArticlesLiked } from '@/types/dataTypes';
import Image from 'next/image';
import whilickIcon from '@/assets/whilickIcon.svg';

export function WhilickCarousel({ items }: { items: TArticlesLiked[] }) {
  return (
    <div className='my-3 h-full mb-10'>
      <div className='flex flex-row w-full gap-2 font-SCDream5 text-lg mb-5'>
        <Image src={whilickIcon} alt={'whilickIcon'} />
        휘릭으로 보기
      </div>
      <Carousel
        autoplay={true}
        wrapMode='wrap'
        className='relative h-64'
        autoplayInterval={10000}
        scrollDistance='screen'
      >
        {items.map(({ articleId, title, category }) => (
          <SmallWhilickItem
            key={articleId}
            article_id={articleId}
            title={title}
            variant={category}
          />
        ))}
      </Carousel>
    </div>
  );
}
