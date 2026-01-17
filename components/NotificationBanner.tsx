'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationBannerProps {
    isVisible: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    onDismiss?: () => void;
}

const typeStyles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
};

const typeIcons = {
    info: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    success: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

export function NotificationBanner({
    isVisible,
    type = 'info',
    message,
    action,
    onDismiss,
}: NotificationBannerProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md p-4 rounded-xl border ${typeStyles[type]} backdrop-blur-sm`}
                >
                    <div className="flex items-start gap-3">
                        <span className="shrink-0">{typeIcons[type]}</span>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{message}</p>

                            {action && (
                                <button
                                    onClick={action.onClick}
                                    className="mt-2 text-sm font-medium underline underline-offset-2 hover:no-underline"
                                >
                                    {action.label}
                                </button>
                            )}
                        </div>

                        {onDismiss && (
                            <button
                                onClick={onDismiss}
                                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Dismiss"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default NotificationBanner;
