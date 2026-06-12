<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->string('key')->nullable()->after('id');
            $table->integer('display_order')->default(0)->after('content');
            $table->boolean('is_visible')->default(true)->after('display_order');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('demo_url')->nullable()->after('link');
            $table->string('image_url')->nullable()->after('demo_url');
            $table->json('tags')->nullable()->after('image_url');
            $table->boolean('is_featured')->default(false)->after('tags');
            $table->boolean('is_visible')->default(true)->after('is_featured');
            $table->integer('display_order')->default(0)->after('is_visible');
            $table->unsignedBigInteger('github_repo_id')->nullable()->unique()->after('display_order');
            $table->integer('github_stars')->nullable()->after('github_repo_id');
            $table->integer('github_forks')->nullable()->after('github_stars');
            $table->string('github_language')->nullable()->after('github_forks');
            $table->timestamp('github_updated_at')->nullable()->after('github_language');
            $table->timestamp('last_synced_at')->nullable()->after('github_updated_at');
            $table->boolean('is_synced')->default(false)->after('last_synced_at');
        });

        Schema::create('portfolio_settings', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->default('Your Name');
            $table->string('headline')->default('Software Developer');
            $table->text('about')->nullable();
            $table->string('github_username')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('location')->nullable();
            $table->string('cv_url')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('page_title')->default('Portfolio');
            $table->string('page_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_settings');

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'demo_url',
                'image_url',
                'tags',
                'is_featured',
                'is_visible',
                'display_order',
                'github_repo_id',
                'github_stars',
                'github_forks',
                'github_language',
                'github_updated_at',
                'last_synced_at',
                'is_synced',
            ]);
        });

        Schema::table('sections', function (Blueprint $table) {
            $table->dropColumn([
                'key',
                'display_order',
                'is_visible',
            ]);
        });
    }
};
