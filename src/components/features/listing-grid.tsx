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
import { CarCardSkeleton } from '@/components/ui';

interface ListingGridProps {
  cars: Car[];
  compareCount?: number;
  className?: string;
  currentPage?: number;
  totalPages?: number;
  isFilterPending?: boolean;
}

export function ListingGrid({
  cars,
  compareCount = 1,
  className,
  currentPage = PAGINATION.DEFAULT_PAGE,
  totalPages = 1,
  isFilterPending = false,
}: ListingGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const [viewType, setViewType] = React.useState<'grid' | 'list'>(
    CAR_LISTING.GRID_VIEW
  );
  const [sortBy, setSortBy] = React.useState<string>(CAR_LISTING.DEFAULT_SORT);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);

      if (page === 1) {
        params.delete(URL_PARAMS.PAGE);
      } else {
        params.set(URL_PARAMS.PAGE, page.toString());
      }

      router.replace(`?${params.toString()}`);
    });
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            value={sortBy}
            onValueChange={setSortBy}
            disabled={isFilterPending}
          >
            <SelectTrigger
              className={cn(
                'p-0 border-0 shadow-none bg-transparent hover:bg-transparent min-w-fit text-gray-600 focus-visible:ring-0 focus-visible:outline-none',
                isFilterPending && 'opacity-50 cursor-not-allowed'
              )}
              aria-label="Sort cars by"
            >
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
            className={cn(
              'flex items-center gap-2 text-gray-600 hover:text-gray-600 hover:bg-transparent',
              isFilterPending && 'opacity-50 cursor-not-allowed'
            )}
            disabled={isFilterPending}
          >
            <Repeat className="h-4 w-4" />
            <span>Compare ({compareCount})</span>
          </Button>

          {/* View Toggle */}
          <div className="flex items-center gap-1">
            <Button
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'h-8 w-8 p-0 border-0',
                isFilterPending && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => !isFilterPending && setViewType('grid')}
              disabled={isFilterPending}
              aria-label="Switch to grid view"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'h-8 w-8 p-0 border-0',
                isFilterPending && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => !isFilterPending && setViewType('list')}
              disabled={isFilterPending}
              aria-label="Switch to list view"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Car Grid with Loading Skeletons */}
      {isPending || isFilterPending ? (
        // Show skeleton loading during filter changes or pagination
        viewType === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {Array.from({ length: 6 }, (_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        )
      ) : viewType === 'grid' ? (
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
                  !isPending &&
                  !isFilterPending &&
                  currentPage > 1 &&
                  handlePageChange(currentPage - 1)
                }
                className={cn(
                  currentPage <= 1 || isPending || isFilterPending
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                )}
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
                    onClick={() =>
                      !isPending && !isFilterPending && handlePageChange(page)
                    }
                    isActive={page === currentPage}
                    className={cn(
                      'cursor-pointer',
                      (isPending || isFilterPending) &&
                        'pointer-events-none opacity-50'
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  !isPending &&
                  !isFilterPending &&
                  currentPage < totalPages &&
                  handlePageChange(currentPage + 1)
                }
                className={cn(
                  currentPage >= totalPages || isPending || isFilterPending
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
