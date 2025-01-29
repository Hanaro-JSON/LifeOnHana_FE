'use client';

import { useState, useEffect, useContext, useRef } from 'react';
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
// import { type TArticleDetail } from '@/types/dataTypes';
import { fetchArticleById, likeArticle } from '@/api';
import { DataContext } from '@/hooks/useData';
import LoadingIcon from '@/components/atoms/LoadingIcon';

const MOCK_DATA = {
  code: 200,
  status: 'OK',
  message: '기사 상세 조회 성공',
  data: {
    articleId: 11,
    title: '주택시장 금리 상승! 버티는 게 답일까?',
    category: 'REAL_ESTATE',
    thumbnailS3Key: 'https://d1g084wcjwihe3.cloudfront.net/images/00.jpg',
    content: [
      {
        type: 'image',
        content: 'https://d1g084wcjwihe3.cloudfront.net/images/00.jpg',
      },
      {
        type: 'text',
        content:
          '지난 9월 22일 미국연방준비제도가 0.75%p 기준금리를 올리는 자이언트스텝을 밟으며 국내 금리를 추월하는 금리 역전 현상이 재연됐다. 금리 격차가 벌어지면서 무역의존도가 높은 국내 경기는 또 다시 진통을 겪게 되었는데, 다시금 내수 방어를 위한 금리 추격전이 예상되고 있다. 금리가 오른다는 얘기다. 금리 상승기에 아파트 시장은 어떻게 될까?',
      },
      {
        type: 'text',
        content:
          '과거 데이터를 살펴보면 금리가 올랐을 때 부동산시장은 언뜻 개연성이 없는 듯 하지만 대체로 금리는 아파트 가격과 반대방향으로 움직이는 반비례 추이를 보인다.',
      },
      {
        type: 'text',
        content: '좀 더 자세히 살펴보면, 금리로 인해 ',
      },
      {
        type: 'word',
        content: '통화량',
        description:
          '통화량 - 통화 시간이나 통화 횟수 등 통화와 관련된 양을 의미한다.',
      },
      {
        type: 'text',
        content:
          '이 평균선을 넘어서는 시기와 아파트 가격 조정 시기가 절묘하게 맞아 떨어진다. 금리가 트리거인 것은 분명하지만 시장에 영향을 미치려면 유동성이 조정되어야 한다는 뜻이다.',
      },
      {
        type: 'text',
        content:
          '최근 1년 가량 금리가 꾸준히 올랐음에도 불구하고 아파트 시세에 아직은 이렇다 할 효과가 나타나지 않은 이유이기도 하다. 유동성비율은 가장 최근 통계인 7월 말부터 소폭 하락했으며, 이후의 행보가 아파트시장의 향배를 가를 것으로 보인다.',
      },
      {
        type: 'text',
        content:
          '유례없는 인플레이션를 겪고 있는 미국 시장상황을 고려할 때 미연준의 금리 상승 조정은 당분간 지속될 수밖에 없고, 좋든 싫든 국내 금리 역시 보조를 맞추어 갈 것으로 보인다. 추가적인 인플레이션 우려가 여전하고 자금조달 비용이 커짐으로써 수요는 더욱 위축되는 반면, 대출 상환 부담이 커진 매도자의 ',
      },
      {
        type: 'word',
        content: '급매',
        description:
          '급매 - 시세보다 훨씬 싸게 급하게 팔다의 줄임말로, 경제적 어려움 등으로 부동산을 시세 이하로 팔 때 쓰는 말이다.',
      },
      {
        type: 'text',
        content:
          '물이 출현할 수 있다. 로얄동, 로얄층과 같은 똘똘한 매물도 급매로 나올 수 있다는 것은 현금을 가진 수요자에게는 분명 환영할만한 일이다. 반면 무리하게 레버리지를 끌어가고 있는 매도자라면 추가 금리인상 위험 등을 감안, 매도 전략을 고려해야 한다. 매매가 장기화될 가능성이 높은데다 보증금 일부를 보전해줘야 하는 역전세 현상이 일부 지역에서 나타나고 있다.',
      },
      {
        type: 'text',
        content:
          '시간이 흐르면 시장은 돌고 돌아 정상화 되게 마련이다. 규제가 해제되고 자금이 돌고 거래가 정상화되는 시점까지 버틸 수 있다면 똘똘한 부동산을 버리는 카드로 쓸 필요는 없다. 시장이 어려울 때일수록 원하는 것을 잡기 쉬워진다는 점을 기억해야 한다. 지금은 옥석을 골라 쥐고, 바꿔 쥐기 좋은 시기다.',
      },
      {
        type: 'word',
        content: '무주택자',
        description: '무주택자 - 주택을 소유하지 않은 사람을 말한다.',
      },
      {
        type: 'text',
        content:
          '라면?\n눈 여겨 보았던 지역이나 단지를 보다 적극적으로 공략하는 것이 좋다. 시장이 흔들릴 때 기회가 오는 법이다. 누구나 인지하는 저점에서는 오히려 기회를 잡기 어렵다. 다들 두려움에 휩싸여 로얄동, 로얄층이 매물로 나오는 하락기가 매수자에게는 오히려 기회가 될 수 있다.',
      },
      {
        type: 'text',
        content:
          '1주택자라면? \n시장 조정기에는 통상 상급지와 하급지의 갭이 줄어드는 경우가 많다. 유사한 비율로 가격이 조정된다면 상급지로 갈아탈 때 추가적으로 조달해야 하는 비용이 오히려 저렴해지는 셈이고, 매매가격이 낮아진 만큼 취득세와 중개수수료 등 거래비용이 줄어드는 효과도 있다. 저렴하게 산 만큼 내 집도 저렴하게 팔아야 하지만, 시장이 회복될 때는 상급지 물량이 먼저 크게 오른다는 점을 기억하자.',
      },
      {
        type: 'text',
        content:
          '다주택자라면? \n부동산 규제의 타깃이라 할 수 있는 다주택자에 대해서는 정부도 상당히 조심스러운 행보를 보이고 있다. 자칫 시장이 다시 부풀어오를 것을 염려해 이렇다 할 규제완화책을 내놓지 않고 있어 시장의 모든 ‘불편’을 걷어내기까지는 적지 않은 시간이 소요될 것으로 보인다. 따라서 다주택자는 비용을 최소화하는 전략으로 입장을 정리할 필요가 있다. 급매로라도 털어낼 것은 털어내고 부담은 최소화함으로써 다음 스텝을 대비하는 전략이 필요하며, 나아가 똘똘한 한 채 전략은 여전히 유의미하다.',
      },
      {
        type: 'text',
        content: '글 하나은행 부동산투자자문센터\n김윤희 전문위원',
      },
      {
        type: 'tags',
        content: '#2022년 11월호',
      },
    ],
    publishedAt: '2025-01-19T13:00:47.896550',
    isLiked: true,
    likeCount: 32,
    relatedProducts: [
      {
        productId: 8,
        name: '하나 아파트론',
        category: 'LOAN',
        link: 'https://www.hanabank.com/cont/mall/mall08/mall0802/mall080202/1446750_115196.jsp?_menuNo=98786',
      },
      {
        productId: 9,
        name: '하나 변동금리 모기지론',
        category: 'LOAN',
        link: 'https://www.hanabank.com/cont/mall/mall08/mall0802/mall080202/1420299_115196.jsp?_menuNo=98786',
      },
    ],
  },
};

