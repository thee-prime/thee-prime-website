import MainLayout from '@/layouts/MainLayout';
import BlogCard from '@/components/BlogCard';
import ShareButtons from '@/components/ShareButtons';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogShow({ post, relatedPosts, categories }) {
    const formattedDate = post.published_at
        ? format(new Date(post.published_at), 'MMMM d, yyyy')
        : format(new Date(post.created_at), 'MMMM d, yyyy');

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <MainLayout title={post.title}>
            {/* Hero Section */}
            <article>
                <header className="relative">
                    {post.featured_image ? (
                        <div className="h-[400px] relative">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                        </div>
                    ) : (
                        <div className="h-[200px] bg-gradient-to-br from-purple-900/50 to-pink-900/50" />
                    )}

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32">
                        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>

                            {post.category && (
                                <Link
                                    href={`/category/${post.category.slug}`}
                                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 mb-4 ml-4 hover:bg-purple-500/30 transition-colors"
                                >
                                    {post.category.name}
                                </Link>
                            )}

                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.reading_time || 3} min read
                                </span>
                                <span className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    {post.view_count || 0} views
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-purple-400 prose-strong:text-white prose-code:text-purple-300 prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share */}
                    <div className="mt-12 pt-8 border-t border-slate-700/50">
                        <ShareButtons title={post.title} url={shareUrl} />
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <BlogCard key={relatedPost.id} post={relatedPost} />
                        ))}
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
