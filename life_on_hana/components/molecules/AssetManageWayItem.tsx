import { type TAssetManageWayItemProps } from '@/types/componentTypes';
import Image from 'next/image';

const getSrc = (variant: TAssetManageWayItemProps) => {
  switch (variant) {
    case 'adjust':
      return '/assets/adjust.svg';
    case 'rebalancing':
      return '/assets/rebalancing.svg';
    case 'managing':
      return '/assets/managing.svg';
    case 'product':
      return '/assets/product.svg';
    case 'invest':
      return '/assets/invest.svg';
    case 'trip':
      return '/assets/trip.svg';
    case 'culture':
      return '/assets/culture.svg';
    case 'realEstate':
      return '/assets/realEstate.svg';
    default:
      return '';
  }
};

const getLabel = (variant: TAssetManageWayItemProps) => {
  switch (variant) {
    case 'adjust':
      return '지급 금액 조정';
    case 'rebalancing':
      return '자산 리밸런싱';
    case 'managing':
      return '고정 지출 관리';
    case 'product':
      return '대출 상품';
    case 'invest':
      return '투자';
    case 'trip':
      return '여행';
    case 'culture':
      return '문화';
    case 'realEstate':
      return '부동산';
    default:
      return '';
  }
};

export default function AssetManageWayItem({
  variant,
}: {
  variant: TAssetManageWayItemProps;
}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-20 h-20 bg-hanalightpurple rounded-3xl flex justify-center items-center mb-3'>
        <Image
          src={getSrc(variant)}
          alt={getLabel(variant)}
          width={35}
          height={35}
        />
      </div>
      <div className='font-SCDream4 text-[.875rem]'>{getLabel(variant)}</div>
    </div>
  );
}
