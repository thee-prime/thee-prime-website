<?php

namespace App\Services\Admin\Queries;

use App\DTOs\PostSearchDTO;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class PostQuery
{
    /**
     * Paginate all posts (for admin).
     *
     * @return LengthAwarePaginator<Post>
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Post::with('category')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Paginate published posts with search filters.
     *
     * @return LengthAwarePaginator<Post>
     */
    public function paginatePublished(PostSearchDTO $dto): LengthAwarePaginator
    {
        return Post::with('category')
            ->published()
            ->search($dto->query)
            ->inCategory($dto->categorySlug)
            ->latest()
            ->paginate($dto->perPage);
    }

    /**
     * Find post by slug.
     */
    public function findBySlug(string $slug): ?Post
    {
        return Post::with('category')->where('slug', $slug)->first();
    }

    /**
     * Find published post by slug.
     */
    public function findPublishedBySlug(string $slug): ?Post
    {
        return Post::with('category')
            ->published()
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Find post by ID.
     */
    public function findById(int $id): ?Post
    {
        return Post::with('category')->find($id);
    }

    /**
     * Get related posts (same category, excluding current).
     *
     * @return Collection<int, Post>
     */
    public function getRelatedPosts(Post $post, int $limit = 4): Collection
    {
        return Post::with('category')
            ->published()
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Search posts by query (supports Bangla and English).
     *
     * @return Collection<int, Post>
     */
    public function search(string $query, int $limit = 10): Collection
    {
        return Post::with('category')
            ->published()
            ->search($query)
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get latest published posts.
     *
     * @return Collection<int, Post>
     */
    public function getLatest(int $limit = 6): Collection
    {
        return Post::with('category')
            ->published()
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get popular posts by view count.
     *
     * @return Collection<int, Post>
     */
    public function getPopular(int $limit = 5): Collection
    {
        return Post::with('category')
            ->published()
            ->orderBy('view_count', 'desc')
            ->limit($limit)
            ->get();
    }
}
