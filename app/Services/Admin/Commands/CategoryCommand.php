<?php

namespace App\Services\Admin\Commands;

use App\DTOs\CreateCategoryDTO;
use App\DTOs\UpdateCategoryDTO;
use App\Models\Category;

class CategoryCommand
{
    /**
     * Create a new category.
     */
    public function create(CreateCategoryDTO $dto): Category
    {
        return Category::create($dto->toArray());
    }

    /**
     * Update an existing category.
     */
    public function update(Category $category, UpdateCategoryDTO $dto): Category
    {
        $category->update($dto->toArray());
        return $category->fresh();
    }

    /**
     * Delete a category.
     */
    public function delete(Category $category): bool
    {
        return $category->delete();
    }
}
