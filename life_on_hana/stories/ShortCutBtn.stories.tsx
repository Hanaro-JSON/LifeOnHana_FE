import { Meta, StoryObj } from '@storybook/react';
import ShortCutBtn from '@/components/molecules/ShortCutBtn';

const meta: Meta<typeof ShortCutBtn> = {
  title: 'molecule component/ShortCutBtn',
  component: ShortCutBtn,
  tags: ['autodocs'],
  argTypes: {
    url: { control: 'text', description: 'Link' },
    variant: {
      control: 'radio',
      options: ['default', 'column', 'spend', 'product'],
      description: '바로가기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShortCutBtn>;

export const Default: Story = {
  args: {
    url: 'https://www.kebhana.com',
    variant: 'default',
  },
};

export const Column: Story = {
  args: {
    url: 'https://www.kebhana.com',
    variant: 'column',
  },
};

export const Spend: Story = {
  args: {
    url: 'https://www.kebhana.com',
    variant: 'spend',
  },
};

export const Product: Story = {
  args: {
    url: 'https://www.kebhana.com',
    variant: 'product',
  },
};
