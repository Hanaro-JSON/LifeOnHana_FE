import { Meta, StoryObj } from '@storybook/react';
import ArticleItem from '@/components/molecules/ArticleItem';

const meta: Meta<typeof ArticleItem> = {
  title: 'molecule component/ArticleItem',
  component: ArticleItem,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '제목' },
    category: { control: 'text', description: '카테고리' },
    publishedAt: { control: 'text', description: '날짜' },
    thumbnailS3Key: { control: 'text', description: '썸네일 이미지 URL' },
    isLiked: { control: 'boolean', description: '좋아요 여부' },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleItem>;

export const Default: Story = {
  args: {
    title: '고요함과 활기참 그 사이 라오스의 두 가지 매력',
    category: '여행',
    publishedAt: '2024-07-01',
    thumbnailS3Key: 'https://hana1qm.com/dataFile/bbs/202404240904500690.jpg',
    isLiked: false,
  },
};

export const Liked: Story = {
  args: {
    title: '중고거래, AI가 올려주는 당신의 매너온도',
    category: '투자',
    publishedAt: '2024-12-01',
    thumbnailS3Key:
      'https://www.hana1qm.com/dataFile/bbs/202420210420420822.jpg',
    isLiked: true,
  },
};
