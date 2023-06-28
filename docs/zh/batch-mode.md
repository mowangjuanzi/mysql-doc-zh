# 3.5 在批处理模式使用 mysql

在前几节, 你使用交互式 [`mysql`](mysql.md) 输入语句并查看结果. 你也可以在批处理模式中使用 [`mysql`](mysql.md). 要做到这一点, 把你想要运行的语句放在一个语句中, 然后告诉 [`mysql`](mysql.md) 从文件中读取:

```bash
$> mysql < batch-file
```

如果你在 Windows 中运行 [`mysql`](mysql.md), 并且文件中有一些特殊字符可能会导致问题, 你可以这样做:

```bash
C:\> mysql -e "source batch-file"
```

如果你需要在命令上指定连接参数, 命令可能如下所示:

```bash
$> mysql -h host -u user -p < batch-file
Enter password: ********
```

当你以这种方式使用 [`mysql`](mysql.md) 时, 你可以创建一个脚本文件, 然后执行该脚本.

如果运行的脚本中一些语句产生了错误, 你应该使用 [`--force`](mysql-command-options.html#option_mysql_force) 命令行选项.

为什么要使用脚本? 原因如下:

- 如果你想重复运行一个查询 (例如每天或者每周), 那么将它作为脚本可以使你避免在每次执行查询时重新输入它.

- 你可以通过复制和编辑脚本, 从现有的脚本中生成新的脚本.

- 在开发查询时, 批处理模式非常有用, 特别时对于多行语句或者多语句序列. 如果你犯了一个错误, 你不需要重新输入所有的东西. 仅需要编辑你的脚本来纠正错误, 然后告诉 [`mysql`](mysql.md) 再次执行它.

- 如果你有一个查询产生了大量的输出, 你可以通过 paper 来运行输出而不是看着它从你的屏幕顶部滚动:

    ```bash
    $> mysql < batch-file | more
    ```
- 你也可以从文件中捕获输出, 以便进一步处理

    ```bash
    $> mysql < batch-file > mysql.out
    ```

- 你也可以将脚本发给其他人, 以便其他人运行查询.

- 有些情况不允许交互式操作, 例如, 当你从 `cron` 运行查询时. 在这种情况下, 必须使用批处理程序.

当以批处理模式运行 [`mysql`](mysql.md) 时, 默认的输出格式与交互式使用时不同(更简洁). 例如, 当 [`mysql`](mysql.md) 交互式运行时,  `SELECT DISTINCT species FROM pet` 的 输出如下:

```sql
+---------+
| species |
+---------+
| bird    |
| cat     |
| dog     |
| hamster |
| snake   |
+---------+
```

在批处理模式下, 输出看起来是这样的:

```sql
species
bird
cat
dog
hamster
snake
```

如果希望以批处理模式获得交互式输出格式, 使用 [`mysql -t`](mysql.md). 输出执行的语句, 使用 [`mysql -v`](mysql.md).

你也可以使用 `source` 命令或者 `\.` 命令从 [`mysql`](mysql.md) 提示符中使用脚本:

```sql
mysql> source filename;
mysql> \. filename
```

参阅 [Section 4.5.1.5, “从文本文件中执行 SQL 语句”](mysql-batch-commands.html)获取更多信息.