"use client";

import Image from "next/image";
import whilick_purple from "@/assets/whilick_purple.svg";
import WhilickItem from "@/components/molecules/WhilickItem";
import { useState } from "react";
import { type TMockWhilickProps } from "@/types/componentTypes";

export default function Whilick() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const mockWhilick: TMockWhilickProps[] = [
    {
      title: "알아 두면 쓸데 많은 1900년대 비엔나 미술 속으로",
      articleId: 1,
      text: [
        {
          paragraphId: 1,
          content: "아트 애호가들의 심장을 뛰게 만드는 전시가 찾아왔다.",
          startTime: 0.0,
          endTime: 4.2,
        },
        {
          paragraphId: 2,
          content: "용산 국립중앙박물관에서 열리는 오스트리아 레오폴트 미술관컬렉션이 바로 그것.",
          startTime: 4.2,
          endTime: 10.5,
        },
        {
          paragraphId: 3,
          content: "우리가 몰랐던 1900년대 비엔나에 불어온 미술 사조의 변화를 엿볼 수 있는 좋은 기회다.",
          startTime: 10.5,
          endTime: 15,
        },
      ],
      likeCount: 5,
      isLiked: false,
      ttsUrl: "/assets/audio/audio1.mp3",
    },
    {
      title: "새해 소망 여행 울산시 울주군",
      articleId: 2,
      text: [
        {
          paragraphId: 1,
          content: "누구나 마음속에 새해 이루고 싶은 소망이 있을 것이다.",
          startTime: 0.0,
          endTime: 4.2,
        },
        {
          paragraphId: 2,
          content:
            "2025년 새해 가장 먼저 해가 떠오르는 간절곶에서, 예부터 소망이 이뤄진다고 여겨진 영험한 곳 파래소폭포에서 마음 깊은 곳에 간직한 소망을 펼쳐 보여도 좋겠다.",
          startTime: 4.2,
          endTime: 10.5,
        },
      ],
      likeCount: 15,
      isLiked: false,
      ttsUrl: "/assets/audio/audio2.mp3",
    },
    {
      title: "‘흑백요리사’ 속 셰프의 레스토랑 가이드",
      articleId: 3,
      text: [
        {
          paragraphId: 1,
          content:
            "넷플릭스 요리 경연 프로그램 ‘흑백요리사’ 열풍이 불면서 출연한 셰프들의 레스토랑들도 덩달아 인기를 얻고 있다.",
          startTime: 0.0,
          endTime: 4.2,
        },
        {
          paragraphId: 2,
          content: "지금 가장 핫한 곳은 어느 곳이고, 예약 없이 갈 수 있는 레스토랑은 과연 어디일까?",
          startTime: 4.2,
          endTime: 10.5,
        },
      ],
      likeCount: 10,
      isLiked: true,
      ttsUrl: "/assets/audio/audio3.mp3",
    },
  ];

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* 최상단 */}
        <div className="fixed z-50 px-[1.5rem] w-full top-6 h-10 flex justify-start items-center">
          <div className="flex items-center gap-4">
            <Image src={whilick_purple} alt="whilick_icon" style={{ width: 20, height: "auto" }} />
            <div className="text-[1.5rem] font-Hana2bold">휘릭</div>
          </div>
        </div>

        {/* 상하 스크롤 영역 */}
        <div className="snap-y snap-mandatory flex flex-col overflow-y-scroll max-h-[100vh] w-full">
          {mockWhilick.map((item) => (
            <WhilickItem
              key={item.articleId}
              title={item.title}
              text={item.text}
              articleId={item.articleId}
              isLiked={item.isLiked}
              likeCount={item.likeCount}
              ttsUrl={item.ttsUrl}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
            />
          ))}
        </div>
      </div>
    </>
  );
}
