'use client';

import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  homeUrl?: string;
  className?: string;
}

export function Breadcrumbs({
  items,
  separator = '/',
  homeUrl = '/',
  className = '',
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        {/* Home */}
        <li className="flex items-center">
          <Link
            href={homeUrl}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <span className="opacity-40 select-none" aria-hidden="true">
                {separator}
              </span>

              {isLast ? (
                <span className="font-medium text-white flex items-center gap-1.5" aria-current="page">
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
