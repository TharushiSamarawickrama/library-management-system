<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    /**
     * Display borrowings.
     */
    public function index()
    {
        if (auth()->user()->role === 'admin') {
            // Admin can see all borrowing records
            $borrowings = Borrowing::with(['user', 'book'])
                ->latest()
                ->get();
        } else {
            // Normal user can see only own borrowing records
            $borrowings = Borrowing::with(['book'])
                ->where('user_id', auth()->id())
                ->latest()
                ->get();
        }

        return Inertia::render('Borrowings/Index', [
            'borrowings' => $borrowings,
        ]);
    }

    /**
     * Create borrowing manually is not needed.
     * Borrowing is created when admin approves a borrow request.
     */
    public function create()
    {
        return redirect()->route('borrowings.index');
    }

    /**
     * Store borrowing manually is not needed.
     */
    public function store(Request $request)
    {
        return redirect()->route('borrowings.index');
    }

    /**
     * Display one borrowing record.
     */
    public function show(Borrowing $borrowing)
    {
        if (auth()->user()->role !== 'admin' && $borrowing->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $borrowing->load(['user', 'book']);

        return Inertia::render('Borrowings/Show', [
            'borrowing' => $borrowing,
        ]);
    }

    /**
     * Edit borrowing is not needed.
     */
    public function edit(Borrowing $borrowing)
    {
        return redirect()->route('borrowings.index');
    }

    /**
     * Mark book as returned.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Only admin can update borrowing records.');
        }

        if ($borrowing->status === 'returned') {
            return redirect()->back()
                ->with('error', 'This book has already been returned.');
        }

        DB::transaction(function () use ($borrowing) {
            $borrowing->update([
                'returned_date' => now(),
                'status' => 'returned',
            ]);

            $book = Book::lockForUpdate()->findOrFail($borrowing->book_id);

            $book->increment('available_copies');

            if ($book->available_copies >= 0) {
                $book->update([
                    'status' => 'available',
                ]);
            }
        });

        return redirect()->back()
            ->with('success', 'Book marked as returned successfully.');
    }

    /**
     * Delete borrowing record.
     */
    public function destroy(Borrowing $borrowing)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Only admin can delete borrowing records.');
        }

        $borrowing->delete();

        return redirect()->back()
            ->with('success', 'Borrowing record deleted successfully.');
    }
}