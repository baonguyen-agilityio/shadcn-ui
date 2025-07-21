import {
  FiltersSidebar,
  CarsListingClient,
  CarsPageHeader,
} from '@/components/features';
import { carApi, convertStrapiCarToCar } from '@/lib/api';
import { PAGINATION } from '@/lib/constants';
import { parseFilterParams, buildActiveFilters } from '@/lib/filters';
import { Suspense } from 'react';

// Force dynamic rendering to avoid SSR issues with useSearchParams
export const dynamic = 'force-dynamic';

interface UsedCarsPageProps {
  searchParams: Promise<{
    page?: string;
    location?: string;
    bodyTypes?: string;
    drivetrains?: string;
    fuelTypes?: string;
    minPrice?: string;
    maxPrice?: string;
    yearFrom?: string;
    yearTo?: string;
    make?: string;
    model?: string;
    radius?: string;
  }>;
}

export default async function UsedCarsPage({
  searchParams,
}: UsedCarsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || PAGINATION.DEFAULT_PAGE;
  const pageSize = PAGINATION.DEFAULT_PAGE_SIZE;

  // Parse and validate filter parameters
  const filterParams = parseFilterParams(params);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Used cars' }];

  // Build active filters for display
  const activeFilters = buildActiveFilters(filterParams);

  // Fetch cars data with filters
  const cars = await carApi.getUsedCars(currentPage, pageSize, filterParams);
  const carsData = cars.data.map(car => convertStrapiCarToCar(car));

  // Pagination data
  const totalPages = cars.meta.pagination?.pageCount || 1;
  const totalCars = cars.meta.pagination?.total || 0;

  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={<div className="min-h-screen bg-background animate-pulse" />}
      >
        {/* Page Header */}
        <CarsPageHeader
          breadcrumbs={breadcrumbs}
          resultCount={totalCars}
          initialFilters={activeFilters}
        />

        {/* Main Content Area */}
        <div className="container mx-auto py-6">
          <div className="flex gap-12">
            {/* Filters Sidebar */}
            <div className="w-80 shrink-0">
              <FiltersSidebar />
            </div>

            {/* Listing Grid */}
            <div className="flex-1 min-w-0">
              <CarsListingClient
                cars={carsData}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
