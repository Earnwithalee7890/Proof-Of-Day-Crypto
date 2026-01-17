'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StepperProps {
    steps: {
        id: string;
        label: string;
        description?: string;
    }[];
    currentStep: number;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export function Stepper({
    steps,
    currentStep,
    orientation = 'horizontal',
    className = '',
}: StepperProps) {
    const isVertical = orientation === 'vertical';

    return (
        <div
            className={`${isVertical ? 'flex flex-col gap-4' : 'flex items-center gap-2'} ${className}`}
        >
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <React.Fragment key={step.id}>
                        <div className={`flex ${isVertical ? 'items-start gap-3' : 'flex-col items-center gap-1'}`}>
                            {/* Step circle */}
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.1 : 1,
                                    backgroundColor: isCompleted
                                        ? '#a855f7'
                                        : isCurrent
                                            ? 'rgba(168, 85, 247, 0.2)'
                                            : 'rgba(255, 255, 255, 0.1)',
                                }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${isCompleted
                                        ? 'border-purple-500'
                                        : isCurrent
                                            ? 'border-purple-500'
                                            : 'border-white/20'
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className={`text-sm font-medium ${isCurrent ? 'text-purple-400' : 'text-gray-500'}`}>
                                        {index + 1}
                                    </span>
                                )}
                            </motion.div>

                            {/* Step content */}
                            <div className={isVertical ? '' : 'text-center'}>
                                <p className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                                    {step.label}
                                </p>
                                {step.description && (
                                    <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Connector */}
                        {!isLast && (
                            <div
                                className={`${isVertical ? 'w-0.5 h-6 ml-4' : 'flex-1 h-0.5 min-w-8'
                                    } ${isCompleted ? 'bg-purple-500' : 'bg-white/10'} transition-colors`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Stepper;
