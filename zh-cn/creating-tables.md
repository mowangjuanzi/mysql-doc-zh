### 3.3.2 创建表

创建数据库是比较容易的部分, 但是现在它是空的, 正如 [`SHOW TABLES`](https://dev.mysql.com/doc/refman/8.0/en/show-tables.html) 告诉你的:

```sql
mysql> SHOW TABLES;
Empty set (0.00 sec)
```

困难的部分是决定数据库的结构应该是什么: 需要那些表以及每个表应该包含那些列.

你需要一个包含你的每个宠物信息的表. 可以成为 `pet` 表, 它至少应该包含每个动物的名称. 因为名字本身并不是很有趣, 表中应该包含其它信息. 例如, 如果你家里不止一个人养宠物, 你可能想列出每只动物的主人. 你可能也想记录一些基本的描述信息, 比如物种和性别.

年龄呢? 这可能很有趣, 但是将其存储在数据库中并不是一件好事. 年龄随着时间的推移而变化, 这意味着你必须经常更新你的记录. 相反, 最好存储一个固定的值比如出生日期. 然后, 当你需要年龄的时候, 你可以把它计算成当前日期和出生日期之间的差值. MySQL 提供了执行日期计算的函数, 所有这并不困难. 保存出生日期而不是年龄还有其它好处:

- 你可以使用该数据库执行任务, 比如为即将到来的宠物生日生成提醒. (If you think this type of query is somewhat silly, note that it is the same question you might ask in the context of a business database to identify clients to whom you need to send out birthday greetings in the current week or month, for that computer-assisted personal touch.)

- 你可以计算年龄与日期的关系, 而不是与当前日期的关系. 例如, 如果你将死亡日期存储到数据库中, 你可以轻松的计算出宠物死亡时的年龄.

你可能会想到在 `pet` 表中有用的其它类型的信息, 但是到目前为止所识别的信息已经足够了: 名称(name), 所有者(owner), 物种(species), 性别(sex), 出生(birth), 和死亡(death).

使用 [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) 语句指定表格的布局:

```sql
mysql> CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
       species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
```

[`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) 对于 `name`, `owner`, 和 `species` 列, 是一个很好的选择, 因为列值的长度各不相同. 这些列定义的长度不一定都相同, 也不一定是 **20**. 你通常可以选择 **1** 到 **65535** 之间的任意长度, 只要你觉得最合理. 如果你做了一个糟糕的选择, 后来发现你需要一个更长的字段, MySQL 提供了一个 [`ALTER TABLE`](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html) 语句.

可以选择几种类型的值来表示动物记录中的性别, 比如 `'m'` 和 `'f'`, 或者 `'male'` and `'female'`. 使用单个字符 `'m'` 和 `'f'` 是最简单的.

对于 birth 和 death 列使用 [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) 数据类型是一个非常显而易见的选择.

一旦你创建了表, [`SHOW TABLES`](https://dev.mysql.com/doc/refman/8.0/en/show-tables.html) 应该会产生一些输出:

```sql
mysql> SHOW TABLES;
+---------------------+
| Tables in menagerie |
+---------------------+
| pet                 |
+---------------------+
```

要验证你的表是按照你期望的方式创建的, 使用 [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html) 语句:

```sql
mysql> DESCRIBE pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
```

你可以随时使用 [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html), 例如, 如果忘记了表中列的名称或者它们的类型.

有关 MySQL 数据类型的更多信息, 参阅 [Chapter 11, ***数据类型***](https://dev.mysql.com/doc/refman/8.0/en/data-types.html).