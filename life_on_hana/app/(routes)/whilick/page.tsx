"use client";

import Image from "next/image";
import whilick_purple from "@/assets/whilick_purple.svg";
import soundOn from "@/assets/sound-on.svg";
import soundOff from "@/assets/sound-off.svg";
import { useState } from "react";

import WhilickItem from "@/components/molecules/WhilickItem";

export default function Whilick() {
  const mockData = [
    {
      title: "첫 번째 휘릭",
      articleId: 1,
      shorts:
        "2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다.2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다. 2025년 부동산 세제는 2024년과 큰 틀에서 유사할 전망입니다. 취득세는 현행 유지, 보유세는 큰 이슈 없으며, 양도세는 비과세와 과세에서 미세 조정이 예상됩니다. 신규 제도로 6년 단기 임대등록제가 도입되고, 부동산임대업은 세법상 중소기업에서 제외되어 각종 세제 혜택이 축소될 것으로 보입니다.",
      likeCount: 5,
      isLiked: true,
    },
    {
      title: "두 번째 휘릭",
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
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* 최상단 */}
        <div className="z-50 px-[1.5rem] w-full absolute top-[1.5rem] flex justify-between items-center">
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

        {/* 내용에 관한 컴포넌트 */}
        <WhilickItem
          title={mockData[0].title}
          shorts={mockData[0].shorts}
          articleId={mockData[0].articleId}
          isLiked={mockData[0].isLiked}
          likeCount={mockData[0].likeCount}
        />
      </div>
    </>
  );
}
