<?php

namespace App\Http\Controllers;

use App\Models\PortfolioSetting;
use App\Models\Project;
use App\Models\Section;
use App\Support\ContentSanitizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class PortfolioController extends Controller
{
    public function show(): JsonResponse
    {
        $settings = PortfolioSetting::query()->first();

        return response()->json([
            'data' => [
                'profile' => $settings,
                'sections' => Section::query()
                    ->where('is_visible', true)
                    ->orderBy('display_order')
                    ->orderBy('id')
                    ->get(),
                'projects' => Project::query()
                    ->where('is_visible', true)
                    ->orderByDesc('is_featured')
                    ->orderBy('display_order')
                    ->orderBy('id')
                    ->get(),
            ],
        ]);
    }

    public function settings(): JsonResponse
    {
        $settings = PortfolioSetting::query()->first();

        return response()->json([
            'data' => $settings,
        ]);
    }

    public function updateSettings(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'headline' => ['required', 'string', 'max:255'],
            'about' => ['nullable', 'string', 'max:4096'],
            'github_username' => ['nullable', 'string', 'max:255'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'cv_url' => ['nullable', 'url', 'max:255'],
            'avatar_url' => ['nullable', 'url', 'max:255'],
            'page_title' => ['required', 'string', 'max:255'],
            'page_description' => ['nullable', 'string', 'max:255'],
        ]);

        $settings = PortfolioSetting::query()->firstOrNew();
        $settings->fill([
            'full_name' => ContentSanitizer::text($validated['full_name']),
            'headline' => ContentSanitizer::text($validated['headline']),
            'about' => ContentSanitizer::html($validated['about'] ?? null),
            'github_username' => ContentSanitizer::text($validated['github_username'] ?? null),
            'contact_email' => $validated['contact_email'] ?? null,
            'location' => ContentSanitizer::text($validated['location'] ?? null),
            'cv_url' => ContentSanitizer::url($validated['cv_url'] ?? null),
            'avatar_url' => ContentSanitizer::url($validated['avatar_url'] ?? null),
            'page_title' => ContentSanitizer::text($validated['page_title']),
            'page_description' => ContentSanitizer::text($validated['page_description'] ?? null),
        ]);
        $settings->save();

        return response()->json([
            'message' => 'Portfolio settings updated successfully.',
            'data' => $settings,
        ]);
    }

    public function syncGithubProjects(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => ['nullable', 'string', 'max:255'],
            'include_forks' => ['nullable', 'boolean'],
        ]);

        $settings = PortfolioSetting::query()->first();
        $username = trim((string) ($validated['username'] ?? $settings?->github_username));

        if ($username === '') {
            return response()->json([
                'message' => 'GitHub username is required.',
            ], 422);
        }

        $http = Http::acceptJson();

        if (env('GITHUB_TOKEN')) {
            $http = $http->withToken(env('GITHUB_TOKEN'));
        }

        $response = $http->get("https://api.github.com/users/{$username}/repos", [
            'per_page' => 100,
            'sort' => 'updated',
            'direction' => 'desc',
        ]);

        if (! $response->successful()) {
            return response()->json([
                'message' => 'Failed to fetch repositories from GitHub.',
                'details' => $response->json(),
            ], 502);
        }

        $includeForks = $validated['include_forks'] ?? false;
        $synced = 0;

        foreach ($response->json() as $repo) {
            if (! $includeForks && Arr::get($repo, 'fork', false)) {
                continue;
            }

            Project::query()->updateOrCreate(
                ['github_repo_id' => Arr::get($repo, 'id')],
                [
                    'header' => ContentSanitizer::text(Arr::get($repo, 'name', 'Untitled')),
                    'content' => ContentSanitizer::text(Arr::get($repo, 'description', '')),
                    'link' => Arr::get($repo, 'html_url'),
                    'demo_url' => ContentSanitizer::url(Arr::get($repo, 'homepage')),
                    'tags' => array_values(array_filter([
                        Arr::get($repo, 'language'),
                    ])),
                    'is_featured' => false,
                    'is_visible' => true,
                    'display_order' => 0,
                    'github_stars' => Arr::get($repo, 'stargazers_count'),
                    'github_forks' => Arr::get($repo, 'forks_count'),
                    'github_language' => Arr::get($repo, 'language'),
                    'github_updated_at' => Arr::get($repo, 'updated_at'),
                    'last_synced_at' => now(),
                    'is_synced' => true,
                ]
            );

            $synced++;
        }

        return response()->json([
            'message' => 'GitHub projects synced successfully.',
            'data' => [
                'username' => $username,
                'synced_count' => $synced,
            ],
        ]);
    }
}
