import { Meta, StoryObj } from "@storybook/react";
import CopyClipboardBtn from "../components/atoms/CopyUrlButton";

const meta: Meta<typeof CopyClipboardBtn> = {
  title: "atom component/CopyClipboardBtn",
  component: CopyClipboardBtn,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CopyClipboardBtn>;

export const Default: Story = {};
