<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function success($data = null)
    {
        $result = [
            "code" => "200",
            "msg" => "OK",
        ];

        if ($data != null) {
            $result['data'] = [
                "category_list" => $data
            ];
        }

        return $result;
    }

    protected function error($code, $msg)
    {
        $result = [
            "code" => $code,
            "msg" => $msg,
        ];

        return $result;
    }
}
