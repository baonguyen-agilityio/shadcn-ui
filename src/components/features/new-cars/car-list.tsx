'use client';

import { Suspense, useCallback, useMemo, useTransition, useState } from 'react';
import { Car } from '@/lib/api';
import { CarCard } from '../car-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
  CarCardSkeleton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from '@/components/ui';
import { PAGINATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ResizableLayout } from '../resizable-layout';
import { FiltersSidebar } from '../filters-sidebar';
import { useCarFilter } from '@/lib/hooks';
import { PageHeader } from '../page-header';
import { ArrowUpDown, Repeat, LayoutGrid, List } from 'lucide-react';

export function CarList({
  cars,
  pagination,
  breadcrumbs,
}: {
  cars: Car[];
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  breadcrumbs: Array<{ label: string; href?: string }>;
}) {
  const [isPaginationPending, startPaginationTransition] = useTransition();
  const [isSortPending, startSortTransition] = useTransition();
  const searchParams = useSearchParams() ?? '';
  const pathname = usePathname();
  const { replace } = useRouter();

  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [compareCount] = useState(0);

  const currentSort = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return params.get('sort') || 'popular';
  }, [searchParams]);

  const {
    currentLocation,
    currentMake,
    currentModel,
    currentBodyTypes,
    currentDrivetrains,
    currentFuelTypes,
    isPending: isFilterPending,
    handleLocationChange,
    handleMakeChange,
    handleModelChange,
    handleBodyTypeChange,
    handleDrivetrainChange,
    handleFuelTypeChange,
    handleRemoveFilter,
    handleClearAllFilters,
    activeFilters,
  } = useCarFilter();

  const currentPage = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return Number(params.get('page')) || PAGINATION.DEFAULT_PAGE;
  }, [searchParams]);

  const totalPages = Number(pagination?.pageCount) || PAGINATION.DEFAULT_PAGE;
  const totalCars = pagination?.total || 0;

  const handlePageChange = useCallback(
    (page: number) => {
      startPaginationTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (page === 1) {
          params.delete('page');
        } else {
          params.set('page', `${page}`);
        }
        replace(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    [pathname, replace, searchParams]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      startSortTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (value !== 'popular') {
          params.set('sort', value);
        } else {
          params.delete('sort');
        }
        params.delete('page');
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, replace, searchParams]
  );

  const isPending = isFilterPending || isPaginationPending || isSortPending;

  const MainContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            value={currentSort}
            onValueChange={handleSortChange}
            disabled={isFilterPending}
          >
            <SelectTrigger
              className={cn(
                'p-0 border-0 shadow-none bg-transparent hover:bg-transparent min-w-fit text-gray-600 focus-visible:ring-0 focus-visible:outline-none',
                isFilterPending && 'opacity-50 cursor-not-allowed'
              )}
            >
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="year_new">Year: Newest First</SelectItem>
              <SelectItem value="year_old">Year: Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'flex items-center gap-2 text-gray-600 hover:text-gray-600 hover:bg-transparent',
              isFilterPending && 'opacity-50 cursor-not-allowed'
            )}
            disabled={isFilterPending}
            aria-label={`Compare selected cars (${compareCount} ${compareCount === 1 ? 'car' : 'cars'} selected)`}
          >
            <Repeat className="h-4 w-4" />
            <span>Compare ({compareCount})</span>
          </Button>

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
              aria-pressed={viewType === 'grid'}
            >
              <LayoutGrid className="h-4 w-4" />
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
              aria-pressed={viewType === 'list'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isPending ? (
          <div
            className={cn(
              viewType === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            )}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <CarCardSkeleton key={index} variant={viewType} />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              viewType === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            )}
          >
            {cars.map(car => (
              <CarCard key={car.id} {...car} variant={viewType} />
            ))}
          </div>
        )}

        {cars.length === 0 && !isPending && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No cars found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {pagination && pagination.pageCount > 1 && (
        <div className="flex justify-center">
          <Suspense
            fallback={
              <div className="w-64 h-10 bg-gray-200 animate-pulse rounded" />
            }
          >
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      !isPaginationPending &&
                      currentPage > 1 &&
                      handlePageChange(currentPage - 1)
                    }
                    className={cn(
                      currentPage <= 1 || isPaginationPending
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    )}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => {
                    const shouldShow =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (!shouldShow) {
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
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
                            !isPaginationPending && handlePageChange(page)
                          }
                          isActive={page === currentPage}
                          className={cn(
                            'cursor-pointer',
                            isPaginationPending &&
                              'pointer-events-none opacity-50'
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      !isPaginationPending &&
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className={cn(
                      currentPage >= totalPages || isPaginationPending
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Suspense>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={<div className="min-h-screen bg-background animate-pulse" />}
      >
        <PageHeader
          breadcrumbs={breadcrumbs}
          filters={activeFilters}
          resultCount={totalCars}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
          isPending={isPending}
        />

        <div className="container mx-auto py-4">
          <ResizableLayout
            sidebar={
              <FiltersSidebar
                carType="new"
                currentLocation={currentLocation}
                currentMake={currentMake}
                currentModel={currentModel}
                currentBodyTypes={currentBodyTypes}
                currentDrivetrains={currentDrivetrains}
                currentFuelTypes={currentFuelTypes}
                onLocationChange={handleLocationChange}
                onMakeChange={handleMakeChange}
                onModelChange={handleModelChange}
                isPending={isFilterPending}
                onBodyTypeChange={handleBodyTypeChange}
                onDrivetrainChange={handleDrivetrainChange}
                onFuelTypeChange={handleFuelTypeChange}
              />
            }
            content={<MainContent />}
          />
        </div>
      </Suspense>
    </div>
  );
}
