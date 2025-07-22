'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState, useTransition } from 'react';
import {
  FilterState,
  FilterParams,
  createFilterStateFromParams,
  removeFilterFromParams,
} from '@/lib/filters';

function useDebounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

export function useFilters(debounceDelay: number = 300) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState<Partial<FilterState>>(
    {}
  );

  const currentFilters = useMemo(() => {
    const params: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const filterParams: FilterParams = {
      location: Array.isArray(params.location)
        ? params.location[0]
        : params.location,
      bodyTypes: Array.isArray(params.bodyTypes)
        ? params.bodyTypes[0]
        : params.bodyTypes,
      drivetrains: Array.isArray(params.drivetrains)
        ? params.drivetrains[0]
        : params.drivetrains,
      fuelTypes: Array.isArray(params.fuelTypes)
        ? params.fuelTypes[0]
        : params.fuelTypes,
      minPrice: Array.isArray(params.minPrice)
        ? params.minPrice[0]
        : params.minPrice,
      maxPrice: Array.isArray(params.maxPrice)
        ? params.maxPrice[0]
        : params.maxPrice,
      yearFrom: Array.isArray(params.yearFrom)
        ? params.yearFrom[0]
        : params.yearFrom,
      yearTo: Array.isArray(params.yearTo) ? params.yearTo[0] : params.yearTo,
      make: Array.isArray(params.make) ? params.make[0] : params.make,
      model: Array.isArray(params.model) ? params.model[0] : params.model,
      radius: Array.isArray(params.radius) ? params.radius[0] : params.radius,
      page: Array.isArray(params.page) ? params.page[0] : params.page,
    };

    return createFilterStateFromParams(filterParams);
  }, [searchParams]);

  const updateFiltersImmediate = useCallback(
    (updates: Partial<FilterState>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);

        if (updates.location !== undefined) {
          if (updates.location === 'any') {
            params.delete('location');
          } else {
            params.set('location', updates.location);
          }
        }

        if (updates.radius !== undefined) {
          if (updates.radius === 'any') {
            params.delete('radius');
          } else {
            params.set('radius', updates.radius);
          }
        }

        if (updates.selectedBodyTypes !== undefined) {
          if (updates.selectedBodyTypes.length === 0) {
            params.delete('bodyTypes');
          } else {
            params.set('bodyTypes', updates.selectedBodyTypes.join(','));
          }
        }

        if (updates.selectedDrivetrains !== undefined) {
          if (updates.selectedDrivetrains.length === 0) {
            params.delete('drivetrains');
          } else {
            params.set('drivetrains', updates.selectedDrivetrains.join(','));
          }
        }

        if (updates.selectedFuelTypes !== undefined) {
          if (updates.selectedFuelTypes.length === 0) {
            params.delete('fuelTypes');
          } else {
            params.set('fuelTypes', updates.selectedFuelTypes.join(','));
          }
        }

        if (updates.priceRange !== undefined) {
          const isDefaultRange =
            updates.priceRange[0] === 0 && updates.priceRange[1] === 120000;
          if (isDefaultRange) {
            params.delete('minPrice');
            params.delete('maxPrice');
          } else {
            params.set('minPrice', updates.priceRange[0].toString());
            params.set('maxPrice', updates.priceRange[1].toString());
          }
        }

        if (updates.yearFrom !== undefined) {
          if (updates.yearFrom) {
            params.set('yearFrom', updates.yearFrom.getFullYear().toString());
          } else {
            params.delete('yearFrom');
          }
        }
        if (updates.yearTo !== undefined) {
          if (updates.yearTo) {
            params.set('yearTo', updates.yearTo.getFullYear().toString());
          } else {
            params.delete('yearTo');
          }
        }

        if (updates.selectedMake !== undefined) {
          if (updates.selectedMake === 'any') {
            params.delete('make');
          } else {
            params.set('make', updates.selectedMake);
          }
        }

        if (updates.selectedModel !== undefined) {
          if (updates.selectedModel === 'any') {
            params.delete('model');
          } else {
            params.set('model', updates.selectedModel);
          }
        }

        params.delete('page');

        router.replace(`?${params.toString()}`);
        setIsFilterLoading(false);
      });
    },
    [searchParams, router, startTransition]
  );

  const updateFiltersDebounced = useDebounce(
    (updates: Partial<FilterState>) => {
      updateFiltersImmediate(updates);
    },
    debounceDelay
  );

  const updateFilters = useCallback(
    (updates: Partial<FilterState>, options?: { debounce?: boolean }) => {
      const shouldDebounce = options?.debounce ?? shouldDebounceFilter(updates);

      if (shouldDebounce) {
        setIsFilterLoading(true);
        setPendingUpdates(prev => ({ ...prev, ...updates }));
        updateFiltersDebounced({ ...pendingUpdates, ...updates });
      } else {
        updateFiltersImmediate(updates);
      }
    },
    [updateFiltersDebounced, updateFiltersImmediate, pendingUpdates]
  );

  const removeFilter = useCallback(
    (filterId: string) => {
      startTransition(() => {
        const newParams = removeFilterFromParams(searchParams, filterId);
        router.replace(`?${newParams.toString()}`);
      });
    },
    [searchParams, router, startTransition]
  );

  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      router.replace('/used-cars');
    });
  }, [router, startTransition]);

  return {
    filters: currentFilters,
    updateFilters,
    removeFilter,
    clearAllFilters,
    isPending: isPending || isFilterLoading,
  };
}

function shouldDebounceFilter(updates: Partial<FilterState>): boolean {
  if (updates.priceRange !== undefined) {
    return true;
  }

  return false;
}
