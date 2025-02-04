import { Meta, StoryObj } from '@storybook/react';
import AssetManageWayItem from '@/components/molecules/AssetManageWayItem';

const meta: Meta<typeof AssetManageWayItem> = {
  title: 'molecule component/AssetManageWayItem',
  component: AssetManageWayItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { type: 'string', description: '종류' },
  },
};

export default meta;
type Story = StoryObj<typeof AssetManageWayItem>;

export const adjust: Story = {
  args: {
    variant: 'adjust',
  },
};

export const rebalancing: Story = {
  args: {
    variant: 'rebalancing',
  },
};

export const managing: Story = {
  args: {
    variant: 'managing',
  },
};

export const product: Story = {
  args: {
    variant: 'product',
  },
};

export const invest: Story = {
  args: {
    variant: 'invest',
  },
};

export const trip: Story = {
  args: {
    variant: 'trip',
  },
};

export const culture: Story = {
  args: {
    variant: 'culture',
  },
};

export const realEstate: Story = {
  args: {
    variant: 'realEstate',
  },
};
