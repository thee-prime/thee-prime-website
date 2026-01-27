<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $apiKey;
    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', '');
    }

    /**
     * Generate SEO content from post title and content.
     */
    public function generateSEO(string $title, string $content): array
    {
        if (empty($this->apiKey)) {
            return $this->getFallbackSEO($title, $content);
        }

        $prompt = $this->buildSEOPrompt($title, $content);

        try {
            $response = Http::timeout(60)->post("{$this->baseUrl}?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'topK' => 40,
                    'topP' => 0.95,
                    'maxOutputTokens' => 1024,
                ]
            ]);

            if ($response->successful()) {
                $result = $response->json();
                $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';
                return $this->parseSEOResponse($text, $title, $content);
            }

            Log::warning('Gemini API error', ['status' => $response->status(), 'body' => $response->body()]);
            return $this->getFallbackSEO($title, $content);

        } catch (\Exception $e) {
            Log::error('Gemini API exception', ['message' => $e->getMessage()]);
            return $this->getFallbackSEO($title, $content);
        }
    }

    /**
     * Build the SEO generation prompt.
     */
    private function buildSEOPrompt(string $title, string $content): string
    {
        $contentPreview = mb_substr(strip_tags($content), 0, 2000);

        return <<<PROMPT
You are an expert SEO specialist. Analyze the following blog post and generate optimized SEO content.

**Title:** {$title}

**Content Preview:**
{$contentPreview}

Generate the following in JSON format (respond ONLY with valid JSON, no markdown code blocks):
{
    "meta_title": "SEO-optimized title (max 60 chars, include primary keyword)",
    "meta_description": "Compelling meta description (max 155 chars, include keyword, call-to-action)",
    "focus_keyword": "Primary focus keyword (2-4 words)",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "excerpt": "Engaging 2-sentence summary for blog cards (max 200 chars)",
    "seo_score": 85,
    "tips": ["tip1", "tip2", "tip3"]
}

Rules:
- meta_title must be under 60 characters
- meta_description must be under 155 characters  
- keywords should be 5 relevant terms
- seo_score is 0-100 based on content quality
- tips are improvement suggestions
- Support both English and Bangla content
PROMPT;
    }

    /**
     * Parse Gemini response into SEO array.
     */
    private function parseSEOResponse(string $text, string $title, string $content): array
    {
        // Clean up the response - remove markdown code blocks if present
        $text = preg_replace('/```json\s*/', '', $text);
        $text = preg_replace('/```\s*/', '', $text);
        $text = trim($text);

        try {
            $data = json_decode($text, true);

            if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
                return [
                    'success' => true,
                    'meta_title' => mb_substr($data['meta_title'] ?? $title, 0, 60),
                    'meta_description' => mb_substr($data['meta_description'] ?? '', 0, 155),
                    'focus_keyword' => $data['focus_keyword'] ?? '',
                    'keywords' => array_slice($data['keywords'] ?? [], 0, 5),
                    'excerpt' => mb_substr($data['excerpt'] ?? '', 0, 200),
                    'seo_score' => min(100, max(0, (int) ($data['seo_score'] ?? 70))),
                    'tips' => array_slice($data['tips'] ?? [], 0, 5),
                ];
            }
        } catch (\Exception $e) {
            Log::warning('Failed to parse Gemini SEO response', ['text' => $text]);
        }

        return $this->getFallbackSEO($title, $content);
    }

    /**
     * Generate fallback SEO when API is unavailable.
     */
    private function getFallbackSEO(string $title, string $content): array
    {
        $plainContent = strip_tags($content);
        $words = array_filter(explode(' ', preg_replace('/[^\p{L}\p{N}\s]/u', '', mb_strtolower($plainContent))));
        $wordFreq = array_count_values($words);
        arsort($wordFreq);

        // Get top keywords (excluding common words)
        $stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'to', 'of', 'and', 'in', 'that', 'it', 'for', 'on', 'with', 'as', 'at', 'by', 'this', 'from', 'or', 'you', 'your', 'we', 'our'];
        $keywords = [];
        foreach ($wordFreq as $word => $count) {
            if (mb_strlen($word) > 3 && !in_array($word, $stopWords) && count($keywords) < 5) {
                $keywords[] = $word;
            }
        }

        return [
            'success' => false,
            'meta_title' => mb_substr($title, 0, 60),
            'meta_description' => mb_substr($plainContent, 0, 155),
            'focus_keyword' => $keywords[0] ?? '',
            'keywords' => $keywords,
            'excerpt' => mb_substr($plainContent, 0, 200),
            'seo_score' => 50,
            'tips' => [
                'Add Gemini API key for AI-powered SEO suggestions',
                'Include your focus keyword in the title',
                'Write a compelling meta description',
            ],
        ];
    }
}
