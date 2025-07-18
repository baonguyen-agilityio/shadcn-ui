import {
  FiltersSidebar,
  CarsListingClient,
  CarsPageHeader,
} from '@/components/features';
import { carApi, convertStrapiCarToCar } from '@/lib/api';
import { PAGINATION } from '@/lib/constants';

interface UsedCarsPageProps {
  searchParams: Promise<{
    page?: string;
    location?: string;
  }>;
}

export default async function UsedCarsPage({
  searchParams,
}: UsedCarsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || PAGINATION.DEFAULT_PAGE;
  const pageSize = PAGINATION.DEFAULT_PAGE_SIZE;

  // Parse location filter from URL
  const location = params.location || 'any';

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Used cars' }];

  // Fetch cars data
  const cars = await carApi.getUsedCars(currentPage, pageSize, { location });
  const carsData = cars.data.map(car => convertStrapiCarToCar(car));

  // Pagination data
  const totalPages = cars.meta.pagination?.pageCount || 1;
  const totalCars = cars.meta.pagination?.total || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <CarsPageHeader breadcrumbs={breadcrumbs} resultCount={totalCars} />

      {/* Main Content Area */}
      <div className="container mx-auto py-6">
        <div className="flex gap-12">
          {/* Filters Sidebar */}
          <div className="w-80 shrink-0">
            <FiltersSidebar selectedLocation={location} />
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
    </div>
  );
}
