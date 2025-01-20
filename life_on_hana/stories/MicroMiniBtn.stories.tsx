import { Meta, StoryObj } from "@storybook/react";
import MicroMiniBtn from "@/components/atoms/MicroMiniBtn";

const meta: Meta<typeof MicroMiniBtn> = {
  title: "atom component/MicroMiniBtn",
  component: MicroMiniBtn,
  tags: ["autodocs"],
  argTypes: {
    num: { control: { type: "number" }, description: "마이데이터 수집을 위해 연결한 서비스의 개수" },
  },
};

export default meta;
type Story = StoryObj<typeof MicroMiniBtn>;

export const Default: Story = {
  args: {
    num: 5,
  },
};
