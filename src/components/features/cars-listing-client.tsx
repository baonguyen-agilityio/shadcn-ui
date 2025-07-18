'use client';

import * as React from 'react';
import { ListingGrid } from '@/components/features/listing-grid';
import { Car } from '@/lib/api';
import { PAGINATION } from '@/lib/constants';

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
  return (
    <ListingGrid
      cars={cars}
      compareCount={1}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
