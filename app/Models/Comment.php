<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment',
        'name',
        'gender',
        'video_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(UserFrontend::class, 'user_id');
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
