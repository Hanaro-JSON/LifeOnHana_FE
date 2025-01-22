import { TVerticalBarGraphProps } from './componentTypes';

export type TArticlesLiked = {
  articleId: number;
  title: string;
  category: string;
  thumbnailS3Key?: string;
  publishedAt?: string;
  is_liked?: true;
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
