#### 3.3.4.8 计算行数

数据库通常用于回答以下问题, “某一类型的数据在表中出现的频率是多少?” 例如, 你可能想知道你有多少宠物或者每个主人有多少宠物或者你可能对动物进行各种各样的普查.

计算你拥有的动物总数与“ pet 表中有多少条纪录?” 是同样的问题, 因为每只宠物只有一条纪录. [COUNT(*)](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count) 计算行数, 因此你的动物数量的查询如下:

```sql
mysql> SELECT COUNT(*) FROM pet;
+----------+
| COUNT(*) |
+----------+
|        9 |
+----------+
```

之前, 你检索了拥有宠物的人的名字. 如果你想找出每个主人拥有多少宠物, 你可以使用 [`COUNT()`](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count):

```sql
mysql> SELECT owner, COUNT(*) FROM pet GROUP BY owner;
+--------+----------+
| owner  | COUNT(*) |
+--------+----------+
| Benny  |        2 |
| Diane  |        2 |
| Gwen   |        3 |
| Harold |        2 |
+--------+----------+
```

前面的查询使用 `GROUP BY` 对每个 `owner` 的所有纪录进行分组. [`COUNT()`](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count) 和 `GROUP BY` 结合使用, 对描述不同分组下的数据非常有用. 下面的例子展示了执行动物普查的不同方法.

每种动物的数量:

```sql
mysql> SELECT species, COUNT(*) FROM pet GROUP BY species;
+---------+----------+
| species | COUNT(*) |
+---------+----------+
| bird    |        2 |
| cat     |        2 |
| dog     |        3 |
| hamster |        1 |
| snake   |        1 |
+---------+----------+
```

每个性别的动物数量:

```sql
mysql> SELECT sex, COUNT(*) FROM pet GROUP BY sex;
+------+----------+
| sex  | COUNT(*) |
+------+----------+
| NULL |        1 |
| f    |        4 |
| m    |        4 |
+------+----------+
```

(在这个输出中, `NULL` 表示性别未知.)

按照动物的种类和性别组合计算数量:

```sql
mysql> SELECT species, sex, COUNT(*) FROM pet GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| bird    | NULL |        1 |
| bird    | f    |        1 |
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
| hamster | f    |        1 |
| snake   | m    |        1 |
+---------+------+----------+
```

你不需要使用[`COUNT()`](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count) 时检索整个表. 例如, 在上一个查询, 仅对猫和狗进行查询, 如下所示:

```sql
mysql> SELECT species, sex, COUNT(*) FROM pet
       WHERE species = 'dog' OR species = 'cat'
       GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
+---------+------+----------+
```

或者如果你想知道已知性别的动物每个性别的数量:

```sql
mysql> SELECT species, sex, COUNT(*) FROM pet
       WHERE sex IS NOT NULL
       GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| bird    | f    |        1 |
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
| hamster | f    |        1 |
| snake   | m    |        1 |
+---------+------+----------+
```

如果除了 [`COUNT()`](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count) 值之外查询其他列, `GROUP BY` 子句应该用来命名为相同的列. 否则,会发生以下情况:

如果 [`ONLY_FULL_GROUP_BY`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_only_full_group_by) SQL 模式启用了, 则会出现以下错误:

```sql
mysql> SET sql_mode = 'ONLY_FULL_GROUP_BY';
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT owner, COUNT(*) FROM pet;
ERROR 1140 (42000): In aggregated query without GROUP BY, expression
#1 of SELECT list contains nonaggregated column 'menagerie.pet.owner';
this is incompatible with sql_mode=only_full_group_by
```

如果 [`ONLY_FULL_GROUP_BY`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_only_full_group_by) 未启用, 查询会将所有的纪录当做单个组来处理t, 但是为每个指定的列选择的值是不确定的. 服务器可以从任意行中自由选择值:

```sql
mysql> SET sql_mode = '';
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT owner, COUNT(*) FROM pet;
+--------+----------+
| owner  | COUNT(*) |
+--------+----------+
| Harold |        8 |
+--------+----------+
1 row in set (0.00 sec)
```

参阅 [Section 12.20.3, “MySQL GROUP BY 处理”](https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html). 参阅 [Section 12.20.1, 聚合 (GROUP BY) 函数描述”](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html) 获取有关 [`COUNT(expr)`](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count) 行为和相关优化的信息.