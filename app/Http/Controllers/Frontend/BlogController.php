<?php

namespace App\Http\Controllers\Frontend;

use App\DTOs\PostSearchDTO;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Services\Admin\Commands\PostCommand;
use App\Services\Admin\Queries\CategoryQuery;
use App\Services\Admin\Queries\PostQuery;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function __construct(
        private readonly PostQuery $postQuery,
        private readonly PostCommand $postCommand,
        private readonly CategoryQuery $categoryQuery,
    ) {
    }

    /**
     * Display blog listing with search and pagination.
     */
    public function index(Request $request): Response
    {
        $searchDTO = PostSearchDTO::fromRequest($request);
        $posts = $this->postQuery->paginatePublished($searchDTO);
        $categories = $this->categoryQuery->getActiveWithPostsCount();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => [
                'q' => $searchDTO->query,
                'category' => $searchDTO->categorySlug,
            ],
        ]);
    }

    /**
     * Display a single blog post.
     */
    public function show(Post $post): Response
    {
        // Ensure post is published
        if (!$post->is_published) {
            abort(404);
        }

        // Increment view count
        $this->postCommand->incrementViewCount($post);

        // Get related posts
        $relatedPosts = $this->postQuery->getRelatedPosts($post, 4);
        $categories = $this->categoryQuery->getActiveWithPostsCount();

        // Build SEO data for meta tags
        $seo = [
            'title' => $post->meta_title ?: $post->title,
            'description' => $post->meta_description ?: $post->excerpt,
            'keywords' => $post->keywords ?: [],
            'image' => $post->og_image ?: $post->featured_image,
            'canonical' => $post->canonical_url ?: route('blog.show', $post),
            'url' => route('blog.show', $post),
            'type' => 'article',
            'published_time' => $post->published_at?->toIso8601String(),
            'section' => $post->category?->name,
            'author' => config('app.name'),
        ];

        return Inertia::render('blog/show', [
            'post' => $post->load('category'),
            'relatedPosts' => $relatedPosts,
            'categories' => $categories,
            'seo' => $seo,
        ]);
    }

    /**
     * Display posts filtered by category.
     */
    public function category(Category $category, Request $request): Response
    {
        $searchDTO = new PostSearchDTO(
            query: $request->input('q'),
            categorySlug: $category->slug,
            page: $request->integer('page', 1),
            perPage: $request->integer('per_page', 12),
        );

        $posts = $this->postQuery->paginatePublished($searchDTO);
        $categories = $this->categoryQuery->getActiveWithPostsCount();

        return Inertia::render('blog/category', [
            'posts' => $posts,
            'category' => $category,
            'categories' => $categories,
            'filters' => [
                'q' => $searchDTO->query,
            ],
        ]);
    }
}
