import { type TWhilickItemProps } from '@/types/componentTypes';
import AdjustBtn from '@/components/atoms/AdjustBtn';
import Btn from '@/components/atoms/Btn';
import CopyClipboardBtn from '@/components/atoms/CopyClipboardBtn';
import IsLike from '@/components/molecules/IsLike';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import soundOn from '@/assets/sound-on.svg';
import soundOff from '@/assets/sound-off.svg';

export default function WhilickItem({
  idx,
  title,
  text,
  articleId,
  isLiked,
  likeCount,
  ttsUrl,
  top,
  globalAudioState,
  setGlobalAudioState,
}: TWhilickItemProps & {
  idx: number;
  top: number;
  globalAudioState: { isPlaying: boolean; isMute: boolean };
  setGlobalAudioState: React.Dispatch<
    React.SetStateAction<{ isPlaying: boolean; isMute: boolean }>
  >;
}) {
  // AdjustBtn 둘다 열림 방지
  const [openedAdjustBtn, setOpenedAdjustBtn] = useState<string | null>(null);

  const handleAdjustBtnToggle = (id: string) => {
    setOpenedAdjustBtn((prev) => (prev === id ? null : id));
  };

  // audio
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = useCallback(() => {
    setGlobalAudioState((prevState) => ({
      isPlaying: !prevState.isPlaying,
      isMute: prevState.isPlaying,
    }));
  }, [setGlobalAudioState]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const isVisible = Math.floor(top / window.innerHeight) === idx;

    if (isVisible) {
      // 오디오를 처음으로 되감기
      audio.currentTime = 0;
      if (globalAudioState.isPlaying && !globalAudioState.isMute) {
        audio.play().catch(console.error);
        audio.loop = true;
      }
    } else {
      audio.pause();
    }

    // 스크롤 중 오디오 멈춤
    if (Math.floor(top % window.innerHeight) != 0) {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [top, idx, globalAudioState]);

  // 글씨 크기 조절
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);
  const handleFontSizeChange = (value: number) => {
    setFontSizeMultiplier(value);
  };

  // 오디오 속도 조절
  const [audioSpeed, setAudioSpeed] = useState(1.0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioSpeed;
    }
  }, [audioSpeed]);

  const handleAudioSpeedChange = useCallback((value: number) => {
    setAudioSpeed(value);
    if (audioRef.current instanceof HTMLAudioElement) {
      audioRef.current.playbackRate = value;
    }
  }, []);

  return (
    <>
      <div className='snap-start w-full min-h-screen scroll-snap-align-start px-[1.5rem] relative bg-gradient-to-b from-hanalightpurple to-[#B399C8] flex flex-col items-center justify-center'>
        {/* sound on/off */}
        <div className='z-50 absolute top-6 w-full flex flex-col space-y-6 items-center'>
          <div className='w-full h-10 flex justify-end items-center px-[1.5rem]'>
            <audio ref={audioRef} loop>
              <source src={ttsUrl} type='audio/mp3' />
            </audio>
            <button onClick={toggleAudio}>
              <Image
                src={
                  globalAudioState.isPlaying && !globalAudioState.isMute
                    ? soundOn
                    : soundOff
                }
                alt={
                  globalAudioState.isPlaying && !globalAudioState.isMute
                    ? '소리켬'
                    : '소리끔'
                }
                style={{ width: 20, height: 'auto' }}
                priority
              />
            </button>
          </div>

          {/* 칼럼 제목 */}
          <div className='px-[1.5rem] font-SCDream5 text-[2rem] text-center'>
            {title}
          </div>

          {/* 칼럼 요약내용 */}
          <div
            className='gap-5 px-[1.5rem] flex flex-col text-center items-center w-full font-SCDream8 text-[#D3BCED] overflow-y-auto [&::-webkit-scrollbar]:hidden'
            style={{
              maxHeight: 'calc(100vh - 25rem)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              fontSize: `calc(2rem * ${fontSizeMultiplier})`,
            }}
          >
            {text.map((elem) => {
              return (
                <div key={elem.paragraphId} className=''>
                  {elem.content}
                </div>
              );
            })}
          </div>
        </div>

        {/* 전문 보기 버튼 */}
        <div className='absolute bottom-36'>
          <Btn
            variant='moveToArticle'
            text='전문 보기'
            url={`/column/${articleId}`}
          />
        </div>

        {/* 하단 스크롤 */}
        <div className='absolute bottom-28 z-50'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 45 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M45 3.26318L39.7125 0L22.5 10.5995L5.2875 0L0 3.26318L22.5 17.1491L45 3.26318Z'
              fill='white'
              className='whilick-down-1'
            ></path>
            <path
              d='M45 18.5132L39.7125 15.25L22.5 25.8495L5.2875 15.25L0 18.5132L22.5 32.3991L45 18.5132Z'
              fill='white'
              className='whilick-down-2'
            ></path>
          </svg>
        </div>

        {/* 클립보드복사, 좋아요 */}
        <div className='absolute right-10 bottom-48 z-50 flex items-center gap-4'>
          <CopyClipboardBtn />
          <IsLike likeCount={likeCount} isLiked={isLiked} />
        </div>

        {/* 글씨크기조절, TTS속도조절 */}
        <div className='absolute right-12 bottom-60 z-50 flex flex-col items-center gap-4'>
          <AdjustBtn
            id='font-size'
            isOpen={openedAdjustBtn === 'font-size'}
            typeCeilTxt='글씨'
            typeBottomTxt='크기'
            first='작게'
            second='보통'
            third='크게'
            mX={80}
            mY={90}
            onToggle={handleAdjustBtnToggle}
            onChange={(value) => {
              if (value === 1) handleFontSizeChange(0.8);
              if (value === 2) handleFontSizeChange(1.0);
              if (value === 3) handleFontSizeChange(1.2);
            }}
          />
          <AdjustBtn
            id='tts-speed'
            isOpen={openedAdjustBtn === 'tts-speed'}
            typeCeilTxt='말'
            typeBottomTxt='속도'
            first='0.75x'
            second='1x'
            third='1.5x'
            mX={80}
            mY={90}
            onToggle={handleAdjustBtnToggle}
            onChange={(value) => {
              if (value === 1) handleAudioSpeedChange(0.75);
              if (value === 2) handleAudioSpeedChange(1.0);
              if (value === 3) handleAudioSpeedChange(1.5);
            }}
          />
        </div>
      </div>
    </>
  );
}
