<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Video;

class VideoController extends Controller
{
    public function index(Course $course)
    {
        return response()->json($course->videos()->with('creator')->get());
    }

    public function show($id)
    {
        $video = Video::with('creator')->find($id);

        if (!$video) {
            return response()->json(['error' => 'Video not found'], 404);
        }

        return response()->json($video);
    }
}
