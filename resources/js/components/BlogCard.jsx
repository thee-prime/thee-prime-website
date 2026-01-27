import { Link } from '@inertiajs/react';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogCard({ post, featured = false }) {
    const formattedDate = post.published_at
        ? format(new Date(post.published_at), 'MMM d, yyyy')
        : format(new Date(post.created_at), 'MMM d, yyyy');

    const excerpt = post.excerpt || post.excerpt_text || post.content.substring(0, 160) + '...';

    if (featured) {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className="group relative block rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/30 via-slate-800 to-pink-900/30 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
                {post.featured_image && (
                    <div className="absolute inset-0">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                    </div>
                )}
                <div className="relative p-8">
                    {post.category && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 mb-4">
                            {post.category.name}
                        </span>
                    )}
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-slate-400 mb-6 line-clamp-2">{excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
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
            </Link>
        );
    }

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
        >
            {post.featured_image ? (
                <div className="h-48 overflow-hidden">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            ) : (
                <div className="h-48 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                    </div>
                </div>
            )}
            <div className="p-6">
                {post.category && (
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 mb-3">
                        {post.category.name}
                    </span>
                )}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center gap-1 text-purple-400 group-hover:text-purple-300">
                        Read more
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
