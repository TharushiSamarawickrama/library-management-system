<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowRequestController;
use App\Http\Controllers\BorrowingController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {

    if (auth()->user()->role === 'admin') {
        return view('admin.dashboard');
    }

    return view('user.dashboard');

})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {

    Route::resource('books', BookController::class);

    Route::resource('borrow-requests', BorrowRequestController::class);

    Route::resource('borrowings', BorrowingController::class);

});

require __DIR__.'/auth.php';