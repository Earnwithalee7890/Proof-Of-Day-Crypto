import React from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean
}

export const Section = ({ className, children, container = true, ...props }: SectionProps) => {
    const content = container ? <Container>{children}</Container> : children

    return (
        <section
            className={cn('py-12 md:py-16 lg:py-24', className)}
            {...props}
        >
            {content}
        </section>
    )
}
