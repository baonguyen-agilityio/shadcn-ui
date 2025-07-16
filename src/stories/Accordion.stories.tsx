import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if needed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Features</AccordionTrigger>
        <AccordionContent>
          Our platform includes advanced analytics, real-time notifications, and
          seamless integrations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Pricing</AccordionTrigger>
        <AccordionContent>
          We offer flexible pricing plans starting from $9/month with a 30-day
          free trial.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Support</AccordionTrigger>
        <AccordionContent>
          24/7 customer support with live chat, email, and comprehensive
          documentation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      <AccordionItem value="faq-1">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          Simply sign up for an account and follow our onboarding wizard.
          You&apos;ll be up and running in minutes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>
          Can I cancel my subscription anytime?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you can cancel your subscription at any time with no cancellation
          fees. Your account will remain active until the end of your billing
          period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>Do you offer integrations?</AccordionTrigger>
        <AccordionContent>
          We support over 100 integrations including Slack, Google Workspace,
          Microsoft Teams, and many more.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Absolutely. We use enterprise-grade encryption and follow industry
          best practices to keep your data safe and secure.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
