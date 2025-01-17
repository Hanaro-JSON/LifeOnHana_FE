import Image from "next/image";
import AdjustBtn from "../atoms/AdjustBtn";
import Btn from "../atoms/Btn";
import CopyClipboardBtn from "../atoms/CopyClipboardBtn";
import IsLike from "./IsLike";

type TWhilickItemProps = {
  title: string;
  shorts: string;
  articleId: number;
  isLiked: boolean;
  likeCount: number;
};

export default function WhilickItem({ title, shorts, articleId, isLiked, likeCount }: TWhilickItemProps) {
  return (
    <>
      <div className="px-[1.5rem] relative bg-gradient-to-b from-hanalightpurple to-[#B399C8] min-h-screen flex flex-col items-center justify-center w-full">
        <div className="absolute top-24 flex flex-col space-y-6">
          {/* 칼럼 제목 */}
          <div className="px-[1.5rem] font-SCDream5 text-[2rem] text-center">{title}</div>

          {/* 칼럼 요약내용 */}
          <div
            className="px-[1.5rem] flex text-center justify-center w-full font-SCDream8 text-[1.8rem] text-[#D3BCED] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              maxHeight: "calc(100vh - 35rem)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {shorts}
          </div>
        </div>

        {/* 전문 보기 버튼 */}
        <div className="absolute bottom-36">
          <Btn variant="moveToArticle" text="전문 보기" url={`/column/${articleId}`} />
        </div>

        {/* 하단 스크롤 */}
        <div className="absolute bottom-28 z-50">
          <Image src={"/assets/whilickDownBtn.svg"} alt="아래로 내리기" width={20} height={20} />
        </div>

        {/* 클립보드복사, 좋아요 */}
        <div className="absolute right-10 bottom-48 z-50 flex items-center gap-4">
          <CopyClipboardBtn />
          <IsLike likeCount={likeCount} isLiked={isLiked} />
        </div>

        {/* 글씨크기조절, TTS속도조절 */}
        <div className="absolute right-12 bottom-60 z-50 flex flex-col items-center gap-4">
          <AdjustBtn typeCeilTxt="글씨" typeBottomTxt="크기" first="작게" second="보통" third="크게" mX={80} mY={90} />
          <AdjustBtn typeCeilTxt="말" typeBottomTxt="속도" first="0.5x" second="1x" third="2x" mX={80} mY={90} />
        </div>
      </div>
    </>
  );
}
