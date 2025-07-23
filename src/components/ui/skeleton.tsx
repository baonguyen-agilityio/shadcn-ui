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

interface CarCardSkeletonProps {
  variant?: 'grid' | 'list';
}

function CarCardSkeleton({ variant = 'grid' }: CarCardSkeletonProps) {
  if (variant === 'list') {
    return (
      <div className="bg-card rounded-md overflow-hidden flex">
        <div className="relative w-80 flex-shrink-0 overflow-hidden bg-gray-100">
          <Skeleton className="absolute inset-0" />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>

          <div className="mb-3">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-7 w-24" />
          </div>

          <div className="mb-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-md overflow-hidden">
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
  );
}

export { Skeleton, CarCardSkeleton };
