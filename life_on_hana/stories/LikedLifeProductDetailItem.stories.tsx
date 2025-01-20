import { Meta, StoryObj } from "@storybook/react";
import LikedLifeProductDetail from "@/components/molecules/LikedLifeProductDetail";

const meta: Meta<typeof LikedLifeProductDetail> = {
  title: "molecule component/LikedLifeProductDetail",
  component: LikedLifeProductDetail,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "보험 상품명",
    },
    description: {
      control: "text",
      description: "보험 상품 설명",
    },
    link: {
      control: "text",
      description: "상품 정보 링크",
    },
    closeBtn: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
      defaultValue: true,
    },
    onClose: {
      action: "close clicked",
      description: "닫기 버튼/배경 클릭 시 호출",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
<<<<<<< HEAD
          minHeight: "1200px",
=======
          minHeight: "480px",
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LikedLifeProductDetail>;

export const Default: Story = {
  args: {
    name: "여행자 보험",
    description: "해외여행 시 필요한 보험 상품입니다.",
    link: "https://example.com/product/3",
    closeBtn: true,
  },
};

export const Long: Story = {
  args: {
    name: "어느 나라든 안심하는 종합 여행자 보험",
    description:
      "여행 시 발생할 수 있는 상해, 질병, 분실 등의 위험을 보장해주는 든든한 보험 상품입니다. " +
      "추가로 긴급후송, 배상책임 등 다양한 부가 혜택을 포함하여 해외뿐 아니라 국내 여행 시에도 안전하게 보장받으실 수 있습니다. " +
      "긴 여행, 짧은 여행, 가족 동반 여행, 배낭 여행 등 다양한 상황에 맞춰서 설계되어 있습니다. " +
      "더 자세한 정보는 아래 링크를 참조해주세요." +
      "여행 시 발생할 수 있는 상해, 질병, 분실 등의 위험을 보장해주는 든든한 보험 상품입니다. " +
      "추가로 긴급후송, 배상책임 등 다양한 부가 혜택을 포함하여 해외뿐 아니라 국내 여행 시에도 안전하게 보장받으실 수 있습니다. " +
      "긴 여행, 짧은 여행, 가족 동반 여행, 배낭 여행 등 다양한 상황에 맞춰서 설계되어 있습니다. " +
      "더 자세한 정보는 아래 링크를 참조해주세요." +
      "여행 시 발생할 수 있는 상해, 질병, 분실 등의 위험을 보장해주는 든든한 보험 상품입니다. " +
      "추가로 긴급후송, 배상책임 등 다양한 부가 혜택을 포함하여 해외뿐 아니라 국내 여행 시에도 안전하게 보장받으실 수 있습니다. " +
      "긴 여행, 짧은 여행, 가족 동반 여행, 배낭 여행 등 다양한 상황에 맞춰서 설계되어 있습니다. " +
      "더 자세한 정보는 아래 링크를 참조해주세요.",
    link: "https://example.com/product/detail/long",
    closeBtn: false,
  },
};
