#### 3.3.4.5 日期计算

MySQL 提供了几个函数可以用来完成日期计算, 例如, 计算年龄或者提取部分日期.

要确定每个宠物的年龄, 可以使用 [`TIMESTAMPDIFF()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_timestampdiff) 函数. 它的参数是你想要表达结果的单位, 以及取差的两个日期. 下面的查询显示了每只宠物的出生日期, 当前日期和年龄. ***`alias`*** (`age`) 用于让最终的输出列名更有意义.

```sql
mysql> SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet;
+----------+------------+------------+------+
| name     | birth      | CURDATE()  | age  |
+----------+------------+------------+------+
| Fluffy   | 1993-02-04 | 2003-08-19 |   10 |
| Claws    | 1994-03-17 | 2003-08-19 |    9 |
| Buffy    | 1989-05-13 | 2003-08-19 |   14 |
| Fang     | 1990-08-27 | 2003-08-19 |   12 |
| Bowser   | 1989-08-31 | 2003-08-19 |   13 |
| Chirpy   | 1998-09-11 | 2003-08-19 |    4 |
| Whistler | 1997-12-09 | 2003-08-19 |    5 |
| Slim     | 1996-04-29 | 2003-08-19 |    7 |
| Puffball | 1999-03-30 | 2003-08-19 |    4 |
+----------+------------+------------+------+
```

查询可以正常工作, 但是如果按照某种顺序显示行, 则可以更容易的扫描结果. 可以通过添加 `ORDER BY name` 子句按照名称排序来输出:

```sql
mysql> SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet ORDER BY name;
+----------+------------+------------+------+
| name     | birth      | CURDATE()  | age  |
+----------+------------+------------+------+
| Bowser   | 1989-08-31 | 2003-08-19 |   13 |
| Buffy    | 1989-05-13 | 2003-08-19 |   14 |
| Chirpy   | 1998-09-11 | 2003-08-19 |    4 |
| Claws    | 1994-03-17 | 2003-08-19 |    9 |
| Fang     | 1990-08-27 | 2003-08-19 |   12 |
| Fluffy   | 1993-02-04 | 2003-08-19 |   10 |
| Puffball | 1999-03-30 | 2003-08-19 |    4 |
| Slim     | 1996-04-29 | 2003-08-19 |    7 |
| Whistler | 1997-12-09 | 2003-08-19 |    5 |
+----------+------------+------------+------+
```

按照 `age` 而不是 `name` 进行排序输出, 只需要使用不同的 `ORDER BY` 子句:

```sql
mysql> SELECT name, birth, CURDATE(),
       TIMESTAMPDIFF(YEAR,birth,CURDATE()) AS age
       FROM pet ORDER BY age;
+----------+------------+------------+------+
| name     | birth      | CURDATE()  | age  |
+----------+------------+------------+------+
| Chirpy   | 1998-09-11 | 2003-08-19 |    4 |
| Puffball | 1999-03-30 | 2003-08-19 |    4 |
| Whistler | 1997-12-09 | 2003-08-19 |    5 |
| Slim     | 1996-04-29 | 2003-08-19 |    7 |
| Claws    | 1994-03-17 | 2003-08-19 |    9 |
| Fluffy   | 1993-02-04 | 2003-08-19 |   10 |
| Fang     | 1990-08-27 | 2003-08-19 |   12 |
| Bowser   | 1989-08-31 | 2003-08-19 |   13 |
| Buffy    | 1989-05-13 | 2003-08-19 |   14 |
+----------+------------+------------+------+
```

相似的查询可以用来确定已死亡动物的死亡年龄. 你可以通过那些 `death` 的值为 `NULL` 来确定动物是那些. 然后, 对那些非 `NULL` 值, 计算出 `death` 和 `birth` 的差值:

```sql
mysql> SELECT name, birth, death,
       TIMESTAMPDIFF(YEAR,birth,death) AS age
       FROM pet WHERE death IS NOT NULL ORDER BY age;
+--------+------------+------------+------+
| name   | birth      | death      | age  |
+--------+------------+------------+------+
| Bowser | 1989-08-31 | 1995-07-29 |    5 |
+--------+------------+------------+------+
```

查询使用 `death IS NOT NULL` 而不是 `death <> NULL` 是因为 `NULL` 是一个特殊值, 不能使用常规的比较操作符来操作. 稍后将进行讨论. 参阅 [Section 3.3.4.6, “处理 NULL 值”](https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html).

如果你想知道下个月那些动物过生日呢? 对于这类运算, 年月日无关紧要; 你只需取出 `birth` 列的月份部分. MySQL 提供了几个提取日期部分的函数, 比如 [`YEAR()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_year), [`MONTH()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_month), 和 [`DAYOFMONTH()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_dayofmonth). [`MONTH()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_month) 函数适合这里. 要查看它是如何工作的, 运行一个显示出 `birth` 和 [`MONTH(birth)`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_month) 的简单查询:

```sql
mysql> SELECT name, birth, MONTH(birth) FROM pet;
+----------+------------+--------------+
| name     | birth      | MONTH(birth) |
+----------+------------+--------------+
| Fluffy   | 1993-02-04 |            2 |
| Claws    | 1994-03-17 |            3 |
| Buffy    | 1989-05-13 |            5 |
| Fang     | 1990-08-27 |            8 |
| Bowser   | 1989-08-31 |            8 |
| Chirpy   | 1998-09-11 |            9 |
| Whistler | 1997-12-09 |           12 |
| Slim     | 1996-04-29 |            4 |
| Puffball | 1999-03-30 |            3 |
+----------+------------+--------------+
```

找出下个月有生日的动物非常简单. 假设当前月份是四月. 然后这个月份的值就是 `4`, 你可以这样查找 `5` 月份出生的动物:

```sql
mysql> SELECT name, birth FROM pet WHERE MONTH(birth) = 5;
+-------+------------+
| name  | birth      |
+-------+------------+
| Buffy | 1989-05-13 |
+-------+------------+
```

如果当前月份是 12 月, 就会出现一个小问题. 你不能仅仅在 (`12`) 上面加 1, 然后寻找第 `13` 个月出生的动物, 因为没有这个月份. 相反, 你要寻找 `1` 月的动物.

你可以写个查询无论在哪个月份都可以正常工作, 这样你就不必为特定的月份使用数字. [`DATE_ADD()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-add) 允许向指定日期添加间隔. 如果添加一个月到 [`CURDATE()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_curdate) 的值中, 然后使用 [`MONTH()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_month) 提取月份部分, 然后产生了寻找生日的月份:

