# Library Management System

## Project Overview

This is a Library Management System developed using Laravel, MySQL, React, and Inertia.js. The system allows an admin to manage books, handle borrow requests, and manage borrowing records. Normal users can register, login, view books, search books, request books, and track their borrowing activity.



## Technologies Used

* Laravel
* React
* Inertia.js
* MySQL
* Laravel Breeze Authentication
* Vite
* Tailwind CSS
* Git
* GitHub

## User Roles

The system has two main user roles:

### Admin

Admin can:

* Login to the system
* Access the admin dashboard
* Add new books
* View all books
* Search books by title, author, or category
* View single book details
* Edit book details
* Delete books
* Manage book availability
* View all borrow requests
* Approve borrow requests
* Reject borrow requests
* View all borrowing records
* Mark books as returned
* Manage borrowing history

### User

Normal user can:

* Register to the system
* Login to the system
* Access the user dashboard
* View available books
* Search books by title, author, or category
* View single book details
* Send borrow requests
* View own borrow request status
* View own borrowed books
* Track borrowed date, due date, returned date, and status

## Main Features

* User registration and login
* Laravel Breeze authentication
* Role-based admin and user dashboards
* Admin book management
* Book CRUD operations
* Add book details
* View all books
* Search books by title, author, or category
* View single book details
* Edit book information
* Delete books
* User borrow request system
* Admin approval and rejection system
* Borrowing record creation after request approval
* Mark borrowed books as returned
* Automatic available copy count update
* MySQL database integration
* React frontend using Inertia.js
* Professional LMS-style user interface
* Laravel backend with controllers, models, migrations, and routes
* Git and GitHub version control

## System Workflow

### 1. User Registration and Login

A normal user can register and login to the system. After login, the user is redirected to the user dashboard.

### 2. Admin Login

Admin can login to the system and access the admin dashboard. The admin dashboard provides access to book management, borrow requests, and borrowing records.

### 3. Book Management

Admin can add, view, edit, and delete books. Each book contains details such as title, author, ISBN, category, published year, total copies, available copies, and status.

### 4. Book Search

Both admin and users can search books by:

* Title
* Author
* Category

This helps users find books quickly without checking the full book list manually.

### 5. Borrow Request Process

A user can request to borrow an available book. When the user sends a borrow request, the request is saved with the status:

```text
pending
```

The admin can then approve or reject the request.

### 6. Approve Borrow Request

When the admin approves a borrow request:

* The request status changes to approved
* A borrowing record is created
* The borrowed date is saved
* The due date is created
* The book available copy count decreases by one

### 7. Reject Borrow Request

When the admin rejects a borrow request:

* The request status changes to rejected
* No borrowing record is created
* Book copy count does not change

### 8. Borrowing Records

The system stores approved borrowings in the borrowings table. Admin can view all borrowing records. Users can only view their own borrowing records.

### 9. Return Book Process

When a book is returned, the admin can mark the borrowing record as returned. After marking as returned:

* The borrowing status changes to returned
* The returned date is saved
* The book available copy count increases by one

## Database Tables

The project includes the following main tables:

### users

Stores user details such as:

* Name
* Email
* Password
* Role
* Phone
* Address
* Status

### books

Stores book details such as:

* Title
* Author
* ISBN
* Category
* Published year
* Total copies
* Available copies
* Status

### borrow_requests

Stores borrowing request details such as:

* User ID
* Book ID
* Request date
* Request status

Request statuses:

```text
pending
approved
rejected
```

### borrowings

Stores approved borrowing records such as:

* User ID
* Book ID
* Borrowed date
* Due date
* Returned date
* Borrowing status

Borrowing statuses:

```text
borrowed
returned
overdue
```

## Project Folder Structure

Important project folders and files:

```text
app/Http/Controllers
app/Models
database/migrations
resources/js/Pages
resources/js/Pages/Admin
resources/js/Pages/User
resources/js/Pages/Books
resources/js/Pages/BorrowRequests
resources/js/Pages/Borrowings
resources/js/Pages/Profile
routes/web.php
```

## Important React Pages

The main React pages are:

```text
resources/js/Pages/Admin/Dashboard.jsx
resources/js/Pages/User/Dashboard.jsx
resources/js/Pages/Books/Index.jsx
resources/js/Pages/Books/Create.jsx
resources/js/Pages/Books/Edit.jsx
resources/js/Pages/Books/Show.jsx
resources/js/Pages/BorrowRequests/Index.jsx
resources/js/Pages/Borrowings/Index.jsx
resources/js/Pages/Profile/Edit.jsx
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Go to the Project Folder

```bash
cd library-management-system
```

### 3. Install PHP Dependencies

```bash
composer install
```

### 4. Install Node Dependencies

```bash
npm install
```

### 5. Create Environment File

```bash
cp .env.example .env
```

For Windows PowerShell, use:

```bash
copy .env.example .env
```

### 6. Generate Application Key

```bash
php artisan key:generate
```

### 7. Configure Database

Open the `.env` file and update the database details:

```env
DB_DATABASE=library_management_system
DB_USERNAME=root
DB_PASSWORD=
```

If your MySQL root user has a password, add it like this:

```env
DB_PASSWORD=your_password
```

### 8. Run Migrations

```bash
php artisan migrate
```

### 9. Run Laravel Server

```bash
php artisan serve
```

### 10. Run Vite Development Server

Open another terminal and run:

```bash
npm run dev
```

Then open the project in the browser:

```text
http://127.0.0.1:8000
```

## Build Frontend for Production

To build the React frontend, run:

```bash
npm run build
```

