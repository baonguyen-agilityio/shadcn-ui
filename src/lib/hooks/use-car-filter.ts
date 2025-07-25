'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface Filter {
  id: string;
  label: string;
  value: string;
}

export interface CarFilterState {
  currentLocation: string;
  currentMake: string;
  currentModel: string;
  currentBodyTypes: string[];
  currentDrivetrains: string[];
  currentFuelTypes: string[];
  activeFilters: Filter[];
}

export interface CarFilterHandlers {
  handleLocationChange: (value: string) => void;
  handleMakeChange: (value: string) => void;
  handleModelChange: (value: string) => void;
  handleBodyTypeChange: (bodyTypes: string[]) => void;
  handleDrivetrainChange: (drivetrains: string[]) => void;
  handleFuelTypeChange: (fuelTypes: string[]) => void;
  handleRemoveFilter: (filterId: string) => void;
  handleClearAllFilters: () => void;
}

export interface CarFilterReturn extends CarFilterState, CarFilterHandlers {
  isPending: boolean;
}

export function useCarFilter(): CarFilterReturn {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleReplaceURL = useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    [pathname, replace, startTransition]
  );

  const currentLocation = useMemo(() => {
    if (!searchParams) return 'any';
    const params = new URLSearchParams(searchParams);
    return params.get('location') || 'any';
  }, [searchParams]);

  const currentMake = useMemo(() => {
    if (!searchParams) return 'any';
    const params = new URLSearchParams(searchParams);
    return params.get('make') || 'any';
  }, [searchParams]);

  const currentModel = useMemo(() => {
    if (!searchParams) return 'any';
    const params = new URLSearchParams(searchParams);
    return params.get('model') || 'any';
  }, [searchParams]);

  const currentBodyTypes = useMemo(() => {
    if (!searchParams) return [];
    const params = new URLSearchParams(searchParams);
    const bodyTypes = params.get('bodyTypes');
    return bodyTypes ? bodyTypes.split(',') : [];
  }, [searchParams]);

  const currentDrivetrains = useMemo(() => {
    if (!searchParams) return [];
    const params = new URLSearchParams(searchParams);
    const drivetrains = params.get('drivetrains');
    return drivetrains ? drivetrains.split(',') : [];
  }, [searchParams]);

  const currentFuelTypes = useMemo(() => {
    if (!searchParams) return [];
    const params = new URLSearchParams(searchParams);
    const fuelTypes = params.get('fuelTypes');
    return fuelTypes ? fuelTypes.split(',') : [];
  }, [searchParams]);

  const activeFilters = useMemo(() => {
    const filters: Filter[] = [];

    if (currentLocation && currentLocation !== 'any') {
      filters.push({
        id: 'location',
        label: `Location: ${currentLocation}`,
        value: currentLocation,
      });
    }

    if (currentMake && currentMake !== 'any') {
      filters.push({
        id: 'make',
        label: `Make: ${currentMake}`,
        value: currentMake,
      });
    }

    if (currentModel && currentModel !== 'any') {
      filters.push({
        id: 'model',
        label: `Model: ${currentModel}`,
        value: currentModel,
      });
    }

    currentBodyTypes.forEach((bodyType, index) => {
      filters.push({
        id: `bodyType-${index}`,
        label: `Body: ${bodyType}`,
        value: bodyType,
      });
    });

    currentDrivetrains.forEach((drivetrain, index) => {
      filters.push({
        id: `drivetrain-${index}`,
        label: `Drive: ${drivetrain}`,
        value: drivetrain,
      });
    });

    currentFuelTypes.forEach((fuelType, index) => {
      filters.push({
        id: `fuelType-${index}`,
        label: `Fuel: ${fuelType}`,
        value: fuelType,
      });
    });

    return filters;
  }, [
    currentLocation,
    currentMake,
    currentModel,
    currentBodyTypes,
    currentDrivetrains,
    currentFuelTypes,
  ]);

  const handleLocationChange = useCallback(
    (value: string) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);
      if (value !== 'any') {
        params.set('location', value);
      } else {
        params.delete('location');
      }
      params.delete('page');
      handleReplaceURL(params);
    },
    [handleReplaceURL, searchParams]
  );

  const handleMakeChange = useCallback(
    (value: string) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);
      if (value !== 'any') {
        params.set('make', value);
      } else {
        params.delete('make');
      }
      params.delete('model');
      params.delete('page');
      handleReplaceURL(params);
    },
    [handleReplaceURL, searchParams]
  );

  const handleModelChange = useCallback(
    (value: string) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);
      if (value !== 'any') {
        params.set('model', value);
      } else {
        params.delete('model');
      }
      params.delete('page');
      handleReplaceURL(params);
    },
    [handleReplaceURL, searchParams]
  );

  const handleBodyTypeChange = useCallback(
    (bodyTypes: string[]) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);
      if (bodyTypes.length > 0) {
        params.set('bodyTypes', bodyTypes.join(','));
      } else {
        params.delete('bodyTypes');
      }
      params.delete('page');
      handleReplaceURL(params);
    },
    [handleReplaceURL, searchParams]
  );

  const handleDrivetrainChange = useCallback(
    (drivetrains: string[]) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);
      if (drivetrains.length > 0) {
        params.set('drivetrains', drivetrains.join(','));
      } else {
        params.delete('drivetrains');
      }
      params.delete('page');
      handleReplaceURL(params);
    },
    [handleReplaceURL, searchParams]
  );

  const handleFuelTypeChange = useCallback(
    (fuelTypes: string[]) => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);
      if (fuelTypes.length > 0) {
        params.set('fuelTypes', fuelTypes.join(','));
      } else {
        params.delete('fuelTypes');
      }
      params.delete('page');
      handleReplaceURL(params);
    },
    [handleReplaceURL, searchParams]
  );

  const handleRemoveFilterById = useCallback(
    (filterId: string) => {
      if (!searchParams) return;
      const filterType = getFilterTypeFromId(filterId);
      const filter = activeFilters.find(f => f.id === filterId);
      if (!filter) return;

      const params = new URLSearchParams(searchParams);

      switch (filterType) {
        case 'location':
          params.delete('location');
          break;
        case 'make':
          params.delete('make');
          params.delete('model');
          break;
        case 'model':
          params.delete('model');
          break;
        case 'bodyType':
          const currentBodyTypes = params.get('bodyTypes');
          if (currentBodyTypes) {
            const bodyTypesArray = currentBodyTypes.split(',');
            const filteredBodyTypes = bodyTypesArray.filter(
              bt => bt !== filter.value
            );
            if (filteredBodyTypes.length > 0) {
              params.set('bodyTypes', filteredBodyTypes.join(','));
            } else {
              params.delete('bodyTypes');
            }
          }
          break;
        case 'drivetrain':
          const currentDrivetrains = params.get('drivetrains');
          if (currentDrivetrains) {
            const drivetrainsArray = currentDrivetrains.split(',');
            const filteredDrivetrains = drivetrainsArray.filter(
              dt => dt !== filter.value
            );
            if (filteredDrivetrains.length > 0) {
              params.set('drivetrains', filteredDrivetrains.join(','));
            } else {
              params.delete('drivetrains');
            }
          }
          break;
        case 'fuelType':
          const currentFuelTypes = params.get('fuelTypes');
          if (currentFuelTypes) {
            const fuelTypesArray = currentFuelTypes.split(',');
            const filteredFuelTypes = fuelTypesArray.filter(
              ft => ft !== filter.value
            );
            if (filteredFuelTypes.length > 0) {
              params.set('fuelTypes', filteredFuelTypes.join(','));
            } else {
              params.delete('fuelTypes');
            }
          }
          break;
      }

      params.delete('page');
      handleReplaceURL(params);
    },
    [activeFilters, searchParams, handleReplaceURL]
  );

  const handleClearAllFilters = useCallback(() => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams);
    params.delete('location');
    params.delete('make');
    params.delete('model');
    params.delete('bodyTypes');
    params.delete('drivetrains');
    params.delete('fuelTypes');
    params.delete('page');
    handleReplaceURL(params);
  }, [handleReplaceURL, searchParams]);

  return {
    currentLocation,
    currentMake,
    currentModel,
    currentBodyTypes,
    currentDrivetrains,
    currentFuelTypes,
    activeFilters,
    isPending,

    handleLocationChange,
    handleMakeChange,
    handleModelChange,
    handleBodyTypeChange,
    handleDrivetrainChange,
    handleFuelTypeChange,
    handleRemoveFilter: handleRemoveFilterById,
    handleClearAllFilters,
  };
}

function getFilterTypeFromId(filterId: string): string {
  if (filterId === 'location') return 'location';
  if (filterId === 'make') return 'make';
  if (filterId === 'model') return 'model';
  if (filterId.startsWith('bodyType-')) return 'bodyType';
  if (filterId.startsWith('drivetrain-')) return 'drivetrain';
  if (filterId.startsWith('fuelType-')) return 'fuelType';
  return 'unknown';
}
