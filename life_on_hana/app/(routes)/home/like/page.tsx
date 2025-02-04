'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { RecommendItem } from '@/components/molecules/RecommendItem';
import { NavHeader } from '@/components/molecules/NavHeader';
import {
  fetchLikedProducts,
  fetchLoanProductDetails,
  fetchAccountProductDetails,
  fetchLifeProductDetails,
} from '@/api';
import {
  type TRecommendItemProps,
  type TLikedLoanProductDetailItemProps,
  type TLikedAccountProductDetailItemProps,
  type TLikedLifeProductDetailItemProps,
} from '@/types/componentTypes';

import LikedLoanProductDetailItem from '@/components/molecules/LikedLoanProductDetailItem';
import LikedAccountProductDetailItem from '@/components/molecules/LikedAccountProductDetailItem';
import LikedLifeProductDetailItem from '@/components/molecules/LikedLifeProductDetail';
import { type THomeLikeProduct } from '@/types/dataTypes';

type TSelectedProductProps =
  | {
      type: 'LOAN';
      data: TLikedLoanProductDetailItemProps;
    }
  | {
      type: 'SAVINGS';
      data: TLikedAccountProductDetailItemProps;
    }
  | {
      type: 'LIFE';
      data: TLikedLifeProductDetailItemProps;
    }
  | null;

export default function Like() {
  const [products, setProducts] = useState<TRecommendItemProps[]>([]);
  const [selectedProduct, setSelectedProductProps] =
    useState<TSelectedProductProps>(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!hasNext || isFetching) return;

    setIsFetching(true);
    try {
      const result = await fetchLikedProducts(page);
      const newProducts = result.products.map((product: THomeLikeProduct) => ({
        productId: product.productId,
        name: product.name,
        description: product.description,
        minAmount: product.minAmount ?? undefined,
        maxAmount: product.maxAmount ?? undefined,
        basicInterest_rate: product.basicInterestRate ?? undefined,
        maxInterest_rate: product.maxInterestRate ?? undefined,
        productType:
          product.category === 'LOAN'
            ? ('LOAN' as const)
            : product.category === 'SAVINGS'
              ? ('SAVINGS' as const)
              : ('LIFE' as const),
        onClick: () => handleProductClick(product.productId, product.category),
      }));

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasNext(result.hasNext);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('좋아요한 상품 불러오기 오류:', error);
    } finally {
      setIsFetching(false);
    }
  }, [page, hasNext, isFetching]);

  useEffect(() => {
    fetchProducts();
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (!hasNext) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchProducts();
          }
        },
        { threshold: 1.0 }
      );

      if (node) observerRef.current.observe(node);
    },
    [fetchProducts, hasNext, isFetching]
  );

  const handleProductClick = async (productId: number, category: string) => {
    try {
      if (category === 'LOAN') {
        const data = await fetchLoanProductDetails(productId);
        setSelectedProductProps({ type: 'LOAN', data: data.data });
      } else if (category === 'SAVINGS') {
        const data = await fetchAccountProductDetails(productId);
        setSelectedProductProps({ type: 'SAVINGS', data: data.data });
      } else if (category === 'LIFE') {
        const data = await fetchLifeProductDetails(productId);
        setSelectedProductProps({ type: 'LIFE', data: data.data });
      }
    } catch (error) {
      console.error('상품 자세히 보기 오류:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='fixed top-0 left-0 pt-6 px-6 w-full bg-background z-50'>
        <NavHeader location='좋아요한 상품' beforePageUrl='.' />
      </div>

      <div
        className='flex-1 overflow-y-auto px-5 mb-32'
        style={{ marginTop: '5.5rem' }}
      >
        <div className='flex flex-col gap-4 pb-[10vh]'>
          {products.map((product, index) => (
            <div
              key={product.productId}
              ref={index === products.length - 1 ? lastElementRef : null}
            >
              <RecommendItem {...product} />
            </div>
          ))}
        </div>

        {isFetching && (
          <div className='text-center text-hanapurple py-5'>로딩 중</div>
        )}
      </div>

      {selectedProduct?.type === 'LOAN' && (
        <LikedLoanProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}
      {selectedProduct?.type === 'SAVINGS' && (
        <LikedAccountProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}
      {selectedProduct?.type === 'LIFE' && (
        <LikedLifeProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}

      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
        }
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
