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

export const Default: Story = {
  args: {
    variant: "default", 
  },
};

export const Column: Story = {
  args: {
    variant: "column", 
  },
};

export const Product: Story = {
  args: {
    variant: "product", 
  },
};
