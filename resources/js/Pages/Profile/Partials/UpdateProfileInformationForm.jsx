import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    function submit(e) {
        e.preventDefault();

        patch(route('profile.update'));
    }

    return (
        <section className={className} style={styles.section}>
            <div style={styles.headerBox}>
                <div style={styles.iconBox}>👤</div>

                <div>
                    <h2 style={styles.title}>Profile Information</h2>
                    <p style={styles.subtitle}>
                        Update your account name and email address.
                    </p>
                </div>
            </div>

            <form onSubmit={submit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="name" style={styles.label}>
                        Full Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Enter your full name"
                        style={styles.input}
                    />

                    {errors.name && (
                        <p style={styles.errorText}>{errors.name}</p>
                    )}
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>
                        Email Address
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Enter your email address"
                        style={styles.input}
                    />

                    {errors.email && (
                        <p style={styles.errorText}>{errors.email}</p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div style={styles.verifyBox}>
                        <p style={styles.verifyText}>
                            Your email address is unverified.
                        </p>

                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            style={styles.verifyButton}
                        >
                            Re-send verification email
                        </Link>

                        {status === 'verification-link-sent' && (
                            <div style={styles.successBox}>
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div style={styles.buttonRow}>
                    <button
                        type="submit"
                        disabled={processing}
                        style={processing ? styles.disabledButton : styles.saveButton}
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p style={styles.savedText}>Saved successfully.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

const styles = {
    section: {
        background: '#ffffff',
        borderRadius: '18px',
        padding: '30px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        fontFamily: 'Arial, sans-serif',
    },

    headerBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '26px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e5e7eb',
    },

    iconBox: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: '#dbeafe',
        color: '#1e40af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '27px',
        flexShrink: 0,
    },

    title: {
        margin: 0,
        color: '#111827',
        fontSize: '24px',
        fontWeight: 'bold',
    },

    subtitle: {
        margin: '6px 0 0',
        color: '#6b7280',
        fontSize: '14px',
        lineHeight: '1.5',
    },

    form: {
        display: 'grid',
        gap: '20px',
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
        color: '#111827',
        boxSizing: 'border-box',
    },

    errorText: {
        color: '#dc2626',
        marginTop: '6px',
        marginBottom: 0,
        fontSize: '13px',
        fontWeight: 'bold',
    },

    verifyBox: {
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '14px',
        padding: '16px',
    },

    verifyText: {
        margin: '0 0 10px',
        color: '#1e40af',
        fontSize: '14px',
        fontWeight: 'bold',
    },

    verifyButton: {
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '10px 14px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
    },

    successBox: {
        marginTop: '12px',
        background: '#dcfce7',
        color: '#166534',
        padding: '10px 12px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: 'bold',
    },

    buttonRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginTop: '8px',
    },

    saveButton: {
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '13px 18px',
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
        padding: '13px 18px',
        borderRadius: '10px',
        cursor: 'not-allowed',
        fontSize: '14px',
        fontWeight: 'bold',
    },

    savedText: {
        margin: 0,
        color: '#166534',
        fontSize: '14px',
        fontWeight: 'bold',
    },
};