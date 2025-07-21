'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterLoadingIndicatorProps {
  isDebouncing: boolean;
  className?: string;
}

export function FilterLoadingIndicator({
  isDebouncing,
  className,
}: FilterLoadingIndicatorProps) {
  if (!isDebouncing) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sm text-muted-foreground',
        className
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Updating filters...</span>
    </div>
  );
}
