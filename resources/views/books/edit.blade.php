<h1>Edit Book</h1>

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

<form action="{{ route('books.update', $book->id) }}" method="POST">
    @csrf
    @method('PUT')

    <label>Title</label><br>
    <input type="text" name="title" value="{{ $book->title }}"><br><br>

    <label>Author</label><br>
    <input type="text" name="author" value="{{ $book->author }}"><br><br>

    <label>ISBN</label><br>
    <input type="text" name="isbn" value="{{ $book->isbn }}"><br><br>

    <label>Category</label><br>
    <input type="text" name="category" value="{{ $book->category }}"><br><br>

    <label>Published Year</label><br>
    <input type="number" name="published_year" value="{{ $book->published_year }}"><br><br>

    <label>Total Copies</label><br>
    <input type="number" name="total_copies" value="{{ $book->total_copies }}"><br><br>

    <label>Available Copies</label><br>
    <input type="number" name="available_copies" value="{{ $book->available_copies }}"><br><br>

    <label>Status</label><br>
    <select name="status">
        <option value="available" {{ $book->status == 'available' ? 'selected' : '' }}>Available</option>
        <option value="unavailable" {{ $book->status == 'unavailable' ? 'selected' : '' }}>Unavailable</option>
    </select><br><br>

    <button type="submit">Update Book</button>
</form>