<!DOCTYPE html>
<html>
<head>
    <title>Add Book</title>
</head>
<body>

    <h1>Add New Book</h1>

    <a href="{{ route('books.index') }}">Back to Books</a>

    @if($errors->any())
        <div style="color: red;">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('books.store') }}" method="POST">
        @csrf

        <label>Title</label><br>
        <input type="text" name="title"><br><br>

        <label>Author</label><br>
        <input type="text" name="author"><br><br>

        <label>ISBN</label><br>
        <input type="text" name="isbn"><br><br>

        <label>Category</label><br>
        <input type="text" name="category"><br><br>

        <label>Published Year</label><br>
        <input type="number" name="published_year"><br><br>

        <label>Total Copies</label><br>
        <input type="number" name="total_copies"><br><br>

        <label>Available Copies</label><br>
        <input type="number" name="available_copies"><br><br>

        <label>Status</label><br>
        <select name="status">
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
        </select><br><br>

        <button type="submit">Save Book</button>
    </form>

</body>
</html>