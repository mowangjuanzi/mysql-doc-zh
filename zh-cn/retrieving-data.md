### 3.3.4 从表中检索数据

[`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 语句用于从表中提取信息. 语句的一般构成如下:

```sql
SELECT what_to_select
FROM which_table
WHERE conditions_to_satisfy;
```

*`what_to_select`* 表示要查看的内容. 这是列的列表, `*` 表示 “所有列”. *`which_table`* 表示要从中检索数据的表. `WHERE` 子句是可选的. 如果存在, *`conditions_to_satisfy`* 指定一个或者多个条件, 检索的数据必须满足限制.