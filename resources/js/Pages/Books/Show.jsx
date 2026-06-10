import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ book }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    return (
        <>
            <Head title="Book Details" />

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
                            <h1 style={styles.title}>Book Details</h1>
                            <p style={styles.subtitle}>
                                View complete information about this library book.
                            </p>
                        </div>

                        <div style={styles.topActions}>
                            <Link href="/books" style={styles.grayButton}>
                                ← Back to Books
                            </Link>

                            {isAdmin && (
                                <Link href={`/books/${book.id}/edit`} style={styles.editTopButton}>
                                    Edit Book
                                </Link>
                            )}
                        </div>
                    </div>

                    <div style={styles.heroCard}>
                        <div>
                            <h2 style={styles.heroTitle}>{book.title}</h2>
                            <p style={styles.heroText}>
                                Written by {book.author}. Check availability, ISBN,
                                category, and copy information below.
                            </p>
                        </div>

                        <div style={styles.heroIcon}>📘</div>
                    </div>

                    <div style={styles.contentGrid}>
                        <div style={styles.detailsCard}>
                            <div style={styles.cardHeader}>
                                <div style={styles.cardIcon}>📖</div>
                                <div>
                                    <h2 style={styles.cardTitle}>Book Information</h2>
                                    <p style={styles.cardSubtitle}>
                                        Main details of the selected book.
                                    </p>
                                </div>
                            </div>

                            <div style={styles.detailsGrid}>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Title</span>
                                    <strong style={styles.detailValue}>{book.title}</strong>
                                </div>

                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Author</span>
                                    <strong style={styles.detailValue}>{book.author}</strong>
                                </div>

                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>ISBN</span>
                                    <strong style={styles.detailValue}>{book.isbn}</strong>
                                </div>

                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Category</span>
                                    <span style={styles.categoryBadge}>
                                        {book.category || 'N/A'}
                                    </span>
                                </div>

                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Published Year</span>
                                    <strong style={styles.detailValue}>
                                        {book.published_year || 'N/A'}
                                    </strong>
                                </div>

                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Status</span>
                                    <span
                                        style={
                                            book.status === 'available'
                                                ? styles.statusAvailable
                                                : styles.statusUnavailable
                                        }
                                    >
                                        {book.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.summaryCard}>
                            <div style={styles.summaryIcon}>📦</div>

                            <h2 style={styles.summaryTitle}>Copy Summary</h2>
                            <p style={styles.summaryText}>
                                Current copy availability for this book.
                            </p>

                            <div style={styles.copyBox}>
                                <div style={styles.copyItem}>
                                    <span style={styles.copyNumber}>
                                        {book.total_copies}
                                    </span>
                                    <span style={styles.copyLabel}>Total Copies</span>
                                </div>

                                <div style={styles.copyItem}>
                                    <span
                                        style={
                                            book.available_copies > 0
                                                ? styles.availableNumber
                                                : styles.notAvailableNumber
                                        }
                                    >
                                        {book.available_copies}
                                    </span>
                                    <span style={styles.copyLabel}>Available Copies</span>
                                </div>
                            </div>

                            <div style={styles.availabilityBox}>
                                {book.available_copies > 0 && book.status === 'available' ? (
                                    <p style={styles.availableText}>
                                        ✅ This book is currently available.
                                    </p>
                                ) : (
                                    <p style={styles.unavailableText}>
                                        ❌ This book is currently unavailable.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={styles.actionCard}>
                        <h2 style={styles.actionTitle}>Actions</h2>

                        <div style={styles.actionButtons}>
                            <Link href="/books" style={styles.backButton}>
                                Back to Book List
                            </Link>

                            {isAdmin && (
                                <Link href={`/books/${book.id}/edit`} style={styles.editButton}>
                                    Edit Book
                                </Link>
                            )}
                        </div>
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
        gap: '10px',
        alignItems: 'center',
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

    editTopButton: {
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
        padding: '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
    },

    heroTitle: {
        fontSize: '28px',
        margin: 0,
    },

    heroText: {
        color: '#dbeafe',
        lineHeight: '1.6',
        marginTop: '9px',
        maxWidth: '760px',
    },

    heroIcon: {
        width: '70px',
        height: '70px',
        borderRadius: '18px',
        background: 'rgba(255, 255, 255, 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '34px',
        flexShrink: 0,
    },

    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '22px',
        marginBottom: '22px',
    },

    detailsCard: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '28px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
    },

    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '24px',
    },

    cardIcon: {
        width: '54px',
        height: '54px',
        borderRadius: '14px',
        background: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        flexShrink: 0,
    },

    cardTitle: {
        margin: 0,
        color: '#111827',
        fontSize: '22px',
    },

    cardSubtitle: {
        margin: '5px 0 0',
        color: '#6b7280',
        fontSize: '14px',
    },

    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
    },

    detailItem: {
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },

    detailLabel: {
        color: '#6b7280',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    detailValue: {
        color: '#111827',
        fontSize: '15px',
    },

    categoryBadge: {
        background: '#f3f4f6',
        color: '#374151',
        padding: '7px 11px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 'bold',
        display: 'inline-block',
        width: 'fit-content',
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
        width: 'fit-content',
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
        width: 'fit-content',
    },

    summaryCard: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '28px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
    },

    summaryIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        background: '#ffedd5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        marginBottom: '18px',
    },

    summaryTitle: {
        margin: 0,
        color: '#111827',
        fontSize: '22px',
    },

    summaryText: {
        color: '#6b7280',
        lineHeight: '1.6',
        fontSize: '14px',
    },

    copyBox: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginTop: '20px',
    },

    copyItem: {
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '16px',
        textAlign: 'center',
    },

    copyNumber: {
        display: 'block',
        color: '#111827',
        fontSize: '28px',
        fontWeight: 'bold',
    },

    availableNumber: {
        display: 'block',
        color: '#166534',
        fontSize: '28px',
        fontWeight: 'bold',
    },

    notAvailableNumber: {
        display: 'block',
        color: '#991b1b',
        fontSize: '28px',
        fontWeight: 'bold',
    },

    copyLabel: {
        color: '#6b7280',
        fontSize: '13px',
        marginTop: '6px',
        display: 'block',
    },

    availabilityBox: {
        marginTop: '20px',
    },

    availableText: {
        background: '#dcfce7',
        color: '#166534',
        padding: '13px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    unavailableText: {
        background: '#fee2e2',
        color: '#991b1b',
        padding: '13px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    actionCard: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '24px 28px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
    },

    actionTitle: {
        margin: '0 0 16px',
        color: '#111827',
        fontSize: '22px',
    },

    actionButtons: {
        display: 'flex',
        gap: '12px',
    },

    backButton: {
        textDecoration: 'none',
        background: '#6b7280',
        color: '#ffffff',
        padding: '12px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    editButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '12px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
    },
};