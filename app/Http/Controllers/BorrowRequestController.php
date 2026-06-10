<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\BorrowRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BorrowRequestController extends Controller
{
    /**
     * Display borrow requests.
     */
    public function index()
    {
        if (auth()->user()->role === 'admin') {
            // Admin can see all borrow requests
            $borrowRequests = BorrowRequest::with(['user', 'book'])
                ->latest()
                ->get();
        } else {
            // Normal user can see only own borrow requests
            $borrowRequests = BorrowRequest::with(['book'])
                ->where('user_id', auth()->id())
                ->latest()
                ->get();
        }

        return Inertia::render('BorrowRequests/Index', [
            'borrowRequests' => $borrowRequests,
        ]);
    }

    /**
     * Show create page.
     * Not needed because user requests from Books/Index.jsx button.
     */
    public function create()
    {
        return redirect()->route('books.index');
    }

    /**
     * Store a newly created borrow request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $book = Book::findOrFail($request->book_id);

        if ($book->available_copies <= 0 || $book->status !== 'available') {
            return redirect()->back()
                ->with('error', 'This book is not available for borrowing.');
        }

        $existingRequest = BorrowRequest::where('user_id', auth()->id())
            ->where('book_id', $book->id)
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return redirect()->back()
                ->with('error', 'You already have a pending request for this book.');
        }

        BorrowRequest::create([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
            'request_date' => now(),
            'status' => 'pending',
        ]);

        return redirect()->back()
            ->with('success', 'Borrow request sent successfully.');
    }

    /**
     * Display one borrow request.
     */
    public function show(BorrowRequest $borrowRequest)
    {
        $borrowRequest->load(['user', 'book']);

        return Inertia::render('BorrowRequests/Show', [
            'borrowRequest' => $borrowRequest,
        ]);
    }

    /**
     * Edit page not needed for borrow request.
     */
    public function edit(BorrowRequest $borrowRequest)
    {
        return redirect()->route('borrow-requests.index');
    }

    /**
     * Update borrow request.
     * Not needed because admin will use approve/reject.
     */
    public function update(Request $request, BorrowRequest $borrowRequest)
    {
        return redirect()->route('borrow-requests.index');
    }

    /**
     * Delete borrow request.
     */
    public function destroy(BorrowRequest $borrowRequest)
    {
        if (auth()->user()->role !== 'admin' && $borrowRequest->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        if ($borrowRequest->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Only pending requests can be deleted.');
        }

        $borrowRequest->delete();

        return redirect()->back()
            ->with('success', 'Borrow request deleted successfully.');
    }

    /**
     * Admin approves borrow request.
     */
    public function approve(BorrowRequest $borrowRequest)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Only admin can approve borrow requests.');
        }

        if ($borrowRequest->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Only pending requests can be approved.');
        }

        DB::transaction(function () use ($borrowRequest) {
            $book = Book::lockForUpdate()->findOrFail($borrowRequest->book_id);

            if ($book->available_copies <= 0 || $book->status !== 'available') {
                throw new \Exception('Book is not available.');
            }

            $borrowRequest->update([
                'status' => 'approved',
            ]);

            Borrowing::create([
                'user_id' => $borrowRequest->user_id,
                'book_id' => $borrowRequest->book_id,
                'borrowed_date' => now(),
                'due_date' => now()->addDays(14),
                'returned_date' => null,
                'status' => 'borrowed',
            ]);

            $book->decrement('available_copies');

            if ($book->available_copies <= 1) {
                $book->update([
                    'status' => 'unavailable',
                ]);
            }
        });

        return redirect()->back()
            ->with('success', 'Borrow request approved successfully.');
    }

    /**
     * Admin rejects borrow request.
     */
    public function reject(BorrowRequest $borrowRequest)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Only admin can reject borrow requests.');
        }

        if ($borrowRequest->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Only pending requests can be rejected.');
        }

        $borrowRequest->update([
            'status' => 'rejected',
        ]);

        return redirect()->back()
            ->with('success', 'Borrow request rejected successfully.');
    }
}