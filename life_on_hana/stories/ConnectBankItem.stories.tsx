import { Meta, StoryObj } from "@storybook/react";
import ConnectBankItem from "@/components/molecules/ConnectBankItem";

// Meta 정보 설정
const meta: Meta<typeof ConnectBankItem> = {
  title: "molecule component/ConnectBankItem", 
  component: ConnectBankItem, 
  tags: ["autodocs"], 
  argTypes: {
    bankName: {
      control: "text",
      description: "은행 이름", 
    },
    initialIsMydataChecked: {
      control: "boolean", 
      description: "MyData 체크 여부", 
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectBankItem>;

export const Default: Story = {
  args: {
    bankName: "하나은행",
    initialIsMydataChecked: false, 
  },
};

export const Checked: Story = {
  args: {
    bankName: "하나은행",
    initialIsMydataChecked: true,
  },
};

export const ShinhanBank: Story = {
  args: {
    bankName: "신한은행",
    initialIsMydataChecked: false, 
  },
};

export const KakaoBank: Story = {
  args: {
    bankName: "카카오", 
    initialIsMydataChecked: true,
  },
};
