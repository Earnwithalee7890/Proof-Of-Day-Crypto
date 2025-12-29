'use client';

import { useEffect } from 'react';

type KeyboardHandler = () => void;

interface KeyboardShortcut {
    key: string;
    ctrlKey?: boolean;
    metaKey?: boolean;
    handler: KeyboardHandler;
    description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            shortcuts.forEach((shortcut) => {
                const ctrlOrMeta = shortcut.ctrlKey || shortcut.metaKey;
                const matchesCtrlMeta = ctrlOrMeta
                    ? (event.ctrlKey || event.metaKey)
                    : !event.ctrlKey && !event.metaKey;

                if (
                    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
                    matchesCtrlMeta
                ) {
                    event.preventDefault();
                    shortcut.handler();
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
}
