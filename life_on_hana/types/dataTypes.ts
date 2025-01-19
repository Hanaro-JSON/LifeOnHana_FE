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
