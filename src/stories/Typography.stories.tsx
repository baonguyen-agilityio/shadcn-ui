import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Typography } from '@/components/ui/typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'large', 'small', 'muted'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children:
      'This is paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'This is large text for emphasis.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is small text',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="p">
        Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="large">
        Large: This is large text for emphasis
      </Typography>
      <Typography variant="small">Small: This is small text</Typography>
      <Typography variant="muted">Muted: This is muted text</Typography>
    </div>
  ),
};
