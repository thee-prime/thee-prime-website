import { Link, router } from '@inertiajs/react';

export default function CategoryFilter({ categories, activeSlug }) {
    const handleCategoryClick = (slug) => {
        const url = new URL(window.location.href);

        if (slug) {
            url.searchParams.set('category', slug);
        } else {
            url.searchParams.delete('category');
        }
        url.searchParams.delete('page');

        router.get(url.pathname + url.search, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => handleCategoryClick(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!activeSlug
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeSlug === category.slug
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                >
                    {category.name}
                    {category.posts_count !== undefined && (
                        <span className={`text-xs ${activeSlug === category.slug ? 'text-white/70' : 'text-slate-500'}`}>
                            ({category.posts_count})
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}
