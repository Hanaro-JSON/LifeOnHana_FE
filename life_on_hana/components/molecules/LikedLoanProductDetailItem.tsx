<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
import React from "react";
import Btn from "../atoms/Btn";
import X from "../../assets/X.svg";
=======
import React, { useState } from "react";
import Btn from "@/components/atoms/Btn";
import X from "@/assets/X.svg";
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
import Image from "next/image";
import { type TLikedLoanProductDetailItemProps } from "@/types/componentTypes";

export default function LikedLoanProductDetailItem({
  name,
  description,
  feature,
  target,
  link,
  loanInfo,
  closeBtn = true,
  onClose,
}: TLikedLoanProductDetailItemProps) {

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (closeBtn && (e.target as HTMLElement).id === "modal-background") {
      onClose?.();
    }
  };

  const handleCloseClick = () => {
    if (closeBtn) {
      onClose?.();
    }
  };

  const formatAmountRange = () => {
    const { minAmount, maxAmount } = loanInfo;
    if (minAmount == null && maxAmount == null) return "한도 정보 없음";
    if (minAmount == null) return `최대 ${maxAmount?.toLocaleString()}원`;
    if (maxAmount == null) return `최소 ${minAmount.toLocaleString()}원`;
    return `${minAmount.toLocaleString()}원 ~ ${maxAmount.toLocaleString()}원`;
  };

  // 배경 CSS
  const bg = closeBtn
    ? "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
    : "";

  return (
    <div id="modal-background" onClick={handleBackgroundClick} className={bg}>
      <div
        className="w-[90%] min-h-[60%] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className=" top-[-1rem] right-[-1rem] flex justify-end items-center w-full">
          {closeBtn && (
<<<<<<< HEAD
<<<<<<< HEAD
            <button onClick={handleCloseClick} className="p-1">
              <Image src={X} alt="Close" width={15} height={15} />
=======
            <button onClick={handleClose} className="p-1">
              <Image src={X} alt="Close" width={13} height={13} priority />
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
            <button onClick={handleCloseClick} className="p-1">
              <Image src={X} alt="Close" width={13} height={13} />
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
            </button>
          )}
        </div>

        {/* 제목 */}
<<<<<<< HEAD
        <div className="-mt-[0.5rem] text-[1.5rem] font-SCDream8 text-left self-start mb-2">
=======
        <div className="-mt-[0.5rem] text-[.9375rem] font-SCDream8 text-left self-start">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
          {name}
        </div>

        {/* 내용 */}
<<<<<<< HEAD
        <div className="w-[100%] text-[1.2rem] font-SCDream3 leading-normal text-left overflow-y-auto max-h-[7rem] flex-grow">
=======
        <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-left overflow-y-auto max-h-[9rem] flex-grow">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
          <p>{description}</p>
        </div>

        {/* 상세정보: 특징/대상/한도/기간 */}
<<<<<<< HEAD
        <div className="space-y-4 mt-8">
=======
        <div className="space-y-4 -mt-2">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
          {[
            { label: "특징", content: feature },
            { label: "대상", content: target },
            { label: "한도", content: formatAmountRange() },
            {
              label: "기간",
              content: `${loanInfo.minPeriod}개월 ~ ${loanInfo.maxPeriod}개월`,
            },
          ].map(({ label, content }) => (
            <div key={label} className="flex items-center">
              <div className="flex-none">
                <div className="bg-hanalightpurple rounded-[.9375rem] text-[1.1rem] font-SCDream5 px-3 py-1 mr-2 flex items-center justify-center">
                  {label}
                </div>
              </div>
<<<<<<< HEAD
              <div className="text-[1rem] font-SCDream3 flex-grow">
=======
              <div className="text-[.6875rem] font-SCDream3 flex-grow">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
                {content}
              </div>
            </div>
          ))}
        </div>

        {/* 버튼 */}
<<<<<<< HEAD
        <div className="mt-4 w-full flex justify-center">
          <div className="w-full">
=======
        <div className="mt-4 -ml-2">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
          <Btn text={"상품정보 자세히보기"} url={link} />
          </div>
        </div>
      </div>
    </div>
  );
}
