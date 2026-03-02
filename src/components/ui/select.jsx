import React from 'react';

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

