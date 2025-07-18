'use client';

import * as React from 'react';
import { List, ArrowUpDown, Repeat, LayoutGrid } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PAGINATION, CAR_LISTING, URL_PARAMS } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui';
import { CarCard } from './car-card';
import { cn } from '@/lib/utils';
import { Car } from '@/lib/api';

interface ListingGridProps {
  cars: Car[];
  compareCount?: number;
  className?: string;
  currentPage?: number;
  totalPages?: number;
}

export function ListingGrid({
  cars,
  compareCount = 1,
  className,
  currentPage = PAGINATION.DEFAULT_PAGE,
  totalPages = 1,
}: ListingGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewType, setViewType] = React.useState<'grid' | 'list'>(
    CAR_LISTING.GRID_VIEW
  );
  const [sortBy, setSortBy] = React.useState<string>(CAR_LISTING.DEFAULT_SORT);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      // Remove page parameter for first page (default)
      params.delete(URL_PARAMS.PAGE);
    } else {
      // Set page parameter for other pages
      params.set(URL_PARAMS.PAGE, page.toString());
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="p-0 border-0 shadow-none bg-transparent hover:bg-transparent min-w-fit text-gray-600 focus-visible:ring-0 focus-visible:outline-none">
              <ArrowUpDown className="h-4 w-4" />
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

        <div className="flex items-center gap-3">
          {/* Compare Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-600 hover:bg-transparent"
          >
            <Repeat className="h-4 w-4" />
            <span>Compare ({compareCount})</span>
          </Button>

          {/* View Toggle */}
          <div className="flex items-center gap-1">
            <Button
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0 border-0"
              onClick={() => setViewType('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0 border-0"
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
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cars.map(car => (
            <CarCard key={car.id} {...car} />
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage <= 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              const shouldShow =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!shouldShow) {
                // Show ellipsis for gaps
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={`ellipsis-${page}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
