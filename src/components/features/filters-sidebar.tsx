'use client';

import * as React from 'react';
import { MapPin, Navigation, ChevronDownIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Input,
  Checkbox,
  Switch,
  Slider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { YearPicker } from './year-picker';
import { FilterLoadingIndicator } from './filter-loading-indicator';
import { cn, formatPrice } from '@/lib/utils';
import { useFilters } from '@/lib/hooks';

interface FiltersSidebarProps {
  className?: string;
}

export function FiltersSidebar({ className }: FiltersSidebarProps) {
  const { filters, updateFilters, isDebouncing } = useFilters();
  const [activeTab, setActiveTab] = React.useState<'new' | 'used'>('used');
  const [negotiatedPrice, setNegotiatedPrice] = React.useState(false);

  // Local state for smooth interactions
  const [localPriceRange, setLocalPriceRange] = React.useState<
    [number, number]
  >(filters.priceRange);
  const [localBodyTypes, setLocalBodyTypes] = React.useState<string[]>(
    filters.selectedBodyTypes
  );
  const [localDrivetrains, setLocalDrivetrains] = React.useState<string[]>(
    filters.selectedDrivetrains
  );
  const [localFuelTypes, setLocalFuelTypes] = React.useState<string[]>(
    filters.selectedFuelTypes
  );
  const [localMake, setLocalMake] = React.useState(filters.selectedMake);
  const [localModel, setLocalModel] = React.useState(filters.selectedModel);
  const [location, setLocation] = React.useState(filters.location);
  const [isDragging, setIsDragging] = React.useState(false);

  // Sync local state with filters
  React.useEffect(() => {
    if (!isDragging) {
      setLocalPriceRange(filters.priceRange);
    }
    setLocalBodyTypes(filters.selectedBodyTypes);
    setLocalDrivetrains(filters.selectedDrivetrains);
    setLocalFuelTypes(filters.selectedFuelTypes);
    setLocalMake(filters.selectedMake);
    setLocalModel(filters.selectedModel);
    setLocation(filters.location);
  }, [filters, isDragging]);

  const bodyTypes = [
    { id: 'Sedan', label: 'Sedan' },
    { id: 'SUV', label: 'SUV' },
    { id: 'Wagon', label: 'Wagon' },
    { id: 'Crossover', label: 'Crossover' },
    { id: 'Coupe', label: 'Coupe' },
    { id: 'pickup', label: 'Pickup' },
    { id: 'hatchback', label: 'Hatchback' },
    { id: 'convertible', label: 'Convertible' },
    { id: 'minivan', label: 'Minivan' },
    { id: 'sports-car', label: 'Sports Car' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'compact', label: 'Compact' },
    { id: 'midsize', label: 'Midsize' },
    { id: 'full-size', label: 'Full Size' },
    { id: 'electric', label: 'Electric Vehicle' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'truck', label: 'Truck' },
    { id: 'van', label: 'Van' },
    { id: 'roadster', label: 'Roadster' },
    { id: 'estate', label: 'Estate' },
  ];

  const drivetrains = [
    { id: 'AWD/4WD', label: 'AWD/4WD' },
    { id: 'FWD', label: 'Front Wheel Drive' },
    { id: 'RWD', label: 'Rear Wheel Drive' },
  ];

  const fuelTypes = [
    { id: 'Petrol', label: 'Petrol' },
    { id: 'Diesel', label: 'Diesel' },
    { id: 'Electric', label: 'Electric' },
    { id: 'Hybrid', label: 'Hybrid' },
  ];

  const toggleBodyType = (bodyType: string) => {
    const newBodyTypes = localBodyTypes.includes(bodyType)
      ? localBodyTypes.filter(type => type !== bodyType)
      : [...localBodyTypes, bodyType];

    setLocalBodyTypes(newBodyTypes);
    updateFilters({ selectedBodyTypes: newBodyTypes }, { debounce: true });
  };

  const toggleDrivetrain = (drivetrain: string) => {
    const newDrivetrains = localDrivetrains.includes(drivetrain)
      ? localDrivetrains.filter(type => type !== drivetrain)
      : [...localDrivetrains, drivetrain];

    setLocalDrivetrains(newDrivetrains);
    updateFilters({ selectedDrivetrains: newDrivetrains }, { debounce: true });
  };

  const toggleFuelType = (fuelType: string) => {
    const newFuelTypes = localFuelTypes.includes(fuelType)
      ? localFuelTypes.filter(type => type !== fuelType)
      : [...localFuelTypes, fuelType];

    setLocalFuelTypes(newFuelTypes);
    updateFilters({ selectedFuelTypes: newFuelTypes }, { debounce: true });
  };

  // Handle slider value change during drag
  const handleSliderChange = (value: number[]) => {
    setLocalPriceRange(value as [number, number]);
  };

  // Handle slider drag end
  const handleSliderDragEnd = () => {
    setIsDragging(false);
    updateFilters({ priceRange: localPriceRange }, { debounce: true });
  };

  // Handle price input changes
  const handlePriceInputChange = (index: 0 | 1, value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    if (isNaN(numValue)) return;

    const newRange: [number, number] = [...localPriceRange] as [number, number];
    newRange[index] = Math.max(0, Math.min(200000, numValue));

    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }

    setLocalPriceRange(newRange);
    updateFilters({ priceRange: newRange }, { debounce: true });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    updateFilters({ location: value }, { debounce: true });
  };

  // Handle make change with immediate local update and debounced API call
  const handleMakeChange = (value: string) => {
    setLocalMake(value);
    updateFilters({ selectedMake: value }, { debounce: true });
  };

  // Handle model change with immediate local update and debounced API call
  const handleModelChange = (value: string) => {
    setLocalModel(value);
    updateFilters({ selectedModel: value }, { debounce: true });
  };

  return (
    <div className={cn('bg-background space-y-6', className)}>
      {/* Loading Indicator */}
      <FilterLoadingIndicator isDebouncing={isDebouncing} />

      {/* Car Type Tabs */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="lg"
          className={cn(
            'flex-1 rounded-full',
            activeTab === 'new'
              ? 'bg-secondary text-foreground hover:bg-secondary border-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
          )}
          onClick={() => setActiveTab('new')}
        >
          New cars
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            'flex-1 rounded-full',
            activeTab === 'used'
              ? 'bg-secondary text-foreground hover:bg-secondary border-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
          )}
          onClick={() => setActiveTab('used')}
        >
          Used cars
        </Button>
      </div>

      {/* Location and Radius */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Location and radius</h3>
        <div className="space-y-3">
          <Select value={location} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Any location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any location</SelectItem>
              <SelectItem value="Houston">Houston</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Boston">Boston</SelectItem>
              <SelectItem value="Dallas">Dallas</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles</SelectItem>
              <SelectItem value="San Jose">San Jose</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.radius}
            onValueChange={value => updateFilters({ radius: value })}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Any radius" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any radius</SelectItem>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="100">100 miles</SelectItem>
              <SelectItem value="200">200 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Body Type */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Body type</h3>
        <div className="relative">
          <div
            className={cn(
              'max-h-48 overflow-y-auto space-y-2 pr-1',
              '[&::-webkit-scrollbar]:w-0.5',
              '[&::-webkit-scrollbar-track]:bg-muted',
              '[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50'
            )}
          >
            {bodyTypes.map(bodyType => (
              <div key={bodyType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={bodyType.id}
                  checked={localBodyTypes.includes(bodyType.id)}
                  onCheckedChange={() => toggleBodyType(bodyType.id)}
                />
                <label htmlFor={bodyType.id} className="text-sm cursor-pointer">
                  {bodyType.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Year */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Year</h3>
        <div className="flex gap-2">
          {/* From Year */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'flex-1 justify-between text-left font-normal',
                  !filters.yearFrom && 'text-muted-foreground'
                )}
              >
                {filters.yearFrom ? format(filters.yearFrom, 'yyyy') : 'From'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <YearPicker
                selected={filters.yearFrom}
                onSelect={date =>
                  updateFilters({ yearFrom: date }, { debounce: true })
                }
              />
            </PopoverContent>
          </Popover>

          <span className="text-muted-foreground self-center">-</span>

          {/* To Year */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'flex-1 justify-between text-left font-normal',
                  !filters.yearTo && 'text-muted-foreground'
                )}
              >
                {filters.yearTo ? format(filters.yearTo, 'yyyy') : 'To'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <YearPicker
                selected={filters.yearTo}
                onSelect={date =>
                  updateFilters({ yearTo: date }, { debounce: true })
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Make and Model */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Make and model</h3>
        <div className="space-y-3">
          <Select value={localMake} onValueChange={handleMakeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any make</SelectItem>
              <SelectItem value="Volvo">Volvo</SelectItem>
              <SelectItem value="Porsche">Porsche</SelectItem>
              <SelectItem value="Ford">Ford</SelectItem>
              <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
              <SelectItem value="Maserati">Maserati</SelectItem>
              <SelectItem value="Tesla">Tesla</SelectItem>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
            </SelectContent>
          </Select>

          <Select value={localModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any model</SelectItem>
              <SelectItem value="XC90">XC90</SelectItem>
              <SelectItem value="911">911</SelectItem>
              <SelectItem value="F-150">F-150</SelectItem>
              <SelectItem value="A205">A205</SelectItem>
              <SelectItem value="Model 3">Model 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Price</h3>
        <div className="space-y-4">
          {/* Price Range Slider */}
          <div className="px-3">
            <Slider
              value={localPriceRange}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderDragEnd}
              max={200000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className={cn(isDragging && 'text-primary font-medium')}>
                {formatPrice(localPriceRange[0])}
              </span>
              <span className={cn(isDragging && 'text-primary font-medium')}>
                {formatPrice(localPriceRange[1])}
              </span>
            </div>
            {isDragging && (
              <div className="text-xs text-primary mt-1 text-center">
                Release to apply filter
              </div>
            )}
          </div>

          {/* Price Input Fields */}
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={localPriceRange[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePriceInputChange(0, e.target.value)
                  }
                  className="pl-6"
                  placeholder="0"
                />
              </div>
            </div>
            <span className="text-muted-foreground self-center">-</span>
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={localPriceRange[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePriceInputChange(1, e.target.value)
                  }
                  className="pl-6"
                  placeholder="120000"
                />
              </div>
            </div>
          </div>

          {/* Negotiated Price Toggle */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="negotiated-price"
              className="text-sm cursor-pointer"
            >
              Negotiated price
            </label>
            <Switch
              id="negotiated-price"
              checked={negotiatedPrice}
              onCheckedChange={setNegotiatedPrice}
            />
          </div>
        </div>
      </div>

      {/* Drivetrain */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Drivetrain</h3>
        <div className="space-y-2">
          {drivetrains.map(drivetrain => (
            <div key={drivetrain.id} className="flex items-center space-x-2">
              <Checkbox
                id={`drivetrain-${drivetrain.id}`}
                checked={localDrivetrains.includes(drivetrain.id)}
                onCheckedChange={() => toggleDrivetrain(drivetrain.id)}
              />
              <label
                htmlFor={`drivetrain-${drivetrain.id}`}
                className="text-sm cursor-pointer"
              >
                {drivetrain.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Fuel type</h3>
        <div className="space-y-2">
          {fuelTypes.map(fuelType => (
            <div key={fuelType.id} className="flex items-center space-x-2">
              <Checkbox
                id={`fuel-${fuelType.id}`}
                checked={localFuelTypes.includes(fuelType.id)}
                onCheckedChange={() => toggleFuelType(fuelType.id)}
              />
              <label
                htmlFor={`fuel-${fuelType.id}`}
                className="text-sm cursor-pointer"
              >
                {fuelType.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
