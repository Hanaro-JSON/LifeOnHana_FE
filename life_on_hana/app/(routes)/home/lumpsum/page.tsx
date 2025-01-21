'use client';

import Btn from '@/components/atoms/Btn';
import Section from '@/components/atoms/Section';
import LumpSumBtn from '@/components/molecules/LumpSumBtn';
import { NavHeader } from '@/components/molecules/NavHeader';
import { DataContext } from '@/hooks/useData';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { type TRecommendItemProps } from '@/types/componentTypes';
import { RecommendItem } from '@/components/molecules/RecommendItem';

const mockLoanItems: TRecommendItemProps[] = [
  {
    productId: '1',
    name: '상품 1',
    description: '설명 1',
    maxAmount: '1000만원',
    productType: 'LOAN',
  },
  {
    productId: '2',
    name: '상품 2',
    description: '설명 2',
    maxAmount: '20만원',
    productType: 'LOAN',
  },
];

export default function Lumpsum() {
  const router = useRouter();
  const { data } = useContext(DataContext);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [selectedBtn, setSelectedBtn] = useState<string | null>(null);
  const reasons = [
    '자녀 지원(결혼비용, 학비, 자취/독립 지원 등)',
    '의료비 지원(본인 및 가족의 의료비 등)',
    '주거 및 생활비(주거 관련, 생활비 부족 등)',
    '사업 및 투자 자금(사업 투자, 창업 자금 등)',
    '차량 및 교통',
    '여가(여행, 취미, 교육 등)',
    '채무 상환',
    '기타',
  ];
  ///api/anthropic/loans
  const [loanItems, setLoanItems] = useState<TRecommendItemProps[]>();

  const handleBtnClick = (variant: string) => {
    setSelectedBtn(variant);
  };

  const formatNumber = (value: string) => {
    if (!value || isNaN(Number(value.replaceAll(',', '')))) return '';
    return Number(value.replaceAll(',', '')).toLocaleString('en-US');
  };

  const handleChange = (e: { target: { value: string } }) => {
    const rawValue = e.target.value.replace(/[,.원]/g, '');
    setAmount(formatNumber(rawValue));
  };

  const handleSubmit = () => {
    if (!amount) {
      alert('금액을 입력해주세요.');
      return;
    }
    if (!selectedBtn) {
      alert('출금 계좌를 선택해주세요.');
      return;
    }
    if (!reason) {
      alert('사용 목적을 선택해주세요.');
      return;
    }
    if (reason === '기타' && customReason === '') {
      alert('사용 목적을 입력해주세요.');
      return;
    }
    switch (selectedBtn) {
      case 'loanProducts':
        setLoanItems(mockLoanItems);
        break;
      default:
        router.replace('/home/wallet/deposit');
    }
  };

  return (
    <div className='p-6 space-y-4'>
      <NavHeader location={'목돈 가져오기'} beforePageUrl={'/home'} />
      <Section height='300'>
        <div className='w-full'>
          <div className='space-y-6'>
            <div className='flex flex-row gap-2 items-end'>
              <input
                type='text'
                value={amount}
                className='font-SCDream7 text-hanapurple border-b-2 border-hanapurple w-full text-xl text-right outline-none'
                placeholder='금액입력'
                onChange={handleChange}
              />
              을
            </div>
            <div className='flex flex-row gap-2 items-end justify-end'>
              <LumpSumBtn
                variant={'hanaSalaryBank'}
                isSelected={selectedBtn === 'hanaSalaryBank'}
                onClick={() => handleBtnClick('hanaSalaryBank')}
              />
              <LumpSumBtn
                variant={'otherAccounts'}
                isSelected={selectedBtn === 'otherAccounts'}
                onClick={() => handleBtnClick('otherAccounts')}
              />
              <LumpSumBtn
                variant={'loanProducts'}
                isSelected={selectedBtn === 'loanProducts'}
                onClick={() => handleBtnClick('loanProducts')}
              />
              에서
            </div>
            <Section
              height='300'
              bgColor='hanalightpurple'
              hasShadow
              shadowColor='rgba(77,0,181,0.3)'
            >
              <div className='space-y-4'>
                {reasons.map((item, index) => (
                  <div
                    key={index}
                    className='space-y-4 flex flex-col cursor-pointer'
                    onClick={() => setReason(item)}
                  >
                    <div className='space-x-3 flex flex-row items-center'>
                      <input
                        type='radio'
                        id={`reason-${index}`}
                        name='reason'
                        value={item}
                        checked={reason === item}
                        onChange={(e) => setReason(e.target.value)}
                        className={`w-4 h-4 ${
                          reason === item
                            ? 'text-purple-500 border-purple-500'
                            : ''
                        }`}
                      />
                      <label
                        htmlFor={`reason-${index}`}
                        className={`text-sm ${
                          reason === item ? 'text-purple-500' : 'text-gray-800'
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                    {index !== reasons.length - 1 && (
                      <hr className='border border-gray-200 w-full' />
                    )}
                  </div>
                ))}
                {reason === '기타' && (
                  <input
                    type='text'
                    placeholder='기타 선택 시, 필수 작성'
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className='w-full p-2 border border-hanalightpurple rounded-lg focus:border-hanapurple outline-none'
                  />
                )}
              </div>
            </Section>
            <div className='w-full flex justify-end'>의 이유로</div>
          </div>
        </div>
      </Section>
      <Btn
        text={`${
          selectedBtn === 'loanProducts'
            ? '대출 상품 추천받기'
            : '목돈 가져오기'
        }`}
        onClick={handleSubmit}
      />
      {selectedBtn === 'loanProducts' && loanItems ? (
        <div className='space-y-4'>
          <div className='font-SCDream5 text-xl mt-5'>
            {data.name}님을 위한 추천 대출 상품
          </div>
          {loanItems.map((loanItem, index) => (
            <RecommendItem
              key={index}
              name={loanItem.name}
              description={loanItem.description}
              maxAmount={loanItem.maxAmount}
              maxInterest_rate={loanItem.maxInterest_rate}
              productType={loanItem.productType}
              productId={loanItem.productId}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
