<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'TestController@index');

Auth::routes();

Route::get('/need_verify', 'VerifyController@show_need_verify')->name("need_verify")->middleware("auth");
Route::get('/verify/{email}/{token}', 'VerifyController@verify')->name("verify");
Route::get('/resend', 'VerifyController@show_resend_mail')->name("show_resend_verify_email")->middleware("auth");
Route::post('/resend_verify_email', 'VerifyController@resend_mail')->name("resend_verify_email")->middleware("auth");


Route::get('/captcha/{tmp}', 'CaptchaController@captcha')->name("captcha");

//需要登录，且已经完成邮件验证
Route::group(['middleware' => ['auth', 'verify']], function () {
    Route::get('/home', 'HomeController@index')->name("home");

});