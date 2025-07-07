<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ShortUrl extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'original_url',
        'short_code',
        'title',
        'description',
        'clicks',
        'is_active',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected function casts(): array
    {
        return [
            'clicks' => 'integer',
            'is_active' => 'boolean',
            'expires_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the short URL.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Generate a unique short code.
     */
    public static function generateShortCode($length = 6): string
    {
        do {
            $shortCode = Str::random($length);
        } while (self::where('short_code', $shortCode)->exists());

        return $shortCode;
    }

    /**
     * Get the full short URL.
     */
    public function getShortUrlAttribute(): string
    {
        return url('/' . $this->short_code);
    }

    /**
     * Check if the URL is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    /**
     * Check if the URL is accessible.
     */
    public function isAccessible(): bool
    {
        return $this->is_active && !$this->isExpired();
    }

    /**
     * Increment click count.
     */
    public function incrementClicks(): void
    {
        $this->increment('clicks');
    }

    /**
     * Scope to get active URLs.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get non-expired URLs.
     */
    public function scopeNotExpired($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('expires_at')
              ->orWhere('expires_at', '>', now());
        });
    }

    /**
     * Scope to get accessible URLs.
     */
    public function scopeAccessible($query)
    {
        return $query->active()->notExpired();
    }
}
