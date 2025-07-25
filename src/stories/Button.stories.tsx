import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Settings } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Launch rocket">
        🚀
      </Button>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon" aria-label="Add to favorites">
        <Heart className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add new item">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" aria-label="Open settings">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Good Examples (Accessible)</h3>
        <div className="flex gap-2">
          <Button aria-label="Save document">
            <Plus className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="icon" aria-label="Delete item">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Screen Reader Text</h3>
        <div className="flex gap-2">
          <Button size="icon" aria-label="Open settings menu">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Add new item to list">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
