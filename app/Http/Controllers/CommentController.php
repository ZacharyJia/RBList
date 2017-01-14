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
use Hashids;

class CommentController extends Controller
{

    public function comment(Request $request) {
        $validator = Validator::make($request->all(), [
            'shop_id' => 'required|integer',
            'content' => 'required|string',
            'type' => 'required|integer|in:1,2',
            'reply' => 'string'
        ]);

        $shop_id = Hashids::decode($request->input('shop_id'));
        $content = $request->input('content');
        $type = $request->input('type');
        $reply_to = Hashids::decode($request->input('reply'));


        if ($validator->fails()) {
            return $this->error('506', '参数错误');
        }

        $user_id = Auth::id();

        $comment = new Comment();
        $comment['user_id'] = $user_id;
        $comment['shop_id'] = $shop_id;
        $comment['content'] = $content;
        $comment['reply_to'] = $reply_to;
        $comment['type'] = $type;

        $comment->save();

        return $this->success();
    }

    public function commentList() {

    }

}