<?php

namespace App\Jobs;

use App\Models\Shop;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewShopWechatPush implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $shop;

    /**
     * Create a new job instance.
     *
     * @param Shop $shop
     */
    public function __construct(Shop $shop)
    {
        $this->shop = $shop;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        sc_send('主人！又有新店铺了！',
        "增加了一个新店铺： \n\n 名称: ". $this->shop->name
        . "\n\n 描述: " . $this->shop->desc
        . "\n\n 类别: " . $this->shop->category->name);
    }
}
