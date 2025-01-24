'use client';

import Image from 'next/image';
import whilick_purple from '@/assets/whilick_purple.svg';
import WhilickItem from '@/components/molecules/WhilickItem';
import { useCallback, useEffect, useRef, useState } from 'react';
// import {} from // type TWhilickItemProps,
// type TMockWhilickProps,
// ('@/types/componentTypes');
import WhilickItemLoading from '@/components/molecules/WhilickItemLoading';
import useDebounce from '@/hooks/useDebounce';
import { getApiToken, NEXT_PUBLIC_URL } from '@/api';
// import { fetchWhilicks } from '@/api';

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

  // ----------------------- api 통산 --------------------------------
  const [whilickList, setWhilickList] = useState([]);
  const token = getApiToken();

  // useEffect(() => {
  //   const fetchWhilickList = async () => {
  //     try {
  //       const response = await fetch(`${NEXT_PUBLIC_URL}/api/articles/shorts`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setWhilickList(data);
  //     } catch (error) {
  //       console.error('Failed to fetch whilick list:', error);
  //     }
  //   };

  //   fetchWhilickList();
  // }, [token]);

  // const mockWhilick: TMockWhilickProps[] = [
  //   {
  //     title: '알아 두면 쓸데 많은 1900년대 비엔나 미술 속으로',
  //     articleId: 1,
  //     text: [
  //       {
  //         paragraphId: 1,
  //         content: '아트 애호가들의 심장을 뛰게 만드는 전시가 찾아왔다.',
  //         startTime: 1.4,
  //         endTime: 6.2,
  //       },
  //       {
  //         paragraphId: 2,
  //         content:
  //           '용산 국립중앙박물관에서 열리는 오스트리아 레오폴트 미술관컬렉션이 바로 그것.',
  //         startTime: 6.2,
  //         endTime: 12.5,
  //       },
  //       {
  //         paragraphId: 3,
  //         content:
  //           '우리가 몰랐던 1900년대 비엔나에 불어온 미술 사조의 변화를 엿볼 수 있는 좋은 기회다.',
  //         startTime: 12.5,
  //         endTime: 17,
  //       },
  //       {
  //         paragraphId: 4,
  //         content:
  //           '지금 가장 핫한 곳은 어느 곳이고, 예약 없이 갈 수 있는 레스토랑은 과연 어디일까?',
  //         startTime: 17,
  //         endTime: 22,
  //       },
  //       {
  //         paragraphId: 5,
  //         content: '마지막에서 세번째 문장',
  //         startTime: 22,
  //         endTime: 28,
  //       },
  //       {
  //         paragraphId: 6,
  //         content: '마지막에서 두번째 문장',
  //         startTime: 28,
  //         endTime: 35,
  //       },
  //       {
  //         paragraphId: 7,
  //         content: '마지막 문장',
  //         startTime: 35,
  //         endTime: 40,
  //       },
  //     ],
  //     likeCount: 5,
  //     isLiked: false,
  //     ttsUrl: '/assets/audio/audio1.mp3',
  //   },
  //   {
  //     title: '새해 소망 여행 울산시 울주군',
  //     articleId: 2,
  //     text: [
  //       {
  //         paragraphId: 1,
  //         content: '누구나 마음속에 새해 이루고 싶은 소망이 있을 것이다.',
  //         startTime: 2.0,
  //         endTime: 6.2,
  //       },
  //       {
  //         paragraphId: 2,
  //         content:
  //           '2025년 새해 가장 먼저 해가 떠오르는 간절곶에서, 예부터 소망이 이뤄진다고 여겨진 영험한 곳 파래소폭포에서 마음 깊은 곳에 간직한 소망을 펼쳐 보여도 좋겠다.',
  //         startTime: 6.2,
  //         endTime: 12.5,
  //       },
  //     ],
  //     likeCount: 15,
  //     isLiked: false,
  //     ttsUrl: '/assets/audio/audio2.mp3',
  //   },
  //   {
  //     title: '‘흑백요리사’ 속 셰프의 레스토랑 가이드',
  //     articleId: 35,
  //     text: [
  //       {
  //         paragraphId: 1,
  //         content:
  //           '넷플릭스 요리 경연 프로그램 ‘흑백요리사’ 열풍이 불면서 출연한 셰프들의 레스토랑들도 덩달아 인기를 얻고 있다.',
  //         startTime: 2.0,
  //         endTime: 6.2,
  //       },
  //       {
  //         paragraphId: 2,
  //         content:
  //           '지금 가장 핫한 곳은 어느 곳이고, 예약 없이 갈 수 있는 레스토랑은 과연 어디일까?',
  //         startTime: 6.2,
  //         endTime: 12.5,
  //       },
  //     ],
  //     likeCount: 10,
  //     isLiked: true,
  //     ttsUrl: '/assets/audio/audio3.mp3',
  //   },
  // ];

  useEffect(() => {
    const fetchWhilickList = async () => {
      try {
        let currentToken = token;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/articles/shorts`,
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
            `${NEXT_PUBLIC_URL}/api/articles/shorts`,
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
          setWhilickList(data);
        } else if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        } else {
          const data = await response.json();
          setWhilickList(data);
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
    console.log('whilickList>>>', whilickList);
  }, [whilickList]);

  return (
    <>
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
          {whilickList?.map(
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
          <WhilickItemLoading />
        </div>
      </div>
    </>
  );
}
