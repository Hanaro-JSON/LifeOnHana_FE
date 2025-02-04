import { Meta, StoryObj } from '@storybook/react';
import Btn from '@/components/atoms/Btn';

const meta: Meta<typeof Btn> = {
  title: 'atom component/Btn',
  component: Btn,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    variant: { type: 'string', description: '종류' },
    text: { type: 'string', description: '라벨' },
    url: { type: 'string', description: '이동할 링크' },
  },
};

export default meta;
type Story = StoryObj<typeof Btn>;

export const Default: Story = {
  args: {
    variant: 'default',
    text: '채우기 완료',
  },
};

export const BeforeChooseAccount: Story = {
  args: {
    variant: 'beforeChooseAccount',
    text: '채우기 완료',
  },
};

export const MoveToFullContent: Story = {
  args: {
    variant: 'moveToArticle',
    text: '전문 보기',
    url: '/',
  },
};

export const hanaWalletWithUrl: Story = {
  args: {
    variant: 'hanaWallet',
    text: '하나 월급통장 더 채우기',
    url: '/',
  },
};

export const hanaWalletWithoutUrl: Story = {
  args: {
    variant: 'hanaWallet',
    text: '하나은행 연금 플래너 이용하기',
  },
};

export const login: Story = {
  args: {
    type: 'submit',
    text: '로그인',
  },
};
