'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface YearPickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
  className?: string;
}

export function YearPicker({
  selected,
  onSelect,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  className,
}: YearPickerProps) {
  const [currentYear, setCurrentYear] = React.useState(
    selected?.getFullYear() || new Date().getFullYear()
  );

  const years = React.useMemo(() => {
    const yearList = [];
    for (let year = toYear; year >= fromYear; year--) {
      yearList.push(year);
    }
    return yearList;
  }, [fromYear, toYear]);

  const handleYearSelect = (year: number) => {
    const date = new Date(year, 0, 1);
    onSelect?.(date);
  };

  const currentDecadeStart = Math.floor(currentYear / 10) * 10;
  const currentDecadeYears = years.filter(
    year => year >= currentDecadeStart && year < currentDecadeStart + 10
  );

  const goToPreviousDecade = () => {
    setCurrentYear(Math.max(currentYear - 10, fromYear));
  };

  const goToNextDecade = () => {
    setCurrentYear(Math.min(currentYear + 10, toYear));
  };

  return (
    <div className={cn('p-3 bg-background', className)}>
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousDecade}
          disabled={currentDecadeStart <= fromYear}
          className="h-8 w-8"
          aria-label="Go to previous decade"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <div className="text-sm font-medium">
          {currentDecadeStart} - {Math.min(currentDecadeStart + 9, toYear)}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextDecade}
          disabled={currentDecadeStart + 10 > toYear}
          className="h-8 w-8"
          aria-label="Go to next decade"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Year grid */}
      <div className="grid grid-cols-2 gap-2">
        {currentDecadeYears.map(year => (
          <Button
            key={year}
            variant={selected?.getFullYear() === year ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleYearSelect(year)}
            className="h-8 text-sm"
          >
            {year}
          </Button>
        ))}
      </div>
    </div>
  );
}
