import React, { useState } from "react";
import Btn from "../atoms/Btn";
import X from "../../assets/X.svg";
import Image from "next/image";

type TArticleAIRecommendDetailItemProps = {
  name: string;
  description: string;
  link: string;
  closeBtn?: boolean; // X 버튼 활성화 여부
};

export default function ArticleAIRecommendDetailItem({ name, description, link, closeBtn = true }: TArticleAIRecommendDetailItemProps) {
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

    if (!visible) return null;
  
    const bg = closeBtn ? "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50" : "";

  return (
    <div
      id="modal-background"
      onClick={handleBackgroundClick}
      className={bg}
    >
    <div className="w-[20rem] h-[30.9375rem] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-center justify-between p-6"
    onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between w-full mb-2">
      {/* 제목 */}
      <div className="text-[.9375rem] font-SCDream8 text-left self-start">
        {name}
    </div>
    {closeBtn && ( 
            <button onClick={handleClose} className="p-1">
              <Image src={X} alt="Close" width={16} height={16} />
            </button>
          )}
          </div>
      {/* 내용 */}
      <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-center overflow-y-auto max-h-[20rem] flex-grow">
        <p className="text-left">{description}</p>
      </div>

      {/* 버튼, url */}
      {/* 현재 버튼은 Btn의 default 가져온 상태 */}
      <div className="mt-4">
        <Btn text={"상품정보 자세히보기"} url={link} />
      </div>
    </div>
    </div>
  );
}
