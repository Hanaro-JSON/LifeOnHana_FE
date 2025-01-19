import { ReactNode } from "react";

export type TRecommendCarouselColumnProps = {
  article_id: number;
  title: string;
  thumbnail_s3_key: string;
};

export type TAdjustBtnProps = {
  id: string;
  isOpen: boolean;
  typeCeilTxt: string;
  typeBottomTxt: string;
  first: string;
  second: string;
  third: string;
  mX: number;
  mY: number;
  onToggle: (id: string) => void;
};

export type TBtnProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  url?: string;
  variant?:
    | "default"
    | "moveToArticle"
    | "beforeChooseAccount"
    | "hanaWallet"
    | "needLumpSum";
  onClick?: () => void;
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
  bgColor?: string;
  shadowColor?: string;
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
  isAccountChecked?: boolean;
  onSelect?: (checked: boolean) => void;
  onAmountChange?: (isExceeding: boolean) => void
};

export type TArticleAIRecommendDetailItemProps = {
  name: string;
  description: string;
  link: string;
  closeBtn?: boolean;
  product_id?: number; //추가
};

export type TArticleItemProps = {
  article_id?: number;
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
  onClick?: () => void; // 추가
  isSelected?: boolean; //추가
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
  productId: string;
  name: string;
  description: string;
  link: string;
  savingsInfo: {
    basicInterestRate: number;
    maxInterestRate: number;
  };
  closeBtn?: boolean;
  onClose?: () => void;
};

export type TLikedLifeProductDetailItemProps = {
  productId: string;
  name: string;
  description: string;
  link: string;
  closeBtn?: boolean;
  onClose?: () => void;
};

export type TLikedLoanProductDetailItemProps = {
  productId: string;
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
  onClose?: () => void;
};

export type TLoginLabelInputProps = {
  label: string;
  id: string;
  type: "text" | "password";
  name: string;
  placeholder: string;
  errorMsg?: string;
};

export type TLumpSumBtnProps = "hanaSalaryBank" | "otherAccounts" | "loanProducts";

export type TMainSectionProps = {
  name: string | null | undefined;
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
  maxAmountFormatted?: string;
  minAmountFormatted?: string;
  productId: string;
  name: string;
  description: string;
  minAmount?: string;
  maxAmount?: string;
  basicInterest_rate?: number;
  maxInterest_rate?: number;
  maxPeriod?: string;
  productType: "LOAN" | "SAVINGS" | "LIFE";
  onClick: () => void;
};

export type TSearchInput = {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
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

export type TWhilickItemProps = {
  title: string;
  shorts: string;
  articleId: number;
  isLiked: boolean;
  likeCount: number;
  ttsUrl: string;
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
};
