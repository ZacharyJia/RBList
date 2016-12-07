<html>
<body>
<p>亲爱的{{ $username }}:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;欢迎注册交大红黑榜，请点击以下链接激活您的账户。</p>
<p><a href="{{ route("verify", ['token' => urlencode($token), 'email' => urlencode($email)]) }}">激活账户</a></p>

<p>或者将一下地址复制到浏览器中打开：{{ route("verify", ['token' => urlencode($token), 'email' => urlencode($email)]) }}</p>
</body>
</html>