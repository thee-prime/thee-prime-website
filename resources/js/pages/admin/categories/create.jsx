import AdminLayout from '@/layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

// Helper to generate URL-friendly slug
const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w\-\u0980-\u09FF]/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export default function CategoryCreate() {
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        is_active: true,
        order: 0,
    });

    // Handle name change with auto-slug generation
    const handleNameChange = (value) => {
        setData('name', value);
        if (!slugManuallyEdited) {
            setData(prev => ({ ...prev, name: value, slug: slugify(value) }));
        }
    };

    // Handle manual slug edit
    const handleSlugChange = (value) => {
        setSlugManuallyEdited(true);
        setData('slug', slugify(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/categories');
    };

    return (
        <AdminLayout title="Create Category">
            <div className="max-w-2xl">
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                </Link>

                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Create New Category</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Category name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Slug
                                <span className="ml-2 text-slate-500 text-xs">(auto-generated)</span>
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="category-slug"
                            />
                            {errors.slug && (
                                <p className="mt-1 text-sm text-red-400">{errors.slug}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                placeholder="Brief description of this category"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    min={0}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Status
                                </label>
                                <label className="flex items-center gap-3 mt-3">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded bg-slate-900/50 border border-slate-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                                    />
                                    <span className="text-slate-300">Active</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Creating...' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
