"use client";

import Image from "next/image";
import SearchInput from "@/components/molecules/SearchInput";
import ArticleItem from "@/components/molecules/ArticleItem";
import column from "../../../public/assets/column_color.svg";
import { useState, useEffect, useRef } from "react";

const mockArticles = [
  {
    title: "새해 소망 여행 몰아서 훌주근",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "새해 소망 여행 몰아서 훌주근",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "새해 소망 여행 몰아서 훌주근",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "새해 소망 여행 몰아서 훌주근",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "새해 소망 여행 몰아서 훌주근",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false
  },
  // Add more articles as needed...
];

export default function Column() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = mockArticles;

    if (selectedCategory !== "전체보기") {
      filtered = mockArticles.filter(
        (article) => article.category === selectedCategory
      );
    }

    if (searchValue) {
      filtered = filtered.filter(
        (article) =>
          article.title.includes(searchValue) ||
          article.category.includes(searchValue)
      );
    }

    setFilteredArticles(filtered);
  }, [searchValue, selectedCategory]);

  // 밑줄
  useEffect(() => {
    const activeCategory = document.querySelector(`#${selectedCategory}`) as HTMLButtonElement;
    if (activeCategory && underlineRef.current) {
      underlineRef.current.style.left = `${activeCategory.offsetLeft}px`;
      underlineRef.current.style.width = `${activeCategory.offsetWidth}px`;
    }

    // 선택된 카테고리가 가운데로 오게 스크롤
    if (activeCategory) {
      activeCategory.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedCategory]);

  return (
    <div className="bg-[#f1f0f2]">
      <div className="flex flex-col items-center pt-4">
        <div className="w-full flex items-center gap-4 mb-4 px-[2rem]">
          <Image src={column} alt="column icon" width={20} height={20} />
          <div className="text-[1.5rem] font-Hana2bold">칼럼</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* 검색 영역 */}
        <div className="w-full mb-4 px-[2rem]">
          <SearchInput
            placeholder="칼럼 검색"
            value={searchValue}
          />  
        </div>

        <div className="w-full rounded-3xl flex flex-col">
          {/* 카테고리 선택 영역 */}
          <div className="w-full bg-white flex justify-between sticky py-4 px-6 whitespace-nowrap overflow-x-auto border-b-2 rounded-t-xl shadow-[0rem_.25rem_.25rem_0.09rem_rgba(0,0,0,0.05)]">
            {["전체보기", "부동산", "투자", "상속·증여", "여행", "문화", "취미"].map((category) => (
              <button
                key={category}
                id={category}
                className={`${
                  selectedCategory === category
                    ? "font-bold text-black"
                    : "opacity-45"
                } mr-6 last:mr-0 text-[1.125rem] font-SCDream5 relative`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}

            {/* 밑줄 */}
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-1 bg-black transition-all duration-300 ease-in-out"
              style={{
                position: 'absolute',
                left: 0,
                width: '0px',
              }}
            ></div>
          </div>

          <div className="bg-white p-4 w-full px-[2rem] h-[calc(100vh-13rem)] overflow-y-auto">
            {filteredArticles.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-4">
                {filteredArticles.map((article, index) => (
                  <ArticleItem
                    key={index}
                    title={article.title}
                    category={article.category}
                    published_at={article.published_at}
                    thumbnail_s3_key={article.thumbnail_s3_key}
                    is_liked={article.is_liked}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </div>

      {/* 카테고리 x축 스크롤바 숨기기 */}
      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
        }
      `}</style>
    </div>
  );
}