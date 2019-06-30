## 3.4 Getting Information About Databases and Tables

What if you forget the name of a database or table, or what the structure of a given table is (for example, what its columns are called)? MySQL addresses this problem through several statements that provide information about the databases and tables it supports.

You have previously seen [`SHOW DATABASES`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html), which lists the databases managed by the server. To find out which database is currently selected, use the [`DATABASE()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database) function:

```sql
mysql> SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| menagerie  |
+------------+
```

If you have not yet selected any database, the result is `NULL`.

To find out what tables the default database contains (for example, when you are not sure about the name of a table), use this statement:

```sql
mysql> SHOW TABLES;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| event               |
| pet                 |
+---------------------+
```

The name of the column in the output produced by this statement is always `Tables_in_db_name`, where *`db_name`* is the name of the database. See [Section 13.7.6.37, “SHOW TABLES Syntax”](https://dev.mysql.com/doc/refman/8.0/en/show-tables.html), for more information.

If you want to find out about the structure of a table, the [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html) statement is useful; it displays information about each of a table's columns:

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

`Field` indicates the column name, `Type` is the data type for the column, `NULL` indicates whether the column can contain `NULL` values, `Key` indicates whether the column is indexed, and `Default` specifies the column's default value. `Extra` displays special information about columns: If a column was created with the `AUTO_INCREMENT` option, the value will be `auto_increment` rather than empty.

`DESC` is a short form of [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html). See [Section 13.8.1, “DESCRIBE Syntax”](https://dev.mysql.com/doc/refman/8.0/en/describe.html), for more information.

You can obtain the [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) statement necessary to create an existing table using the [`SHOW CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html) statement. See [Section 13.7.6.10, “SHOW CREATE TABLE Syntax”](https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html).

If you have indexes on a table, `SHOW INDEX FROM tbl_name` produces information about them. See [Section 13.7.6.22, “SHOW INDEX Syntax”](https://dev.mysql.com/doc/refman/8.0/en/show-index.html), for more about this statement.