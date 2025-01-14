import { Meta, StoryObj } from "@storybook/react";
import Section from "../components/atoms/Section";


const meta: Meta<typeof Section> = {
    title: 'atom component/Section',
    component: Section,
    tags: ["autodocs"],
    argTypes: {
<<<<<<< HEAD
    shadow: { type: "boolean" },
=======
    hasShadow: { type: "boolean" },
>>>>>>> 2fcc33b ([feat] 🐣 Section 추가)
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
<<<<<<< HEAD
        shadow: false,
=======
        hasShadow: false,
>>>>>>> 2fcc33b ([feat] 🐣 Section 추가)
    },
}