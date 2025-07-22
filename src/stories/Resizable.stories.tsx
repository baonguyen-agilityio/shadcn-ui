import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="h-screen w-full p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[400px] rounded-lg border"
      >
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Sidebar (25%)</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Main Content (50%)</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Details (25%)</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-screen w-full p-4">
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[400px] rounded-lg border"
      >
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Top Panel (60%)</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Bottom Panel (40%)</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const WithoutHandle: Story = {
  render: () => (
    <div className="h-screen w-full p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[400px] rounded-lg border"
      >
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Left Panel (30%)</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70} minSize={40}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Right Panel (70%)</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <div className="h-screen w-full p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[500px] rounded-lg border"
      >
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Navigation (20%)</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70} minSize={40}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Main Content (70%)</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex h-full items-center justify-center p-6 bg-muted/30">
              <span className="font-semibold">Footer (30%)</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6 bg-muted/50">
            <span className="font-semibold">Sidebar (25%)</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
