import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

export default function PostIndex({ posts }) {
    const handleDelete = (post) => {
        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
            router.delete(`/admin/posts/${post.id}`);
        }
    };

    return (
        <AdminLayout title="Posts">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Posts</h2>
                    <p className="text-slate-400 mt-1">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/posts/create"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            {posts.data.length > 0 ? (
                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-900/50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Title
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Category
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Status
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Views
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Date
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {posts.data.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {post.featured_image ? (
                                                <img
                                                    src={post.featured_image}
                                                    alt={post.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                                                    <span className="text-lg">📝</span>
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-medium text-white block">{post.title}</span>
                                                <code className="text-xs text-slate-500">{post.slug}</code>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.category ? (
                                            <span className="px-2 py-1 rounded-full text-xs bg-purple-500/10 text-purple-400">
                                                {post.category.name}
                                            </span>
                                        ) : (
                                            <span className="text-slate-500">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.is_published ? (
                                            <span className="flex items-center gap-1 text-green-400">
                                                <Eye className="w-4 h-4" />
                                                Published
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-yellow-400">
                                                <EyeOff className="w-4 h-4" />
                                                Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {post.view_count || 0}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {post.is_published && (
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                                                    title="View Post"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            )}
                                            <Link
                                                href={`/admin/posts/${post.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="text-2xl">✍️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No posts yet</h3>
                    <p className="text-slate-400 mb-6">Start writing your first blog post</p>
                    <Link
                        href="/admin/posts/create"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Create Post
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}
