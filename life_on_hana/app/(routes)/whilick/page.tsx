"use client";

import Btn from "@/components/atoms/Btn";
import Image from "next/image";
import whilick_purple from "@/assets/whilick_purple.svg";
import soundOn from "@/assets/sound-on.svg";
import soundOff from "@/assets/sound-off.svg";
import { useState } from "react";
import IsLike from "@/components/molecules/IsLike";
import CopyUrlButton from "@/components/atoms/CopyClipboardBtn";
import AdjustBtn from "@/components/atoms/AdjustBtn";

export default function Whilick() {
  const mockData = [
    {
      title: "2025년 부동산 세제 전망과 절세 전략",
      articleId: 1,
      shorts:
        "2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다. 2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다. 취득세는 현행 유지, 보유세는 큰 이슈 없으며, 양도세는 비과세와 과세에서 미세 조정이 예상됩니다. 신규 제도로 6년 단기 임대등록제가 도입되고, 부동산임대업은 세법상 중소기업에서 제외되어 각종 세제 혜택이 축소될 것으로 보입니다.",
      likeCount: 5,
      isLiked: true,
    },
    {
      title: "2025년 부동산 세제 전망과 절세 전략",
      articleId: 2,
      shorts:
        "2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다. 2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다. 취득세는 현행 유지, 보유세는 큰 이슈 없으며, 양도세는 비과세와 과세에서 미세 조정이 예상됩니다. 신규 제도로 6년 단기 임대등록제가 도입되고, 부동산임대업은 세법상 중소기업에서 제외되어 각종 세제 혜택이 축소될 것으로 보입니다.",
      likeCount: 15,
      isLiked: false,
    },
  ];

  const [isSound, setIsSound] = useState(true);
  const soundToggleEvent = () => {
    setIsSound(!isSound);
  };

  return (
    <>
      <div className="px-[1.5rem] relative bg-gradient-to-b from-hanalightpurple to-[#B399C8] min-h-screen flex flex-col items-center justify-center">
        {/* 최상단 */}
        <div className="px-[1.5rem] w-full absolute top-[1.5rem] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src={whilick_purple} alt="whilick_icon" width={20} height={20} />
            <div className="text-[1.5rem] font-Hana2bold">휘릭</div>
          </div>
          {/* sound on/off */}
          <button onClick={soundToggleEvent}>
            {isSound ? (
              <Image src={soundOn} alt="소리켬" width={20} height={20} />
            ) : (
              <Image src={soundOff} alt="소리끔" width={20} height={20} />
            )}
          </button>
        </div>

        <div className="absolute top-24 flex flex-col space-y-6">
          {/* 칼럼 제목 */}
          <div className="px-[1.5rem] font-SCDream5 text-[2rem] text-center">{mockData[0].title}</div>

          {/* 칼럼 요약내용 */}
          <div
            className="px-[1.5rem] flex text-center justify-center w-full font-SCDream8 text-[1.8rem] text-[#D3BCED] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              maxHeight: "calc(100vh - 35rem)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {mockData[0].shorts}
          </div>
        </div>

        {/* 전문 보기 버튼 */}
        <div className="absolute bottom-28">
          <Btn variant="moveToArticle" text="전문 보기" url={`/column/${mockData[0].articleId}`} />
        </div>

        <div className="absolute right-10 bottom-44 z-50 flex items-center gap-4">
          <CopyUrlButton />
          <IsLike likeCount={mockData[0].likeCount} isLiked={mockData[0].isLiked} />
        </div>
        <div className="absolute right-12 bottom-56 z-50 flex flex-col items-center gap-4">
          <AdjustBtn typeCeilTxt="글씨" typeBottomTxt="크기" first="작게" second="보통" third="크게" mX={80} mY={90} />
          <AdjustBtn typeCeilTxt="말" typeBottomTxt="속도" first="0.5x" second="1x" third="2x" mX={80} mY={90} />
        </div>

        {/* 하단 스크롤 */}
        {/* <div className="border border-rose-400">
          <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAJHpUWHRDcmVhdG9yAAAImXNMyU9KVXBMK0ktUnBNS0tNLikGAEF6Bs5qehXFAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAG1BMVEVHcEz///////////////////////////////8W/R0OAAAACHRSTlMA8DARzppgSPGP1/EAAACxSURBVDjL7dMxDoMwDAXQCNQLZGLER6hEpR6BkYGBkSMwds0A4tilaQhx8g1DpU7xEkvOyxJ/pX6sRy0Mejt4ajy9rXZ8N5gPsz2KSmPcfRtCvGxn10He7BjyA0MeYMBDDDjDCS/bhd2OeLOO/DXGYxzxBDOeYsYBDnhRLeCHPCeEPcfYcwE7LmHHyUzSzm5c2Kydk6nllSdzgj/8DG9cq7/WRUJfYkKnnNCc0JzQy3oDyHRCJ1uyzAkAAAAASUVORK5CYII="></image>
        </div> */}
      </div>
    </>
  );
}
