
import { Meta, StoryObj } from "@storybook/react";
import GraphToggle from "../components/atoms/GraphToggle";

const meta: Meta<typeof GraphToggle> = {
    title: "Atom Component/GraphToggle",
    component: GraphToggle,
    tags: ["autodocs"],
    argTypes: {
    initialState: {
            control: {
            type: "radio",
            options: ["bar", "circle"],
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof GraphToggle>;

export const Default: Story = {
    args: {
    initialState: "bar",
    },
};

export const Bar: Story = {
    args: {
    initialState: "bar",
    },
};

export const Circle: Story = {
    args: {
    initialState: "circle",
    },
};
