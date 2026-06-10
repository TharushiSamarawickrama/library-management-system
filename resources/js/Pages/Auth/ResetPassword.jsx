import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <>
            <Head title="Reset Password" />

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
                        <span style={styles.badge}>Set New Password</span>

                        <h1 style={styles.heroTitle}>
                            Create a New Secure Password
                        </h1>

                        <p style={styles.heroText}>
                            Enter your email address and new password to reset your
                            Library LMS account password securely.
                        </p>
                    </div>
                </div>

                <div style={styles.rightSection}>
                    <div style={styles.resetCard}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardIcon}>🔑</div>

                            <h1 style={styles.title}>Reset Password</h1>

                            <p style={styles.subtitle}>
                                Create a new password for your Library LMS account.
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email address"
                                    autoComplete="username"
                                    style={styles.input}
                                />

                                {errors.email && (
                                    <p style={styles.errorText}>{errors.email}</p>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>New Password</label>

                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                    style={styles.input}
                                />

                                {errors.password && (
                                    <p style={styles.errorText}>{errors.password}</p>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm Password</label>

                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    placeholder="Confirm new password"
                                    autoComplete="new-password"
                                    style={styles.input}
                                />

                                {errors.password_confirmation && (
                                    <p style={styles.errorText}>
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                style={
                                    processing
                                        ? styles.disabledButton
                                        : styles.resetButton
                                }
                            >
                                {processing ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </form>

                        <div style={styles.loginText}>
                            Remember your password?{' '}
                            <Link href="/login" style={styles.loginLink}>
                                Login here
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

    resetCard: {
        width: '100%',
        maxWidth: '480px',
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

    resetButton: {
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
        marginTop: '6px',
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
        marginTop: '6px',
    },

    loginText: {
        textAlign: 'center',
        marginTop: '24px',
        color: '#6b7280',
        fontSize: '14px',
    },

    loginLink: {
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