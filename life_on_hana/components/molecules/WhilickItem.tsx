import { type TWhilickItemProps } from "@/types/componentTypes";
import AdjustBtn from "@/components/atoms/AdjustBtn";
import Btn from "@/components/atoms/Btn";
import CopyClipboardBtn from "@/components/atoms/CopyClipboardBtn";
import IsLike from "@/components/molecules/IsLike";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import soundOn from "@/assets/sound-on.svg";
import soundOff from "@/assets/sound-off.svg";

export default function WhilickItem({
  idx,
  title,
  text,
  articleId,
  isLiked,
  likeCount,
  ttsUrl,
  top,
}: TWhilickItemProps & { idx: number; top: number }) {
  // AdjustBtn 둘다 열림 방지
  const [openedAdjustBtn, setOpenedAdjustBtn] = useState<string | null>(null);

  const handleAdjustBtnToggle = (id: string) => {
    setOpenedAdjustBtn((prev) => (prev === id ? null : id));
  };

  // audio
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current!;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.volume = 1;
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const isVisible = Math.floor(top / window.innerHeight) === idx;

    if (isVisible) {
      audio.play().catch(console.error);
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }

    return () => {
      audio.pause();
    };
  }, [top, idx]);

  return (
    <>
      <div className="snap-start w-full min-h-screen scroll-snap-align-start px-[1.5rem] relative bg-gradient-to-b from-hanalightpurple to-[#B399C8] flex flex-col items-center justify-center">
        {/* sound on/off */}
        <div className="z-50 absolute top-6 w-full flex flex-col space-y-6 items-center">
          <div className="w-full h-10 flex justify-end items-center px-[1.5rem]">
            <audio ref={audioRef}>
              <source src={ttsUrl} type="audio/mp3" />
            </audio>
            <button onClick={toggleAudio}>
              <Image
                src={isPlaying ? soundOn : soundOff}
                alt={isPlaying ? "소리켬" : "소리끔"}
                style={{ width: 20, height: "auto" }}
                priority
              />
            </button>
          </div>

          {/* 칼럼 제목 */}
          <div className="px-[1.5rem] font-SCDream5 text-[2rem] text-center">{title}</div>
          <div className="px-[1.5rem] font-SCDream5 text-[2rem] text-center">{articleId}</div>

          {/* 칼럼 요약내용 */}
          <div
            className="gap-5 px-[1.5rem] flex flex-col text-center items-center  w-full font-SCDream8 text-[1.8rem] text-[#D3BCED] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              maxHeight: "calc(100vh - 35rem)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {text.map((elem) => {
              return (
                <div key={elem.paragraphId} className="">
                  {elem.content}
                </div>
              );
            })}
          </div>
        </div>

        {/* 전문 보기 버튼 */}
        <div className="absolute bottom-36">
          <Btn variant="moveToArticle" text="전문 보기" url={`/column/${articleId}`} />
        </div>

        {/* 하단 스크롤 */}
        <div className="absolute bottom-28 z-50">
          <svg width="20" height="20" viewBox="0 0 45 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M45 3.26318L39.7125 0L22.5 10.5995L5.2875 0L0 3.26318L22.5 17.1491L45 3.26318Z"
              fill="white"
              className="whilick-down-1"
            ></path>
            <path
              d="M45 18.5132L39.7125 15.25L22.5 25.8495L5.2875 15.25L0 18.5132L22.5 32.3991L45 18.5132Z"
              fill="white"
              className="whilick-down-2"
            ></path>
          </svg>
        </div>

        {/* 클립보드복사, 좋아요 */}
        <div className="absolute right-10 bottom-48 z-50 flex items-center gap-4">
          <CopyClipboardBtn />
          <IsLike likeCount={likeCount} isLiked={isLiked} />
        </div>

        {/* 글씨크기조절, TTS속도조절 */}
        <div className="absolute right-12 bottom-60 z-50 flex flex-col items-center gap-4">
          <AdjustBtn
            id="font-size"
            isOpen={openedAdjustBtn === "font-size"}
            typeCeilTxt="글씨"
            typeBottomTxt="크기"
            first="작게"
            second="보통"
            third="크게"
            mX={80}
            mY={90}
            onToggle={handleAdjustBtnToggle}
          />
          <AdjustBtn
            id="tts-speed"
            isOpen={openedAdjustBtn === "tts-speed"}
            typeCeilTxt="말"
            typeBottomTxt="속도"
            first="0.5x"
            second="1x"
            third="2x"
            mX={80}
            mY={90}
            onToggle={handleAdjustBtnToggle}
          />
        </div>
      </div>
    </>
  );
}
