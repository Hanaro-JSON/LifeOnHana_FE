import { Meta, StoryObj } from '@storybook/react';
import ColumnRecommendItem from '@/components/molecules/ColumnRecommendItem';

const meta: Meta<typeof ColumnRecommendItem> = {
  title: 'molecule component/ColumnRecommendItem',
  component: ColumnRecommendItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { type: 'string', description: '카테고리' },
    name: { type: 'string', description: "칼럼 내 '관련 있는 정보'명" },
  },
  decorators: [
    (Story) => (
      <div className='w-1/4'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ColumnRecommendItem>;

export const SAVINGS: Story = {
  args: {
    variant: 'SAVINGS',
    name: '예적금',
  },
};

export const LOAN: Story = {
  args: {
    variant: 'LOAN',
    name: '대출',
  },
};

export const LIFE: Story = {
  args: {
    variant: 'LIFE',
    name: '라이프',
  },
};
