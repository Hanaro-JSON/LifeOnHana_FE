import { Meta, StoryObj } from '@storybook/react';
import DescriptionDetailItem from '@/components/atoms/DescriptionDetailItem';

const meta: Meta<typeof DescriptionDetailItem> = {
  title: 'atom component/DescriptionDetailItem',
  component: DescriptionDetailItem,
  tags: ['autodocs'],
  argTypes: {
    description: { type: 'string' },
  },
};

export default meta;
type Story = StoryObj<typeof DescriptionDetailItem>;

export const Default: Story = {
  args: {
    description: '어려운 용어에 대한 설명입니다.',
  },
};

export const LongDescription: Story = {
  args: {
    description:
      '어려운 용어에 대한 매우매우 긴 설명입니다. 긴 설명입니다. 긴 설명입니다.',
  },
};
