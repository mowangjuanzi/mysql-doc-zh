### 3.6.5 使用用户自定义变量

你可以使用 MySQL 用户变量记住结果, 而不用在客户端中使用临时变量存储它们. (参阅 [Section 9.4, “用户自定义变量”](https://dev.mysql.com/doc/refman/8.0/en/user-variables.html).)

例如, 要找出价格最高和最低的商品, 你可以这样做:

```sql
mysql> SELECT @min_price:=MIN(price),@max_price:=MAX(price) FROM shop;
mysql> SELECT * FROM shop WHERE price=@min_price OR price=@max_price;
+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|    0003 | D      |  1.25 |
|    0004 | D      | 19.95 |
+---------+--------+-------+
```

> **Note**
>
> 还可以将数据库对象(例如表和列)的名称存储在用户变量中, 然后在 SQL 语句中使用该变量; 然而, 这需要使用预置语句. 参阅 [Section 13.5, “预置 SQL 语句语法”](https://dev.mysql.com/doc/refman/8.0/en/sql-syntax-prepared-statements.html)获取更多信息.