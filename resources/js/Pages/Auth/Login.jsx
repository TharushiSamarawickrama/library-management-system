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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f3f4f6'
        }}>
            <Head title="Login" />

            <div style={{
                width: '400px',
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
                    Library Management System
                </h1>

                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Login
                </h2>

                {status && (
                    <p style={{ color: 'green', marginBottom: '15px' }}>
                        {status}
                    </p>
                )}

                <form onSubmit={submit}>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    />
                    {errors.email && (
                        <p style={{ color: 'red' }}>{errors.email}</p>
                    )}

                    <br />

                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    />
                    {errors.password && (
                        <p style={{ color: 'red' }}>{errors.password}</p>
                    )}

                    <br />

                    <label>
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        {' '}Remember me
                    </label>

                    <br /><br />

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>
                        Do not have an account?{' '}
                        <Link href="/register" style={{ color: '#2563eb' }}>
                            Register here
                        </Link>
                    </p>

                    {canResetPassword && (
                        <Link href="/forgot-password" style={{ color: '#6b7280' }}>
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}