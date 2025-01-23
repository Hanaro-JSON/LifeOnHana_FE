import { useEffect, useState } from 'react';
import HeartNo from '@/assets/HeartNo.svg';
import HeartYes from '@/assets/HeartYes.svg';
import Image from 'next/image';
import { type TIsLikeProps } from '@/types/componentTypes';

export default function IsLike({
  likeCount: initialLikeCount,
  isLiked: initialIsLiked,
  onClick,
}: TIsLikeProps) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  const toggleLike = () => {
    if (onClick) {
      onClick();
    } else {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  return (
    <div className='w-[3rem]'>
      <div className='flex flex-col items-center'>
        <div className='relative flex justify-center items-center'>
          <Image
            src={isLiked ? HeartYes : HeartNo}
            alt={isLiked ? 'Liked' : 'Not Liked'}
            width={24}
            height={24}
            onClick={toggleLike}
            className='cursor-pointer'
          />
        </div>
        <div className='mt-1 text-[.7rem] text-hanapurple font-SCDream3'>
          {likeCount}
        </div>
      </div>
    </div>
  );
}
