<?php
/**
 * Created By zachary
 * Time: 2017/1/22 下午2:38
 */

function hashid_encode($id) {
    if (empty($id)) {
        return null;
    } else {
        return Hashids::encode($id);
    }
}

function hashid_decode($str) {
    if (empty($str)) {
        return null;
    } else {
        $ids = Hashids::decode($str);
        if (!empty($ids)) {
            return $ids[0];
        } else {
            return null;
        }
    }
}

function sc_send(  $text , $desp = '' , $key = '')
{
    if ($key == '') {
        $key = env('SC_KEY');
    }
    $postdata = http_build_query(
        array(
            'text' => $text,
            'desp' => $desp
        )
    );

    $opts = array('http' =>
        array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => $postdata
        )
    );
    $context  = stream_context_create($opts);
    return $result = file_get_contents('http://sc.ftqq.com/'.$key.'.send', false, $context);

}