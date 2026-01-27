<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\GeminiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function __construct(
        private readonly GeminiService $geminiService,
    ) {
    }

    /**
     * Generate SEO content using Gemini AI.
     */
    public function generate(Request $request): JsonResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'min:50'],
        ]);

        $result = $this->geminiService->generateSEO(
            $request->input('title'),
            $request->input('content'),
        );

        return response()->json($result);
    }
}
