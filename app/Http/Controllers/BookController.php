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
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'isbn' => 'required|unique:books,isbn',
            'category' => 'nullable',
            'published_year' => 'nullable|integer',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'required|integer|min:0',
            'status' => 'required',
        ]);

        Book::create($request->all());

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
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'isbn' => 'required|unique:books,isbn,' . $book->id,
            'category' => 'nullable',
            'published_year' => 'nullable|integer',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'required|integer|min:0',
            'status' => 'required',
        ]);

        $book->update($request->all());

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