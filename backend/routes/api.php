<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\UserController;
use App\Models\Task;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);

        //Routes users
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users/store', [UserController::class, 'store']);
        Route::put('/users/update/{id}', [UserController::class, 'update']);
        Route::delete('/users/delete/{id}', [UserController::class, 'delete']);

        //Routes tasks
        Route::get('/tasks', [TaskController::class, 'index']);
        Route::post('/tasks/store', [TaskController::class, 'store']);
        Route::put('/tasks/update/{id}', [TaskController::class, 'update']);
        Route::delete('/tasks/delete/{id}', [TaskController::class, 'delete']);
    });
});
