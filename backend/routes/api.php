<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\TagsController;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\TaskListController;
use App\Http\Controllers\Api\V1\UserController;

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
        Route::get('/tasks/search/{search}', [TaskController::class, 'showTask']);
        Route::get('/tasks/search_date/{date}/{date2}', [TaskController::class, 'showTaskDate']);
        Route::get('/tasks/totalTasks', [TaskController::class,'totalTasks']);

        //Routes categories
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories/store', [CategoryController::class, 'store']);
        Route::put('/categories/update/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/delete/{id}', [CategoryController::class, 'delete']);

        //Routes task lists
        Route::get('/task_lists', [TaskListController::class, 'index']);
        Route::post('/task_lists/store', [TaskListController::class, 'store']);
        Route::put('/task_lists/update/{id}', [TaskListController::class, 'update']);
        Route::delete('/task_lists/delete/{id}', [TaskListController::class, 'delete']);

        //Routes tags
        Route::get('/tags', [TagsController::class, 'index']);
        Route::post('/tags/store', [TagsController::class, 'store']);
        Route::put('/tags/update/{id}', [TagsController::class, 'update']);
        Route::delete('/tags/delete/{id}', [TagsController::class, 'delete']);
    });
});
