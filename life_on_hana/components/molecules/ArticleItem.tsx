import Image from 'next/image';
import HeartNo from '../../assets/HeartNo.svg';
import HeartYes from '../../assets/HeartYes.svg';
import { formatDate } from '@/utils/formatDate';
import { type TArticleItemProps } from '@/types/componentTypes';
import { useState } from 'react';
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

  const handleLikeToggle = async (e: React.MouseEvent) => {
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
    <div className='w-full h-full relative'>
      <Link href={`/column/${articleId}`}>
        <div className='flex gap-3'>
          <Image
            className='w-40 h-[4.5rem] rounded-[.625rem]'
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${thumbnailS3Key}`} //S3
            alt='Article Thumbnail'
            width={90}
            height={45}
          />
          <div className='flex flex-col justify-between w-full'>
            <div className='font-SCDream5'>{title}</div>
            <div className='text-xs font-SCDream3'>
              {category} / {formatDate(publishedAt)}
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

      <hr className='w-full mt-3 bg-gray-500' />
    </div>
  );
}
