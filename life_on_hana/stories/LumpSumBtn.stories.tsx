import { Meta, StoryObj } from "@storybook/react";
import LumpSumBtn from "../components/molecules/LumpSumBtn";

const meta: Meta<typeof LumpSumBtn> = {
  title: "molecule component/LumpSumBtn",
  component: LumpSumBtn,
  tags: ["autodocs"],
  argTypes: {
    variant: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof LumpSumBtn>;

export const HanaSalaryBank: Story = {
  args: {
    variant: "hanaSalaryBank",
  },
};

export const OtherAccounts: Story = {
  args: {
    variant: "otherAccounts",
  },
};

export const LoanProducts: Story = {
  args: {
    variant: "loanProducts",
  },
};
