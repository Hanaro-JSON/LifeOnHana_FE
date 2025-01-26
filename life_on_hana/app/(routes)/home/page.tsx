'use client';

import Btn from '@/components/atoms/Btn';
import { LogoHeader } from '@/components/molecules/LogoHeader';
import MainSection from '@/components/molecules/MainSection';
import { useContext, useEffect, useState } from 'react';
import Section from '@/components/atoms/Section';
import { BarGraph } from '@/components/molecules/BarGraph';
import {
  type TRecommendCarouselItemProps,
  type TArticleItemProps,
  type TRecommendCarouselColumnProps,
  TLikedLoanProductDetailItemProps,
  TLikedAccountProductDetailItemProps,
  TLikedLifeProductDetailItemProps,
} from '@/types/componentTypes';
import { FullImgCarousel } from '@/components/molecules/FullImgCarousel';
import { RecommendCarouselItem } from '@/components/molecules/RecommendCarouselItem';
import ShortCutBtn from '@/components/molecules/ShortCutBtn';
import { DataContext } from '@/hooks/useData';
import {
  fetchAccountProductDetails,
  fetchArticles,
  fetchArticlesLiked,
  fetchHistoryStatistics,
  fetchLifeProductDetails,
  fetchLikedProducts,
  fetchLoanProductDetails,
  fetchUsersInfo,
  fetchUsersNickname,
  fetchWallet,
} from '@/api';
import LikedLoanProductDetailItem from '@/components/molecules/LikedLoanProductDetailItem';
import LikedAccountProductDetailItem from '@/components/molecules/LikedAccountProductDetailItem';
import LikedLifeProductDetailItem from '@/components/molecules/LikedLifeProductDetail';

type TSelectedProductProps =
  | {
      type: 'LOAN';
      data: TLikedLoanProductDetailItemProps;
    }
  | {
      type: 'SAVINGS';
      data: TLikedAccountProductDetailItemProps;
    }
  | {
      type: 'LIFE';
      data: TLikedLifeProductDetailItemProps;
    }
  | null;

