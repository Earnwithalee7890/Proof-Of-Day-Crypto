'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    danger?: boolean;
}

interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
    className?: string;
}

export function Dropdown({
    trigger,
    items,
    align = 'left',
    className = '',
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div ref={dropdownRef} className={`relative inline-block ${className}`}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute z-50 mt-2 min-w-[180px] ${align === 'right' ? 'right-0' : 'left-0'
                            } bg-gray-900 border border-white/10 rounded-xl shadow-xl overflow-hidden`}
                    >
                        {items.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (!item.disabled) {
                                        item.onClick?.();
                                        setIsOpen(false);
                                    }
                                }}
                                disabled={item.disabled}
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${item.disabled
                                        ? 'text-gray-600 cursor-not-allowed'
                                        : item.danger
                                            ? 'text-red-400 hover:bg-red-500/10'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    } ${index !== items.length - 1 ? 'border-b border-white/5' : ''}`}
                            >
                                {item.icon && <span className="opacity-60">{item.icon}</span>}
                                {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Dropdown;
