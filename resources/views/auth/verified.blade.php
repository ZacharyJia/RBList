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
                        <br />
                        <form class="form-horizontal" role="form" method="post" action="{{ route('resend_verify_email') }}">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="email" class="col-md-4 control-label">验证码</label>
                                <img id="captcha_img" src="/captcha/{{ \Carbon\Carbon::now()->getTimestamp() }}" onclick="refresh_captcha()" />
                                <div class="col-md-4">
                                    <input id="captcha" type="text" class="form-control" name="phrase" required autofocus>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        重新发送
                                    </button>
                                </div>
                            </div>


                        </form>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<script type="application/javascript">
    function refresh_captcha() {
        $('#captcha_img').attr('src', "/captcha/" + new Date().getTime());
    }
</script>
@endsection
