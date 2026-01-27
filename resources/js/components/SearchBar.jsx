import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function SearchBar({ defaultValue = '', placeholder = 'Search articles... (English/বাংলা)' }) {
    const [query, setQuery] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = useCallback((searchQuery) => {
        const url = new URL(window.location.href);

        if (searchQuery) {
            url.searchParams.set('q', searchQuery);
        } else {
            url.searchParams.delete('q');
        }
        url.searchParams.delete('page');

        router.get(url.pathname + url.search, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    const handleClear = () => {
        setQuery('');
        handleSearch('');
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
            <div
                className={`relative flex items-center rounded-xl transition-all duration-300 ${isFocused
                        ? 'bg-slate-700/50 ring-2 ring-purple-500/50'
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
            >
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 p-1 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </form>
    );
}
