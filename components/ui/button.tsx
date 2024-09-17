import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';
import { TextClassContext } from './text';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'group  web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'bg-primary web:hover:opacity-90 active:opacity-90',
                destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
                outline:
                    'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
                secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
                ghost: 'web:hover:bg-accent web:hover:text-accent-foreground',
                link: 'web:underline-offset-4 web:hover:underline web:focus:underline ',

            },
            size: {
                default: 'h-10  py-2 native:h-12 native:px-5 native:py-3',
                sm: 'h-8 rounded-md ',
                badge: "h-8 ",
                lg: 'h-11 rounded-md px-8 native:h-14',
                icon: 'h-10 w-10',
            },

            rounded: {
                full: "rounded-full",
                base: "rounded-md",
                sm: "rounded-sm"
            }
        },
        defaultVariants: {
            variant: 'default',
            rounded: "base"
        },
    }
);

const buttonTextVariants = cva(
    'web:whitespace-nowrap text-background  web:transition-colors',
    {
        variants: {
            variant: {
                default: 'text-background',
                destructive: 'text-destructive-foreground',
                outline: 'group-active:text-accent-foreground',
                secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
                ghost: '',
                link: 'text-primary group-active:underline',
            },
            size: {
                default: '',
                sm: '',
                badge: '',
                lg: 'native:text-[17px] text-[17px]',
                icon: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
    ({ className, variant, rounded, size, ...props }, ref) => {
        return (
            <TextClassContext.Provider
                value={buttonTextVariants({ variant, size, className: 'web:pointer-events-none' })}
            >
                <Pressable
                    className={cn(
                        props.disabled && 'opacity-50 web:pointer-events-none',
                        buttonVariants({ variant, size, rounded, className })
                    )}
                    ref={ref}
                    role='button'
                    {...props}
                />
            </TextClassContext.Provider>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };