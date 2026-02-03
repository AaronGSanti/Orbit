<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Task
 * 
 * @property int $id
 * @property int|null $task_list_id
 * @property string|null $titulo
 * @property int $user_id
 * @property string|null $descripcion
 * @property string $estado
 * @property string $prioridad
 * @property Carbon|null $fecha_limite
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property TaskList|null $task_list
 * @property User $user
 * @property Collection|Category[] $categories
 * @property Collection|TaskReminder[] $task_reminders
 * @property Collection|Tag[] $tags
 *
 * @package App\Models
 */
class Task extends Model
{
	protected $table = 'tasks';

	protected $casts = [
		'task_list_id' => 'int',
		'user_id' => 'int',
		'fecha_limite' => 'datetime'
	];

	protected $fillable = [
		'task_list_id',
		'titulo',
		'user_id',
		'descripcion',
		'estado',
		'prioridad',
		'fecha_limite'
	];

	public function task_list()
	{
		return $this->belongsTo(TaskList::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function categories()
	{
		return $this->belongsToMany(Category::class, 'task_category')
					->withPivot('id')
					->withTimestamps();
	}

	public function task_reminders()
	{
		return $this->hasMany(TaskReminder::class);
	}

	public function tags()
	{
		return $this->belongsToMany(Tag::class, 'task_tag')
					->withPivot('id')
					->withTimestamps();
	}
}
