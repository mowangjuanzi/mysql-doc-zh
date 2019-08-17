### 3.6.4 拥有某个字段的组间最大值的行

*任务: 对每个物品, 找出最贵价格物品的经销商.*

这个问题可以通过这样的子查询来解决:

```sql
SELECT article, dealer, price
FROM   shop s1
WHERE  price=(SELECT MAX(s2.price)
              FROM shop s2
              WHERE s1.article = s2.article)
ORDER BY article;

+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|    0001 | B      |  3.99 |
|    0002 | A      | 10.99 |
|    0003 | C      |  1.69 |
|    0004 | D      | 19.95 |
+---------+--------+-------+
```

前面的例子使用了关联子查询, 这可能是低效的(参阅 [Section 13.2.11.7, “关联子查询”](https://dev.mysql.com/doc/refman/8.0/en/correlated-subqueries.html)). 解决此问题的其它可能性是在 `FROM` 子句中使用不相关的子查询, `LEFT JOIN`, 或者带有窗口函数的公共表表达式.

非关联子查询:

```sql
SELECT s1.article, dealer, s1.price
FROM shop s1
JOIN (
  SELECT article, MAX(price) AS price
  FROM shop
  GROUP BY article) AS s2
  ON s1.article = s2.article AND s1.price = s2.price
ORDER BY article;
```

`LEFT JOIN`:

```sql
SELECT s1.article, s1.dealer, s1.price
FROM shop s1
LEFT JOIN shop s2 ON s1.article = s2.article AND s1.price < s2.price
WHERE s2.article IS NULL
ORDER BY s1.article;
```

`LEFT JOIN` 的基本工作原理是当 `s1.price` 处于最高值时, 并没有 `s2.price` 对应 `s2.article` 的值为 `NULL`. 参阅 [Section 13.2.10.2, “JOIN 语法”](https://dev.mysql.com/doc/refman/8.0/en/join.html).


使用窗口函数的公共表表达式:

```sql
WITH s1 AS (
   SELECT article, dealer, price,
          RANK() OVER (PARTITION BY article
                           ORDER BY price DESC
                      ) AS `Rank`
     FROM shop
)
SELECT article, dealer, price
  FROM s1
  WHERE `Rank` = 1
ORDER BY article;
```