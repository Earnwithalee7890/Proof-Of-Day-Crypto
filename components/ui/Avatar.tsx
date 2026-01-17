'use client';

import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    status?: 'online' | 'offline' | 'away' | 'busy';
    className?: string;
}

const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
};

const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
};

const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getColorFromName(name: string): string {
    const colors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
        'from-pink-500 to-rose-500',
    ];

    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
}

export function Avatar({
    src,
    alt,
    name,
    size = 'md',
    status,
    className = '',
}: AvatarProps) {
    const [imageError, setImageError] = React.useState(false);
    const showFallback = !src || imageError;

    return (
        <div className={`relative inline-block ${className}`}>
            {showFallback ? (
                <div
                    className={`${sizeStyles[size]} rounded-full bg-gradient-to-br ${name ? getColorFromName(name) : 'from-gray-500 to-gray-600'
                        } flex items-center justify-center font-semibold text-white`}
                >
                    {name ? getInitials(name) : '?'}
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    onError={() => setImageError(true)}
                    className={`${sizeStyles[size]} rounded-full object-cover border-2 border-white/10`}
                />
            )}

            {status && (
                <span
                    className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-gray-900`}
                    title={status}
                />
            )}
        </div>
    );
}

export default Avatar;
