<?php

use App\Models\User;
use Behat\Behat\Context\Context;
use Behat\Step\Given;
use Behat\Step\Then;
use Behat\Step\When;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class FeatureContext implements Context
{
    private string $baseUrl = 'http://127.0.0.1:8000';

    private int $statusCode = 0;
    private string $responseBody = '';
    private ?string $lastLocation = null;
    private ?string $csrfToken = null;
    private string $cookieFile;

    private array $formFields = [];
    private ?int $currentUserId = null;
    private ?string $currentUserEmail = null;
    private ?int $selectedBookId = null;

    public function __construct()
    {
        $this->bootLaravelApplication();
        $this->cookieFile = tempnam(sys_get_temp_dir(), 'behat_cookie_');
    }

    public function __destruct()
    {
        if (isset($this->cookieFile) && file_exists($this->cookieFile)) {
            @unlink($this->cookieFile);
        }
    }

    private function bootLaravelApplication(): void
    {
        require_once __DIR__ . '/../../vendor/autoload.php';

        $app = require __DIR__ . '/../../bootstrap/app.php';
        $kernel = $app->make(Kernel::class);
        $kernel->bootstrap();
    }

    #[Given('I am a guest')]
    public function iAmAGuest(): void
    {
        $this->currentUserId = null;
        $this->currentUserEmail = null;
        $this->csrfToken = null;
        $this->formFields = [];
        $this->selectedBookId = null;

        if (file_exists($this->cookieFile)) {
            file_put_contents($this->cookieFile, '');
        }
    }

    #[Given('I am on :path')]
    #[When('I visit :path')]
    public function iVisit(string $path): void
    {
        $this->request('GET', $path);
    }

    #[When('I fill in :field with :value')]
    public function iFillInWith(string $field, string $value): void
    {
        $key = $this->normaliseFieldName($field);
        $this->formFields[$key] = $value;
    }

    #[When('I press :button')]
    public function iPress(string $button): void
    {
        $buttonLower = strtolower($button);

        if (str_contains($buttonLower, 'login')) {
            $email = $this->formFields['email'] ?? '';
            $password = $this->formFields['password'] ?? '';

            $this->iLoginAsWithPassword($email, $password);
            return;
        }

        if (str_contains($buttonLower, 'save book')) {
            $this->submitBookCreateForm();
            return;
        }

        if (str_contains($buttonLower, 'update book')) {
            $this->submitBookUpdateForm();
            return;
        }

        if (str_contains($buttonLower, 'borrow')) {
            $this->submitBorrowRequestForSelectedBook();
            return;
        }

        throw new Exception("No action defined for button: {$button}");
    }

    #[When('I click :text')]
    public function iClick(string $text): void
    {
        $book = $this->findBookByTitle($text);

        if (!$book) {
            throw new Exception("Could not find clickable text or book: {$text}");
        }

        $this->selectedBookId = (int) $book->id;
        $this->request('GET', '/books/' . $this->selectedBookId);
    }

    #[Then('the response status should be :expectedStatus')]
    public function theResponseStatusShouldBe(int $expectedStatus): void
    {
        $this->assertEqualsOrFail(
            $expectedStatus,
            $this->statusCode,
            "Expected HTTP status {$expectedStatus}, but got {$this->statusCode}."
        );
    }

    #[Then('I should be redirected to :path')]
    public function iShouldBeRedirectedTo(string $path): void
    {
        $this->assertTrueOrFail(
            in_array($this->statusCode, [301, 302, 303, 307, 308], true),
            "Expected redirect status, but got {$this->statusCode}."
        );

        $this->assertNotNullOrFail(
            $this->lastLocation,
            'Expected Location header, but it was not found.'
        );

        $this->assertStringContainsStringOrFail(
            $path,
            $this->lastLocation,
            "Expected redirect to {$path}, but redirected to {$this->lastLocation}."
        );
    }

    #[Then('I should remain on :path')]
    public function iShouldRemainOn(string $path): void
    {
        if ($this->lastLocation !== null) {
            $this->assertStringContainsStringOrFail(
                $path,
                $this->lastLocation,
                "Expected to remain on {$path}, but redirected to {$this->lastLocation}."
            );

            return;
        }

        $this->assertStringContainsStringOrFail(
            $path,
            $this->makeUrl($path),
            "Expected to remain on {$path}."
        );
    }

    #[Then('I should not be allowed to access the page')]
    public function iShouldNotBeAllowedToAccessThePage(): void
    {
        $this->assertTrueOrFail(
            in_array($this->statusCode, [302, 401, 403], true),
            "Expected 302, 401, or 403, but got {$this->statusCode}."
        );
    }

    #[Then('I should see :text')]
    public function iShouldSee(string $text): void
    {
        $body = $this->bodyAfterFollowingRedirectIfNeeded();

        $this->assertTrueOrFail(
            stripos($body, $text) !== false,
            "Failed asserting that response contains: {$text}. Current status code: {$this->statusCode}."
        );
    }

    #[Then('I should not see :text')]
    public function iShouldNotSee(string $text): void
    {
        $body = $this->bodyAfterFollowingRedirectIfNeeded();

        $this->assertTrueOrFail(
            stripos($body, $text) === false,
            "Failed asserting that response does not contain: {$text}. Current status code: {$this->statusCode}."
        );
    }

    #[Given('a student account exists with email :email and password :password')]
    public function aStudentAccountExistsWithEmailAndPassword(string $email, string $password): void
    {
        $this->createUser($email, $password, 'user');
    }

    #[Given('an admin account exists with email :email and password :password')]
    public function anAdminAccountExistsWithEmailAndPassword(string $email, string $password): void
    {
        $this->createUser($email, $password, 'admin');
    }

    #[Given('I am logged in as a student')]
    public function iAmLoggedInAsAStudent(): void
    {
        $email = 'student@example.com';
        $password = 'password';

        $user = $this->createUser($email, $password, 'user');

        $this->iLoginAsWithPassword($email, $password);

        $this->currentUserId = (int) $user->id;
        $this->currentUserEmail = $email;
    }

    #[Given('I am logged in as an admin')]
    public function iAmLoggedInAsAnAdmin(): void
    {
        $email = 'admin@example.com';
        $password = 'password';

        $user = $this->createUser($email, $password, 'admin');

        $this->iLoginAsWithPassword($email, $password);

        $this->currentUserId = (int) $user->id;
        $this->currentUserEmail = $email;
    }

    #[When('I login as :email with password :password')]
    public function iLoginAsWithPassword(string $email, string $password): void
    {
        $this->request('GET', '/sanctum/csrf-cookie');
        $this->request('GET', '/login');

        $this->request('POST', '/login', [
            'email' => $email,
            'password' => $password,
        ]);

        $user = User::where('email', $email)->first();

        if ($user) {
            $this->currentUserId = (int) $user->id;
            $this->currentUserEmail = $email;
        }
    }

    #[Given('a book :title exists with :availableCopies available copies')]
    public function aBookExistsWithAvailableCopies(string $title, int $availableCopies): void
    {
        $this->createOrUpdateBook($title, $availableCopies);
    }

    #[Given('a book :title exists with author :author and category :category and :availableCopies available copies')]
    public function aBookExistsWithAuthorAndCategoryAndAvailableCopies(
        string $title,
        string $author,
        string $category,
        int $availableCopies
    ): void {
        $this->createOrUpdateBookWithDetails($title, $author, $category, $availableCopies);
    }

    #[Then('a book :title should exist')]
    public function aBookShouldExist(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail(
            $book,
            "Book not found: {$title}"
        );
    }

    #[Then('a book :title should not exist')]
    public function aBookShouldNotExist(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNullOrFail(
            $book,
            "Book still exists: {$title}"
        );
    }

    #[Then('the available copies of :title should be :expectedCount')]
    public function theAvailableCopiesOfShouldBe(string $title, int $expectedCount): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $availableColumn = $this->getAvailableCopiesColumn();

        $this->assertNotNullOrFail(
            $availableColumn,
            'No available copies column found in books table.'
        );

        $this->assertEqualsOrFail(
            $expectedCount,
            (int) $book->{$availableColumn},
            "Expected {$expectedCount} available copies, but got {$book->{$availableColumn}}."
        );
    }

    #[When('I edit the book :title')]
    public function iEditTheBook(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $this->selectedBookId = (int) $book->id;

        $this->request('GET', '/books/' . $this->selectedBookId . '/edit');
    }

    #[When('I delete the book :title')]
    public function iDeleteTheBook(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $this->deleteBookRelatedRows((int) $book->id);

        $this->request('DELETE', '/books/' . $book->id);
    }

    #[When('I submit a borrow request for :title')]
    public function iSubmitABorrowRequestFor(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $this->selectedBookId = (int) $book->id;

        $this->submitBorrowRequestForSelectedBook();
    }

    #[Given('I have submitted a borrow request for :title')]
    public function iHaveSubmittedABorrowRequestFor(string $title): void
    {
        if (!$this->currentUserId) {
            $this->iAmLoggedInAsAStudent();
        }

        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $this->createBorrowRequest($this->currentUserId, (int) $book->id, 'pending');
    }

    #[Given('the student has a pending borrow request for :title')]
    public function theStudentHasAPendingBorrowRequestFor(string $title): void
    {
        $student = User::where('email', 'student@example.com')->first();

        if (!$student) {
            $student = $this->createUser('student@example.com', 'password', 'user');
        }

        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $this->createBorrowRequest((int) $student->id, (int) $book->id, 'pending');
    }

    #[Then('a borrow request should exist for me and book :title')]
    public function aBorrowRequestShouldExistForMeAndBook(string $title): void
    {
        $this->assertNotNullOrFail(
            $this->currentUserId,
            'No logged-in student found.'
        );

        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $request = DB::table('borrow_requests')
            ->where('user_id', $this->currentUserId)
            ->where('book_id', $book->id)
            ->first();

        $this->assertNotNullOrFail(
            $request,
            "Borrow request not found for book: {$title}"
        );
    }

    #[Then('no borrow request should exist for me and book :title')]
    public function noBorrowRequestShouldExistForMeAndBook(string $title): void
    {
        $this->assertNotNullOrFail($this->currentUserId, 'No logged-in student found.');

        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $request = DB::table('borrow_requests')
            ->where('user_id', $this->currentUserId)
            ->where('book_id', $book->id)
            ->first();

        $this->assertNullOrFail(
            $request,
            "Borrow request should not exist for book: {$title}"
        );
    }

    #[Then('only one borrow request should exist for me and book :title')]
    public function onlyOneBorrowRequestShouldExistForMeAndBook(string $title): void
    {
        $this->assertNotNullOrFail($this->currentUserId, 'No logged-in student found.');

        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $count = DB::table('borrow_requests')
            ->where('user_id', $this->currentUserId)
            ->where('book_id', $book->id)
            ->count();

        $this->assertEqualsOrFail(
            1,
            $count,
            "Expected only one borrow request for {$title}, but found {$count}."
        );
    }

    #[Then('a borrow request should exist for :title with status :status')]
    #[Then('the borrow request for :title should have status :status')]
    public function theBorrowRequestForShouldHaveStatus(string $title, string $status): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $request = DB::table('borrow_requests')
            ->where('book_id', $book->id)
            ->orderByDesc('id')
            ->first();

        $this->assertNotNullOrFail(
            $request,
            "Borrow request not found for book: {$title}"
        );

        $this->assertEqualsOrFail(
            strtolower($status),
            strtolower($request->status),
            "Expected status {$status}, but got {$request->status}."
        );
    }

    #[When('I approve the borrow request for :title')]
    public function iApproveTheBorrowRequestFor(string $title): void
    {
        $request = $this->findBorrowRequestByBookTitle($title);

        $this->assertNotNullOrFail(
            $request,
            "Borrow request not found for book: {$title}"
        );

        $this->request('POST', '/borrow-requests/' . $request->id . '/approve');
    }

    #[When('I reject the borrow request for :title')]
    public function iRejectTheBorrowRequestFor(string $title): void
    {
        $request = $this->findBorrowRequestByBookTitle($title);

        $this->assertNotNullOrFail(
            $request,
            "Borrow request not found for book: {$title}"
        );

        $this->request('POST', '/borrow-requests/' . $request->id . '/reject');
    }

    #[Given('the student has borrowed :title')]
    public function theStudentHasBorrowed(string $title): void
    {
        $student = User::where('email', 'student@example.com')->first();

        if (!$student) {
            $student = $this->createUser('student@example.com', 'password', 'user');
        }

        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $borrowRequestId = $this->createBorrowRequest((int) $student->id, (int) $book->id, 'approved');

        $this->createBorrowing(
            (int) $student->id,
            (int) $book->id,
            $borrowRequestId,
            'borrowed'
        );
    }

    #[Then('a borrowing record should exist for :title')]
    public function aBorrowingRecordShouldExistFor(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $borrowing = DB::table('borrowings')
            ->where('book_id', $book->id)
            ->first();

        $this->assertNotNullOrFail(
            $borrowing,
            "Borrowing record not found for book: {$title}"
        );
    }

    #[Then('no borrowing record should exist for :title')]
    public function noBorrowingRecordShouldExistFor(string $title): void
    {
        $book = $this->findBookByTitle($title);

        $this->assertNotNullOrFail($book, "Book not found: {$title}");

        $borrowing = DB::table('borrowings')
            ->where('book_id', $book->id)
            ->first();

        $this->assertNullOrFail(
            $borrowing,
            "Borrowing record exists for book: {$title}"
        );
    }

    #[When('I mark the borrowing for :title as returned')]
    public function iMarkTheBorrowingForAsReturned(string $title): void
    {
        $borrowing = $this->findBorrowingByBookTitle($title);

        $this->assertNotNullOrFail(
            $borrowing,
            "Borrowing not found for book: {$title}"
        );

        $this->request('PUT', '/borrowings/' . $borrowing->id, [
            'status' => 'returned',
            'returned_at' => now()->toDateTimeString(),
        ]);
    }

    #[Then('the borrowing for :title should have status :status')]
    public function theBorrowingForShouldHaveStatus(string $title, string $status): void
    {
        $borrowing = $this->findBorrowingByBookTitle($title);

        $this->assertNotNullOrFail(
            $borrowing,
            "Borrowing not found for book: {$title}"
        );

        $this->assertEqualsOrFail(
            strtolower($status),
            strtolower($borrowing->status),
            "Expected borrowing status {$status}, but got {$borrowing->status}."
        );
    }

    private function submitBookCreateForm(): void
    {
        $title = $this->formFields['title'] ?? 'Untitled Book';
        $isbn = $this->formFields['isbn'] ?? $this->generateValidIsbn($title);

        $oldBook = DB::table('books')
            ->where('title', $title)
            ->orWhere('isbn', $isbn)
            ->first();

        if ($oldBook) {
            $this->deleteBookRelatedRows((int) $oldBook->id);
            DB::table('books')->where('id', $oldBook->id)->delete();
        }

        $this->request('POST', '/books', $this->buildBookPayload());
    }

    private function submitBookUpdateForm(): void
    {
        if (!$this->selectedBookId) {
            throw new Exception('No selected book found for update.');
        }

        $this->request('PUT', '/books/' . $this->selectedBookId, $this->buildBookPayload($this->selectedBookId));
    }

    private function submitBorrowRequestForSelectedBook(): void
    {
        if (!$this->selectedBookId) {
            throw new Exception('No selected book found for borrow request.');
        }

        $this->request('POST', '/borrow-requests', [
            'book_id' => $this->selectedBookId,
        ]);
    }

    private function buildBookPayload(?int $bookId = null): array
    {
        $book = $bookId ? DB::table('books')->where('id', $bookId)->first() : null;

        $title = $this->formFields['title'] ?? ($book->title ?? 'Clean Code');
        $author = $this->formFields['author'] ?? ($book->author ?? 'Robert C. Martin');
        $isbn = $this->formFields['isbn'] ?? ($book->isbn ?? $this->generateValidIsbn($title));
        $category = $this->formFields['category'] ?? ($book->category ?? 'Programming');

        $available = $this->formFields['available_copies']
            ?? $this->formFields['available_quantity']
            ?? $this->formFields['quantity']
            ?? $book->available_copies
            ?? $book->available_quantity
            ?? $book->quantity
            ?? 2;

        return [
            'title' => $title,
            'author' => $author,
            'isbn' => $isbn,
            'category' => $category,
            'description' => $this->formFields['description'] ?? ($book->description ?? 'Book created by Behat acceptance test.'),
            'available_copies' => (int) $available,
            'total_copies' => (int) $available,
            'available_quantity' => (int) $available,
            'quantity' => (int) $available,
            'status' => (int) $available > 0 ? 'available' : 'unavailable',
        ];
    }

    private function createUser(string $email, string $password, string $role): User
    {
        $data = [
            'name' => $role === 'admin' ? 'Admin User' : 'Student User',
            'email' => $email,
            'password' => Hash::make($password),
        ];

        $columns = Schema::getColumnListing('users');

        if (in_array('role', $columns, true)) {
            $data['role'] = $role;
        }

        if (in_array('status', $columns, true)) {
            $data['status'] = 1;
        }

        if (in_array('phone', $columns, true)) {
            $data['phone'] = '0712345678';
        }

        if (in_array('address', $columns, true)) {
            $data['address'] = 'Test Address';
        }

        return User::updateOrCreate(
            ['email' => $email],
            $data
        );
    }

    private function createOrUpdateBook(string $title, int $availableCopies): void
    {
        $this->createOrUpdateBookWithDetails(
            $title,
            'Robert C. Martin',
            'Programming',
            $availableCopies
        );
    }

    private function createOrUpdateBookWithDetails(
        string $title,
        string $author,
        string $category,
        int $availableCopies
    ): void {
        $columns = Schema::getColumnListing('books');

        $isbn = $this->generateValidIsbn($title . $author . $category);

        $existingBook = DB::table('books')
            ->where('title', $title)
            ->orWhere('isbn', $isbn)
            ->first();

        if ($existingBook) {
            $this->deleteBookRelatedRows((int) $existingBook->id);
            DB::table('books')->where('id', $existingBook->id)->delete();
        }

        $data = [];

        if (in_array('title', $columns, true)) {
            $data['title'] = $title;
        }

        if (in_array('author', $columns, true)) {
            $data['author'] = $author;
        }

        if (in_array('isbn', $columns, true)) {
            $data['isbn'] = $isbn;
        }

        if (in_array('category', $columns, true)) {
            $data['category'] = $category;
        }

        if (in_array('description', $columns, true)) {
            $data['description'] = 'Book created by Behat acceptance test.';
        }

        foreach (['available_copies', 'available_quantity', 'quantity', 'copies'] as $column) {
            if (in_array($column, $columns, true)) {
                $data[$column] = $availableCopies;
            }
        }

        foreach (['total_copies', 'total_quantity'] as $column) {
            if (in_array($column, $columns, true)) {
                $data[$column] = max($availableCopies, 2);
            }
        }

        if (in_array('status', $columns, true)) {
            $data['status'] = $availableCopies > 0 ? 'available' : 'unavailable';
        }

        if (in_array('created_at', $columns, true)) {
            $data['created_at'] = now();
        }

        if (in_array('updated_at', $columns, true)) {
            $data['updated_at'] = now();
        }

        DB::table('books')->insert($data);
    }

    private function createBorrowRequest(int $userId, int $bookId, string $status): int
    {
        if (Schema::hasTable('borrowings')) {
            DB::table('borrowings')
                ->where('user_id', $userId)
                ->where('book_id', $bookId)
                ->delete();
        }

        DB::table('borrow_requests')
            ->where('user_id', $userId)
            ->where('book_id', $bookId)
            ->delete();

        $columns = Schema::getColumnListing('borrow_requests');

        $data = [];

        if (in_array('user_id', $columns, true)) {
            $data['user_id'] = $userId;
        }

        if (in_array('book_id', $columns, true)) {
            $data['book_id'] = $bookId;
        }

        if (in_array('status', $columns, true)) {
            $data['status'] = $status;
        }

        foreach (['request_date', 'requested_at'] as $column) {
            if (in_array($column, $columns, true)) {
                $data[$column] = now();
            }
        }

        if (in_array('created_at', $columns, true)) {
            $data['created_at'] = now();
        }

        if (in_array('updated_at', $columns, true)) {
            $data['updated_at'] = now();
        }

        return (int) DB::table('borrow_requests')->insertGetId($data);
    }

    private function createBorrowing(int $userId, int $bookId, ?int $borrowRequestId, string $status): int
    {
        DB::table('borrowings')
            ->where('user_id', $userId)
            ->where('book_id', $bookId)
            ->delete();

        $columns = Schema::getColumnListing('borrowings');

        $data = [];

        if (in_array('user_id', $columns, true)) {
            $data['user_id'] = $userId;
        }

        if (in_array('book_id', $columns, true)) {
            $data['book_id'] = $bookId;
        }

        if ($borrowRequestId && in_array('borrow_request_id', $columns, true)) {
            $data['borrow_request_id'] = $borrowRequestId;
        }

        if (in_array('status', $columns, true)) {
            $data['status'] = $status;
        }

        foreach (['borrowed_at', 'borrow_date', 'borrowed_date'] as $column) {
            if (in_array($column, $columns, true)) {
                $data[$column] = now();
            }
        }

        if (in_array('due_date', $columns, true)) {
            $data['due_date'] = now()->addDays(14);
        }

        if (in_array('returned_at', $columns, true) && $status === 'returned') {
            $data['returned_at'] = now();
        }

        if (in_array('created_at', $columns, true)) {
            $data['created_at'] = now();
        }

        if (in_array('updated_at', $columns, true)) {
            $data['updated_at'] = now();
        }

        return (int) DB::table('borrowings')->insertGetId($data);
    }

    private function findBookByTitle(string $title): ?object
    {
        return DB::table('books')
            ->where('title', $title)
            ->first();
    }

    private function findBorrowRequestByBookTitle(string $title): ?object
    {
        $book = $this->findBookByTitle($title);

        if (!$book) {
            return null;
        }

        return DB::table('borrow_requests')
            ->where('book_id', $book->id)
            ->orderByDesc('id')
            ->first();
    }

    private function findBorrowingByBookTitle(string $title): ?object
    {
        $book = $this->findBookByTitle($title);

        if (!$book) {
            return null;
        }

        return DB::table('borrowings')
            ->where('book_id', $book->id)
            ->orderByDesc('id')
            ->first();
    }

    private function deleteBookRelatedRows(int $bookId): void
    {
        if (Schema::hasTable('borrowings')) {
            DB::table('borrowings')->where('book_id', $bookId)->delete();
        }

        if (Schema::hasTable('borrow_requests')) {
            DB::table('borrow_requests')->where('book_id', $bookId)->delete();
        }
    }

    private function getAvailableCopiesColumn(): ?string
    {
        $columns = Schema::getColumnListing('books');

        foreach (['available_copies', 'available_quantity', 'quantity', 'copies'] as $column) {
            if (in_array($column, $columns, true)) {
                return $column;
            }
        }

        return null;
    }

    private function generateValidIsbn(string $value): string
    {
        $number = abs(crc32($value));

        return '978' . str_pad((string) ($number % 10000000000), 10, '0', STR_PAD_LEFT);
    }

    private function request(string $method, string $path, array $data = []): void
    {
        $url = $this->makeUrl($path);

        $ch = curl_init();

        $headers = [
            'Accept: text/html,application/xhtml+xml,application/json',
            'X-Requested-With: XMLHttpRequest',
        ];

        if ($this->csrfToken !== null) {
            $headers[] = 'X-XSRF-TOKEN: ' . $this->csrfToken;
        }

        $method = strtoupper($method);

        $curlOptions = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_COOKIEJAR => $this->cookieFile,
            CURLOPT_COOKIEFILE => $this->cookieFile,
            CURLOPT_HTTPHEADER => $headers,
        ];

        if ($method === 'POST') {
            $curlOptions[CURLOPT_POST] = true;
            $curlOptions[CURLOPT_POSTFIELDS] = http_build_query($data);
        }

        if (in_array($method, ['PUT', 'PATCH', 'DELETE'], true)) {
            $data['_method'] = $method;

            $curlOptions[CURLOPT_POST] = true;
            $curlOptions[CURLOPT_POSTFIELDS] = http_build_query($data);
        }

        curl_setopt_array($ch, $curlOptions);

        $rawResponse = curl_exec($ch);

        if ($rawResponse === false) {
            throw new Exception('Request failed: ' . curl_error($ch));
        }

        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $responseHeaders = substr($rawResponse, 0, $headerSize);
        $this->responseBody = substr($rawResponse, $headerSize);
        $this->statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

        $this->lastLocation = $this->extractLocation($responseHeaders);
        $this->extractCsrfToken($responseHeaders, $this->responseBody);
    }

    private function bodyAfterFollowingRedirectIfNeeded(): string
    {
        if (
            in_array($this->statusCode, [301, 302, 303, 307, 308], true)
            && $this->lastLocation !== null
        ) {
            $location = $this->lastLocation;

            if (str_starts_with($location, $this->baseUrl)) {
                $location = str_replace($this->baseUrl, '', $location);
            }

            $this->request('GET', $location);
        }

        return $this->responseBody;
    }

    private function makeUrl(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return $this->baseUrl . $path;
    }

    private function extractLocation(string $headers): ?string
    {
        if (preg_match('/^Location:\s*(.+)$/mi', $headers, $matches)) {
            return trim($matches[1]);
        }

        return null;
    }

    private function extractCsrfToken(string $headers, string $body): void
    {
        if (preg_match('/XSRF-TOKEN=([^;]+)/', $headers, $matches)) {
            $this->csrfToken = urldecode($matches[1]);
            return;
        }

        if (preg_match('/name="_token"\s+value="([^"]+)"/', $body, $matches)) {
            $this->csrfToken = $matches[1];
        }
    }

    private function normaliseFieldName(string $field): string
    {
        return match (strtolower($field)) {
            'email' => 'email',
            'password' => 'password',
            'title' => 'title',
            'author' => 'author',
            'isbn' => 'isbn',
            'category' => 'category',
            'description' => 'description',
            'available copies' => 'available_copies',
            'available quantity' => 'available_quantity',
            'quantity' => 'quantity',
            default => strtolower(str_replace(' ', '_', $field)),
        };
    }

    private function assertTrueOrFail(bool $condition, string $message): void
    {
        if (!$condition) {
            throw new Exception($message);
        }
    }

    private function assertEqualsOrFail(mixed $expected, mixed $actual, string $message): void
    {
        if ($expected != $actual) {
            throw new Exception($message);
        }
    }

    private function assertNotNullOrFail(mixed $value, string $message): void
    {
        if ($value === null) {
            throw new Exception($message);
        }
    }

    private function assertNullOrFail(mixed $value, string $message): void
    {
        if ($value !== null) {
            throw new Exception($message);
        }
    }

    private function assertStringContainsStringOrFail(string $needle, string $haystack, string $message): void
    {
        if (!str_contains($haystack, $needle)) {
            throw new Exception($message);
        }
    }
}