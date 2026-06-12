<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Section;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_portfolio_endpoint_returns_visible_content_only(): void
    {
        Section::create([
            'header' => 'Visible section',
            'content' => '<script>alert(1)</script><p>Safe text</p>',
            'is_visible' => true,
        ]);
        Section::create([
            'header' => 'Hidden section',
            'content' => 'Hidden',
            'is_visible' => false,
        ]);

        Project::create([
            'header' => 'Visible project',
            'content' => 'Visible',
            'link' => 'https://github.com/example/visible',
            'is_visible' => true,
        ]);
        Project::create([
            'header' => 'Hidden project',
            'content' => 'Hidden',
            'link' => 'https://github.com/example/hidden',
            'is_visible' => false,
        ]);

        $response = $this->getJson('/api/portfolio');

        $response->assertOk();
        $response->assertJsonCount(1, 'data.sections');
        $response->assertJsonCount(1, 'data.projects');
        $response->assertJsonMissing(['header' => 'Hidden section']);
        $response->assertJsonMissing(['header' => 'Hidden project']);
    }

    public function test_admin_routes_require_admin_role(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->postJson('/api/admin/sections', [
            'header' => 'Test',
            'content' => 'Test',
        ]);

        $response->assertForbidden();
    }
}
