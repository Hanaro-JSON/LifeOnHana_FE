import { Meta, StoryObj } from "@storybook/react";
import DescriptionDetailItem from "../components/atoms/DescriptionDetailItem";

const meta: Meta<typeof DescriptionDetailItem> = {
  title: "atom component/DescriptionDetailItem",
  component: DescriptionDetailItem,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DescriptionDetailItem>;

export const Default: Story = {
  args: {},
};
