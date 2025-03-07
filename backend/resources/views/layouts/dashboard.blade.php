@extends('layouts.app')

@section('content')
<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <p class="text-gray-600 text-center mb-4">Welcome back! Please log in to access your account.</p>

        @if(session('error'))
            <div class="text-red-500 text-center mb-4">{{ session('error') }}</div>
        @endif
3
        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input id="email" type="email" name="email" placeholder="Enter your Email"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value="{{ old('email') }}" required>
                @error('email')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="password">Password</label>
                <input id="password" type="password" name="password" placeholder="Enter your Password"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required>
                @error('password')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex items-center justify-between mb-4">
                <label class="flex items-center">
                    <input type="checkbox" name="remember" class="mr-2"> Remember Me
                </label>
                <a  class="text-orange-500 text-sm">Forgot Password?</a>
            </div>

            <button type="submit"
                class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                Login
            </button>
        </form>

        <div class="my-4 text-center text-gray-500">OR</div>

        <a href="{{ route('auth.google') }}"
            class="w-full flex items-center justify-center border py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="w-5 h-5 mr-2">
            Login with Google
        </a>

        <p class="text-center text-gray-600 mt-4">
            Don't have an account? <a href="{{ route('register') }}" class="text-orange-500">Sign Up</a>
        </p>
    </div>
</div>
@endsection
