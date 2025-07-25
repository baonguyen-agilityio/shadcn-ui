import * as React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';

interface BrandProps {
  href?: string;
  className?: string;
  logoSize?: number;
  showText?: boolean;
  text?: string;
}

export function Brand({
  href = '/',
  className,
  logoSize = 32,
  showText = true,
  text = 'Your Brand',
}: BrandProps) {
  const content = (
    <h1 className={cn('flex items-center space-x-2', className)}>
      <Logo size={logoSize} className="h-8 w-8" aria-hidden="true" />
      {showText && (
        <span className="hidden font-bold sm:inline-block">{text}</span>
      )}
      {/* Always provide accessible text for screen readers */}
      <span className="sr-only">{text}</span>
    </h1>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block"
        aria-label={`${text} - Go to homepage`}
        title={`${text} - Go to homepage`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
