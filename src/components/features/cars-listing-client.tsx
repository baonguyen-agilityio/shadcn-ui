'use client';

import React from 'react';
import { ListingGrid } from '@/components/features/listing-grid';
import { Car } from '@/lib/api';
import { PAGINATION } from '@/lib/constants';
import { useFilters } from '@/lib/hooks';

interface CarsListingClientProps {
  cars: Car[];
  currentPage?: number;
  totalPages?: number;
}

export function CarsListingClient({
  cars,
  currentPage = PAGINATION.DEFAULT_PAGE,
  totalPages = 1,
}: CarsListingClientProps) {
  const { isPending: isFilterPending } = useFilters();

  return (
    <ListingGrid
      cars={cars}
      compareCount={1}
      currentPage={currentPage}
      totalPages={totalPages}
      isFilterPending={isFilterPending}
    />
  );
}
