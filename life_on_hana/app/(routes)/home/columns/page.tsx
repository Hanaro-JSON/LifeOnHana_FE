'use client';

import { fetchArticlesLiked } from '@/api';
import LoadingIcon from '@/components/atoms/LoadingIcon';
import ArticleItem from '@/components/molecules/ArticleItem';
import { NavHeader } from '@/components/molecules/NavHeader';
import { WhilickCarousel } from '@/components/molecules/WhilickCarousel';
import { type TArticlesLiked } from '@/types/dataTypes';
import { getCategory } from '@/utils/convertEnumtoString';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Columns() {
  const underlineRef = useRef<HTMLDivElement>(null);
  const [likedArticles, setLikedArticles] = useState<TArticlesLiked[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const articleIdsSet = useRef(new Set());

  const fetchAllArticles = useCallback(async () => {
    if (!hasNext || isFetching) return;
    setIsFetching(true);

    try {
      const data = await fetchArticlesLiked(page, undefined);
      const newArticles = data.articles.filter(
        (article: { articleId: unknown }) =>
          !articleIdsSet.current.has(article.articleId)
      );

      if (newArticles.length > 0) {
        setLikedArticles((prev) => [...prev, ...newArticles]);
        newArticles.forEach((article: { articleId: unknown }) =>
          articleIdsSet.current.add(article.articleId)
        );
        setPage((prev) => prev + 1);
      }

      setHasNext(data.hasNext ?? false);
    } catch (error) {
      console.error('기사 불러오기 오류:', error);
    } finally {
      setIsFetching(false);
    }
  }, [hasNext, isFetching, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    fetchAllArticles();
  }, [fetchAllArticles, isFetching]);

  useEffect(() => {
    fetchAllArticles();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchAllArticles, handleScroll]);

  const ArticleList = ({ articles }: { articles: TArticlesLiked[] }) => (
    <>
      {articles.map(
        ({ articleId, title, category, publishedAt, thumbnailS3Key }) => (
          <div key={articleId}>
            <ArticleItem
              articleId={articleId}
              title={title}
              category={getCategory(category)}
              publishedAt={publishedAt}
              thumbnailS3Key={thumbnailS3Key}
              isLiked={true}
            />
          </div>
        )
      )}
    </>
  );

  return (
    <div className='p-6 w-screen py-6 space-y-4 mb-28'>
      <div className='fixed top-0 left-0 pt-6 px-6 w-full bg-background z-50'>
        <NavHeader location={'좋아요한 칼럼'} beforePageUrl={'/home'} />
      </div>

      <div
        className='w-full h-full flex flex-col items-center justify-center mt-5'
        style={{ marginTop: '3.6rem' }}
      >
        {likedArticles.length > 0 ? (
          <>
            {Array.from(
              { length: Math.ceil(likedArticles.length / 10) },
              (_, i) => (
                <div key={i} className='w-full'>
                  <div className='w-full bg-gray-500 h-[0.02rem]' />
                  <ArticleList
                    articles={likedArticles.slice(i * 10, i * 10 + 5)}
                  />
                  <WhilickCarousel
                    items={likedArticles.slice(i * 10, (i + 1) * 10)}
                  />
                  <div className='w-full bg-gray-500 h-[0.02rem]' />
                  <ArticleList
                    articles={likedArticles.slice(i * 10 + 5, (i + 1) * 10)}
                  />
                </div>
              )
            )}
            <div
              ref={underlineRef}
              className='absolute bottom-0 h-1 bg-black transition-all duration-300 ease-in-out'
              style={{
                position: 'absolute',
                left: 0,
                width: '0px',
              }}
            ></div>
            {isFetching && (
              <div className='w-full'>
                <LoadingIcon />
              </div>
            )}
          </>
        ) : (
          <div className='w-full h-52 flex items-center justify-center'>
            아직 좋아요한 칼럼이 없습니다.
          </div>
        )}
      </div>
      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
