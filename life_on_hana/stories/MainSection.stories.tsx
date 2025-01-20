import { Meta, StoryObj } from "@storybook/react";
import MainSection from "@/components/molecules/MainSection";

const meta: Meta<typeof MainSection> = {
  title: "molecule component/MainSection",
  component: MainSection,
  tags: ["autodocs"],
  argTypes: {
    name: { type: "string", description: "손님 이름" },
    walletAmount: { type: "number", description: "손님의 하나 월급액" },
  },
};

export default meta;
type Story = StoryObj<typeof MainSection>;

export const Default: Story = {
  args: {
    name: "강재준",
    walletAmount: 300,
  },
};

export const Second: Story = {
  args: {
    name: "장다연",
    walletAmount: 500,
  },
};
