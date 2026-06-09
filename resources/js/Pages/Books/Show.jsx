import { Link } from '@inertiajs/react';

export default function Show({ book }) {
    return (
        <div style={{ padding: '30px' }}>
            <h1>Book Details</h1>

            <Link href="/books">Back to Books</Link>

            <br /><br />

            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Published Year:</strong> {book.published_year}</p>
            <p><strong>Total Copies:</strong> {book.total_copies}</p>
            <p><strong>Available Copies:</strong> {book.available_copies}</p>
            <p><strong>Status:</strong> {book.status}</p>
        </div>
    );
}