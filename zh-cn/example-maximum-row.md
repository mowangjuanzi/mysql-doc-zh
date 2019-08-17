### 3.6.2 包含某一行最大值的记录

*任务: 找出价格最贵的商品的编号, 经销商和价格.*

这很容易通过子查询完成:

```sql
SELECT article, dealer, price
FROM   shop
WHERE  price=(SELECT MAX(price) FROM shop);

+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|    0004 | D      | 19.95 |
+---------+--------+-------+
```

其他解决方案是使用 `LEFT JOIN` 或者按价格降序排序所有行, 并使用 MySQL 特定的 `LIMIT` 子句只获取第一条记录:

```sql
SELECT s1.article, s1.dealer, s1.price
FROM shop s1
LEFT JOIN shop s2 ON s1.price < s2.price
WHERE s2.article IS NULL;

SELECT article, dealer, price
FROM shop
ORDER BY price DESC
LIMIT 1;
```

> **[warning] 注意**
>
> 如果有几件最贵的商品, 它们的价格都是 19.95, `LIMIT` 子句只会显示它们当中的一条.

