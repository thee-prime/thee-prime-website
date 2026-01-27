import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links, meta }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <nav className="flex items-center justify-center gap-2">
            {links.map((link, index) => {
                const isFirst = index === 0;
                const isLast = index === links.length - 1;
                const isActive = link.active;
                const isDisabled = !link.url;

                // Skip first and last (they are previous/next)
                if (isFirst || isLast) {
                    return (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${isDisabled
                                    ? 'text-slate-600 cursor-not-allowed'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            preserveState
                            preserveScroll
                            disabled={isDisabled}
                            onClick={(e) => isDisabled && e.preventDefault()}
                        >
                            {isFirst && <ChevronLeft className="w-4 h-4" />}
                            <span className="hidden sm:inline">
                                {isFirst ? 'Previous' : 'Next'}
                            </span>
                            {isLast && <ChevronRight className="w-4 h-4" />}
                        </Link>
                    );
                }

                // Numbers
                if (link.label === '...') {
                    return (
                        <span key={index} className="px-3 py-2 text-slate-500">
                            ...
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-4 py-2 rounded-lg transition-all ${isActive
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        preserveState
                        preserveScroll
                    >
                        {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                    </Link>
                );
            })}
        </nav>
    );
}
