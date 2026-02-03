<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskReminder
 * 
 * @property int $id
 * @property int $task_id
 * @property Carbon|null $reminder_time
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Task $task
 *
 * @package App\Models
 */
class TaskReminder extends Model
{
	protected $table = 'task_reminders';

	protected $casts = [
		'task_id' => 'int',
		'reminder_time' => 'datetime'
	];

	protected $fillable = [
		'task_id',
		'reminder_time'
	];

	public function task()
	{
		return $this->belongsTo(Task::class);
	}
}
