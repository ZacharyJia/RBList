<?php

namespace App\Http\Controllers;

use App\Mail\VerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TestController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        return view('welcome');
//        Mail::to('jia199474@gmail.com')
//            ->queue(new VerifyEmail());
//        dd(route("verify", ['token' => "heihei123", 'email' => '13281110@bjtu.edu.cn']));
        return view('welcome');
    }

    public function api_test(Request $request)
    {
        $data = $request->input('data');
        return [
            "status" => "200",
            "data" => [
                [
                    "name" => "zachary",
                    "age" => 22,
                ],
                [
                    "name" => "jia199474",
                    "age" => 25,
                ]
            ],
            "your_input" => $data
        ];
    }
}
