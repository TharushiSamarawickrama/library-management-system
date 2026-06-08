<h1>User Dashboard</h1>

<a href="{{ route('books.index') }}">View Books</a>

<br><br>

<form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit">Logout</button>
</form>