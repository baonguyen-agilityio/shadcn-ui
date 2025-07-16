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
    <div className={cn('flex items-center space-x-2', className)}>
      <Logo size={logoSize} className="h-8 w-8" />
      {showText && (
        <span className="hidden font-bold sm:inline-block">{text}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
