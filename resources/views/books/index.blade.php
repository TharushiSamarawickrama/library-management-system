<!DOCTYPE html>
<html>
<head>
    <title>Books</title>
</head>
<body>

    <h1>Book List</h1>

    <a href="{{ route('books.create') }}">Add New Book</a>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <br><br>

    <table border="1" cellpadding="10">
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Total Copies</th>
            <th>Available Copies</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>

        @foreach($books as $book)
            <tr>
                <td>{{ $book->id }}</td>
                <td>{{ $book->title }}</td>
                <td>{{ $book->author }}</td>
                <td>{{ $book->isbn }}</td>
                <td>{{ $book->category }}</td>
                <td>{{ $book->total_copies }}</td>
                <td>{{ $book->available_copies }}</td>
                <td>{{ $book->status }}</td>
                <td>
                    <a href="{{ route('books.show', $book->id) }}">View</a>
                    <a href="{{ route('books.edit', $book->id) }}">Edit</a>

                    <form action="{{ route('books.destroy', $book->id) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')

                        <button type="submit" onclick="return confirm('Are you sure?')">
                            Delete
                        </button>
                    </form>
                </td>
            </tr>
        @endforeach
    </table>

</body>
</html>