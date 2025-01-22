import { type TVerticalBarGraphProps } from './componentTypes';

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
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
  histories: THistoryHistories[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
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
