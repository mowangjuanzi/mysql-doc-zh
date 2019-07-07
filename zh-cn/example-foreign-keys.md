### 3.6.6 使用外键

在 MySQL 中, `InnoDB` 表支持检查外键约束. 参阅 [Chapter 15, InnoDB 存储引擎](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html), 和 [Section 1.8.2.3, “外键差异”](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html).

外键约束不仅仅用于连接两个表. 除了 `InnoDB` 存储引擎, 在定义列时使用 `REFERENCES tbl_name(col_name)` 子句, 该句没有实际的效果, *只是作为一个备忘录或者注释告诉你当前定义的列是指的另外一张表的列*. 使用这种语法时, 认识到这一点非常重要:

- MySQL 不执行任何检查来确保 *col_name* 确实存在于 *tbl_name* (甚至 *tbl_name* 本身是否存在).

- MySQL 不会对 *tbl_name* 执行任何类型的操作, 例如删除行以响应对你定义的表中的行的响应; 换句话讲, 这个语法不会对 `ON DELETE or ON UPDATE` 行为产生任何影响. (虽然你可以将 `ON DELETE` 或者 `ON UPDATE` 子句作为 `REFERENCES` 子句的一部分, 但它被忽略.)

- 该语法创建一个*列*; 它***不***会创建任何索引或者键.

你可以创建列作为连接列, 如下所示:

```sql
CREATE TABLE person (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name CHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE shirt (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    style ENUM('t-shirt', 'polo', 'dress') NOT NULL,
    color ENUM('red', 'blue', 'orange', 'white', 'black') NOT NULL,
    owner SMALLINT UNSIGNED NOT NULL REFERENCES person(id),
    PRIMARY KEY (id)
);

INSERT INTO person VALUES (NULL, 'Antonio Paz');

SELECT @last := LAST_INSERT_ID();

INSERT INTO shirt VALUES
(NULL, 'polo', 'blue', @last),
(NULL, 'dress', 'white', @last),
(NULL, 't-shirt', 'blue', @last);

INSERT INTO person VALUES (NULL, 'Lilliana Angelovska');

SELECT @last := LAST_INSERT_ID();

INSERT INTO shirt VALUES
(NULL, 'dress', 'orange', @last),
(NULL, 'polo', 'red', @last),
(NULL, 'dress', 'blue', @last),
(NULL, 't-shirt', 'white', @last);

SELECT * FROM person;
+----+---------------------+
| id | name                |
+----+---------------------+
|  1 | Antonio Paz         |
|  2 | Lilliana Angelovska |
+----+---------------------+

SELECT * FROM shirt;
+----+---------+--------+-------+
| id | style   | color  | owner |
+----+---------+--------+-------+
|  1 | polo    | blue   |     1 |
|  2 | dress   | white  |     1 |
|  3 | t-shirt | blue   |     1 |
|  4 | dress   | orange |     2 |
|  5 | polo    | red    |     2 |
|  6 | dress   | blue   |     2 |
|  7 | t-shirt | white  |     2 |
+----+---------+--------+-------+


SELECT s.* FROM person p INNER JOIN shirt s
   ON s.owner = p.id
 WHERE p.name LIKE 'Lilliana%'
   AND s.color <> 'white';

+----+-------+--------+-------+
| id | style | color  | owner |
+----+-------+--------+-------+
|  4 | dress | orange |     2 |
|  5 | polo  | red    |     2 |
|  6 | dress | blue   |     2 |
+----+-------+--------+-------+
```

当以这种方式使用时, `REFERENCES` 子句不会显示在 [SHOW CREATE TABLE](https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html) or [DESCRIBE](https://dev.mysql.com/doc/refman/8.0/en/describe.html) 的输出中:

```sql
SHOW CREATE TABLE shirt\G
*************************** 1. row ***************************
Table: shirt
Create Table: CREATE TABLE `shirt` (
`id` smallint(5) unsigned NOT NULL auto_increment,
`style` enum('t-shirt','polo','dress') NOT NULL,
`color` enum('red','blue','orange','white','black') NOT NULL,
`owner` smallint(5) unsigned NOT NULL,
PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4
```

按这种方式使用 `REFERENCES` 作为注释或者 “提示” 创建列适用于 `MyISAM` 表.

