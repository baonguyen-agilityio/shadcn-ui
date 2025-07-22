import { strapiClient } from './strapi';
import { formatMileage, getCarStatusBadge } from './utils';
import { PAGINATION } from './constants';

export type CarStatus = 'new' | 'used';

export interface Badge {
  id: number;
  type: string;
  label: string;
}

export interface StrapiCar {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  bodyType: string;
  make: string;
  model: string;
  color: string;
  location: string;
  carStatus: CarStatus;
  badges?: Badge[];
}

export interface Car {
  id: string;
  imageUrl: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  date: string;
  location: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  bodyType: string;
  color: string;
  carStatus: CarStatus;
  badges?: Badge[];
}

export const carApi = {
  async getUsedCars(
    page: number = PAGINATION.DEFAULT_PAGE,
    pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE,
    filters?: {
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
    }
  ) {
    const params: Record<string, string | number> = {
      'filters[carStatus]': 'used',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      sort: 'createdAt:desc',
    };

    if (filters?.location && filters.location !== 'any') {
      params['filters[location][$eq]'] = filters.location;
    }

    if (filters?.bodyTypes) {
      const bodyTypes = filters.bodyTypes.split(',');
      if (bodyTypes.length === 1) {
        params['filters[bodyType][$eq]'] = bodyTypes[0];
      } else {
        bodyTypes.forEach((bodyType, index) => {
          params[`filters[bodyType][$in][${index}]`] = bodyType;
        });
      }
    }

    if (filters?.drivetrains) {
      const drivetrains = filters.drivetrains.split(',');
      if (drivetrains.length === 1) {
        params['filters[drivetrain][$eq]'] = drivetrains[0];
      } else {
        drivetrains.forEach((drivetrain, index) => {
          params[`filters[drivetrain][$in][${index}]`] = drivetrain;
        });
      }
    }

    if (filters?.fuelTypes) {
      const fuelTypes = filters.fuelTypes.split(',');
      if (fuelTypes.length === 1) {
        params['filters[fuelType][$eq]'] = fuelTypes[0];
      } else {
        fuelTypes.forEach((fuelType, index) => {
          params[`filters[fuelType][$in][${index}]`] = fuelType;
        });
      }
    }

    const isDefaultPriceRange =
      filters?.minPrice === '0' && filters?.maxPrice === '120000';

    if (!isDefaultPriceRange) {
      if (filters?.minPrice && filters.minPrice !== '0') {
        const minPrice = Number(filters.minPrice);
        if (!isNaN(minPrice) && minPrice >= 0) {
          params['filters[price][$gte]'] = minPrice;
        }
      }
      if (filters?.maxPrice && filters.maxPrice !== '120000') {
        const maxPrice = Number(filters.maxPrice);
        if (!isNaN(maxPrice) && maxPrice > 0) {
          params['filters[price][$lte]'] = maxPrice;
        }
      }
    }

    if (filters?.yearFrom) {
      const yearFrom = Number(filters.yearFrom);
      if (
        !isNaN(yearFrom) &&
        yearFrom >= 1900 &&
        yearFrom <= new Date().getFullYear()
      ) {
        params['filters[year][$gte]'] = yearFrom;
      }
    }
    if (filters?.yearTo) {
      const yearTo = Number(filters.yearTo);
      if (
        !isNaN(yearTo) &&
        yearTo >= 1900 &&
        yearTo <= new Date().getFullYear()
      ) {
        params['filters[year][$lte]'] = yearTo;
      }
    }

    if (filters?.make && filters.make !== 'any') {
      params['filters[make][$eq]'] = filters.make;
    }

    if (filters?.model && filters.model !== 'any') {
      params['filters[model][$eq]'] = filters.model;
    }

    return strapiClient.getAll<StrapiCar>('cars', params);
  },
};

export function convertStrapiCarToCar(strapiCar: StrapiCar): Car {
  const statusBadge = getCarStatusBadge(strapiCar.carStatus);

  const allBadges = [statusBadge, ...(strapiCar.badges || [])];

  return {
    id: strapiCar.id.toString(),
    imageUrl: strapiCar.imageUrl,
    title: strapiCar.title,
    make: strapiCar.make,
    model: strapiCar.model,
    year: strapiCar.year,
    price: strapiCar.price,
    date: strapiCar.date,
    location: strapiCar.location,
    mileage: formatMileage(strapiCar.mileage),
    fuelType: strapiCar.fuelType,
    transmission: strapiCar.transmission,
    drivetrain: strapiCar.drivetrain,
    bodyType: strapiCar.bodyType,
    color: strapiCar.color,
    carStatus: strapiCar.carStatus,
    badges: allBadges,
  };
}
