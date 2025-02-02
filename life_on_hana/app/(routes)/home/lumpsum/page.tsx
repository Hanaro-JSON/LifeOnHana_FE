/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Skeleton from 'react-loading-skeleton';
import Btn from '@/components/atoms/Btn';
import Section from '@/components/atoms/Section';
import LumpSumBtn from '@/components/molecules/LumpSumBtn';
import { NavHeader } from '@/components/molecules/NavHeader';
import { DataContext } from '@/hooks/useData';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  type TLikedLoanProductDetailItemProps,
  type TRecommendItemProps,
} from '@/types/componentTypes';
import { Reason } from '@/types/dataTypes';
import { RecommendItem } from '@/components/molecules/RecommendItem';
import {
  fetchAccountSalary,
  fetchAntropicLoans,
  fetchLoanProductDetails,
  fetchLumpsum,
} from '@/api';
import LikedLoanProductDetailItem from '@/components/molecules/LikedLoanProductDetailItem';
import { useToast } from '@/hooks/use-toast';
import LoadingIcon from '@/components/atoms/LoadingIcon';

type TSelectedProductProps = {
  type: 'LOAN';
  data: TLikedLoanProductDetailItemProps;
} | null;

export default function Lumpsum() {
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useContext(DataContext);
  const [amount, setAmount] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [selectedBtn, setSelectedBtn] = useState<string | null>(null);
  const reasons = Object.values(Reason);
  const [reason, setReason] = useState<Reason | ''>('');

  ///api/anthropic/loans
  const [loanItems, setLoanItems] = useState<TRecommendItemProps[]>([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProductProps] =
    useState<TSelectedProductProps>(null);

  const handleBtnClick = (variant: string) => {
    setSelectedBtn(variant);
  };

  const formatNumber = (value: string) => {
    if (!value || isNaN(Number(value.replaceAll(',', '')))) return '';
    return Number(value.replaceAll(',', '')).toLocaleString('en-US');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[,.원\s]/g, ''); // 숫자 이외의 문자 제거

    if (rawValue) {
      const formattedValue = formatNumber(rawValue);
      setAmount(`${formattedValue} 원`); // 포맷팅 후 " 원" 추가
    } else {
      setAmount(''); // 값이 없으면 빈 문자열 설정
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && amount.endsWith(' 원')) {
      // Backspace로 " 원"을 지우지 않고 숫자만 줄이기
      const rawValue = amount.replace(/[,.원\s]/g, '');
      const newValue = rawValue.slice(0, -1); // 마지막 숫자 제거
      setAmount(newValue ? `${formatNumber(newValue)} 원` : '');
      e.preventDefault(); // 기본 Backspace 동작 방지
    }
  };

  const handleReasonSelect = (selectedValue: string) => {
    // 'selectedValue'는 Reason enum의 value(예: '자녀 지원(결혼비용, 학비, 자취/독립 지원 등)')
    const selectedKey = Object.keys(Reason).find(
      (key) => Reason[key as keyof typeof Reason] === selectedValue
    );
    if (selectedKey) {
      return selectedKey;
    }
  };

  const handleSubmit = async () => {
    if (!amount) {
      toast({
        title: '금액을 입력해주세요.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
      return;
    }
    if (!selectedBtn) {
      toast({
        title: '출금 계좌를 선택해주세요.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
      return;
    }
    if (!reason) {
      toast({
        title: '사용 목적을 선택해주세요.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
      return;
    }
    if (reason === '기타' && customReason === '') {
      toast({
        title: '사용 목적을 입력해주세요.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
      return;
    }
    setClicked(true);
    switch (selectedBtn) {
      case 'loanProducts':
        setLoading(true);
        setLoanItems(
          await fetchAntropicLoans(reason, Number(amount.replace(/[^\d]/g, '')))
        );
        setLoading(false);
        break;
      case 'otherAccounts':
        router.replace(
          `/home/lumpsum/otherAccount?amount=${amount}&reason=${handleReasonSelect(reason)}&reasonDetail=${customReason}`
        ); // 금액 자동으로 넘어가게
        break;
      default:
        const fetchData = await fetchAccountSalary();
        const enumReason = handleReasonSelect(reason);
        if (amount > fetchData.balance) {
          toast({
            title: '하나 월급통장 잔액이 부족합니다.',
            className:
              'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
          });
          return;
        } else {
          await fetchLumpsum({
            amount: Number(amount.replace(/[^\d]/g, '')),
            reason: enumReason || '',
            source: 'SALARY',
            reasonDetail: customReason,
            accountId: fetchData.accountId,
          });
          toast({
            title: '목돈을 가져오는데 성공했습니다.',
            className:
              'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
          });
        }
    }
  };

  const handleProductClick = async (productId: string) => {
    try {
      const data = await fetchLoanProductDetails(Number(productId));
      setSelectedProductProps({ type: 'LOAN', data: data.data });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div className='p-6 space-y-8 mb-28'>
      <NavHeader location={'목돈 가져오기'} beforePageUrl={'/home'} />

      {selectedProduct?.type === 'LOAN' && (
        <LikedLoanProductDetailItem
          {...selectedProduct.data}
          closeBtn
          onClose={() => setSelectedProductProps(null)}
        />
      )}

      <Section height='55rem'>
        <div className='w-full'>
          <div className='space-y-8'>
            <div className='my-3 flex gap-2 font-SCDream3 text-[1.25rem] items-end'>
              <input
                type='text'
                value={amount}
                className='font-SCDream7 text-hanapurple border-b-2 border-hanapurple w-full text-[1.5625rem] text-right outline-none'
                placeholder='금액을 입력해주세요'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              을
            </div>
            <div className='flex gap-1 font-SCDream3 text-[1.25rem] items-end justify-between'>
              <div className='flex justify-between gap-3'>
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
              </div>
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
                    <div className='space-x-3 flex items-center'>
                      <input
                        type='radio'
                        id={`reason-${index}`}
                        name='reason'
                        value={item}
                        checked={reason === item}
                        onChange={() => handleReasonSelect(item)}
                        className={`w-4 h-4 ${
                          reason === item
                            ? 'text-purple-500 border-purple-500'
                            : ''
                        }`}
                      />
                      <label
                        htmlFor={`reason-${index}`}
                        className={`font-SCDream3 text-[1.125rem] ${
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
                    maxLength={30}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className='font-SCDream3 text-[1rem] w-full p-2 border border-hanalightpurple rounded-lg focus:border-hanapurple outline-none'
                  />
                )}
              </div>
            </Section>
            <div className='w-full flex justify-end font-SCDream3 text-[1.25rem]'>
              의 이유로
            </div>
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

      {clicked && selectedBtn === 'loanProducts' && loanItems ? (
        <div className='space-y-4'>
          <div className='font-SCDream5 text-xl'>
            {data.name}님을 위한 추천 대출 상품
          </div>

          {loading ? (
            <div className='h-screen'>
              <LoadingIcon />
            </div>
          ) : (
            loanItems.map((loanItem, index) => (
              <RecommendItem
                key={index}
                name={loanItem.name}
                description={loanItem.description}
                maxAmount={loanItem.maxAmount}
                maxInterest_rate={loanItem.maxInterest_rate}
                productType={loanItem.productType}
                productId={loanItem.productId}
                onClick={() => handleProductClick(loanItem.productId)}
              />
            ))
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
