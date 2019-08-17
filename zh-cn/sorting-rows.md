#### 3.3.4.4 行排序

你可能已经注意到, 在前面的示例中, 查询的结果记录并没有按照特定的顺序显示. 当以某种有意义的方式对行进行排序时, 通过更容易检查查询输出. 要对结果排序, 使用 `ORDER BY` 子句.

以下是动物的生日, 按照日期排序:

```sql
mysql> SELECT name, birth FROM pet ORDER BY birth;
+----------+------------+
| name     | birth      |
+----------+------------+
| Buffy    | 1989-05-13 |
| Bowser   | 1989-08-31 |
| Fang     | 1990-08-27 |
| Fluffy   | 1993-02-04 |
| Claws    | 1994-03-17 |
| Slim     | 1996-04-29 |
| Whistler | 1997-12-09 |
| Chirpy   | 1998-09-11 |
| Puffball | 1999-03-30 |
+----------+------------+
```

在字符串类型类上, 排序与其它所有比较操作一样, 通常以不区分大小写的方式执行. 这意味着除了其大小写之外, 其余相同列的顺序是未定义的. 你可以强制使用 [`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#operator_binary) 对列进行区分大小写, 像是: `ORDER BY BINARY col_name`.

默认的排序顺序是升序, 首先是最小的值, 若要按照相反的顺序(降序)排序, 请将 `DESC` 关键字添加到正在排序的列的名称中:

```sql
mysql> SELECT name, birth FROM pet ORDER BY birth DESC;
+----------+------------+
| name     | birth      |
+----------+------------+
| Puffball | 1999-03-30 |
| Chirpy   | 1998-09-11 |
| Whistler | 1997-12-09 |
| Slim     | 1996-04-29 |
| Claws    | 1994-03-17 |
| Fluffy   | 1993-02-04 |
| Fang     | 1990-08-27 |
| Bowser   | 1989-08-31 |
| Buffy    | 1989-05-13 |
+----------+------------+
```

你可以对多个列进行排序, 也可以对不同的列进行不同的排序. 例如, 按照动物的类型进行升序排列, 然后按照动物类型内的出生日期进行降序排列 (最小的动物优先), 使用以下查询:

```sql
mysql> SELECT name, species, birth FROM pet
       ORDER BY species, birth DESC;
+----------+---------+------------+
| name     | species | birth      |
+----------+---------+------------+
| Chirpy   | bird    | 1998-09-11 |
| Whistler | bird    | 1997-12-09 |
| Claws    | cat     | 1994-03-17 |
| Fluffy   | cat     | 1993-02-04 |
| Fang     | dog     | 1990-08-27 |
| Bowser   | dog     | 1989-08-31 |
| Buffy    | dog     | 1989-05-13 |
| Puffball | hamster | 1999-03-30 |
| Slim     | snake   | 1996-04-29 |
+----------+---------+------------+
```

`DESC` 关键字只适合紧接在它前面的列名 (`birth`); 它不影响 `species` 列的排列顺序.