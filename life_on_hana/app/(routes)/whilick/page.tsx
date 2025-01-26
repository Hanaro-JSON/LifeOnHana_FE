'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { fetchWhilickList } from '@/api';
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
  useEffect(() => {
    console.log('whilickItemTop', whilickItemTop);
  }, [whilickItemTop]);

  // ----------------------- api 통신 --------------------------------

  const [whilickData, setWhilickData] = useState<TWhilickData>();

  const articleIdData = localStorage.getItem('article_id');

  useEffect(() => {
    if (articleIdData) {
      // console.log('articleIdData: ', articleIdData);
    }
  }, [articleIdData]);

  // 무한스크롤
  const [wholeData, setWholeData] = useState<any[]>([]); // 불러온 모든 데이터 보관용
  const [id, setId] = useState<number>(0); // wholeData 안의 데이터의 id
  const [viewings, setViewings] = useState(wholeData.slice(0, 10)); // whilick 컴포넌트가 가지고 있을 데이터 (무조건 10개 유지)

  useEffect(() => {
    // console.log('whilickData: ', whilickData);
    console.log('wholeData: ', wholeData);
    console.log('viewings: ', viewings);
    // }, [whilickData, wholeData, viewings]);
    // }, [whilickData, wholeData, viewings]);
    // }, [whilickData]);
  }, [wholeData, viewings]);

  const updateViewings = useCallback(() => {
    if (
      whilickItemTop === viewings?.length - 2 &&
      !whilickData?.pageable?.last
    ) {
      fetchWhilickList(
        whilickData?.pageable?.pageNumber + 1 || 0,
        articleIdData,
        wholeData,
        (newData) => {
          setWholeData((prev) => [...prev, ...newData.contents]); // 기존 데이터와 병합
        },
        setWhilickData
      );
    }
  }, [wholeData, whilickData, articleIdData, whilickItemTop, viewings?.length]);

  useEffect(() => {
    fetchWhilickList(
      0,
      articleIdData,
      wholeData,
      (newData) => {
        setWholeData(newData.contents); // 전체 데이터 저장
        setId(wholeData.indexOf(viewings[whilickItemTop])); // 초기 id 설정
      },
      setWhilickData
    );
  }, [articleIdData, whilickItemTop, viewings]);

  useEffect(() => {
    // if (wholeData.length === 0) return; // 데이터가 없으면 실행하지 않음
    console.log('wholeData 안에서의 id >>>', id);

    const startIdx = Math.max(0, id - 5); // 시작 인덱스
    const endIdx = Math.min(wholeData.length, id + 5); // 끝 인덱스

    // slice 결과가 10개가 되도록 보장
    const newViewings = wholeData.slice(startIdx, endIdx);
    // console.log('newViewings: ', newViewings);

    setViewings(newViewings); // viewings 업데이트

    if (Array.isArray(wholeData) && whilickItemTop === viewings?.length - 2) {
      updateViewings();
      // console.log('재 fetch 됨!!!!!!!!!!!!!!!!!');
    }
  }, [whilickItemTop, id, viewings?.length]);

  // useEffect(() => {
  //   console.log('1>>>>>>>>>', viewings[whilickItemTop]);
  //   console.log('2>>>>>>>>>>', wholeData.indexOf(viewings[whilickItemTop]));
  //   // console.log('***************', wholeData.indexOf(viewings[whilickItemTop]));
  // }, [whilickItemTop, viewings, wholeData]);

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
            {/* {(viewings.length > 0 ? viewings : whilickData.contents)?.map( */}
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
