import React from "react";
import Btn from "../atoms/Btn";

type TArticleAIRecommendDetailItemProps = {
  title: string;
  content: string;
  url: string;
};

export default function ArticleAIRecommendDetailItem({ title, content, url }: TArticleAIRecommendDetailItemProps) {
  return (
    <div className="w-[20rem] h-[30.9375rem] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-center justify-between p-6">
      {/* 제목 */}
      <div className="text-[.9375rem] font-SCDream8 text-left self-start">
        {title}
    </div>
      {/* 내용 */}
      <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-center overflow-y-auto max-h-[20rem] flex-grow">
        <p className="text-left">{content}</p>
      </div>

      {/* 버튼, url */}
      {/* 현재 버튼은 Btn의 default 가져온 상태 */}
      <div className="mt-4">
        <Btn text={"상품정보 자세히보기"} url={url} />
      </div>
    </div>
  );
}
