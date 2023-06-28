# 3.6.8 计算每日访问量

下面的示例展示了如何使用位组函数计算用户每月访问 Web 页面的天数。

```sql
CREATE TABLE t1 (year YEAR, month INT UNSIGNED,
             day INT UNSIGNED);
INSERT INTO t1 VALUES(2000,1,1),(2000,1,20),(2000,1,30),(2000,2,2),
            (2000,2,23),(2000,2,23);
```

示例表包含了用户访问页面的年月日值，要确定每个月都有那些天发生了访问，使用以下查询：

```sql
SELECT year,month,BIT_COUNT(BIT_OR(1<<day)) AS days FROM t1
       GROUP BY year,month;
```

返回结果为：

```sql
+------+-------+------+
| year | month | days |
+------+-------+------+
| 2000 |     1 |    3 |
| 2000 |     2 |    2 |
+------+-------+------+
```

查询计算每个年月组合在表中出现的天数，并自动删除重复条目。