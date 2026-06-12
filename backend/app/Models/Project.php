<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $table = 'projects';
    protected $fillable = [
        'header',
        'content',
        'link',
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
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_visible' => 'boolean',
        'is_synced' => 'boolean',
        'github_updated_at' => 'datetime',
        'last_synced_at' => 'datetime',
    ];
}
