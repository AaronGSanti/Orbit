<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TaskList;
use Exception;
use OpenApi\Attributes as OA;

use Illuminate\Http\Request;

class TaskListController extends Controller
{
    #[OA\Get(
        path: '/api/v1/task_lists',
        tags: ['Task Lists'],
        summary: 'Obtener todas las task lists',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Lista de task lists'),
            new OA\Response(response: 404, description: 'No se encontraron task lists'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function index()
    {
        $task_lists = TaskList::all();

        if ($task_lists->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No task lists found'
            ], 404);
        } else {
            return response()->json([
                'status' => 'success',
                'data' => $task_lists
            ], 200);
        }
    }

    #[OA\Post(
        path: '/api/v1/task_lists/store',
        tags: ['Task Lists'],
        summary: 'Crear una nueva task list',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['nombre', 'orden'],
                properties: [
                    new OA\Property(property: 'nombre', type: 'string', example: 'Lista de tareas'),
                    new OA\Property(property: 'orden', type: 'string', example: '1'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Task list created successfully'),
            new OA\Response(response: 422, description: 'Validacion fallida'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'required|string|max:255',
                'color' => 'nullable|string|max:255',
                'orden' => 'required|integer',
            ]);

            $task_lists = TaskList::create([
                'nombre' => $validatedData['nombre'],
                'color' => $validatedData['color'] ?? null,
                'orden' => $validatedData['orden'],
                'user_id' => $request->user()->id
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $task_lists
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 404);
        }
    }

    #[OA\Put(
        path: '/apui/v1/task_lists/update/{id}',
        tags: ['Task Lists'],
        summary: 'Actualizar una task list existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la task list a actualizar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['nombre', 'orden'],
                properties: [
                    new OA\Property(property: 'nombre', type: 'string', example: 'Lista de tareas actualizada'),
                    new OA\Property(property: 'color', type: 'string', example: '#FF5733'),
                    new OA\Property(property: 'orden', type: 'integer', example: '2'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Task list updated successfully'),
            new OA\Response(response: 404, description: 'Task list no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function update(Request $request, $id)
    {
        $task_lists = TaskList::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$task_lists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task list not found'
            ], 404);
        }

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'color' => 'nullable|string|max:255',
            'orden' => 'required|integer',
        ]);

        $task_lists->update($validatedData);

        return response()->json([
            'status' => 'success',
            'data' => $task_lists
        ], 200);
    }

    #[OA\Delete(
        path: '/api/v1/task_lists/delete/{id}',
        tags: ['Task Lists'],
        summary: 'Eliminar una task list existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la task list a eliminar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Task list eliminada exitosamente'),
            new OA\Response(response: 404, description: 'Task list no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function delete(Request $request , $id)
    {
        $task_lists = TaskList::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if(!$task_lists){
            return response()->json([
                'status' => 'error',
                'message' => 'Task list not found'
            ], 404);
        }else{
            $task_lists->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Task list deleted successfully'
            ], 200);
        }
    }
}
