<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function resend_mail(Request $request)
    {
        $phrase = $request->input('phrase');
        if (Session::get('captcha') == $phrase) {

        } else {
            return redirect()->back();
        }
    }
}
