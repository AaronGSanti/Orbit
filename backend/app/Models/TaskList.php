<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskList
 * 
 * @property int $id
 * @property int $user_id
 * @property string|null $nombre
 * @property string|null $color
 * @property int $orden
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class TaskList extends Model
{
	protected $table = 'task_lists';

	protected $casts = [
		'user_id' => 'int',
		'orden' => 'int'
	];

	protected $fillable = [
		'user_id',
		'nombre',
		'color',
		'orden'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function tasks()
	{
		return $this->hasMany(Task::class);
	}
}
