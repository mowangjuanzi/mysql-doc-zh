## 3.1 连接到服务器和从服务器断开

连接到服务器, 当你调用[**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)将需要提供一个 MySQL 用户名, 最可能是密码. 如果服务器运行在你登录的服务器的另外一台, 则还需要指定主机名. 联系你的管理员以便了解i需要使用那些参数进行连接(即, 主机名, 用户名, 和要使用的密码). 一旦你直到了正确的参数, 就应该像下面这样连接:

```bash
shell> mysql -h host -u user -p
Enter password: ********
```

*`host`* 和 *`user`* 表示为运行 MySQL 服务器的主机名和 MySQL 账户的用户名. 为你的设置替换适当的值. `********` 代表你的密码; 当 [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 显示 `Enter password:` 提示时输入它.

如果可行, 你应该会看到一些描述性信息, 然后是 `mysql>` 提示符:

```bash 
shell> mysql -h host -u user -p
Enter password: ********
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 25338 to server version: 8.0.18-standard

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

mysql>
```

`mysql>` 提示符告诉你 [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 已经做好了输入 SQL 语句的准备了.

如果 MySQL 运行的机器和你要登录 MySQL 在一台主机上, 你可以忽略主机名, 只需使用以下命令:

```bash
shell> mysql -u user -p
```

当你尝试登录时, 如果你收到了错误消息, 例如 `ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)`, 它意味着 MySQL 服务器守护程序(Unix) 或者服务 (Windows) 没有运行. 咨询管理员或者参阅 [Chapter 2, *安装和更新 MySQL*](installing.md) 适用于你的操作系统的章节.

有关尝试登录时经过遇到的其他问题的帮助, 参阅 [Section B.4.2, “使用 MySQL 程序时的常见错误”](https://dev.mysql.com/doc/refman/8.0/en/common-errors.html).

一些 MySQL 安装允许用户使用匿名(未命名)用户的身份连接到本地主机上运行的服务器. 如果你的机器是这种情况, 你应该可以通过调用没有任何选项的 [**mysql**](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 连接到服务器:

```bash
shell> mysql
```

连接成功后, 你可以通过在 `mysql>` 提示符下输入 `QUIT` (或者 `\q`) 来随时断开连接:

```bash
mysql> QUIT
Bye
```

在 Unix 环境, 你也可以使用 Control+D 断开链接.

下面章节的大部分示例都假定你已经连接到服务器. 他们通过 `mysql>` 提示符来表明这一点.