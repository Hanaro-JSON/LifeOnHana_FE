'use client';

import { useState, useEffect } from 'react';
import column from '@/public/assets/column_color.svg';
import Image from 'next/image';
import IsLike from '@/components/molecules/IsLike';
import CopyClipboardBtn from '@/components/atoms/CopyClipboardBtn';
import ColumnRecommendItem from '@/components/molecules/ColumnRecommendItem';
import ArticleAIRecommendDetailItem from '@/components/molecules/ArticleAIRecommendDetailItem';
import { type TArticleAIRecommendDetailItemProps } from '@/types/componentTypes';
import MoveToTopBtn from '@/components/atoms/MoveToTopBtn';
import MoveToBackBtn from '@/components/atoms/MoveToBackBtn';
import AdjustBtn from '@/components/atoms/AdjustBtn';
import OpenDescriptionItem from '@/components/atoms/OpenDescriptionItem';
import { formatDate } from '@/utils/formatDate';
import { LogoHeader } from '@/components/molecules/LogoHeader';
const mockData = {
  article_id: 1,
  title: '새해 소망 여행 울산시 울주군',
  category: '여행',
  thumbnail_s3_key:
    'https://www.hana1qm.com/dataFile/bbs/202513070213460420.jpg',
  content: [
    {
      type: 'TEXT',
      content:
        '아침해가 바다에서 고개를 쏙 드는 풍경만큼 1월과 잘 어울리는 그림은 없다. 새해, 새출발, 새희망 같은 단어와 잘 어울리는 일출의 모습. 희망찬 일출의 풍경을 감상하고 싶다면 울주로 향해보자. 일출의 풍경은 많은 곳에서 감상할 수 있지만 울주군 간절곶에서 바라보는 일출은 좀 특별하다.',
    },
    {
      type: 'WORD',
      content: '어려운용어',
      description:
        '어려운용어에 대한 설명입니다.어려운용어에 대한 설명입니다.어려운용어에 대한 설명입니다.어려운용어에 대한 설명입니다.',
    },
    {
      type: 'TEXT',
      content: '가 포함된 문장입니다.',
    },
    {
      type: 'IMAGE',
      content:
        'https://www.hana1qm.com/resources/web/images/articles/2501/travel01_img01.jpg',
      caption: '이미지 설명',
    },
    {
      type: 'TEXT',
      content: '두 번째 문단에는 ',
    },
    {
      type: 'WORD',
      content: '전문용어',
      description: '전문용어에 대한 설명입니다.',
    },
    {
      type: 'TEXT',
      content:
        '“간절욱조조반도(艮絶旭肇早半島)-간절곶에 해가 떠야 한반도에 새벽이 온다”. 울주 간절곶 표지석에는 이런 문장이 적혀있다. 1902년 군수 김우식이 <울산읍지>>에 이렇게 썼다. 간절곶은 우리나라 육지에서 가장 먼저 해가 떠오른다.',
    },
  ],
  published_at: '2025-01-01',
  is_liked: true,
  likeCount: 15,
  related_products: [
    {
      product_id: 101,
      name: '[서울 출발] 울산 2박 3일 여행 패키지',
      description: '3개일마다, 기본 바다...',
      link: 'path/to/product1',
    },
    {
      product_id: 102,
      name: '[서울 출발] 울산 당일치기 자유여행 상품',
      description: '기본 바다 어쩌구...',
      link: 'path/to/product2',
    },
  ],
};

