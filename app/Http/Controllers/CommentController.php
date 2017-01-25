<?php
/**
 * Created by PhpStorm.
 * User: jiazequn
 * Date: 2016/12/21
 * Time: 上午11:43
 */

namespace App\Http\Controllers;


use App\Models\Comment;
use Illuminate\Http\Request;
use Validator;
use Auth;

class CommentController extends Controller
{

    public function comment(Request $request) {
        $validator = Validator::make($request->all(), [
            'shop_id' => 'required',
            'content' => 'required|string',
            'type' => 'required|integer|in:1,2',
            'reply' => 'string'
        ]);

        $shop_id = hashid_decode($request->input('shop_id'));
        $content = $request->input('content');
        $type = $request->input('type');
        $reply_to = hashid_decode($request->input('reply'));


        if ($validator->fails() || empty($shop_id)) {
            return $this->error('506', '参数错误');
        }

        if (!empty($request->input('reply')) && empty($reply_to)) {
            return $this->error('506', '参数错误');
        }

        $user_id = Auth::id();

        $comment = new Comment();
        $comment['user_id'] = $user_id;
        $comment['shop_id'] = $shop_id;
        $comment['content'] = $content;
        $comment['reply_to'] = $reply_to == null ? 0 : $reply_to;
        $comment['type'] = $type;

        $comment->save();

        return $this->success();
    }

    public function commentList(Request $request) {

        $validator = Validator::make($request->all(), [
            'pageSize' => 'integer',
            'curPage' => 'integer',
            'shop_id' => 'required',
            'type' => 'integer',
            'order' => 'in:asc,desc'
        ]);
        if ($validator->fails()) {
            return $this->error('506', '参数错误');
        }

        $pageSize = intval($request->input('pageSize', 20));
        $curPage = intval($request->input('curPage', 1));
        $shop_id = hashid_decode($request->input('shop_id'));
        $type = intval($request->input('type', "0"));
        $order = $request->input('order', 'desc');
        $orderBy = $request->input('orderBy', 'time');

        $builder = Comment::With('creator')
            ->where('shop_id', '=', $shop_id);
        if ($type != 0) {
            $builder->where('type', '=', $type);
        }

        $count = $builder->count();

        $builder->offset(($curPage - 1) * $pageSize)
            ->limit($pageSize);

        if ($orderBy == 'time') {
            $builder->orderBy('created_at', $order);
        }

        $data = $builder->get()->map(function ($comment){
            return [
                'id' => hashid_encode($comment->id),
                'creator_id' => hashid_encode($comment->user_id),
                'creator' => $comment->creator == null ? '匿名用户' : $comment->creator->name,
                'content' => $comment->content,
                'type' => $comment->type == 1 ? 'good':'bad',
            ];
        });
        $result = [
            'count' => $count,
            'total_page' => ceil($count / $pageSize),
            'cur_page' => $curPage,
            'pageSize' => $pageSize,
            'comment_list' => $data->toArray(),
        ];

        return $this->success($result);



    }

}
