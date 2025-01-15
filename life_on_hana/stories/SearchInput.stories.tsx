import { Meta, StoryObj } from "@storybook/react";
import SearchInput from "../components/molecules/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "molecule component/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {},
};
