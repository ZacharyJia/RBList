# comment

## description

发表评论，需验证登录状态

## URL

```
/api/comment
```

## method

POST

## params

| 名称      | 示例        | 必填   | 说明                 |
| ------- | --------- | ---- | ------------------ |
| shop_id | axd3d     | 是    | 要评论的店铺的ID（经过哈希加密过） |
| content | 这家店真TM黑啊！ | 是    | 评论内容               |
| type    | 2         | 是    | 评价类型，1为好评，2为差评     |

## response

```json
{
  "code": "200",
  "msg": "ok"
}
```

