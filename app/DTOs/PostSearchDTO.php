<?php

namespace App\DTOs;

use Illuminate\Http\Request;

readonly class PostSearchDTO
{
    public function __construct(
        public ?string $query,
        public ?string $categorySlug,
        public int $page,
        public int $perPage,
    ) {
    }

    public static function fromRequest(Request $request): self
    {
        return new self(
            query: $request->input('q'),
            categorySlug: $request->input('category'),
            page: $request->integer('page', 1),
            perPage: $request->integer('per_page', 12),
        );
    }
}
