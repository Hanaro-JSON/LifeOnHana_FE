import { Meta, StoryObj } from '@storybook/react';
import MoveToTopBtn from '@/components/atoms/MoveToTopBtn';

const meta: Meta<typeof MoveToTopBtn> = {
  title: 'atom component/MoveToTopBtn',
  component: MoveToTopBtn,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '50px',
          padding: '30px',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MoveToTopBtn>;

export const Default: Story = {
  args: {},
};
