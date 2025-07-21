'use client';

import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui';
import { ActiveFilters, Filter } from './active-filters';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  filters?: Filter[];
  resultCount?: number;
  onRemoveFilter?: (filterId: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function PageHeader({
  breadcrumbs,
  filters = [],
  resultCount,
  onRemoveFilter,
  onClearAll,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('bg-background border-b', className)}>
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href && index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Active Filters - Full Width */}
      {filters.length > 0 && onRemoveFilter && onClearAll && (
        <div className="w-full">
          <div className="container mx-auto py-4">
            <ActiveFilters
              filters={filters}
              resultCount={resultCount}
              onRemoveFilter={onRemoveFilter}
              onClearAll={onClearAll}
            />
          </div>
        </div>
      )}
    </div>
  );
}
