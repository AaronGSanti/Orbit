<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class CategoryController extends Controller
{
    #[OA\Get(
        path: '/api/v1/categories',
        tags: ['Categories'],
        summary: 'Obtener todas las categorias',
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'Lista de categorias'),
            new OA\Response(response: 404, description: 'No se encontraron categorias'),
            new OA\Response(response: 401, description: 'No autorizado')
        ]
    )]
    public function index()
    {
        $user = Auth::user();
        $categories = Category::where('user_id', $user->id)->get();

        if ($categories->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No categories found',
            ], 404);
        } else {
            return response()->json([
                'status' => 'success',
                'data' => $categories
            ], 200);
        }
    }

    #[OA\Post(
        path: '/api/v1/categories/store',
        tags: ['Categories'],
        summary: 'Crear una nueva categoria',
        security: [['bearerAuth' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['nombre'],
                properties: [
                    new OA\Property(property: 'nombre', type: 'string', example: 'Trabajo'),
                    new OA\Property(property: 'color', type: 'string', example: '#FF5733'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Categoria creada exitosamente'),
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
            ]);

            $task = Category::create([
                'nombre' => $validatedData['nombre'],
                'color' => $validatedData['color'] ?? null,
                'user_id' => $request->user()->id
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $task
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }

    #[OA\Put(
        path: '/api/v1/categories/update/{id}',
        tags: ['Categories'],
        summary: 'Actualizar una categoria existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la categoria a actualizar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['nombre'],
                properties: [
                    new OA\Property(property: 'nombre', type: 'string', example: 'Trabajo'),
                    new OA\Property(property: 'color', type: 'string', example: '#FF5733'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Categoria actualizada exitosamente'),
            new OA\Response(response: 404, description: 'Categoria no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado'),
        ]
    )]
    public function update(Request $request, $id)
    {
        $categories = Category::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$categories) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'color' => 'nullable|string|max:255'
        ]);

        $categories->update($validatedData);

        return response()->json([
            'status' => 'success',
            'data' => $categories
        ], 200);
    }

    #[OA\Delete(
        path: '/api/v1/categories/delete/{id}',
        tags: ['Categories'],
        summary: 'Eliminar una categoria existente',
        security: [['bearerAuth' => []]],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la categoria a eliminar',
                schema: new OA\Schema(type: 'integer', example: 1)
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Categoria eliminada exitosamente'),
            new OA\Response(response: 404, description: 'Categoria no encontrada'),
            new OA\Response(response: 401, description: 'No autorizado'),

        ]
    )]
    public function delete(Request $request, $id)
    {
        $categories = Category::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$categories) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        } else {
            $categories->delete();
            return response()->json([
                'message' => 'Category deleted successfully',
                'status' => 'success',
            ], 200);
        }
    }

    public function show($nombre)
    {
        $user = Auth::user();
        $categories = Category::where('user_id', $user->id)
            ->where('nombre','like', '%'.$nombre.'%')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $categories
        ], 200);
    }

    public function totalCategories(){
        $user = Auth::user();
        $total_categories = Category::where('user_id', $user->id)->count();

        return response()->json([
            'status' => 'success',
            'total' => $total_categories
        ]);
    }
}
