import { Meta, StoryObj } from '@storybook/react';
import ShortsAutoToggle from '@/components/atoms/ShortsAutoToggle';

const meta: Meta<typeof ShortsAutoToggle> = {
  title: 'Atom Component/ShortsAutoToggle',
  component: ShortsAutoToggle,
  tags: ['autodocs'],
  argTypes: {
    initialState: {
      control: {
        type: 'radio',
        options: ['play', 'pause'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShortsAutoToggle>;

export const Default: Story = {
  args: {
    initialState: 'play',
  },
};

export const Play: Story = {
  args: {
    initialState: 'play',
  },
};

export const Pause: Story = {
  args: {
    initialState: 'pause',
  },
};
