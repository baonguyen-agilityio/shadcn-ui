import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello World',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
      <Input disabled placeholder="Disabled input" />
    </div>
  ),
} 