import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@/components/ui/slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'object',
    },
    max: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    step: {
      control: 'number',
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
    defaultValue: [50],
    max: 100,
    min: 0,
    step: 1,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    min: 0,
    step: 1,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
}

export const WithSteps: Story = {
  args: {
    defaultValue: [20],
    max: 100,
    min: 0,
    step: 10,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    step: 1,
    disabled: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
}

export const Volume: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <label className="text-sm font-medium">Volume</label>
        <Slider defaultValue={[70]} max={100} min={0} step={1} />
      </div>
      <div>
        <label className="text-sm font-medium">Bass</label>
        <Slider defaultValue={[25]} max={100} min={0} step={1} />
      </div>
      <div>
        <label className="text-sm font-medium">Treble</label>
        <Slider defaultValue={[40]} max={100} min={0} step={1} />
      </div>
    </div>
  ),
} 