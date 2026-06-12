<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioSetting extends Model
{
    use HasFactory;

    protected $table = 'portfolio_settings';

    protected $fillable = [
        'full_name',
        'headline',
        'about',
        'github_username',
        'contact_email',
        'location',
        'cv_url',
        'avatar_url',
        'page_title',
        'page_description',
    ];
}
