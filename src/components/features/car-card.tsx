'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart, Bell, MapPin, Fuel, Gauge, Repeat } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { Sliders } from '@/components/icons';
import { cn, formatPrice } from '@/lib/utils';
import { Car } from '@/lib/api';

interface CarCardProps extends Car {
  variant?: 'grid' | 'list';
}

export function CarCard({
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
  variant = 'grid',
}: CarCardProps) {
  if (variant === 'list') {
    return (
      <div className="bg-card rounded-md overflow-hidden hover:shadow-lg transition-all duration-200 flex">
        <div className="relative w-80 flex-shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={`${title} ${year}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300 h-48"
            sizes="320px"
          />

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

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm text-muted-foreground font-medium">{date}</p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-border"
              >
                <Heart className="h-4 w-4 transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-border"
              >
                <Bell className="h-4 w-4 text-[#333D4C]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-border"
              >
                <Repeat className="h-4 w-4 text-[#333D4C]" />
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <h3 className="font-semibold text-xl leading-tight text-foreground mb-1">
              {title}{' '}
              <span className="text-muted-foreground font-normal">
                ({year})
              </span>
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(price)}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This SUV combines robust power with sophisticated design, offering
              advanced safety features and all-terrain capability.
            </p>
          </div>

          <div className="flex justify-between items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 flex-shrink-0" />
              <span>{mileage}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 flex-shrink-0" />
              <span>{fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 flex-shrink-0" />
              <span>{transmission}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-card rounded-md overflow-hidden hover:shadow-lg transition-all duration-200'
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={`${title} ${year}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

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

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">{date}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border"
            >
              <Heart className={cn('h-2 w-2 transition-colors')} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border"
            >
              <Bell className="h-2 w-2 text-[#333D4C]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-border"
            >
              <Repeat className="h-2 w-2 text-[#333D4C]" />
            </Button>
          </div>
        </div>

        <h3 className="font-semibold text-base leading-tight text-foreground">
          {title}{' '}
          <span className="text-muted-foreground font-normal">({year})</span>
        </h3>

        <p className="text-xl font-bold text-foreground">
          {formatPrice(price)}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2">
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
