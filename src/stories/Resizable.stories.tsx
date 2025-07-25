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
        <ResizablePanel defaultSize={75} minSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Main Content (75%)</span>
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
