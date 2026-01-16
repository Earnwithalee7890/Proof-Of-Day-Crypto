import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'small' | 'muted'
}

export const Typography = ({
    as,
    variant = 'p',
    className,
    children,
    ...props
}: TypographyProps) => {
    const Component = as || (variant.startsWith('h') ? variant : 'p')

    const variants = {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        p: 'leading-7 [&:not(:first-child)]:mt-6',
        lead: 'text-xl text-muted-foreground',
        small: 'text-sm font-medium leading-none',
        muted: 'text-sm text-muted-foreground',
    }

    return (
        // @ts-ignore
        <Component
            className={cn(variants[variant], className)}
            {...props}
        >
            {children}
        </Component>
    )
}
