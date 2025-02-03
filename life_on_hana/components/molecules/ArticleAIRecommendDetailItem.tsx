import React, { useState, useEffect, MouseEvent } from 'react';
import Btn from '@/components/atoms/Btn';
import X from '@/assets/X.svg';
import Image from 'next/image';
import HeartNo from '../../assets/HeartNo.svg';
import HeartYes from '../../assets/HeartYes.svg';
import { type TArticleAIRecommendDetailItemProps } from '@/types/componentTypes';
import {
  fetchEffectAnalysis,
  // fetchEffectAnalysis,
  likeProduct,
} from '@/api';
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

  // const mockData = {
  //   code: 200,
  //   status: 'OK',
  //   message: '상품 분석 성공',
  //   data: {
  //     analysisResult:
  //       '오십에 읽는 주역은 균형 잡힌 삶을 위한 좋은 선택입니다. 건강과 학습에 투자하는 당신에게 유연한 사고력과 자기 성찰의 기회를 제공할 것입니다. 바쁜 일상 속에서 잠시 숨 돌릴 수 있는 힐링 타임도 될 수 있죠. 지혜로운 조언으로 새로운 영감을 얻고, 삶의 여정을 더욱 풍부하게 만드는 선물이 될 거예요.',
  //     productLink: 'https://product.kyobobook.co.kr/detail/S000210694912',
  //     productName: '오십에 읽는 주역',
  //     isLiked: true,
  //   },
  // };

  // useEffect(() => {
  //   const fetchAnalysis = async () => {
  //     setLoading(true);
  //     try {
  //       // 실제 API 호출을 목업 데이터로 대체
  //       const data = mockData.data;
  //       setDescription(data.analysisResult);
  //       setLiked(data.isLiked);
  //     } catch (error) {
  //       console.error('상품 분석 요청 중 오류 발생:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnalysis();
  // }, [articleId, productId, mockData.data]);

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
            {/* 제목 스켈레톤 */}
            <Skeleton
              style={{
                width: '80vw', // 제목 크기에 맞게 조정
                height: '3rem', // 제목 높이
                borderRadius: '0.5rem',
                marginBottom: '1rem', // 내용과 간격 조정
              }}
              baseColor='#F4EBFB'
              highlightColor='#e7ddee'
            />

            {/* 내용 스켈레톤 */}
            <Skeleton
              style={{
                width: '80vw', // 내용 크기에 맞게 조정
                height: '38vh', // 내용 높이
                borderRadius: '1rem',
              }}
              baseColor='#F4EBFB'
              highlightColor='#e7ddee'
            />
          </div>
        ) : (
          <>
            {/* X 버튼 */}
            <div className='top-[-1rem] right-[-1rem] flex justify-end items-center w-full'>
              {closeBtn && (
                <button onClick={handleClose} className='p-1'>
                  <Image src={X} alt='Close' width={13} height={13} priority />
                </button>
              )}
            </div>

            {/* 제목 */}
            <div className='-mt-[0.5rem] text-[1.2rem] font-SCDream8 text-left self-start flex gap-2'>
              <button
                onClick={handleLikeToggle}
                disabled={isLoading}
                className='focus:outline-none'
              >
                <Image
                  src={liked ? HeartYes : HeartNo}
                  alt={liked ? 'Liked' : 'Not Liked'}
                  width={22}
                  height={22}
                />
              </button>
              {name}
            </div>

            {/* 내용 */}
            <div className='w-full text-[1.1rem] font-SCDream3 leading-normal text-left self-start overflow-y-auto max-h-[20rem] flex-grow'>
              <p className='text-left'>{description || ai}</p>
            </div>

            {/* 버튼, url */}
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
