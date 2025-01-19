"use client";

import Image from "next/image";
import whilick_purple from "@/assets/whilick_purple.svg";
import soundOn from "@/assets/sound-on.svg";
import soundOff from "@/assets/sound-off.svg";
import WhilickItem from "@/components/molecules/WhilickItem";
import { useEffect, useRef, useState } from "react";

export default function Whilick() {
  const mockWhilick = [
    {
      title: "알아 두면 쓸데 많은 1900년대 비엔나 미술 속으로",
      articleId: 1,
      shorts:
        "아트 애호가들의 심장을 뛰게 만드는 전시가 찾아왔다. 용산 국립중앙박물관에서 열리는 오스트리아 레오폴트 미술관컬렉션이 바로 그것. 우리가 몰랐던 1900년대 비엔나에 불어온 미술 사조의 변화를 엿볼 수 있는 좋은 기회다.",
      likeCount: 5,
      isLiked: false,
      ttsUrl: "/assets/audio/audio1.mp3",
    },
    {
      title: "새해 소망 여행 울산시 울주군",
      articleId: 2,
      shorts:
        "누구나 마음속에 새해 이루고 싶은 소망이 있을 것이다. 2025년 새해 가장 먼저 해가 떠오르는 간절곶에서, 예부터 소망이 이뤄진다고 여겨진 영험한 곳 파래소폭포에서 마음 깊은 곳에 간직한 소망을 펼쳐 보여도 좋겠다.",
      likeCount: 15,
      isLiked: false,
      ttsUrl: "/assets/audio/audio2.mp3",
    },
  ];

  const [isSound, setIsSound] = useState(true);
  const soundContainer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = soundContainer.current;
    if (audioElement) {
      const handleCanPlay = () => {
        audioElement.volume = 1;
        audioElement.play().catch((err) => console.error("오디오 재생 실패:", err));
      };

      audioElement.addEventListener("canplaythrough", handleCanPlay);
      return () => {
        audioElement.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, []);

  const soundToggleEvent = () => {
    if (soundContainer.current) {
      if (isSound) soundContainer.current.pause();
      else soundContainer.current.play().catch(console.error);
    }
    setIsSound((prev) => !prev);
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* 최상단 */}
        <div className="z-50 px-[1.5rem] w-full absolute top-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src={whilick_purple} alt="whilick_icon" style={{ width: 20, height: "auto" }} />
            <div className="text-[1.5rem] font-Hana2bold">휘릭</div>
          </div>

          {/* sound on/off */}
          <audio ref={soundContainer}>
            <source src={mockWhilick[0].ttsUrl} type="audio/mp3" />
          </audio>
          <button onClick={soundToggleEvent}>
            <Image
              src={isSound ? soundOn : soundOff}
              alt={isSound ? "소리켬" : "소리끔"}
              style={{ width: 20, height: "auto" }}
            />
          </button>
        </div>

        {/* 내용에 관한 컴포넌트 */}
        <WhilickItem
          title={mockWhilick[0].title}
          shorts={mockWhilick[0].shorts}
          articleId={mockWhilick[0].articleId}
          isLiked={mockWhilick[0].isLiked}
          likeCount={mockWhilick[0].likeCount}
        />
      </div>
    </>
  );
}
