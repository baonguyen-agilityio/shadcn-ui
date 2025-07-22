'use client';

import * as React from 'react';
import { PageHeader } from '@/components/features';
import { Filter } from '@/components/features';
import { useFilters } from '@/lib/hooks';

interface CarsPageHeaderProps {
  breadcrumbs: Array<{ label: string; href?: string }>;
  resultCount?: number;
  initialFilters?: Filter[];
}

export function CarsPageHeader({
  breadcrumbs,
  resultCount,
  initialFilters = [],
}: CarsPageHeaderProps) {
  const { removeFilter, clearAllFilters, isPending } = useFilters();
  const [filters, setFilters] = React.useState<Filter[]>(initialFilters);

  // Update filters when they change from parent
  React.useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <div className="sticky top-16 z-40">
      <PageHeader
        breadcrumbs={breadcrumbs}
        filters={filters}
        resultCount={resultCount}
        onRemoveFilter={removeFilter}
        onClearAll={clearAllFilters}
        isPending={isPending}
      />
    </div>
  );
}
