# 第 3 章 教程

本章提供了通过 MySQL 展示如何使用 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端程序来创建和使用一个简单的数据库教程。[mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)（有时称为 “终端监视器” 或者 “监视器”）是交互式程序，能够连接到 MySQL 服务器，运行查询和查看结果。[mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 也可以在批处理模式中使用：可以预先将查询放到一个文件中，然后告诉 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 执行该文件中的内容。这里介绍了使用 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 的两种方法。

要查看 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 提供的选项列表。使用 [`--help`](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_help) 选项调用它：

```bash
$> mysql --help
```

本章假设 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 已经安装到计算机上。并且可以连接到 MySQL 服务器。如果不是这样。请联系 MySQL 管理员。(如果你是管理员。则需要参考本手册的相关部分。如[第 5 章 *MySQL Server 管理*](https://dev.mysql.com/doc/refman/8.0/en/server-administration.html).) 

本章描述了创建和使用数据库的整个过程。如果你只对访问现有数据库感兴趣。可以跳过描述如何创建数据库和它包含的表的部分。

因为本章本质上是教程。所以必须忽略很多细节。有关此处所涵盖主题的更多信息。请参阅手册的相关章节。
