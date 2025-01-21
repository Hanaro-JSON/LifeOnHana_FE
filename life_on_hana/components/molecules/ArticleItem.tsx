import Image from 'next/image';
import HeartNo from '../../assets/HeartNo.svg';
import HeartYes from '../../assets/HeartYes.svg';
import { formatDate } from '@/utils/formatDate';
import { type TArticleItemProps } from '@/types/componentTypes';
import { useState } from 'react';
import Link from 'next/link';

export default function ArticleItem({
  article_id,
  title,
  category,
  published_at,
  thumbnail_s3_key,
  is_liked,
}: TArticleItemProps) {
  const [liked, setLiked] = useState(is_liked);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className='w-full h-full relative'>
      <Link href={`/column/${article_id}`}>
        <div className='flex gap-3'>
          <Image
            className='w-40 h-[4.5rem] rounded-[.625rem]'
            src={thumbnail_s3_key}
            alt='Image'
            width={90}
            height={45}
          />
          <div className='flex flex-col justify-between w-full'>
            <div className='font-SCDream5'>{title}</div>
            <div className='text-xs font-SCDream3'>
              {category} / {formatDate(published_at)}
            </div>
          </div>
        </div>
      </Link>
      <div
        className='absolute right-[1rem] bottom-2'
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
