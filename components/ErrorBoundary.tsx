'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="glass rounded-2xl p-8 max-w-md w-full text-center space-y-6">
                        <div className="text-6xl">⚠️</div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                            <p className="text-gray-400">
                                We encountered an unexpected error. Please refresh the page to try again.
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-colors"
                        >
                            Refresh Page
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="text-left">
                                <summary className="text-sm text-gray-500 cursor-pointer">Error Details</summary>
                                <pre className="mt-2 text-xs text-red-400 bg-black/30 p-3 rounded overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
