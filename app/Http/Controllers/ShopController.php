<?php
/**
 * Created by PhpStorm.
 * User: jiazequn
 * Date: 2016/12/20
 * Time: 下午2:01
 */

namespace App\Http\Controllers;


use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    protected $orderBy = ['time', 'evaluate'];

    public function shopList(Request $request)
    {
        $pageSize = intval($request->input('pageSize', 20));
        $curPage = intval($request->input('curPage', 1));
        $type = $request->input('type', "0");
        $category = $request->input('category', '0');
        $order = $request->input('order', 'desc');
        $orderBy = $request->input('orderBy', 'evaluate');

        if (!$this->orderByValidation($orderBy)) {
            return $this->error('502', '排序字段错误');
        }

        $builder = Shop::with('comments');

        if ($category != '0' && !empty($category_id = hashid_decode($category))) {
            $builder->where('category_id', '=', $category_id);
        }

        $shops = $builder->get()
            ->sortBy(function($shop) use($type, $orderBy) {
                $comments = $shop->comments;
                if ($orderBy == 'time') {
                    // 根据type找出好评或差评
                    if ($type != 0) {
                        $comments = $shop->comments->filter(function ($item) use ($type) {
                            return $item->type == $type;
                        });
                    }
                    //根据创建时间排序
                    if ($comments->count() > 0) {
                        return $comments->max('created_at')->timestamp;
                    } else {
                        return 0;
                    }
                } else if ($orderBy == 'evaluate') {
                    $divComments = $comments->groupBy('type');
                    //好评数和差评数
                    $good = isset($divComments['1']) ? $divComments['1']->count() : 0;
                    $bad = isset($divComments['2']) ? $divComments['2']->count() : 0;

                    //根据类别返回要排序的数据
                    if ($type == 1) {
                        return $good;
                    } elseif ($type == 2) {
                        return $bad;
                    } else {
                        return $good - $bad;
                    }
                } else {
                    //理论上不可到达
                    return 0;
                }
            }, SORT_REGULAR, $order == 'desc');
        $count = $shops->count();

        //分页
        $shops = $shops->flatten()->forPage($curPage, $pageSize)->flatten();

        //生成返回数据
        $data = $shops->map(function ($item, $key){
            return [
                'id' => hashid_encode($item['id']),
                'name' => $item['name'],
                'good' => $item->goodCommentCount(),
                'bad' => $item->badCommentCount(),
            ];
        });
        $result = [
            'count' => $count,
            'total_page' => ceil($count / $pageSize),
            'curPage' => $curPage,
            'pageSize' => $pageSize,
            'shop_list' => $data,
        ];

        return $this->success($result);

    }

    public function orderByValidation($orderBy) {
        return in_array($orderBy, $this->orderBy);
    }

}