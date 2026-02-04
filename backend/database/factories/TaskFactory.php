<?php

namespace Database\Factories;

use App\Models\TaskList;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(5),
            'descripcion' => $this->faker->paragraph(),
            'estado' => $this->faker->randomElement(['pendiente', 'en_progreso', 'completada', 'bloqueada']),
            'prioridad' => $this->faker->randomElement(['baja', 'media', 'alta', 'urgente']),
            'fecha_limite' => $this->faker->date(),
            'task_list_id' => TaskList::inRandomOrder()->value('id'),
            'user_id' => User::inRandomOrder()->value('id')
        ];
    }
}
