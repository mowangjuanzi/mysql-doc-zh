### 4.5.1 `mysql` — The MySQL Command-Line Client

[**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) is a simple SQL shell with input line editing capabilities. It supports interactive and noninteractive use. When used interactively, query results are presented in an ASCII-table format. When used noninteractively (for example, as a filter), the result is presented in tab-separated format. The output format can be changed using command options.

If you have problems due to insufficient memory for large result sets, use the [`--quick`](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_quick) option. This forces [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) to retrieve results from the server a row at a time rather than retrieving the entire result set and buffering it in memory before displaying it. This is done by returning the result set using the [`mysql_use_result()`](https://dev.mysql.com/doc/refman/8.0/en/mysql-use-result.html) C API function in the client/server library rather than [`mysql_store_result()`](https://dev.mysql.com/doc/refman/8.0/en/mysql-store-result.html).

> **Note**
>
> Alternatively, MySQL Shell offers access to the X DevAPI. For details, see MySQL Shell 8.0 (part of MySQL 8.0).

Using [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) is very easy. Invoke it from the prompt of your command interpreter as follows:

```bash
shell> mysql db_name
```

Or:

```bash
shell> mysql --user=user_name --password db_name
Enter password: your_password
```

Then type an SQL statement, end it with `;`, `\g`, or `\G` and press Enter.

Typing **Control+C** interrupts the current statement if there is one, or cancels any partial input line otherwise.

You can execute SQL statements in a script file (batch file) like this:

```bash
shell> mysql db_name < script.sql > output.tab
```

On Unix, the [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client logs statements executed interactively to a history file. See [Section 4.5.1.3, “mysql Client Logging”](https://dev.mysql.com/doc/refman/8.0/en/mysql-logging.html).