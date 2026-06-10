import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div style={styles.page}>
            <aside style={styles.sidebar}>
                <div style={styles.logoBox}>
                    <div style={styles.logoIcon}>📚</div>
                    <div>
                        <h2 style={styles.logoTitle}>Library LMS</h2>
                        <p style={styles.logoText}>User Panel</p>
                    </div>
                </div>

                <nav style={styles.nav}>
                    <Link href="/dashboard" style={styles.activeNavLink}>
                        🏠 Dashboard
                    </Link>

                    <Link href="/books" style={styles.navLink}>
                        📖 View Books
                    </Link>

                    <Link href="/borrow-requests" style={styles.navLink}>
                        📝 My Borrow Requests
                    </Link>

                    <Link href="/borrowings" style={styles.navLink}>
                        🔄 My Borrowed Books
                    </Link>
                </nav>

                <div style={styles.logoutBox}>
                    <Link href="/logout" method="post" as="button" style={styles.logoutButton}>
                        Logout
                    </Link>
                </div>
            </aside>

            <main style={styles.main}>
                <div style={styles.topBar}>
                    <div>
                        <h1 style={styles.title}>User Dashboard</h1>
                        <p style={styles.subtitle}>
                            Welcome back! Browse books, request borrowings, and track your library activity.
                        </p>
                    </div>

                    <div style={styles.userBadge}>
                        User
                    </div>
                </div>

                <div style={styles.heroCard}>
                    <div>
                        <h2 style={styles.heroTitle}>Welcome to Library Management System</h2>
                        <p style={styles.heroText}>
                            Search available books, send borrow requests, and monitor your borrowed books easily from one place.
                        </p>
                    </div>

                    <Link href="/books" style={styles.heroButton}>
                        Browse Books
                    </Link>
                </div>

                <div style={styles.cardGrid}>
                    <Link href="/books" style={styles.card}>
                        <div style={styles.cardIconBlue}>📖</div>
                        <h3 style={styles.cardTitle}>View Books</h3>
                        <p style={styles.cardText}>
                            Browse available books and check book details.
                        </p>
                        <span style={styles.cardAction}>Open Books →</span>
                    </Link>

                    <Link href="/borrow-requests" style={styles.card}>
                        <div style={styles.cardIconOrange}>📝</div>
                        <h3 style={styles.cardTitle}>My Borrow Requests</h3>
                        <p style={styles.cardText}>
                            View the status of your pending, approved, or rejected requests.
                        </p>
                        <span style={styles.cardAction}>View Requests →</span>
                    </Link>

                    <Link href="/borrowings" style={styles.card}>
                        <div style={styles.cardIconGreen}>🔄</div>
                        <h3 style={styles.cardTitle}>My Borrowed Books</h3>
                        <p style={styles.cardText}>
                            Track your borrowed books, due dates, and returned books.
                        </p>
                        <span style={styles.cardAction}>View Borrowings →</span>
                    </Link>
                </div>

                <div style={styles.quickSection}>
                    <h2 style={styles.sectionTitle}>Quick Actions</h2>

                    <div style={styles.quickGrid}>
                        <Link href="/books" style={styles.quickButton}>
                            Browse Books
                        </Link>

                        <Link href="/borrow-requests" style={styles.quickButton}>
                            My Requests
                        </Link>

                        <Link href="/borrowings" style={styles.quickButton}>
                            Borrowed Books
                        </Link>

                        <Link href="/profile" style={styles.quickButton}>
                            Profile Settings
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
    },
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '35px',
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
        padding: '12px 14px',
        borderRadius: '10px',
        fontSize: '15px',
        background: 'transparent',
    },
    activeNavLink: {
        color: '#ffffff',
        textDecoration: 'none',
        padding: '12px 14px',
        borderRadius: '10px',
        fontSize: '15px',
        background: '#2563eb',
    },
    logoutBox: {
        marginTop: '30px',
    },
    logoutButton: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '10px',
        background: '#dc2626',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: 'bold',
    },
    main: {
        flex: 1,
        padding: '35px',
    },
    topBar: {
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
    userBadge: {
        background: '#dbeafe',
        color: '#1e40af',
        padding: '10px 18px',
        borderRadius: '20px',
        fontWeight: 'bold',
    },
    heroCard: {
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        color: '#ffffff',
        borderRadius: '18px',
        padding: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
    },
    heroTitle: {
        fontSize: '28px',
        margin: 0,
    },
    heroText: {
        maxWidth: '650px',
        lineHeight: '1.6',
        color: '#dbeafe',
        marginTop: '10px',
    },
    heroButton: {
        background: '#ffffff',
        color: '#1e40af',
        textDecoration: 'none',
        padding: '12px 18px',
        borderRadius: '10px',
        fontWeight: 'bold',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '22px',
        marginBottom: '30px',
    },
    card: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '25px',
        textDecoration: 'none',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
        transition: '0.2s',
    },
    cardIconBlue: {
        width: '50px',
        height: '50px',
        borderRadius: '14px',
        background: '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '15px',
    },
    cardIconOrange: {
        width: '50px',
        height: '50px',
        borderRadius: '14px',
        background: '#ffedd5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '15px',
    },
    cardIconGreen: {
        width: '50px',
        height: '50px',
        borderRadius: '14px',
        background: '#dcfce7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '15px',
    },
    cardTitle: {
        color: '#111827',
        margin: '0 0 8px',
        fontSize: '20px',
    },
    cardText: {
        color: '#6b7280',
        lineHeight: '1.5',
        minHeight: '45px',
    },
    cardAction: {
        color: '#2563eb',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    quickSection: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    },
    sectionTitle: {
        color: '#111827',
        marginTop: 0,
        marginBottom: '18px',
    },
    quickGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
    },
    quickButton: {
        background: '#f3f4f6',
        color: '#111827',
        textDecoration: 'none',
        padding: '14px',
        borderRadius: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
};