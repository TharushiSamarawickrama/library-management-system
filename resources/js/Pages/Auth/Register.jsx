import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();

        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
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
            <Head title="Register" />

            <div style={{
                width: '420px',
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
                    Library Management System
                </h1>

                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    User Registration
                </h2>

                <form onSubmit={submit}>
                    <label>Name</label>
                    <br />
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    />
                    {errors.name && (
                        <p style={{ color: 'red' }}>{errors.name}</p>
                    )}

                    <br />

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

                    <label>Confirm Password</label>
                    <br />
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    />

                    <br /><br />

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#16a34a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Register
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#2563eb' }}>
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}