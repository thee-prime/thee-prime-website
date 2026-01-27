import AdminLayout from '@/layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Sparkles, Check, X, Loader2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';
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

export default function PostCreate({ categories }) {
    const [aiLoading, setAiLoading] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [showSeoPreview, setShowSeoPreview] = useState(false);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        meta_title: '',
        meta_description: '',
        focus_keyword: '',
        keywords: [],
        og_image: '',
        canonical_url: '',
        seo_score: null,
        is_published: false,
    });

    // Handle title change with auto-slug generation
    const handleTitleChange = (value) => {
        setData('title', value);
        if (!slugManuallyEdited) {
            setData(prev => ({ ...prev, title: value, slug: slugify(value) }));
        }
    };

    // Handle manual slug edit
    const handleSlugChange = (value) => {
        setSlugManuallyEdited(true);
        setData('slug', slugify(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/posts');
    };

    const generateAISeo = async () => {
        // Strip HTML tags for AI analysis
        const plainText = data.content.replace(/<[^>]*>/g, '');

        if (!data.title || !plainText || plainText.length < 50) {
            alert('Please enter a title and at least 50 characters of content first.');
            return;
        }

        setAiLoading(true);
        try {
            const response = await fetch('/admin/seo/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({
                    title: data.title,
                    content: plainText,
                }),
            });

            const result = await response.json();
            setAiSuggestions(result);
        } catch (error) {
            console.error('AI SEO generation failed:', error);
            alert('Failed to generate SEO. Please try again.');
        } finally {
            setAiLoading(false);
        }
    };

    const applySuggestions = () => {
        if (aiSuggestions) {
            setData({
                ...data,
                meta_title: aiSuggestions.meta_title || data.meta_title,
                meta_description: aiSuggestions.meta_description || data.meta_description,
                focus_keyword: aiSuggestions.focus_keyword || data.focus_keyword,
                keywords: aiSuggestions.keywords || data.keywords,
                excerpt: aiSuggestions.excerpt || data.excerpt,
                seo_score: aiSuggestions.seo_score || data.seo_score,
            });
            setAiSuggestions(null);
        }
    };

    return (
        <AdminLayout title="Create Post">
            <div className="max-w-full">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/admin/posts"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Posts
                    </Link>

                    <button
                        type="button"
                        onClick={generateAISeo}
                        disabled={aiLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium transition-all disabled:opacity-50"
                    >
                        {aiLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4" />
                        )}
                        {aiLoading ? 'Generating...' : '✨ Generate SEO with AI'}
                    </button>
                </div>

                {/* AI Suggestions Panel */}
                {aiSuggestions && (
                    <div className="mb-6 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-xl border border-violet-500/30 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-violet-400" />
                                AI SEO Suggestions
                                {aiSuggestions.success && (
                                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                                        Powered by Gemini
                                    </span>
                                )}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={applySuggestions}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm"
                                >
                                    <Check className="w-4 h-4" />
                                    Apply All
                                </button>
                                <button
                                    onClick={() => setAiSuggestions(null)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm"
                                >
                                    <X className="w-4 h-4" />
                                    Dismiss
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-400">Meta Title:</span>
                                <p className="text-white mt-1">{aiSuggestions.meta_title}</p>
                            </div>
                            <div>
                                <span className="text-slate-400">Focus Keyword:</span>
                                <p className="text-white mt-1">{aiSuggestions.focus_keyword}</p>
                            </div>
                            <div className="md:col-span-2">
                                <span className="text-slate-400">Meta Description:</span>
                                <p className="text-white mt-1">{aiSuggestions.meta_description}</p>
                            </div>
                            <div>
                                <span className="text-slate-400">Keywords:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {aiSuggestions.keywords?.map((kw, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-400">SEO Score:</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${aiSuggestions.seo_score >= 70 ? 'bg-green-500' :
                                                aiSuggestions.seo_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${aiSuggestions.seo_score}%` }}
                                        />
                                    </div>
                                    <span className="text-white font-medium">{aiSuggestions.seo_score}/100</span>
                                </div>
                            </div>
                        </div>

                        {aiSuggestions.tips && aiSuggestions.tips.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-700">
                                <span className="text-slate-400 text-sm">Improvement Tips:</span>
                                <ul className="mt-2 space-y-1">
                                    {aiSuggestions.tips.map((tip, i) => (
                                        <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                                            <span className="text-violet-400">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Content - 3 columns */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                                <h2 className="text-xl font-bold text-white mb-6">Post Content</h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => handleTitleChange(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                                placeholder="Enter post title"
                                            />
                                            {errors.title && (
                                                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
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
                                                placeholder="post-url-slug"
                                            />
                                            {errors.slug && (
                                                <p className="mt-1 text-sm text-red-400">{errors.slug}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Excerpt
                                        </label>
                                        <textarea
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                            placeholder="Brief summary for blog cards"
                                        />
                                        {errors.excerpt && (
                                            <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Content *
                                        </label>
                                        <RichTextEditor
                                            value={data.content}
                                            onChange={(value) => setData('content', value)}
                                            placeholder="Write your blog post content here..."
                                        />
                                        {errors.content && (
                                            <p className="mt-1 text-sm text-red-400">{errors.content}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SEO Section */}
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-white">SEO Settings</h2>
                                    <button
                                        type="button"
                                        onClick={() => setShowSeoPreview(!showSeoPreview)}
                                        className="text-sm text-purple-400 hover:text-purple-300"
                                    >
                                        {showSeoPreview ? 'Hide Preview' : 'Show Google Preview'}
                                    </button>
                                </div>

                                {/* Google SERP Preview */}
                                {showSeoPreview && (
                                    <div className="mb-6 p-4 bg-white rounded-lg">
                                        <div className="text-blue-800 text-lg hover:underline cursor-pointer truncate">
                                            {data.meta_title || data.title || 'Your Page Title'}
                                        </div>
                                        <div className="text-green-700 text-sm truncate">
                                            {data.canonical_url || `theeprime.com/blog/${data.slug || 'your-post-slug'}`}
                                        </div>
                                        <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                            {data.meta_description || 'Your meta description will appear here.'}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Meta Title
                                            <span className="ml-2 text-slate-500">({(data.meta_title || '').length}/60)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            maxLength={60}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="SEO title (60 chars max)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Focus Keyword
                                        </label>
                                        <input
                                            type="text"
                                            value={data.focus_keyword}
                                            onChange={(e) => setData('focus_keyword', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="Primary keyword"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Meta Description
                                            <span className="ml-2 text-slate-500">({(data.meta_description || '').length}/155)</span>
                                        </label>
                                        <textarea
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            maxLength={155}
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                            placeholder="SEO description (155 chars max)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            OG Image URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.og_image}
                                            onChange={(e) => setData('og_image', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="Social share image URL"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Canonical URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.canonical_url}
                                            onChange={(e) => setData('canonical_url', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                {data.seo_score && (
                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-400 text-sm">SEO Score:</span>
                                            <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${data.seo_score >= 70 ? 'bg-green-500' :
                                                        data.seo_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${data.seo_score}%` }}
                                                />
                                            </div>
                                            <span className="text-white font-medium">{data.seo_score}/100</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - 1 column */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-white mb-4">Publish</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && (
                                            <p className="mt-1 text-sm text-red-400">{errors.category_id}</p>
                                        )}
                                    </div>

                                    <ImageUpload
                                        value={data.featured_image}
                                        onChange={(url) => setData('featured_image', url)}
                                        label="Featured Image *"
                                    />
                                    {errors.featured_image && (
                                        <p className="mt-1 text-sm text-red-400">{errors.featured_image}</p>
                                    )}

                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                            className="w-5 h-5 rounded bg-slate-900/50 border border-slate-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                                        />
                                        <span className="text-slate-300">Publish immediately</span>
                                    </label>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-700">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-all disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {processing ? 'Creating...' : 'Create Post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
