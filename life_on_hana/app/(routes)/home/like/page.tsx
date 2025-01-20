"use client";

import { useState, useEffect } from "react";
import { RecommendItem } from "@/components/molecules/RecommendItem";
import {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ac0c0c ([style] 🐣 type 추가)
  type TRecommendItemProps,
  type TLikedLoanProductDetailItemProps,
  type TLikedAccountProductDetailItemProps,
  type TLikedLifeProductDetailItemProps,
<<<<<<< HEAD
=======
  TRecommendItemProps,
  TLikedLoanProductDetailItemProps,
  TLikedAccountProductDetailItemProps,
  TLikedLifeProductDetailItemProps,
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
=======
>>>>>>> 2ac0c0c ([style] 🐣 type 추가)
} from "@/types/componentTypes";

import LikedLoanProductDetailItem from "@/components/molecules/LikedLoanProductDetailItem";
import LikedAccountProductDetailItem from "@/components/molecules/LikedAccountProductDetailItem";
import LikedLifeProductDetailItem from "@/components/molecules/LikedLifeProductDetail";
<<<<<<< HEAD
<<<<<<< HEAD
import { NavHeader } from "@/components/molecules/NavHeader";
=======
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
=======
import { NavHeader } from "@/components/molecules/NavHeader";
>>>>>>> eaa3cc1 ([fix] 🐣 homeLike 페이지의 글자 크기 및 컴포넌트 크기 조절)

