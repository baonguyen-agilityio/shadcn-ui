'use client';

import * as React from 'react';
import { Grid3X3, List, Scale } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from '@/components/ui';
import { CarCard } from './car-card';
import { cn } from '@/lib/utils';

interface Car {
  id: string;
  imageUrl: string;
  title: string;
  year: number;
  price: number;
  date: string;
  location: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  badges?: Array<{
    type: 'used' | 'verified';
    label: string;
  }>;
}

interface ListingGridProps {
  cars: Car[];
  compareCount?: number;
  onCarFavorite?: (carId: string) => void;
  onCarAlert?: (carId: string) => void;
  onCarShare?: (carId: string) => void;
  className?: string;
}

export function ListingGrid({
  cars,
  compareCount = 1,
  onCarFavorite,
  onCarAlert,
  onCarShare,
  className,
}: ListingGridProps) {
  const [viewType, setViewType] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState('popular');

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="year-new">Year: Newest First</SelectItem>
              <SelectItem value="year-old">Year: Oldest First</SelectItem>
              <SelectItem value="mileage">Mileage: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Compare Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Scale className="h-4 w-4" />
            <span>Compare ({compareCount})</span>
          </Button>

          {/* View Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none border-0"
              onClick={() => setViewType('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none border-0"
              onClick={() => setViewType('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Car Grid */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <CarCard
              key={car.id}
              {...car}
              onFavorite={onCarFavorite}
              onAlert={onCarAlert}
              onShare={onCarShare}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cars.map(car => (
            <CarCard
              key={car.id}
              {...car}
              className="flex flex-row max-w-none"
              onFavorite={onCarFavorite}
              onAlert={onCarAlert}
              onShare={onCarShare}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {cars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No cars found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
