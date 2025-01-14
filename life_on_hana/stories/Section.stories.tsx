import { Meta, StoryObj } from "@storybook/react";
import Section from "../components/atoms/Section";


const meta: Meta<typeof Section> = {
    title: 'atom component/Section',
    component: Section,
    tags: ["autodocs"],
    argTypes: {
    shadow: { type: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
    args: {
    },
}

export const NoShadow: Story = {
    args: {
        shadow: false,
    },
}