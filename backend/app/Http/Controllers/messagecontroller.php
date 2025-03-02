<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\messageModel;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index($receiverId)
    {
        $messages = Message::where(function ($query) use ($receiverId) {
                $query->where('sender_id', Auth::id())->where('receiver_id', $receiverId);
            })
            ->orWhere(function ($query) use ($receiverId) {
                $query->where('sender_id', $receiverId)->where('receiver_id', Auth::id());
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string'
        ]);

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message
        ]);

        return response()->json($message);
    }
}
