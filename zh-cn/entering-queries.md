## 3.2 输入查询

如上一节所述, 确认你已连接到服务器. 这样做并没有选择任何要使用的数据库, 但这样是可以的. 此时, 了解一下如何发出查询比直接创建表, 将数据加载到表中并从中检索数据更重要. 本节描述了输入查询的基本规则, 你可以使用几个查询来熟悉 [mysql](mysql.md) 的工作原理.

下面是一个简单的查询, 要求服务器告诉你它的版本号和当前日期. 如下面所示, 在 `mysql>` 提示符下输入, 然后回车:

```sql
mysql> SELECT VERSION(), CURRENT_DATE;
+-----------+--------------+
| VERSION() | CURRENT_DATE |
+-----------+--------------+
| 5.8.0-m17 | 2015-12-21   |
+-----------+--------------+
1 row in set (0.02 sec)
mysql>
```

这个查询说明了 [mysql](mysql.md) 的几个特点:

- 一个查询通常由 SQL 语句和分号组成. (有一些例外, 分号可以省略. 前面提到的 `QUIT` 就是其中之一. 我们稍后讨论其他问题.)

- 当发出一个查询, [mysql](mysql.md) 发送它到服务器执行并显示结果, 然后打印另一个 `mysql>` 提示符, 说明它已经准备好进行另一个查询.

- [mysql](mysql.md) 以表格(行和列)的形式显示查询输出. 第一行包含列的标签. 下面的行是查询结果. 通常, 列的标签是从数据库的表中获取的列的名称. 如果检索的是表达式的值而不是表的列(如刚才的示例), [mysql](mysql.md) 使用表达式很深来标记列.

- [mysql](mysql.md) 显示了返回多少行以及查询执行了多长时间, 这能让你大致了解服务器性能. 这些值并不精确, 因为他们显示的是系统时间(不是 CPU 或者机器时间), 而且收到服务器负载和网络延迟等因素的影响. (为简介起见, 本节中的其余示例又是没有显示 “rows in set” 行.)

关键字可以不区分大小写. 下列查询是等价的:

```sql
mysql> SELECT VERSION(), CURRENT_DATE;
mysql> select version(), current_date;
mysql> SeLeCt vErSiOn(), current_DATE;
```

Here is another query. It demonstrates that you can use [mysql](mysql.md) as a simple calculator:

```sql
mysql> SELECT SIN(PI()/4), (4+1)*5;
+------------------+---------+
| SIN(PI()/4)      | (4+1)*5 |
+------------------+---------+
| 0.70710678118655 |      25 |
+------------------+---------+
1 row in set (0.02 sec)
```

The queries shown thus far have been relatively short, single-line statements. You can even enter multiple statements on a single line. Just end each one with a semicolon:

```sql
mysql> SELECT VERSION(); SELECT NOW();
+-----------+
| VERSION() |
+-----------+
| 8.0.13    |
+-----------+
1 row in set (0.00 sec)

+---------------------+
| NOW()               |
+---------------------+
| 2018-08-24 00:56:40 |
+---------------------+
1 row in set (0.00 sec)
```

A query need not be given all on a single line, so lengthy queries that require several lines are not a problem. [mysql](mysql.md) determines where your statement ends by looking for the terminating semicolon, not by looking for the end of the input line. (In other words, [mysql](mysql.md) accepts free-format input: it collects input lines but does not execute them until it sees the semicolon.)

Here is a simple multiple-line statement:

```bash
mysql> SELECT
    -> USER()
    -> ,
    -> CURRENT_DATE;
+---------------+--------------+
| USER()        | CURRENT_DATE |
+---------------+--------------+
| jon@localhost | 2018-08-24   |
+---------------+--------------+
```

In this example, notice how the prompt changes from `mysql>` to `->` after you enter the first line of a multiple-line query. This is how [mysql](mysql.md) indicates that it has not yet seen a complete statement and is waiting for the rest. The prompt is your friend, because it provides valuable feedback. If you use that feedback, you can always be aware of what [mysql](mysql.md) is waiting for.

If you decide you do not want to execute a query that you are in the process of entering, cancel it by typing `\c`:

```sql
mysql> SELECT
    -> USER()
    -> \c
mysql>
```

Here, too, notice the prompt. It switches back to `mysql>` after you type `\c`, providing feedback to indicate that [mysql](mysql.md) is ready for a new query.

The following table shows each of the prompts you may see and summarizes what they mean about the state that [mysql](mysql.md) is in.

| Prompt | Meaning |
|:---:|:---:|
| `mysql>` | Ready for new query |
| `->` | Waiting for next line of multiple-line query |
| `'>` | Waiting for next line, waiting for completion of a string that began with a single quote (`) |
| `">` | Waiting for next line, waiting for completion of a string that began with a double quote (`) |
| ``>` | Waiting for next line, waiting for completion of an identifier that began with a backtick (`) |
| `/*>` | Waiting for next line, waiting for completion of a comment that began with `/*` |

Multiple-line statements commonly occur by accident when you intend to issue a query on a single line, but forget the terminating semicolon. In this case, [mysql](mysql.md) waits for more input:

```sql
mysql> SELECT USER()
    ->
```

If this happens to you (you think you've entered a statement but the only response is a `->` prompt), most likely [mysql](mysql.md) is waiting for the semicolon. If you don't notice what the prompt is telling you, you might sit there for a while before realizing what you need to do. Enter a semicolon to complete the statement, and [mysql](mysql.md) executes it:

```sql
mysql> SELECT USER()
    -> ;
+---------------+
| USER()        |
+---------------+
| jon@localhost |
+---------------+
```

The `'>` and `">` prompts occur during string collection (another way of saying that MySQL is waiting for completion of a string). In MySQL, you can write strings surrounded by either `'` or `"` characters (for example, `'hello'` or `"goodbye"`), and [mysql](mysql.md) lets you enter strings that span multiple lines. When you see a `'>` or `">` prompt, it means that you have entered a line containing a string that begins with a `'` or `"` quote character, but have not yet entered the matching quote that terminates the string. This often indicates that you have inadvertently left out a quote character. For example:

```sql
mysql> SELECT * FROM my_table WHERE name = 'Smith AND age < 30;
    '>
```

If you enter this [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statement, then press `Enter` and wait for the result, nothing happens. Instead of wondering why this query takes so long, notice the clue provided by the `'>` prompt. It tells you that [mysql](mysql.md) expects to see the rest of an unterminated string. (Do you see the error in the statement? The string `'Smith` is missing the second single quotation mark.)

At this point, what do you do? The simplest thing is to cancel the query. However, you cannot just type `\c` in this case, because [mysql](mysql.md) interprets it as part of the string that it is collecting. Instead, enter the closing quote character (so [mysql](mysql.md) knows you've finished the string), then type `\c`:

```sql
mysql> SELECT * FROM my_table WHERE name = 'Smith AND age < 30;
    '> '\c
mysql>
```

The prompt changes back to `mysql>`, indicating that [mysql](mysql.md) is ready for a new query.

The ``>` prompt is similar to the `'>` and `">` prompts, but indicates that you have begun but not completed a backtick-quoted identifier.

It is important to know what the `'>`, `">`, and ``>` prompts signify, because if you mistakenly enter an unterminated string, any further lines you type appear to be ignored by [mysql](mysql.md)—including a line containing `QUIT`. This can be quite confusing, especially if you do not know that you need to supply the terminating quote before you can cancel the current query.

> **Note**
> 
> Multiline statements from this point on are written without the secondary (`->` or other) prompts, to make it easier to copy and paste the statements to try for yourself.