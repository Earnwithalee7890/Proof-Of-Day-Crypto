import { useEffect } from 'react';

export default function useKeyboardNavigation() {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Escape key closes modals
            if (event.key === 'Escape') {
                const closeButtons = document.querySelectorAll('[data-close]');
                if (closeButtons.length > 0) {
                    (closeButtons[0] as HTMLElement).click();
                }
            }

            // Ctrl/Cmd + K for search/filter
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Ctrl/Cmd + Enter for primary action
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                const primaryButton = document.querySelector('[data-primary-action]') as HTMLButtonElement;
                if (primaryButton && !primaryButton.disabled) {
                    primaryButton.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Trap focus within modals
        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const modal = document.querySelector('[role="dialog"]');
            if (!modal) return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        };

        window.addEventListener('keydown', trapFocus);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keydown', trapFocus);
        };
    }, []);
}
