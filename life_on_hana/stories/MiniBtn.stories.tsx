import { Meta, StoryObj } from "@storybook/react";
import MiniBtn from "../components/atoms/MiniBtn";

const meta: Meta<typeof MiniBtn> = {
  title: "atom component/MiniBtn",
  component: MiniBtn,
  tags: ["autodocs"],
  argTypes: {
    text: { type: "string" },
    variant: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof MiniBtn>;

export const Default: Story = {
  args: {
    variant: "default",
    text: "완료",
  },
};

export const Cancel: Story = {
  args: {
    variant: "cancel",
    text: "취소",
  },
};
