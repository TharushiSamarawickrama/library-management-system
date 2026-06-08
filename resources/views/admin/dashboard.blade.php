<h1>Admin Dashboard</h1>

<a href="{{ route('books.index') }}">Manage Books</a>

<br><br>

<form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit">Logout</button>
</form>