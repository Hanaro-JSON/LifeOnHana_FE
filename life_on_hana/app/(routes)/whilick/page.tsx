'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { fetchWhilickList } from '@/api';
import { TWhilickData, type TWhilickContents } from '@/types/dataTypes';

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

  const whilickItemTop = Math.floor(debouncedTop / window.innerHeight);
  useEffect(() => {
    console.log('whilickItemTop', whilickItemTop);
  }, [whilickItemTop]);

  // ----------------------- api 통신 --------------------------------

  const [whilickData, setWhilickData] = useState<TWhilickData>();
  const articleIdData = localStorage.getItem('article_id');
  const [wholeData, setWholeData] = useState<TWhilickContents[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    console.log('wholeData: ', wholeData);
    // console.log('viewings: ', viewings);
  }, [wholeData]);

  // first fetch ----------------------------
  useEffect(() => {
    fetchWhilickList(
      currentPage,
      articleIdData,
      wholeData,
      (newData) => {
        const updatedWholeData = [...wholeData, ...newData?.contents]; // 기존 데이터에 새 데이터 추가
        setWholeData(updatedWholeData);
      },
      setWhilickData
    );
  }, [articleIdData]);

  const loadMoreData = useCallback(() => {
    setIsLoading(true);
    fetchWhilickList(
      currentPage + 1,
      articleIdData,
      wholeData,
      (newData) => {
        const updatedWholeData = [...wholeData, ...newData?.contents];
        setWholeData(updatedWholeData);

        if (newData?.contents.length === 0) {
          setHasMore(false);
        }
        setCurrentPage((prev) => prev + 1);
      },
      setWhilickData
    ).finally(() => {
      setIsLoading(false);
    });
  }, [currentPage, articleIdData, wholeData, setWhilickData]);

  useEffect(() => {
    if (whilickItemTop % 7 === 0 && hasMore && !isLoading) {
      loadMoreData();
    }
  }, [whilickItemTop]);

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
            {wholeData?.map(
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
