import React from 'react';

export function Card({ className = '', ...props }) {
  return (
    <div
      className={`rounded-xl border border-border bg-card/90 backdrop-blur-md text-card-foreground shadow-sm dark:bg-slate-900/50 dark:border-slate-800/50 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`p-4 pb-2 ${className}`} {...props} />;
}

export function CardTitle({ className = '', ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />;
}

export function CardDescription({ className = '', ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div className={`p-4 pt-0 ${className}`} {...props} />;
}

