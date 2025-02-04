import { type TColumnMainImgItemProps } from '@/types/componentTypes';

export default function ColumnMainImgItem({
  variant,
  title,
}: TColumnMainImgItemProps) {
  const getCategory = (variant: string) => {
    switch (variant) {
      case 'REAL_ESTATE':
        return '부동산';
      case 'INVESTMENT':
        return '투자';
      case 'INHERITANCE_GIFT':
        return '상속∙증여';
      case 'TRAVEL':
        return '여행';
      case 'CULTURE':
        return '문화';
      case 'HOBBY':
        return '취미';
      default:
        return '';
    }
  };

  const getSrc = (variant: string) => {
    switch (variant) {
      case 'REAL_ESTATE':
        return '/assets/column_main_realEstate.svg';
      case 'INVESTMENT':
        return '/assets/column_main_investment.svg';
      case 'INHERITANCE_GIFT':
        return '/assets/column_main_inheritanceGift.svg';
      case 'TRAVEL':
        return '/assets/column_main_travel.svg';
      case 'CULTURE':
        return '/assets/column_main_culture.svg';
      case 'HOBBY':
        return '/assets/column_main_hobby.svg';
      default:
        return '';
    }
  };

  return (
    <>
      <div
        className='bg-cover bg-center w-screen h-[149.4px] flex items-center pl-5'
        style={{ backgroundImage: `url(${getSrc(variant)})` }}
      >
        <div className='w-[70%]'>
          <div className='text-hanapurple font-SCDream8 text-[1.125rem]'>
            {getCategory(variant)}
          </div>
          <div className='text-white font-SCDream8 text-[1.5625rem]'>
            {title}
          </div>
        </div>
      </div>
    </>
  );
}
