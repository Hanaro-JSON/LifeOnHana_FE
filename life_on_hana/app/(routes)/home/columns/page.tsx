'use client';

import { fetchArticlesLiked } from '@/api';
import ArticleItem from '@/components/molecules/ArticleItem';
import { NavHeader } from '@/components/molecules/NavHeader';
import { WhilickCarousel } from '@/components/molecules/WhilickCarousel';
import { type TArticlesLiked } from '@/types/dataTypes';
import { getCategory } from '@/utils/convertEnumtoString';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Columns() {
  const underlineRef = useRef<HTMLDivElement>(null);
  const [likedArticles, setLikedArticles] = useState<TArticlesLiked[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startIdx, setStartIdx] = useState(0);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [hasNext, setHasNext] = useState(true); // 다음 페이지 여부
  const [isFetching, setIsFetching] = useState(false); // 데이터 로드 중 여부

  const fetchAllArticles = useCallback(async () => {
    if (!hasNext || isFetching) return; // 다음 데이터가 없거나 이미 로딩 중이면 무시
    setIsFetching(true);

    try {
      const data = await fetchArticlesLiked(page);
      setLikedArticles((prev) => [...prev, ...data.articles]);
      setHasNext(data.hasNext);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsFetching(false);
    }
  }, [hasNext, isFetching, page]);

  const handleScroll = useCallback(() => {
    if (isFetching || !hasNext) return;

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchAllArticles(); // 화면이 거의 맨 아래로 스크롤되었을 때 추가 데이터 요청
    }
  }, [fetchAllArticles, hasNext, isFetching]);
  useEffect(() => {
    fetchAllArticles(); // 초기 데이터 로드
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const ArticleList = ({ articles }: { articles: TArticlesLiked[] }) => (
    <>
      {articles.map(
        (
          { articleId, title, category, publishedAt, thumbnailS3Key },
          index
        ) => (
          <div key={index} className='py-3'>
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
    <div className='p-6 space-y-4 mb-16'>
      <NavHeader location={'좋아요한 칼럼'} beforePageUrl={'/home'} />
      <div className='w-full h-full flex flex-col items-center'>
        {likedArticles.length > 0 ? (
          <>
            {likedArticles.map((_, index) => {
              if (index % 10 === 0) {
                const pageArticles = likedArticles.slice(index, index + 10);
                return (
                  <div key={index} className='w-full'>
                    <ArticleList articles={pageArticles.slice(0, 5)} />
                    <WhilickCarousel items={pageArticles} />
                    <ArticleList articles={pageArticles.slice(5, 10)} />
                  </div>
                );
              }
              return null;
            })}
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
              <div className='w-full h-12 flex items-center justify-center'>
                로딩 중...
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
