<?php

namespace App\DTOs;

use App\Http\Requests\Admin\CreateCategoryRequest;

readonly class CreateCategoryDTO
{
    public function __construct(
        public string $name,
        public ?string $slug,
        public ?string $description,
        public bool $isActive,
        public int $order,
    ) {
    }

    public static function fromRequest(CreateCategoryRequest $request): self
    {
        return new self(
            name: $request->validated('name'),
            slug: $request->validated('slug'),
            description: $request->validated('description'),
            isActive: $request->boolean('is_active', true),
            order: $request->integer('order', 0),
        );
    }

    /**
     * Convert to array for model creation.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'is_active' => $this->isActive,
            'order' => $this->order,
        ];
    }
}
