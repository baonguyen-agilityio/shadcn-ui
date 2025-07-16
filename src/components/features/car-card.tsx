"use client";

import * as React from "react";
import { Heart, Bell, Share2, MapPin, Fuel, Settings } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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
    type: "used" | "verified";
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
    <div className={cn(
      "bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200",
      className
    )}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={`${title} ${year}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant={badge.type === "verified" ? "default" : "secondary"}
              className={cn(
                "text-xs font-medium",
                badge.type === "verified" && "bg-blue-500 text-white",
                badge.type === "used" && "bg-orange-500 text-white"
              )}
            >
              {badge.label}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
            onClick={handleFavorite}
          >
            <Heart 
              className={cn(
                "h-4 w-4",
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
            onClick={() => onAlert?.(id)}
          >
            <Bell className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm"
            onClick={() => onShare?.(id)}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Date and Title */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{date}</p>
          <h3 className="font-semibold text-base leading-tight">
            {title} <span className="text-muted-foreground">({year})</span>
          </h3>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-foreground">
          {formatPrice(price)}
        </p>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                <span>{mileage}</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="h-3 w-3" />
                <span>{fuelType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Settings className="h-3 w-3" />
                <span>{transmission}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 