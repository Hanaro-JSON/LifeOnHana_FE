import { Meta, StoryObj } from "@storybook/react";
import DescriptionDetailItem from "../components/atoms/DescriptionDetailItem";

const meta: Meta<typeof DescriptionDetailItem> = {
  title: "atom component/DescriptionDetailItem",
  component: DescriptionDetailItem,
  tags: ["autodocs"],
  argTypes: {
    idx: { type: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof DescriptionDetailItem>;

export const Default: Story = {
  args: {
    idx: 1,
  },
};

export const LongDescription: Story = {
  args: {
    idx: 2,
  },
};
