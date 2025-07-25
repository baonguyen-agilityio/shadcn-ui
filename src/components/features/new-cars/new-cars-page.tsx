import { carApi } from '@/lib/api';
import { CarList } from './car-list';

interface NewCarsPageProps {
  searchParamsAPI: URLSearchParams;
  breadcrumbs: Array<{ label: string; href?: string }>;
}

export async function NewCarsPage({
  searchParamsAPI,
  breadcrumbs,
}: NewCarsPageProps) {
  const cars = await carApi.getCars(searchParamsAPI);

  return (
    <CarList
      cars={cars.data}
      pagination={cars.meta.pagination}
      breadcrumbs={breadcrumbs}
    />
  );
}