```sql
mysql> SELECT name, birth FROM pet
       WHERE MONTH(birth) = MONTH(DATE_ADD(CURDATE(),INTERVAL 1 MONTH));
```

另一种完成任务的方法是使用 `MOD` 方法对其取模, 如果当前月份是 `12`, 那么取值为 `0`, 加 `1` 来获得当前月份的下一个月的值:

```sql
mysql> SELECT name, birth FROM pet
       WHERE MONTH(birth) = MOD(MONTH(CURDATE()), 12) + 1;
```

[`MONTH()`](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_month) 返回 `1` 到 `12` 之间的数字. [`MOD(something,12)`](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_mod) 返回 `0` 和 `11` 之间的数字. 因此, 必须在 [`MOD()`](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_mod) 之后添加, 否则将从 `11` 月份直接到 `1` 月份.

如果使用无效日期, 则会计算失败并产生警告:

```sql
mysql> SELECT '2018-10-31' + INTERVAL 1 DAY;
+-------------------------------+
| '2018-10-31' + INTERVAL 1 DAY |
+-------------------------------+
| 2018-11-01                    |
+-------------------------------+
mysql> SELECT '2018-10-32' + INTERVAL 1 DAY;
+-------------------------------+
| '2018-10-32' + INTERVAL 1 DAY |
+-------------------------------+
| NULL                          |
+-------------------------------+
mysql> SHOW WARNINGS;
+---------+------+----------------------------------------+
| Level   | Code | Message                                |
+---------+------+----------------------------------------+
| Warning | 1292 | Incorrect datetime value: '2018-10-32' |
+---------+------+----------------------------------------+
```