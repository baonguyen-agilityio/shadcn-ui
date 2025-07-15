import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 Your Brand. All rights reserved.
          </div>
          <nav className="flex items-center space-x-6 text-sm">
            <Link
              href="/privacy"
              className="font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 