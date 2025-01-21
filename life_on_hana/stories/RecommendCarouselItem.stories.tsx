import { Meta, StoryObj } from '@storybook/react';
import { RecommendCarouselItem } from '@/components/molecules/RecommendCarouselItem';

const meta: Meta<typeof RecommendCarouselItem> = {
  title: 'molecule component/RecommendCarouselItem',
  component: RecommendCarouselItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RecommendCarouselItem>;

export const Default: Story = {
  args: {
    items: [
      {
        productId: '1',
        name: '대출 상품 A',
        description: '낮은 금리의 대출 상품',
        maxAmount: '5000만원',
        productType: 'LOAN',
      },
      {
        productId: '2',
        name: '적금 상품 B',
        description: '높은 이자율의 적금 상품',
        maxInterest_rate: 3.5,
        productType: 'SAVINGS',
      },
      {
        productId: '3',
        name: '하나 패키지 여행',
        description: '보홀로 떠나요요',
        productType: 'LIFE',
      },
    ],
  },
};

export const LoanProducts: Story = {
  args: {
    items: [
      {
        productId: '1',
        name: '주택담보대출',
        description: '낮은 금리의 주택담보대출',
        maxAmount: '3억원',
        productType: 'LOAN',
      },
      {
        productId: '2',
        name: '신용대출',
        description: '빠른 승인의 신용대출',
        maxAmount: '5000만원',
        productType: 'LOAN',
      },
    ],
  },
};

export const SavingsProducts: Story = {
  args: {
    items: [
      {
        productId: '1',
        name: '정기예금',
        description: '안정적인 수익의 정기예금',
        maxInterest_rate: 2.5,
        productType: 'SAVINGS',
      },
      {
        productId: '2',
        name: '자유적금',
        description: '자유로운 입출금의 적금 상품',
        maxInterest_rate: 3.0,
        productType: 'SAVINGS',
      },
    ],
  },
};
