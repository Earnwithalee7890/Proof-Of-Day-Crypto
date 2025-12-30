export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass rounded-2xl p-8 max-w-md w-full text-center space-y-6">
                <div className="text-6xl">404</div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
                    <p className="text-gray-400">
                        The page you're looking for doesn't exist.
                    </p>
                </div>
                <a
                    href="/"
                    className="inline-block w-full px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
