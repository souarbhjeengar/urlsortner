<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use Illuminate\Support\Facades\Auth;

class RedirectController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function redirect($shortCode)
    {
        $currentUser = Auth::user();
        $requestedUrl = ShortUrl::where('short_code', $shortCode)->with(['user'])->first();

        if (!$requestedUrl) {
            abort(404, 'Short URL not found');
        }

        if (!$requestedUrl->isAccessible()) {
            abort(410, 'Short URL is no longer available');
        }

        $this->authorizeAccess($currentUser, $requestedUrl);

        $requestedUrl->incrementClicks();

        return redirect($requestedUrl->original_url);
    }

    private function authorizeAccess($userToCheck, $urlToAccess)
    {
        if ($userToCheck->hasRole('superAdmin')) {
            return;
        }

        if ($userToCheck->hasRole('admin')) {
            if (!$userToCheck->company_id || $urlToAccess->user->company_id !== $userToCheck->company_id) {
                abort(403, 'You can only access URLs from your company.');
            }
            return;
        }

        if ($userToCheck->hasRole('user')) {
            if ($urlToAccess->user_id !== $userToCheck->id) {
                abort(403, 'You can only access your own URLs.');
            }
            return;
        }

        abort(403, 'Access denied.');
    }
}
