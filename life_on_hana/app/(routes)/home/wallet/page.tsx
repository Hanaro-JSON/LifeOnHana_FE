'use client';

import MicroMiniBtn from '@/components/atoms/MicroMiniBtn';
import Section from '@/components/atoms/Section';
import { NavHeader } from '@/components/molecules/NavHeader';
import { DataContext } from '@/hooks/useData';
import { useContext, useEffect, useState } from 'react';
import { type TGetWallet, type TGetUsersMydata } from '@/types/dataTypes';
import GraphToggle from '@/components/atoms/GraphToggle';
import { BarGraph } from '@/components/molecules/BarGraph';
import { CircleGraph } from '@/components/molecules/CircleGraph';
import Image from 'next/image';
import snake from '@/assets/snake.svg';
import { useToast } from '@/hooks/use-toast';
import Btn from '@/components/atoms/Btn';
import AssetManageWayItem from '@/components/molecules/AssetManageWayItem';
import { LineGraph } from '@/components/molecules/LineGraph';
import {
  fetchHistoryMonthly,
  fetchPutWallet,
  fetchUsersMydata,
  fetchWallet,
} from '@/api';

const mockMyData: TGetUsersMydata = {
  pensionStart: '0000',
  totalAsset: 0,
  netAsset: 0,
  depositAmount: 0,
  depositPercentage: 0,
  savingsAmount: 0,
  savingsPercentage: 0,
  loanAmount: 0,
  loanPercentage: 0,
  stockAmount: 0,
  stockPercentage: 0,
  realEstateAmount: 0,
  realEstatePercentage: 0,
  lastUpdatedAt: '',
  salaryAccount: {
    accountNumber: '',
    balance: 0,
    bank: 'HANA',
  },
};

const mockWalletData: TGetWallet = {
  walletId: 0,
  walletAmount: 0,
  paymentDay: '15',
  startDate: '0000-00',
  endDate: '0000-00',
};

