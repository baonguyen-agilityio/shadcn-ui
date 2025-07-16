import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Switch } from '@/components/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'switch',
  },
  render: args => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label htmlFor="switch" className="text-sm font-medium">
        Notifications
      </label>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    checked: true,
    id: 'switch-checked',
  },
  render: args => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label htmlFor="switch-checked" className="text-sm font-medium">
        Enabled notifications
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'switch-disabled',
  },
  render: args => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label
        htmlFor="switch-disabled"
        className="text-sm font-medium opacity-70"
      >
        Disabled switch
      </label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    id: 'switch-disabled-checked',
  },
  render: args => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label
        htmlFor="switch-disabled-checked"
        className="text-sm font-medium opacity-70"
      >
        Disabled enabled
      </label>
    </div>
  ),
};

export const MultipleStates: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="airplane" />
        <label htmlFor="airplane" className="text-sm font-medium">
          Airplane Mode
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="wifi" defaultChecked />
        <label htmlFor="wifi" className="text-sm font-medium">
          WiFi
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="bluetooth" />
        <label htmlFor="bluetooth" className="text-sm font-medium">
          Bluetooth
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="location" disabled />
        <label htmlFor="location" className="text-sm font-medium opacity-70">
          Location Services (Premium)
        </label>
      </div>
    </div>
  ),
};
