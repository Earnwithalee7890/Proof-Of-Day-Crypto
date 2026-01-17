'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    position?: 'left' | 'right' | 'bottom';
}

const positionStyles = {
    left: {
        container: 'left-0 top-0 h-full w-80 max-w-[90vw]',
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
    },
    right: {
        container: 'right-0 top-0 h-full w-80 max-w-[90vw]',
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
    },
    bottom: {
        container: 'bottom-0 left-0 right-0 max-h-[90vh]',
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
    },
};

export function Drawer({
    isOpen,
    onClose,
    title,
    children,
    position = 'right',
}: DrawerProps) {
    const styles = positionStyles[position];

    // Handle ESC key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={styles.initial}
                        animate={styles.animate}
                        exit={styles.exit}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className={`fixed ${styles.container} bg-gradient-to-b from-gray-900 to-gray-950 border-white/10 shadow-2xl ${position === 'bottom' ? 'rounded-t-2xl border-t' : 'border-l'
                            }`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h2 className="text-lg font-bold text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Close drawer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 60px)' }}>
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default Drawer;
