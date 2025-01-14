import { Meta, StoryObj } from "@storybook/react";
import MoveToBackBtn from "../components/atoms/MoveToBackBtn";

const meta: Meta<typeof MoveToBackBtn> = {
  title: "atom component/MoveToBackBtn",
  component: MoveToBackBtn,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MoveToBackBtn>;

export const Default: Story = {
  args: {},
};
