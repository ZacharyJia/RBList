# shoplist

## description

根据给出的条件，获取店铺列表

## URL

```
/api/shoplist
```

## method

POST

## params

| 名称       | 示例       | 必填   | 说明                                       |
| :------- | :------- | :--- | ---------------------------------------- |
| curPage  | 1        | 否    | 当前要获取的页数，从1开始， 默认为1                      |
| pageSize | 20       | 否    | 每页获取的数量，最大不超过50， 默认为20                   |
| type     | 0        | 否    | 0:全部店铺，1：红榜店铺，2：黑榜店铺， 默认为0               |
| orderBy  | evaluate | 否    | 排序字段，time：按发布时间排序，evaluate：按好评或差评数量排序，若type为0则按照好评减去差评数量排序， 默认为evaluate |
| order    | asc      | 否    | 排序，asc为升序，desc为降序，默认为降序                  |
| category | haxze1   | 否    | 类别id，若为0则表示全部类别，默认为0                     |



## response

```json
{
  "code": "200",
  "msg": "OK",
  "data": {
    "shop_list": [
      {"id": "ajH32", "name": "印刷厂打印店", "good": "20", "bad": "10"},
      {"id": "as332", "name": "嘉园楼底打印店", "good": "20", "bad": "10"},
      {"id": " jklsf", "name": "东区打印店", "good": "20", "bad": "10"}
    ]
  }
}
```

