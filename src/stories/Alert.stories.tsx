import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Info as InfoIcon, AlertTriangle } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your message has been sent successfully.
      </AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is some helpful information for you to know.
      </AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is a destructive alert.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success alert.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an info alert.</AlertDescription>
      </Alert>
    </div>
  ),
} 