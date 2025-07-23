interface NewCarsFilterParams {
  location?: string;
  make?: string;
  model?: string;
  bodyTypes?: string;
  drivetrains?: string;
  fuelTypes?: string;
}

export function buildNewCarsStrapiFilters(
  params: NewCarsFilterParams
): URLSearchParams {
  const searchParamsAPI = new URLSearchParams();

  searchParamsAPI.set('populate', '*');

  if (params.location && params.location.trim() !== '') {
    searchParamsAPI.set('filters[location][$eq]', params.location.trim());
  }

  if (params.make && params.make.trim() !== '' && params.make !== 'any') {
    searchParamsAPI.set('filters[make][$eq]', params.make.trim());
  }

  if (params.model && params.model.trim() !== '' && params.model !== 'any') {
    searchParamsAPI.set('filters[model][$eq]', params.model.trim());
  }

  if (params.bodyTypes && params.bodyTypes.trim() !== '') {
    const bodyTypesArray = params.bodyTypes.split(',').filter(Boolean);
    if (bodyTypesArray.length === 1) {
      searchParamsAPI.set('filters[bodyType][$eq]', bodyTypesArray[0]);
    } else if (bodyTypesArray.length > 1) {
      bodyTypesArray.forEach((bodyType, index) => {
        searchParamsAPI.set(`filters[bodyType][$in][${index}]`, bodyType);
      });
    }
  }

  if (params.drivetrains && params.drivetrains.trim() !== '') {
    const drivetrainsArray = params.drivetrains.split(',').filter(Boolean);
    if (drivetrainsArray.length === 1) {
      searchParamsAPI.set('filters[drivetrain][$eq]', drivetrainsArray[0]);
    } else if (drivetrainsArray.length > 1) {
      drivetrainsArray.forEach((drivetrain, index) => {
        searchParamsAPI.set(`filters[drivetrain][$in][${index}]`, drivetrain);
      });
    }
  }

  if (params.fuelTypes && params.fuelTypes.trim() !== '') {
    const fuelTypesArray = params.fuelTypes.split(',').filter(Boolean);
    if (fuelTypesArray.length === 1) {
      searchParamsAPI.set('filters[fuelType][$eq]', fuelTypesArray[0]);
    } else if (fuelTypesArray.length > 1) {
      fuelTypesArray.forEach((fuelType, index) => {
        searchParamsAPI.set(`filters[fuelType][$in][${index}]`, fuelType);
      });
    }
  }

  return searchParamsAPI;
}

export const NEW_CARS_SORT_OPTIONS = {
  popular: 'createdAt:desc',
  price_low: 'price:asc',
  price_high: 'price:desc',
  year_new: 'year:desc',
  year_old: 'year:asc',
} as const;

export const NEW_CARS_BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'New cars' },
];
