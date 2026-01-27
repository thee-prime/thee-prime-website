<?php

namespace App\Services\Admin\Queries;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryQuery
{
    /**
     * Get all categories.
     *
     * @return Collection<int, Category>
     */
    public function getAll(): Collection
    {
        return Category::ordered()->get();
    }

    /**
     * Get only active categories.
     *
     * @return Collection<int, Category>
     */
    public function getActive(): Collection
    {
        return Category::active()->ordered()->get();
    }

    /**
     * Find category by slug.
     */
    public function findBySlug(string $slug): ?Category
    {
        return Category::where('slug', $slug)->first();
    }

    /**
     * Find category by ID.
     */
    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }

    /**
     * Paginate all categories.
     *
     * @return LengthAwarePaginator<Category>
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Category::ordered()->paginate($perPage);
    }

    /**
     * Get categories with published posts count.
     *
     * @return Collection<int, Category>
     */
    public function getActiveWithPostsCount(): Collection
    {
        return Category::active()
            ->ordered()
            ->withCount([
                'posts' => function ($query) {
                    $query->published();
                }
            ])
            ->get();
    }
}
