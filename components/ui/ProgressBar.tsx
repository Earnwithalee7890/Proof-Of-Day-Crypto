'use client';

import React from 'react';

interface ProgressBarProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
    showLabel?: boolean;
    animated?: boolean;
    className?: string;
}

const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
};

const variantStyles = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400',
};

export function ProgressBar({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    animated = false,
    className = '',
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full ${sizeStyles[size]} bg-gray-700/50 rounded-full overflow-hidden`}>
                <div
                    className={`h-full ${variantStyles[variant]} rounded-full transition-all duration-500 ease-out ${animated ? 'animate-pulse' : ''
                        }`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
