'use client';

import * as React from 'react';
import { PageHeader } from '@/components/features';
import { Filter } from '@/components/features';

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
  const [filters, setFilters] = React.useState<Filter[]>(initialFilters);

  const handleRemoveFilter = (filterId: string) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  return (
    <div className="sticky top-16 z-40">
      <PageHeader
        breadcrumbs={breadcrumbs}
        filters={filters}
        resultCount={resultCount}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
