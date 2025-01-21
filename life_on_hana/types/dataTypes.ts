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
