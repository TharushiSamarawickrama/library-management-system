<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'category',
        'published_year',
        'total_copies',
        'available_copies',
        'status',
    ];

    public function borrowRequests()
    {
        return $this->hasMany(BorrowRequest::class);
    }

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }
}