###3.6.9 使用 AUTO_INCREMENT

`AUTO_INCREMENT` 属性可用于为新记录生成唯一标识:

```sql
CREATE TABLE animals (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     name CHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

INSERT INTO animals (name) VALUES
    ('dog'),('cat'),('penguin'),
    ('lax'),('whale'),('ostrich');

SELECT * FROM animals;
```

返回结果为:

```sql
+----+---------+
| id | name    |
+----+---------+
|  1 | dog     |
|  2 | cat     |
|  3 | penguin |
|  4 | lax     |
|  5 | whale   |
|  6 | ostrich |
+----+---------+
```

`AUTO_INCREMENT` 列没有指定值, 所以 MySQL 会自动分配序列号. 你也可以显式的为列分配0来生成序列号, 除非启用了 [`NO_AUTO_VALUE_ON_ZERO`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_no_auto_value_on_zero) 模式. 例如:

```sql
INSERT INTO animals (id,name) VALUES(0,'groundhog');
```

如果列被声明为 `NOT NULL`, 也可以将 `NULL` 赋给列以生成序列号. 例如:

```sql
INSERT INTO animals (id,name) VALUES(NULL,'squirrel');
```

当你插入其它的值到 `AUTO_INCREMENT` 列, 列会被设置为该值, 序列会被重置, 以便下一个自动生成的值按照最大列值的顺序生成. 例如:

```sql
INSERT INTO animals (id,name) VALUES(100,'rabbit');
INSERT INTO animals (id,name) VALUES(NULL,'mouse');
SELECT * FROM animals;
+-----+-----------+
| id  | name      |
+-----+-----------+
|   1 | dog       |
|   2 | cat       |
|   3 | penguin   |
|   4 | lax       |
|   5 | whale     |
|   6 | ostrich   |
|   7 | groundhog |
|   8 | squirrel  |
| 100 | rabbit    |
| 101 | mouse     |
+-----+-----------+
```

更新已有的 `AUTO_INCREMENT` 列的值也会重置 `AUTO_INCREMENT` 序列.

你可以使用 [`LAST_INSERT_ID()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_last-insert-id) SQL 函数或者 [`mysql_insert_id()`](https://dev.mysql.com/doc/refman/8.0/en/mysql-insert-id.html) C API 函数检索最近自动生成的 `AUTO_INCREMENT` 值. 这些函数是基于连接的, 所以它们的返回值不受其他执行插入的连接的影响.

对 `AUTO_INCREMENT` 列使用最小的整数数据类型, 该列要足够大, 可以容纳所需的最大序列值. 当列达到数据类型的上限时, 尝试生成下一个序列号将会失败. 使用 `UNSIGNED` 属性允许更大的范围. 例如, 如果你使用 [`TINYINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html), 最大允许的序列号时 127. 对于 [`TINYINT UNSIGNED`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html), 最大值为 255. 参阅 [Section 11.2.1, “整数类型(精确值) - INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT”](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) 获取所有整数类型的范围.

