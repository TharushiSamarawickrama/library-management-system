import { Link, router, usePage } from '@inertiajs/react';

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
        if (confirm('Are you sure you want to delete this request?')) {
            router.delete(`/borrow-requests/${id}`);
        }
    }

    function statusStyle(status) {
        if (status === 'approved') return styles.approvedBadge;
        if (status === 'rejected') return styles.rejectedBadge;
        return styles.pendingBadge;
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>
                        {isAdmin ? 'All Borrow Requests' : 'My Borrow Requests'}
                    </h1>
                    <p style={styles.subtitle}>
                        {isAdmin
                            ? 'Review, approve, or reject users’ book borrow requests.'
                            : 'Track the status of your submitted book borrow requests.'}
                    </p>
                </div>

                <div>
                    <Link href="/dashboard" style={styles.grayButton}>
                        Dashboard
                    </Link>

                    <Link href="/books" style={styles.blueButton}>
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
                            <th style={styles.th}>Request Date</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {borrowRequests.length > 0 ? (
                            borrowRequests.map((request) => (
                                <tr key={request.id} style={styles.tr}>
                                    <td style={styles.td}>{request.id}</td>

                                    {isAdmin && (
                                        <td style={styles.td}>
                                            <strong>{request.user?.name}</strong>
                                            <br />
                                            <span style={styles.smallText}>
                                                {request.user?.email}
                                            </span>
                                        </td>
                                    )}

                                    <td style={styles.td}>
                                        <strong>{request.book?.title}</strong>
                                    </td>

                                    <td style={styles.td}>
                                        {request.book?.author}
                                    </td>

                                    <td style={styles.td}>
                                        {request.request_date
                                            ? new Date(request.request_date).toLocaleDateString()
                                            : 'N/A'}
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
                                                        onClick={() => approveRequest(request.id)}
                                                        style={styles.approveButton}
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() => rejectRequest(request.id)}
                                                        style={styles.rejectButton}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                            {!isAdmin && request.status === 'pending' && (
                                                <button
                                                    onClick={() => deleteRequest(request.id)}
                                                    style={styles.deleteButton}
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                            {request.status !== 'pending' && (
                                                <span style={styles.noActionText}>
                                                    No action
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={isAdmin ? 7 : 6}
                                    style={styles.emptyText}
                                >
                                    No borrow requests found.
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
    },
    blueButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
    },
    approveButton: {
        background: '#16a34a',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    rejectButton: {
        background: '#dc2626',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    deleteButton: {
        background: '#f97316',
        color: '#ffffff',
        border: 'none',
        padding: '7px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    pendingBadge: {
        background: '#fef3c7',
        color: '#92400e',
        padding: '6px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    approvedBadge: {
        background: '#dcfce7',
        color: '#166534',
        padding: '6px 10px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    rejectedBadge: {
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
    },
    emptyText: {
        padding: '30px',
        textAlign: 'center',
        color: '#6b7280',
    },
};