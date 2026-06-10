import { Link, router, usePage } from '@inertiajs/react';

export default function Index({ borrowings }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    function returnBook(id) {
        if (confirm('Are you sure you want to mark this book as returned?')) {
            router.put(`/borrowings/${id}`);
        }
    }

    function deleteBorrowing(id) {
        if (confirm('Are you sure you want to delete this borrowing record?')) {
            router.delete(`/borrowings/${id}`);
        }
    }

    function statusStyle(status) {
        if (status === 'returned') return styles.returnedBadge;
        if (status === 'overdue') return styles.overdueBadge;
        return styles.borrowedBadge;
    }

    function formatDate(date) {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>
                        {isAdmin ? 'All Borrowing Records' : 'My Borrowed Books'}
                    </h1>
                    <p style={styles.subtitle}>
                        {isAdmin
                            ? 'Manage borrowed books and mark returned books.'
                            : 'View your borrowed books and return status.'}
                    </p>
                </div>

                <div>
                    <Link href="/dashboard" style={styles.grayButton}>
                        Dashboard
                    </Link>

                    <Link href="/borrow-requests" style={styles.blueButton}>
                        Borrow Requests
                    </Link>

                    <Link href="/books" style={styles.greenButton}>
                        Books
                    </Link>
                </div>
            </div>

            <div style={styles.card}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>

                            {isAdmin && (
                                <th style={styles.th}>User</th>
                            )}

                            <th style={styles.th}>Book</th>
                            <th style={styles.th}>Author</th>
                            <th style={styles.th}>Borrowed Date</th>
                            <th style={styles.th}>Due Date</th>
                            <th style={styles.th}>Returned Date</th>
                            <th style={styles.th}>Status</th>

                            {isAdmin && (
                                <th style={styles.th}>Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {borrowings.length > 0 ? (
                            borrowings.map((borrowing) => (
                                <tr key={borrowing.id} style={styles.tr}>
                                    <td style={styles.td}>{borrowing.id}</td>

                                    {isAdmin && (
                                        <td style={styles.td}>
                                            <strong>{borrowing.user?.name}</strong>
                                            <br />
                                            <span style={styles.smallText}>
                                                {borrowing.user?.email}
                                            </span>
                                        </td>
                                    )}

                                    <td style={styles.td}>
                                        <strong>{borrowing.book?.title}</strong>
                                    </td>

                                    <td style={styles.td}>
                                        {borrowing.book?.author || 'N/A'}
                                    </td>

                                    <td style={styles.td}>
                                        {formatDate(borrowing.borrowed_date)}
                                    </td>

                                    <td style={styles.td}>
                                        {formatDate(borrowing.due_date)}
                                    </td>

                                    <td style={styles.td}>
                                        {formatDate(borrowing.returned_date)}
                                    </td>

                                    <td style={styles.td}>
                                        <span style={statusStyle(borrowing.status)}>
                                            {borrowing.status}
                                        </span>
                                    </td>

                                    {isAdmin && (
                                        <td style={styles.td}>
                                            <div style={styles.actionBox}>
                                                {borrowing.status !== 'returned' ? (
                                                    <button
                                                        onClick={() => returnBook(borrowing.id)}
                                                        style={styles.returnButton}
                                                    >
                                                        Return
                                                    </button>
                                                ) : (
                                                    <span style={styles.noActionText}>
                                                        Returned
                                                    </span>
                                                )}

                                                <button
                                                    onClick={() => deleteBorrowing(borrowing.id)}
                                                    style={styles.deleteButton}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={isAdmin ? 9 : 8}
                                    style={styles.emptyText}
                                >
                                    No borrowing records found.
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
        gap: '20px',
    },
    title: {
        fontSize: '34px',
        color: '#111827',
        margin: 0,
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
        verticalAlign: 'middle',
    },
    smallText: {
        color: '#6b7280',
        fontSize: '12px',
    },
    actionBox: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    grayButton: {
        textDecoration: 'none',
        background: '#6b7280',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '8px',
        marginRight: '10px',
        fontSize: '14px',
        display: 'inline-block',
    },
    blueButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '8px',
        marginRight: '10px',
        fontSize: '14px',
        display: 'inline-block',
    },
    greenButton: {
        textDecoration: 'none',
        background: '#16a34a',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        display: 'inline-block',
    },
    returnButton: {
        background: '#16a34a',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
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
    borrowedBadge: {
        background: '#dbeafe',
        color: '#1e40af',
        padding: '6px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    returnedBadge: {
        background: '#dcfce7',
        color: '#166534',
        padding: '6px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    overdueBadge: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '6px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    noActionText: {
        color: '#6b7280',
        fontSize: '13px',
        fontWeight: 'bold',
    },
    emptyText: {
        padding: '30px',
        textAlign: 'center',
        color: '#6b7280',
    },
};