> **[warning] 注意**
>
> 对于多行插入, [`LAST_INSERT_ID()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_last-insert-id) 和 [`mysql_insert_id()`](https://dev.mysql.com/doc/refman/8.0/en/mysql-insert-id.html) 实际上从插入的*第一行*返回 `AUTO_INCREMENT` 键. 这允许在复制设置中其他服务器上正确的复制多行插入.

`AUTO_INCREMENT` 从超过 1 的值开始, 使用 [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) 或者 [`ALTER TABLE`](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html) 设置值, 像这样:

```sql
mysql> ALTER TABLE tbl AUTO_INCREMENT = 100;
```

#### InnoDB Notes

有关在 InnoDB 中关于 `AUTO_INCREMENT` 特定用法, 参阅 [Section 15.6.1.4, “InnoDB 中的 AUTO_INCREMENT 处理”](https://dev.mysql.com/doc/refman/8.0/en/innodb-auto-increment-handling.html).

#### MyISAM Notes

- 对于 `MyISAM` 表, 你可以指定在多列索引的第二列上指定 `AUTO_INCREMENT`. 在本例中, `AUTO_INCREMENT` 列生成的值计算为 [`MAX(auto_increment_column) + 1 WHERE prefix=given-prefix`](https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_max). 对于你想将数据放入到有序组中时, 非常有用.

    ```sql
    CREATE TABLE animals (
        grp ENUM('fish','mammal','bird') NOT NULL,
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name CHAR(30) NOT NULL,
        PRIMARY KEY (grp,id)
    ) ENGINE=MyISAM;

    INSERT INTO animals (grp,name) VALUES
        ('mammal','dog'),('mammal','cat'),
        ('bird','penguin'),('fish','lax'),('mammal','whale'),
        ('bird','ostrich');

    SELECT * FROM animals ORDER BY grp,id;
    ```

    返回结果为:

    ```sql
    +--------+----+---------+
    | grp    | id | name    |
    +--------+----+---------+
    | fish   |  1 | lax     |
    | mammal |  1 | dog     |
    | mammal |  2 | cat     |
    | mammal |  3 | whale   |
    | bird   |  1 | penguin |
    | bird   |  2 | ostrich |
    +--------+----+---------+
    ```

    在本例中 (当 `AUTO_INCREMENT` 列是多列索引中的一部分时), 如果删除了任何组中 `AUTO_INCREMENT` 值最大的记录, 那么会重复使用 `AUTO_INCREMENT` 值. 即便是 `MyISAM` 表也会发生这种亲口光, `AUTO_INCREMENT` 值通常不会被重复使用.

- 如果 `AUTO_INCREMENT` 列是多列索引的一部分, MySQL 使用 `AUTO_INCREMENT` 列作为索引的开始(如果有的话)生成序列值. 例如, 如果 `animals` 表保存索引 `PRIMARY KEY (grp, id)` 和 `INDEX (id)`, MySQL 将会忽略用于生成序列值的 `PRIMARY KEY`. 因此, 该表将包含单个序列, 而不是每个 `grp` 值的序列.

#### 进一步阅读

有关 `AUTO_INCREMENT` 的更多信息请点击这里:

- 如何为列分配 `AUTO_INCREMENT` 属性: [Section 13.1.20, “CREATE TABLE 语法”](https://dev.mysql.com/doc/refman/8.0/en/create-table.html), 和 [Section 13.1.9, “ALTER TABLE 语法”](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html).

- `AUTO_INCREMENT` 的行为取决于 `NO_AUTO_VALUE_ON_ZERO` SQL 模式: [Section 5.1.11, “服务器 SQL 模式](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html).

- 如何使用 [`LAST_INSERT_ID()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_last-insert-id) 函数找出包含最新 `AUTO_INCREMENT` 值的记录: [Section 12.15, “信息函数”](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html).

- 设置要使用的 `AUTO_INCREMENT` 的值: [Section 5.1.8, “服务器系统变量”](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html).

- [Section 15.6.1.4, “InnoDB 中的 AUTO_INCREMENT 处理”](https://dev.mysql.com/doc/refman/8.0/en/innodb-auto-increment-handling.html)

- `AUTO_INCREMENT` 和复制: [Section 17.4.1.1, “复制和 AUTO_INCREMENT”](https://dev.mysql.com/doc/refman/8.0/en/replication-features-auto-increment.html).

- 与复制相关的服务器系统变量 `AUTO_INCREMENT` ([`auto_increment_increment`](https://dev.mysql.com/doc/refman/8.0/en/replication-options-master.html#sysvar_auto_increment_increment) 和 [`auto_increment_offset`](https://dev.mysql.com/doc/refman/8.0/en/replication-options-master.html#sysvar_auto_increment_offset)) : [`Section 5.1.8, “服务器系统变量”`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html).

