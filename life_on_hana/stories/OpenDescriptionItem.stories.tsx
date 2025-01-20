import { Meta, StoryObj } from "@storybook/react";
import OpenDescriptionItem from "@/components/atoms/OpenDescriptionItem";

const meta: Meta<typeof OpenDescriptionItem> = {
  title: "atom component/OpenDescriptionItem",
  component: OpenDescriptionItem,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OpenDescriptionItem>;

export const Default: Story = {
  args: {},
};
