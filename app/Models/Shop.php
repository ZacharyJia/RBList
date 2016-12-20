<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    use SoftDeletes;

    protected $table = "shop";
    protected $primaryKey = "id";

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

}
