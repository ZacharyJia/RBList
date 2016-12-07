<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function generate_verify_token()
    {
        $token = str_random(32);
        $this->is_verified = false;
        $this->verify_token = $token;
        $this->verify_token_time = Carbon::now()->addMinutes(30);
        $this->save();

        return $token;
    }
}
