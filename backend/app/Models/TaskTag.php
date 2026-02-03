<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskTag
 * 
 * @property int $id
 * @property int $task_id
 * @property int $tag_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Tag $tag
 * @property Task $task
 *
 * @package App\Models
 */
class TaskTag extends Model
{
	protected $table = 'task_tag';

	protected $casts = [
		'task_id' => 'int',
		'tag_id' => 'int'
	];

	protected $fillable = [
		'task_id',
		'tag_id'
	];

	public function tag()
	{
		return $this->belongsTo(Tag::class);
	}

	public function task()
	{
		return $this->belongsTo(Task::class);
	}
}
