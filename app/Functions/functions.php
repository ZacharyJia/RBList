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