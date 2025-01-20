"use client";

import Image from "next/image";
import whilick_purple from "@/assets/whilick_purple.svg";
import WhilickItem from "@/components/molecules/WhilickItem";
import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import WhilickItemLoading from "@/components/molecules/WhilickItemLoading";
import { type TWhilickItemProps } from "@/types/componentTypes";

// api 연결
const fetchWhilickItems = async ({ pageParam = 0 }) => {
  const response = await fetch(`/whilick?offset=${pageParam}&limit=10`);
  return response.json();
};

export default function Whilick() {
  // 현재 보고 있는 컨텐츠의 인덱스를 추적
  const [currentIndex, setCurrentIndex] = useState(0);
  // 현재 보고 있는 오디오를 추적
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["whilickItems"],
    queryFn: fetchWhilickItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length * 10;
    },
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });

  // 컨텐츠를 넘길 때마다 인덱스를 업데이트하는 함수
  const handleContentChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  // 현재 인덱스를 모니터링하고 필요할 때 다음 페이지를 미리 로딩
  useEffect(() => {
    if (currentIndex % 10 >= 7 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [currentIndex, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <div className="snap-y snap-mandatory flex flex-col overflow-y-scroll max-h-[100vh] w-full">
          {status === "pending" ? (
            <WhilickItemLoading />
          ) : status === "error" ? (
            <p>Error: {"error.message"}</p>
          ) : (
            <>
              {data.pages.map((content, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {content.map((item: TWhilickItemProps, itemIndex: number) => (
                    <WhilickItem
                      key={item.articleId}
                      {...item}
                      currentAudio={currentAudio}
                      setCurrentAudio={setCurrentAudio}
                      onContentChange={() => handleContentChange(pageIndex * 10 + itemIndex)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
