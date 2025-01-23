import { type TArticleItemProps } from './types/componentTypes';
import { TArticlesLiked } from './types/dataTypes';

// accessToken 추출
const userData = localStorage.getItem('user');
export let NEXT_PUBLIC_API_TOKEN: string;
if (userData) {
  const userObject = JSON.parse(userData);
  NEXT_PUBLIC_API_TOKEN = userObject.accessToken;
}

// home/like 상품 불러오기
export const fetchLikedProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/users/liked/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
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

// home/wallet/deposit
export const fetchAccountData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/account`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('계좌 불러오기 실패');
  }

  const data = await response.json();
  return data.data;
};

// home/wallet/deposit/finished
export const transferFunds = async (
  fromAccountId: number,
  toAccountId: number,
  amount: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/account/transfer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({
          fromAccountId: fromAccountId,
          toAccountId: toAccountId,
          amount: parseFloat(amount.toFixed(2)),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('응답 오류:', errorText);
      throw new Error(`이체 요청에 실패했습니다: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('이체 요청 오류:', error);
    throw new Error('이체 요청 중 오류가 발생했습니다.');
  }
};

// column/id
export const fetchArticleById = async (id: number) => {
  try {
    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles/${id}`, // [돈 주석]
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`기사 조회 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    data.data.content = JSON.parse(data.data.content);

    return data;
  } catch (error) {
    console.error('기사 조회 요청 오류:', error);
    throw new Error('기사 조회 요청 중 오류가 발생했습니다.');
  }
};

// column/id의 상품 분석
export const fetchEffectAnalysis = async (
  articleId: number,
  productId: number
) => {
  try {
    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/anthropic/effect`, // [돈 주석]
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({ articleId, productId }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('응답 오류:', errorText);
      throw new Error(`상품 분석 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품 분석 요청 오류:', error);
    throw new Error('상품 분석 요청 중 오류가 발생했습니다.');
  }
};

// 상품 좋아요
export const likeProduct = async (productId: number, isLiked: boolean) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/users/${productId}/like`,
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
      const errorMessage = await response.text();
      console.error('좋아요 요청 실패:', errorMessage);
      throw new Error('좋아요 요청 실패');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

//
// home/columns
//
export const fetchArticlesLiked = async (page: number = 1) => {
  let allArticles: TArticlesLiked[] = [];
  let hasNext = true;

  try {
    while (hasNext) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/articles/liked?page=${page}&size=10`,
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
