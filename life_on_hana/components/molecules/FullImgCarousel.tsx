import { Carousel } from "nuka-carousel";
import Image from "next/image";
import { TRecommendCarouselColumnProps } from "@/types/componentTypes";
import Link from "next/link";

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
      <div className="w-full h-32 flex-shrink-0 ">
        <Link href={`/column/detail/${article_id}`}>
          <div className="relative w-full h-full rounded-[.9375rem] overflow-hidden">
            <Image
              src={thumbnail_s3_key}
              alt="Carousel Image"
              layout="fill"
              objectFit="cover"
              className="rounded-[.9375rem] overflow-hidden"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <p className="w-[90%] font-SCDream4 text-white text-lg text-center">
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
      wrapMode="wrap"
      className="relative w-full h-32 shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] rounded-[.9375rem]"
      autoplayInterval={10000}
      scrollDistance="screen"
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
