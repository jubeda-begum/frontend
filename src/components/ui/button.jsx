import React from 'react';

export function Button({ variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-blue-600 focus-visible:ring-primary',
    outline:
      'border border-border bg-transparent text-foreground hover:bg-muted focus-visible:ring-border',
    ghost: 'bg-transparent hover:bg-muted text-foreground',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-red-600 focus-visible:ring-destructive'
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

