import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function CategoryIndex({ categories }) {
    const handleDelete = (category) => {
        if (confirm(`Are you sure you want to delete "${category.name}"? This will also delete all posts in this category.`)) {
            router.delete(`/admin/categories/${category.id}`);
        }
    };

    return (
        <AdminLayout title="Categories">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Categories</h2>
                    <p className="text-slate-400 mt-1">Manage your blog categories</p>
                </div>
                <Link
                    href="/admin/categories/create"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Category
                </Link>
            </div>

            {categories.data.length > 0 ? (
                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-900/50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Name
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Slug
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Status
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">
                                    Order
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {categories.data.map((category) => (
                                <tr key={category.id} className="hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-white">{category.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-sm text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
                                            {category.slug}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4">
                                        {category.is_active ? (
                                            <span className="flex items-center gap-1 text-green-400">
                                                <CheckCircle className="w-4 h-4" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-400">
                                                <XCircle className="w-4 h-4" />
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {category.order}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/categories/${category.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category)}
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
                        <span className="text-2xl">📁</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No categories yet</h3>
                    <p className="text-slate-400 mb-6">Create your first category to organize your posts</p>
                    <Link
                        href="/admin/categories/create"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Create Category
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}
