'use client';

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface ResizableLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  sidebarDefaultSize?: number;
  sidebarMinSize?: number;
  sidebarMaxSize?: number;
  contentDefaultSize?: number;
  contentMinSize?: number;
}

export function ResizableLayout({
  sidebar,
  content,
  sidebarDefaultSize = 25,
  sidebarMinSize = 20,
  sidebarMaxSize = 40,
  contentDefaultSize = 75,
  contentMinSize = 60,
}: ResizableLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-2"
        >
          {isSidebarOpen ? (
            <>
              <PanelLeftClose className="h-4 w-4" />
              Hide Filters
            </>
          ) : (
            <>
              <PanelLeftOpen className="h-4 w-4" />
              Show Filters
            </>
          )}
        </Button>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {isSidebarOpen && (
          <div className="mb-4 p-4 border rounded-lg bg-background">
            {sidebar}
          </div>
        )}
        <div className="min-h-[400px]">{content}</div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
          {/* Filters Sidebar */}
          <ResizablePanel
            defaultSize={sidebarDefaultSize}
            minSize={sidebarMinSize}
            maxSize={sidebarMaxSize}
            className="min-w-[280px] max-w-[400px]"
          >
            <div className="pr-6 h-full overflow-y-auto">{sidebar}</div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Listing Grid */}
          <ResizablePanel
            defaultSize={contentDefaultSize}
            minSize={contentMinSize}
            className="min-w-[400px]"
          >
            <div className="pl-6 h-full overflow-y-auto">{content}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
