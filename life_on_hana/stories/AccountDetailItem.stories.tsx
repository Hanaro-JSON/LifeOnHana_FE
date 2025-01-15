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
    bank: "Hana",
    accountName: "하나월급통장",
    accountNumber: "111-111111-11111",
    balance: 1000000,
  },
};

export const NH: Story = {
  args: {
    bank: "NH",
    accountName: "NH모임리통장",
    accountNumber: "123-123123-123",
    balance: 7000000,
  },
};

export const Shinhan: Story = {
  args: {
    bank: "Shinhan",
    accountName: "신한적금통장",
    accountNumber: "999-999999-999",
    balance: 2500000,
  },
};

export const Kakao: Story = {
  args: {
    bank: "Kakao",
    accountName: "카카오페이통장",
    accountNumber: "456-456789-123",
    balance: 300000,
  },
};
