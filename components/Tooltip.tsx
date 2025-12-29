'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
    const [show, setShow] = useState(false);

    const positions = {
        top: '-top-10 left-1/2 -translate-x-1/2',
        bottom: '-bottom-10 left-1/2 -translate-x-1/2',
        left: '-left-2 top-1/2 -translate-y-1/2 -translate-x-full',
        right: '-right-2 top-1/2 -translate-y-1/2 translate-x-full',
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
            >
                {children}
            </div>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute ${positions[position]} z-50 pointer-events-none`}
                    >
                        <div className="glass rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap border border-white/20 shadow-xl">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
