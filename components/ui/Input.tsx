'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Input({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = '',
    ...props
}: InputProps) {
    const hasError = !!error;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}

                <input
                    {...props}
                    className={`w-full px-4 py-2.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 ${leftIcon ? 'pl-10' : ''
                        } ${rightIcon ? 'pr-10' : ''} ${hasError
                            ? 'border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-purple-500 focus:ring-purple-500/30'
                        }`}
                />

                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {rightIcon}
                    </div>
                )}
            </div>

            {(error || helperText) && (
                <p className={`text-sm ${hasError ? 'text-red-400' : 'text-gray-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
}

export default Input;
