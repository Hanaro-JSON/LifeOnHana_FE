"use client";

import Image from "next/image";
import SearchInput from "@/components/molecules/SearchInput";
import ArticleItem from "@/components/molecules/ArticleItem";
import column from "../../../public/assets/column_color.svg";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const mockArticles = [
  {
<<<<<<< HEAD
    article_id: 1,
    title: "제주도로 여행을 떠나볼까요???",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
<<<<<<< HEAD
  },
  {
    article_id: 2,
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
    is_liked: true,
  },
  {
    article_id: 3,
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
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
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
    is_liked: true,
  },
  {
    article_id: 7,
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
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
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
    is_liked: true,
  },
  {
    article_id: 11,
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
    is_liked: false,
  },
  {
    article_id: 12,
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
<<<<<<< HEAD
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
];

export default function Column() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
=======
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
=======
>>>>>>> 80c83aa ([feat] 🐳 NavHeader component 생성)
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true,
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    title: "새해 소망 여행 몰아서 훌주근",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    title: "'선순환' 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: true,
  },
  {
    title: "고령 운전자를 위한 보험의 첫 걸음: 왜?(Why)",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
<<<<<<< HEAD
=======
  },
  {
    title: "새해 소망 여행 몰아서 훌주근",
=======
    title: "제주도로 여행을 떠나볼까요???",
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
    is_liked: true,
  },
  {
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
    is_liked: false,
  },
  {
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
  {
    title: "제주도로 여행을 떠나볼까요???",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
    is_liked: true,
  },
  {
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
    is_liked: false,
  },
  {
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
  {
    title: "제주도로 여행을 떠나볼까요???",
    category: "여행",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    is_liked: false,
  },
  {
    title: "요즘 취미로는 러닝이 대세죠! 어떤 러닝화를 사야할까요?",
    category: "취미",
    published_at: "2024-12-08",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202505070905150744.jpg",
    is_liked: true,
  },
  {
    title: "투자를 해요",
    category: "투자",
    published_at: "2024-11-15",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202433061033560949.jpg",
    is_liked: false,
<<<<<<< HEAD
>>>>>>> 80c83aa ([feat] 🐳 NavHeader component 생성)
  },
  // Add more articles as needed...
=======
  },
  {
    title: "취미를 찾아볼까요?",
    category: "취미",
    published_at: "2025-01-12",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202421251121570801.jpg",
    is_liked: false,
  },
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
];

export default function Column() {
  const [searchValue] = useState("");
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = mockArticles;

    if (selectedCategory !== "전체보기") {
      filtered = mockArticles.filter((article) => article.category === selectedCategory);
    }

    if (searchValue) {
<<<<<<< HEAD
<<<<<<< HEAD
      filtered = filtered.filter((article) =>
        article.title.includes(searchValue)
=======
      filtered = filtered.filter(
        (article) => article.title.includes(searchValue) || article.category.includes(searchValue)
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
      filtered = filtered.filter((article) =>
        article.title.includes(searchValue)
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
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

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div>
      <div className="flex flex-col items-center pt-5">
        <div className="w-full flex items-center gap-3 mb-4 px-[1rem]">
          <Image src={column} alt="column icon" width={25} height={22} />
          <div className="text-[1.8rem] font-Hana2bold">칼럼</div>
<<<<<<< HEAD
=======
    <div className="bg-[#f1f0f2]">
=======
    <div>
>>>>>>> 80c83aa ([feat] 🐳 NavHeader component 생성)
      <div className="flex flex-col items-center pt-4">
        <div className="w-full flex items-center gap-4 mb-4 px-[2rem]">
          <Image src={column} alt="column icon" width={20} height={20} priority />
          <div className="text-[1.5rem] font-Hana2bold">칼럼</div>
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
        </div>
      </div>

      <div className="flex flex-col items-center">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
        <div className="w-full mb-4 px-[1rem]">
          <SearchInput
            placeholder="칼럼 검색"
            value={searchValue}
            onChange={setSearchValue}
          />
<<<<<<< HEAD
=======
        {/* 검색 영역 */}
        <div className="w-full mb-4 px-[2rem]">
          <SearchInput placeholder="칼럼 검색" value={searchValue} />
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
        {/* 검색 영역 */}
        <div className="w-full mb-4 px-[2rem]">
          <SearchInput placeholder="칼럼 검색" value={searchValue} />
>>>>>>> 80c83aa ([feat] 🐳 NavHeader component 생성)
=======
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
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
<<<<<<< HEAD
                  selectedCategory === category
                    ? "font-bold"
                    : "opacity-45"
                } mr-6 last:mr-0 text-[1.2rem] font-SCDream5 relative`}
<<<<<<< HEAD
=======
                  selectedCategory === category ? "font-bold text-black" : "opacity-45"
                } mr-6 last:mr-0 text-[1.125rem] font-SCDream5 relative`}
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
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
                  <div
                    key={index}
                    onClick={() => handleArticleClick(article.article_id)} // 클릭 시 라우팅
                    className="cursor-pointer w-full"
                  >
                  <ArticleItem
                    key={index}
                    title={article.title}
                    category={article.category}
                    published_at={article.published_at}
                    thumbnail_s3_key={article.thumbnail_s3_key}
                    is_liked={article.is_liked}
                  />
                  </div>
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
