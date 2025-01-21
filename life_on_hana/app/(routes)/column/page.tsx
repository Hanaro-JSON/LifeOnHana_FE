"use client";

import Image from "next/image";
import SearchInput from "@/components/molecules/SearchInput";
import ArticleItem from "@/components/molecules/ArticleItem";
import column from "../../../public/assets/column_color.svg";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const mockArticles = [
  {
    article_id: 1,
    title: "제주도로 여행을 떠나볼까요???",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    article_id: 2,
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
    is_liked: true,
  },
  {
    article_id: 3,
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
    is_liked: false,
  },
  {
    article_id: 4,
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
  {
    article_id: 5,
    title: "제주도로 여행을 떠나볼까요???",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    article_id: 6,
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
    is_liked: true,
  },
  {
    article_id: 7,
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
    is_liked: false,
  },
  {
    article_id: 8,
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
  {
    article_id: 9,
    title: "제주도로 여행을 떠나볼까요???",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    article_id: 10,
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
    is_liked: true,
  },
  {
    article_id: 11,
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
    is_liked: false,
  },
  {
    article_id: 12,
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
];

export default function Column() {
  const router = useRouter();
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
      filtered = filtered.filter((article) =>
        article.title.includes(searchValue)
      );
    }

    setFilteredArticles(filtered);
  }, [searchValue, selectedCategory]);

  useEffect(() => {
    const activeCategory = document.querySelector(
      `#${selectedCategory}`
    ) as HTMLButtonElement;
    if (activeCategory && underlineRef.current) {
      underlineRef.current.style.left = `${activeCategory.offsetLeft}px`;
      underlineRef.current.style.width = `${activeCategory.offsetWidth}px`;
    }

    if (activeCategory) {
      activeCategory.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedCategory]);

  const handleArticleClick = (id: number) => {
    // 동적 라우팅으로 상세 페이지로 이동
    router.push(`/column/${id}`);
  };

  const listVariants = {
    hidden: { opacity: 0, y: 20 }, // 처음에는 아래에서 투명하게
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05, // 각 항목에 0.1초 간격으로 애니메이션 적용
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div>
      <div className="flex flex-col items-center pt-5">
        <div className="w-full flex items-center gap-3 mb-4 px-[1rem]">
          <Image src={column} alt="column icon" width={25} height={22} />
          <div className="text-[1.8rem] font-Hana2bold">칼럼</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full mb-4 px-[1rem]">
          <SearchInput
            placeholder="칼럼 검색"
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>

        <div className="w-[95%] rounded-3xl flex flex-col">
          <div className="w-full bg-white flex justify-between sticky py-4 px-6 whitespace-nowrap overflow-x-auto border-b-2 rounded-t-xl shadow-[0rem_.25rem_.25rem_0.09rem_rgba(0,0,0,0.05)]">
            {[
              "전체보기",
              "부동산",
              "투자",
              "상속·증여",
              "여행",
              "문화",
              "취미",
            ].map((category) => (
              <button
                key={category}
                id={category}
                className={`${
                  selectedCategory === category ? "font-bold" : "opacity-45"
                } mr-6 last:mr-0 text-[1.2rem] font-SCDream5 relative`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}

            <div
              ref={underlineRef}
              className="absolute bottom-0 h-1 bg-black transition-all duration-300 ease-in-out"
              style={{
                position: "absolute",
                left: 0,
                width: "0px",
              }}
            ></div>
          </div>

          <div className="bg-white p-4 w-full px-[2rem] h-[calc(100vh-18rem)] overflow-y-auto">
            {filteredArticles.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-4">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleArticleClick(article.article_id)} // 클릭 시 라우팅
                    className="cursor-pointer w-full"
                    custom={index} // 각 항목에 대해 index 전달
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                  >
                    <ArticleItem
                      title={article.title}
                      category={article.category}
                      published_at={article.published_at}
                      thumbnail_s3_key={article.thumbnail_s3_key}
                      is_liked={article.is_liked}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                검색 결과가 없습니다.
              </div>
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
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
      `}</style>
    </div>
  );
}