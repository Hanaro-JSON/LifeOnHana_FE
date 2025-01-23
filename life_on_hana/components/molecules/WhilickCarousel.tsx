import { Carousel } from 'nuka-carousel';
import SmallWhilickItem from './SmallWhilickItem';
import { TArticlesLiked } from '@/types/dataTypes';
import Image from 'next/image';
import whilickIcon from '@/assets/whilickIcon.svg';
export function WhilickCarousel({ items }: { items: TArticlesLiked[] }) {
  function CarouselItem({ articleId, title, category }: TArticlesLiked) {
    return (
      <SmallWhilickItem
        article_id={articleId}
        title={title}
        variant={category}
      />
    );
  }
  return (
    <div className='my-3'>
      <div className='flex flex-row w-full gap-2 font-SCDream5 text-lg mb-5'>
        <Image src={whilickIcon} alt={'whilickIcon'} />
        휘릭으로 보기
      </div>
      <Carousel
        wrapMode='wrap'
        className='relative w-full'
        scrollDistance='slide'
      >
        {items.map((item) => (
          <CarouselItem
            key={item.articleId}
            articleId={item.articleId}
            title={item.title}
            category={item.category}
          />
        ))}
      </Carousel>
    </div>
  );
}
