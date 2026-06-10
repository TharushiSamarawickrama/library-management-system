import { Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div style={styles.page}>
            <aside style={styles.sidebar}>
                <div>
                    <div style={styles.logoBox}>
                        <div style={styles.logoIcon}>📚</div>
                        <div>
                            <h2 style={styles.logoTitle}>Library LMS</h2>
                            <p style={styles.logoText}>Admin Panel</p>
                        </div>
                    </div>

                    <nav style={styles.nav}>
                        <Link href="/dashboard" style={styles.activeNavLink}>
                            🏠 Dashboard
                        </Link>

                        <Link href="/books" style={styles.navLink}>
                            📖 Manage Books
                        </Link>

                        <Link href="/borrow-requests" style={styles.navLink}>
                            📝 Borrow Requests
                        </Link>

                        <Link href="/borrowings" style={styles.navLink}>
                            🔄 Borrowing Records
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
                        <h1 style={styles.title}>Admin Dashboard</h1>
                        <p style={styles.subtitle}>
                            Welcome back! Manage books, borrow requests, and borrowing records from one place.
                        </p>
                    </div>

                    <Link href="/profile" style={styles.profileBox}>
                        <div style={styles.profileIcon}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>

                        <div>
                            <p style={styles.profileName}>
                                {user?.name || 'Admin'}
                            </p>
                            <p style={styles.profileRole}>Administrator</p>
                        </div>
                    </Link>
                </div>

                <div style={styles.heroCard}>
                    <div>
                        <span style={styles.heroBadge}>Admin Workspace</span>

                        <h2 style={styles.heroTitle}>Library Management System</h2>

                        <p style={styles.heroText}>
                            Monitor library activities, manage book availability, review borrow requests,
                            and track borrowing records efficiently.
                        </p>
                    </div>

                    <Link href="/books/create" style={styles.heroButton}>
                        + Add New Book
                    </Link>
                </div>

                <div style={styles.cardGrid}>
                    <Link href="/books" style={styles.card}>
                        <div style={styles.cardTop}>
                            <div style={styles.cardIconBlue}>📚</div>
                            <span style={styles.cardBadgeBlue}>Books</span>
                        </div>

                        <h3 style={styles.cardTitle}>Manage Books</h3>

                        <p style={styles.cardText}>
                            Add new books, update existing book details, and manage book availability.
                        </p>

                        <span style={styles.cardAction}>Open Books →</span>
                    </Link>

                    <Link href="/borrow-requests" style={styles.card}>
                        <div style={styles.cardTop}>
                            <div style={styles.cardIconOrange}>📝</div>
                            <span style={styles.cardBadgeOrange}>Requests</span>
                        </div>

                        <h3 style={styles.cardTitle}>Borrow Requests</h3>

                        <p style={styles.cardText}>
                            Review pending borrow requests and approve or reject them quickly.
                        </p>

                        <span style={styles.cardAction}>View Requests →</span>
                    </Link>

                    <Link href="/borrowings" style={styles.card}>
                        <div style={styles.cardTop}>
                            <div style={styles.cardIconGreen}>🔄</div>
                            <span style={styles.cardBadgeGreen}>Records</span>
                        </div>

                        <h3 style={styles.cardTitle}>Borrowing Records</h3>

                        <p style={styles.cardText}>
                            Track borrowed books, due dates, returned books, and borrowing history.
                        </p>

                        <span style={styles.cardAction}>View Records →</span>
                    </Link>
                </div>

                <div style={styles.infoPanel}>
                    <div>
                        <h2 style={styles.infoTitle}>System Overview</h2>
                        <p style={styles.infoText}>
                            Use the sidebar or dashboard cards to navigate through the main modules of the
                            Library Management System.
                        </p>
                    </div>

                    <div style={styles.infoActions}>
                        <Link href="/books" style={styles.infoButton}>
                            Manage Books
                        </Link>

                        <Link href="/borrow-requests" style={styles.infoSecondaryButton}>
                            Check Requests
                        </Link>
                    </div>
                </div>
            </main>
        </div>
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
        marginBottom: '28px',
        gap: '20px',
    },

    title: {
        fontSize: '36px',
        color: '#111827',
        margin: 0,
    },

    subtitle: {
        color: '#6b7280',
        marginTop: '8px',
        fontSize: '15px',
        lineHeight: '1.5',
    },

    profileBox: {
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        borderRadius: '16px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        minWidth: '190px',
    },

    profileIcon: {
        width: '44px',
        height: '44px',
        borderRadius: '14px',
        background: '#2563eb',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.25)',
    },

    profileName: {
        margin: 0,
        color: '#111827',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    profileRole: {
        margin: '4px 0 0',
        color: '#6b7280',
        fontSize: '12px',
    },

    heroCard: {
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        color: '#ffffff',
        borderRadius: '20px',
        padding: '34px 36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '25px',
        marginBottom: '28px',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
    },

    heroBadge: {
        background: 'rgba(255, 255, 255, 0.18)',
        color: '#ffffff',
        padding: '8px 14px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 'bold',
        display: 'inline-block',
        marginBottom: '16px',
    },

    heroTitle: {
        fontSize: '30px',
        margin: 0,
    },

    heroText: {
        maxWidth: '760px',
        lineHeight: '1.7',
        color: '#dbeafe',
        marginTop: '12px',
        fontSize: '15px',
    },

    heroButton: {
        background: '#ffffff',
        color: '#1e40af',
        textDecoration: 'none',
        padding: '14px 20px',
        borderRadius: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 18px rgba(255, 255, 255, 0.18)',
    },

    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '22px',
        marginBottom: '28px',
    },

    card: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '26px',
        textDecoration: 'none',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        minHeight: '210px',
    },

    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
    },

    cardIconBlue: {
        width: '54px',
        height: '54px',
        borderRadius: '15px',
        background: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
    },

    cardIconOrange: {
        width: '54px',
        height: '54px',
        borderRadius: '15px',
        background: '#ffedd5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
    },

    cardIconGreen: {
        width: '54px',
        height: '54px',
        borderRadius: '15px',
        background: '#dcfce7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
    },

    cardBadgeBlue: {
        background: '#dbeafe',
        color: '#1e40af',
        padding: '6px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
    },

    cardBadgeOrange: {
        background: '#ffedd5',
        color: '#9a3412',
        padding: '6px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
    },

    cardBadgeGreen: {
        background: '#dcfce7',
        color: '#166534',
        padding: '6px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
    },

    cardTitle: {
        color: '#111827',
        margin: '0 0 10px',
        fontSize: '21px',
    },

    cardText: {
        color: '#6b7280',
        lineHeight: '1.6',
        minHeight: '70px',
        fontSize: '15px',
    },

    cardAction: {
        color: '#2563eb',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    infoPanel: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '26px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
    },

    infoTitle: {
        color: '#111827',
        margin: 0,
        fontSize: '22px',
    },

    infoText: {
        color: '#6b7280',
        lineHeight: '1.6',
        marginTop: '8px',
        maxWidth: '760px',
    },

    infoActions: {
        display: 'flex',
        gap: '10px',
        flexShrink: 0,
    },

    infoButton: {
        textDecoration: 'none',
        background: '#2563eb',
        color: '#ffffff',
        padding: '12px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    infoSecondaryButton: {
        textDecoration: 'none',
        background: '#f3f4f6',
        color: '#111827',
        padding: '12px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },
};