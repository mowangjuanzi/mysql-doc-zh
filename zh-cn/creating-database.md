### 3.3.1 创建和选择数据库

如果管理员在设置权限时为你创建了数据库, 你可以开始使用它. 否则, 你需要自己创建:

```sql
mysql> CREATE DATABASE menagerie;
```

在 Unix 下, 数据库名称区分大小写(不像 SQL 关键字), 因此必须始终将数据库成为 `menagerie`, 而不是 `Menagerie`, `MENAGERIE`, 或其它变体. 对于表名也是如此. (在 Windows 下, 此限制并不适用, 尽管在给定的查询中必须使用相同字母大小写的数据库和表. 然而, 由于各种原因, 建议的最佳实践始终使用创建数据库时使用相同大小写字幕.)

> **注意**
>
> 如果你在创建数据库时出现此类错误: `ERROR 1044 (42000): Access denied for user 'micah'@'localhost' to database 'menagerie'`, 这意味着您的用户账户没有执行此操作所需的权限. 请与管理员你讨论或者参阅 [Section 6.2, “访问控制和账户管理”](https://dev.mysql.com/doc/refman/8.0/en/access-control.html).

创建数据库时并没有选择它; 你必须显式的这样做. 要使 menagerie 成为当前数据库, 使用以下语句:

```sql
mysql> USE menagerie
Database changed
```

数据库只需要创建一次, 但你必须在每次开始 [mysql](mysql.md) 会话时选择它. 你可以通过发出 [`USE`](https://dev.mysql.com/doc/refman/8.0/en/use.html) 语句来实现, 如示例所示. 或者, 你可以在调用 [mysql](mysql.md) 时在命令行上选择数据库. 只需要在你可能需要提供的任何连接参数后指定其名称. 例如:

```sql
shell> mysql -h host -u user -p menagerie
Enter password: ********
```

> **重要**
>
> 刚才显示的命令中 `menagerie`  ***不***是你的密码. 如果希望在命令行的 `-p` 选项之后提供密码, 则必须在不使用空格的情况下提供(例如, 是 `-ppassword`, 而不是 `-p password`). 然而, 不建议将密码放在命令行上, 因为这样做会让登录到此机器上的其它用户窥探密码.

&nbsp;

> **注意**
>
> 你可以随时使用 [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) [`DATABASE()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database) 查看当前选择了哪个数据库.