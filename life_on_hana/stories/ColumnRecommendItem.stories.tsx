import { Meta, StoryObj } from "@storybook/react";
import ColumnRecommendItem from "../components/molecules/ColumnRecommendItem";

const meta: Meta<typeof ColumnRecommendItem> = {
  title: "molecule component/ColumnRecommendItem",
  component: ColumnRecommendItem,
  tags: ["autodocs"],
  argTypes: {
    variant: { type: "string" },
    name: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof ColumnRecommendItem>;

export const RealEstate: Story = {
  args: {
    variant: "REAL_ESTATE",
    name: "토지거래허가구역",
  },
};

export const Investment: Story = {
  args: {
    variant: "INVESTMENT",
    name: "월배당 ETF",
  },
};

export const InheritanceGift: Story = {
  args: {
    variant: "INHERITANCE_GIFT",
    name: "보험금청구권 신탁",
  },
};

export const Travel: Story = {
  args: {
    variant: "TRAVEL",
    name: "보홀 5일 #비그랜드 #고래상어투어",
  },
};

export const Culture: Story = {
  args: {
    variant: "CULTURE",
    name: "<바람아 분다, 가라> - 한강",
  },
};

export const Hobby: Story = {
  args: {
    variant: "HOBBY",
    name: "‘동년배 친구’를 사귀고 싶다면, ‘오이’ & ‘시놀’",
  },
};
