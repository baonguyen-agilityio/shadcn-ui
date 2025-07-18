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
  // Get used cars with pagination and location filter
  async getUsedCars(
    page: number = PAGINATION.DEFAULT_PAGE,
    pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE,
    filters?: {
      location?: string;
    }
  ) {
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
