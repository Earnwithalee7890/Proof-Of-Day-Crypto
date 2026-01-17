'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpen?: string[];
    className?: string;
}

export function Accordion({
    items,
    allowMultiple = false,
    defaultOpen = [],
    className = '',
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                if (!allowMultiple) {
                    newSet.clear();
                }
                newSet.add(id);
            }

            return newSet;
        });
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item) => {
                const isOpen = openItems.has(item.id);

                return (
                    <div
                        key={item.id}
                        className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && <span className="text-purple-400">{item.icon}</span>}
                                <span className="text-white font-medium">{item.title}</span>
                            </div>
                            <motion.svg
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-4 pb-4 pt-2 text-gray-300 border-t border-white/10">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

export default Accordion;
