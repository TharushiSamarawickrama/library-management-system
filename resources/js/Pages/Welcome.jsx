import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #f0f4ff;
                }

                /* Header Styles */
                .header {
                    height: 82px;
                    background: #111827;
                    color: #ffffff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 60px;
                    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }

                .logo-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .logo-icon {
                    width: 50px;
                    height: 50px;
                    background: #2563eb;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 25px;
                    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
                    transition: transform 0.2s ease;
                }

                .logo-icon:hover {
                    transform: scale(1.02);
                }

                .logo-title {
                    margin: 0;
                    font-size: 22px;
                    font-weight: 700;
                }

                .logo-text {
                    margin: 4px 0 0;
                    color: #9ca3af;
                    font-size: 13px;
                }

                .nav {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .login-button, .primary-nav-button {
                    text-decoration: none;
                    padding: 11px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    display: inline-block;
                }

                .login-button {
                    color: #ffffff;
                    background: #374151;
                }

                .login-button:hover {
                    background: #4b5563;
                    transform: translateY(-1px);
                }

                .primary-nav-button {
                    color: #ffffff;
                    background: #2563eb;
                    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
                }

                .primary-nav-button:hover {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.45);
                }

                /* Main Layout */
                .main {
                    padding: 55px 70px;
                    background: #f0f4ff;
                }

                /* Hero Section */
                .hero-section {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 40px;
                    align-items: center;
                    margin-bottom: 65px;
                }

                .hero-content {
                    background: linear-gradient(135deg, #2563eb, #1e40af);
                    color: #ffffff;
                    border-radius: 28px;
                    padding: 60px;
                    box-shadow: 0 18px 40px rgba(37, 99, 235, 0.28);
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .hero-content:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 25px 45px rgba(37, 99, 235, 0.35);
                }

                .badge {
                    background: rgba(255, 255, 255, 0.18);
                    color: #ffffff;
                    padding: 9px 16px;
                    border-radius: 30px;
                    font-size: 14px;
                    font-weight: 600;
                    display: inline-block;
                    backdrop-filter: blur(4px);
                }

                .title {
                    font-size: 52px;
                    line-height: 1.12;
                    margin: 26px 0 20px;
                    max-width: 850px;
                    font-weight: 800;
                }

                .description {
                    font-size: 17px;
                    line-height: 1.75;
                    color: #dbeafe;
                    max-width: 800px;
                }

                .button-group {
                    display: flex;
                    gap: 15px;
                    margin-top: 32px;
                    flex-wrap: wrap;
                }

                .primary-button, .secondary-button {
                    text-decoration: none;
                    padding: 14px 22px;
                    border-radius: 12px;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    display: inline-block;
                }

                .primary-button {
                    background: #ffffff;
                    color: #1e40af;
                    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.18);
                }

                .primary-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 28px rgba(255, 255, 255, 0.25);
                    background: #f8fafc;
                }

                .secondary-button {
                    background: #111827;
                    color: #ffffff;
                }

                .secondary-button:hover {
                    background: #1f2937;
                    transform: translateY(-2px);
                }

                /* Hero Visual */
                .hero-visual {
                    position: relative;
                    min-height: 470px;
                }

                .library-card {
                    background: #eef3fc;
                    border-radius: 28px;
                    padding: 35px;
                    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
                    margin-top: 45px;
                    border: 1px solid #cbdff2;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .library-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
                }

                .library-icon {
                    width: 72px;
                    height: 72px;
                    border-radius: 20px;
                    background: #d9ebff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 36px;
                    margin-bottom: 18px;
                }

                .library-title {
                    margin: 0;
                    font-size: 27px;
                    color: #1e293b;
                    font-weight: 700;
                }

                .library-text {
                    color: #334155;
                    line-height: 1.6;
                    margin-top: 8px;
                }

                .progress-box {
                    margin: 25px 0;
                }

                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    color: #1e293b;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .progress-bar {
                    height: 10px;
                    background: #cbdff2;
                    border-radius: 20px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    width: 85%;
                    background: #2563eb;
                    border-radius: 20px;
                    animation: slideIn 1s ease-out;
                }

                @keyframes slideIn {
                    from { width: 0; }
                    to { width: 85%; }
                }

                .stat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .stat-item {
                    background: #e2ebf6;
                    padding: 16px;
                    border-radius: 16px;
                    text-align: center;
                    border: 1px solid #cbdff2;
                    transition: all 0.2s ease;
                }

                .stat-item:hover {
                    background: #d6e3f0;
                    transform: translateY(-2px);
                }

                .stat-number {
                    margin: 0;
                    color: #1e293b;
                    font-size: 18px;
                    font-weight: 700;
                }

                .stat-text {
                    margin: 6px 0 0;
                    color: #475569;
                    font-size: 13px;
                }

                .floating-card-top, .floating-card-bottom {
                    background: #eef3fc;
                    border-radius: 18px;
                    padding: 16px;
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
                    border: 1px solid #cbdff2;
                    transition: all 0.2s ease;
                    cursor: default;
                }

                .floating-card-top:hover, .floating-card-bottom:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
                }

                .floating-card-top {
                    position: absolute;
                    top: 0;
                    right: 20px;
                }

                .floating-card-bottom {
                    position: absolute;
                    bottom: 0;
                    left: 10px;
                }

                .small-icon {
                    width: 42px;
                    height: 42px;
                    background: #d9ebff;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                }

                .mini-text {
                    margin: 4px 0 0;
                    color: #475569;
                    font-size: 13px;
                }

                /* Features Section */
                .features-section {
                    background: #e5eff9;
                    padding: 45px;
                    border-radius: 28px;
                    border: 1px solid #cbdff2;
                    margin-bottom: 45px;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .section-badge {
                    background: #d9ebff;
                    color: #1e40af;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 14px;
                    display: inline-block;
                }

                .section-title {
                    font-size: 36px;
                    margin: 18px 0 10px;
                    color: #1e293b;
                    font-weight: 700;
                }

                .section-text {
                    color: #334155;
                    max-width: 720px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }

                .feature-card {
                    background: #f4f9fe;
                    border-radius: 20px;
                    padding: 32px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
                    border: 1px solid #cbdff2;
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.08);
                }

                .feature-icon-blue, .feature-icon-orange, .feature-icon-green {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 27px;
                    margin-bottom: 16px;
                    transition: transform 0.2s ease;
                }

                .feature-card:hover .feature-icon-blue,
                .feature-card:hover .feature-icon-orange,
                .feature-card:hover .feature-icon-green {
                    transform: scale(1.05);
                }

                .feature-icon-blue { background: #d9ebff; }
                .feature-icon-orange { background: #ffe6cc; }  /* soft light orange to match blue theme */
                .feature-icon-green { background: #d4f0e6; }   /* soft light green */

                .feature-title {
                    margin: 0 0 10px;
                    color: #1e293b;
                    font-size: 21px;
                    font-weight: 600;
                }

                .feature-text {
                    color: #475569;
                    line-height: 1.65;
                }

                /* Footer */
                .footer {
                    background: #111827;
                    color: #d1d5db;
                    text-align: center;
                    padding: 22px;
                }

                .footer-text {
                    margin: 0;
                    font-size: 14px;
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .hero-section {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }

                    .title {
                        font-size: 42px;
                    }

                    .main {
                        padding: 35px 30px;
                    }

                    .header {
                        padding: 0 30px;
                    }
                }

                @media (max-width: 768px) {
                    .header {
                        flex-direction: column;
                        height: auto;
                        padding: 15px 20px;
                        gap: 12px;
                    }

                    .nav {
                        width: 100%;
                        justify-content: center;
                    }

                    .main {
                        padding: 25px 20px;
                    }

                    .hero-content {
                        padding: 35px 25px;
                    }

                    .title {
                        font-size: 32px;
                    }

                    .description {
                        font-size: 15px;
                    }

                    .feature-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .features-section {
                        padding: 30px 20px;
                    }

                    .section-title {
                        font-size: 28px;
                    }

                    .library-card {
                        padding: 25px;
                    }

                    .hero-visual {
                        min-height: auto;
                    }

                    .floating-card-top, .floating-card-bottom {
                        position: relative;
                        top: auto;
                        right: auto;
                        left: auto;
                        bottom: auto;
                        margin: 15px 0;
                    }

                    .hero-visual {
                        display: flex;
                        flex-direction: column;
                    }

                    .stat-grid {
                        gap: 8px;
                    }

                    .button-group {
                        flex-direction: column;
                    }

                    .primary-button, .secondary-button {
                        text-align: center;
                    }
                }

                @media (max-width: 480px) {
                    .title {
                        font-size: 26px;
                    }

                    .badge {
                        font-size: 12px;
                    }

                    .stat-number {
                        font-size: 14px;
                    }

                    .stat-text {
                        font-size: 11px;
                    }

                    .feature-title {
                        font-size: 18px;
                    }
                }

                /* Accessibility focus styles */
                .login-button:focus-visible,
                .primary-nav-button:focus-visible,
                .primary-button:focus-visible,
                .secondary-button:focus-visible,
                .feature-card:focus-visible {
                    outline: 2px solid #2563eb;
                    outline-offset: 2px;
                }
            `}</style>

            <div className="page">
                <header className="header">
                    <div className="logo-box">
                        <div className="logo-icon">📚</div>
                        <div>
                            <h2 className="logo-title">Library LMS</h2>
                            <p className="logo-text">Smart Library Management</p>
                        </div>
                    </div>

                    <nav className="nav">
                        {auth.user ? (
                            <Link href="/dashboard" className="primary-nav-button">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="login-button">
                                    Login
                                </Link>

                                <Link href="/register" className="primary-nav-button">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="main">
                    <section className="hero-section">
                        <div className="hero-content">
                            <span className="badge">
                                Modern Library Management System
                            </span>

                            <h1 className="title">
                                Manage Books, Borrow Requests, and Returns Easily
                            </h1>

                            <p className="description">
                                Library LMS helps admins manage books and borrowing records,
                                while users can browse books, request borrowings, and track their
                                library activity from a simple dashboard.
                            </p>

                            <div className="button-group">
                                {auth.user ? (
                                    <Link href="/dashboard" className="primary-button">
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" className="primary-button">
                                            Login to System
                                        </Link>

                                        <Link href="/register" className="secondary-button">
                                            Create Account
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="floating-card-top">
                                <span className="small-icon">📖</span>
                                <div>
                                    <strong>Book Available</strong>
                                    <p className="mini-text">Clean Code - 6 copies</p>
                                </div>
                            </div>

                            <div className="library-card">
                                <div className="library-icon">🏛️</div>
                                <h3 className="library-title">Library LMS Portal</h3>
                                <p className="library-text">
                                    A clean and simple system for library book management.
                                </p>

                                <div className="progress-box">
                                    <div className="progress-label">
                                        <span>System Activity</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill"></div>
                                    </div>
                                </div>

                                <div className="stat-grid">
                                    <div className="stat-item">
                                        <h3 className="stat-number">Books</h3>
                                        <p className="stat-text">Manage records</p>
                                    </div>

                                    <div className="stat-item">
                                        <h3 className="stat-number">Requests</h3>
                                        <p className="stat-text">Approve quickly</p>
                                    </div>

                                    <div className="stat-item">
                                        <h3 className="stat-number">Returns</h3>
                                        <p className="stat-text">Track status</p>
                                    </div>
                                </div>
                            </div>

                            <div className="floating-card-bottom">
                                <span className="small-icon">📝</span>
                                <div>
                                    <strong>Borrow Request</strong>
                                    <p className="mini-text">Pending admin approval</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="features-section">
                        <div className="section-header">
                            <span className="section-badge">Features</span>
                            <h2 className="section-title">
                                Everything Needed for a Library System
                            </h2>
                            <p className="section-text">
                                This system provides the main features needed to manage books,
                                borrowing requests, and borrowing records professionally.
                            </p>
                        </div>

                        <div className="feature-grid">
                            <div className="feature-card">
                                <div className="feature-icon-blue">📚</div>
                                <h3 className="feature-title">Book Management</h3>
                                <p className="feature-text">
                                    Add, view, edit, and delete books with ISBN, category,
                                    copy count, and availability status.
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon-orange">📝</div>
                                <h3 className="feature-title">Borrow Requests</h3>
                                <p className="feature-text">
                                    Users can send borrow requests and admins can approve
                                    or reject them easily.
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon-green">🔄</div>
                                <h3 className="feature-title">Borrowing Records</h3>
                                <p className="feature-text">
                                    Track borrowed books, due dates, returned dates, and
                                    borrowing status in one place.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="footer">
                    <p className="footer-text">
                        © 2026 Library Management System | Laravel + React + Inertia.js + MySQL
                    </p>
                </footer>
            </div>
        </>
    );
}