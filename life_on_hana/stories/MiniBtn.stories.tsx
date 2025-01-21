import { Meta, StoryObj } from '@storybook/react';
import MiniBtn from '@/components/atoms/MiniBtn';

const meta: Meta<typeof MiniBtn> = {
  title: 'atom component/MiniBtn',
  component: MiniBtn,
  tags: ['autodocs'],
  argTypes: {
    text: { type: 'string', description: '라벨' },
    variant: { type: 'string', description: '종류' },
  },
};

export default meta;
type Story = StoryObj<typeof MiniBtn>;

export const Default: Story = {
  args: {
    variant: 'default',
    text: '금액 숨김',
  },
};

export const WithoutVariant: Story = {
  args: {
    text: '완료',
  },
};

export const Cancel: Story = {
  args: {
    variant: 'cancel',
    text: '취소',
  },
};
