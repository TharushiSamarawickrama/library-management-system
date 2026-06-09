import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div style={{ padding: '30px' }}>
            <h1>Admin Dashboard</h1>

            <Link href="/books">Manage Books</Link>

            <br /><br />

            <Link href="/logout" method="post" as="button">
                Logout
            </Link>
        </div>
    );
}