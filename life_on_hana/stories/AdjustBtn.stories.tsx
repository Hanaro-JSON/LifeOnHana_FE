import { Meta, StoryObj } from '@storybook/react';
import AdjustBtn from '@/components/atoms/AdjustBtn';

const meta: Meta<typeof AdjustBtn> = {
  title: 'atom component/AdjustBtn',
  component: AdjustBtn,
  tags: ['autodocs'],
  argTypes: {
    typeCeilTxt: { control: { type: 'text' }, description: '버튼 상단 텍스트' },
    typeBottomTxt: {
      control: { type: 'text' },
      description: '버튼 하단 텍스트',
    },
    first: { control: { type: 'text' }, description: '바 왼쪽 텍스트' },
    second: { control: { type: 'text' }, description: '바 가운데 텍스트' },
    third: { control: { type: 'text' }, description: '바 오른쪽 텍스트' },
    mX: { control: { type: 'number' }, description: '버튼 X 위치' },
    mY: { control: { type: 'number' }, description: '버튼 Y 위치' },
  },
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
type Story = StoryObj<typeof AdjustBtn>;

export const ttsSpead: Story = {
  args: {
    typeCeilTxt: '말',
    typeBottomTxt: '속도',
    first: '0.5x',
    second: '1x',
    third: '2x',
    mX: 80,
    mY: 90,
  },
};

export const fontSize: Story = {
  args: {
    typeCeilTxt: '글씨',
    typeBottomTxt: '크기',
    first: '작게',
    second: '보통',
    third: '크게게',
    mX: 80,
    mY: 90,
  },
};
