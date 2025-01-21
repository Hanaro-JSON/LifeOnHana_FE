import { type TRecommendItemProps } from '@/types/componentTypes';
import Section from '../atoms/Section';

export function RecommendItem({
  name,
  description,
  maxAmount,
  maxInterest_rate,
  productType,
  onClick,
}: TRecommendItemProps) {
  const renderProductDetails = () => {
    switch (productType) {
      case 'LOAN':
        return (
          <div className='flex flex-col items-end mt-3 gap-0.5'>
            {maxAmount && (
              <>
                <div className='font-SCDream8 text-[1.1rem]'>최대</div>
                <div className='font-SCDream8 text-[1rem] text-hanapurple whitespace-nowrap'>
                  {maxAmount.toLocaleString()}원
                </div>
              </>
            )}
          </div>
        );
      case 'SAVINGS':
        return (
          <div className='flex flex-col items-end mt-3 gap-0.5'>
            <div className='font-SCDream3 text-[.9rem] whitespace-nowrap'>
              연(세전,1년)
            </div>
            <div className='font-SCDream8 text-[1rem] text-hanapurple whitespace-nowrap'>
              최고 ~{maxInterest_rate}%
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Section>
      <div className='w-full flex flex-row justify-between' onClick={onClick}>
        <div className='flex flex-col gap-2'>
          <div className='font-SCDream8 text-[1.2rem]'>{name}</div>
          <div className='font-SCDream3 text-[.9rem] max-w-[90%] line-clamp-2 overflow-hidden text-ellipsis'>
            {description}
          </div>
        </div>
        <div className='flex flex-col'>{renderProductDetails()}</div>
      </div>
    </Section>
  );
}