export default function Detail() {
  const [article] = useState(mockData);

  const [selectedProduct, setSelectedProduct] =
    useState<TArticleAIRecommendDetailItemProps | null>(null);

  const [titleParts, setTitleParts] = useState<string[]>([]);
  useEffect(() => {
    const splitTitle = (title: string) => {
      const maxLength = 8;
      if (title.length > maxLength) {
        return [title.slice(0, maxLength), title.slice(maxLength)];
      }
      return [title];
    };
    setTitleParts(splitTitle(article.title));
  }, [article.title]);

  const handleProductClick = (product: TArticleAIRecommendDetailItemProps) => {
    if (selectedProduct?.product_id === product.product_id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);

  const handleFontSizeChange = (value: number) => {
    setFontSizeMultiplier(value);
  };
  const [openedAdjustBtn, setOpenedAdjustBtn] = useState<string | null>(null);

  const handleAdjustBtnToggle = (id: string) => {
    setOpenedAdjustBtn((prev) => (prev === id ? null : id));
  };
  return (
    <div className='h-screen bg-white'>
      <AdjustBtn
        id='font-size'
        isOpen={openedAdjustBtn === 'font-size'}
        onToggle={handleAdjustBtnToggle}
        typeCeilTxt='글씨'
        typeBottomTxt='크기'
        first='보통'
        second='크게'
        third='왕큼'
        mX={90}
        mY={75}
        onChange={(value) => {
          if (value === 1) handleFontSizeChange(1.0);
          if (value === 2) handleFontSizeChange(1.3);
          if (value === 3) handleFontSizeChange(1.5);
        }}
      />
      <MoveToTopBtn />
      <MoveToBackBtn />
      <div className='flex flex-col items-center'>
        <div className='w-[90%] flex items-center -mt-8'>
          <LogoHeader isMain={false} />
        </div>
        <div className='w-[90%] flex items-center gap-3 mt-2 mb-4'>
          <Image src={column} alt='column icon' width={20} height={20} />
          <div className='text-[1.5rem] font-Hana2bold'>칼럼</div>
        </div>
      </div>

      <div className='w-full flex flex-col'>
        <div className='w-full h-[80vh] overflow-y-auto'>
          {/* 상단 헤더 이미지 영역 */}
          <div className='relative w-full h-[150px]'>
            <Image
              src={article.thumbnail_s3_key}
              alt={article.category}
              layout='fill'
              objectFit='cover'
              className='opacity-70'
            />
            <div className='flex justify-center'>
              <div className='absolute w-[90%] h-full flex flex-col justify-center items-start'>
                <div className='font-SCDream8 text-[22.4px] text-hanapurple font-bold'>
                  {article.category}
                </div>
                <div
                  className='font-SCDream8 text-[25px] text-white font-bold'
                  style={{ textShadow: '0 0 1px black, 0 0 3px black' }}
                >
                  {titleParts[0]}
                  {titleParts[1] && <br />}
                  {titleParts[1]}
                </div>
              </div>
            </div>
          </div>

          {/* 좋아요, 공유 영역 */}
          <div className='flex justify-end items-center m-4'>
            <IsLike likeCount={article.likeCount} isLiked={article.is_liked} />
            <div className='mb-2'>
              <CopyClipboardBtn />
            </div>
          </div>

          {/* 본문, 관련 상품 영역 */}
          <div className=' w-[90%] flex flex-col mx-auto'>
            <div className='font-SCDream5 text-[15px] mb-2'>
              {formatDate(article.published_at)}
            </div>
            <div>
              {article.content.map((item, index) => {
                if (item.type === 'IMAGE') {
                  return (
                    <div key={index} className='my-4'>
                      <div className='flex justify-center items-center'>
                        <Image
                          src={item.content}
                          alt={item.caption ?? '이미지'}
                          width={340}
                          height={255}
                          className='w-full'
                        />
                      </div>
                    </div>
                  );
                } else if (item.type === 'TEXT') {
                  return (
                    <span
                      key={index}
                      className='font-SCDream3 leading-relaxed'
                      style={{
                        fontSize: `calc(1.3rem * ${fontSizeMultiplier})`,
                      }}
                    >
                      {item.content}
                    </span>
                  );
                } else if (item.type === 'WORD') {
                  return (
                    <span
                      key={index}
                      className='font-SCDream3 leading-relaxed underline decoration-1 decoration-hanapurple'
                      style={{
                        fontSize: `calc(1.3rem * ${fontSizeMultiplier})`,
                      }}
                    >
                      {item.content}{' '}
                      <OpenDescriptionItem description={item.description!} />
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className='w-[100%] mx-auto border-b-2 border-b-hanadeepgray my-6'></div>
            <div className='font-SCDream5 text-[15px] my-3'>관련있는 상품</div>
            <div className='flex gap-5'>
              <div className='w-[90%]'>
                <ColumnRecommendItem
                  variant='TRAVEL'
                  name={article.related_products[0].name}
                  isSelected={
                    selectedProduct?.product_id ===
                    article.related_products[0].product_id
                  }
                  onClick={() =>
                    handleProductClick(article.related_products[0])
                  }
                />
              </div>
              <div className='w-[90%]'>
                <ColumnRecommendItem
                  variant='TRAVEL'
                  name={article.related_products[1].name}
                  isSelected={
                    selectedProduct?.product_id ===
                    article.related_products[1].product_id
                  }
                  onClick={() =>
                    handleProductClick(article.related_products[1])
                  }
                />
              </div>
            </div>
            <div className='font-SCDream5 text-[15px] my-3 mt-9'>
              XXX님의 AI 맞춤 정보
            </div>
            <div className='mb-20'>
              {selectedProduct ? (
                <ArticleAIRecommendDetailItem
                  name={selectedProduct.name}
                  description={selectedProduct.description}
                  link={selectedProduct.link}
                  closeBtn={false}
                />
              ) : (
                <div className='bg-[#EBEBEB] w-[100%] text-[15px] font-SCDream3 text-center py-8 rounded-2xl'>
                  상품을 선택해주세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
