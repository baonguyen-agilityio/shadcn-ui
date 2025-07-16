'use client';

import * as React from 'react';
import { PageHeader, Filter } from '@/components/features';
import { FiltersSidebar } from '@/components/features/filters-sidebar';
import { ListingGrid } from '@/components/features/listing-grid';

// Sample car data
const sampleCars = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
    title: 'Volvo XC90 Sport 4WD',
    year: 2019,
    price: 43500,
    date: '27/05/2024',
    location: 'Houston',
    mileage: '78K mi',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    badges: [
      { type: 'verified' as const, label: 'Verified' },
      { type: 'used' as const, label: 'Used' },
    ],
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    title: 'Porsche 911 Turbo S',
    year: 2020,
    price: 85500,
    date: '26/05/2024',
    location: 'Chicago',
    mileage: '32K mi',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    badges: [
      { type: 'verified' as const, label: 'Verified' },
      { type: 'used' as const, label: 'Used' },
    ],
  },
  {
    id: '3',
    imageUrl:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
    title: 'Ford Truck Lifted',
    year: 2022,
    price: 63000,
    date: '30/09/2024',
    location: 'Boston',
    mileage: '17K mi',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    badges: [{ type: 'used' as const, label: 'Used' }],
  },
  {
    id: '4',
    imageUrl:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    title: 'Mercedes-Benz A205',
    year: 2021,
    price: 41900,
    date: '15/07/2024',
    location: 'Chicago',
    mileage: '60K mi',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    badges: [{ type: 'used' as const, label: 'Used' }],
  },
  {
    id: '5',
    imageUrl:
      'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop',
    title: 'Mercedes-Benz Coupe',
    year: 2021,
    price: 115400,
    date: '23/04/2024',
    location: 'New York',
    mileage: '15K mi',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    badges: [
      { type: 'verified' as const, label: 'Verified' },
      { type: 'used' as const, label: 'Used' },
    ],
  },
  {
    id: '6',
    imageUrl:
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
    title: 'Maserati Granturismo',
    year: 2020,
    price: 73000,
    date: '28/08/2024',
    location: 'Dallas',
    mileage: '58K mi',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    badges: [
      { type: 'verified' as const, label: 'Verified' },
      { type: 'used' as const, label: 'Used' },
    ],
  },
  {
    id: '7',
    imageUrl:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    title: 'Tesla Model 3',
    year: 2023,
    price: 36200,
    date: '19/10/2024',
    location: 'Los Angeles',
    mileage: '13K mi',
    fuelType: 'Electric',
    transmission: 'Automatic',
    badges: [{ type: 'used' as const, label: 'Used' }],
  },
  {
    id: '8',
    imageUrl:
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop',
    title: 'Toyota Yaris GR Sport',
    year: 2021,
    price: 28600,
    date: '02/08/2024',
    location: 'San Jose',
    mileage: '21K mi',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    badges: [{ type: 'used' as const, label: 'Used' }],
  },
  {
    id: '9',
    imageUrl:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=300&fit=crop',
    title: 'Mitsubishi Pajero Sport',
    year: 2019,
    price: 33500,
    date: '13/07/2024',
    location: 'Phoenix',
    mileage: '57K mi',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    badges: [
      { type: 'verified' as const, label: 'Verified' },
      { type: 'used' as const, label: 'Used' },
    ],
  },
];

export default function UsedCarsPage() {
  const [filters, setFilters] = React.useState<Filter[]>([
    { id: '1', label: 'Sedan', value: 'sedan' },
    { id: '2', label: 'SUV', value: 'suv' },
    { id: '3', label: 'Coupe', value: 'coupe' },
    { id: '4', label: 'Under 2023', value: 'under-2023' },
    { id: '5', label: '$17,000 - $120,000', value: 'price-range' },
  ]);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Used cars' }];

  const handleRemoveFilter = (filterId: string) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  const handleCarFavorite = (carId: string) => {
    console.log('Favorited car:', carId);
  };

  const handleCarAlert = (carId: string) => {
    console.log('Set alert for car:', carId);
  };

  const handleCarShare = (carId: string) => {
    console.log('Share car:', carId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header - Full Width */}
      <div className="sticky top-16 z-40">
        <PageHeader
          breadcrumbs={breadcrumbs}
          filters={filters}
          resultCount={142}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto py-6">
        <div className="flex gap-12">
          {/* Filters Sidebar */}
          <FiltersSidebar className="w-80 shrink-0" />

          {/* Listing Grid */}
          <div className="flex-1 min-w-0">
            <ListingGrid
              cars={sampleCars}
              compareCount={1}
              onCarFavorite={handleCarFavorite}
              onCarAlert={handleCarAlert}
              onCarShare={handleCarShare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
