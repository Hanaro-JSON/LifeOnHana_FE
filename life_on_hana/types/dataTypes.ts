export type TArticlesLiked = {
  articleId: number;
  title: string;
  category: string;
  thumbnailS3Key?: string;
  publishedAt?: string;
  is_liked?: true;
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
