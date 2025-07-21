import { strapiClient } from './strapi';
import { formatMileage, getCarStatusBadge } from './utils';
import { PAGINATION } from './constants';

// Car status enum
export type CarStatus = 'new' | 'used';

// Badge interface
export interface Badge {
  id: number;
  type: string;
  label: string;
}

// Strapi Car interface
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

// Frontend Car interface
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

// Simple car API
export const carApi = {
  // Get used cars with pagination and filters
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
    console.log('API Filters:', filters); // Debug log
    const params: Record<string, string | number> = {
      'filters[carStatus]': 'used',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      sort: 'createdAt:desc',
    };

    // Add location filter only if a specific location is selected (not 'any')
    if (filters?.location && filters.location !== 'any') {
      params['filters[location][$eq]'] = filters.location;
    }

    // Add body type filters
    if (filters?.bodyTypes) {
      const bodyTypes = filters.bodyTypes.split(',');
      if (bodyTypes.length === 1) {
        params['filters[bodyType][$eq]'] = bodyTypes[0];
      } else {
        // For multiple body types, we need to create separate $in parameters
        bodyTypes.forEach((bodyType, index) => {
          params[`filters[bodyType][$in][${index}]`] = bodyType;
        });
      }
    }

    // Add drivetrain filters
    if (filters?.drivetrains) {
      const drivetrains = filters.drivetrains.split(',');
      if (drivetrains.length === 1) {
        params['filters[drivetrain][$eq]'] = drivetrains[0];
      } else {
        // For multiple drivetrains, we need to create separate $in parameters
        drivetrains.forEach((drivetrain, index) => {
          params[`filters[drivetrain][$in][${index}]`] = drivetrain;
        });
      }
    }

    // Add fuel type filters
    if (filters?.fuelTypes) {
      const fuelTypes = filters.fuelTypes.split(',');
      if (fuelTypes.length === 1) {
        params['filters[fuelType][$eq]'] = fuelTypes[0];
      } else {
        // For multiple fuel types, we need to create separate $in parameters
        fuelTypes.forEach((fuelType, index) => {
          params[`filters[fuelType][$in][${index}]`] = fuelType;
        });
      }
    }

    // Add price range filters using $gte and $lte operators
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

    // Add year range filters using $gte and $lte operators
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

    // Add make filter
    if (filters?.make && filters.make !== 'any') {
      params['filters[make][$eq]'] = filters.make;
    }

    // Add model filter
    if (filters?.model && filters.model !== 'any') {
      params['filters[model][$eq]'] = filters.model;
    }

    console.log('Strapi Query Params:', params); // Debug log
    return strapiClient.getAll<StrapiCar>('cars', params);
  },
};

// Convert Strapi car to frontend car
export function convertStrapiCarToCar(strapiCar: StrapiCar): Car {
  // Get the car status badge
  const statusBadge = getCarStatusBadge(strapiCar.carStatus);

  // Combine existing badges with the status badge
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
