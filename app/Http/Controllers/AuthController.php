<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFrontend;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:usersfrontend,email',
        'password' => 'required|string|min:8|confirmed',
        'gender' => 'required|in:male,female',
        'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $user = new UserFrontend([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'gender' => $request->gender,
    ]);

    if ($request->hasFile('profile_photo')) {
        $user->profile_photo = $request->file('profile_photo')->store('profile_photos', 'public');
    }

    $user->save();

    return response()->json(['message' => 'User registered successfully', 'token' => $user->createToken('auth_token')->plainTextToken], 201);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Specify the model to use for authentication
        Auth::guard('web')->setProvider(new \Illuminate\Auth\EloquentUserProvider(
            app('hash'), UserFrontend::class
        ));

        $credentials = $request->only('email', 'password');

        if (Auth::guard('web')->attempt($credentials)) {
            $user = Auth::guard('web')->user();
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
    public function user(Request $request)
    {
        return $request->user();
    }

}
