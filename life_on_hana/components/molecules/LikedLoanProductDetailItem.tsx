import React from "react";
import Btn from "../atoms/Btn";

type TLikedLoanProductDetailItemProps = {
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
};

export default function LikedLoanProductDetailItem({
  name,
  description,
  feature,
  target,
  link,
  loanInfo,
}: TLikedLoanProductDetailItemProps) {
  const formatAmountRange = () => {
    const { minAmount, maxAmount } = loanInfo;
    if (minAmount == null && maxAmount == null) return "한도 정보 없음";
    if (minAmount == null) return `최대 ${maxAmount?.toLocaleString()}원`;
    if (maxAmount == null) return `최소 ${minAmount.toLocaleString()}원`;
    return `${minAmount.toLocaleString()}원 ~ ${maxAmount.toLocaleString()}원`;
  };

  return (
    <div className="w-[20rem] min-h-[30.9375rem] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6">
      <div className="text-[1.125rem] font-SCDream8 text-left self-start mb-2">
        {name}
      </div>

      <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-left overflow-y-auto max-h-[7rem] flex-grow mb-2">
        <p>{description}</p>
      </div>

      <div className="space-y-2">
        {[
          { label: "특징", content: feature },
          { label: "대상", content: target },
          { label: "한도", content: formatAmountRange() },
          { label: "기간", content: `${loanInfo.minPeriod}개월 ~ ${loanInfo.maxPeriod}개월` },
        ].map(({ label, content }) => (
          <div key={label} className="flex items-center">
            <div className="flex-none">
              <div className="bg-hanalightpurple text-black rounded-[.9375rem] text-[.8125rem] font-SCDream5 px-3 py-1 mr-2 flex items-center justify-center">
                {label}
              </div>
            </div>
            <div className="text-[.6875rem] font-SCDream3 flex-grow">{content}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 -ml-2">
        <Btn text={"상품정보 자세히보기"} url={link} />
      </div>
    </div>
  );
}