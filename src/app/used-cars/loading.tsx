import { CarsPageHeader } from '@/components/features';
import { Skeleton } from '@/components/ui';

function CarsListingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header Controls Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Car Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-card rounded-md overflow-hidden">
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
        ))}
      </div>
    </div>
  );
}

function FiltersSidebarSkeleton() {
  return (
    <div className="bg-background space-y-6">
      {/* Car Type Tabs Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-10 flex-1 rounded-full" />
      </div>

      {/* Location and Radius Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Body Type Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-20" />
        <div className="space-y-2">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Year Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-12" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>

      {/* Price Range Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UsedCarsLoading() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Used cars' }];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <CarsPageHeader breadcrumbs={breadcrumbs} resultCount={0} />

      {/* Main Content Area */}
      <div className="container mx-auto py-6">
        <div className="flex gap-12">
          {/* Filters Sidebar Skeleton */}
          <div className="w-80 shrink-0">
            <FiltersSidebarSkeleton />
          </div>

          {/* Listing Grid Skeleton */}
          <div className="flex-1 min-w-0">
            <CarsListingSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
