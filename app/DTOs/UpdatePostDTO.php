<?php

namespace App\DTOs;

use App\Http\Requests\Admin\UpdatePostRequest;
use Carbon\Carbon;
use Carbon\CarbonInterface;

readonly class UpdatePostDTO
{
    public function __construct(
        public int $categoryId,
        public string $title,
        public ?string $slug,
        public ?string $excerpt,
        public string $content,
        public ?string $featuredImage,
        public ?string $metaTitle,
        public ?string $metaDescription,
        public ?string $focusKeyword,
        public ?array $keywords,
        public ?string $ogImage,
        public ?string $canonicalUrl,
        public ?int $seoScore,
        public bool $isPublished,
        public ?CarbonInterface $publishedAt,
    ) {
    }

    public static function fromRequest(UpdatePostRequest $request): self
    {
        $publishedAt = null;
        if ($request->boolean('is_published')) {
            $publishedAt = $request->filled('published_at')
                ? Carbon::parse($request->validated('published_at'))
                : now();
        }

        return new self(
            categoryId: $request->integer('category_id'),
            title: $request->validated('title'),
            slug: $request->validated('slug'),
            excerpt: $request->validated('excerpt'),
            content: $request->validated('content'),
            featuredImage: $request->validated('featured_image'),
            metaTitle: $request->validated('meta_title'),
            metaDescription: $request->validated('meta_description'),
            focusKeyword: $request->validated('focus_keyword'),
            keywords: $request->validated('keywords'),
            ogImage: $request->validated('og_image'),
            canonicalUrl: $request->validated('canonical_url'),
            seoScore: $request->integer('seo_score') ?: null,
            isPublished: $request->boolean('is_published', false),
            publishedAt: $publishedAt,
        );
    }

    /**
     * Convert to array for model update.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'category_id' => $this->categoryId,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featuredImage,
            'meta_title' => $this->metaTitle,
            'meta_description' => $this->metaDescription,
            'focus_keyword' => $this->focusKeyword,
            'keywords' => $this->keywords,
            'og_image' => $this->ogImage,
            'canonical_url' => $this->canonicalUrl,
            'seo_score' => $this->seoScore,
            'is_published' => $this->isPublished,
            'published_at' => $this->publishedAt,
        ];
    }
}
