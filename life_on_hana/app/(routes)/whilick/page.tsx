/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { getApiToken, NEXT_PUBLIC_URL } from '@/api';
import { type TWhilickContents } from '@/types/dataTypes';

type TWhilickData = {
  contents: TWhilickContents[];
  pageable: {
    first: boolean;
    last: boolean;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
};

export default function Whilick() {
  // home/columns > WhilickCarousel > SmallWhilickItem 통해 설정된 localStorage의 article_id 값
  // localStorage.setItem('article_id', '20');

  const [globalAudioState, setGlobalAudioState] = useState({
    isPlaying: false,
    isMute: true,
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

  const whilickItemTop = Math.floor(debouncedTop / window.innerHeight);

  // ----------------------- api 통신 --------------------------------

  const [fetchData, setFetchData] = useState([]);
  const [whilickData, setWhilickData] = useState<TWhilickData>();
  const [whilickContents, setWhilickContens] = useState<TWhilickContents[]>([]);

  const token = getApiToken();

  const articleIdData = localStorage.getItem('article_id');

  // useEffect(() => {
  //   if (fetchData) {
  //     console.log('whilickData>>>', whilickData);
  //     console.log('whilickContents>>>', whilickContents);
  //     console.log('휘릭아이템 탑:>>>', whilickItemTop);
  //   }
  // }, [fetchData, whilickData, whilickContents, whilickItemTop]);

  useEffect(() => {
    const fetchWhilickList = async (page = 0) => {
      const getChangableApi = (page: number) => {
        if (articleIdData) {
          const articleId = JSON.parse(articleIdData);
          return `/api/articles/shorts/${articleId}`;
        } else {
          return `/api/articles/shorts?page=${page}&size=10`;
        }
      };
      const apiUrl = `${process.env.NEXT_PUBLIC_URL}${getChangableApi(page)}`;
      console.log('apiUrl: ', apiUrl);
      try {
        let currentToken = token;

        const response = await fetch(`${apiUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentToken}`,
            credentials: 'include',
          },
        });

        // 토큰 갱신 실패
        if (response.status === 401) {
          currentToken = await refreshToken();
          const retryResponse = await fetch(`${apiUrl}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentToken}`,
              credentials: 'include',
            },
          });
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

          // articleIdData가 있었을 경우, fetch 후에 해당 데이터 삭제
          if (articleIdData) {
            localStorage.removeItem('article_id');
          }
        }
      } catch (error) {
        console.error('휘릭 불러오기 실패', error);
      }
    };

    fetchWhilickList();

    if (whilickItemTop === 5 && !whilickData?.pageable.last) {
      const nextPage = (whilickData?.pageable.pageNumber ?? 0) + 1;
      fetchWhilickList(nextPage);
    }
  }, [
    token,
    whilickItemTop,
    whilickData?.pageable.last,
    whilickData?.pageable.pageNumber,
    articleIdData,
  ]);

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
