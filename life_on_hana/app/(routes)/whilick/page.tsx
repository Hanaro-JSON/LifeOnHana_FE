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
      title: "알아 두면 쓸데 많은 1900년대 비엔나 미술 속으로",
      articleId: 1,
      shorts:
        "아트 애호가들의 심장을 뛰게 만드는 전시가 찾아왔다. 용산 국립중앙박물관에서 열리는 오스트리아 레오폴트 미술관컬렉션이 바로 그것. 우리가 몰랐던 1900년대 비엔나에 불어온 미술 사조의 변화를 엿볼 수 있는 좋은 기회다.",
      likeCount: 5,
      isLiked: false,
    },
    {
      title: "새해 소망 여행 울산시 울주군",
      articleId: 2,
      shorts:
        "누구나 마음속에 새해 이루고 싶은 소망이 있을 것이다. 2025년 새해 가장 먼저 해가 떠오르는 간절곶에서, 예부터 소망이 이뤄진다고 여겨진 영험한 곳 파래소폭포에서 마음 깊은 곳에 간직한 소망을 펼쳐 보여도 좋겠다.",
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
        <div className="z-50 px-[1.5rem] w-full absolute top-6 flex justify-between items-center">
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
