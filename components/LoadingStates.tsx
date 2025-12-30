export default function LoadingStates() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="glass rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10" />
                    <div className="flex-1 space-y-2">
                        <div className="h-6 bg-white/10 rounded w-1/3" />
                        <div className="h-4 bg-white/10 rounded w-1/4" />
                    </div>
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass rounded-xl p-5 space-y-3">
                        <div className="h-8 bg-white/10 rounded w-2/3" />
                        <div className="h-10 bg-white/10 rounded w-full" />
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                    </div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="glass rounded-2xl p-8 space-y-4">
                <div className="h-8 bg-white/10 rounded w-1/4" />
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="mt-6 h-12 bg-white/10 rounded w-full" />
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="glass rounded-xl p-5 space-y-3 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-2/3" />
            <div className="h-10 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
        </div>
    );
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="glass rounded-lg p-4 flex items-center gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-1/3" />
                        <div className="h-3 bg-white/10 rounded w-1/2" />
                    </div>
                    <div className="h-8 bg-white/10 rounded w-20" />
                </div>
            ))}
        </div>
    );
}
