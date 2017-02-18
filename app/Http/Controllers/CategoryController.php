<?php
/**
 * Created by PhpStorm.
 * User: jiazequn
 * Date: 2016/12/20
 * Time: 下午12:37
 */

namespace App\Http\Controllers;


use App\Models\Category;

class CategoryController extends Controller
{

    public function getCategoryList()
    {
        $category = Category::all();

        $data = $category->map(function($item, $key) {
            return [
                "category_list" => [
                    'id' => hashid_encode($item['id']),
                    'name' => $item['name'],
                ]
            ];
        });

        return $this->success($data);
    }

}