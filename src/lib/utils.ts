import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return `${Math.round(mileage / 1000)}K mi`;
}

export function getCarStatusBadge(status: 'new' | 'used') {
  switch (status) {
    case 'new':
      return { id: 0, type: 'new' as const, label: 'New' };
    case 'used':
      return { id: 1, type: 'used' as const, label: 'Used' };
    default:
      return { id: 1, type: 'used' as const, label: 'Used' };
  }
}
