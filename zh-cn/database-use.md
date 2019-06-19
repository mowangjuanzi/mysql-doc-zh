## 3.3 创建和使用数据库

一旦知道如何输入 SQL 语句, 就可以访问数据库了.

假设你家里有几只宠物(你的动物园(menagerie)), 并且你希望跟踪关于他们的各种类型的信息. 你可以通过创建表来保存数据并将所需信息加载到表中来实现这一点. 然后, 你可以通过从表中检索数据来回答关于你的动物的各种问题. 本节向你展示如何执行以下操作:

- 创建数据库

- 创建表

- 加载数据到表中

- 以各种方式从表中检索数据

- 使用多个表

The menagerie database is simple (deliberately), but it is not difficult to think of real-world situations in which a similar type of database might be used. 例如, 这样的数据库被农民用来追踪牲畜, 被兽医用来追踪病人的记录. 可以从 MySQL 网站获取一个包含以下部分中使用的一些查询和示例数据的 menagerie 分发版. 它有两种压缩格式, **tar** 文件和 Zip 格式: https://dev.mysql.com/doc/.

使用 [`SHOW`](https://dev.mysql.com/doc/refman/8.0/en/show.html) 语句查询出当前服务器中存在哪些数据库:

```sql
mysql> SHOW DATABASES;
+----------+
| Database |
+----------+
| mysql    |
| test     |
| tmp      |
+----------+
```

`mysql` 数据库描述了用户访问权限.  `test` 数据库通常作为工作区供用户试用.

语句显示的数据库列表在你的计算机上可能 有所不同; 如果你没有[`SHOW DATABASES`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html) 权限, [`SHOW DATABASES`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html) 不会展示你没有权限的数据库. 参阅 [Section 13.7.6.14, “SHOW DATABASES 语法”](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html).

如果 `test` 数据库存在, 尝试访问它:

```sql
mysql> USE test
Database changed
```
                                                                                                                                                                                                             
[`USE`](https://dev.mysql.com/doc/refman/8.0/en/use.html) 和 `QUIT` 一样不需要分号. (如果你愿意, 你可以用分号结束这类语句; 它并没有害处.) [`USE`](https://dev.mysql.com/doc/refman/8.0/en/use.html) 语句在另外一方面也很特殊: 它必须在一行中给出.

对下面的示例, 你可以使用 `test` 数据库(如果你能够访问的话), 但是你在该数据库中创建的任何内容都可以被访问它的人删除. 出于这个原因, 你应该请求 MySQL 管理员允许你使用自己的数据库. 假如你想调用你的 `menagerie`. 管理员需要执行这样的语句:

```sql
mysql> GRANT ALL ON menagerie.* TO 'your_mysql_name'@'your_client_host';
```

其中 `your_mysql_name` 是分配给你的 MySQL 用户名, `your_client_host` 是连接到服务器的主机地址.

