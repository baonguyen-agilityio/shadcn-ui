import { Metadata } from 'next';
import { NewCarsPage } from '@/components/features/new-cars/new-cars-page';
import { PAGINATION } from '@/lib/constants';
import {
  buildNewCarsStrapiFilters,
  NEW_CARS_SORT_OPTIONS,
  NEW_CARS_BREADCRUMBS,
} from '@/lib/new-cars-utils';

export const metadata: Metadata = {
  title: 'New Cars | Find Your Perfect New Vehicle',
  description:
    'Browse our extensive collection of new cars. Find the perfect new vehicle with advanced search filters.',
  keywords: 'new cars, car dealership, buy new car, automotive',
};

interface NewCarsSearchParams {
  page?: string;
  location?: string;
  make?: string;
  model?: string;
  sort?: string;
  bodyTypes?: string;
  drivetrains?: string;
  fuelTypes?: string;
}

interface NewCarsPageProps {
  searchParams: Promise<NewCarsSearchParams>;
}

function parseSearchParams(params: NewCarsSearchParams) {
  return {
    page: params.page || PAGINATION.DEFAULT_PAGE.toString(),
    location: params.location || '',
    make: params.make || '',
    model: params.model || '',
    sort: params.sort || 'popular',
    bodyTypes: params.bodyTypes || '',
    drivetrains: params.drivetrains || '',
    fuelTypes: params.fuelTypes || '',
  };
}

function buildAPISearchParams(filters: ReturnType<typeof parseSearchParams>) {
  const searchParamsAPI = buildNewCarsStrapiFilters({
    location: filters.location,
    make: filters.make,
    model: filters.model,
    bodyTypes: filters.bodyTypes,
    drivetrains: filters.drivetrains,
    fuelTypes: filters.fuelTypes,
  });

  const pageNumber = Math.max(
    1,
    parseInt(filters.page, 10) || PAGINATION.DEFAULT_PAGE
  );
  searchParamsAPI.set('pagination[page]', pageNumber.toString());
  searchParamsAPI.set(
    'pagination[pageSize]',
    PAGINATION.DEFAULT_PAGE_SIZE.toString()
  );

  const sortValue =
    NEW_CARS_SORT_OPTIONS[filters.sort as keyof typeof NEW_CARS_SORT_OPTIONS] ||
    NEW_CARS_SORT_OPTIONS.popular;
  searchParamsAPI.set('sort', sortValue);

  return searchParamsAPI;
}

export default async function NewCars({ searchParams }: NewCarsPageProps) {
  const rawParams = await searchParams;
  const parsedParams = parseSearchParams(rawParams);
  const apiSearchParams = buildAPISearchParams(parsedParams);

  return (
    <NewCarsPage
      searchParamsAPI={apiSearchParams}
      breadcrumbs={NEW_CARS_BREADCRUMBS}
    />
  );
}
