<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display all books with search option.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $books = Book::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('author', 'like', '%' . $search . '%')
                    ->orWhere('category', 'like', '%' . $search . '%');
            })
            ->latest()
            ->get();

        return Inertia::render('Books/Index', [
            'books' => $books,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show add book form.
     */
    public function create()
    {
        return Inertia::render('Books/Create');
    }

    /**
     * Save new book to database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'isbn' => ['required', 'regex:/^[0-9]{10,13}$/', 'unique:books,isbn'],
            'category' => ['required', 'string', 'max:255'],
            'published_year' => ['nullable', 'integer'],
            'available_copies' => ['required', 'integer', 'min:0'],
            'total_copies' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'string'],
        ], [
            'title.required' => 'The title field is required',
            'isbn.regex' => 'The ISBN format is invalid',
            'available_copies.min' => 'The available copies must be at least 0',
        ]);

        $validated['total_copies'] = $validated['total_copies'] ?? $validated['available_copies'];

        if (!isset($validated['status'])) {
            $validated['status'] = $validated['available_copies'] > 0 ? 'available' : 'unavailable';
        }

        Book::create($validated);

        return redirect()->route('books.index')
            ->with('success', 'Book added successfully.');
    }

    /**
     * Display one book.
     */
    public function show(Book $book)
    {
        return Inertia::render('Books/Show', [
            'book' => $book,
        ]);
    }

    /**
     * Show edit book form.
     */
    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', [
            'book' => $book,
        ]);
    }

    /**
     * Update book details.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'isbn' => ['required', 'regex:/^[0-9]{10,13}$/', 'unique:books,isbn,' . $book->id],
            'category' => ['required', 'string', 'max:255'],
            'published_year' => ['nullable', 'integer'],
            'available_copies' => ['required', 'integer', 'min:0'],
            'total_copies' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'string'],
        ], [
            'title.required' => 'The title field is required',
            'isbn.regex' => 'The ISBN format is invalid',
            'available_copies.min' => 'The available copies must be at least 0',
        ]);

        $validated['total_copies'] = $validated['total_copies'] ?? $validated['available_copies'];

        if (!isset($validated['status'])) {
            $validated['status'] = $validated['available_copies'] > 0 ? 'available' : 'unavailable';
        }

        $book->update($validated);

        return redirect()->route('books.index')
            ->with('success', 'Book updated successfully.');
    }

    /**
     * Delete book.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')
            ->with('success', 'Book deleted successfully.');
    }
}