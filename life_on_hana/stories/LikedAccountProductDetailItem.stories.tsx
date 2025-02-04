import { Meta, StoryObj } from '@storybook/react';
import LikedAccountProductDetailItem from '@/components/molecules/LikedAccountProductDetailItem';

const meta: Meta<typeof LikedAccountProductDetailItem> = {
  title: 'molecule component/LikedAccountProductDetailItem',
  component: LikedAccountProductDetailItem,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: '상품명' },
    description: { control: 'text', description: '상품 설명' },
    link: { control: 'text', description: 'Link' },
    savingsInfo: {
      control: 'object',
      description: '이자 정보 (기본 금리, 최고 금리)',
    },
    closeBtn: {
      control: 'boolean',
      description: '닫기 버튼',
      defaultValue: true,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '1200px',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LikedAccountProductDetailItem>;

export const Default: Story = {
  args: {
    name: '3∙6∙9 정기예금',
    description:
      '3개월마다, 기쁜 날마다, 고금리의 즐거움을 드립니다. 3개월마다, 기쁜 날마다 언제든지 필요할 때 찾을 수 있고 찾을 땐 언제나 높은 금리의 즐거움까지 누릴 수 있는 정기 예금입니다.',
    link: 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080101/1419598_115126.jsp',
    savingsInfo: {
      basicInterestRate: 2.8,
      maxInterestRate: 2.8,
    },
  },
};

export const Long: Story = {
  args: {
    name: '달달 하나 적금',
    description: `급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금급여이체를 하는 손님에게 달마다 달콤한 혜택이 쏟아지는 적금`,
    link: 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1503152_115157.jsp',
    savingsInfo: {
      basicInterestRate: 2.0,
      maxInterestRate: 7.0,
    },
    closeBtn: false,
  },
};
