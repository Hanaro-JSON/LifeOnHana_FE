import { Meta, StoryObj } from '@storybook/react';
import ConnectBankItem from '@/components/molecules/ConnectBankItem';

const meta: Meta<typeof ConnectBankItem> = {
  title: 'molecule component/ConnectBankItem',
  component: ConnectBankItem,
  tags: ['autodocs'],
  argTypes: {
    bankName: {
      control: 'text',
      description: '은행 이름',
    },
    checked: {
      control: 'boolean',
      description: 'MyData 체크 여부',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectBankItem>;

export const Default: Story = {
  args: {
    bankName: 'HANA',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    bankName: 'HANA',
    checked: true,
  },
};

export const SHINHAN: Story = {
  args: {
    bankName: 'SHINHAN',
    checked: false,
  },
};

export const KAKAO: Story = {
  args: {
    bankName: 'KAKAO',
    checked: true,
  },
};
