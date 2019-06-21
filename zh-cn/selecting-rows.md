#### 3.3.4.2 选择特定的行

如上一节所示, 检索整个表很容易. 只需要从 [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 语句中省略 `WHERE` 子句. 但通常当它变大时, 不希望看到整个表. 相反, 你通常更感兴趣的是回答特定的问题, 在这种情况下, 你需要对你想要的信息指定一些约束. 让我们看看一些选择查询, 它们会回答关于你的宠物的问题.

你只能从表中选择特定的行. 例如, 如果你想验证对 Bowser 的出生日期所做的更改, 选择 Bowser 记录, 如下所示:

```sql
mysql> SELECT * FROM pet WHERE name = 'Bowser';
+--------+-------+---------+------+------------+------------+
| name   | owner | species | sex  | birth      | death      |
+--------+-------+---------+------+------------+------------+
| Bowser | Diane | dog     | m    | 1989-08-31 | 1995-07-29 |
+--------+-------+---------+------+------------+------------+
```

输出确认了年份被正确的记录为 1989, 而不是 1979.

字符串通常不区分大小写, 因此你可以将名称指定为 `'bowser'`, `'BOWSER'` 等等. 查询结果是相同的.

你可以在任何列上指定条件, 而不仅仅是 `name`. 例如, 如果你想知道那些动物是在 1998 年之后出生的, 测试 `birth` 列:

```sql
mysql> SELECT * FROM pet WHERE birth >= '1998-1-1';
+----------+-------+---------+------+------------+-------+
| name     | owner | species | sex  | birth      | death |
+----------+-------+---------+------+------------+-------+
| Chirpy   | Gwen  | bird    | f    | 1998-09-11 | NULL  |
| Puffball | Diane | hamster | f    | 1999-03-30 | NULL  |
+----------+-------+---------+------+------------+-------+
```

你可以组合条件, 例如, 寻找母狗:

```sql
mysql> SELECT * FROM pet WHERE species = 'dog' AND sex = 'f';
+-------+--------+---------+------+------------+-------+
| name  | owner  | species | sex  | birth      | death |
+-------+--------+---------+------+------------+-------+
| Buffy | Harold | dog     | f    | 1989-05-13 | NULL  |
+-------+--------+---------+------+------------+-------+
```

前面的查询使用 [`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and) 逻辑运算符. 还有 [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or) 操作符:

```sql
mysql> SELECT * FROM pet WHERE species = 'snake' OR species = 'bird';
+----------+-------+---------+------+------------+-------+
| name     | owner | species | sex  | birth      | death |
+----------+-------+---------+------+------------+-------+
| Chirpy   | Gwen  | bird    | f    | 1998-09-11 | NULL  |
| Whistler | Gwen  | bird    | NULL | 1997-12-09 | NULL  |
| Slim     | Benny | snake   | m    | 1996-04-29 | NULL  |
+----------+-------+---------+------+------------+-------+
```

[`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and) 和 [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or) 可以混合使用, 尽管 [`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and) 的优先级高于 [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or). 如果同时使用这两个运算符, 最好使用括号来明确表示条件应该如何分组:

```sql
mysql> SELECT * FROM pet WHERE (species = 'cat' AND sex = 'm')
       OR (species = 'dog' AND sex = 'f');
+-------+--------+---------+------+------------+-------+
| name  | owner  | species | sex  | birth      | death |
+-------+--------+---------+------+------------+-------+
| Claws | Gwen   | cat     | m    | 1994-03-17 | NULL  |
| Buffy | Harold | dog     | f    | 1989-05-13 | NULL  |
+-------+--------+---------+------+------------+-------+
```