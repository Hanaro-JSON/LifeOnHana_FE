'use client';

import MicroMiniBtn from '@/components/atoms/MicroMiniBtn';
import Section from '@/components/atoms/Section';
import { NavHeader } from '@/components/molecules/NavHeader';
import { DataContext } from '@/hooks/useData';
import { useContext, useState } from 'react';
import { type TGetWallet, type TGetUsersMydata } from '@/types/dataTypes';
import GraphToggle from '@/components/atoms/GraphToggle';
import { BarGraph } from '@/components/molecules/BarGraph';
import { CircleGraph } from '@/components/molecules/CircleGraph';
import Image from 'next/image';
import snake from '@/assets/snake.svg';
import { LineGraph } from '@/components/molecules/LineGraph';

const mockMyData: TGetUsersMydata = {
  pensionStart: '2035',
  totalAsset: 100000000,
  netAsset: 70000000,
  depositAmount: 50000000,
  depositPercentage: 10,
  savingsAmount: 20000000,
  savingsPercentage: 10,
  loanAmount: 30000000,
  loanPercentage: 10,
  stockAmount: 10000000,
  stockPercentage: 10,
  realEstateAmount: 20000000,
  realEstatePercentage: 60,
  lastUpdatedAt: '2024-01-13T12:00:00',
  salaryAccount: {
    accountNumber: '123-456-789',
    balance: 5000000,
    bank: 'HANA',
  },
};

const mockWalletData: TGetWallet = {
  walletId: 1,
  walletAmount: 5000000,
  paymentDay: '1',
  startDate: '2024-01',
  endDate: '2024-12',
};

export default function Wallet() {
  const { data } = useContext(DataContext);
  //api/users/mydata
  const [mydata, setMyData] = useState<TGetUsersMydata>(mockMyData);
  //api/wallet
  const [wallet, setWallet] = useState(mockWalletData);

  const [hideAmount, setHideAmount] = useState(false);

  //하나 지갑 수정 관련
  const [isEditing, setIsEditing] = useState(false);
  const [editWallet, setEditWallet] = useState({ ...mockWalletData });
  const [editSalary, setEditSalary] = useState<string>(
    wallet.walletAmount.toLocaleString()
  );
  const handleSave = () => {
    setWallet(editWallet);
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
    const convertStartD = tempStartD[0] + '년 ' + tempStartD[1] + '월';
    const tempEndD = wallet.endDate.split('-');
    const convertEndD = tempEndD[0] + '년 ' + tempEndD[1] + '월';
    const months =
      Number(tempEndD[0]) * 12 +
      Number(tempEndD[1]) -
      (Number(tempStartD[0]) * 12 + Number(tempStartD[1]));
    return convertStartD + ' - ' + convertEndD + ' (총 ' + months + '개월)';
  };
  return (
    <div className='p-6 space-y-4'>
      <NavHeader location={'하나 지갑 관리하기'} beforePageUrl={'/home'} />
      <Section>
        <div className='w-full space-y-2'>
          <div className='pb-4 w-full flex flex-row justify-between items-center'>
            <div className='font-SCDream8 text-xl'>{data.name}님의 자산</div>
            <MicroMiniBtn
              text={hideAmount ? '금액 보기' : '금액 숨김'}
              onClick={() => setHideAmount((prev) => !prev)}
            />
          </div>
          <div className='w-full font-SCDream3 text-[0.9rem]'>나의 총 자산</div>
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
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[0.9rem]'>
            <div>월평균 고정지출</div>
            <div>
              <span className='font-extrabold'>
                {/* 🌟 고정지출 연결 필요 */}
                {(1000000).toLocaleString()}
              </span>
              원
            </div>
          </div>
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[0.9rem]'>
            <div>나의 국민연금 수령 연도</div>
            <div>
              <span className='font-extrabold'>{mydata.pensionStart}</span>년
            </div>
          </div>
        </div>
      </Section>
      <Section bgColor='hanalightpurple' height='10rem'>
        <div className='w-full flex flex-row justify-between'>
          <Image src={snake} alt={'snake'} />
          <div className='flex flex-col justify-center items-end gap-y-2'>
            <div className='font-SCDream5 text-lg'>하나 월급통장 잔액</div>
            <div className='font-SCDream8 text-3xl'>
              {mydata.salaryAccount.balance.toLocaleString()}원
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className='w-full space-y-2'>
          <div className='pb-4 w-full flex flex-row justify-between items-center'>
            <div className='font-SCDream8 text-xl'>
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
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[0.9rem]'>
            <div>지급 기간</div>
            {isEditing ? (
              <div className='font-extrabold'>
                {getConvertedStartDate()} - &nbsp;
                <input
                  type='month'
                  value={wallet.endDate}
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
              <div className='font-extrabold'>{getSalary()}</div>
            )}
          </div>

          {/* 하나 급여일 */}
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[0.9rem]'>
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
              <div className='font-extrabold'>매달 {wallet.paymentDay}일</div>
            )}
          </div>

          {/* 지급 금액 */}
          <div className='flex flex-row justify-between w-full font-SCDream3 text-[0.9rem]'>
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
              <div className='font-extrabold'>
                {wallet.walletAmount.toLocaleString()}원 / 월
              </div>
            )}
          </div>
        </div>
      </Section>
      <Section>
        <div className='w-full space-y-2'>
          <div className='pb-4 w-full items-center'>
            <div className='font-SCDream8 text-xl'>나의 예상 자산 흐름</div>
          </div>
          <div className='font-SCDream2 text-sm'>
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
        </div>
      </Section>
    </div>
  );
}