const mockData = {
  code: 200,
  status: "OK",
  message: "좋아요한 상품 목록 조회 성공",
  data: [
    {
      productId: "101",
      name: "하나햇살론뱅크",
      description: "정책 서민 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
    {
      productId: "102",
      name: "하나햇살론뱅크 플러스",
      description: "정책 서민 추가 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
    {
      productId: "3",
      name: "보험 상품",
      description: "삶을 지켜주는 든든한 보험 상품입니다.",
      category: "보험",
    },
    {
      productId: "2",
      name: "적금 상품",
      description: "높은 금리의 적금 상품입니다.",
      maxInterest_rate: 3.5,
      category: "저축",
    },
    {
      productId: "1",
      name: "대출 상품",
      description: "최대 한도와 조건이 좋은 대출 상품입니다.",
      maxAmount: "100000000",
      category: "대출",
    },
    {
<<<<<<< HEAD
      productId: "166",
=======
      productId: "101",
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
      name: "하나햇살론뱅크",
      description: "정책 서민 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
    {
<<<<<<< HEAD
      productId: "155",
=======
      productId: "101",
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
      name: "하나햇살론뱅크",
      description: "정책 서민 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
    {
<<<<<<< HEAD
      productId: "144",
=======
      productId: "101",
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
      name: "하나햇살론뱅크",
      description: "정책 서민 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
    {
<<<<<<< HEAD
      productId: "133",
=======
      productId: "101",
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
      name: "하나햇살론뱅크",
      description: "정책 서민 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
    {
<<<<<<< HEAD
      productId: "122",
=======
      productId: "101",
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
      name: "하나햇살론뱅크",
      description: "정책 서민 지원 상품",
      category: "대출",
      minAmount: "10000",
      maxAmount: "100000",
      basicInterest_rate: null,
      maxInterest_rate: null,
      minPeriod: null,
      maxPeriod: null,
      minCreditScore: null,
    },
  ],
  page: 1,
  size: 20,
  totalPages: 5,
  totalElements: 100,
};

type TSelectedProductProps =
  | {
      type: "LOAN";
      data: TLikedLoanProductDetailItemProps;
    }
  | {
      type: "SAVINGS";
      data: TLikedAccountProductDetailItemProps;
    }
  | {
      type: "LIFE";
      data: TLikedLifeProductDetailItemProps;
    }
  | null;

export default function Like() {
  const [products, setProducts] = useState<TRecommendItemProps[]>([]);
  const [selectedProduct, seTSelectedProductProps] = useState<TSelectedProductProps>(null);

  useEffect(() => {
    const newProducts = mockData.data.map((product) => ({
      productId: product.productId,
      name: product.name,
      description: product.description,
      minAmount: product.minAmount ?? undefined,
      maxAmount: product.maxAmount ?? undefined,
      basicInterest_rate: product.basicInterest_rate ?? undefined,
      maxInterest_rate: product.maxInterest_rate ?? undefined,
      productType:
        product.category === "대출"
          ? ("LOAN" as const)
          : product.category === "저축"
          ? ("SAVINGS" as const)
          : ("LIFE" as const),
      minAmountFormatted:
        product.category === "대출"
          ? formatAmount(product.minAmount || "")
          : product.minAmount,
      maxAmountFormatted:
        product.category === "대출"
          ? formatAmount(product.maxAmount || "")
          : product.maxAmount,
      onClick: () => handleProductClick(product.productId, product.category),
    }));

    setProducts(newProducts);
  }, []);

  const formatAmount = (amount: string) => {
    const numericAmount = parseInt(amount, 10);
    return isNaN(numericAmount)
      ? amount
      : `${numericAmount.toLocaleString()} 원`;
  };

  const handleProductClick = (productId: string, category: string) => {
    if (category === "대출") {
      const data = fetchLoanProductDetails(productId);
      seTSelectedProductProps({ type: "LOAN", data });
    } else if (category === "저축") {
      const data = fetchAccountProductDetails(productId);
      seTSelectedProductProps({ type: "SAVINGS", data });
    } else {
      const data = fetchLifeProductDetails(productId);
      seTSelectedProductProps({ type: "LIFE", data });
    }
  };

  const fetchLoanProductDetails = (
    productId: string
  ): TLikedLoanProductDetailItemProps => {
    return {
      productId,
      name: "직장인 신용대출",
      description: "직장인을 위한 맞춤 신용대출",
      feature: "최저금리 보장",
      target: "재직 6개월 이상 직장인",
      link: "https://example.com/product/2",
      loanInfo: {
        minAmount: 1000000,
        maxAmount: 100000000,
        basicInterestRate: 4.5,
        maxInterestRate: 8.5,
        minPeriod: 12,
        maxPeriod: 60,
        minCreditScore: 680,
      },
    };
  };

  const fetchAccountProductDetails = (
    productId: string
  ): TLikedAccountProductDetailItemProps => {
    return {
      productId,
      name: "하나 월복리 적금",
      description: "매월 자동이체로 편리하게 목돈 마련",
      link: "https://example.com/product/1",
      savingsInfo: {
        basicInterestRate: 3.5,
        maxInterestRate: 4.5,
      },
    };
  };

  const fetchLifeProductDetails = (
    productId: string
  ): TLikedLifeProductDetailItemProps => {
    return {
      productId,
      name: "여행자 보험",
      description: "해외여행시 필요한 보험",
      link: "https://example.com/product/3",
    };
  };

  return (
    <div className="flex flex-col h-screen">
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="pt-6 px-6">
        <NavHeader location={"관심있을 만한 상품"} beforePageUrl={"."} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 mb-32" >
        <div className="flex flex-col gap-4 pb-[10vh]">
=======
      <div className="font-Hana2heavy text-[1.25rem] my-6 text-center sticky top-0 z-10">
        관심있을 만한 상품 (컴포넌트로 분리한거 가져오기)
      </div>
      <div className="flex-1 overflow-y-auto px-5 mb-32" >
        <div className="flex flex-col gap-28 pb-[10vh]">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
=======
      <div className="sticky top-0 z-10">
        <div className="pt-6 px-6">
        <NavHeader location={"관심있을 만한 상품"} beforePageUrl={"."} />
      </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 mb-32" >
        <div className="flex flex-col gap-4 pb-[10vh]">
>>>>>>> eaa3cc1 ([fix] 🐣 homeLike 페이지의 글자 크기 및 컴포넌트 크기 조절)
          {products.map((product) => (
            <RecommendItem key={product.productId} {...product} />
          ))}
        </div>
      </div>

      {/* 상세 정보 모달 */}
      {selectedProduct?.type === "LOAN" && (
        <LikedLoanProductDetailItem
          {...selectedProduct.data}
          closeBtn={true}
          onClose={() => seTSelectedProductProps(null)}
        />
      )}
      {selectedProduct?.type === "SAVINGS" && (
        <LikedAccountProductDetailItem
          {...selectedProduct.data}
          closeBtn={true}
          onClose={() => seTSelectedProductProps(null)}
        />
      )}
      {selectedProduct?.type === "LIFE" && (
        <LikedLifeProductDetailItem
          {...selectedProduct.data}
          closeBtn={true}
          onClose={() => seTSelectedProductProps(null)}
        />
      )}

    </div>
    
  );
}
