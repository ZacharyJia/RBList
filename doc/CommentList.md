# CommentList

## description

根据给出的店铺ID，获取评论列表

## URL

```
/api/commentlist
```

## method

POST

## params

| 名称       | 示例    | 必填   | 说明                        |
| -------- | ----- | ---- | ------------------------- |
| shop_id  | ha3sd | 是    | 要查询店铺ID                   |
| curPage  | 1     | 否    | 当前页数，从1开始，默认为1            |
| pageSize | 20    | 否    | 每页数量，最大50，默认20            |
| type     | 0     | 否    | 评论类型，0为全部，1为好评，2为差评，默认为全部 |

## response

```json
{
  "code": "200",
  "msg": "ok",
  "data": {
    "count": "162",
    "total_page": "9",
    "curPage": "1",
    "pageSize": "20",
    "comment_list": [
      {
        "id": "ad3x4", 
        "creator_id": "adeu8", 
        "creator": "诶嘿嘿", 
        "content": "这家店真TM黑", 
        "type": "good"
      },
      {
        "id": "ad3x4", 
        "creator_id": "adeu8", 
        "creator": "诶嘿嘿", 
        "content": "这家店真TM黑", 
        "type": "good"
      },
      ...
    ]
  }
}
```

