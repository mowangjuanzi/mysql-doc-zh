#### 3.3.4.1 选择所有数据

[`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 最简单的形式是从表中检索所有数据:

```sql
mysql> SELECT * FROM pet;
+----------+--------+---------+------+------------+------------+
| name     | owner  | species | sex  | birth      | death      |
+----------+--------+---------+------+------------+------------+
| Fluffy   | Harold | cat     | f    | 1993-02-04 | NULL       |
| Claws    | Gwen   | cat     | m    | 1994-03-17 | NULL       |
| Buffy    | Harold | dog     | f    | 1989-05-13 | NULL       |
| Fang     | Benny  | dog     | m    | 1990-08-27 | NULL       |
| Bowser   | Diane  | dog     | m    | 1979-08-31 | 1995-07-29 |
| Chirpy   | Gwen   | bird    | f    | 1998-09-11 | NULL       |
| Whistler | Gwen   | bird    | NULL | 1997-12-09 | NULL       |
| Slim     | Benny  | snake   | m    | 1996-04-29 | NULL       |
| Puffball | Diane  | hamster | f    | 1999-03-30 | NULL       |
+----------+--------+---------+------+------------+------------+
```

如果你想查看整个表, [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 这种形式非常有用, 例如, 查看你刚刚加载过的初始化数据. 例如, 你可能恰好认为 Bowser 的出生日期似乎不太正确. 查阅你的原始血统记录, 你会发现正确的出生年费应该是 1989, 而不是 1979.

至少有两个方法可以解决这个问题:

- 编辑 `pet.txt` 文件纠正错误, 然后使用 [`DELETE`](https://dev.mysql.com/doc/refman/8.0/en/delete.html) 语句清空表格, 并且使用 [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) 重新加载它:
    ```sql
    mysql> DELETE FROM pet;
    mysql> LOAD DATA LOCAL INFILE 'pet.txt' INTO TABLE pet;
    ```
    然而, 如果你这样做, 你还必须重新输入 Puffball 的记录.

- 使用 [`UPDATE`](https://dev.mysql.com/doc/refman/8.0/en/update.html) 语句只修复错误的记录:
    ```sql
    mysql> UPDATE pet SET birth = '1989-08-31' WHERE name = 'Bowser';
    ```
    [`UPDATE`](https://dev.mysql.com/doc/refman/8.0/en/update.html) 只更改有问题的记录, 不需要重新加载表.