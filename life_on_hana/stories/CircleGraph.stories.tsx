import { Meta, StoryObj } from "@storybook/react";
import { CircleGraph } from "@/components/molecules/CircleGraph";
import { TGraphExpenseCategoriesProps } from "@/types/componentTypes";
const meta: Meta<typeof CircleGraph> = {
  title: "Molecule Component/CircleGraph",
  component: CircleGraph,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select", options: ["mydata", "statistics"] },
      description: "그래프 타입",
    },
    expenseCategories: {
      control: "object",
      description: "지출 카테고리 데이터",
    },
    depositPercentage: {
      control: "number",
      description: "예금 비율",
    },
    savingsPercentage: {
      control: "number",
      description: "저축 비율",
    },
    loanPercentage: {
      control: "number",
      description: "대출 비율",
    },
    stockPercentage: {
      control: "number",
      description: "주식 비율",
    },
    realEstatePercentage: {
      control: "number",
      description: "부동산 비율",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircleGraph>;

const myDataCategories: TGraphExpenseCategoriesProps[] = [
  { category: "FOOD", amount: 500000, percentage: 33 },
  { category: "SNACK", amount: 200000, percentage: 15 },
  { category: "EDUCATION", amount: 300000, percentage: 20 },
  { category: "HOBBY", amount: 150000, percentage: 10 },
  { category: "HEALTH", amount: 250000, percentage: 18 },
];

export const MyDataGraph: Story = {
  args: {
    type: "mydata",
    expenseCategories: myDataCategories,
  },
};

export const StatisticsGraph: Story = {
  args: {
    type: "statistics",
    depositPercentage: 40,
    savingsPercentage: 20,
    loanPercentage: 25,
    stockPercentage: 10,
    realEstatePercentage: 5,
  },
};
