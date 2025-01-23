'use client';

import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import column from '@/public/assets/column_color.svg';
import Image from 'next/image';
import IsLike from '@/components/molecules/IsLike';
import CopyClipboardBtn from '@/components/atoms/CopyClipboardBtn';
import ColumnRecommendItem from '@/components/molecules/ColumnRecommendItem';
import ArticleAIRecommendDetailItem from '@/components/molecules/ArticleAIRecommendDetailItem';
import { type TArticleAIRecommendDetailItemProps } from '@/types/componentTypes';
import MoveToTopBtn from '@/components/atoms/MoveToTopBtn';
import MoveToBackBtn from '@/components/atoms/MoveToBackBtn';
import AdjustBtn from '@/components/atoms/AdjustBtn';
import OpenDescriptionItem from '@/components/atoms/OpenDescriptionItem';
import { formatDate } from '@/utils/formatDate';
import { LogoHeader } from '@/components/molecules/LogoHeader';
import { useParams, useRouter } from 'next/navigation';
import { type TArticleDetail } from '@/types/dataTypes';
import { fetchArticleById, likeArticle } from '@/api';
import { DataContext } from '@/hooks/useData';

const MOCK_DATA = {
  code: 200,
  status: 'OK',
  message: '기사 상세 조회 성공',
  data: {
    articleId: 1,
    title: '새해 소망 여행 울산시 울주군',
    category: '여행',
    thumbnailS3Key:
      'https://d1g084wcjwihe3.cloudfront.net/images/web/images/articles/2410/invest05_img01.jpg',
    content: [
      { type: 'text', content: '첫 번째 문단입니다.' },
      {
        type: 'word',
        content: '어려운용어',
        description: '어려운용어에 대한 설명입니다.',
      },
      { type: 'text', content: '가 포함된 문장입니다.' },
      {
        type: 'image',
        content:
          'https://d1g084wcjwihe3.cloudfront.net/images/web/images/articles/2410/invest05_img01.jpg',
        caption: '이미지 설명',
      },
      { type: 'text', content: '두 번째 문단에는 ' },
      {
        type: 'word',
        content: '전문용어',
        description: '전문용어에 대한 설명입니다.',
      },
      { type: 'text', content: '가 있습니다.' },
    ],
    publishedAt: '2025-01-01',
    isLiked: true,
    likeCount: 15,
    relatedProducts: [
      {
        productId: 101,
        name: '[서울 출발] 울산 2박 3일 여행 패키지',
        category: 'Life',
        link: 'path/to/product1',
      },
      {
        productId: 102,
        name: '[서울 출발] 울산 당일치기 자유여행 상품',
        category: 'Life',
        link: 'path/to/product2',
      },
    ],
  },
};

