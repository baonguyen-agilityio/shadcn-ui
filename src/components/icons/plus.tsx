import * as React from 'react';
import { cn } from '@/lib/utils';

interface PlusProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

export function Plus({ size = 16, className, ...props }: PlusProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0.125C8.48325 0.125 8.875 0.516751 8.875 1V15C8.875 15.4832 8.48325 15.875 8 15.875C7.51675 15.875 7.125 15.4832 7.125 15V1C7.125 0.516751 7.51675 0.125 8 0.125Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.125 8C0.125 7.51675 0.516751 7.125 1 7.125H15C15.4832 7.125 15.875 7.51675 15.875 8C15.875 8.48325 15.4832 8.875 15 8.875H1C0.516751 8.875 0.125 8.48325 0.125 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
