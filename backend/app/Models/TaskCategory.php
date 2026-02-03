<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskCategory
 * 
 * @property int $id
 * @property int $task_id
 * @property int $category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Category $category
 * @property Task $task
 *
 * @package App\Models
 */
class TaskCategory extends Model
{
	protected $table = 'task_category';

	protected $casts = [
		'task_id' => 'int',
		'category_id' => 'int'
	];

	protected $fillable = [
		'task_id',
		'category_id'
	];

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function task()
	{
		return $this->belongsTo(Task::class);
	}
}
