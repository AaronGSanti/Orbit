<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Exception;
use OpenApi\Attributes as OA;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    #[OA\Get(
        path: '/api/v1/tags',
        tags: ['Tags'],
        summary: 'Obtener todas las etiquetas',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Lista de etiquetas'),
            new OA\Response(response: 404, description: 'No se encontraron etiquetas'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function index()
    {
        $tags = Tag::all();

        if ($tags->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No tags found'
            ], 404);
        } else {
            return response()->json([
                'status' => 'success',
                'data' => $tags
            ], 200);
        }
    }

    #[OA\Post(
        path: '/api/v1/tags/store',
        tags: ['Tags'],
        summary: 'Crear una nueva etiqueta',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['nombre'],
                properties: [
                    new OA\Property(property: 'nombre', type: 'string', example: 'Urgente'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Etiqueta creada exitosamente'),
            new OA\Response(response: 422, description: 'Validacion fallida'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'required|string|max:255',
            ]);

            $tags = Tag::create([
                'nombre' => $validatedData['nombre'],
                'user_id' => $request->user()->id
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $tags
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }

    #[OA\Put(
        path: '/api/v1/tags/update/{id}',
        tags: ['Tags'],
        summary: 'Actualizar una etiqueta existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la etiqueta a actualizar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['nombre'],
                properties: [
                    new OA\Property(property: 'nombre', type: 'string', example: 'Urgente')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Etiqueta actualizada exitosamente'),
            new OA\Response(response: 422, description: 'Validacion fallida'),
            new OA\Response(response: 401, description: 'No autorizado')
        ]
    )]
    public function update(Request $request, $id)
    {
        $tags = Tag::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$tags) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tag not found'
            ], 404);
        }

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255'
        ]);

        $tags->update($validatedData);

        return response()->json([
            'status' => 'success',
            'data' => $tags
        ], 200);
    }

    #[OA\Delete(
        path: '/api/v1/tags/delete/{id}',
        tags: ['Tags'],
        summary: 'Eliminar una etiqueta existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la etiqueta a eliminar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Etiqueta eliminada exitosamente'),
            new OA\Response(response: 404, description: 'Etiqueta no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function delete(Request $request, $id)
    {
        $tags = Tag::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$tags) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tag not found'
            ], 404);
        } else {
            $tags->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Tag deleted successfully'
            ], 200);
        }
    }
}
