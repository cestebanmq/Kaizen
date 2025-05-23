import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles for all buttons
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-black hover:bg-accent/90 active:bg-accent/80', // Using accent color from tailwind.config.ts
        secondary:
          'bg-neutral-700 text-neutral-50 hover:bg-neutral-700/90 active:bg-neutral-700/80', // Darker secondary
        outline:
          'border border-accent bg-transparent text-accent hover:bg-accent hover:text-black active:bg-accent/90',
        ghost: 'hover:bg-neutral-700 hover:text-neutral-50 active:bg-neutral-700/90',
        link: 'text-accent underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // For using a different component as the child, e.g., Next.js Link
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If asChild is true, we render the child directly (useful for <Link> components)
    // For now, we'll keep it simple and not implement the Slot functionality from shadcn/ui
    // const Comp = asChild ? Slot : 'button';
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
