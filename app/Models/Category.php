<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $table = "category";
    protected $primaryKey = "id";

    public function shops()
    {
        return $this->hasMany('App\Models\Shop');
    }

}
