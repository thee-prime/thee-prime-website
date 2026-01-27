import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Eye, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function PostPreview({ post }) {
    const formattedDate = post.published_at
        ? format(new Date(post.published_at), 'MMMM d, yyyy')
        : format(new Date(), 'MMMM d, yyyy');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Head title={post.meta_title || post.title} />

            {/* Preview Banner */}
            <div className="sticky top-0 z-50 bg-yellow-500 text-yellow-900 py-2 px-4">
                <div className="container mx-auto flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview Mode - This post is {post.is_published ? 'published' : 'not published yet'}
                    </span>
                    <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="flex items-center gap-2 px-4 py-1 rounded bg-yellow-900 text-yellow-100 hover:bg-yellow-800"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Edit
                    </Link>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-10 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                        <img src="/storage/theeprime.png" alt="TheePrime" className="w-8 h-8 object-contain" />
                        TheePrime
                    </Link>
                </div>
            </header>

            {/* Article */}
            <article className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Featured Image */}
                {post.featured_image && (
                    <div className="mb-8 rounded-2xl overflow-hidden">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>
                )}

                {/* Category */}
                {post.category && (
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
                        {post.category.name}
                    </span>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.reading_time || 5} min read
                    </span>
                    <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {post.view_count || 0} views
                    </span>
                </div>

                {/* Content */}
                <div
                    className="prose prose-lg prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Keywords */}
                {post.keywords && post.keywords.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-700/50">
                        <h4 className="text-slate-400 text-sm mb-3">Keywords:</h4>
                        <div className="flex flex-wrap gap-2">
                            {post.keywords.map((keyword, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* SEO Info Panel */}
                <div className="mt-8 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">SEO Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-slate-400">Meta Title:</span>
                            <p className="text-white">{post.meta_title || post.title}</p>
                        </div>
                        <div>
                            <span className="text-slate-400">Focus Keyword:</span>
                            <p className="text-white">{post.focus_keyword || 'Not set'}</p>
                        </div>
                        <div className="md:col-span-2">
                            <span className="text-slate-400">Meta Description:</span>
                            <p className="text-white">{post.meta_description || 'Not set'}</p>
                        </div>
                        {post.seo_score && (
                            <div>
                                <span className="text-slate-400">SEO Score:</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${post.seo_score >= 70 ? 'bg-green-500' :
                                                post.seo_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${post.seo_score}%` }}
                                        />
                                    </div>
                                    <span className="text-white font-medium">{post.seo_score}/100</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}
