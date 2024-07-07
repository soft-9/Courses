<?php


namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::paginate(10); 
        return response()->json($courses);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course);
    }
}
