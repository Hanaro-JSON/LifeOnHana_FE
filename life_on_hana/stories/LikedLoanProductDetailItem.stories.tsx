import { Meta, StoryObj } from "@storybook/react";
import LikedLoanProductDetailItem from "@/components/molecules/LikedLoanProductDetailItem";

const meta: Meta<typeof LikedLoanProductDetailItem> = {
  title: "Molecule Component/LikedLoanProductDetailItem",
  component: LikedLoanProductDetailItem,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text", description: "상품명" },
    description: { control: "text", description: "설명" },
    feature: { control: "text", description: "특징" },
    target: { control: "text", description: "대상" },
    link: { control: "text", description: "Link" },
    loanInfo: {
      control: "object",
      description: "대출 정보",
    },
    closeBtn: {
      control: "boolean",
      description: "닫기 버튼",
      defaultValue: true, 
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "480px", padding: "20px", boxSizing: "border-box" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LikedLoanProductDetailItem>;

export const Default: Story = {
  args: {
    name: "하나햇살론뱅크",
    description: "정책서민금융상품을 이용한 손님 대상으로 고금리대출을 반복 이용하지 않고, 신용도 상승을 통해 제도권 금융에 안착할 수 있도록 ‘징검다리’ 역할을 수행하는 서민금융진흥원 보증부 정책서민금융상품",
    feature: "정책서민금융상품 이용 손님 대상의 신용도 상승을 통한 제도권 금융안착",
    target: "서민금융진흥원의 승인을 받은 손님",
    link: "https://example.com/product/2",
    loanInfo: {
      minAmount: 5000000,
      maxAmount: 25000000,
      basicInterestRate: 4.5,
      maxInterestRate: 8.5,
      minPeriod: 36,
      maxPeriod: 60,
      minCreditScore: 680,
    },
  },
};

export const Long: Story = {
  args: {
    name: "직장인 신용대출",
    description: "직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출 직장인을 위한 맞춤 신용대출",
    feature: "최저금리 보장",
    target: "재직 6개월 이상 직장인",
    link: "https://example.com/product/2",
    loanInfo: {
      maxAmount: 100000000,
      basicInterestRate: 4.5,
      maxInterestRate: 8.5,
      minPeriod: 12,
      maxPeriod: 60,
      minCreditScore: 680,
    },
    closeBtn: false,
  },
};


