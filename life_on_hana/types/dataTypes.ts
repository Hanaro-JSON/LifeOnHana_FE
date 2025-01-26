import { type TVerticalBarGraphProps } from './componentTypes';

export type THistoryMonthly = {
  averageExpense: number;
  currentBalance: number;
  monthlyExpenses: TVerticalBarGraphProps[];
};

export type THistoryHistories = {
  historyId: number;
  category: string;
  amount: number;
  description: string;
  historyDateTime: string;
  isFixed: boolean;
  isExpense: boolean;
};
export type THistory = {
  data: unknown;
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
  histories: THistoryHistories[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};
export type TArticlesLiked = {
  articleId: number;
  title: string;
  category: string;
  thumbnailS3Key?: string;
  publishedAt?: string;
  isLiked?: true;
};

export type THomeLikeProduct = {
  productId: number;
  name: string;
  description: string;
  category: 'LOAN' | 'SAVINGS' | 'LIFE';
  minAmount?: number | null;
  maxAmount?: number | null;
  basicInterestRate?: number | null;
  maxInterestRate?: number | null;
  minPeriod?: number | null;
  maxPeriod?: number | null;
  minCreditScore?: number | null;
};
export type TGetUsersMydata = {
  pensionStart: string;
  totalAsset: number;
  netAsset: number;
  depositAmount: number;
  depositPercentage: number;
  savingsAmount: number;
  savingsPercentage: number;
  loanAmount: number;
  loanPercentage: number;
  stockAmount: number;
  stockPercentage: number;
  realEstateAmount: number;
  realEstatePercentage: number;
  lastUpdatedAt: string;
  salaryAccount: {
    accountNumber: string;
    balance: number;
    bank:
      | 'HANA'
      | 'SHINHAN'
      | 'NH'
      | 'TOSS'
      | 'KB'
      | 'IBK'
      | 'KAKAO'
      | 'NAVER'
      | 'WOORI';
  };
};

export type TGetWallet = {
  walletId: number;
  walletAmount: number;
  paymentDay: string;
  startDate: string;
  endDate: string;
};
export type TArticle = {
  articleId: number;
  title: string;
  category: string;
  thumbnailS3Key: string;
  content: TArticleContent[];
  publishedAt: string;
  isLiked: boolean;
  likeCount: number;
  relatedProducts: TArticleRelatedProduct[];
};

// TArticleContent 타입 정의
export type TArticleContent = {
  type: 'text' | 'word' | 'image';
  content: string;
  description?: string;
};

// TArticleRelatedProduct 타입 정의
export type TArticleRelatedProduct = {
  productId: number;
  name: string;
  category: string;
  link: string;
  description: string; // 새로 추가
};

// API 응답 타입 정의
export type TArticleDetail = {
  code: number;
  status: string;
  message: string;
  data: TArticle; // 'data' 속성 안에 실제 article 데이터가 있음
};

export type TWhilickData = {
  contents: TWhilickContents[];
  pageable: {
    first: boolean;
    last: boolean;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
};

export type TWhilickContents = {
  articleId: number;
  title: string;
  isLiked: boolean;
  likeCount: number;
  text: {
    paragraphId: number;
    content: string;
    startTime: number;
    endTime: number;
  }[];
  ttsUrl: string;
};
