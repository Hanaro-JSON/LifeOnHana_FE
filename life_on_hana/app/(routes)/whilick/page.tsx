/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { type TWhilickData } from '@/types/dataTypes';
import { fetchWhilickList } from '@/api';
import { useToast } from '@/hooks/use-toast';

export default function Whilick() {
  const { toast } = useToast();
  const [globalAudioState, setGlobalAudioState] = useState({
    isPlaying: false,
    isMute: true,
  });
  const [globalAudioSpeed, setGlobalAudioSpeed] = useState(1.0);
  const [globalFontSize, setGlobalFontSize] = useState(1.0);

  const [top, setTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedTop = useDebounce(top, 20);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setTop(scrollRef.current.scrollTop);
    }
  }, []);

  // ----------------------- api 통신 --------------------------------

  const [whilickData, setWhilickData] = useState<TWhilickData | null>(null);
  const articleIdData = localStorage.getItem('article_id');
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const whilickItemTop = Math.floor(debouncedTop / window.innerHeight);

  useEffect(() => {
    console.log('whilickItemTop', whilickItemTop);
    console.log('whilickData: ', whilickData);
  }, [whilickItemTop, whilickData]);

  // ---------------------------- first fetch ----------------------------
  useEffect(() => {
    fetchWhilickList(currentPage, articleIdData, setWhilickData);
  }, [articleIdData]);

  // ---------------------------- more fetch ----------------------------
  const loadMoreData = useCallback(() => {
    setIsLoading(true);
    fetchWhilickList(currentPage + 1, articleIdData, setWhilickData).finally(
      () => {
        setIsLoading(false);
        setCurrentPage((prev) => prev + 1);
        setIsLast(whilickData?.pageable.last ?? false);
      }
    );
  }, [currentPage, articleIdData, setWhilickData]);

  useEffect(() => {
    if (
      whilickItemTop > 0 &&
      whilickItemTop % 7 === 0 &&
      !isLoading &&
      !isLast &&
      currentPage < 10
    ) {
      loadMoreData();
    }
  }, [whilickItemTop]);

  useEffect(() => {
    if (whilickItemTop === 103) {
      toast({
        title: '더이상 콘텐츠가 없습니다',
        className: 'toast-default',
      });
    }
  });

  // ----------------------- whilick 좋아요 --------------------------------

  const handleLikeUpdate = (
    articleId: number,
    isLiked: boolean,
    likeCount: number
  ) => {
    setWhilickData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        contents: prev.contents.map((item) =>
          item.articleId === articleId ? { ...item, isLiked, likeCount } : item
        ),
      };
    });
  };

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
            {whilickData?.contents?.map(
              ({ articleId, title, text, isLiked, likeCount, ttsUrl }, idx) => (
                <WhilickItem
                  idx={idx}
                  key={idx}
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
                  onLikeUpdate={handleLikeUpdate}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
