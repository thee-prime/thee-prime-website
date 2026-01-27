<?php

namespace App\Http\Controllers\Admin;

use App\DTOs\CreatePostDTO;
use App\DTOs\UpdatePostDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreatePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Models\Post;
use App\Services\Admin\Commands\PostCommand;
use App\Services\Admin\Queries\CategoryQuery;
use App\Services\Admin\Queries\PostQuery;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function __construct(
        private readonly PostQuery $postQuery,
        private readonly PostCommand $postCommand,
        private readonly CategoryQuery $categoryQuery,
    ) {
    }

    /**
     * Display a listing of posts.
     */
    public function index(): Response
    {
        $posts = $this->postQuery->paginate(15);

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create(): Response
    {
        $categories = $this->categoryQuery->getActive();

        return Inertia::render('admin/posts/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(CreatePostRequest $request): RedirectResponse
    {
        $dto = CreatePostDTO::fromRequest($request);
        $this->postCommand->create($dto);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Post created successfully.');
    }

    /**
     * Show the form for editing the specified post.
     */
    public function edit(Post $post): Response
    {
        $categories = $this->categoryQuery->getActive();

        return Inertia::render('admin/posts/edit', [
            'post' => $post->load('category'),
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified post.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $dto = UpdatePostDTO::fromRequest($request);
        $this->postCommand->update($post, $dto);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->postCommand->delete($post);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Post deleted successfully.');
    }

    /**
     * Upload an image for the post.
     */
    public function uploadImage(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:5120'], // 5MB max
        ]);

        $path = $request->file('image')->store('posts', 'public');

        return response()->json([
            'url' => Storage::url($path),
        ]);
    }

    /**
     * Preview the specified post.
     */
    public function preview(Post $post): Response
    {
        return Inertia::render('admin/posts/preview', [
            'post' => $post->load('category'),
        ]);
    }
}
