import { Meta, StoryObj } from "@storybook/react";
import LoginLabelInput from "../components/molecules/LoginLabelInput";

const meta: Meta<typeof LoginLabelInput> = {
  title: "Molecule component/LoginLabelInput",
  component: LoginLabelInput,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    id: {
      control: "text",
    },
    type: {
      control: {
        type: "select",
        options: ["text", "password"],
      },
    },
    name: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    errorMsg: {
      control: "text",
      description: "id 혹은 pw를 입력하세요.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginLabelInput>;

export const Default: Story = {
  args: {
    label: "id",
    id: "id",
    type: "text",
    name: "id",
    placeholder: "id를 입력하세요.",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    id: "pw",
    type: "password",
    name: "pw",
    placeholder: "pw를 입력하세요.",
  },
};
