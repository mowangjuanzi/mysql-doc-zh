# 3.7 在 Apache 中使用 MySQL

有些程序允许你使用 MySQL 数据库对用户进行身份验证, 也允许你将日志文件写入到 MySQL 表.

你可以将以下内容放入 Apache 配置文件中, 从而改变 Apache 日志格式, 从而让 MySQL 易于阅读:

```ini
LogFormat \
        "\"%h\",%{%Y%m%d%H%M%S}t,%>s,\"%b\",\"%{Content-Type}o\",  \
        \"%U\",\"%{Referer}i\",\"%{User-Agent}i\""
```

加载这种格式的文件到 MySQL, 可以使用如下语句:

```sql
LOAD DATA INFILE '/local/access_log' INTO TABLE tbl_name
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '\\'
```

创建被命名的表, 以使列与 LogFormat 写入日志文件的列相对应.