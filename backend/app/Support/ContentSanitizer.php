<?php

namespace App\Support;

class ContentSanitizer
{
    public static function html(?string $value): string
    {
        $raw = $value ?? '';
        $clean = strip_tags($raw, '<p><br><b><strong><i><em><ul><ol><li><a>');

        return trim($clean);
    }

    public static function text(?string $value): string
    {
        return trim(strip_tags($value ?? ''));
    }

    public static function url(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        $trimmed = trim($value);

        if (! filter_var($trimmed, FILTER_VALIDATE_URL)) {
            return null;
        }

        return $trimmed;
    }
}
