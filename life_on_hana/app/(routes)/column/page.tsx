'use client';

import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchArticles, searchArticles } from '@/api';
import SearchInput from '@/components/molecules/SearchInput';
import ArticleItem from '@/components/molecules/ArticleItem';
import column from '../../../public/assets/column_color.svg';
import { type TArticleItemProps } from '@/types/componentTypes';
import { type TArticle } from '@/types/dataTypes';

const CATEGORY_MAP: Record<string, string> = {
  전체보기: '전체보기',
  REAL_ESTATE: '부동산',
  INVESTMENT: '투자',
  INHERITANCE_GIFT: '상속·증여',
  TRAVEL: '여행',
  CULTURE: '문화',
  HOBBY: '취미',
};

export default function Column() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('category') || '전체보기';
  const initialSearchValue = searchParams.get('searchValue') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const [articles, setArticles] = useState<TArticleItemProps[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<TArticleItemProps[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const underlineRef = useRef<HTMLDivElement>(null);

  const fetchAllArticles = useCallback(async () => {
    let page = 1;
    let allArticles: TArticleItemProps[] = [];
    let hasNext = true;
    setIsLoading(true);

    try {
      while (hasNext) {
        const data = await fetchArticles(page);
        allArticles = [...allArticles, ...data.articles];
        hasNext = data.hasNext;
        page += 1;
      }
      setArticles(allArticles);
      setFilteredArticles(allArticles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAllArticles();
  }, [fetchAllArticles]);

  useEffect(() => {
    if (articles.length === 0) return;

    const timeout = setTimeout(async () => {
      router.replace(
        `?category=${selectedCategory}&searchValue=${searchValue}`
      );
      setIsSearching(true);

      let result: TArticleItemProps[] = [];

      try {
        if (searchValue) {
          const searchResults = await searchArticles(searchValue);

          const updatedResults = searchResults.map(
            (searchArticle: TArticle) => {
              const existingArticle = articles.find(
                (article) => article.articleId === searchArticle.articleId
              );
              return {
                ...searchArticle,
                isLiked: existingArticle
                  ? existingArticle.isLiked
                  : searchArticle.isLiked,
              };
            }
          );

          if (selectedCategory !== '전체보기') {
            result = updatedResults.filter(
              (article: TArticle) =>
                CATEGORY_MAP[article.category] === selectedCategory
            );
          } else {
            result = updatedResults;
          }
        } else if (selectedCategory !== '전체보기') {
          result = articles.filter(
            (article) => CATEGORY_MAP[article.category] === selectedCategory
          );
        } else {
          result = articles;
        }
      } catch (error) {
        console.error('검색 오류:', error);
      }

      setFilteredArticles(result);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, selectedCategory, articles, router]);

  const handleCategoryChange = async (category: string) => {
    setIsFiltering(true);
    setFilteredArticles([]);

    setSelectedCategory(category);
    router.replace(`?category=${category}&searchValue=${searchValue}`);

    try {
      await fetchAllArticles();
    } catch (error) {
      console.error('카테고리 변경 오류:', error);
    } finally {
      setIsFiltering(false);
    }

    setTimeout(() => {
      let result: TArticleItemProps[] = [];
      if (category === '전체보기') {
        result = searchValue
          ? articles.filter((article) => article.title.includes(searchValue))
          : articles;
      } else {
        result = articles.filter(
          (article) =>
            CATEGORY_MAP[article.category] === category &&
            (searchValue ? article.title.includes(searchValue) : true)
        );
      }

      setFilteredArticles(result);
      setIsFiltering(false);
    }, 300);
  };

  useEffect(() => {
    const activeCategory = document.querySelector(
      `#${selectedCategory}`
    ) as HTMLButtonElement;
    if (activeCategory && underlineRef.current) {
      underlineRef.current.style.left = `${activeCategory.offsetLeft}px`;
      underlineRef.current.style.width = `${activeCategory.offsetWidth}px`;
    }
  }, [selectedCategory]);

  const handleArticleClick = (id: number) => {
    router.push(
      `/column/${id}?category=${selectedCategory}&searchValue=${searchValue}`
    );
  };

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  const isInLoadingState = isLoading || isSearching || isFiltering;

  return (
    <div>
      <div className='flex flex-col items-center pt-5'>
        <div className='w-full flex items-center gap-3 mb-4 px-[1rem]'>
          <Image src={column} alt='column icon' width={25} height={22} />
          <div className='text-[1.8rem] font-Hana2bold'>칼럼</div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-full mb-4 px-[1rem]'>
          <SearchInput
            placeholder='칼럼 검색'
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
          />
        </div>

        <div className='w-[95%] rounded-3xl flex flex-col'>
          <div className='w-full bg-white flex justify-between sticky py-4 px-6 whitespace-nowrap overflow-x-auto border-b-2 rounded-t-xl shadow-[0rem_.25rem_.25rem_0.09rem_rgba(0,0,0,0.05)]'>
            {Object.values(CATEGORY_MAP).map((category) => (
              <button
                key={category}
                id={category}
                className={`${
                  selectedCategory === category ? 'font-bold' : 'opacity-45'
                } mr-6 last:mr-0 text-[1.2rem] font-SCDream5 relative`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
            <div
              ref={underlineRef}
              className='absolute bottom-0 h-1 bg-black transition-all duration-300 ease-in-out'
              style={{
                position: 'absolute',
                left: 0,
                width: '0px',
              }}
            ></div>
          </div>

          <div className='bg-white p-4 w-full px-[2rem] h-[calc(100vh-18rem)] overflow-y-auto'>
            {isInLoadingState ? (
              <div className='w-full flex flex-col items-center gap-4'>
                {[...Array(10)].map((_, index) => (
                  <Skeleton
                    key={index}
                    style={{ width: 'calc(100vw - 3rem)' }}
                    height={65}
                    baseColor='#f7f7f7'
                    highlightColor='#eaeaea'
                  />
                ))}
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className='w-full flex flex-col items-center gap-4'>
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.articleId}
                    onClick={() => handleArticleClick(article.articleId!)}
                    className='cursor-pointer w-full'
                    custom={index}
                    initial='hidden'
                    animate='visible'
                    variants={listVariants}
                  >
                    <ArticleItem
                      articleId={article.articleId}
                      title={article.title}
                      category={CATEGORY_MAP[article.category]}
                      publishedAt={article.publishedAt}
                      thumbnailS3Key={article.thumbnailS3Key}
                      isLiked={article.isLiked}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className='text-center text-gray-500 py-8'>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
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
