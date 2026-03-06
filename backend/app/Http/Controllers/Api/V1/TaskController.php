<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Exception;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    #[OA\Get(
        path: '/api/v1/tasks',
        tags: ['Tasks'],
        summary: 'Obtener todas las tareas',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Lista de tareas'),
            new OA\Response(response: 404, description: 'No se encontraron tareas'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function index()
    {
        $user = Auth::user();
        $tasks = Task::where('user_id', $user->id)->get();
        $total_task = $tasks->count();

        if ($tasks->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No tasks found'
            ], 404);
        } else {
            return response()->json([
                'status' => 'success',
                'data' =>  $tasks,
                'user_id' => $user->id,
                'total_task' => $total_task
            ], 200);
        }
    }

    #[OA\Post(
        path: '/api/v1/tasks/store',
        tags: ['Tasks'],
        summary: 'Crear una nueva tarea',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['titulo', 'estado', 'prioridad'],
                properties: [
                    new OA\Property(property: 'titulo', type: 'string', example: 'Comprar alimentos'),
                    new OA\Property(property: 'descripcion', type: 'string', example: 'Comprar frutas, verduras y leche'),
                    new OA\Property(property: 'estado', type: 'string', example: 'pendiente'),
                    new OA\Property(property: 'prioridad', type: 'string', example: 'alta'),
                    new OA\Property(property: 'fecha_limite', type: 'string', format: 'date',  example: '2025-12-31'),
                    new OA\Property(property: 'task_list_id', type: 'integer', example: 1),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Tarea creada'),
            new OA\Response(response: 422, description: 'Validacion fallida'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'titulo' => 'required|string|max:255',
                'descripcion' => 'nullable|string',
                'estado' => 'required|string|in:pendiente,en_progreso,bloqueada,completada',
                'prioridad' => 'required|string|in:baja,media,alta,urgente',
                'fecha_limite' => 'nullable|date',
                'task_list_id' => 'nullable|integer|exists:task_lists,id',
            ]);

            $task = Task::create([
                'titulo' => $validatedData['titulo'],
                'descripcion' => $validatedData['descripcion'] ?? null,
                'estado' => $validatedData['estado'],
                'prioridad' => $validatedData['prioridad'],
                'fecha_limite' => $validatedData['fecha_limite'] ?? null,
                'task_list_id' => $validatedData['task_list_id'] ?? null,
                'user_id' => $request->user()->id
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $task
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ], 422);
        }
    }

    #[OA\Put(
        path: '/api/v1/tasks/update/{id}',
        tags: ['Tasks'],
        summary: 'Actualizar una tarea existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la tarea a actualizar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['titulo', 'estado', 'prioridad'],
                properties: [
                    new OA\Property(property: 'titulo', type: 'string', example: 'Comprar alimentos'),
                    new OA\Property(property: 'descripcion', type: 'string', example: 'Comprar frutas, verduras y leche'),
                    new OA\Property(property: 'estado', type: 'string', example: 'pendiente'),
                    new OA\Property(property: 'prioridad', type: 'string', example: 'alta'),
                    new OA\Property(property: 'fecha_limite', type: 'string', format: 'date',  example: '2025-12-31'),
                    new OA\Property(property: 'task_list_id', type: 'integer', example: 1),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Tarea actualizada'),
            new OA\Response(response: 404, description: 'Tarea no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }

        $validatedData = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|string|in:pendiente,en_progreso,bloqueada,completada',
            'prioridad' => 'required|string|in:baja,media,alta,urgente',
            'fecha_limite' => 'nullable|date',
            'task_list_id' => 'nullable|integer|exists:task_lists,id'
        ]);

        $task->update($validatedData);

        return response()->json([
            'status' => 'success',
            'data' => $task
        ], 200);
    }

    #[OA\Delete(
        path: '/api/v1/tasks/delete/{id}',
        tags: ['Tasks'],
        summary: 'Eliminar una tarea',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la tarea a eliminar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Tarea eliminada'),
            new OA\Response(response: 404, description: 'Tarea no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado')
        ]
    )]
    public function delete(Request $request, $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        } else {
            $task->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully'
            ], 200);
        }
    }

    public function showTask($search)
    {
        $user = Auth::user();
        $tasks = Task::where('user_id', $user->id)
            ->where(function ($query) use ($search) {
                $query->where('titulo', 'LIKE', "%{$search}%")
                    ->orWhere('descripcion', 'LIKE', "%{$search}%")
                    ->orWhere('estado', 'LIKE', "%{$search}%")
                    ->orWhere('prioridad', 'LIKE', "%{$search}%");
            })
            ->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ], 200);
    }
}
