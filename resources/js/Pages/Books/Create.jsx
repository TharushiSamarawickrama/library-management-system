import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
        isbn: '',
        category: '',
        published_year: '',
        total_copies: '',
        available_copies: '',
        status: 'available',
    });

    function submit(e) {
        e.preventDefault();
        post('/books');
    }

    return (
        <div style={{ padding: '30px' }}>
            <h1>Add New Book</h1>

            <Link href="/books">Back to Books</Link>

            <form onSubmit={submit}>
                <br />

                <label>Title</label><br />
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}

                <br /><br />

                <label>Author</label><br />
                <input
                    type="text"
                    value={data.author}
                    onChange={(e) => setData('author', e.target.value)}
                />
                {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}

                <br /><br />

                <label>ISBN</label><br />
                <input
                    type="text"
                    value={data.isbn}
                    onChange={(e) => setData('isbn', e.target.value)}
                />
                {errors.isbn && <p style={{ color: 'red' }}>{errors.isbn}</p>}

                <br /><br />

                <label>Category</label><br />
                <input
                    type="text"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                />

                <br /><br />

                <label>Published Year</label><br />
                <input
                    type="number"
                    value={data.published_year}
                    onChange={(e) => setData('published_year', e.target.value)}
                />

                <br /><br />

                <label>Total Copies</label><br />
                <input
                    type="number"
                    value={data.total_copies}
                    onChange={(e) => setData('total_copies', e.target.value)}
                />
                {errors.total_copies && <p style={{ color: 'red' }}>{errors.total_copies}</p>}

                <br /><br />

                <label>Available Copies</label><br />
                <input
                    type="number"
                    value={data.available_copies}
                    onChange={(e) => setData('available_copies', e.target.value)}
                />
                {errors.available_copies && <p style={{ color: 'red' }}>{errors.available_copies}</p>}

                <br /><br />

                <label>Status</label><br />
                <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>

                <br /><br />

                <button type="submit" disabled={processing}>
                    Save Book
                </button>
            </form>
        </div>
    );
}