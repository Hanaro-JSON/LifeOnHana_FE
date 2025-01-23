import { Meta, StoryObj } from '@storybook/react';
import LoadingIcon from '@/components/atoms/LoadingIcon';

const meta: Meta<typeof LoadingIcon> = {
  title: 'atom component/LoadingIcon',
  component: LoadingIcon,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {},
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ minHeight: '480px', padding: '20px', boxSizing: 'border-box' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoadingIcon>;

export const Default: Story = {
  args: {},
};
