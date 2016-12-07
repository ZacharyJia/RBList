@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">等待验证邮箱</div>
                <div class="panel-body">
                    <p>
                    验证邮件已经发送至您的注册邮箱: {{ $email }},
                    请<a href="http://mail.bjtu.edu.cn" target="_blank">登录邮箱</a>点击验证链接完成验证。
                    </p>
                    <p>
                        如果您长时间没有收到验证邮件，请点击<a href="{{ route('show_resend_verify_email') }}">这里</a>重新发送验证邮件。
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
