import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Section from "@/components/atoms/Section";

const meta: Meta<typeof Section> = {
  title: "atom component/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    hasShadow: { type: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <p>여기에 컨텐츠가 들어갑니다.</p>
    </Section>
  ),
};

export const NoShadow: Story = {
  render: (args) => (
    <Section {...args}>
      <p>그림자가 없는 버전입니다.</p>
    </Section>
  ),
  args: {
    hasShadow: false,
  },
};
