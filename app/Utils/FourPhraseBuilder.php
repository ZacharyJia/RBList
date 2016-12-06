<?php
/**
 * User: jiazequn
 * Date: 2016/12/6
 * Time: 下午5:19
 */

namespace app\Utils;


use Gregwar\Captcha\PhraseBuilder;

class FourPhraseBuilder extends PhraseBuilder
{
    public function build($length = 4, $charset = 'abcdefghijklmnpqrstuvwxyz123456789')
    {
        return parent::build($length, $charset);
    }
}