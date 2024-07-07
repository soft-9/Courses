<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'destroy']);
    }

    public function index($videoId)
    {
        return Comment::where('video_id', $videoId)->with('user')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
            'video_id' => 'required|exists:videos,id'
        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'You must be logged in to post a comment'], 403);
        }

        $comment = Comment::create([
            'comment' => $request->comment,
            'video_id' => $request->video_id,
            'user_id' => $user->id,
            'name' => $user->name,
            'gender' => $user->gender,
            'profile_picture' => $user->profile_photo
        ]);

        return response()->json($comment, 201);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        $user = auth()->user();
        if (!$user || $comment->user_id !== $user->id) {
            return response()->json(['error' => 'You are not allowed to delete this comment.'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted'], 200);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string|max:255'
        ]);

        $comment = Comment::findOrFail($id);

        $user = auth()->user();
        if (!$user || $comment->user_id !== $user->id) {
            return response()->json(['error' => 'You are not allowed to update this comment.'], 403);
        }

        $comment->update([
            'comment' => $request->comment
        ]);

        return response()->json($comment, 200);
    }

}