export default function Wallet() {
  const { toast } = useToast();
  const { data } = useContext(DataContext);
  //api/users/mydata
  const [mydata, setMyData] = useState<TGetUsersMydata>(mockMyData);
  const [oneHundredDefaultText, setOneHundredDefaultText] = useState(
    <div className='font-SCDream2 text-xs text-hanapurple'>
      초기 지급 기간은 100세까지를 기준으로 정보를 제공합니다.
    </div>
  );
  const [wallet, setWallet] = useState<TGetWallet>(mockWalletData);
  const [hideAmount, setHideAmount] = useState(false);

  //하나 지갑 수정 관련
  const [isEditing, setIsEditing] = useState(false);
  const [editWallet, setEditWallet] = useState(wallet);
  const [editSalary, setEditSalary] = useState<string>();
  const [averageExpense, setAverageExpense] = useState(0);

  useEffect(() => {
    const getMydata = async () => {
      try {
        const fetchData = (await fetchUsersMydata()) as TGetUsersMydata;
        setMyData(fetchData);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    const getWallet = async () => {
      try {
        const fetchData = await fetchWallet();
        setWallet(fetchData);
        setEditWallet(fetchData);
        setEditSalary(fetchData.walletAmount.toLocaleString());
        if (fetchData.endDate !== null) setOneHundredDefaultText(<></>);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    const getHistoryMonthly = async () => {
      try {
        const fetchData = await fetchHistoryMonthly();
        setAverageExpense(fetchData.averageExpense);
        if (fetchData.endDate !== null) setOneHundredDefaultText(<></>);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    getMydata();
    getWallet();
    getHistoryMonthly();
  }, []);

  const handleSave = () => {
    if (
      editWallet.walletAmount > mydata.salaryAccount.balance ||
      editWallet.walletAmount < 0
    ) {
      toast({
        title:
          '설정하신 지급 금액은 현재 하나 월급통장 내에서 지급 불가능합니다.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
      return;
    }
    setWallet(editWallet);
    fetchPutWallet(editWallet);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditWallet(wallet);
    setIsEditing(false);
  };

  const formatNumber = (value: string) => {
    if (!value || isNaN(Number(value.replaceAll(',', '')))) return '';
    return Number(value.replaceAll(',', '')).toLocaleString('en-US');
  };

  const handleChange = (e: { target: { value: string } }) => {
    const rawValue = e.target.value.replace(/[,.원]/g, '');
    const numericValue = Number(rawValue);

    if (!isNaN(numericValue)) {
      setEditSalary(formatNumber(rawValue)); // 포맷팅된 문자열 업데이트
      setEditWallet((prev) => ({
        ...prev,
        walletAmount: numericValue, // 숫자 상태 업데이트
      }));
    }
  };

  const [graphType, setGraphType] = useState('bar');

  const getConvertedStartDate = () => {
    const tempStartD = wallet.startDate.split('-');
    return tempStartD[0] + '년 ' + tempStartD[1] + '월';
  };

  const getConvertedEndDate = () => {
    const tempEndD = wallet.endDate.split('-');
    return tempEndD[0] + '년 ' + tempEndD[1] + '월';
  };

  const getSalary = () => {
    const tempStartD = wallet.startDate.split('-');
    const convertStartD = tempStartD[0] + '/' + tempStartD[1];
    const tempEndD = wallet.endDate.split('-');
    const convertEndD = tempEndD[0] + '/' + tempEndD[1];
    const months =
      Number(tempEndD[0]) * 12 +
      Number(tempEndD[1]) -
      (Number(tempStartD[0]) * 12 + Number(tempStartD[1]));
    return convertStartD + ' - ' + convertEndD + ' (총 ' + months + '개월)';
  };

  const getMonths = () => {
    const tempStartD = wallet.startDate.split('-');
    const tempEndD = wallet.endDate.split('-');
    return (
      Number(tempEndD[0]) * 12 +
      Number(tempEndD[1]) -
      (Number(tempStartD[0]) * 12 + Number(tempStartD[1]))
    );
  };

  const AnalyzeData = () => {
    const getKookmin =
      Number(wallet.endDate.split('-')[0]) * 12 +
      Number(wallet.endDate.split('-')[0]) -
      (Number(mydata.pensionStart) + 1);

    const need = getMonths() * wallet.walletAmount - getKookmin;

    if (need > mydata.totalAsset) {
      // 돈 부족
      return (
        <div className='flex flex-col gap-y-8'>
          <div className='font-SCDream3 text-[1rem] mt-4'>
            매달&nbsp;
            <span className='font-SCDream5 text-[1.0625rem]'>
              {wallet.walletAmount.toLocaleString()}원
            </span>
            을<br />
            <span className='font-SCDream5 text-[1.0625rem]'>
              설정하신 지급 기간 ({getMonths()}개월)
            </span>
            &nbsp;동안 수령하기 위해 <br />
            하나 월급통장에 필요한 금액은 <br />
            <span className='font-SCDream5 text-[1.0625rem]'>
              {need.toLocaleString()}원
            </span>
            입니다. <br />
            <span className='font-SCDream5 text-[1.0625rem]'>
              &nbsp;{Math.floor(need / mydata.totalAsset)}개월 이후
            </span>
            부터 잔액이 부족하게 됩니다.
          </div>

          <Btn
            variant={'hanaWallet'}
            text={'하나 월급통장 더 채우기'}
            url={'/home/wallet/deposit'}
          />

          <div className='font-SCDream3 text-[1rem]'>
            다음과 같은 방안도 고려해볼 수 있어요.
          </div>
          <div className='flex flex-row justify-center gap-x-2'>
            <AssetManageWayItem variant={'adjust'} />
            <AssetManageWayItem variant={'rebalancing'} />
            <AssetManageWayItem variant={'managing'} />
            <AssetManageWayItem variant={'product'} />
          </div>
          <Btn
            variant={'hanaWallet'}
            text={'하나은행 연금 플래너 이용하기'}
            url={'https://pension.kebhana.com/rpc/hhom/kr/main.do'}
          />
        </div>
      );
    } else {
      return (
        <div className='flex flex-col gap-y-5'>
          <div className='font-SCDream2 text-sm mt-4'>
            매달 &nbsp;
            <span className='font-SCDream3 font-extrabold'>
              {wallet.walletAmount.toLocaleString()}원
            </span>
            을&nbsp;
            <span className='font-SCDream3 font-extrabold'>
              설정하신 지급 기간 ({getMonths()}개월)
            </span>
            &nbsp;동안 수령하기 위해 하나 월급통장에 필요한 금액은&nbsp;
            <span className='font-SCDream3 font-extrabold'>
              {need < 0 ? 0 : need.toLocaleString()}원
            </span>
            입니다. <br />
            <span className='font-SCDream3 font-extrabold'>
              &nbsp;{getMonths()}개월
            </span>
            동안 수령할 금액이
            <span className='font-SCDream3 font-extrabold'>&nbsp;충분</span>
            합니다!
          </div>
          <Btn
            variant={'hanaWallet'}
            text={'희망 금액 및 기간 다시 설정하기'}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
          <div className='font-SCDream2 text-sm'>
            다음과 같은 방안도 고려해볼 수 있어요.
          </div>
          <div className='flex flex-row justify-center gap-x-2'>
            <AssetManageWayItem variant={'invest'} />
            <AssetManageWayItem variant={'trip'} />
            <AssetManageWayItem variant={'culture'} />
            <AssetManageWayItem variant={'realEstate'} />
          </div>
          <Btn
            variant={'hanaWallet'}
            text={'하나은행 연금 플래너 이용하기'}
            url={'https://pension.kebhana.com/rpc/hhom/kr/main.do'}
          />
        </div>
      );
    }
  };

  return (
    <div className='p-6 space-y-8 mt-50 mb-28'>
      <div className='fixed top-0 left-0 pt-6 px-6 w-full bg-background z-50'>
        <NavHeader location={'하나 지갑 관리하기'} beforePageUrl={'/home'} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Section>
          <div className='w-full space-y-3'>
            <div className='pb-4 w-full flex flex-row justify-between items-center'>
              <div className='font-SCDream7 text-[1.5625rem]'>
                {data.name}님의 자산
              </div>
              <MicroMiniBtn
                text={hideAmount ? '금액 보기' : '금액 숨김'}
                onClick={() => setHideAmount((prev) => !prev)}
              />
            </div>
            <div className='w-full font-SCDream3 text-[1.25rem]'>
              나의 총 자산
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
              {hideAmount ? (
                <div className='font-SCDream8 text-3xl text-gray-400'>
                  금액 숨김
                </div>
              ) : (
                <div className='font-SCDream8 text-3xl'>
                  {mydata.totalAsset.toLocaleString()}원
                </div>
              )}

              <GraphToggle initialState={'bar'} onToggle={setGraphType} />
            </div>
            <div>
              {graphType == 'bar' ? (
                <BarGraph
                  type={'statistics'}
                  depositPercentage={mydata.depositPercentage}
                  savingsPercentage={mydata.savingsPercentage}
                  loanPercentage={mydata.loanPercentage}
                  stockPercentage={mydata.stockPercentage}
                  realEstatePercentage={mydata.realEstatePercentage}
                />
              ) : (
                <CircleGraph
                  type={'statistics'}
                  depositPercentage={mydata.depositPercentage}
                  savingsPercentage={mydata.savingsPercentage}
                  loanPercentage={mydata.loanPercentage}
                  stockPercentage={mydata.stockPercentage}
                  realEstatePercentage={mydata.realEstatePercentage}
                />
              )}
            </div>
            <div className='flex flex-row justify-between w-full font-SCDream3 text-[1.0625rem]'>
              <div>월평균 고정지출</div>
              <div>
                <span className='font-SCDream5 text-[1.0625rem]'>
                  {averageExpense.toLocaleString()}
                </span>
                원
              </div>
            </div>
            <div className='flex flex-row justify-between w-full font-SCDream3 text-[1.0625rem]'>
              <div>나의 국민연금 수령 연도</div>
              <div>
                <span className='font-SCDream5 text-[1.0625rem]'>
                  {mydata.pensionStart}
                </span>
                년
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section bgColor='hanalightpurple' height='10rem'>
        <div className='w-full flex justify-between'>
          <Image src={snake} alt={'snake'} />
          <div className='flex flex-col justify-center items-end gap-y-2'>
            <div className='font-SCDream5 text-[1.3125rem]'>
              하나 월급통장 잔액
            </div>
            <div className='font-SCDream7 text-[1.6rem]'>
              {Math.round(
                Number(mydata.salaryAccount.balance)
              ).toLocaleString()}
              원
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className='w-full space-y-2'>
          <div className='pb-4 w-full flex flex-row justify-between items-center'>
            <div className='font-SCDream8 text-[1.25rem]'>
              <span className='text-hanagreen'>하나 지갑</span> 정보
            </div>
            {isEditing ? (
              <div className='flex space-x-2'>
                <MicroMiniBtn text={'완료'} onClick={handleSave} />
                <MicroMiniBtn text={'취소'} onClick={handleCancel} />
              </div>
            ) : (
              <MicroMiniBtn text={'수정'} onClick={() => setIsEditing(true)} />
            )}
          </div>

          {/* 지급 기간 */}
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[1rem]'>
            <div>지급 기간</div>
            {isEditing ? (
              <div className='font-extrabold'>
                {getConvertedStartDate()} - &nbsp;
                <input
                  type='month'
                  value={editWallet.endDate}
                  className='border p-1 rounded border-hanapurple outline-none'
                  onChange={(e) => {
                    const newEndDate = e.target.value.trim();
                    setEditWallet((prev) => ({
                      ...prev,
                      endDate: newEndDate,
                    }));
                  }}
                  min={wallet.startDate}
                />
              </div>
            ) : (
              <div className='font-SCDream5 text-[1.0625rem]'>
                {getSalary()}
              </div>
            )}
          </div>
          {oneHundredDefaultText}

          {/* 하나 급여일 */}
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[1rem]'>
            <div>하나 급여일</div>
            {isEditing ? (
              <div className='flex flex-row gap-x-1'>
                <div
                  className={`items-center border px-4 py-1 rounded cursor-pointer ${
                    editWallet.paymentDay === '1'
                      ? 'border-purple-500 text-purple-500'
                      : 'border-gray-300 text-gray-800'
                  }`}
                  onClick={() =>
                    setEditWallet({
                      ...editWallet,
                      paymentDay: '1',
                    })
                  }
                >
                  <span className='text-sm'>매달 1일</span>
                </div>
                <div
                  className={`items-center border px-4 py-1 rounded cursor-pointer ${
                    editWallet.paymentDay === '15'
                      ? 'border-purple-500 text-purple-500'
                      : 'border-gray-300 text-gray-800'
                  }`}
                  onClick={() =>
                    setEditWallet({
                      ...editWallet,
                      paymentDay: '15',
                    })
                  }
                >
                  <span className='text-sm'>매달 15일</span>
                </div>
              </div>
            ) : (
              <div className='font-SCDream5 text-[1.0625rem]'>
                매달 {wallet.paymentDay}일
              </div>
            )}
          </div>

          {/* 지급 금액 */}
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[1rem]'>
            <div>지급 금액</div>
            {isEditing ? (
              <div>
                <input
                  className='text-end border p-1 rounded outline-none border-hanapurple'
                  type='text'
                  value={editSalary}
                  placeholder={wallet.walletAmount.toLocaleString()}
                  onChange={handleChange}
                />
                원
              </div>
            ) : (
              <div className='font-SCDream5 text-[1.0625rem]'>
                {wallet.walletAmount.toLocaleString()}원 / 월
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className='w-full space-y-8'>
          <div className='pb-4 w-full items-center'>
            <div className='font-SCDream8 text-xl'>나의 예상 자산 흐름</div>
          </div>
          <div className='font-SCDream3 text-[1.0625rem]'>
            <span className='font-bold'>{getConvertedEndDate()}</span>까지의{' '}
            {data.name}님의 자산 변동을 그래프로 보여드릴게요.
          </div>

          <LineGraph
            totalAsset={mydata.totalAsset}
            walletAmount={wallet.walletAmount}
            startDate={wallet.startDate}
            endDate={wallet.endDate}
            pensionStart={mydata.pensionStart}
            balance={mydata.salaryAccount.balance}
          />

          <AnalyzeData />
        </div>
      </Section>
    </div>
  );
}
