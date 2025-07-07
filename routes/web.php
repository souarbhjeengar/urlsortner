<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ShortUrlController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\RedirectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class);
    Route::resource('urls/short', ShortUrlController::class)->names('short-urls');
    Route::resource('companies', CompanyController::class);
});

// Short URL redirect route (must be last to avoid conflicts)
Route::get('/s/{shortCode}', [RedirectController::class, 'redirect'])
    ->where('shortCode', '[a-zA-Z0-9]+')
    ->name('redirect');

require __DIR__.'/auth.php';
