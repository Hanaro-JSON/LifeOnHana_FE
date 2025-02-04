import React, { useState, useEffect, MouseEvent } from 'react';
import Btn from '@/components/atoms/Btn';
import X from '@/assets/X.svg';
import Image from 'next/image';
import HeartNo from '../../assets/HeartNo.svg';
import HeartYes from '../../assets/HeartYes.svg';
import { type TArticleAIRecommendDetailItemProps } from '@/types/componentTypes';
import { fetchEffectAnalysis, likeProduct } from '@/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ArticleAIRecommendDetailItem({
  articleId,
  productId,
  name,
  link,
  ai,
  closeBtn = true,
}: TArticleAIRecommendDetailItemProps) {
  const [liked, setLiked] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const handleLikeToggle = async (e: MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newLikedState = !liked;
      const response = await likeProduct(productId!, newLikedState);
      setLiked(response.isLiked);
    } catch (error) {
      console.error('좋아요 상태 변경 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (closeBtn) {
      setVisible(false);
    }
  };

  const handleBackgroundClick = (e: MouseEvent) => {
    if (closeBtn && (e.target as HTMLElement).id === 'modal-background') {
      handleClose();
    }
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const data = await fetchEffectAnalysis(articleId!, productId!);
        setDescription(data.data.analysisResult);
        setLiked(data.data.isLiked);
      } catch (error) {
        console.error('상품 분석 요청 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [articleId, productId]);

  if (!visible) return null;

  const bg = closeBtn
    ? 'fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
    : '';

  return (
    <div id='modal-background' onClick={handleBackgroundClick} className={bg}>
      <div
        className='w-full h-[30.9375rem] bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-center justify-between p-6'
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className='rounded-2xl'>
            <Skeleton
              style={{
                width: '80vw',
                height: '3rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }}
              baseColor='#F4EBFB'
              highlightColor='#e7ddee'
            />

            <Skeleton
              style={{
                width: '80vw',
                height: '38vh',
                borderRadius: '1rem',
              }}
              baseColor='#F4EBFB'
              highlightColor='#e7ddee'
            />
          </div>
        ) : (
          <>
            <div className='top-[-1rem] right-[-1rem] flex justify-end items-center w-full'>
              {closeBtn && (
                <button onClick={handleClose} className='p-1'>
                  <Image src={X} alt='Close' width={13} height={13} priority />
                </button>
              )}
            </div>

            <div className='flex gap-3 -mt-[0.5rem] justify-start mb-2 w-full'>
              <button
                onClick={handleLikeToggle}
                disabled={isLoading}
                className='w-1/8 focus:outline-none'
              >
                <Image
                  src={liked ? HeartYes : HeartNo}
                  alt={liked ? 'Liked' : 'Not Liked'}
                  width={22}
                  height={22}
                />
              </button>
              <div className='w-5/6 text-[1.5rem] font-SCDream8'>{name}</div>
            </div>

            <div className='w-full text-[1.1rem] font-SCDream3 leading-normal text-left self-start overflow-y-auto max-h-[20rem] flex-grow'>
              <p className='text-left'>{description || ai}</p>
            </div>

            <div className='mt-4 w-full flex justify-center'>
              <div className='w-full'>
                <Btn text={'상품정보 자세히보기'} url={link} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
