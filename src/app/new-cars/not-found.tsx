import { Button } from '@/components/ui/button';
import { Car, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Car className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">404</h1>
          <h2 className="text-xl font-semibold text-foreground">
            Car Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/new-cars" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse New Cars
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>You might want to:</p>
          <ul className="space-y-1">
            <li>• Check the URL for typos</li>
            <li>• Browse our new car inventory</li>
            <li>• Search for similar vehicles</li>
            <li>• Check out our used cars section</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-3">
            Quick Links
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/new-cars">New Cars</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/certified-cars">Certified Cars</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dealers">Dealers</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/online-appraisal">Online Appraisal</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
