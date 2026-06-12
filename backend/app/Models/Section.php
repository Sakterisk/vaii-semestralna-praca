<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    protected $table = 'sections';
    protected $fillable = ['key', 'header', 'content', 'display_order', 'is_visible'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}
