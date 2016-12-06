<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class EmailVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $is_verified = Auth::user()->isVerified;
            if ($is_verified) {
                return $next($request);
            } else {
                return redirect()->route("need_verify");
            }
        } else {
            throw new \Exception("not login exception");
        }
        return $next($request);
    }
}
