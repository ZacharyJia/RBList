<?php
/**
 * Created by PhpStorm.
 * User: jiazequn
 * Date: 2016/12/20
 * Time: 下午1:22
 */

namespace App\Http\Controllers;


class UserController extends Controller
{
    public function userInfo()
    {
        $user = \Auth::user();
        if ($user != null) {
            $data = [
                'username' => $user['name'],
                'email' => $user['email'],
                'verified' => $user['is_verified'],
            ];

            return $this->success($data);
        } else {
            return $this->error('501', '用户未登录');
        }
    }
}