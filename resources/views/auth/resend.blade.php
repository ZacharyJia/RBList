@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">重新发送</div>
                <div class="panel-body">
                    @if(!$is_verified)
                        <br />
                        <form class="form-horizontal" role="form" method="post" action="{{ route('resend_verify_email') }}">
                            {{ csrf_field() }}

                            <div class="form-group">

                                <label for="captcha" class="col-md-4 control-label">验证码</label>
                                <img id="captcha_img" src="/captcha/{{ \Carbon\Carbon::now()->getTimestamp() }}" onclick="refresh_captcha()" />
                                <div class="col-md-4">
                                    <input id="captcha" type="text" class="form-control" name="phrase" required autofocus>
                                    @if ($errors->has('captcha'))
                                        <span class="help-block">
                                            <strong class="text-danger">{{ $errors->first('captcha') }}</strong>
                                        </span>
                                    @endif

                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button id="btn-resend" class="btn btn-primary">
                                        重新发送
                                    </button>
                                </div>
                            </div>

                        </form>
                    @else
                        您的账户已经激活，无需重新验证。
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<script type="application/javascript">
    function refresh_captcha() {
        $("#captcha_img").attr("src", "/captcha/" + new Date().getTime());
    }
</script>
@endsection
