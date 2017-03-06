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

    public function goodCommentCount()
    {
        return $this->comments->where('type', 1)->count();
    }

    public function badCommentCount()
    {
        return $this->comments->where('type', 2)->count();
    }

    public function overallCommentCount()
    {
        return $this->goodCommentCount() - $this->badCommentCount();
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }


}
