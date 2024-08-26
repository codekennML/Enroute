import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '@/lib/utils';
import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';

const textVariants = cva('text-foreground ', {
  variants: {
    variant: {
      heading: 'text-2xl font-semibold font-header ',
      largeTitle: 'text-[20px] leading-7 font-semibold font-header',
      mediumTitle: 'text-[18px] font-semibold font-header',
      smallTitle: 'text-[16px] leading-6 font-semibold',
      subhead: 'text-base leading-6',
      body: 'text-[14px] leading-6',
      callout: 'text-[13px]',
      footnote: 'text-[12px] leading-5',
      caption1: 'text-[10px]',
      caption2: 'text-[9px] leading-4',
      tiny: "text-[8px] leading-2"
    },
    color: {
      light: "text-foreground",
      primary: 'text-muted-foreground',
      secondary: 'text-foreground',
      tertiary: 'text-foreground/90',
      quarternary: 'text-muted-foreground/50',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'light',
  },
});

// const TextClassContext = React.createContext<string | undefined>(undefined);



const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps & VariantProps<typeof textVariants>>(
  ({ className, asChild = false, variant, color, ...props }, ref) => {

    const textClass = React.useContext(TextClassContext);
    // console.log(textClass, variant, color)

    const Component = asChild ? Slot.Text : RNText;
    // const classD = cn('text-base web:select-text',
    //   textClass, "text-white",
    //   className
    // )

    // textVariants({ variant, color }),

    // console.log(className, 'HTYYs')


    return (
      <Component
        className={cn('text-sm web:select-text',
          textVariants({ variant, color }),
          textClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };