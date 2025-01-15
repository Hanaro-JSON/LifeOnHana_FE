import { Meta, StoryObj } from "@storybook/react";
import HistoryItem from "../components/molecules/HistoryItem";

const meta: Meta<typeof HistoryItem> = {
  title: "Molecule component/HistoryItem",
  component: HistoryItem,
  tags: ["autodocs"],
  argTypes: {
    historyId: { type: "number" },
    category: {
      control: "select",
      options: [
        "FOOD",
        "SNACK",
        "EDUCATION",
        "HOBBY",
        "HEALTH",
        "FIXED_EXPENSE",
        "TRAVEL",
        "DEPOSIT",
        "INTEREST",
        "ETC",
      ],
    },
    amount: { type: "number" },
    description: { type: "string" },
    historyDatetime: { type: "string" },
    isExpense: { type: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof HistoryItem>;

export const Food: Story = {
  args: {
    historyId: 1,
    category: "FOOD",
    amount: 15000,
    description: "점심 식사",
    historyDatetime: "2024-01-13T12:30:00",
    isExpense: true,
  },
};

export const Snack: Story = {
  args: {
    historyId: 2,
    category: "SNACK",
    amount: 5000,
    description: "카페에서 커피",
    historyDatetime: "2024-01-14T15:00:00",
    isExpense: true,
  },
};

export const Education: Story = {
  args: {
    historyId: 3,
    category: "EDUCATION",
    amount: 200000,
    description: "온라인 강의 수강료",
    historyDatetime: "2024-01-15T10:00:00",
    isExpense: true,
  },
};

export const Hobby: Story = {
  args: {
    historyId: 4,
    category: "HOBBY",
    amount: 50000,
    description: "영화 관람",
    historyDatetime: "2024-01-16T19:00:00",
    isExpense: true,
  },
};

export const Health: Story = {
  args: {
    historyId: 5,
    category: "HEALTH",
    amount: 100000,
    description: "헬스장 월 회원권",
    historyDatetime: "2024-01-17T11:00:00",
    isExpense: true,
  },
};

export const FixedExpense: Story = {
  args: {
    historyId: 6,
    category: "FIXED_EXPENSE",
    amount: 500000,
    description: "월세",
    historyDatetime: "2024-01-18T09:00:00",
    isExpense: true,
  },
};

export const Travel: Story = {
  args: {
    historyId: 7,
    category: "TRAVEL",
    amount: 300000,
    description: "제주도 숙박비",
    historyDatetime: "2024-01-19T14:00:00",
    isExpense: true,
  },
};

export const Deposit: Story = {
  args: {
    historyId: 8,
    category: "DEPOSIT",
    amount: 2000000,
    description: "월급 입금",
    historyDatetime: "2024-01-20T10:00:00",
    isExpense: false,
  },
};

export const Interest: Story = {
  args: {
    historyId: 9,
    category: "INTEREST",
    amount: 10000,
    description: "예금 이자",
    historyDatetime: "2024-01-21T08:00:00",
    isExpense: false,
  },
};

export const Etc: Story = {
  args: {
    historyId: 10,
    category: "ETC",
    amount: 30000,
    description: "기타 지출",
    historyDatetime: "2024-01-22T16:00:00",
    isExpense: true,
  },
};
