# shop_create

## description

添加新店铺，需验证登录状态

## URL

```
/api/shop/create
```

## method

POST

## params

| 名称      | 示例        | 必填   | 说明                 |
| ------- | --------- | ---- | ------------------ |
| name |   新店铺   | 是    | 新店铺的名称 |
| desc | 新店铺的描述 | 是    | 新店铺的描述              |
| category    | axd3d         | 是    |   类型id，经过hash加密   |

## response

```json
{
  "code": "200",
  "msg": "ok"
}
```