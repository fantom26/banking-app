import * as React from 'react'

import { cn } from '@/app/_lib/cn'

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' | 'lg' }) {
  return (
    <div
      data-slot='card'
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-4 rounded-xl border bg-card p-(--card-spacing) text-sm text-card-foreground shadow-card [--card-spacing:--spacing(5)] data-[size=lg]:[--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)] max-md:data-[size=lg]:[--card-spacing:--spacing(4.5)]',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        'grid auto-rows-min items-center gap-0.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 data-slot='card-title' className={cn('text-title font-semibold', className)} {...props} />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='card-description'
      className={cn('text-caption text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn('col-start-2 row-span-2 row-start-1 justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn(className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('mt-auto flex items-center gap-2.5 border-t pt-4', className)}
      {...props}
    />
  )
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
