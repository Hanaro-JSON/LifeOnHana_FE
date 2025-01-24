'use client';

import { useState, useEffect } from 'react';
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
import { THomeLikeProduct } from '@/types/dataTypes';

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetchLikedProducts(1);
        const newProducts = result.products.map(
          (product: THomeLikeProduct) => ({
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
            onClick: () =>
              handleProductClick(product.productId, product.category),
          })
        );
        setProducts(newProducts);
      } catch (error) {
        console.error('Error fetching liked products:', error);
      }
    };

    fetchProducts();
  }, []);

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
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='pt-6 px-6'>
        <NavHeader location='좋아요한 상품' beforePageUrl='.' />
      </div>
      <div className='flex-1 overflow-y-auto px-5 mb-32'>
        <div className='flex flex-col gap-4 pb-[10vh]'>
          {products.map((product) => (
            <RecommendItem key={product.productId} {...product} />
          ))}
        </div>
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
