<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShortUrl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShortUrlController extends Controller
{
    public function __construct()
    {
        // $this->middleware(function ($request, $next) {
            $currentUser = Auth::user();

            if ($currentUser->hasRole('superAdmin')) {
                abort(403, 'SuperAdmin users cannot manage short URLs.');
            }

            if (!$currentUser->hasRole(['admin', 'user'])) {
                abort(403, 'Access denied.');
            }

            // return $next($request);
        // });
    }

    private function authorizeShortUrl(ShortUrl $urlToCheck)
    {
        $currentUser = Auth::user();

        if ($currentUser->hasRole('admin')) {
            if (!$currentUser->company_id || $urlToCheck->user->company_id !== $currentUser->company_id) {
                abort(403, 'You can only access URLs from your company.');
            }
        } elseif ($currentUser->hasRole('user')) {
            if ($urlToCheck->user_id !== $currentUser->id) {
                abort(403, 'You can only access your own URLs.');
            }
        }
    }

    public function index(Request $request)
    {
        $currentUser = Auth::user();
        $urlQuery = ShortUrl::with(['user']);

        if ($currentUser->hasRole('admin')) {
            if ($currentUser->company_id) {
                $urlQuery->whereHas('user', function ($companyQuery) use ($currentUser) {
                    $companyQuery->where('company_id', $currentUser->company_id);
                });
            } else {
                $urlQuery->where('id', 0);
            }
        } elseif ($currentUser->hasRole('user')) {
            $urlQuery->where('user_id', $currentUser->id);
        }

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $urlQuery->where(function ($searchQuery) use ($searchTerm) {
                $searchQuery->where('original_url', 'like', "%{$searchTerm}%")
                  ->orWhere('title', 'like', "%{$searchTerm}%")
                  ->orWhere('short_code', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('status')) {
            $statusFilter = $request->status;
            if ($statusFilter === 'active') {
                $urlQuery->active();
            } elseif ($statusFilter === 'inactive') {
                $urlQuery->where('is_active', false);
            } elseif ($statusFilter === 'expired') {
                $urlQuery->where('expires_at', '<', now());
            }
        }

        $paginatedUrls = $urlQuery->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/ShortUrls/Index', [
            'shortUrls' => $paginatedUrls,
            'filters' => $request->only(['search', 'status']),
            'userRole' => $currentUser->roles->first()->name ?? 'user',
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ShortUrls/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'original_url' => 'required|url|max:2048',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'short_code' => 'nullable|string|max:20|unique:short_urls,short_code',
            'is_active' => 'boolean',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $generatedShortCode = $validatedData['short_code'] ?: ShortUrl::generateShortCode();

        ShortUrl::create([
            'user_id' => Auth::id(),
            'original_url' => $validatedData['original_url'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'short_code' => $generatedShortCode,
            'is_active' => $request->boolean('is_active', true),
            'expires_at' => $validatedData['expires_at'],
        ]);

        return redirect()->route('admin.short-urls.index')
            ->with('success', 'Short URL created successfully.');
    }

    public function show(ShortUrl $urlToShow)
    {
        $this->authorizeShortUrl($urlToShow);

        $urlToShow->load(['user']);

        return Inertia::render('Admin/ShortUrls/Show', [
            'shortUrl' => $urlToShow,
        ]);
    }

    public function edit(ShortUrl $urlToEdit)
    {
        $this->authorizeShortUrl($urlToEdit);

        $urlToEdit->load(['user']);

        return Inertia::render('Admin/ShortUrls/Edit', [
            'shortUrl' => $urlToEdit,
        ]);
    }

    public function update(Request $request, ShortUrl $urlToUpdate)
    {
        $this->authorizeShortUrl($urlToUpdate);

        $validatedData = $request->validate([
            'original_url' => 'required|url|max:2048',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'short_code' => 'required|string|max:20|unique:short_urls,short_code,' . $urlToUpdate->id,
            'is_active' => 'boolean',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $urlToUpdate->update([
            'original_url' => $validatedData['original_url'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'short_code' => $validatedData['short_code'],
            'is_active' => $request->boolean('is_active', true),
            'expires_at' => $validatedData['expires_at'],
        ]);

        return redirect()->route('admin.short-urls.index')
            ->with('success', 'Short URL updated successfully.');
    }

    public function destroy(ShortUrl $urlToDelete)
    {
        $this->authorizeShortUrl($urlToDelete);

        $urlToDelete->delete();

        return redirect()->route('admin.short-urls.index')
            ->with('success', 'Short URL deleted successfully.');
    }
}
