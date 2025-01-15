import { Meta, StoryObj } from "@storybook/react";
import ArticleItem from "@/components/molecules/ArticleItem";

const meta: Meta<typeof ArticleItem> = {
  title: "molecule component/ArticleItem",
  component: ArticleItem,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "제목" },
    category: { control: "text", description: "카테고리" },
    published_at: { control: "text", description: "날짜" },
    thumbnail_s3_key: { control: "text", description: "썸네일 이미지 URL" },
    is_liked: { control: "boolean", description: "좋아요 여부" },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleItem>;

export const Default: Story = {
  args: {
    title: "고요함과 활기참 그 사이 라오스의 두 가지 매력",
    category: "여행",
    published_at: "2024-07-01",
    thumbnail_s3_key: "https://hana1qm.com/dataFile/bbs/202404240904500690.jpg",
    is_liked: false,
  },
};

export const Liked: Story = {
  args: {
    title: "중고거래, AI가 올려주는 당신의 매너온도",
    category: "투자",
    published_at: "2024-12-01",
    thumbnail_s3_key: "https://www.hana1qm.com/dataFile/bbs/202420210420420822.jpg",
    is_liked: true,
  },
};
