import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/app/_lib/cn'

const badgeVariants = cva(
  'group/badge inline-flex h-6.5 w-fit shrink-0 items-center gap-1.5 overflow-hidden rounded-sm border border-transparent px-2 text-caption font-semibold whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&>svg]:pointer-events-none [&>svg]:size-3.5',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        secondary: 'bg-muted text-foreground [&>svg]:text-muted-foreground',
        muted: 'bg-muted text-muted-foreground',
        success: 'bg-success-muted text-success',
        destructive: 'bg-destructive-muted text-destructive',
        outline: 'border-border text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot='badge'
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
