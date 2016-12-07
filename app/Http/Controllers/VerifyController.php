<?php

namespace App\Http\Controllers;

use App\Mail\VerifyEmail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class VerifyController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function show_need_verify()
    {
        $email = Auth::user()->email;
        return view('auth.need_verify', ['email' => $email]);
    }

    public function verify($email, $token)
    {
        $user = User::where('email', $email)
            ->where('verify_token', $token)
            ->first();
        if (!$user) {
            $status = 2;
        } else if ($user->is_verified == true) {
            $status = 1; //无需验证
        } else if ($user->verify_token_time > Carbon::now()) {
            $user->is_verified = true;
            $user->save();

            $status = 0; //成功
        } else {
            $status = 2; //验证码失效
        }

        return view('auth.verified')->with(['status' => $status]);
    }


    public function show_resend_mail()
    {
        return view('auth.resend')->with([
            'is_verified' => Auth::user()->is_verified,
        ]);
    }

    public function resend_mail(Request $request)
    {
        $phrase = $request->input('phrase');
        if (Session::get('captcha') == $phrase) {
            $user = Auth::user();

            //这里是计算上次生成时间和本次生成时间的差距是否在1分钟以上。
            //因为verify_token_time里记录的是过期时间，是上次生成时间+30min
            if (Carbon::now()->addMinutes(29) < $user->verify_token_time ) {
                return redirect()->back()
                    ->withErrors([
                        "captcha" => "您的请求过于频繁，请1分钟后再试",
                    ]);
            } else {
                $user->generate_verify_token();
                Mail::to($user->email)
                    ->queue(new VerifyEmail($user));

                return redirect()->route('need_verify');
            }
        } else {
            return redirect()->back()
                ->withErrors([
                "captcha" => "验证码错误",
            ]);
        }
    }
}
