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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/need_verify', 'VerifyController@index')->name("need_verify");


//需要登录，且已经完成邮件验证
Route::group(['middleware' => ['auth', 'verify']], function () {

    Route::get('/home', 'HomeController@index');

});