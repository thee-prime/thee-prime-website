import MainLayout from '@/layouts/MainLayout';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';

export default function BlogIndex({ posts, categories, filters }) {
    const hasFilters = filters?.q || filters?.category;

    return (
        <MainLayout title="Blog">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <img src="/storage/theeprime.png" alt="TheePrime" className="w-20 h-20 object-contain drop-shadow-2xl" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                TheePrime Blog
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Discover insights, tutorials, and stories from our community
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex justify-center mb-8">
                        <SearchBar defaultValue={filters?.q || ''} />
                    </div>

                    {/* Category Filter */}
                    <div className="flex justify-center">
                        <CategoryFilter
                            categories={categories}
                            activeSlug={filters?.category}
                        />
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {hasFilters && (
                    <div className="mb-6 text-slate-400">
                        <p>
                            {posts.total} {posts.total === 1 ? 'result' : 'results'} found
                            {filters?.q && <span> for "{filters.q}"</span>}
                            {filters?.category && (
                                <span>
                                    {filters?.q ? ' in' : ' for'} category "{filters.category}"
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {posts.data.length > 0 ? (
                    <>
                        {/* Featured Post */}
                        {!hasFilters && posts.data[0] && (
                            <div className="mb-8">
                                <BlogCard post={posts.data[0]} featured />
                            </div>
                        )}

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.data.slice(hasFilters ? 0 : 1).map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination links={posts.links} meta={posts} />
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                            <span className="text-4xl">📭</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No posts found
                        </h3>
                        <p className="text-slate-400">
                            {hasFilters
                                ? 'Try adjusting your search or filter criteria'
                                : 'Check back later for new content'}
                        </p>
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
