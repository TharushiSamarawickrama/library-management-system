<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\BorrowRequestController;
use App\Http\Controllers\ProfileController;
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
    if (auth()->user()->role === 'admin') {
        return Inertia::render('Admin/Dashboard');
    }

    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Common book route: admin and student can view book list
    Route::get('/books', [BookController::class, 'index'])->name('books.index');

    // Borrow request routes: students and admins can view requests
    Route::get('/borrow-requests', [BorrowRequestController::class, 'index'])->name('borrow-requests.index');
    Route::post('/borrow-requests', [BorrowRequestController::class, 'store'])->name('borrow-requests.store');
    Route::get('/borrow-requests/{borrowRequest}', [BorrowRequestController::class, 'show'])->name('borrow-requests.show');
});

// Admin-only routes
Route::middleware(['auth', 'admin'])->group(function () {
    // Book management routes
    // Important: /books/create must be before /books/{book}
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
    Route::put('/books/{book}', [BookController::class, 'update'])->name('books.update');
    Route::patch('/books/{book}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');

    // Borrowings are admin-only
    Route::resource('borrowings', BorrowingController::class);

    // Admin approve/reject borrow requests
    Route::post('/borrow-requests/{borrowRequest}/approve', [BorrowRequestController::class, 'approve'])
        ->name('borrow-requests.approve');

    Route::post('/borrow-requests/{borrowRequest}/reject', [BorrowRequestController::class, 'reject'])
        ->name('borrow-requests.reject');
});

// Common book detail route
// Keep this after /books/create and /books/{book}/edit
Route::middleware('auth')->group(function () {
    Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
});

require __DIR__.'/auth.php';