import { Link, router } from '@inertiajs/react';

export default function Index({ books }) {
    function deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(`/books/${id}`);
        }
    }

    return (
        <div style={{ padding: '30px' }}>
            <h1>Book List</h1>

            <Link href="/books/create">Add New Book</Link>

            <br /><br />

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Category</th>
                        <th>Total Copies</th>
                        <th>Available Copies</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.category}</td>
                            <td>{book.total_copies}</td>
                            <td>{book.available_copies}</td>
                            <td>{book.status}</td>
                            <td>
                                <Link href={`/books/${book.id}`}>View</Link>{' '}
                                <Link href={`/books/${book.id}/edit`}>Edit</Link>{' '}
                                <button onClick={() => deleteBook(book.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}