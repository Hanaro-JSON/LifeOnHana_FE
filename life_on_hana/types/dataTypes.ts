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
      | "HANA"
      | "SHINHAN"
      | "NH"
      | "TOSS"
      | "KB"
      | "IBK"
      | "KAKAO"
      | "NAVER"
      | "WOORI";
  };
};

export type TGetWallet = {
  walletId: number;
  walletAmount: number;
  paymentDay: string;
  startDate: string;
  endDate: string;
};
