@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">激活结果</div>
                <div class="panel-body">
                    @if($status == 0)
                        邮箱验证完成，欢迎访问交大红黑榜。
                        <a class="btn btn-primary" href="{{ route('home') }}">开始访问</a>
                    @elseif($status == 1)
                        您已激活账户，无需验证邮箱。
                    @else
                        验证连接已超时，点击以下按钮重新发送激活连接。
                        <br /><br /><br />
                        <a href="{{ route("show_resend_verify_email") }}" class="btn btn-primary">重新发送</a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
