import { Meta, StoryObj } from "@storybook/react";
<<<<<<< HEAD
<<<<<<< HEAD
import CopyClipboardBtn from "../components/atoms/CopyUrlButton";
=======
import CopyClipboardBtn from "@/components/atoms/CopyClipboardBtn";
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
import CopyClipboardBtn from "../components/atoms/CopyUrlButton";
>>>>>>> 0b1551a ([feat] 🐣 columnDetail 페이지 추가)

const meta: Meta<typeof CopyClipboardBtn> = {
  title: "atom component/CopyClipboardBtn",
  component: CopyClipboardBtn,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CopyClipboardBtn>;

export const Default: Story = {};
