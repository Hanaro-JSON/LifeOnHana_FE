'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { getApiToken, NEXT_PUBLIC_URL } from '@/api';
// import { fetchWhilicks } from '@/api';

type TWhilickContents = {
  articleId: number;
  title: string;
  isLiked: boolean;
  likeCount: number;
  text: {
    paragraphId: number;
    content: string;
    startTime: number;
    endTime: number;
  }[];
  ttsUrl: string;
};

export default function Whilick() {
  const [globalAudioState, setGlobalAudioState] = useState({
    isPlaying: true,
    isMute: false,
  });
  const [globalAudioSpeed, setGlobalAudioSpeed] = useState(1.0);
  const [globalFontSize, setGlobalFontSize] = useState(1.0);

  const [top, setTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedTop = useDebounce(top, 100);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setTop(scrollRef.current.scrollTop);
    }
  }, []);

  // ----------------------- api 통신 --------------------------------
  const [fetchData, setFetchData] = useState([]);
  const [whilickData, setWhilickData] = useState([]);
  const [whilickContents, setWhilickContens] = useState<TWhilickContents[]>([]);

  const token = getApiToken();

  useEffect(() => {
    const fetchWhilickList = async () => {
      try {
        let currentToken = token;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/articles/shorts?page=0&size=10`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentToken}`,
              credentials: 'include',
            },
          }
        );

        // 토큰 갱신 실패
        if (response.status === 401) {
          currentToken = await refreshToken();
          const retryResponse = await fetch(
            `${NEXT_PUBLIC_URL}/api/articles/shorts?page=0&size=10`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentToken}`,
                credentials: 'include',
              },
            }
          );
          if (!retryResponse.ok)
            throw new Error(`Error: ${retryResponse.status}`);
          const data = await retryResponse.json();
          setFetchData(data);
        } else if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        // 성공!!!!!
        else {
          const data = await response.json();
          setFetchData(data);
          setWhilickData(data.data);
          setWhilickContens(data.data.contents);
        }
      } catch (error) {
        console.error('Failed to fetch whilick list:', error);
      }
    };

    fetchWhilickList();
  }, [token]);

  // 토큰 갱신
  const refreshToken = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to refresh token');
      const data = await response.json();
      return data.refreshToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (fetchData) {
      console.log('whilickData>>>', whilickData);
      console.log('whilickContens>>>', whilickContents);
    }
  }, [fetchData, whilickData, whilickContents]);

  return (
    <>
      {!whilickData ? (
        <WhilickItemLoading />
      ) : (
        <div className='relative min-h-screen flex flex-col items-center justify-center'>
          {/* 최상단 */}
          <div className='fixed z-50 px-[1.5rem] w-full top-6 h-10 flex justify-start items-center'>
            <div className='flex items-center gap-4'>
              <Image
                src={whilick_purple}
                alt='whilick_icon'
                style={{ width: 20, height: 'auto' }}
                priority
              />
              <div className='text-[1.5rem] font-Hana2bold'>휘릭</div>
            </div>
          </div>

          {/* 상하 스크롤 영역 */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className='snap-y snap-mandatory flex flex-col overflow-y-scroll max-h-[100vh] w-full'
          >
            {whilickContents?.map(
              ({ articleId, title, text, isLiked, likeCount, ttsUrl }, idx) => (
                <WhilickItem
                  idx={idx}
                  key={articleId}
                  title={title}
                  text={text}
                  articleId={articleId}
                  isLiked={isLiked}
                  likeCount={likeCount}
                  ttsUrl={ttsUrl}
                  top={debouncedTop}
                  globalAudioState={globalAudioState}
                  setGlobalAudioState={setGlobalAudioState}
                  globalAudioSpeed={globalAudioSpeed}
                  setGlobalAudioSpeed={setGlobalAudioSpeed}
                  globalFontSize={globalFontSize}
                  setGlobalFontSize={setGlobalFontSize}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