export default function Home() {
  const { data, setInfo } = useContext(DataContext);
  const [walletAmount, setWalletAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>();
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  // 칼럼 목록 조회
  const [articles, setArticles] = useState<TArticleItemProps[]>([]);
  const [RecommendCarouselColumnItems, setRecommendCarouselColumnItems] =
    useState<TRecommendCarouselColumnProps[]>([]);
  const [carouselItems, setCarouselItems] = useState<
    TRecommendCarouselItemProps[]
  >([]);
  const [selectedProduct, setSelectedProductProps] =
    useState<TSelectedProductProps>(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const fetchData = await fetchUsersInfo();
        setInfo({ name: fetchData.name, birth: fetchData.birth });
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    const getWallet = async () => {
      try {
        const fetchData = await fetchWallet();
        setWalletAmount(fetchData.walletAmount);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    const getHistoryStatistics = async () => {
      try {
        const fetchData = await fetchHistoryStatistics();
        setTotalExpense(fetchData.totalExpense);
        setTotalInterest(fetchData.totalInterest);
        setExpenseCategories(fetchData.expenseCategories);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    const getUsersNickname = async () => {
      try {
        const fetchData = await fetchUsersNickname();
        setCategory(fetchData.category);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    const getArticlesLiked = async () => {
      try {
        let fetchData;
        if (category) {
          fetchData = await fetchArticlesLiked(undefined, category);
        } else {
          fetchData = await fetchArticles();
        }
        setArticles(fetchData.articles);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    const getLikedProducts = async () => {
      try {
        const fetchData = await fetchLikedProducts(undefined);
        setCarouselItems(fetchData);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    getInfo();
    getWallet();
    getHistoryStatistics();
    getUsersNickname();
    getArticlesLiked();
    getLikedProducts();
  }, []);

  useEffect(() => {
    const transfromedItems: TRecommendCarouselColumnProps[] = articles.map(
      (article) => ({
        article_id: article.articleId || -1,
        title: article.title || 'untitled',
        thumbnail_s3_key: article.thumbnailS3Key || 'default',
      })
    );
    setRecommendCarouselColumnItems(transfromedItems);
  }, [articles]);

  const handleProductClick = async (productId: number, category: string) => {
    console.log('🚀 ~ handleProductClick ~ category:', productId, category);
    try {
      if (category === 'LOAN') {
        const data = await fetchLoanProductDetails(productId);
        setSelectedProductProps({ type: 'LOAN', data: data.data });
      } else if (category === 'SAVINGS') {
        const data = await fetchAccountProductDetails(productId);
        setSelectedProductProps({ type: 'SAVINGS', data: data.data });
      } else if (category === 'LIFE') {
        const data = await fetchLifeProductDetails(productId);
        setSelectedProductProps({ type: 'LIFE', data: data.data });
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  function categoryToNickname(category: string | undefined) {
    switch (category) {
      case 'REAL_ESTATE':
        return (
          <div>
            <span className='text-hanapurple'>부동산</span>에 관심이 많은
            <span className='text-hanapurple'>마음부자 🏢</span>
          </div>
        );
      case 'INVESTMENT':
        return (
          <div>
            <span className='text-hanapurple'>투자</span>에 관심이 많은
            <span className='text-hanapurple'>멋진</span> 중년 🎩
          </div>
        );
      case 'INHERITANCE_GIFT':
        return (
          <div>
            <span className='text-hanapurple'>상속</span>에 관심이 많은
            <span className='text-hanapurple'>간지나는</span> 중년 🎩
          </div>
        );
      case 'TRAVEL':
        return (
          <div>
            <span className='text-hanapurple'>여행</span>을 좋아하는
            <span className='text-hanapurple'>건강미</span> 중년 💪
          </div>
        );
      case 'CULTURE':
        return (
          <div>
            <span className='text-hanapurple'>문화</span>에 관심이 많은
            <span className='text-hanapurple'>감성적인</span> 중년 🎨
          </div>
        );
      case 'HOBBY':
        return (
          <div>
            <span className='text-hanapurple'>취미</span>에 관심이 많은
            <span className='text-hanapurple'>열정 가득한</span> 중년 ⛳
          </div>
        );
      default:
        return (
          <div>
            아직<span className='text-hanapurple'>&nbsp;좋아요</span>하신 칼럼이
            없어요!
            <div>이런 칼럼은 어떠세요? 😊</div>
          </div>
        );
    }
  }

  return (
    <div className='p-6 space-y-4 mb-28'>
      {/* 헤더 */}
      <LogoHeader isMain={true} />
      {/* 하나월급 카드 */}
      <MainSection
        name={data.name}
        walletAmount={Math.round(walletAmount / 10000)}
      />
      {/* 목돈 버튼 */}
      <Btn text={'급하게 목돈이 필요하세요?'} variant='needLumpSum' />
      {/* 이번 달 지출 카드 */}
      <Section height='15rem'>
        <div className='w-full max-w-full space-y-3'>
          <div className='font-SCDream2'>
            이번 달 지출은 &nbsp;
            <span className='font-SCDream5 underline-offset-1 underline text-xl text-hanapurple'>
              {Math.round(totalExpense / 10000)}만원
            </span>
            &nbsp;입니다.
          </div>
          <BarGraph type={'mydata'} expenseCategories={expenseCategories} />
          <div className='font-SCDream2 text-xs'>
            이번 달 받은 이자는 총 &nbsp;
            <span className='font-SCDream4 underline-offset-1 underline text-sm text-hanapurple'>
              {totalInterest.toLocaleString()}원
            </span>
            &nbsp;입니다.
          </div>
          <div className='border-t-2 flex justify-center items-center h-[2rem]'>
            <ShortCutBtn url={'/home/history'} variant='spend' />
          </div>
        </div>
      </Section>
      {/* 좋아요한 칼럼 카드 */}
      <div className='flex flex-row justify-between items-end'>
        <div className='font-SCDream4 tracking-wide'>
          <div>{data.name}님은</div>
          {categoryToNickname(category)}
        </div>
        <div>
          <ShortCutBtn url={'/home/columns'} variant='column' />
        </div>
      </div>
      {/* <RecommendCarouselColumn items={RecommendCarouselColumnItems} /> */}
      <FullImgCarousel items={RecommendCarouselColumnItems} />
      {/* 추천 상품 카드 */}
      <div className='flex flex-row justify-between items-end'>
        <div className='font-SCDream4 tracking-wide'>
          {data.name}님을 위한 추천 상품
        </div>
        <div>
          <ShortCutBtn url={'/home/like'} variant='product' />
        </div>
      </div>
      <RecommendCarouselItem
        items={carouselItems}
        onClick={(productId, category) =>
          handleProductClick(Number(productId), category)
        }
      />

      {selectedProduct?.type === 'LOAN' && (
        <LikedLoanProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}
      {selectedProduct?.type === 'SAVINGS' && (
        <LikedAccountProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}
      {selectedProduct?.type === 'LIFE' && (
        <LikedLifeProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}
      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
        }
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
