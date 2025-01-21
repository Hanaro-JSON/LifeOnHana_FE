'use client';

import ArticleItem from '@/components/molecules/ArticleItem';
import { NavHeader } from '@/components/molecules/NavHeader';
import { WhilickCarousel } from '@/components/molecules/WhilickCarousel';
import { type TArticlesLiked } from '@/types/dataTypes';
import { getCategory } from '@/utils/convertEnumtoString';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const mockArticles: TArticlesLiked[] = [
  {
    articleId: 1,
    title: '제주도로 여행을 떠나볼까요???',
    category: 'TRAVEL',
    publishedAt: '2025-01-12',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 2,
    title: '요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?',
    category: 'HOBBY',
    publishedAt: '2024-12-08',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 3,
    title: '투자를 해요',
    category: 'INVESTMENT',
    publishedAt: '2024-11-15',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 4,
    title: '취미를 찾아볼까요?',
    category: 'HOBBY',
    publishedAt: '2025-01-12',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 5,
    title: '제주도로 여행을 떠나볼까요???',
    category: 'TRAVEL',
    publishedAt: '2025-01-12',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 6,
    title: '요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?',
    category: 'TRAVEL',
    publishedAt: '2024-12-08',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 7,
    title: '투자를 해요',
    category: 'INVESTMENT',
    publishedAt: '2024-11-15',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 8,
    title: '취미를 찾아볼까요?',
    category: 'HOBBY',
    publishedAt: '2025-01-12',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 9,
    title: '제주도로 여행을 떠나볼까요???',
    category: 'TRAVEL',
    publishedAt: '2025-01-12',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 10,
    title: '요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?',
    category: 'HOBBY',
    publishedAt: '2024-12-08',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 11,
    title: '투자를 해요',
    category: 'INVESTMENT',
    publishedAt: '2024-11-15',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
  {
    articleId: 12,
    title: '취미를 찾아볼까요?',
    category: 'HOBBY',
    publishedAt: '2025-01-12',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202421251121570801.jpg',
    is_liked: true,
  },
];

export default function Columns() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [likedArticles, setLikeArticles] =
    useState<TArticlesLiked[]>(mockArticles);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // setLikeArticles(mockArticles);
  const [startIdx, setStartIdx] = useState(0);

  const ArticleList = ({ articles }: { articles: TArticlesLiked[] }) => (
    <>
      {articles.map(
        (article, index) =>
          article.is_liked && (
            <ArticleItem
              key={index}
              article_id={article.articleId}
              title={article.title}
              category={getCategory(article.category)}
              published_at={article.publishedAt ?? ''}
              thumbnail_s3_key={article.thumbnailS3Key ?? ''}
              is_liked={article.is_liked}
            />
          )
      )}
    </>
  );
  return (
    <div className='p-6 space-y-4 mb-16'>
      <NavHeader location={'좋아요한 칼럼'} beforePageUrl={'/home'} />
      <div className='w-full h-full flex flex-col items-center gap-4'>
        {likedArticles.length > 0 ? (
          <>
            <ArticleList
              articles={likedArticles.slice(startIdx, startIdx + 5)}
            />
            <WhilickCarousel
              items={likedArticles.slice(startIdx, startIdx + 10)}
            />
            <ArticleList
              articles={likedArticles.slice(startIdx + 5, startIdx + 10)}
            />
          </>
        ) : (
          <div className='w-full h-52 flex items-center justify-center'>
            아직 좋아요한 칼럼이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
