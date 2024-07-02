<?php
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/courses', function (Request $request) {
    return Course::all();
});
