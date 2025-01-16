import React, { useState } from "react";
import Btn from "../atoms/Btn";
import X from "../../assets/X.svg";
import Image from "next/image";
import { type TLikedLoanProductDetailItemProps } from "@/types/componentTypes";

export default function LikedLoanProductDetailItem({
  name,
  description,
  feature,
  target,
  link,
  loanInfo,
  closeBtn = true, // 기본으로 X 활성화
}: TLikedLoanProductDetailItemProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    if (closeBtn) {
      setVisible(false);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (closeBtn && (e.target as HTMLElement).id === "modal-background") {
      handleClose();
    }
  };

  const formatAmountRange = () => {
    const { minAmount, maxAmount } = loanInfo;
    if (minAmount == null && maxAmount == null) return "한도 정보 없음";
    if (minAmount == null) return `최대 ${maxAmount?.toLocaleString()}원`;
    if (maxAmount == null) return `최소 ${minAmount.toLocaleString()}원`;
    return `${minAmount.toLocaleString()}원 ~ ${maxAmount.toLocaleString()}원`;
  };

  if (!visible) return null;

  const bg = closeBtn ? "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50" : "";

  return (
    <div id="modal-background" onClick={handleBackgroundClick} className={bg}>
      <div
        className="w-[20rem] min-h-[30.9375rem] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className=" top-[-1rem] right-[-1rem] flex justify-end items-center w-full">
          {closeBtn && (
            <button onClick={handleClose} className="p-1">
              <Image src={X} alt="Close" width={13} height={13} />
            </button>
          )}
        </div>

        {/* 제목 */}
        <div className="-mt-[0.5rem] text-[.9375rem] font-SCDream8 text-left self-start">{name}</div>

        <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-left overflow-y-auto max-h-[9rem] flex-grow">
          <p>{description}</p>
        </div>

        <div className="space-y-4 -mt-2">
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
    </div>
  );
}
