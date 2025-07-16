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
import { cn } from '@/lib/utils';

interface FiltersSidebarProps {
  className?: string;
}

export function FiltersSidebar({ className }: FiltersSidebarProps) {
  const [activeTab, setActiveTab] = React.useState<'new' | 'used'>('used');
  const [selectedBodyTypes, setSelectedBodyTypes] = React.useState<string[]>([
    'sedan',
    'suv',
    'coupe',
  ]);
  const [selectedDrivetrains, setSelectedDrivetrains] = React.useState<
    string[]
  >([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<string[]>(
    []
  );
  const [priceRange, setPriceRange] = React.useState([17000, 120000]);
  const [negotiatedPrice, setNegotiatedPrice] = React.useState(false);
  const [yearFrom, setYearFrom] = React.useState<Date | undefined>();
  const [yearTo, setYearTo] = React.useState<Date | undefined>();

  const bodyTypes = [
    { id: 'sedan', label: 'Sedan' },
    { id: 'suv', label: 'SUV' },
    { id: 'wagon', label: 'Wagon' },
    { id: 'crossover', label: 'Crossover' },
    { id: 'coupe', label: 'Coupe' },
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
    { id: 'awd', label: 'AWD/4WD' },
    { id: 'fwd', label: 'Front Wheel Drive' },
    { id: 'rwd', label: 'Rear Wheel Drive' },
  ];

  const fuelTypes = [
    { id: 'gasoline', label: 'Gasoline' },
    { id: 'diesel', label: 'Diesel' },
    { id: 'electric', label: 'Electric' },
  ];

  const toggleBodyType = (bodyType: string) => {
    setSelectedBodyTypes(prev =>
      prev.includes(bodyType)
        ? prev.filter(type => type !== bodyType)
        : [...prev, bodyType]
    );
  };

  const toggleDrivetrain = (drivetrain: string) => {
    setSelectedDrivetrains(prev =>
      prev.includes(drivetrain)
        ? prev.filter(type => type !== drivetrain)
        : [...prev, drivetrain]
    );
  };

  const toggleFuelType = (fuelType: string) => {
    setSelectedFuelTypes(prev =>
      prev.includes(fuelType)
        ? prev.filter(type => type !== fuelType)
        : [...prev, fuelType]
    );
  };

  return (
    <div className={cn('bg-background p-6 space-y-6', className)}>
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
          <Select>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Any location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any location</SelectItem>
              <SelectItem value="houston">Houston</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="boston">Boston</SelectItem>
              <SelectItem value="dallas">Dallas</SelectItem>
            </SelectContent>
          </Select>

          <Select>
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
                  checked={selectedBodyTypes.includes(bodyType.id)}
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
                  !yearFrom && 'text-muted-foreground'
                )}
              >
                {yearFrom ? format(yearFrom, 'yyyy') : 'From'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <YearPicker selected={yearFrom} onSelect={setYearFrom} />
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
                  !yearTo && 'text-muted-foreground'
                )}
              >
                {yearTo ? format(yearTo, 'yyyy') : 'To'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <YearPicker selected={yearTo} onSelect={setYearTo} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Make and Model */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Make and model</h3>
        <div className="space-y-3">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any make</SelectItem>
              <SelectItem value="volvo">Volvo</SelectItem>
              <SelectItem value="porsche">Porsche</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
              <SelectItem value="maserati">Maserati</SelectItem>
              <SelectItem value="tesla">Tesla</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any model</SelectItem>
              <SelectItem value="xc90">XC90</SelectItem>
              <SelectItem value="911">911</SelectItem>
              <SelectItem value="f150">F-150</SelectItem>
              <SelectItem value="a205">A205</SelectItem>
              <SelectItem value="model3">Model 3</SelectItem>
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
              value={priceRange}
              onValueChange={setPriceRange}
              max={200000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
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
                  value={priceRange[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="pl-6"
                  placeholder="17000"
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
                  value={priceRange[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
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
                checked={selectedDrivetrains.includes(drivetrain.id)}
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
                checked={selectedFuelTypes.includes(fuelType.id)}
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