export default function Detail() {
  const { data } = useContext(DataContext);
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<TArticleDetail | null>(null);
  // const [article, setArticle] = useState(MOCK_DATA); // 목 데이터 용
  const [selectedProduct, setSelectedProduct] =
    useState<TArticleAIRecommendDetailItemProps | null>(null);

  const [titleParts, setTitleParts] = useState<string[]>([]);
  const [openedAdjustBtn, setOpenedAdjustBtn] = useState<string | null>(null);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(Number(params.id));
        setArticle(data);
        setIsLiked(data.data.isLiked); // 초기 좋아요 상태 설정
        setLikeCount(data.data.likeCount); // 초기 좋아요 수 설정
        const splitTitle = (title: string) => {
          const middleIndex = Math.ceil(title.length / 2);
          return [title.slice(0, middleIndex), title.slice(middleIndex)];
        };

        setTitleParts(splitTitle(data.data.title));
      } catch (error) {
        console.error('Error fetching article:', error);
        // router.push('.'); // 오류 발생 시, 뒤로 이동
      }
    };

    loadArticle();
  }, [params.id, router]);

  const handleLikeToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await likeArticle(Number(params.id), !isLiked);
      setIsLiked(response.isLiked); // 서버 응답에 따라 좋아요 상태 업데이트
      setLikeCount(response.likeCount); // 서버 응답에 따라 좋아요 수 업데이트
    } catch (error) {
      console.error('좋아요 상태 변경 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: TArticleAIRecommendDetailItemProps) => {
    if (selectedProduct?.productId === product.productId) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleFontSizeChange = (value: number) => {
    setFontSizeMultiplier(value);
  };

  const handleAdjustBtnToggle = (id: string) => {
    setOpenedAdjustBtn((prev) => (prev === id ? null : id));
  };

  const getCategory = (variant: string): string => {
    switch (variant) {
      case 'REAL_ESTATE':
        return '부동산';
      case 'INVESTMENT':
        return '투자';
      case 'INHERITANCE_GIFT':
        return '상속∙증여';
      case 'TRAVEL':
        return '여행';
      case 'CULTURE':
        return '문화';
      case 'HOBBY':
        return '취미';
      default:
        return '기타';
    }
  };

  return (
    <div className='h-screen bg-white'>
      {isLoading || !article ? (
        <></>
      ) : (
        <span className='relative z-50'>
          <AdjustBtn
            id='font-size'
            isOpen={openedAdjustBtn === 'font-size'}
            onToggle={handleAdjustBtnToggle}
            typeCeilTxt='글씨'
            typeBottomTxt='크기'
            first='작게'
            second='보통'
            third='크게'
            mX={90}
            mY={75}
            onChange={(value) => {
              if (value === 1) handleFontSizeChange(1.0);
              if (value === 2) handleFontSizeChange(1.3);
              if (value === 3) handleFontSizeChange(1.5);
            }}
          />
          <MoveToTopBtn />
          <MoveToBackBtn />
        </span>
      )}
      <div className='flex flex-col items-center '>
        <div
          className={`w-[90%] flex items-center  ${
            isLoading || !article ? 'mt-8' : '-mt-8'
          }`}
        >
          <LogoHeader isMain={false} />
        </div>
        <div className='w-[90%] flex items-center gap-3 mt-2 mb-4'>
          <Image src={column} alt='column icon' width={20} height={20} />
          <div className='text-[1.5rem] font-Hana2bold'>칼럼</div>
        </div>
      </div>

      <div className='w-full flex flex-col'>
        <div className='w-full h-[80vh] overflow-y-auto'>
          {/* 상단 헤더 이미지 영역 */}
          <div className='relative w-full h-[150px]'>
            {isLoading || !article ? (
              <Skeleton
                style={{ width: '100%', height: '100%' }}
                baseColor='#F4EBFB'
                highlightColor='#e7ddee'
              />
            ) : (
              <Image
                src={`${article.data.thumbnailS3Key}`}
                alt={article.data.category}
                layout='fill'
                objectFit='cover'
                className='opacity-70'
              />
            )}

            <div className='flex justify-center'>
              <div className='absolute w-[90%] h-full flex flex-col justify-center items-start'>
                {isLoading || !article ? (
                  <></>
                ) : (
                  <>
                    <div className='font-SCDream8 text-[22.4px] text-hanapurple font-bold'>
                      {getCategory(article.data.category)}
                    </div>
                    <div
                      className='font-SCDream8 text-[25px] text-white font-bold'
                      style={{ textShadow: '0 0 1px black, 0 0 3px black' }}
                    >
                      {titleParts[0]}
                      {titleParts[1] && <br />}
                      {titleParts[1]}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 좋아요, 공유 영역 */}
          <div className='flex justify-end items-center m-4'>
            {isLoading || !article ? (
              <></>
            ) : (
              <>
                <IsLike
                  likeCount={likeCount}
                  isLiked={isLiked}
                  onClick={handleLikeToggle} // 좋아요 상태 변경 핸들러 전달
                />
                <div className='mb-2'>
                  <CopyClipboardBtn />
                </div>
              </>
            )}
          </div>

          {/* 본문, 관련 상품 영역 */}
          <div className=' w-[90%] flex flex-col mx-auto -z-50'>
            {isLoading || !article ? (
              <>
                <Skeleton
                  style={{
                    width: '100%',
                    height: '400px',
                    marginTop: '16px',
                  }}
                  baseColor='#F4EBFB'
                  highlightColor='#e7ddee'
                />
              </>
            ) : (
              <>
                <div className='font-SCDream5 text-[15px] mb-2'>
                  {formatDate(article.data.publishedAt)}
                </div>
                <div>
                  {article.data.content.map((item, index) => {
                    if (item.type === 'image') {
                      return (
                        <div key={index} className='my-4'>
                          <div className='flex justify-center items-center'>
                            <Image
                              src={item.content}
                              alt={'이미지'}
                              width={340}
                              height={255}
                              className='w-full'
                            />
                          </div>
                        </div>
                      );
                    } else if (item.type === 'text') {
                      return (
                        <span
                          key={index}
                          className='font-SCDream3 leading-relaxed'
                          style={{
                            fontSize: `calc(1.3rem * ${fontSizeMultiplier})`,
                          }}
                        >
                          {item.content}
                        </span>
                      );
                    } else if (item.type === 'word') {
                      return (
                        <span
                          key={index}
                          className='font-SCDream3 leading-relaxed underline decoration-1 decoration-hanapurple'
                          style={{
                            fontSize: `calc(1.3rem * ${fontSizeMultiplier})`,
                          }}
                        >
                          {item.content}{' '}
                          <OpenDescriptionItem
                            description={item.description!}
                          />
                        </span>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
                <div className='w-[100%] mx-auto border-b-2 border-b-hanadeepgray my-6'></div>
                <div className='font-SCDream5 text-[15px] my-3'>
                  관련있는 상품
                </div>
                <div className='flex gap-5'>
                  <div className='w-[90%]'>
                    <ColumnRecommendItem
                      variant={article.data.category}
                      name={article.data.relatedProducts[0].name}
                      isSelected={
                        selectedProduct?.productId ===
                        article.data.relatedProducts[0].productId
                      }
                      onClick={() =>
                        handleProductClick(article.data.relatedProducts[0])
                      }
                    />
                  </div>
                  <div className='w-[90%]'>
                    <ColumnRecommendItem
                      variant='TRAVEL'
                      name={article.data.relatedProducts[1].name}
                      isSelected={
                        selectedProduct?.productId ===
                        article.data.relatedProducts[1].productId
                      }
                      onClick={() =>
                        handleProductClick(article.data.relatedProducts[1])
                      }
                    />
                  </div>
                </div>
                <div className='font-SCDream5 text-[15px] my-3 mt-9'>
                  {data.name}님의 AI 맞춤 정보
                </div>
                <div className='mb-20'>
                  {selectedProduct ? (
                    <ArticleAIRecommendDetailItem
                      articleId={article.data.articleId}
                      productId={selectedProduct.productId}
                      name={selectedProduct.name}
                      link={selectedProduct.link}
                      closeBtn={false}
                    />
                  ) : (
                    <div className='bg-[#EBEBEB] w-[100%] text-[15px] font-SCDream3 text-center py-8 rounded-2xl'>
                      상품을 선택해주세요.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
