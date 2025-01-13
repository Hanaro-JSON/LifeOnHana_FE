import { Meta, StoryObj } from "@storybook/react";
import Btn from "../components/atoms/Btn";

const meta: Meta<typeof Btn> = {
  title: "atom component/Btn",
  component: Btn,
  tags: ["autodocs"],
  argTypes: {
    variant: { type: "string" },
    text: { type: "string" },
    url: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof Btn>;

export const Default: Story = {
  args: {
    variant: "default",
    text: "채우기 완료",
  },
};

export const BeforeChooseAccount: Story = {
  args: {
    variant: "beforeChooseAccount",
    text: "채우기 완료",
  },
};

export const MoveToFullContent: Story = {
  args: {
    variant: "moveToArticle",
    text: "전문 보기",
    url: "/",
  },
};

export const hanaWalletWithUrl: Story = {
  args: {
    variant: "hanaWallet",
    text: "하나 월급통장 더 채우기",
    url: "/",
  },
};

export const hanaWalletWithoutUrl: Story = {
  args: {
    variant: "hanaWallet",
    text: "하나은행 연금 플래너 이용하기",
  },
};
