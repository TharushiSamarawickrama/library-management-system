import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ borrowRequests }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    function approveRequest(id) {
        if (confirm('Are you sure you want to approve this request?')) {
            router.post(`/borrow-requests/${id}/approve`);
        }
    }

    function rejectRequest(id) {
        if (confirm('Are you sure you want to reject this request?')) {
            router.post(`/borrow-requests/${id}/reject`);
        }
    }

    function deleteRequest(id) {
        if (confirm('Are you sure you want to cancel this request?')) {
            router.delete(`/borrow-requests/${id}`);
        }
    }

    function statusStyle(status) {
        if (status === 'approved') return styles.approvedBadge;
        if (status === 'rejected') return styles.rejectedBadge;
        return styles.pendingBadge;
    }

    function formatDate(date) {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
    }

    const pendingCount = borrowRequests.filter(
        (request) => request.status === 'pending'
    ).length;

    const approvedCount = borrowRequests.filter(
        (request) => request.status === 'approved'
    ).length;

    const rejectedCount = borrowRequests.filter(
        (request) => request.status === 'rejected'
    ).length;

    return (
        <>
            <Head title={isAdmin ? 'Borrow Requests' : 'My Borrow Requests'} />

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

                            <Link href="/books" style={styles.navLink}>
                                📖 {isAdmin ? 'Manage Books' : 'View Books'}
                            </Link>

                            <Link href="/borrow-requests" style={styles.activeNavLink}>
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
                            <h1 style={styles.title}>
                                {isAdmin ? 'Borrow Requests' : 'My Borrow Requests'}
                            </h1>
                            <p style={styles.subtitle}>
                                {isAdmin
                                    ? 'Review users’ book requests and approve or reject them.'
                                    : 'Track the status of your submitted borrow requests.'}
                            </p>
                        </div>

                        <div style={styles.topActions}>
                            <Link href="/dashboard" style={styles.grayButton}>
                                Dashboard
                            </Link>

                            <Link href="/books" style={styles.blueButton}>
                                Books
                            </Link>
                        </div>
                    </div>

                    <div style={styles.heroCard}>
                        <div>
                            <h2 style={styles.heroTitle}>
                                {isAdmin ? 'Request Management' : 'Request Status Tracking'}
                            </h2>
                            <p style={styles.heroText}>
                                {isAdmin
                                    ? 'Approve valid borrow requests, reject unavailable requests, and keep borrowing records accurate.'
                                    : 'View your pending, approved, and rejected borrow requests in one place.'}
                            </p>
                        </div>

                        <div style={styles.heroIcon}>📝</div>
                    </div>

                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIconBlue}>📄</div>
                            <div>
                                <h3 style={styles.statTitle}>{borrowRequests.length}</h3>
                                <p style={styles.statText}>Total Requests</p>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIconOrange}>⏳</div>
                            <div>
                                <h3 style={styles.statTitle}>{pendingCount}</h3>
                                <p style={styles.statText}>Pending</p>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIconGreen}>✅</div>
                            <div>
                                <h3 style={styles.statTitle}>{approvedCount}</h3>
                                <p style={styles.statText}>Approved</p>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIconRed}>❌</div>
                            <div>
                                <h3 style={styles.statTitle}>{rejectedCount}</h3>
                                <p style={styles.statText}>Rejected</p>
                            </div>
                        </div>
                    </div>

                    <div style={styles.contentCard}>
                        <div style={styles.tableHeader}>
                            <div>
                                <h2 style={styles.tableTitle}>
                                    {isAdmin ? 'All Borrow Requests' : 'My Request History'}
                                </h2>
                                <p style={styles.tableSubtitle}>
                                    Clean overview of book request details and actions.
                                </p>
                            </div>

                            <Link href="/borrowings" style={styles.recordButton}>
                                Borrowing Records
                            </Link>
                        </div>

                        {borrowRequests.length > 0 ? (
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Book</th>

                                            {isAdmin && (
                                                <th style={styles.th}>User</th>
                                            )}

                                            <th style={styles.th}>Request Date</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={styles.th}>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {borrowRequests.map((request) => (
                                            <tr key={request.id} style={styles.tr}>
                                                <td style={styles.bookCell}>
                                                    <div style={styles.bookIcon}>📖</div>
                                                    <div>
                                                        <p style={styles.bookTitle}>
                                                            {request.book?.title || 'N/A'}
                                                        </p>
                                                        <p style={styles.authorText}>
                                                            {request.book?.author || 'N/A'}
                                                        </p>
                                                        <p style={styles.idText}>
                                                            Request ID: {request.id}
                                                        </p>
                                                    </div>
                                                </td>

                                                {isAdmin && (
                                                    <td style={styles.userCell}>
                                                        <strong style={styles.userName}>
                                                            {request.user?.name || 'N/A'}
                                                        </strong>
                                                        <p style={styles.userEmail}>
                                                            {request.user?.email || 'N/A'}
                                                        </p>
                                                    </td>
                                                )}

                                                <td style={styles.td}>
                                                    {formatDate(request.request_date)}
                                                </td>

                                                <td style={styles.td}>
                                                    <span style={statusStyle(request.status)}>
                                                        {request.status}
                                                    </span>
                                                </td>

                                                <td style={styles.td}>
                                                    <div style={styles.actionBox}>
                                                        {isAdmin && request.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() =>
                                                                        approveRequest(request.id)
                                                                    }
                                                                    style={styles.approveButton}
                                                                >
                                                                    Approve
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        rejectRequest(request.id)
                                                                    }
                                                                    style={styles.rejectButton}
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}

                                                        {!isAdmin && request.status === 'pending' && (
                                                            <button
                                                                onClick={() =>
                                                                    deleteRequest(request.id)
                                                                }
                                                                style={styles.cancelButton}
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}

                                                        {request.status !== 'pending' && (
                                                            <span style={styles.noActionText}>
                                                                No action needed
                                                            </span>
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
                                <div style={styles.emptyIcon}>📝</div>
                                <h3 style={styles.emptyTitle}>No borrow requests found</h3>
                                <p style={styles.emptyText}>
                                    {isAdmin
                                        ? 'There are no borrow requests submitted by users yet.'
                                        : 'You have not submitted any borrow requests yet.'}
                                </p>

                                {!isAdmin && (
                                    <Link href="/books" style={styles.emptyButton}>
                                        Browse Books
                                    </Link>
                                )}
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

    blueButton: {
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

    statIconRed: {
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: '#fee2e2',
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
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

    recordButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
        whiteSpace: 'nowrap',
    },

    tableWrapper: {
        overflowX: 'auto',
    },

    table: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '880px',
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

    userCell: {
        padding: '16px',
        minWidth: '220px',
    },

    userName: {
        color: '#111827',
        fontSize: '14px',
    },

    userEmail: {
        margin: '5px 0 0',
        color: '#6b7280',
        fontSize: '13px',
    },

    pendingBadge: {
        background: '#fef3c7',
        color: '#92400e',
        padding: '7px 11px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '13px',
        display: 'inline-block',
    },

    approvedBadge: {
        background: '#dcfce7',
        color: '#166534',
        padding: '7px 11px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: '13px',
        display: 'inline-block',
    },

    rejectedBadge: {
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
        gap: '8px',
        alignItems: 'center',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
    },

    approveButton: {
        background: '#16a34a',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    rejectButton: {
        background: '#dc2626',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    cancelButton: {
        background: '#f97316',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    noActionText: {
        background: '#f3f4f6',
        color: '#6b7280',
        padding: '8px 12px',
        borderRadius: '8px',
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

    emptyButton: {
        display: 'inline-block',
        marginTop: '15px',
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '11px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },
};