import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'checkbox',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox" className="text-sm font-medium leading-none">
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    checked: true,
    id: 'checkbox-checked',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-checked" className="text-sm font-medium leading-none">
        Checked checkbox
      </label>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'checkbox-disabled',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-disabled" className="text-sm font-medium leading-none opacity-70">
        Disabled checkbox
      </label>
    </div>
  ),
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    id: 'checkbox-disabled-checked',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checkbox-disabled-checked" className="text-sm font-medium leading-none opacity-70">
        Disabled checked
      </label>
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms1" />
        <label htmlFor="terms1" className="text-sm font-medium leading-none">
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" defaultChecked />
        <label htmlFor="terms2" className="text-sm font-medium leading-none">
          Subscribe to newsletter
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <label htmlFor="terms3" className="text-sm font-medium leading-none opacity-70">
          Not available
        </label>
      </div>
    </div>
  ),
} 