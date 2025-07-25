'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Brand } from '@/components/ui/brand';
import { Plus, User } from '@/components/icons';
import { ModeToggle } from '@/components/features/mode-toggle';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href?: string;
}

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'transparent';
}

const navigationItems: NavItem[] = [
  { name: 'New cars', href: '/new-cars' },
  { name: 'Used cars', href: '/used-cars' },
  { name: 'Online appraisal', href: '/online-appraisal' },
  { name: 'Dealers', href: '/dealers' },
  { name: 'Contact', href: '/contact' },
];

const HeaderLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mr-8 flex', className)} {...props}>
    <Brand href="/" text="Finder" />
  </div>
));
HeaderLogo.displayName = 'HeaderLogo';

interface DesktopNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
}

const DesktopNav = React.forwardRef<HTMLElement, DesktopNavProps>(
  ({ items, className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn('hidden md:flex items-center space-x-6', className)}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      {items.map(item => (
        <Link
          key={item.name}
          href={item.href || '/'}
          className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
          role="link"
          aria-label={item.name}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
);
DesktopNav.displayName = 'DesktopNav';

const UserMenu = React.forwardRef<
  React.ComponentRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    className={cn('hidden sm:flex', className)}
    {...props}
  >
    <User className="h-4 w-4" />
    <span className="sr-only">User profile</span>
  </Button>
));
UserMenu.displayName = 'UserMenu';

interface CTAButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  text?: string;
}

const CTAButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  CTAButtonProps
>(({ text = 'Sell car', className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="default"
    className={cn('flex items-center gap-2', className)}
    {...props}
  >
    <Plus className="h-3 w-3" />
    {text}
  </Button>
));
CTAButton.displayName = 'CTAButton';

interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ items, isOpen, setIsOpen, className, ...props }, ref) => (
    <div ref={ref} className={cn('md:hidden', className)} {...props}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {items.map(item => (
            <DropdownMenuItem key={item.name}>
              <span className="w-full">{item.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="w-full flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="w-full">Sign In</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-full">Get Started</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
);
MobileMenu.displayName = 'MobileMenu';

interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  showUserMenu?: boolean;
}

const HeaderActions = React.forwardRef<HTMLDivElement, HeaderActionsProps>(
  ({ className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-end space-x-4', className)}
        {...props}
      >
        <ModeToggle />
        <UserMenu />
        <CTAButton text="Sell car" />
        <MobileMenu
          items={navigationItems}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    );
  }
);
HeaderActions.displayName = 'HeaderActions';

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <HeaderLogo />
          <DesktopNav items={navigationItems} />
          <HeaderActions />
        </div>
      </div>
    </header>
  )
);
Header.displayName = 'Header';

export {
  Header,
  HeaderLogo,
  DesktopNav,
  UserMenu,
  CTAButton,
  MobileMenu,
  HeaderActions,
};
