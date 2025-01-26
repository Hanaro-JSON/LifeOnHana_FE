'use client';

import Image from 'next/image';
import { type TLumpSumBtnProps } from '@/types/componentTypes';

const getLabel = (variant: TLumpSumBtnProps) => {
  switch (variant) {
    case 'hanaSalaryBank':
      return '하나 월급통장';
    case 'otherAccounts':
      return '다른 통장';
    case 'loanProducts':
      return '대출 상품';
    default:
      return '';
  }
};

const getSrc = (variant: TLumpSumBtnProps) => {
  switch (variant) {
    case 'hanaSalaryBank':
      return '/assets/hanaSalaryBank.svg';
    case 'otherAccounts':
      return '/assets/otherAccounts.svg';
    case 'loanProducts':
      return '/assets/loanProducts.svg';
    default:
      return '';
  }
};

export default function LumpSumBtn({
  variant,
  isSelected,
  onClick,
}: {
  variant: TLumpSumBtnProps;
  isSelected: boolean;
  onClick: () => void;
}) {
  const commonClassNames =
    'flex flex-col justify-center items-center w-[6.6rem] h-[6.6rem] rounded-xl';

  return (
    <button
      onClick={onClick}
      style={
        isSelected
          ? {
              backgroundColor: 'rgba(77, 0, 181, 0.2)',
              boxShadow:
                '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(77, 0, 181, 0.25) inset',
            }
          : undefined
      }
      className={`${commonClassNames} ${
        isSelected
          ? 'shadow-inner'
          : 'shadow-[0px_4px_3px_rgba(77,0,181,0.3)] bg-hanalightpurple'
      }`}
    >
      <Image
        src={getSrc(variant)}
        alt={getLabel(variant)}
        width={50}
        height={50}
      />
      <div className='font-SCDream4 text-[1.0rem]'>{getLabel(variant)}</div>
    </button>
  );
}
