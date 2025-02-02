'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { type TWhilickData, type TWhilickContents } from '@/types/dataTypes';
import { getApiToken } from '@/api';

export default function Whilick() {
  const [globalAudioState, setGlobalAudioState] = useState({
    isPlaying: false,
    isMute: true,
  });
  const [globalAudioSpeed, setGlobalAudioSpeed] = useState(1.0);
  const [globalFontSize, setGlobalFontSize] = useState(1.0);

  const [top, setTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedTop = useDebounce(top, 50);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setTop(scrollRef.current.scrollTop);
    }
  }, []);

  // ----------------------- api 통신 --------------------------------

  const [whilickData, setWhilickData] = useState<TWhilickData>();
  const [wholeData, setWholeData] = useState<TWhilickContents[]>([]);
  const [viewings, setViewings] = useState<TWhilickContents[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const articleIdData = localStorage.getItem('article_id');

  const getChangableApi = useCallback(
    (page: number) => {
      if (articleIdData) {
        const articleId = JSON.parse(articleIdData);
        return `/api/articles/shorts/${articleId}`;
      } else {
        return `/api/articles/shorts?page=${page}&size=10`;
      }
    },
    [articleIdData]
  );

  const fetchData = useCallback(
    async (page: number = 0) => {
      setIsLoading(true);
      try {
        const currentToken = getApiToken();
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}${getChangableApi(page)}`;

        console.log('Fetching:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentToken}`,
            credentials: 'include',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setWhilickData(data.data);
        setWholeData((prev) => [...prev, ...data.data.contents]);

        // articleIdData가 있었다면, fetch 후에 삭제
        if (articleIdData) {
          localStorage.removeItem('article_id');
        }

        if (data.data.pageable.last === true) {
          setIsLast(true);
        }

        setCurrentPage((prev) => prev + 1);
      } catch (error) {
        console.error('휘릭 불러오기 실패', error);
      } finally {
        setIsLoading(false);
      }
    },
    [articleIdData, getChangableApi]
  );

  // 첫 데이터 fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 첫 5개 항목을 viewings에 할당
  useEffect(() => {
    if (wholeData.length > 0) {
      setViewings(wholeData.slice(0, 5));
    }
  }, [wholeData]);

  // whilickItemTop을 통해 현재 스크롤 위치 계산
  const whilickItemTop = Math.floor(debouncedTop / window.innerHeight);

  // 스크롤이 마지막 항목에 근접하면 데이터를 추가로 로딩할 시점
  useEffect(() => {
    if (whilickItemTop >= wholeData.length / 5 - 1 && !isLoading && !isLast) {
      fetchData(currentPage);
    }
  }, [whilickItemTop, wholeData, currentPage, isLoading, isLast, fetchData]);

  // 현재 보고 있는 항목을 기준으로 시작과 끝 범위 설정하는 것으로 viewings 배열 동적 수정
  useEffect(() => {
    if (wholeData.length > 0) {
      const currentIndex = Math.floor(whilickItemTop * 5); // 현재 보고 있는 항목의 인덱스
      const startIndex = Math.max(0, currentIndex - 2);
      const endIndex = Math.min(wholeData.length, currentIndex + 3);

      // viewings 배열을 갱신하기 전에 이전 데이터를 기준으로 덧붙여나가는 방식
      setViewings((prevViewings) => {
        const newViewings = wholeData.slice(startIndex, endIndex);

        // 이미 추가된 viewings와 겹치는 부분을 제외하고, 새로운 데이터만 추가
        const updatedViewings = [
          ...prevViewings.filter(
            (item) =>
              !newViewings.some(
                (newItem) => newItem.articleId === item.articleId
              )
          ),
          ...newViewings,
        ];

        return updatedViewings;
      });
    }
  }, [whilickItemTop, wholeData]);

  // useEffect(() => {
  //   console.log('wholeData: ', wholeData);
  //   console.log('currentPage: ', currentPage);
  //   console.log('viewings: ', viewings);
  //   console.log('isLast: ', isLast);
  //   console.log('whilickItemTop: ', whilickItemTop);
  // }, [currentPage, viewings, wholeData, isLast, whilickItemTop]);

  return (
    <>
      {whilickData?.contents?.length === 0 ? (
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
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {viewings?.map(
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
