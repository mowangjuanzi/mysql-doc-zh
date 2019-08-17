#### 3.3.4.3 选择指定列

如果你不想看到表中的所有行, 只需要用逗号分隔感兴趣的列. 例如, 如果你想知道你的动物是什么是时候出生的, 选择 `name` 和 `birth` 列:

```sql
mysql> SELECT name, birth FROM pet;
+----------+------------+
| name     | birth      |
+----------+------------+
| Fluffy   | 1993-02-04 |
| Claws    | 1994-03-17 |
| Buffy    | 1989-05-13 |
| Fang     | 1990-08-27 |
| Bowser   | 1989-08-31 |
| Chirpy   | 1998-09-11 |
| Whistler | 1997-12-09 |
| Slim     | 1996-04-29 |
| Puffball | 1999-03-30 |
+----------+------------+
```

要了解谁拥有宠物, 使用以下查询:

```sql
mysql> SELECT owner FROM pet;
+--------+
| owner  |
+--------+
| Harold |
| Gwen   |
| Harold |
| Benny  |
| Diane  |
| Gwen   |
| Gwen   |
| Benny  |
| Diane  |
+--------+
```

注意, 查询只是从每条记录中检索 `owner` 列, 其中某些记录不止出现一次. 要最小化输出, 只徐通过添加 `DISTINCT` 关键词一次检索处每个唯一的输出记录:

```sql
mysql> SELECT DISTINCT owner FROM pet;
+--------+
| owner  |
+--------+
| Benny  |
| Diane  |
| Gwen   |
| Harold |
+--------+
```

你可以使用 `WHERE` 子句组合记录选择和列选择. 例如, 仅仅获取猫狗的出生日期, 使用以下查询:

```sql
mysql> SELECT name, species, birth FROM pet
       WHERE species = 'dog' OR species = 'cat';
+--------+---------+------------+
| name   | species | birth      |
+--------+---------+------------+
| Fluffy | cat     | 1993-02-04 |
| Claws  | cat     | 1994-03-17 |
| Buffy  | dog     | 1989-05-13 |
| Fang   | dog     | 1990-08-27 |
| Bowser | dog     | 1989-08-31 |
+--------+---------+------------+
```