import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ book }) {
    const { data, setData, put, processing, errors } = useForm({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        category: book.category || '',
        published_year: book.published_year || '',
        total_copies: book.total_copies || '',
        available_copies: book.available_copies || '',
        status: book.status || 'available',
    });

    function submit(e) {
        e.preventDefault();
        put(`/books/${book.id}`);
    }

    return (
        <>
            <Head title="Edit Book" />

            <div style={styles.page}>
                <aside style={styles.sidebar}>
                    <div style={styles.logoBox}>
                        <div style={styles.logoIcon}>📚</div>
                        <div>
                            <h2 style={styles.logoTitle}>Library LMS</h2>
                            <p style={styles.logoText}>Admin Panel</p>
                        </div>
                    </div>

                    <nav style={styles.nav}>
                        <Link href="/dashboard" style={styles.navLink}>
                            🏠 Dashboard
                        </Link>

                        <Link href="/books" style={styles.activeNavLink}>
                            📖 Manage Books
                        </Link>

                        <Link href="/borrow-requests" style={styles.navLink}>
                            📝 Borrow Requests
                        </Link>

                        <Link href="/borrowings" style={styles.navLink}>
                            🔄 Borrowing Records
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
                            <h1 style={styles.title}>Edit Book</h1>
                            <p style={styles.subtitle}>
                                Update book details and manage book availability.
                            </p>
                        </div>

                        <Link href="/books" style={styles.backButton}>
                            ← Back to Books
                        </Link>
                    </div>

                    <div style={styles.heroCard}>
                        <div>
                            <h2 style={styles.heroTitle}>{book.title}</h2>
                            <p style={styles.heroText}>
                                You are editing this book record. Make sure the ISBN, copy count,
                                and availability status are correct before saving.
                            </p>
                        </div>

                        <div style={styles.heroIcon}>✏️</div>
                    </div>

                    <div style={styles.formCard}>
                        <form onSubmit={submit}>
                            <div style={styles.formGrid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Book Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter book title"
                                        style={styles.input}
                                    />
                                    {errors.title && (
                                        <p style={styles.errorText}>{errors.title}</p>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Author</label>
                                    <input
                                        type="text"
                                        value={data.author}
                                        onChange={(e) => setData('author', e.target.value)}
                                        placeholder="Enter author name"
                                        style={styles.input}
                                    />
                                    {errors.author && (
                                        <p style={styles.errorText}>{errors.author}</p>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>ISBN</label>
                                    <input
                                        type="text"
                                        value={data.isbn}
                                        onChange={(e) => setData('isbn', e.target.value)}
                                        placeholder="Enter ISBN number"
                                        style={styles.input}
                                    />
                                    {errors.isbn && (
                                        <p style={styles.errorText}>{errors.isbn}</p>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Category</label>
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Example: Programming, Fiction"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Published Year</label>
                                    <input
                                        type="number"
                                        value={data.published_year}
                                        onChange={(e) => setData('published_year', e.target.value)}
                                        placeholder="Example: 2024"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Total Copies</label>
                                    <input
                                        type="number"
                                        value={data.total_copies}
                                        onChange={(e) => setData('total_copies', e.target.value)}
                                        placeholder="Enter total copies"
                                        style={styles.input}
                                    />
                                    {errors.total_copies && (
                                        <p style={styles.errorText}>{errors.total_copies}</p>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Available Copies</label>
                                    <input
                                        type="number"
                                        value={data.available_copies}
                                        onChange={(e) => setData('available_copies', e.target.value)}
                                        placeholder="Enter available copies"
                                        style={styles.input}
                                    />
                                    {errors.available_copies && (
                                        <p style={styles.errorText}>{errors.available_copies}</p>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.infoBox}>
                                <strong>Note:</strong> If available copies become 0, you can set the
                                book status as unavailable. If copies are available, keep the status
                                as available.
                            </div>

                            <div style={styles.buttonRow}>
                                <Link href="/books" style={styles.cancelButton}>
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={processing ? styles.disabledButton : styles.updateButton}
                                >
                                    {processing ? 'Updating Book...' : 'Update Book'}
                                </button>
                            </div>
                        </form>
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
        padding: '12px 14px',
        borderRadius: '10px',
        fontSize: '15px',
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
        fontSize: '15px',
    },

    backButton: {
        textDecoration: 'none',
        background: '#6b7280',
        color: '#ffffff',
        padding: '11px 16px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    heroCard: {
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        color: '#ffffff',
        borderRadius: '18px',
        padding: '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
    },

    heroTitle: {
        fontSize: '26px',
        margin: 0,
    },

    heroText: {
        color: '#dbeafe',
        lineHeight: '1.6',
        marginTop: '10px',
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
    },

    formCard: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '30px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb',
    },

    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '22px',
    },

    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },

    label: {
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '14px',
    },

    input: {
        width: '100%',
        padding: '13px 14px',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        fontSize: '15px',
        outline: 'none',
        background: '#f9fafb',
        boxSizing: 'border-box',
    },

    select: {
        width: '100%',
        padding: '13px 14px',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        fontSize: '15px',
        outline: 'none',
        background: '#f9fafb',
        boxSizing: 'border-box',
        cursor: 'pointer',
    },

    errorText: {
        color: '#dc2626',
        marginTop: '6px',
        marginBottom: 0,
        fontSize: '13px',
    },

    infoBox: {
        marginTop: '25px',
        background: '#eff6ff',
        color: '#1e40af',
        border: '1px solid #bfdbfe',
        padding: '14px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        lineHeight: '1.6',
    },

    buttonRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '30px',
    },

    cancelButton: {
        textDecoration: 'none',
        background: '#e5e7eb',
        color: '#374151',
        padding: '13px 18px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    updateButton: {
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '13px 20px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
    },

    disabledButton: {
        background: '#9ca3af',
        color: '#ffffff',
        border: 'none',
        padding: '13px 20px',
        borderRadius: '10px',
        cursor: 'not-allowed',
        fontSize: '14px',
        fontWeight: 'bold',
    },
};