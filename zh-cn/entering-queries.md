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

下面是另一个查询. 它演示了可以将 [mysql](mysql.md) 用作简单的计算器:

```sql
mysql> SELECT SIN(PI()/4), (4+1)*5;
+------------------+---------+
| SIN(PI()/4)      | (4+1)*5 |
+------------------+---------+
| 0.70710678118655 |      25 |
+------------------+---------+
1 row in set (0.02 sec)
```

到目前位置显示的查询都是相对简短的单行语句. 你甚至可以在一行中输入多个语句, 用分号结尾即可:

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

查询不需要再一行中给出所有的内容, 因此需要多行内容的长查询不是问题. [mysql](mysql.md) 通过查找结束分号来确定语句的结束位置, 而不是通过查找输入行的末尾. (换句话说, [mysql](mysql.md) 接受自由格式的输入: 它收集输入行, 但直到看到分号才执行它们.)

下面是一个简单的多行语句:

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

在本例中, 注意在你输入多行查询的第一行之后, 提示符从 `mysql>` 更改为 `->` . 这就是 [mysql](mysql.md) 表示它还没看到完整的语句, 正等待其它语句. 提示符是你的朋友, 因为它提供了有价值的反馈. 如果你使用这种反馈, 你总是可以直到 [mysql](mysql.md) 在等待什么.

如果你决定不执行正在输入的查询, 请输入 `\c`:

```sql
mysql> SELECT
    -> USER()
    -> \c
mysql>
```

这里也注意提示符. 输入`\c`后, 它会切换回 `mysql>`, 提供反馈提示 [mysql](mysql.md) 已经准备好进行新的查询.

下表显示了你可能看到的每个提示符, 并总结了它们对于 [mysql](mysql.md) 所处状态的含义.

| 提示符 | 含义 |
|:---:|:---:|
| `mysql>` | 准备好进行新的查询 |
| `->` | 等待多行查询中的下一行 |
| `'>` | Waiting for next line, waiting for completion of a string that began with a single quote (`) |
| `">` | Waiting for next line, waiting for completion of a string that began with a double quote (`) |
| ``>` | Waiting for next line, waiting for completion of an identifier that began with a backtick (`) |
| `/*>` | Waiting for next line, waiting for completion of a comment that began with `/*` |

当你打算在一行上发出查询, 但忘记终止分号时, 多行语句通常意外的发生. 在这种情况下, [mysql](mysql.md) 等待更多输入:

```sql
mysql> SELECT USER()
    ->
```

如果发生在你身上(你认为你已经输入语句, 但唯一的响应是 `->` 提示符), 则可能是 [mysql](mysql.md) 在等待分号. 如果你没有注意到提示告诉你什么, 你可能会坐在那里一段时间, 然后意识到你需要做什么. 输入分号完成语句, 并且 [mysql](mysql.md) 执行它:

```sql
mysql> SELECT USER()
    -> ;
+---------------+
| USER()        |
+---------------+
| jon@localhost |
+---------------+
```

`'>` 和 `">` prompts occur during string collection (另外一种 MySQL 等待字符串完成的方法). 在 MySQL, 你可以编写由 `'` 或者 `"` 字符包围的字符串(例如, `'hello'` 或者 `"goodbye"`), 并且 [mysql](mysql.md) 允许你输入跨多行的字符串. 当你看到 `'>` 或者 `">` 提示符时, 它意味着你输入了包含以 `'` 或者 `"` 引号字符开头的字符串, 但尚未输入终止该字符串的匹配引号使其终止. 这通常表示你无意中漏掉了引号字符. 例如:

```sql
mysql> SELECT * FROM my_table WHERE name = 'Smith AND age < 30;
    '>
```

如果你输入此 [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 语句, 然后按 `Enter` 等待结果, 什么都没有发生. 不要想为什么这个查询要花费这么久的时间, 注意 `'>` 提示符提供的线索. 它告诉你 [mysql](mysql.md) 期望看到未结束的字符串的剩余部分. (你看到语句中的错误了吗? 字符串 `'Smith` 缺少第二个单引号.)

此时, 你需要做什么? 最简单的方法就是取消查询. 然而, 在本例中你不能只输入 `\c`, 因为 [mysql](mysql.md) 将其解释为正在收集的字符串的一部分. 相反, 输入结束引号字符(这样 [mysql](mysql.md) 就直到你已经完成了字符串输入), 然后输入 `\c`:

```sql
mysql> SELECT * FROM my_table WHERE name = 'Smith AND age < 30;
    '> '\c
mysql>
```

提示符更改为 `mysql>`, 表示 [mysql](mysql.md) 已经准备好进行新的查询.

``>` 提示符类似于 `'>` 和 `">` 提示符, 但表示你已经开始但尚未结束反引号的标识符.

知道 `'>`, `">`, 和 ``>` 提示符表示什么是非常重要的, 因为如果你错误的输入了一个未停止字符串, 那么你输入的任何其它行都被会 [mysql](mysql.md) 忽略 —— 包括包含 `QUIT` 的行. 这可能非常让人疑惑, 特别是如果你不知道在取消当前查询之前需要提供停止引号.

> **注意**
> 
> 从现在开始, 多行语句的编写不再需要辅助 (`->` 或者其它)提示符, 以便更容易的复制和粘贴语句, 以便你自己尝试.