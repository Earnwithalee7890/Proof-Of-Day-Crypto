'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    action,
    className = '',
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
        >
            {icon && (
                <div className="mb-4 p-4 rounded-full bg-white/5 text-gray-400">
                    {icon}
                </div>
            )}

            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

            {description && (
                <p className="text-gray-400 text-sm max-w-sm mb-6">{description}</p>
            )}

            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
}

export default EmptyState;
