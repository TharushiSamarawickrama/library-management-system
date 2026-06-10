import { Link, router, usePage } from '@inertiajs/react';

export default function Index({ books }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    function deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(`/books/${id}`);
        }
    }

    function requestBorrow(bookId) {
        if (confirm('Do you want to request this book?')) {
            router.post('/borrow-requests', {
                book_id: bookId,
            });
        }
    }

    const isAdmin = user?.role === 'admin';

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Library Books</h1>
                    <p style={styles.subtitle}>
                        Manage and view all books in the library system
                    </p>
                </div>

                <div>
                    <Link href="/dashboard" style={styles.backButton}>
                        Dashboard
                    </Link>

                    {isAdmin && (
                        <Link href="/books/create" style={styles.addButton}>
                            + Add New Book
                        </Link>
                    )}
                </div>
            </div>

            <div style={styles.card}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Author</th>
                            <th style={styles.th}>ISBN</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Total</th>
                            <th style={styles.th}>Available</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.id} style={styles.tr}>
                                    <td style={styles.td}>{book.id}</td>
                                    <td style={styles.td}>
                                        <strong>{book.title}</strong>
                                    </td>
                                    <td style={styles.td}>{book.author}</td>
                                    <td style={styles.td}>{book.isbn}</td>
                                    <td style={styles.td}>
                                        {book.category || 'N/A'}
                                    </td>
                                    <td style={styles.td}>{book.total_copies}</td>
                                    <td style={styles.td}>
                                        <span
                                            style={
                                                book.available_copies > 0
                                                    ? styles.availableBadge
                                                    : styles.notAvailableBadge
                                            }
                                        >
                                            {book.available_copies}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span
                                            style={
                                                book.status === 'available'
                                                    ? styles.statusAvailable
                                                    : styles.statusUnavailable
                                            }
                                        >
                                            {book.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actionBox}>
                                            <Link
                                                href={`/books/${book.id}`}
                                                style={styles.viewButton}
                                            >
                                                View
                                            </Link>

                                            {isAdmin ? (
                                                <>
                                                    <Link
                                                        href={`/books/${book.id}/edit`}
                                                        style={styles.editButton}
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() => deleteBook(book.id)}
                                                        style={styles.deleteButton}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => requestBorrow(book.id)}
                                                    disabled={
                                                        book.available_copies <= 0 ||
                                                        book.status !== 'available'
                                                    }
                                                    style={
                                                        book.available_copies > 0 &&
                                                        book.status === 'available'
                                                            ? styles.requestButton
                                                            : styles.disabledButton
                                                    }
                                                >
                                                    Request Borrow
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={styles.emptyText}>
                                    No books found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
    },
    title: {
        fontSize: '34px',
        color: '#111827',
        margin: '0',
    },
    subtitle: {
        color: '#6b7280',
        marginTop: '8px',
    },
    card: {
        background: '#ffffff',
        borderRadius: '14px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        background: '#1f2937',
        color: '#ffffff',
        padding: '14px',
        textAlign: 'left',
        fontSize: '14px',
    },
    tr: {
        borderBottom: '1px solid #e5e7eb',
    },
    td: {
        padding: '14px',
        color: '#374151',
        fontSize: '14px',
    },
    actionBox: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
    },
    backButton: {
        textDecoration: 'none',
        background: '#6b7280',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '8px',
        marginRight: '10px',
        fontSize: '14px',
    },
    addButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
    },
    viewButton: {
        textDecoration: 'none',
        background: '#0ea5e9',
        color: '#ffffff',
        padding: '7px 10px',
        borderRadius: '6px',
        fontSize: '13px',
    },
    editButton: {
        textDecoration: 'none',
        background: '#f59e0b',
        color: '#ffffff',
        padding: '7px 10px',
        borderRadius: '6px',
        fontSize: '13px',
    },
    deleteButton: {
        background: '#dc2626',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    requestButton: {
        background: '#16a34a',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    disabledButton: {
        background: '#9ca3af',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'not-allowed',
        fontSize: '13px',
    },
    availableBadge: {
        background: '#dcfce7',
        color: '#166534',
        padding: '5px 9px',
        borderRadius: '20px',
        fontWeight: 'bold',
    },
    notAvailableBadge: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '5px 9px',
        borderRadius: '20px',
        fontWeight: 'bold',
    },
    statusAvailable: {
        background: '#dbeafe',
        color: '#1e40af',
        padding: '5px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    statusUnavailable: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '5px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    emptyText: {
        padding: '30px',
        textAlign: 'center',
        color: '#6b7280',
    },
};