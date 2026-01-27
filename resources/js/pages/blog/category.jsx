import MainLayout from '@/layouts/MainLayout';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function BlogCategory({ posts, category, categories, filters }) {
    return (
        <MainLayout title={`${category.name} | Blog`}>
            {/* Header Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Posts
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                {category.name}
                            </span>
                        </h1>
                        {category.description && (
                            <p className="text-xl text-slate-400 max-w-2xl">
                                {category.description}
                            </p>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar defaultValue={filters?.q || ''} />
                    </div>

                    {/* Category Filter */}
                    <CategoryFilter
                        categories={categories}
                        activeSlug={category.slug}
                    />
                </div>
            </section>

            {/* Posts Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {filters?.q && (
                    <div className="mb-6 text-slate-400">
                        <p>
                            {posts.total} {posts.total === 1 ? 'result' : 'results'} found
                            for "{filters.q}" in {category.name}
                        </p>
                    </div>
                )}

                {posts.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.data.map((post) => (
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
                            No posts in this category
                        </h3>
                        <p className="text-slate-400">
                            Check back later for new content or browse other categories
                        </p>
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
