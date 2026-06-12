<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::get('/portfolio', [PortfolioController::class, 'show']);
Route::get('/sections', [SectionController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json([
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'role' => $request->user()->role,
        ]);
    });

    Route::apiResource('messages', MessageController::class);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::apiResource('sections', SectionController::class)->except(['index']);
    Route::apiResource('projects', ProjectController::class)->except(['index']);
    Route::get('/profile', [PortfolioController::class, 'settings']);
    Route::put('/profile', [PortfolioController::class, 'updateSettings']);
    Route::post('/projects/sync-github', [PortfolioController::class, 'syncGithubProjects']);
});
