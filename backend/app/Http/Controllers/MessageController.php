<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function index()
    {
        if (!auth()->user()) {
            return response()->json('Unauthorized', 401);
        }

        if (auth()->user()->id !== 1) {
            return response()->json(Message::all()->where('user_id', auth()->user()->id));
        }

        $messages = Message::with('user')->get();

        $messagesWithEmail = $messages->map(function ($message) {
            return [
                'id' => $message->id,
                'subject' => $message->subject,
                'content' => $message->content,
                'user_id' => $message->user_id,
                'email' => $message->user->email ?? null,
            ];
        });

        return response()->json($messagesWithEmail);
    }

    public function store(Request $request)
    {
        if (!auth()->user()) {
            return response()->json('Unauthorized');
        }
        $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1024'],
        ]);
        $message = new Message;
        $message->subject = $request->subject;
        $message->content = $request->content;
        $message->user_id = auth()->user()->id;
        $message->save();
        return response()->json('Section added successfully');
    }

    public function show($id)
    {
        if (!auth()->user()) {
            return response()->json('Unauthorized');
        }
        $message = Message::find($id);
        if (!$message) {
            return response()->json('Message not found');
        }
        if ($message->user_id !== auth()->user()->id && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        return response()->json($message);
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user()) {
            return response()->json('Unauthorized');
        }
        $message = Message::find($id);
        if (!$message) {
            return response()->json('Message not found');
        }
        if ($message->user_id !== auth()->user()->id && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1024'],
        ]);
        $message->subject = $request->subject;
        $message->content = $request->content;
        $message->save();
        return response()->json('Message updated successfully');
    }

    public function destroy($id)
    {
        if (!auth()->user()) {
            return response()->json('Unauthorized');
        }
        $message = Message::find($id);
        if (!$message) {
            return response()->json('Message not found');
        }
        if ($message->user_id !== auth()->user()->id && !auth()->user()->id === 1) {
            return response()->json('Unauthorized');
        }
        $message->delete();
        return response()->json('Message deleted successfully');
    }
}
