'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type?: ToastType;
    show: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type = 'info', show, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        if (show && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠',
    };

    const colors = {
        success: 'from-green-500 to-emerald-600 border-green-500/50',
        error: 'from-red-500 to-rose-600 border-red-500/50',
        info: 'from-blue-500 to-cyan-600 border-blue-500/50',
        warning: 'from-yellow-500 to-orange-600 border-yellow-500/50',
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md px-4"
                >
                    <div className={`glass rounded-2xl p-4 border-2 ${colors[type]} shadow-2xl backdrop-blur-xl`}>
                        <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${colors[type]} flex items-center justify-center text-white font-bold text-lg`}>
                                {icons[type]}
                            </div>

                            {/* Message */}
                            <p className="flex-1 text-white font-medium text-sm">{message}</p>

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 w-6 h-6 rounded-full glass-hover flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Progress bar */}
                        {duration > 0 && (
                            <motion.div
                                className={`mt-2 h-1 rounded-full bg-gradient-to-r ${colors[type]}`}
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: duration / 1000, ease: 'linear' }}
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
