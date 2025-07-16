"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface Filter {
  id: string;
  label: string;
  value: string;
}

interface ActiveFiltersProps {
  filters: Filter[];
  resultCount?: number;
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  resultCount,
  onRemoveFilter,
  onClearAll,
  className,
}: ActiveFiltersProps) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-between", className)}>
      <div className="flex items-center gap-2">
      <div className="text-sm text-muted-foreground">
        {resultCount !== undefined && (
          <span>Showing {resultCount.toLocaleString()} results</span>
        )}
      </div>

      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 text-sm"
        >
          <Button
            variant="ghost"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => onRemoveFilter(filter.id)}
            aria-label={`Remove ${filter.label} filter`}
          >
            <X size={16} />
          </Button>
          {filter.label}
        </Badge>
      ))}
      </div>

      {filters.length > 0 && (
        <Button
          variant="link"
          onClick={onClearAll}
          className="h-auto px-0 py-0 text-sm text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
