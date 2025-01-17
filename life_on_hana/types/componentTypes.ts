import { ReactNode } from "react";

export type TAdjustBtnProps = {
  typeCeilTxt: string;
  typeButtomTxt: string;
  first: string;
  second: string;
  thired: string;
  mX: number;
  mY: number;
};

export type TBtnProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  url?: string;
  variant?: "default" | "moveToArticle" | "beforeChooseAccount" | "hanaWallet";
};

export type TCarouselSectionProps = {
  variant?: "default" | "column" | "product";
  items: ReactNode[];
  onIndexChange?: (index: number) => void;
};

export type TGraphToggleProps = {
  initialState: "bar" | "circle";
  onToggle?: (state: "bar" | "circle") => void;
};

export type TMiniBtnProps = {
  text: string;
  variant?: "default" | "cancel";
};

export type TSectionProps = {
  hasShadow?: boolean;
  children?: ReactNode;
  height?: string;
};

export type TShortsAutoToggleProps = {
  initialState: "play" | "pause";
  onToggle?: (state: "play" | "pause") => void;
};

export type TAccountDetailItemProps = {
  bank: string;
  accountNumber: string;
  accountName: string;
  balance: number;
};

export type TArticleAIRecommendDetailItemProps = {
  name: string;
  description: string;
  link: string;
  closeBtn?: boolean;
};

export type TArticleItemProps = {
  title: string;
  category: string;
  published_at: string;
  thumbnail_s3_key: string;
  is_liked: boolean;
};

export type TAssetManageWayItemProps =
  | "adjust"
  | "rebalancing"
  | "managing"
  | "product"
  | "invest"
  | "trip"
  | "culture"
  | "realEstate";

export type TColumnMainImgItemProps = {
  variant: string;
  title: string;
};

export type TColumnRecommendItemProps = {
  variant: string;
  name: string;
};

export type TConnectBankItemProps = {
  bankName: string;
  initialIsMydataChecked?: boolean;
  onToggle: (isChecked: boolean) => void;
};

export type THistoryItemCategoryProps =
  | "FOOD"
  | "SNACK"
  | "EDUCATION"
  | "HOBBY"
  | "HEALTH"
  | "FIXED_EXPENSE"
  | "TRAVEL"
  | "DEPOSIT"
  | "INTEREST"
  | "ETC";

export type THistoryItemProps = {
  historyId: number;
  category: THistoryItemCategoryProps;
  amount: number;
  description: string;
  historyDatetime: string;
  isExpense: boolean;
};

export type TIsLikeProps = {
  likeCount: number;
  isLiked?: boolean;
};

export type TLikedAccountProductDetailItemProps = {
  name: string;
  description: string;
  link: string;
  savingsInfo: {
    basicInterestRate: number;
    maxInterestRate: number;
  };
  closeBtn?: boolean;
};

export type TLikedLoanProductDetailItemProps = {
  name: string;
  description: string;
  feature: string;
  target: string;
  link: string;
  loanInfo: {
    minAmount?: number;
    maxAmount?: number;
    basicInterestRate: number;
    maxInterestRate: number;
    minPeriod: number;
    maxPeriod: number;
    minCreditScore: number;
  };
  closeBtn?: boolean;
};

export type TLoginLabelInputProps = {
  label: string;
  id: string;
  type: "text" | "password";
  name: string;
  placeholder: string;
  errorMsg?: string;
};

export type TLumpSumBtnProps =
  | "hanaSalaryBank"
  | "otherAccounts"
  | "loanProducts";

export type TMainSectionProps = {
  name: string;
  walletAmount: number;
};

export type TNavItemProps = {
  route: string;
  label: string;
  icon: { default: string; clicked: string };
};

export type TRecommendCarouselItemProps = {
  productId: string;
  name: string;
  description: string;
  minAmount?: string;
  maxAmount?: string;
  basicInterest_rate?: number;
  maxInterest_rate?: number;
  maxPeriod?: string;
  productType: "LOAN" | "SAVINGS" | "LIFE";
};

export type TRecommendItemProps = {
  productId: string;
  name: string;
  description: string;
  minAmount?: string;
  maxAmount?: string;
  basicInterest_rate?: number;
  maxInterest_rate?: number;
  maxPeriod?: string;
  productType: "LOAN" | "SAVINGS" | "LIFE";
};

export type TSearchInput = {
  placeholder: string;
  value?: string;
};

export type TShortCutBtnProps = {
  url: string;
  variant?: "default" | "column" | "spend" | "product";
};

export type TSmallWhilickItemProps = {
  article_id: number;
  variant: string;
  title: string;
};

export type TGraphExpenseCategoriesProps = {
  category:
    | "FOOD"
    | "SNACK"
    | "EDUCATION"
    | "HOBBY"
    | "HEALTH"
    | "FIXED_EXPENSE"
    | "TRAVEL"
    | "DEPOSIT"
    | "INTEREST"
    | "ETC";
  amount: number;
  percentage: number;
};

export type TGraphProps = {
  type: "mydata" | "statistics";
  expenseCategories?: TGraphExpenseCategoriesProps[];
  depositAmount?: number;
  depositPercentage?: number;
  savingsAmount?: number;
  savingsPercentage?: number;
  loanAmount?: number;
  loanPercentage?: number;
  stockAmount?: number;
  stockPercentage?: number;
  realEstateAmount?: number;
  realEstatePercentage?: number;
};
