"use client";

import Btn from "@/components/atoms/Btn";
import { LogoHeader } from "@/components/molecules/LogoHeader";
import MainSection from "@/components/molecules/MainSection";
import Image from "next/image";
import { useEffect, useState } from "react";
import arrowRight from "@/assets/arrow-right.svg";
import Link from "next/link";
import Section from "@/components/atoms/Section";
import { BarGraph } from "@/components/molecules/BarGraph";
import {
  TArticleItemProps,
  TGraphExpenseCategoriesProps,
  TRecommendCarouselColumnProps,
} from "@/types/componentTypes";
import { RecommendCarouselColumn } from "@/components/molecules/RecommendCarouselColumn";

const mockExpenseCategories: TGraphExpenseCategoriesProps[] = [
  { category: "FOOD", amount: 500000, percentage: 10 },
  { category: "SNACK", amount: 200000, percentage: 10 },
  { category: "EDUCATION", amount: 300000, percentage: 20 },
  { category: "HOBBY", amount: 150000, percentage: 10 },
  { category: "HEALTH", amount: 250000, percentage: 50 },
];
const mockArticles: TArticleItemProps[] = [
  {
    article_id: 1,
    title: "새해 소망 여행 울산시 울주군",
    category: "여행",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    published_at: "2025-01-01",
    is_liked: true,
  },
  {
    article_id: 2,
    title: "선착순 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
    category: "취미",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202432011132520529.jpg",
    published_at: "2024-12-01",
    is_liked: false,
  },
];

export default function Home() {
  const [name, setName] = useState("장다연");
  const [walletAmount, setWalletAmount] = useState(100);
  const [category, setCategory] = useState("INVESTMENT");
  //내역 통계 조회
  const [totalExpense, setTotalExpense] = useState(1500000);
  const [totalInterest, setTotalInterest] = useState(50000);
  const [expenseCategories, setExpenseCategories] = useState(
    mockExpenseCategories
  );
  //컬럼 목록 조회
  const [articles, setArticles] = useState(mockArticles);
  const [RecommendCarouselColumnItems, setRecommendCarouselColumnItems] =
    useState<TRecommendCarouselColumnProps[]>([]);
  useEffect(() => {
    const transfromedItems: TRecommendCarouselColumnProps[] = articles.map(
      (article) => ({
        article_id: article.article_id || -1,
        title: article.title || "untitled",
        thumbnail_s3_key: article.thumbnail_s3_key || "default",
      })
    );
    setRecommendCarouselColumnItems(transfromedItems);
  }, [articles]);

  function categoryToNickname(category: string) {
    switch (category) {
      case "REAL_ESTATE":
        return (
          <div>
            <span className="text-hanapurple">부동산</span>에 관심이 많은
            <span className="text-hanapurple"> 마음부자 🏢</span>
          </div>
        );
      case "INVESTMENT":
        return (
          <div>
            <span className="text-hanapurple">투자</span>에 관심이 많은
            <span className="text-hanapurple"> 멋진</span> 중년 🎩
          </div>
        );
      case "INHERITANCE_GIFT":
        return (
          <div>
            <span className="text-hanapurple">상속</span>에 관심이 많은
            <span className="text-hanapurple"> 간지나는</span> 중년 🎩
          </div>
        );
      case "TRAVEL":
        return (
          <div>
            <span className="text-hanapurple">여행</span>을 좋아하는
            <span className="text-hanapurple"> 건강미</span> 중년 💪
          </div>
        );
      case "CULTURE":
        return (
          <div>
            <span className="text-hanapurple">문화</span>에 관심이 많은
            <span className="text-hanapurple"> 감성적인</span> 중년 🎨
          </div>
        );
      case "HOBBY":
        return (
          <div>
            <span className="text-hanapurple">취미</span>에 관심이 많은
            <span className="text-hanapurple"> 열정 가득한</span> 중년 ⛳
          </div>
        );
    }
  }
  return (
    <div className="p-6 space-y-4">
      {/* 헤더 */}
      <LogoHeader isMain={true} />
      {/* 하나월급 카드 */}
      <MainSection name={name} walletAmount={walletAmount} />
      {/* 목돈 버튼 */}
      <Btn text={"급하게 목돈이 필요하세요?"} variant="needLumpSum" />
      {/* 이번 달 지출 카드 */}
      <Section height="15rem">
        <div className="w-full max-w-full space-y-3">
          <div className="font-SCDream2">
            이번 달 지출은 &nbsp;
            <span className="font-SCDream5 underline-offset-1 underline text-xl text-hanapurple">
              {totalExpense / 10000}만원
            </span>
            &nbsp;입니다.
          </div>
          <BarGraph type="mydata" expenseCategories={expenseCategories} />
          <div className="font-SCDream2 text-xs">
            이번 달 받은 이자는 총 &nbsp;
            <span className="font-SCDream4 underline-offset-1 underline text-sm text-hanapurple">
              {totalInterest}만원
            </span>
            &nbsp;입니다.
          </div>
          <div className="border-t-2 flex justify-center items-center h-[2rem]">
            <Link href={"/wallet"}>
              <button className="font-SCDream2 text-[.75rem] flex items-center ">
                <span className="text-hanapurple">입출금 내역</span>
                &nbsp;보러가기
                <Image src={arrowRight} alt="Right Arrow" className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </Section>
      {/* 좋아요한 컬럼 카드드 */}
      <div className="flex flex-row justify-between items-end">
        <div className="font-SCDream4 tracking-wide">
          <div>{name}님은</div>
          {categoryToNickname(category)}
        </div>
        <div>
          <Link href={"/wallet"}>
            <button className="font-SCDream2 text-[.75rem] flex items-center ">
              <span className="text-hanapurple">좋아요</span>한 칼럼 보러가기
              <Image src={arrowRight} alt="Right Arrow" className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
      <RecommendCarouselColumn items={RecommendCarouselColumnItems} />
    </div>
  );
}
