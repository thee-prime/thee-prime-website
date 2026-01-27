<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreateCategoryDTO;
use App\DTOs\UpdateCategoryDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\Admin\Commands\CategoryCommand;
use App\Services\Admin\Queries\CategoryQuery;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryQuery $categoryQuery,
        private readonly CategoryCommand $categoryCommand,
    ) {
    }

    /**
     * Display a listing of categories.
     */
    public function index(): Response
    {
        $categories = $this->categoryQuery->paginate(15);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Store a newly created category.
     */
    public function store(CreateCategoryRequest $request): RedirectResponse
    {
        $dto = CreateCategoryDTO::fromRequest($request);
        $this->categoryCommand->create($dto);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category): Response
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $dto = UpdateCategoryDTO::fromRequest($request);
        $this->categoryCommand->update($category, $dto);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category): RedirectResponse
    {
        $this->categoryCommand->delete($category);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
