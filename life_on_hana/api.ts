import { TArticleItemProps } from './types/componentTypes';

// home/like 상품 불러오기
export const fetchLikedProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/users/liked/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Bearer Token 사용
      },
    }
  );

  if (!response.ok) {
    throw new Error('상품 불러오기 실패');
  }

  return await response.json();
};

// home/like 대출 상품 자세히보기
export const fetchLoanProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/products/loans/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`상품${productId}의 자세히 보기 실패 `);
  }

  return await response.json();
};

// home/like 적금 상품 자세히보기
export const fetchAccountProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/products/savings/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`상품${productId}의 자세히 보기 실패`);
  }

  return await response.json();
};

// home/like 보험 상품 자세히보기
export const fetchLifeProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/products/life/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`상품${productId}의 자세히 보기 실패`);
  }

  return await response.json();
};

// column 목록
export const fetchArticles = async (page: number = 1) => {
  let allArticles: TArticleItemProps[] = [];
  let hasNext = true;

  try {
    while (hasNext) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles?page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`${page}페이지 불러오기 실패`);
      }

      const data = await response.json();
      allArticles = [...allArticles, ...data.data.articles];
      hasNext = data.data.hasNext;
      page += 1; // hasNext처리
    }

    return { articles: allArticles, hasNext: false };
  } catch (error) {
    console.error('칼럼 목록 불러오기 실패', error);
    throw error;
  }
};

// column 검색
export const searchArticles = async (query: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles/search?query=${encodeURIComponent(
      query
    )}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('검색 실패');
  }

  const data = await response.json();
  return data.data.articles;
};

// ArticleItem 좋아요
export const likeArticle = async (articleId: number, isLiked: boolean) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles/${articleId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify({ isLiked }),
    }
  );

  if (!response.ok) {
    throw new Error('칼럼 좋아요 실패');
  }

  const data = await response.json();
  return data.data;
};
