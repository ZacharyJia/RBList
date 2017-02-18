<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;

    protected $table = "comment";
    protected $primaryKey = "id";

    public function creator() {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
