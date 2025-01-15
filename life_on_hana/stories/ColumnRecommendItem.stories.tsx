import { Meta, StoryObj } from "@storybook/react";
import ColumnRecommendItem from "../components/molecules/ColumnRecommendItem";

const meta: Meta<typeof ColumnRecommendItem> = {
  title: "molecule component/ColumnRecommendItem",
  component: ColumnRecommendItem,
  tags: ["autodocs"],
  argTypes: {
    variant: { type: "string" },
    link: { type: "string" },
    name: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof ColumnRecommendItem>;

export const RealEstate: Story = {
  args: {
    variant: "REAL_ESTATE",
    link: "/",
    name: "행복 knowhow 연금예금",
  },
};

export const Investment: Story = {
  args: {
    variant: "INVESTMENT",
    link: "/",
    name: "고령 은퇴자를 위한 보험의 육하원칙 2부: 왜?(Why)",
  },
};

export const InheritanceGift: Story = {
  args: {
    variant: "INHERITANCE_GIFT",
    link: "/",
    name: "고령 은퇴자를 위한 보험의 육하원칙 2부: 왜?(Why)",
  },
};

export const Trip: Story = {
  args: {
    variant: "TRAVEL",
    link: "/",
    name: "고령 은퇴자를 위한 보험의 육하원칙 2부: 왜?(Why)",
  },
};

export const Culture: Story = {
  args: {
    variant: "CULTURE",
    link: "/",
    name: "고령 은퇴자를 위한 보험의 육하원칙 2부: 왜?(Why)",
  },
};

export const Hobby: Story = {
  args: {
    variant: "HOBBY",
    link: "/",
    name: "고령 은퇴자를 위한 보험의 육하원칙 2부: 왜?(Why)",
  },
};
