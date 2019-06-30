## 3.4 获取数据库和表的信息

如果你忘记了数据库或者表的名字, 或者忘记了表的结构是什么 (例如, 它的列是什么)? MySQL 通过提供关于它支持的数据库和表信息的几个语句来解决这个问题.

你之前看过了 [`SHOW DATABASES`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html), 它列出了服务器上管理的数据库. 要找出当前选择的数据库, 使用 [`DATABASE()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database) 函数:

```sql
mysql> SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| menagerie  |
+------------+
```

如果你还没有选择任何数据库, 结果为 `NULL`.

要找出默认数据库包含那些表(例如, 当你不确定表的名字时), 使用以下语句:

```sql
mysql> SHOW TABLES;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| event               |
| pet                 |
+---------------------+
```

该语句生成的列的名称总是 `Tables_in_db_name`, 其中 *`db_name`* 是数据库的名称. 参阅 [Section 13.7.6.37, “SHOW TABLES 语法”](https://dev.mysql.com/doc/refman/8.0/en/show-tables.html)获取更多信息.

如果你想了解表的结构, [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html) 语句非常有用; 它显示表中每个列的信息:

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

`Field` 表示列名, `Type` 是列的数据类型, `NULL` 表示列是否可以包含 `NULL` 值, `Key` 表示列是否被索引, `Default` 指定列的默认值. `Extra` 显示关于列的特殊信息: 如果创建的列使用了 `AUTO_INCREMENT` 选项, 那么值将会 `auto_increment` 而不是空的.

`DESC` 是 [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html) 的缩写. 参阅 [Section 13.8.1, “DESCRIBE 语法”](https://dev.mysql.com/doc/refman/8.0/en/describe.html)获取更多信息.

你可以使用 [`SHOW CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html) 语句获得创建现有表的 [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) 语句. 参阅 [Section 13.7.6.10, “SHOW CREATE TABLE 语法](https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html).

如果表中有索引, `SHOW INDEX FROM tbl_name` 生成关于它们的信息. 参阅 [Section 13.7.6.22, “SHOW INDEX 语法”](https://dev.mysql.com/doc/refman/8.0/en/show-index.html)获取更多信息.