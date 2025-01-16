import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CarouselSection from "../components/atoms/CarouselSection";

const meta: Meta<typeof CarouselSection> = {
  title: "atom component/CarouselSection",
  component: CarouselSection,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "column", "product"] },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselSection>;

const DummyItems = [
  <div key="1" style={{ padding: "20px", background: "#f0f0f0" }}>
    Item 1
  </div>,
  <div key="2" style={{ padding: "20px", background: "#e0e0e0" }}>
    Item 2
  </div>,
  <div key="3" style={{ padding: "20px", background: "#d0d0d0" }}>
    Item 3
  </div>,
];

export const Default: Story = {
  render: (args) => <CarouselSection {...args} items={DummyItems} />,
  args: {
    variant: "default",
  },
};

export const Column: Story = {
  render: (args) => <CarouselSection {...args} items={DummyItems} />,
  args: {
    variant: "column",
  },
};

export const Product: Story = {
  render: (args) => <CarouselSection {...args} items={DummyItems} />,
  args: {
    variant: "product",
  },
};
