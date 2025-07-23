'use client';

import { useState } from 'react';
import {
  Select,
  SelectItem,
  SelectContent,
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
import { cn } from '@/lib/utils';
import { MapPin, Navigation, ChevronDownIcon } from 'lucide-react';
import { YearPicker } from './year-picker';
import React from 'react';

interface FiltersSidebarProps {
  carType?: 'new' | 'used';
  currentLocation?: string;
  currentMake?: string;
  currentModel?: string;
  currentBodyTypes?: string[];
  currentDrivetrains?: string[];
  currentFuelTypes?: string[];
  onLocationChange?: (location: string) => void;
  onMakeChange?: (make: string) => void;
  onModelChange?: (model: string) => void;
  isPending?: boolean;
  onBodyTypeChange?: (bodyTypes: string[]) => void;
  onDrivetrainChange?: (drivetrains: string[]) => void;
  onFuelTypeChange?: (fuelTypes: string[]) => void;
}

export function FiltersSidebar({
  carType = 'new',
  currentLocation = 'any',
  currentMake = 'any',
  currentModel = 'any',
  currentBodyTypes = [],
  currentDrivetrains = [],
  currentFuelTypes = [],
  onLocationChange,
  onMakeChange,
  onModelChange,
  isPending = false,
  onBodyTypeChange,
  onDrivetrainChange,
  onFuelTypeChange,
}: FiltersSidebarProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'used'>(carType);
  const [negotiatedPrice, setNegotiatedPrice] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    0, 120000,
  ]);
  const [selectedBodyTypes, setSelectedBodyTypes] =
    useState<string[]>(currentBodyTypes);
  const [selectedDrivetrains, setSelectedDrivetrains] =
    useState<string[]>(currentDrivetrains);
  const [selectedFuelTypes, setSelectedFuelTypes] =
    useState<string[]>(currentFuelTypes);

  React.useEffect(() => {
    setSelectedBodyTypes(currentBodyTypes);
    setSelectedDrivetrains(currentDrivetrains);
    setSelectedFuelTypes(currentFuelTypes);
  }, [currentBodyTypes, currentDrivetrains, currentFuelTypes]);

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
    const newBodyTypes = selectedBodyTypes.includes(bodyType)
      ? selectedBodyTypes.filter(bt => bt !== bodyType)
      : [...selectedBodyTypes, bodyType];
    setSelectedBodyTypes(newBodyTypes);
    onBodyTypeChange?.(newBodyTypes);
  };

  const toggleDrivetrain = (drivetrain: string) => {
    const newDrivetrains = selectedDrivetrains.includes(drivetrain)
      ? selectedDrivetrains.filter(dt => dt !== drivetrain)
      : [...selectedDrivetrains, drivetrain];
    setSelectedDrivetrains(newDrivetrains);
    onDrivetrainChange?.(newDrivetrains);
  };

  const toggleFuelType = (fuelType: string) => {
    const newFuelTypes = selectedFuelTypes.includes(fuelType)
      ? selectedFuelTypes.filter(ft => ft !== fuelType)
      : [...selectedFuelTypes, fuelType];
    setSelectedFuelTypes(newFuelTypes);
    onFuelTypeChange?.(newFuelTypes);
  };

  const handleSliderChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]]);
  };

  const handleSliderDragEnd = () => {};

  const handlePriceInputChange = (index: 0 | 1, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    const newRange: [number, number] = [...localPriceRange] as [number, number];
    newRange[index] = numValue;

    if (index === 0 && numValue > newRange[1]) {
      newRange[1] = numValue;
    }
    if (index === 1 && numValue < newRange[0]) {
      newRange[0] = numValue;
    }

    setLocalPriceRange(newRange);
  };

  return (
    <div className="space-y-6 relative">
      {isPending && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'flex-1 rounded-full text-xs sm:text-sm',
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
          size="sm"
          className={cn(
            'flex-1 rounded-full text-xs sm:text-sm',
            activeTab === 'used'
              ? 'bg-secondary text-foreground hover:bg-secondary border-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
          )}
          onClick={() => setActiveTab('used')}
        >
          Used cars
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Location and radius</h3>
        <div className="space-y-2 sm:space-y-3">
          <Select value={currentLocation} onValueChange={onLocationChange}>
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
            </SelectContent>
          </Select>

          <Select defaultValue="any">
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

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Body type</h3>
        <div className="relative">
          <div
            className={cn(
              'max-h-32 sm:max-h-48 overflow-y-auto space-y-2 pr-1',
              '[&::-webkit-scrollbar]:w-0.5',
              '[&::-webkit-scrollbar-track]:bg-muted',
              '[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50'
            )}
          >
            {bodyTypes.map(bodyType => (
              <div key={bodyType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={bodyType.id}
                  checked={selectedBodyTypes.includes(bodyType.id)}
                  onCheckedChange={() => toggleBodyType(bodyType.id)}
                />
                <label
                  htmlFor={bodyType.id}
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  {bodyType.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Make and model</h3>
        <div className="space-y-2 sm:space-y-3">
          <Select value={currentMake} onValueChange={onMakeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any make</SelectItem>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Honda">Honda</SelectItem>
              <SelectItem value="Ford">Ford</SelectItem>
              <SelectItem value="Chevrolet">Chevrolet</SelectItem>
              <SelectItem value="BMW">BMW</SelectItem>
              <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
              <SelectItem value="Audi">Audi</SelectItem>
              <SelectItem value="Volkswagen">Volkswagen</SelectItem>
              <SelectItem value="Nissan">Nissan</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currentModel} onValueChange={onModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any model</SelectItem>
              <SelectItem value="Camry">Camry</SelectItem>
              <SelectItem value="Civic">Civic</SelectItem>
              <SelectItem value="F-150">F-150</SelectItem>
              <SelectItem value="Silverado">Silverado</SelectItem>
              <SelectItem value="3 Series">3 Series</SelectItem>
              <SelectItem value="C-Class">C-Class</SelectItem>
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="Golf">Golf</SelectItem>
              <SelectItem value="Altima">Altima</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Year range</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'flex-1 justify-between text-left font-normal text-xs sm:text-sm',
                    'text-muted-foreground'
                  )}
                >
                  From
                  <ChevronDownIcon className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <YearPicker selected={undefined} onSelect={() => {}} />
              </PopoverContent>
            </Popover>

            <span className="text-muted-foreground self-center text-xs sm:text-sm">
              -
            </span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'flex-1 justify-between text-left font-normal text-xs sm:text-sm',
                    'text-muted-foreground'
                  )}
                >
                  To
                  <ChevronDownIcon className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <YearPicker selected={undefined} onSelect={() => {}} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Price range</h3>
        <div className="space-y-3 sm:space-y-4">
          <Slider
            value={localPriceRange}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderDragEnd}
            max={120000}
            min={0}
            step={1000}
            className="w-full"
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs sm:text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={localPriceRange[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePriceInputChange(0, e.target.value)
                  }
                  className="pl-6 text-xs sm:text-sm"
                  placeholder="0"
                />
              </div>
            </div>
            <span className="text-muted-foreground self-center text-xs sm:text-sm">
              -
            </span>
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs sm:text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={localPriceRange[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePriceInputChange(1, e.target.value)
                  }
                  className="pl-6 text-xs sm:text-sm"
                  placeholder="120000"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="negotiated-price"
              className="text-xs sm:text-sm cursor-pointer"
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

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Drivetrain</h3>
        <div className="space-y-2">
          {drivetrains.map(drivetrain => (
            <div key={drivetrain.id} className="flex items-center space-x-2">
              <Checkbox
                id={`drivetrain-${drivetrain.id}`}
                checked={selectedDrivetrains.includes(drivetrain.id)}
                onCheckedChange={() => toggleDrivetrain(drivetrain.id)}
              />
              <label
                htmlFor={`drivetrain-${drivetrain.id}`}
                className="text-xs sm:text-sm cursor-pointer"
              >
                {drivetrain.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-sm">Fuel type</h3>
        <div className="space-y-2">
          {fuelTypes.map(fuelType => (
            <div key={fuelType.id} className="flex items-center space-x-2">
              <Checkbox
                id={`fuel-${fuelType.id}`}
                checked={selectedFuelTypes.includes(fuelType.id)}
                onCheckedChange={() => toggleFuelType(fuelType.id)}
              />
              <label
                htmlFor={`fuel-${fuelType.id}`}
                className="text-xs sm:text-sm cursor-pointer"
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
