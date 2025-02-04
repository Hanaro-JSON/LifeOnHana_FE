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
  type TLikedLoanProductDetailItemProps,
  type TLikedAccountProductDetailItemProps,
  type TLikedLifeProductDetailItemProps,
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
import { formatCurrency } from '@/utils/formatCurrency';

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
        console.error('사용자 데이터 가져오기 오류:', error);
      }
    };

    const getWallet = async () => {
      try {
        const fetchData = await fetchWallet();
        setWalletAmount(fetchData.walletAmount);
      } catch (error) {
        console.error('지갑 가져오기 오류:', error);
      }
    };

    const getHistoryStatistics = async () => {
      try {
        const fetchData = await fetchHistoryStatistics();
        setTotalExpense(fetchData.totalExpense);
        setTotalInterest(fetchData.totalInterest);
        setExpenseCategories(fetchData.expenseCategories);
      } catch (error) {
        console.error('히스토리 가져오기 오류:', error);
      }
    };

    const getUsersNickname = async () => {
      try {
        const fetchData = await fetchUsersNickname();
        setCategory(fetchData.category);
      } catch (error) {
        console.error('이름 가져오기 오류:', error);
      }
    };

    const getLikedProducts = async () => {
      try {
        const fetchData = await fetchLikedProducts(undefined);
        setCarouselItems(fetchData);
      } catch (error) {
        console.error('상품 좋아요 오류:', error);
      }
    };

    getInfo();
    getWallet();
    getHistoryStatistics();
    getUsersNickname();
    getLikedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
        console.error('기사 좋아요 오류:', error);
      }
    };

    if (category) {
      getArticlesLiked();
    }
  }, [category]);

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
      console.error('상품 자세히 보기 오류:', error);
    }
  };

  function categoryToNickname(category: string | undefined) {
    switch (category) {
      case 'REAL_ESTATE':
        return (
          <div className=''>
            <span className=' text-hanapurple'>부동산</span>에 관심이 많은&nbsp;
            <span className=' text-hanapurple'>마음부자 🏢</span>
          </div>
        );
      case 'INVESTMENT':
        return (
          <div className=''>
            <span className=' text-hanapurple'>투자</span>에 관심이 많은&nbsp;
            <span className=' text-hanapurple'>멋진</span> 중년 🎩
          </div>
        );
      case 'INHERITANCE_GIFT':
        return (
          <div>
            <span className='text-hanapurple'>상속</span>에 관심이 많은
            <span className='text-hanapurple'>&nbsp;간지나는</span> 중년 🎩
          </div>
        );
      case 'TRAVEL':
        return (
          <div className=''>
            <span className='text-hanapurple'>여행</span>을 좋아하는
            <span className='text-hanapurple'>&nbsp;건강미</span> 중년 💪
          </div>
        );
      case 'CULTURE':
        return (
          <div className=''>
            <span className='text-hanapurple'>문화</span>에 관심이 많은
            <span className='text-hanapurple'>&nbsp;감성적인</span> 중년 🎨
          </div>
        );
      case 'HOBBY':
        return (
          <div className=''>
            <span className='text-hanapurple'>취미</span>에 관심이 많은
            <span className='text-hanapurple'>&nbsp;열정 가득한</span> 중년 ⛳
          </div>
        );
      default:
        return (
          <div className=''>
            아직<span className='text-hanapurple'>&nbsp;좋아요</span>하신 칼럼이
            없어요!
            <div>이런 칼럼은 어떠세요? 😊</div>
          </div>
        );
    }
  }

  return (
    <div className='h-[100%] p-6 space-y-8 mb-28'>
      <div className='fixed top-0 left-0 py-6 px-6 w-full bg-background z-50'>
        <LogoHeader isMain={true} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <MainSection name={data.name} walletAmount={walletAmount} />
      </div>

      <Btn text={'급하게 목돈이 필요하세요?'} variant='needLumpSum' />

      <Section height='19rem'>
        <div className='w-full max-w-full space-y-6 my-3'>
          <div className='font-SCDream3 text-[1.25rem]'>
            이번 달 지출은&nbsp;
            <span className='font-SCDream5 text-[1.25rem] text-hanapurple'>
              {formatCurrency(totalExpense)}
            </span>
            &nbsp;입니다
          </div>

          <BarGraph type={'mydata'} expenseCategories={expenseCategories} />

          <div className='font-SCDream3 text-[1.0625rem] mt-8'>
            이번 달 받은 이자는 총&nbsp;
            <span className='font-SCDream4 text-[1.0625rem] text-hanapurple'>
              {totalInterest.toLocaleString()}원
            </span>
            &nbsp;입니다
          </div>

          <div className='border-t-2 flex justify-center items-center h-[2rem] pt-5'>
            <ShortCutBtn url={'/home/history'} variant='spend' />
          </div>
        </div>
      </Section>

      <div className='flex flex-col space-y-3'>
        <div className='font-SCDream4 text-[1.25rem]'>
          {data.name}님은 {categoryToNickname(category)}
        </div>
        <div className='flex flex-col items-end gap-3'>
          <ShortCutBtn url={'/home/columns'} variant='column' />
        </div>
        <FullImgCarousel items={RecommendCarouselColumnItems} />
      </div>

      <div className='flex flex-col space-y-3'>
        <div className='font-SCDream4 text-[1.25rem]'>
          {data.name}님을 위한 추천 상품
        </div>
        <div className='flex flex-col items-end gap-3'>
          <ShortCutBtn url={'/home/like'} variant='product' />
        </div>
        <RecommendCarouselItem
          items={carouselItems}
          onClick={(productId, category) =>
            handleProductClick(Number(productId), category)
          }
        />
      </div>
      <div className='h-full'>
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
      </div>
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
