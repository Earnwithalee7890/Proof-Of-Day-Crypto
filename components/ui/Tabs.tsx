'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    onChange?: (tabId: string) => void;
    variant?: 'default' | 'pills' | 'underline';
    className?: string;
}

export function Tabs({
    tabs,
    defaultTab,
    onChange,
    variant = 'default',
    className = '',
}: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (tab: Tab) => {
        if (tab.disabled) return;
        setActiveTab(tab.id);
        onChange?.(tab.id);
    };

    const getTabStyles = (isActive: boolean, isDisabled?: boolean) => {
        if (isDisabled) {
            return 'text-gray-600 cursor-not-allowed';
        }

        if (variant === 'pills') {
            return isActive
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10';
        }

        if (variant === 'underline') {
            return isActive
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent';
        }

        return isActive
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5';
    };

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div className={className}>
            {/* Tab Headers */}
            <div className={`flex gap-1 ${variant === 'underline' ? 'border-b border-white/10' : ''}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab)}
                        disabled={tab.disabled}
                        className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-2 ${getTabStyles(activeTab === tab.id, tab.disabled)}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeContent}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Tabs;
