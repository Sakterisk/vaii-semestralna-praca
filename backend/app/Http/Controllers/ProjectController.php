<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Support\ContentSanitizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::query()->orderByDesc('is_featured')->orderBy('display_order')->orderBy('id');

        if (! $request->boolean('include_hidden')) {
            $query->where('is_visible', true);
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $tag = trim((string) $request->query('tag', ''));
        if ($tag !== '') {
            $query->whereJsonContains('tags', $tag);
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validatePayload($request);

        $project = Project::create($this->sanitizePayload($validated));

        return response()->json([
            'message' => 'Project created successfully.',
            'data' => $project,
        ], 201);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json([
            'data' => $project,
        ]);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $this->validatePayload($request);
        $project->update($this->sanitizePayload($validated));

        return response()->json([
            'message' => 'Project updated successfully.',
            'data' => $project->fresh(),
        ]);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.',
        ]);
    }

    private function validatePayload(Request $request): array
    {
        return $request->validate([
            'header' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:4096'],
            'link' => ['required', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'image_url' => ['nullable', 'url', 'max:255'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'is_featured' => ['nullable', 'boolean'],
            'is_visible' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:10000'],
        ]);
    }

    private function sanitizePayload(array $payload): array
    {
        return [
            'header' => ContentSanitizer::text($payload['header']),
            'content' => ContentSanitizer::html($payload['content']),
            'link' => ContentSanitizer::url($payload['link']),
            'demo_url' => ContentSanitizer::url($payload['demo_url'] ?? null),
            'image_url' => ContentSanitizer::url($payload['image_url'] ?? null),
            'tags' => array_values(array_filter(array_map(
                static fn ($tag) => ContentSanitizer::text($tag),
                $payload['tags'] ?? []
            ))),
            'is_featured' => $payload['is_featured'] ?? false,
            'is_visible' => $payload['is_visible'] ?? true,
            'display_order' => $payload['display_order'] ?? 0,
        ];
    }
}
