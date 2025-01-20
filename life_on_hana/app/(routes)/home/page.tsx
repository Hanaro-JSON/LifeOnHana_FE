"use client";

import Btn from "@/components/atoms/Btn";
import { LogoHeader } from "@/components/molecules/LogoHeader";
import MainSection from "@/components/molecules/MainSection";
<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import Section from "@/components/atoms/Section";
import { BarGraph } from "@/components/molecules/BarGraph";
import {
  type TRecommendCarouselItemProps,
  type TArticleItemProps,
  type TGraphExpenseCategoriesProps,
  type TRecommendCarouselColumnProps,
} from "@/types/componentTypes";
import { RecommendCarouselColumn } from "@/components/molecules/RecommendCarouselColumn";
import { FullImgCarousel } from "@/components/molecules/FullImgCarousel";
import { RecommendCarouselItem } from "@/components/molecules/RecommendCarouselItem";
import ShortCutBtn from "@/components/molecules/ShortCutBtn";
import { DataContext } from "@/hooks/useData";
=======
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import arrowRight from "@/assets/arrow-right.svg";
import Link from "next/link";
import Section from "@/components/atoms/Section";
import { BarGraph } from "@/components/molecules/BarGraph";
import {
  TRecommendCarouselItemProps,
  type TArticleItemProps,
  type TGraphExpenseCategoriesProps,
  type TRecommendCarouselColumnProps,
} from "@/types/componentTypes";
import { RecommendCarouselColumn } from "@/components/molecules/RecommendCarouselColumn";
import { Carousel } from "nuka-carousel";
import { FullImgCarousel } from "@/components/molecules/FullImgCarousel";
import { RecommendCarouselItem } from "@/components/molecules/RecommendCarouselItem";
import ShortCutBtn from "@/components/molecules/ShortCutBtn";
<<<<<<< HEAD

>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
import { getNameFromServer } from "@/hooks/useData";
import { DataContext } from "@/hooks/useData";
>>>>>>> 182e05b ([feat] 🐳 name 전역상태관리 추가)
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
<<<<<<< HEAD

const carouselItems: TRecommendCarouselItemProps[] = [
  {
    productId: "1",
    name: "상품 1",
    description: "설명 1",
    maxAmount: "1000만원",
    productType: "LOAN",
  },
  {
    productId: "2",
    name: "상품 2",
    description: "설명 2",
    maxInterest_rate: 3.5,
    productType: "SAVINGS",
  },
  {
    productId: "2",
    name: "상품 2",
    description: "설명 2",
    maxInterest_rate: 3.5,
    productType: "LIFE",
  },
  {
    productId: "2",
    name: "상품 2",
    description: "설명 2",
    maxInterest_rate: 3.5,
    productType: "SAVINGS",
  },
];

export default function Home() {
  const { data, setName } = useContext(DataContext);
  useEffect(() => {
    console.log("이름 세팅");
    setName("장다연");
  });
=======

const carouselItems: TRecommendCarouselItemProps[] = [
  {
    productId: "1",
    name: "상품 1",
    description: "설명 1",
    maxAmount: "1000만원",
    productType: "LOAN",
  },
  {
    productId: "2",
    name: "상품 2",
    description: "설명 2",
    maxInterest_rate: 3.5,
    productType: "SAVINGS",
  },
  {
    productId: "2",
    name: "상품 2",
    description: "설명 2",
    maxInterest_rate: 3.5,
    productType: "LIFE",
  },
  {
    productId: "2",
    name: "상품 2",
    description: "설명 2",
    maxInterest_rate: 3.5,
    productType: "SAVINGS",
  },
];

export default function Home() {
<<<<<<< HEAD
  const [name, setName] = useState("장다연");
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
  const { data, setName } = useContext(DataContext);
  useEffect(() => {
    setName("장다연");
  }, []);
>>>>>>> 182e05b ([feat] 🐳 name 전역상태관리 추가)
  const [walletAmount, setWalletAmount] = useState(100);
  const [category, setCategory] = useState("INVESTMENT");
  //내역 통계 조회
  const [totalExpense, setTotalExpense] = useState(1500000);
  const [totalInterest, setTotalInterest] = useState(50000);
  const [expenseCategories, setExpenseCategories] = useState(
    mockExpenseCategories
  );
<<<<<<< HEAD
  //칼럼 목록 조회
=======
  //컬럼 목록 조회
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======

>>>>>>> 6ab8194 ([feat] 🐳 home api 연결 전 작업 완료)
  return (
    <div className="p-6 space-y-4">
      {/* 헤더 */}
      <LogoHeader isMain={true} />
      {/* 하나월급 카드 */}
<<<<<<< HEAD
<<<<<<< HEAD
      <MainSection name={data.name} walletAmount={walletAmount} />
=======
      <MainSection name={name} walletAmount={walletAmount} />
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
      <MainSection name={data.name} walletAmount={walletAmount} />
>>>>>>> 182e05b ([feat] 🐳 name 전역상태관리 추가)
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
<<<<<<< HEAD
<<<<<<< HEAD
            <ShortCutBtn url={"/"} variant="spend" />
          </div>
        </div>
      </Section>
      {/* 좋아요한 칼럼 카드 */}
      <div className="flex flex-row justify-between items-end">
        <div className="font-SCDream4 tracking-wide">
          <div>{data.name}님은</div>
          {categoryToNickname(category)}
        </div>
        <div>
          <ShortCutBtn url={"/"} variant="column" />
        </div>
      </div>
      {/* <RecommendCarouselColumn items={RecommendCarouselColumnItems} /> */}
      <FullImgCarousel items={RecommendCarouselColumnItems} />
      {/* 추천 상품 카드 */}
      <div className="flex flex-row justify-between items-end">
        <div className="font-SCDream4 tracking-wide">
          {data.name}님을 위한 추천 상품
        </div>
        <div>
          <ShortCutBtn url={"/"} variant="product" />
        </div>
      </div>
      <RecommendCarouselItem items={carouselItems} />;
=======
            <Link href={"/wallet"}>
              <button className="font-SCDream2 text-[.75rem] flex items-center ">
                <span className="text-hanapurple">입출금 내역</span>
                &nbsp;보러가기
                <Image src={arrowRight} alt="Right Arrow" className="ml-2" />
              </button>
            </Link>
=======
            <ShortCutBtn url={"/"} variant="spend" />
>>>>>>> 49f460c ([fix] 🐳 ShortCutBtn 사용하도록 수정)
          </div>
        </div>
      </Section>
      {/* 좋아요한 컬럼 카드 */}
      <div className="flex flex-row justify-between items-end">
        <div className="font-SCDream4 tracking-wide">
          <div>{data.name}님은</div>
          {categoryToNickname(category)}
        </div>
        <div>
          <ShortCutBtn url={"/"} variant="column" />
        </div>
      </div>
<<<<<<< HEAD
      <RecommendCarouselColumn items={RecommendCarouselColumnItems} />
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
      {/* <RecommendCarouselColumn items={RecommendCarouselColumnItems} /> */}
      <FullImgCarousel items={RecommendCarouselColumnItems} />
      {/* 추천 상품 카드 */}
      <div className="flex flex-row justify-between items-end">
        <div className="font-SCDream4 tracking-wide">
          {data.name}님을 위한 추천 상품
        </div>
        <div>
          <ShortCutBtn url={"/"} variant="product" />
        </div>
      </div>
      <RecommendCarouselItem items={carouselItems} />;
>>>>>>> 6ab8194 ([feat] 🐳 home api 연결 전 작업 완료)
    </div>
  );
}
