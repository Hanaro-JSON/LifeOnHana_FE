import React from "react";
import Btn from "../atoms/Btn";
import X from "../../assets/X.svg";
import Image from "next/image";
import { TLikedLifeProductDetailItemProps } from "@/types/componentTypes";

export default function LikedLifeProductDetailItem({
  name,
  description,
  link,
  closeBtn = true,
  onClose,
}: TLikedLifeProductDetailItemProps) {
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

  const bg = closeBtn
    ? "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
    : "";

  return (
    <div id="modal-background" onClick={handleBackgroundClick} className={bg}>
      <div
        className="w-[20rem] min-h-[30.9375rem] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className=" top-[-1rem] right-[-1rem] flex justify-end items-center w-full">
          {closeBtn && (
            <button onClick={handleCloseClick} className="p-1">
              <Image src={X} alt="Close" width={13} height={13} />
            </button>
          )}
        </div>

        {/* 제목 */}
        <div className="-mt-[0.5rem] text-[.9375rem] font-SCDream8 text-left self-start">
          {name}
        </div>

        {/* 내용 */}
        <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-left overflow-y-auto max-h-[19rem] flex-grow">
          <p>{description}</p>
        </div>

        {/* 버튼 */}
        <div className="mt-4 -ml-2">
          <Btn text={"상품정보 자세히보기"} url={link} />
        </div>
      </div>
    </div>
  );
}
