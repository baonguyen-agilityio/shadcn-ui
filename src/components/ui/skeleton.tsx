import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

// Car Card Skeleton Component
function CarCardSkeleton() {
  return (
    <div className="bg-card rounded-md overflow-hidden">
      {/* Image Container Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Skeleton className="absolute inset-0" />

        {/* Badges Skeleton - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Date and Action Icons Row Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Car Title and Year Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Price Skeleton */}
        <Skeleton className="h-6 w-20" />

        {/* Car Details Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Left Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 flex-shrink-0" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 flex-shrink-0" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 flex-shrink-0" />
              <Skeleton className="h-3 w-14" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 flex-shrink-0" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton, CarCardSkeleton };
