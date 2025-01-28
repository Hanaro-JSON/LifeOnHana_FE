import Image from 'next/image';
import HeartNo from '@/assets/HeartNo.svg';
import HeartYes from '@/assets/HeartYes.svg';
import { formatDate } from '@/utils/formatDate';
import { type TArticleItemProps } from '@/types/componentTypes';
import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { likeArticle } from '@/api';

export default function ArticleItem({
  articleId,
  title,
  category,
  publishedAt,
  thumbnailS3Key,
  isLiked,
}: TArticleItemProps) {
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async (e: MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newLikedState = !liked;
      const response = await likeArticle(articleId, newLikedState);
      setLiked(response.isLiked);
    } catch (error) {
      console.error('Error toggling like status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className='w-full h-full relative my-5'>
          <Link href={`/column/${articleId}`}>
            <div className='flex gap-3'>
              <div>
                <Image
                  className='w-[13rem] h-[5rem]'
                  src={`${thumbnailS3Key}`}
                  alt='Article Thumbnail'
                  width={208}
                  height={72}
                />
              </div>
              <div className='flex flex-col justify-between space-y-4 w-full'>
                <div className='font-SCDream5 text-[1.15rem] line-clamp-1 overflow-hidden text-ellipsis mr-3'>
                  {title}
                </div>
                <div className='font-SCDream3 text-[.9375rem]'>
                  {category} / {formatDate(publishedAt ?? '0000년 00월')}
                </div>
              </div>
            </div>
          </Link>

          <div
            className='absolute right-[1rem] bottom-2 cursor-pointer'
            onClick={handleLikeToggle}
          >
            <Image
              src={liked ? HeartYes : HeartNo}
              alt={liked ? 'Liked' : 'Not Liked'}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className='w-full mt-3 bg-gray-500 h-[0.02rem]' />
    </div>
  );
}
