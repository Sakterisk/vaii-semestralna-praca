<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Support\ContentSanitizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Section::query()->orderBy('display_order')->orderBy('id');

        if (! $request->boolean('include_hidden')) {
            $query->where('is_visible', true);
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'key' => ['nullable', 'string', 'max:100'],
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:10000'],
            'is_visible' => ['nullable', 'boolean'],
        ]);

        $section = Section::create([
            'key' => ContentSanitizer::text($validated['key'] ?? null),
            'header' => ContentSanitizer::text($validated['header']),
            'content' => ContentSanitizer::html($validated['content']),
            'display_order' => $validated['display_order'] ?? 0,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return response()->json([
            'message' => 'Section created successfully.',
            'data' => $section,
        ], 201);
    }

    public function show(Section $section): JsonResponse
    {
        return response()->json([
            'data' => $section,
        ]);
    }

    public function update(Request $request, Section $section): JsonResponse
    {
        $validated = $request->validate([
            'key' => ['nullable', 'string', 'max:100'],
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:4096'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:10000'],
            'is_visible' => ['nullable', 'boolean'],
        ]);

        $section->update([
            'key' => ContentSanitizer::text($validated['key'] ?? null),
            'header' => ContentSanitizer::text($validated['header']),
            'content' => ContentSanitizer::html($validated['content']),
            'display_order' => $validated['display_order'] ?? 0,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return response()->json([
            'message' => 'Section updated successfully.',
            'data' => $section->fresh(),
        ]);
    }

    public function destroy(Section $section): JsonResponse
    {
        $section->delete();

        return response()->json([
            'message' => 'Section deleted successfully.',
        ]);
    }
}
