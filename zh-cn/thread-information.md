## 8.14 检查线程信息

When you are attempting to ascertain what your MySQL server is doing, it can be helpful to examine the process list, which is the set of threads currently executing within the server. 进程列表信息可以从以下来源中获得: 

- `SHOW [FULL] PROCESSLIST` 语句: [Section 13.7.6.29, “SHOW PROCESSLIST 语法](https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html) 
- [`SHOW PROFILE`](https://dev.mysql.com/doc/refman/8.0/en/show-profile.html) 语句: [Section 13.7.6.31, “SHOW PROFILES 语法](https://dev.mysql.com/doc/refman/8.0/en/show-profiles.html) 
- `INFORMATION_SCHEMA` [`PROCESSLIST`](https://dev.mysql.com/doc/refman/8.0/en/processlist-table.html) 表: [Section 25.19, “The INFORMATION_SCHEMA PROCESSLIST Table”](https://dev.mysql.com/doc/refman/8.0/en/processlist-table.html) 
- The [**mysqladmin processlist**](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html) 命令: [Section 4.5.2, “**mysqladmin** — 管理 MySQL 服务器的客户端”](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html) 
- The Performance Schema [`threads`](https://dev.mysql.com/doc/refman/8.0/en/threads-table.html) table, stage tables, and lock tables: [Section 26.12.17, “Performance Schema Miscellaneous Tables”](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-miscellaneous-tables.html), [Section 26.12.5, “Performance Schema Stage Event Tables”](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-stage-tables.html), [Section 26.12.12, “Performance Schema Lock Tables”](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-lock-tables.html). 

Access to [`threads`](https://dev.mysql.com/doc/refman/8.0/en/threads-table.html) does not require a mutex and has minimal impact on server performance. [`INFORMATION_SCHEMA.PROCESSLIST`](https://dev.mysql.com/doc/refman/8.0/en/processlist-table.html) and [`SHOW PROCESSLIST`](https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html) have negative performance consequences because they require a mutex. [`threads`](https://dev.mysql.com/doc/refman/8.0/en/threads-table.html) also shows information about background threads, which [`INFORMATION_SCHEMA.PROCESSLIST`](https://dev.mysql.com/doc/refman/8.0/en/processlist-table.html) and [`SHOW PROCESSLIST`](https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html) do not. This means that [`threads`](https://dev.mysql.com/doc/refman/8.0/en/threads-table.html) can be used to monitor activity the other thread information sources cannot. 

You can always view information about your own threads. To view information about threads being executed for other accounts, you must have the [`PROCESS`](https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html#priv_process) privilege. 

Each process list entry contains several pieces of information: 

- `Id` 是线程关联的客户端的连接标识符. 
- `User` 和 `Host` 表示与线程关联的账户. 
- `db` 是线程默认的数据库, 如果没有选择, 则为 NULL. 
- `Command` 和 `State` 表示线程正在做什么. 

    大多数状态对应非常快速的操作, 如果一个线程在给定的状态中停留了许多秒, 那么可能需要研究一下这个问题. 

- `Time` indicates how long the thread has been in its current state. The thread's notion of the current time may be altered in some cases: The thread can change the time with [`SET TIMESTAMP = value`](https://dev.mysql.com/doc/refman/8.0/en/set-variable.html). For a thread running on a slave that is processing events from the master, the thread time is set to the time found in the events and thus reflects current time on the master and not the slave. 
- `Info` contains the text of the statement being executed by the thread, or NULL if it is not executing one. By default, this value contains only the first 100 characters of the statement. To see the complete statements, use [`SHOW FULL PROCESSLIST`](https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html). 

- The `sys` schema [processlist](https://dev.mysql.com/doc/refman/8.0/en/sys-processlist.html) view, which presents information from the Performance Schema [`threads`](https://dev.mysql.com/doc/refman/8.0/en/threads-table.html) table in a more accessible format: [Section 27.4.3.22, “The processlist and x$processlist Views”](https://dev.mysql.com/doc/refman/8.0/en/sys-processlist.html) 
- The `sys` schema [`session`](https://dev.mysql.com/doc/refman/8.0/en/sys-session.html) view, which presents information about user sessions (like the `sys` schema [`processlist`](https://dev.mysql.com/doc/refman/8.0/en/sys-processlist.html) view, but with background processes filtered out): [Section 27.4.3.33, “The session and x$session Views”(https://dev.mysql.com/doc/refman/8.0/en/sys-session.html)] 

The following sections list the possible `Command` values, and `State` values grouped by category. The meaning for some of these values is self-evident. For others, additional description is provided. 