export default function Detail() {
  const { data } = useContext(DataContext);
  const router = useRouter();
  const params = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<TArticleAIRecommendDetailItemProps | null>(null);

  const [openedAdjustBtn, setOpenedAdjustBtn] = useState<string | null>(null);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const aiRecommendRef = useRef<HTMLDivElement>(null);

  // [코드 주석 확인]
  // const [isLiked, setIsLiked] = useState(false); // 실제 코드
  // const [likeCount, setLikeCount] = useState(0); // 실제 코드
  // const [article, setArticle] = useState<TArticleDetail | null>(null); // 실제 코드
  const [article, setArticle] = useState(MOCK_DATA); // 목 데이터 용
  const [isLiked, setIsLiked] = useState(MOCK_DATA.data.isLiked); // 목 데이터 용
  const [likeCount, setLikeCount] = useState(MOCK_DATA.data.likeCount); // 목 데이터 용

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(Number(params.id));
        setArticle(data);
        setIsLiked(data.data.isLiked);
        setLikeCount(data.data.likeCount);
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
      setIsLiked(response.isLiked);
      setLikeCount(response.likeCount);
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

    setTimeout(() => {
      aiRecommendRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
      case 'LOAN':
        return '대출';
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
              if (value === 1) handleFontSizeChange(0.8);
              if (value === 2) handleFontSizeChange(1.0);
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
          <Image
            src={column}
            alt='column icon'
            width={20}
            height={20}
            priority
          />
          <div className='text-[1.5rem] font-Hana2bold'>칼럼</div>
        </div>
      </div>

      <div className='w-full flex flex-col'>
        <div className='w-full h-[80vh] overflow-y-auto'>
          {/* 상단 헤더 이미지 영역 */}
          <div className='relative w-full h-[150px]'>
            {isLoading || !article ? (
              <>
                <Skeleton
                  style={{ width: '100%', height: '100%' }}
                  baseColor='#F4EBFB'
                  highlightColor='#e7ddee'
                />
              </>
            ) : (
              <Image
                src={`${article.data.thumbnailS3Key}`}
                alt={article.data.category}
                layout='fill'
                objectFit='cover'
                className='opacity-70'
                priority
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
                      <div className='flex flex-col items-start w-full overflow-hidden'>
                        <div className='font-SCDream8 font-bold text-[1.8rem] leading-[1.2] break-words line-clamp-3 overflow-hidden text-ellipsis sm:text-[1.4rem]'>
                          {article.data.title}
                        </div>
                      </div>
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
                  onClick={handleLikeToggle}
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
                <LoadingIcon bgColor='gray-200' />
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
                              priority
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
                      variant={article.data.relatedProducts[0].category}
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
                      variant={article.data.relatedProducts[1].category}
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
                <div className='mb-20 ' ref={aiRecommendRef}>
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
