### 3.3.3 将数据加载到表中

创建表之后需要填充数据. [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) 和 [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) 语句对此非常有用.

假设你的宠物记录如下所示. (注意, MySQL 期望的日期为 `'YYYY-MM-DD'` 格式; 这可能和你的习惯不一样.)

| name | owner | species | sex | birth | death |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Fluffy | Harold | cat | f | 1993-02-04 | |
| Claws | Gwen | cat | m | 1994-03-17| |
| Buffy | Harold | dog | f | 1989-05-13| |
| Fang | Benny | dog | m | 1990-08-27 | |
| Bowser | Diane | dog | m | 1979-08-31 | 1995-07-29 |
| Chirpy | Gwen | bird | f | 1998-09-11 | |
| Whistler | Gwen | bird | | 1997-12-09 | |
| Slim | Benny | snake | m | 1996-04-29 | &nbsp; |

由于从空表开始, 填充它最简单的方法就是创建一个文本文件, 其中包含动物的每一行, 然后用一条语句将文件的内容加载到表中.

你可以创建一个文本文件 `pet.txt`, 其中每行包含一条记录, 值由制表符风格, 并按照 [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) 语句中列的顺序给出. 对于缺失的值(例如未知性别或者仍然活着的动物的死亡日期), 可以使用 `NULL` 值. 要在文本文件中表示这些, 使用 `\N` (反斜线, 大写字母 N). 例如, Whistler 鸟的记录应该是这样的(值之间的空格是一个制表符):

```text
Whistler        Gwen    bird    \N      1997-12-09      \N
```

要将文本文件 `pet.txt` 加载到 `pet` 表中, 使用该语句:

```sql
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet;
```

如果你在 Windows 上使用 `\r\n` 作为行结束符的编辑器创建文件, 你应该使用如下语句:

```sql
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet
       LINES TERMINATED BY '\r\n';
```

(在运行 OS X 的苹果机器上, 你可能希望使用 `LINES TERMINATED BY '\r'`.)

如果你愿意可以在 [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) 语句中显式的指定列值分隔符和行尾标记符. 这足以让语句正确的读取 `pet.txt` 文件.

如果语句失败了, MySQL 安装时可能没有启用本地文件功能. 参阅 [Section 6.1.6, “LOAD DATA LOCAL 安全问题”](https://dev.mysql.com/doc/refman/8.0/en/load-data-local.html), 有关如何更新的信息.

当你想一次添加一条新纪录时, [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) 语句非常有用. 最简单的形式, 按照 [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) 语句中列的顺序为每隔列提供值. 假设 Diane 得到了一只名叫做 “Puffball” 的新仓鼠. 你可以使用 [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) 语句添加一条新纪录, 如下所示:

```sql
mysql> INSERT INTO pet
       VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);
```

字符串和日期值在这里被指定为字符串被引号括起来. 同样, 使用 [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html), 你可以使用 `NULL` 指令来表示缺失的值. 你不可以像是 [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) 那样使用 `\N`.

从这个例子, 你应该能够看到在最初使用几个 [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) 语句而不是一个简单的 [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) 语句加载记录时, 需要进行更多的输入.

