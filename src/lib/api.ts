import { strapiClient } from './strapi';

export type CarStatus = 'new' | 'used';

export interface Badge {
  id: number;
  type: string;
  label: string;
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
  async getCars(searchParams: URLSearchParams) {
    return strapiClient.getAll<Car>('cars', searchParams);
  },
};
