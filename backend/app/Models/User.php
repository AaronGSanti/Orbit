<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Category[] $categories
 * @property Collection|Tag[] $tags
 * @property Collection|TaskList[] $task_lists
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'users';

	protected $casts = [
		'email_verified_at' => 'datetime'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'name',
		'email',
		'email_verified_at',
		'password',
		'remember_token'
	];

	public function categories()
	{
		return $this->hasMany(Category::class);
	}

	public function tags()
	{
		return $this->hasMany(Tag::class);
	}

	public function task_lists()
	{
		return $this->hasMany(TaskList::class);
	}

	public function tasks()
	{
		return $this->hasMany(Task::class);
	}
}
