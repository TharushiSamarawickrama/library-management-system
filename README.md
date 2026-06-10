# Library Management System

## Project Overview

This is a Library Management System developed using Laravel, MySQL, React, and Inertia.js. The system allows an admin to manage books and allows users to view available books. The project was developed as part of my internship practice to learn Laravel backend development, database handling, authentication, role-based access, and React frontend integration using Inertia.js.

## Technologies Used

* Laravel
* React
* Inertia.js
* MySQL
* Laravel Breeze Authentication
* Vite
* Tailwind CSS
* Git and GitHub

## User Roles

The system has two main user roles:

### Admin

Admin can:

* Login to the system
* Access admin dashboard
* Add new books
* View book list
* Edit book details
* Delete books
* Manage book availability

### User

Normal user can:

* Register to the system
* Login to the system
* Access user dashboard
* View available books

## Main Features

* User registration and login
* Role-based dashboard for admin and user
* Book CRUD operations
* Add book details
* View all books
* View single book details
* Edit book information
* Delete books
* MySQL database integration
* React frontend using Inertia.js
* Laravel backend with controllers, models, migrations, and routes

## Database Tables

The project includes the following main tables:

### users

Stores user details such as name, email, password, role, phone, address, and status.

### books

Stores book details such as title, author, ISBN, category, published year, total copies, available copies, and status.

### borrow_requests

Stores borrowing request details such as user ID, book ID, request date, and request status.

### borrowings

Stores approved borrowing records such as borrowed date, due date, returned date, and borrowing status.

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



## Current Project Status

Completed:

* Laravel project setup
* MySQL database connection
* Database migrations
* User authentication using Breeze
* Admin and user role-based dashboard
* Book CRUD backend
* Book CRUD React frontend
* React + Inertia frontend conversion
* Vite build successfully working
* Old unused Blade frontend files removed

