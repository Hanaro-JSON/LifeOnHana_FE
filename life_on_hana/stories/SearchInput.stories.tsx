import { Meta, StoryObj } from "@storybook/react";
import SearchInput from "../components/molecules/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "molecule component/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { type: "string" },
    value: { type: "string" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: "검색어 입력하기 전",
  },
};

export const Writing: Story = {
  args: {
    placeholder: "검색어 입력하기 전",
    value: "검색어 입력하고 난 후",
  },
};
