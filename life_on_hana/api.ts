import { type TArticleItemProps } from './types/componentTypes';
import { type THomeLikeProduct, type TArticlesLiked } from './types/dataTypes';

// accessToken 추출
export let NEXT_PUBLIC_URL: string;
export let NEXT_PUBLIC_API_TOKEN: string;
export const getApiToken = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObject = JSON.parse(userData);
      return userObject.accessToken;
    }
  }
  return null;
};

//getLikedProducts
export const fetchLikedProducts = async (page: number | undefined) => {
  if (page === undefined) {
    //home에서 호출하는 api
    const token = getApiToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/liked/products?limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('상품 불러오기 실패');
    }

    const fetchData = await response.json();
    return fetchData.data.products;
  }
  //home/like에서 호출하는 api
  let allLikedProducts: THomeLikeProduct[] = [];
  let hasNext = true;
  try {
    while (hasNext) {
      const token = getApiToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/liked/products?page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`페이지 ${page} 상품 불러오기 실패`);
      }

      const data = await response.json();
      allLikedProducts = [...allLikedProducts, ...data.data.products];
      hasNext = data.data.hasNext;
      page += 1;
    }

    return { products: allLikedProducts, hasNext: false };
  } catch (error) {
    throw error;
  }
};

// home/like 대출 상품 자세히보기
export const fetchLoanProductDetails = async (productId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products/loans/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
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
    `${process.env.NEXT_PUBLIC_URL}/api/products/savings/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
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
    `${process.env.NEXT_PUBLIC_URL}/api/products/life/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
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
        `${process.env.NEXT_PUBLIC_URL}/api/articles?page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getApiToken()}`,
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
    `${process.env.NEXT_PUBLIC_URL}/api/articles/search?query=${encodeURIComponent(
      query
    )}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
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
    `${process.env.NEXT_PUBLIC_URL}/api/articles/${articleId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/account`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiToken()}`,
    },
  });

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
      `${process.env.NEXT_PUBLIC_URL}/api/account/transfer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
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
      // `${process.env.NEXT_PUBLIC_URL}/api/articles/${id}`, // [돈 주석]
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
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
      // `${process.env.NEXT_PUBLIC_URL}/api/anthropic/effect`, // [돈 주석]
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
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
      `${process.env.NEXT_PUBLIC_URL}/api/users/${productId}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
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
export const fetchArticlesLiked = async (
  page: number = 0,
  category: string | undefined
) => {
  let allArticles: TArticlesLiked[] = [];
  let hasNext = true;

  if (category !== undefined) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/articles/liked?page=0&size=100&category=${category}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getApiToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`조회 요청 실패: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        articles: data.data.articles,
      };
    } catch (error) {
      console.error('조회 요청 오류:', error);
      throw new Error('조회 요청 중 오류가 발생했습니다.');
    }
  }

  try {
    while (hasNext) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/articles/liked?page=${page}&size=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getApiToken()}`,
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
// users/info
export const fetchUsersInfo = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/info`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`유저 조회 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    data.name = data.data.name;
    data.birth = data.data.birth;

    return data;
  } catch (error) {
    console.error('유저 조회 요청 오류:', error);
    throw new Error('유저 조회 요청 중 오류가 발생했습니다.');
  }
};
//get wallet
export const fetchWallet = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/wallet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`지갑정보 조회 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      walletId: data.data.walletId,
      walletAmount: data.data.walletAmount,
      paymentDay: data.data.paymentDay,
      startDate: data.data.startDate,
      endDate: data.data.endDate,
    };
  } catch (error) {
    console.error('지갑정보 조회 요청 오류:', error);
    throw new Error('지갑정보 조회 요청 중 오류가 발생했습니다.');
  }
};

//getHistoryStatistics
export const fetchHistoryStatistics = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/history/statistics?yearMonth=${year}${month}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`지출정보 조회 요청 실패: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      yearMonth: data.data.yearMonth,
      totalExpense: data.data.totalExpense,
      totalInterest: data.data.totalInterest,
      expenseCategories: data.data.expenseCategories,
    };
  } catch (error) {
    console.error('지출정보 조회 요청 오류:', error);
    throw new Error('지출정보 조회 요청 중 오류가 발생했습니다.');
  }
};
//getUsersNickname
export const fetchUsersNickname = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/nickname`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`유저 닉네임 조회 요청 실패: ${response.statusText}`);
    }
    const data = await response.json();

    if (!data.nickname) {
      return {
        nickname: '',
        category: 'NONE',
      };
    }

    return {
      nickname: data.data.nickname,
      category: data.data.category,
    };
  } catch (error) {
    console.error('유저 닉네임 조회 요청 오류:', error);
    throw new Error('유저 닉네임임 조회 요청 중 오류가 발생했습니다.');
  }
};
//getMydata
export const fetchUsersMydata = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/mydata`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`유저 자산 조회 요청 실패: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('유저 자산 조회 요청 오류:', error);
    throw new Error('유저 자산 조회 요청 중 오류가 발생했습니다.');
  }
};
//put wallet
export const fetchPutWallet = async (props: {
  walletId: number;
  walletAmount: number;
  paymentDay: string;
  startDate: string;
  endDate: string;
}) => {
  const newWallet = { ...props }; // 객체 복사
  delete (newWallet as { walletId?: number }).walletId;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/wallet`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiToken()}`,
      },
      body: JSON.stringify(newWallet),
    });
    if (!response.ok) {
      throw new Error(`지갑 정보 수정 요청 실패: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('지갑 정보 수정 요청 오류:', error);
    throw new Error('지갑 정보 수정 요청 중 오류가 발생했습니다.');
  }
};

//getMydata
export const fetchHistoryMonthly = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/history/monthly`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getApiToken()}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`히스토리 조회 요청 실패: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('히스토리 조회 요청 오류:', error);
    throw new Error('히스토리 조회 요청 중 오류가 발생했습니다.');
  }
};
