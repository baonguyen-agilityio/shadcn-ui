import { Filter } from '@/components/features/active-filters';

export interface FilterParams {
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
  page?: string;
}

export interface FilterState {
  location: string;
  radius: string;
  selectedBodyTypes: string[];
  selectedDrivetrains: string[];
  selectedFuelTypes: string[];
  priceRange: [number, number];
  yearFrom?: Date;
  yearTo?: Date;
  selectedMake: string;
  selectedModel: string;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  location: 'any',
  radius: 'any',
  selectedBodyTypes: [],
  selectedDrivetrains: [],
  selectedFuelTypes: [],
  priceRange: [0, 0],
  selectedMake: 'any',
  selectedModel: 'any',
};

export function parseFilterParams(
  params: Record<string, string | string[] | undefined>
): FilterParams {
  return {
    location: Array.isArray(params.location)
      ? params.location[0]
      : params.location,
    bodyTypes: Array.isArray(params.bodyTypes)
      ? params.bodyTypes[0]
      : params.bodyTypes,
    drivetrains: Array.isArray(params.drivetrains)
      ? params.drivetrains[0]
      : params.drivetrains,
    fuelTypes: Array.isArray(params.fuelTypes)
      ? params.fuelTypes[0]
      : params.fuelTypes,
    minPrice: Array.isArray(params.minPrice)
      ? params.minPrice[0]
      : params.minPrice,
    maxPrice: Array.isArray(params.maxPrice)
      ? params.maxPrice[0]
      : params.maxPrice,
    yearFrom: Array.isArray(params.yearFrom)
      ? params.yearFrom[0]
      : params.yearFrom,
    yearTo: Array.isArray(params.yearTo) ? params.yearTo[0] : params.yearTo,
    make: Array.isArray(params.make) ? params.make[0] : params.make,
    model: Array.isArray(params.model) ? params.model[0] : params.model,
    radius: Array.isArray(params.radius) ? params.radius[0] : params.radius,
    page: Array.isArray(params.page) ? params.page[0] : params.page,
  };
}

export function buildActiveFilters(params: FilterParams): Filter[] {
  const filters: Filter[] = [];

  if (params.location && params.location !== 'any') {
    filters.push({
      id: 'location',
      label: `Location: ${params.location}`,
      value: params.location,
    });
  }

  if (params.bodyTypes) {
    const types = params.bodyTypes.split(',');
    types.forEach(type => {
      if (type && type !== 'any') {
        filters.push({
          id: `bodyType-${type}`,
          label: `Body Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          value: type,
        });
      }
    });
  }

  if (params.drivetrains) {
    const types = params.drivetrains.split(',');
    types.forEach(type => {
      if (type && type !== 'any') {
        filters.push({
          id: `drivetrain-${type}`,
          label: `Drivetrain: ${type.toUpperCase()}`,
          value: type,
        });
      }
    });
  }

  if (params.fuelTypes) {
    const types = params.fuelTypes.split(',');
    types.forEach(type => {
      if (type && type !== 'any') {
        filters.push({
          id: `fuel-${type}`,
          label: `Fuel: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          value: type,
        });
      }
    });
  }

  if (
    params.minPrice &&
    params.maxPrice &&
    (params.minPrice !== '0' || params.maxPrice !== '120000')
  ) {
    filters.push({
      id: 'price-range',
      label: `Price: $${Number(params.minPrice).toLocaleString()} - $${Number(params.maxPrice).toLocaleString()}`,
      value: `${params.minPrice}-${params.maxPrice}`,
    });
  }

  if (params.yearFrom || params.yearTo) {
    const label =
      params.yearFrom && params.yearTo
        ? `Year: ${params.yearFrom} - ${params.yearTo}`
        : params.yearFrom
          ? `Year: From ${params.yearFrom}`
          : `Year: Up to ${params.yearTo}`;
    filters.push({
      id: 'year-range',
      label,
      value: `${params.yearFrom || ''}-${params.yearTo || ''}`,
    });
  }

  if (params.make && params.make !== 'any') {
    filters.push({
      id: 'make',
      label: `Make: ${params.make.charAt(0).toUpperCase() + params.make.slice(1)}`,
      value: params.make,
    });
  }

  if (params.model && params.model !== 'any') {
    filters.push({
      id: 'model',
      label: `Model: ${params.model.charAt(0).toUpperCase() + params.model.slice(1)}`,
      value: params.model,
    });
  }

  if (params.radius && params.radius !== 'any') {
    filters.push({
      id: 'radius',
      label: `Radius: ${params.radius} miles`,
      value: params.radius,
    });
  }

  return filters;
}

export function createFilterStateFromParams(params: FilterParams): FilterState {
  return {
    location: params.location || 'any',
    radius: params.radius || 'any',
    selectedBodyTypes: params.bodyTypes
      ? params.bodyTypes.split(',').filter(t => t !== 'any')
      : [],
    selectedDrivetrains: params.drivetrains
      ? params.drivetrains.split(',').filter(t => t !== 'any')
      : [],
    selectedFuelTypes: params.fuelTypes
      ? params.fuelTypes.split(',').filter(t => t !== 'any')
      : [],
    priceRange:
      params.minPrice && params.maxPrice
        ? [Number(params.minPrice), Number(params.maxPrice)]
        : [0, 120000],
    yearFrom: params.yearFrom
      ? new Date(Number(params.yearFrom), 0, 1)
      : undefined,
    yearTo: params.yearTo ? new Date(Number(params.yearTo), 0, 1) : undefined,
    selectedMake: params.make || 'any',
    selectedModel: params.model || 'any',
  };
}

export function removeFilterFromParams(
  currentParams: URLSearchParams,
  filterId: string
): URLSearchParams {
  const params = new URLSearchParams(currentParams);

  if (filterId === 'location') {
    params.delete('location');
  } else if (filterId.startsWith('bodyType-')) {
    const bodyType = filterId.replace('bodyType-', '');
    const currentBodyTypes =
      params
        .get('bodyTypes')
        ?.split(',')
        .filter(t => t !== bodyType) || [];
    if (currentBodyTypes.length > 0) {
      params.set('bodyTypes', currentBodyTypes.join(','));
    } else {
      params.delete('bodyTypes');
    }
  } else if (filterId.startsWith('drivetrain-')) {
    const drivetrain = filterId.replace('drivetrain-', '');
    const currentDrivetrains =
      params
        .get('drivetrains')
        ?.split(',')
        .filter(t => t !== drivetrain) || [];
    if (currentDrivetrains.length > 0) {
      params.set('drivetrains', currentDrivetrains.join(','));
    } else {
      params.delete('drivetrains');
    }
  } else if (filterId.startsWith('fuel-')) {
    const fuelType = filterId.replace('fuel-', '');
    const currentFuelTypes =
      params
        .get('fuelTypes')
        ?.split(',')
        .filter(t => t !== fuelType) || [];
    if (currentFuelTypes.length > 0) {
      params.set('fuelTypes', currentFuelTypes.join(','));
    } else {
      params.delete('fuelTypes');
    }
  } else if (filterId === 'price-range') {
    params.delete('minPrice');
    params.delete('maxPrice');
  } else if (filterId === 'year-range') {
    params.delete('yearFrom');
    params.delete('yearTo');
  } else if (filterId === 'make') {
    params.delete('make');
  } else if (filterId === 'model') {
    params.delete('model');
  } else if (filterId === 'radius') {
    params.delete('radius');
  }

  // Reset to page 1 when filters change
  params.delete('page');

  return params;
}
