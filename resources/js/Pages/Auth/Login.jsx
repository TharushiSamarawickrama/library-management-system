import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <>
            <Head title="Login" />

            <div style={styles.page}>
                <div style={styles.leftSection}>
                    <div style={styles.logoBox}>
                        <div style={styles.logoIcon}>📚</div>
                        <div>
                            <h2 style={styles.logoTitle}>Library LMS</h2>
                            <p style={styles.logoText}>Smart Library Management</p>
                        </div>
                    </div>

                    <div style={styles.heroContent}>
                        <span style={styles.badge}>Welcome Back</span>

                        <h1 style={styles.heroTitle}>
                            Login to Manage Your Library Activities
                        </h1>

                        <p style={styles.heroText}>
                            Access your dashboard to manage books, borrow requests,
                            borrowing records, and library activities in one place.
                        </p>
                    </div>
                </div>

                <div style={styles.rightSection}>
                    <div style={styles.loginCard}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardIcon}>🔐</div>

                            <h1 style={styles.title}>Sign In</h1>

                            <p style={styles.subtitle}>
                                Enter your email and password to continue.
                            </p>
                        </div>

                        {status && (
                            <div style={styles.statusBox}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                    style={styles.input}
                                />

                                {errors.email && (
                                    <p style={styles.errorText}>{errors.email}</p>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password</label>

                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    style={styles.input}
                                />

                                {errors.password && (
                                    <p style={styles.errorText}>{errors.password}</p>
                                )}
                            </div>

                            <div style={styles.optionRow}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                        style={styles.checkbox}
                                    />
                                    Remember me
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href="/forgot-password"
                                        style={styles.forgotLink}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                style={
                                    processing
                                        ? styles.disabledButton
                                        : styles.loginButton
                                }
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div style={styles.footerText}>
                            Do not have an account?{' '}
                            <Link href="/register" style={styles.registerLink}>
                                Register here
                            </Link>
                        </div>

                        <div style={styles.backHomeBox}>
                            <Link href="/" style={styles.backHomeLink}>
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: '#ffffff',
        fontFamily: 'Arial, sans-serif',
    },

    leftSection: {
        background: 'linear-gradient(135deg, #111827, #1e40af)',
        color: '#ffffff',
        padding: '55px 70px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
    },

    logoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        position: 'absolute',
        top: '55px',
        left: '70px',
        zIndex: 2,
    },

    logoIcon: {
        width: '58px',
        height: '58px',
        background: '#2563eb',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
    },

    logoTitle: {
        margin: 0,
        fontSize: '26px',
        fontWeight: 'bold',
    },

    logoText: {
        margin: '5px 0 0',
        color: '#dbeafe',
        fontSize: '15px',
    },

    heroContent: {
        maxWidth: '620px',
        marginTop: '210px',
        zIndex: 2,
    },

    badge: {
        display: 'inline-block',
        background: 'rgba(255, 255, 255, 0.16)',
        color: '#ffffff',
        padding: '10px 18px',
        borderRadius: '30px',
        fontSize: '15px',
        fontWeight: 'bold',
        marginBottom: '28px',
    },

    heroTitle: {
        fontSize: '52px',
        lineHeight: '1.15',
        margin: '0 0 24px',
        fontWeight: 'bold',
        maxWidth: '650px',
    },

    heroText: {
        color: '#dbeafe',
        fontSize: '20px',
        lineHeight: '1.8',
        maxWidth: '650px',
        margin: 0,
    },

    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb',
        padding: '40px',
    },

    loginCard: {
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
        border: '1px solid #e5e7eb',
    },

    cardHeader: {
        textAlign: 'center',
        marginBottom: '28px',
    },

    cardIcon: {
        width: '66px',
        height: '66px',
        background: '#dbeafe',
        color: '#1e40af',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '31px',
        margin: '0 auto 15px',
    },

    title: {
        fontSize: '32px',
        color: '#111827',
        margin: 0,
    },

    subtitle: {
        color: '#6b7280',
        marginTop: '10px',
        lineHeight: '1.6',
        fontSize: '15px',
    },

    statusBox: {
        background: '#dcfce7',
        color: '#166534',
        padding: '13px 14px',
        borderRadius: '12px',
        marginBottom: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '1.5',
    },

    inputGroup: {
        marginBottom: '18px',
    },

    label: {
        display: 'block',
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

    errorText: {
        color: '#dc2626',
        marginTop: '6px',
        marginBottom: 0,
        fontSize: '13px',
    },

    optionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        gap: '10px',
    },

    checkboxLabel: {
        color: '#374151',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },

    checkbox: {
        width: '15px',
        height: '15px',
        cursor: 'pointer',
    },

    forgotLink: {
        color: '#2563eb',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
    },

    loginButton: {
        width: '100%',
        padding: '14px',
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
    },

    disabledButton: {
        width: '100%',
        padding: '14px',
        background: '#9ca3af',
        color: '#ffffff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'not-allowed',
        fontSize: '16px',
        fontWeight: 'bold',
    },

    footerText: {
        textAlign: 'center',
        marginTop: '24px',
        color: '#6b7280',
        fontSize: '14px',
    },

    registerLink: {
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: 'bold',
    },

    backHomeBox: {
        textAlign: 'center',
        marginTop: '18px',
    },

    backHomeLink: {
        color: '#374151',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
    },
};