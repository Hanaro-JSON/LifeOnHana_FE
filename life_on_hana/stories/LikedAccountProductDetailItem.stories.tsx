import { Meta, StoryObj } from "@storybook/react";
import LikedAccountProductDetailItem from "@/components/molecules/LikedAccountProductDetailItem";

const meta: Meta<typeof LikedAccountProductDetailItem> = {
  title: "molecule component/LikedAccountProductDetailItem",
  component: LikedAccountProductDetailItem,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text", description: "상품명" },
    description: { control: "text", description: "상품 설명" },
    link: { control: "text", description: "Link" },
    savingsInfo: {
      control: "object",
      description: "이자 정보 (기본 금리, 최고 금리)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LikedAccountProductDetailItem>;

export const Default: Story = {
  args: {
    name: "3∙6∙9 정기예금",
    description: "3개월마다, 기쁜 날마다, 고금리의 즐거움을 드립니다. 3개월마다, 기쁜 날마다 언제든지 필요할 때 찾을 수 있고 찾을 땐 언제나 높은 금리의 즐거움까지 누릴 수 있는 정기 예금입니다.",
    link: "https://www.naver.com/",
    savingsInfo: {
      basicInterestRate: 3.5,
      maxInterestRate: 4.5,
    },
  },
};

export const Long: Story = {
  args: {
    name: "설명이 길어요",
    description: `3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다3개월마다, 기쁜 날마다, 고금리의 즐거움을 드립니다. 3개월마다, 기쁜 날마다 언제든지 필요할 때 찾을 수 있고 찾을 땐 언제나 높은 금리의 즐거움까지 누릴 수 있는 정기 예금입니다.
    이 상품은 또한 예금 기간에 따라 이자율이 달라지며, 고객의 예금액에 맞춰 맞춤형 이자율을 제공해 드립니다.`,
    link: "https://www.naver.com/",
    savingsInfo: {
      basicInterestRate: 1.5,
      maxInterestRate: 9.9,
    },
  },
};
