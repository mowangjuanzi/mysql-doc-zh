### 4.5.1 `mysql` — MySQL 命令行客户端

[**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 时带有输入行编辑功能的简单 SQL shell. 它支持交互式和非交互式使用. 当用于交互式时, 查询结果以 ASCII表格式显示. 当非交互式使用时(例如, 作为过滤器), 结果以制表符分隔的格式显示. 可以使用命令选项来更改输出格式.

如果因为获取大的结果集导致内存不足从而程序出现问题, 可使用 [`--quick`](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_quick) 选项. 会强制 [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 一行一行地从服务器检索结果, 而不是检索整个结果, 然后在显示之前一直在内存中缓存. 这是通过使用 client/server 类库中的 [`mysql_use_result()`](https://dev.mysql.com/doc/refman/8.0/en/mysql-use-result.html) C API 函数返回结果集, 而不是 [`mysql_store_result()`](https://dev.mysql.com/doc/refman/8.0/en/mysql-store-result.html).

> **注意**
>
> 另外, MySQL Shell 提供了对 X DevAPI 的访问. 有关详情, 参阅 [MySQL Shell 8.0 (MySQL 8.0 部分)](https://dev.mysql.com/doc/mysql-shell/8.0/en/).

使用 [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 非常容易. 从命令解释器的提示符调用它, 如下所示:

```bash
shell> mysql db_name
```

或者:

```bash
shell> mysql --user=user_name --password db_name
Enter password: your_password
```

然后输入一个SQL语句, 以 `;`, `\g`, 或者 `\G` 结束, 然后按 Enter 键.

如果存在语句, 键入 **Control+C** 会中断当前语句, 否则取消任何部分的输入行.

你可以在脚本文件(批处理文件)中执行 SQL 语句, 如下所示:

```bash
shell> mysql db_name < script.sql > output.tab
```

在 Unix 上, [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端记录可交互式的执行语句到一个历史文件中. 参阅 [Section 4.5.1.3, “mysql 客户端日志”](https://dev.mysql.com/doc/refman/8.0/en/mysql-logging.html).