"use client";

<<<<<<< HEAD
import Image from "next/image";
import whilick_purple from "@/assets/whilick_purple.svg";
import WhilickItem from "@/components/molecules/WhilickItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { type TMockWhilickProps } from "@/types/componentTypes";
import WhilickItemLoading from "@/components/molecules/WhilickItemLoading";
import useDebounce from "@/hooks/useDebounce";

export default function Whilick() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [globalAudioState, setGlobalAudioState] = useState({
    isPlaying: true,
    isMute: false,
  });

  const [top, setTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedTop = useDebounce(top, 100);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setTop(scrollRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    console.log("Debounced top:", debouncedTop);
  }, [debouncedTop]);

  const mockWhilick: TMockWhilickProps[] = [
    {
      title: "알아 두면 쓸데 많은 1900년대 비엔나 미술 속으로",
      articleId: 1,
      text: [
        {
          paragraphId: 21,
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
          paragraphId: 13,
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
      articleId: 35,
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
            <Image src={whilick_purple} alt="whilick_icon" style={{ width: 20, height: "auto" }} priority />
            <div className="text-[1.5rem] font-Hana2bold">휘릭</div>
          </div>
        </div>

        {/* 상하 스크롤 영역 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="snap-y snap-mandatory flex flex-col overflow-y-scroll max-h-[100vh] w-full"
        >
          {mockWhilick.map(({ articleId, title, text, isLiked, likeCount, ttsUrl }, idx) => (
            <WhilickItem
              idx={idx}
              key={articleId}
              title={title}
              text={text}
              articleId={articleId}
              isLiked={isLiked}
              likeCount={likeCount}
              ttsUrl={ttsUrl}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
              top={debouncedTop}
              globalAudioState={globalAudioState}
              setGlobalAudioState={setGlobalAudioState}
            />
          ))}
          <WhilickItemLoading />
        </div>
      </div>
=======
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
      </div>
      {/* </div> */}
>>>>>>> f6439c0 ([feat] 🐿️ Whilick 페이지 생성)
    </>
  );
}
