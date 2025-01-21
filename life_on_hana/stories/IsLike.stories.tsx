import { Meta, StoryObj } from '@storybook/react';
import IsLike from '@/components/molecules/IsLike';

const meta: Meta<typeof IsLike> = {
  title: 'Molecule Component/IsLike',
  component: IsLike,
  tags: ['autodocs'],
  argTypes: {
    likeCount: { control: 'number', description: '초기 좋아요 개수' },
  },
};

export default meta;
type Story = StoryObj<typeof IsLike>;

export const Default: Story = {
  args: {
    likeCount: 10,
    isLiked: false,
  },
};

export const Liked: Story = {
  args: {
    likeCount: 100,
    isLiked: true,
  },
};

export const NoLikes: Story = {
  args: {
    likeCount: 0,
  },
};
