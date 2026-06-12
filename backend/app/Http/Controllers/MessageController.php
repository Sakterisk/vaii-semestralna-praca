<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Support\ContentSanitizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Message::query()->with('user')->latest();

        if (! $user->isAdmin()) {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'data' => $query->get()->map(function (Message $message) {
                return [
                    'id' => $message->id,
                    'subject' => $message->subject,
                    'content' => $message->content,
                    'user_id' => $message->user_id,
                    'email' => $message->user?->email,
                    'created_at' => $message->created_at,
                ];
            }),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:4096'],
        ]);

        $message = Message::create([
            'subject' => ContentSanitizer::text($validated['subject']),
            'content' => ContentSanitizer::text($validated['content']),
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Message sent successfully.',
            'data' => $message,
        ], 201);
    }

    public function show(Request $request, Message $message): JsonResponse
    {
        $this->authorizeMessage($request, $message);

        return response()->json([
            'data' => $message->load('user'),
        ]);
    }

    public function update(Request $request, Message $message): JsonResponse
    {
        $this->authorizeMessage($request, $message);

        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:4096'],
        ]);

        $message->update([
            'subject' => ContentSanitizer::text($validated['subject']),
            'content' => ContentSanitizer::text($validated['content']),
        ]);

        return response()->json([
            'message' => 'Message updated successfully.',
            'data' => $message->fresh(),
        ]);
    }

    public function destroy(Request $request, Message $message): JsonResponse
    {
        $this->authorizeMessage($request, $message);
        $message->delete();

        return response()->json([
            'message' => 'Message deleted successfully.',
        ]);
    }

    private function authorizeMessage(Request $request, Message $message): void
    {
        $user = $request->user();

        abort_unless($user->isAdmin() || $message->user_id === $user->id, 403, 'Forbidden');
    }
}
