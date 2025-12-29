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

// Helper component to show keyboard shortcuts
export function KeyboardShortcutsHelper({ show, shortcuts }: { show: boolean; shortcuts: KeyboardShortcut[] }) {
    if (!show) return null;

    const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? '⌘' : 'Ctrl';

    return (
        <div className= "fixed bottom-4 right-4 glass rounded-xl p-4 text-xs space-y-2 max-w-xs z-50" >
        <h4 className="font-bold text-sm mb-2" >⌨️ Keyboard Shortcuts </h4>
    {
        shortcuts.map((shortcut, i) => (
            <div key= { i } className = "flex justify-between gap-4" >
            <span className="text-gray-400" > { shortcut.description } </span>
        < kbd className = "px-2 py-1 rounded bg-white/10 font-mono font-bold" >
        {(shortcut.ctrlKey || shortcut.metaKey) && `${modKey}+`}
    { shortcut.key.toUpperCase() }
    </kbd>
        </div>
            ))
}
<div className="text-gray-500 text-[10px] mt-3 pt-2 border-t border-white/10" >
    Press < kbd className = "px-1 rounded bg-white/10" >? </kbd> to toggle this panel
        </div>
        </div>
    );
}
