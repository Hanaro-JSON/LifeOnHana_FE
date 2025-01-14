import { Meta, StoryObj } from "@storybook/react";
import AssetManageWayItem from "../components/molecules/AssetManageWayItem";

const meta: Meta<typeof AssetManageWayItem> = {
  title: "molecule component/AssetManageWayItem",
  component: AssetManageWayItem,
  tags: ["autodocs"],
  argTypes: {
    variant: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof AssetManageWayItem>;

export const adjust: Story = {
  args: {
    variant: "adjust",
  },
};

export const rebalancing: Story = {
  args: {
    variant: "rebalancing",
  },
};

export const managing: Story = {
  args: {
    variant: "managing",
  },
};

export const product: Story = {
  args: {
    variant: "product",
  },
};
