import { Meta, StoryObj } from "@storybook/react";
import AccountDetailItem from "@/components/molecules/AccountDetailItem";

const meta: Meta<typeof AccountDetailItem> = {
  title: "molecule component/AccountDetailItem",
  component: AccountDetailItem,
  tags: ["autodocs"],
  argTypes: {
    bank: {
      control: "text",
      description: "은행 이름",
    },
    accountNumber: {
      control: "text",
      description: "계좌 번호",
    },
    accountName: {
      control: "text",
      description: "계좌 이름",
    },
    balance: {
      control: "number",
      description: "계좌 잔액",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AccountDetailItem>;

export const Default: Story = {
  args: {
    bank: "HANA",
    accountName: "하나월급통장",
    accountNumber: "11111111111111",
    balance: 1000000,
  },
};

export const NH: Story = {
  args: {
    bank: "NH",
    accountName: "NH모임통장",
    accountNumber: "123123123123",
    balance: 7000000,
  },
};

export const SHINHAN: Story = {
  args: {
    bank: "SHINHAN",
    accountName: "신한적금통장",
    accountNumber: "999999999999",
    balance: 2500000,
  },
};

export const KAKAO: Story = {
  args: {
    bank: "KAKAO",
    accountName: "카카오페이통장",
    accountNumber: "456456789123",
    balance: 300000,
  },
};
