import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ books }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

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

    const totalCopies = books.reduce(
        (total, book) => total + Number(book.total_copies || 0),
        0
    );

    const availableCopies = books.reduce(
        (total, book) => total + Number(book.available_copies || 0),
        0
    );

    const availableBooks = books.filter(
        (book) => book.status === 'available'
    ).length;

    return (
        <>
            <Head title="Library Books" />

            <div style={styles.page}>
                <aside style={styles.sidebar}>
                    <div>
                        <div style={styles.logoBox}>
                            <div style={styles.logoIcon}>📚</div>
                            <div>
                                <h2 style={styles.logoTitle}>Library LMS</h2>
                                <p style={styles.logoText}>
                                    {isAdmin ? 'Admin Panel' : 'User Panel'}
                                </p>
                            </div>
                        </div>

                        <nav style={styles.nav}>
                            <Link href="/dashboard" style={styles.navLink}>
                                🏠 Dashboard
                            </Link>

                            <Link href="/books" style={styles.activeNavLink}>
                                📖 {isAdmin ? 'Manage Books' : 'View Books'}
                            </Link>

                            <Link href="/borrow-requests" style={styles.navLink}>
                                📝 {isAdmin ? 'Borrow Requests' : 'My Requests'}
                            </Link>

                            <Link href="/borrowings" style={styles.navLink}>
                                🔄 {isAdmin ? 'Borrowing Records' : 'My Borrowed Books'}
                            </Link>
                        </nav>
                    </div>

                    <Link href="/logout" method="post" as="button" style={styles.logoutButton}>
                        Logout
                    </Link>
                </aside>

                <main style={styles.main}>
                    <div style={styles.topBar}>
                        <div>
                            <h1 style={styles.title}>Library Books</h1>
                            <p style={styles.subtitle}>
                                {isAdmin
                                    ? 'Manage book records, availability, and user borrowing actions.'
                                    : 'Browse books and request available books from the library.'}
                            </p>
                        </div>

                        <div style={styles.topActions}>
                            <Link href="/dashboard" style={styles.grayButton}>
                                Dashboard
                            </Link>

                            {isAdmin && (
                                <Link href="/books/create" style={styles.addButton}>
                                    + Add New Book
                                </Link>
                            )}
                        </div>
                    </div>

                    <div style={styles.heroCard}>
                        <div>
                            <h2 style={styles.heroTitle}>
                                {isAdmin ? 'Book Collection Management' : 'Library Collection'}
                            </h2>
                            <p style={styles.heroText}>
                                {isAdmin
                                    ? 'Keep book details accurate and manage availability in a clean admin workspace.'
                                    : 'Find books, check availability, and send borrow requests easily.'}
                            </p>
                        </div>

                        <div style={styles.heroIcon}>📘</div>
                    </div>

                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIconBlue}>📚</div>
                            <div>
                                <h3 style={styles.statTitle}>{books.length}</h3>
                                <p style={styles.statText}>Total Books</p>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIconGreen}>✅</div>
                            <div>
                                <h3 style={styles.statTitle}>{availableBooks}</h3>
                                <p style={styles.statText}>Available Books</p>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIconOrange}>📦</div>
                            <div>
                                <h3 style={styles.statTitle}>{availableCopies}</h3>
                                <p style={styles.statText}>Available Copies</p>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIconPurple}>📊</div>
                            <div>
                                <h3 style={styles.statTitle}>{totalCopies}</h3>
                                <p style={styles.statText}>Total Copies</p>
                            </div>
                        </div>
                    </div>

                    <div style={styles.contentCard}>
                        <div style={styles.tableHeader}>
                            <div>
                                <h2 style={styles.tableTitle}>Book List</h2>
                                <p style={styles.tableSubtitle}>
                                    Clean overview of all library books and actions.
                                </p>
                            </div>
                        </div>

                        {books.length > 0 ? (
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Book</th>
                                            <th style={styles.th}>ISBN</th>
                                            <th style={styles.th}>Category</th>
                                            <th style={styles.th}>Copies</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {books.map((book) => (
                                            <tr key={book.id} style={styles.tr}>
                                                <td style={styles.bookCell}>
                                                    <div style={styles.bookIcon}>📖</div>
                                                    <div>
                                                        <p style={styles.bookTitle}>{book.title}</p>
                                                        <p style={styles.authorText}>{book.author}</p>
                                                        <p style={styles.idText}>ID: {book.id}</p>
                                                    </div>
                                                </td>

                                                <td style={styles.td}>{book.isbn}</td>

                                                <td style={styles.td}>
                                                    <span style={styles.categoryBadge}>
                                                        {book.category || 'N/A'}
                                                    </span>
                                                </td>

                                                <td style={styles.td}>
                                                    <div style={styles.copyBox}>
                                                        <span style={styles.copyMain}>
                                                            {book.available_copies}
                                                        </span>
                                                        <span style={styles.copySub}>
                                                            of {book.total_copies}
                                                        </span>
                                                    </div>
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
                                                                Request
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={styles.emptyBox}>
                                <div style={styles.emptyIcon}>📚</div>
                                <h3 style={styles.emptyTitle}>No books found</h3>
                                <p style={styles.emptyText}>
                                    There are no books available in the system.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        background: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
    },

    sidebar: {
        width: '260px',
        background: '#111827',
        color: '#ffffff',
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxSizing: 'border-box',
    },

    logoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '45px',
    },

    logoIcon: {
        width: '48px',
        height: '48px',
        background: '#2563eb',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
    },

    logoTitle: {
        margin: 0,
        fontSize: '20px',
    },

    logoText: {
        margin: '4px 0 0',
        color: '#9ca3af',
        fontSize: '13px',
    },

    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },

    navLink: {
        color: '#d1d5db',
        textDecoration: 'none',
        padding: '13px 15px',
        borderRadius: '12px',
        fontSize: '15px',
    },

    activeNavLink: {
        color: '#ffffff',
        textDecoration: 'none',
        padding: '13px 15px',
        borderRadius: '12px',
        fontSize: '15px',
        background: '#2563eb',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.25)',
    },

    logoutButton: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '12px',
        background: '#dc2626',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: 'bold',
    },

    main: {
        flex: 1,
        padding: '35px 38px',
        maxWidth: 'calc(100vw - 260px)',
        boxSizing: 'border-box',
    },

    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
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
        fontSize: '15px',
        lineHeight: '1.5',
    },

    topActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
    },

    grayButton: {
        textDecoration: 'none',
        background: '#6b7280',
        color: '#ffffff',
        padding: '11px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    addButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '11px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
    },

    heroCard: {
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        color: '#ffffff',
        borderRadius: '18px',
        padding: '26px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '22px',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
    },

    heroTitle: {
        fontSize: '25px',
        margin: 0,
    },

    heroText: {
        color: '#dbeafe',
        lineHeight: '1.6',
        marginTop: '9px',
        maxWidth: '740px',
    },

    heroIcon: {
        width: '64px',
        height: '64px',
        borderRadius: '18px',
        background: 'rgba(255, 255, 255, 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        flexShrink: 0,
    },

    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '22px',
    },

    statCard: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
    },

    statIconBlue: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '23px',
        flexShrink: 0,
    },

    statIconGreen: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: '#dcfce7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '23px',
        flexShrink: 0,
    },

    statIconOrange: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: '#ffedd5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '23px',
        flexShrink: 0,
    },

    statIconPurple: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: '#ede9fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '23px',
        flexShrink: 0,
    },

    statTitle: {
        margin: 0,
        fontSize: '24px',
        color: '#111827',
    },

    statText: {
        margin: '4px 0 0',
        color: '#6b7280',
        fontSize: '13px',
    },

    contentCard: {
        background: '#ffffff',
        borderRadius: '18px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
    },

    tableHeader: {
        padding: '20px 24px',
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
    },

    tableTitle: {
        margin: 0,
        color: '#111827',
        fontSize: '22px',
    },

    tableSubtitle: {
        margin: '6px 0 0',
        color: '#6b7280',
        fontSize: '14px',
    },

    tableWrapper: {
        overflowX: 'auto',
    },

    table: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '920px',
    },

    th: {
        background: '#1f2937',
        color: '#ffffff',
        padding: '14px 16px',
        textAlign: 'left',
        fontSize: '13px',
        whiteSpace: 'nowrap',
    },

    tr: {
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
    },

    td: {
        padding: '16px',
        color: '#374151',
        fontSize: '14px',
        verticalAlign: 'middle',
    },

    bookCell: {
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '260px',
    },

    bookIcon: {
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
    },

    bookTitle: {
        margin: 0,
        color: '#111827',
        fontWeight: 'bold',
        fontSize: '15px',
        lineHeight: '1.4',
    },

    authorText: {
        margin: '4px 0 0',
        color: '#6b7280',
        fontSize: '13px',
    },

    idText: {
        margin: '3px 0 0',
        color: '#9ca3af',
        fontSize: '12px',
    },

    categoryBadge: {
        background: '#f3f4f6',
        color: '#374151',
        padding: '6px 10px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 'bold',
        display: 'inline-block',
        whiteSpace: 'nowrap',
    },

    copyBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },

    copyMain: {
        background: '#dcfce7',
        color: '#166534',
        padding: '6px 10px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '13px',
    },

    copySub: {
        color: '#6b7280',
        fontSize: '13px',
    },

    statusAvailable: {
        background: '#dbeafe',
        color: '#1e40af',
        padding: '7px 11px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '13px',
        display: 'inline-block',
    },

    statusUnavailable: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '7px 11px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '13px',
        display: 'inline-block',
    },

    actionBox: {
        display: 'flex',
        gap: '7px',
        alignItems: 'center',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
    },

    viewButton: {
        textDecoration: 'none',
        background: '#0ea5e9',
        color: '#ffffff',
        padding: '8px 11px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    editButton: {
        textDecoration: 'none',
        background: '#f59e0b',
        color: '#ffffff',
        padding: '8px 11px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    deleteButton: {
        background: '#dc2626',
        color: '#ffffff',
        border: 'none',
        padding: '8px 11px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    requestButton: {
        background: '#16a34a',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    disabledButton: {
        background: '#9ca3af',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'not-allowed',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    emptyBox: {
        padding: '50px',
        textAlign: 'center',
    },

    emptyIcon: {
        fontSize: '42px',
        marginBottom: '12px',
    },

    emptyTitle: {
        margin: 0,
        color: '#111827',
        fontSize: '22px',
    },

    emptyText: {
        color: '#6b7280',
        marginTop: '8px',
    },
};