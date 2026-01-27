<?php

namespace App\Services\Admin\Commands;

use App\DTOs\CreatePostDTO;
use App\DTOs\UpdatePostDTO;
use App\Models\Post;

class PostCommand
{
    /**
     * Create a new post.
     */
    public function create(CreatePostDTO $dto): Post
    {
        return Post::create($dto->toArray());
    }

    /**
     * Update an existing post.
     */
    public function update(Post $post, UpdatePostDTO $dto): Post
    {
        $post->update($dto->toArray());
        return $post->fresh();
    }

    /**
     * Delete a post.
     */
    public function delete(Post $post): bool
    {
        return $post->delete();
    }

    /**
     * Increment post view count.
     */
    public function incrementViewCount(Post $post): void
    {
        $post->incrementViewCount();
    }
}
