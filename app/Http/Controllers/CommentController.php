<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index($videoId)
    {
        return Comment::where('video_id', $videoId)->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required',
            'video_id' => 'required|exists:videos,id'
        ]);

        if (!Auth::check()) {
            return response()->json(['error' => 'You must be logged in to post a comment'], 403);
        }

        $comment = Comment::create([
            'comment' => $request->comment,
            'video_id' => $request->video_id,
            'name' => Auth::user()->name,
            'gender' => Auth::user()->gender,
        ]);

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required',
            'name' => 'required',
            'gender' => 'required|in:male,female',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update($request->all());

        return $comment;
    }

    public function destroy(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $comment = Comment::findOrFail($id);

        if ($comment->name !== $request->name) {
            return response()->json(['error' => 'You are not allowed to delete this comment.'], 403);
        }

        $comment->delete();

        return response()->noContent();
    }
}
