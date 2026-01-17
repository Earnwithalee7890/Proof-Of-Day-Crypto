'use client';

import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeStyles = {
    sm: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: 'translate-x-4',
    },
    md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
    },
    lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7',
    },
};

export function Switch({
    checked,
    onChange,
    label,
    disabled = false,
    size = 'md',
    className = '',
}: SwitchProps) {
    const styles = sizeStyles[size];

    return (
        <label className={`inline-flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`relative inline-flex ${styles.track} shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${checked ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                    }`}
            >
                <span
                    className={`pointer-events-none inline-block ${styles.thumb} transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${checked ? styles.translate : 'translate-x-0.5'
                        }`}
                />
            </button>
            {label && (
                <span className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-300'}`}>
                    {label}
                </span>
            )}
        </label>
    );
}

export default Switch;
