import { Skeleton } from '@/components/ui';

function CarsListingSkeleton() {
  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-card rounded-md overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Skeleton className="absolute inset-0" />

              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-16" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>

              <div className="space-y-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>

              <Skeleton className="h-6 w-20" />

              <div className="grid grid-cols-2 gap-4 pt-2">
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
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-10 flex-1 rounded-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

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

      <div className="space-y-4">
        <Skeleton className="h-4 w-12" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>

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

export default function NewCarsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header Skeleton */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {/* Breadcrumbs Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Title and Count Skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </div>

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
