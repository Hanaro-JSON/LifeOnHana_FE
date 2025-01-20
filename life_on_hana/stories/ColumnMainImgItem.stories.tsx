import { Meta, StoryObj } from "@storybook/react";
import ColumnMainImgItem from "@/components/molecules/ColumnMainImgItem";

const meta: Meta<typeof ColumnMainImgItem> = {
  title: "molecule component/ColumnMainImgItem",
  component: ColumnMainImgItem,
  tags: ["autodocs"],
  argTypes: {
    variant: { type: "string", description: "카테고리" },
    title: { type: "string", description: "칼럼 제목" },
  },
};

export default meta;
type Story = StoryObj<typeof ColumnMainImgItem>;

export const RealEstate: Story = {
  args: {
    variant: "REAL_ESTATE",
    title: "야! 너도 일본 부동산 살 수 있어!",
  },
};

export const Investment: Story = {
  args: {
    variant: "INVESTMENT",
    title: "고령 은퇴자를 위한 보험의 육하원칙 2부: 왜?(Why)",
  },
};

export const InheritanceGift: Story = {
  args: {
    variant: "INHERITANCE_GIFT",
    title: "현명하게 가족 분쟁 없이 상속을 준비하는 방법",
  },
};

export const Travel: Story = {
  args: {
    variant: "TRAVEL",
    title: "새해 소망 여행 울산시 울주군",
  },
};

export const Culture: Story = {
  args: {
    variant: "CULTURE",
    title: "알아 두면 쓸데 많은 1900년대 비엔나 미술 속으로",
  },
};

export const Hobby: Story = {
  args: {
    variant: "HOBBY",
    title: "‘선착순’ 경쟁까지 뛰어들게 만드는 프리미엄 술의 매력",
  },
};
