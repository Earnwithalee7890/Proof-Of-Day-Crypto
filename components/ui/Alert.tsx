'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const typeStyles = {
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-200',
  success: 'bg-green-500/10 border-green-500/20 text-green-200',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200',
  error: 'bg-red-500/10 border-red-500/20 text-red-200',
};

const iconStyles = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

const icons = {
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

export function Alert({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}: AlertProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`relative p-4 rounded-xl border ${typeStyles[type]} ${className}`}
      >
        <div className="flex gap-3">
          <div className={`shrink-0 ${iconStyles[type]}`}>
            {icons[type]}
          </div>

          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="font-medium mb-1 text-white">{title}</h5>
            )}
            <div className="text-sm opacity-90 break-words">
              {children}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 -mr-1 -mt-1 p-1 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close alert"
            >
              <svg className="w-4 h-4 opacity-60 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Alert;
