<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * 
 * @property int $id
 * @property string|null $nombre
 * @property int $user_id
 * @property string|null $color
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class Category extends Model
{
	use HasFactory;
	protected $table = 'categories';

	protected $casts = [
		'user_id' => 'int'
	];

	protected $fillable = [
		'nombre',
		'user_id',
		'color'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function tasks()
	{
		return $this->belongsToMany(Task::class, 'task_category')
			->withPivot('id')
			->withTimestamps();
	}
}
