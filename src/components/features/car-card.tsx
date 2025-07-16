'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart, Bell, MapPin, Fuel, Gauge, Repeat } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { Sliders } from '@/components/icons';
import { cn } from '@/lib/utils';

interface CarCardProps {
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
  onFavorite?: (id: string) => void;
  onAlert?: (id: string) => void;
  onShare?: (id: string) => void;
  className?: string;
}

export function CarCard({
  id,
  imageUrl,
  title,
  year,
  price,
  date,
  location,
  mileage,
  fuelType,
  transmission,
  badges = [],
  onFavorite,
  onAlert,
  onShare,
  className,
}: CarCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(id);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div
      className={cn(
        'bg-card rounded-md overflow-hidden hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={`${title} ${year}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                'text-xs font-medium px-2 py-1 border-0',
                badge.type === 'verified' && 'bg-[#3D7A81] text-white',
                badge.type === 'used' && 'bg-orange-500 text-white'
              )}
            >
              {badge.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Date and Action Icons Row */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">{date}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border"
              onClick={handleFavorite}
            >
              <Heart
                className={cn(
                  'h-2 w-2 transition-colors',
                  isFavorited ? 'fill-red-500 text-red-500' : 'text-[#333D4C]'
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border"
              onClick={() => onAlert?.(id)}
            >
              <Bell className="h-2 w-2 text-[#333D4C]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border"
              onClick={() => onShare?.(id)}
            >
              <Repeat className="h-2 w-2 text-[#333D4C]" />
            </Button>
          </div>
        </div>

        {/* Car Title and Year */}
        <h3 className="font-semibold text-base leading-tight text-foreground">
          {title}{' '}
          <span className="text-muted-foreground font-normal">({year})</span>
        </h3>

        {/* Price */}
        <p className="text-xl font-bold text-foreground">
          {formatPrice(price)}
        </p>

        {/* Car Details Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Left Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Fuel className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{fuelType}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Gauge className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{mileage}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sliders className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{transmission}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
