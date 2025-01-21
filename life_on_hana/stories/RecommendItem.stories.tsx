import { Meta, StoryObj } from '@storybook/react';
import { RecommendItem } from '@/components/molecules/RecommendItem';

const meta: Meta<typeof RecommendItem> = {
  title: 'molecule component/RecommendItem',
  component: RecommendItem,
  tags: ['autodocs'],
  argTypes: {
    productType: {
      control: {
        type: 'select',
        options: ['LOAN', 'SAVINGS', 'LIFE'],
      },
    },
    name: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    maxAmount: {
      control: 'text',
    },
    maxInterest_rate: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecommendItem>;

export const Loan: Story = {
  args: {
    productId: '1',
    name: '대출 상품',
    description: '최대 한도와 조건이 좋은 대출 상품입니다.',
    maxAmount: '1억 원',
    productType: 'LOAN',
  },
};

export const Savings: Story = {
  args: {
    productId: '2',
    name: '적금 상품',
    description: '높은 금리의 적금 상품입니다.',
    maxInterest_rate: 3.5,
    productType: 'SAVINGS',
  },
};

export const Life: Story = {
  args: {
    productId: '3',
    name: '보험 상품',
    description: '삶을 지켜주는 든든한 보험 상품입니다.',
    productType: 'LIFE',
  },
};
