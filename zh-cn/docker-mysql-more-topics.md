#### 2.5.6.2 使用 Docker 部署 MySQL 服务器的更多主题

> **注意**
>
> 当必须指定 `mysql/mysql-server` 作为 Docker 镜像存储时, 下面的大多数命令都会使用它(像是 `docker pull` 和 `docker run` 命令); 如果你的镜像来自另一个库， 那就去修改—例如, 替换为 `store/oracle/mysql-enterprise-server` 是 Docker 商店的 MySQL 企业版镜像, 或者 `container-registry.oracle.com/mysql/enterprise-server` 是 Oracle 容器库的 MySQL 企业版镜像.

##### 优化过的 Docker 版 MySQL 安装

Docker 版 MySQL 镜像进行了代码优化, 这意味着他们只包含大多数在 Docker 容器中运行 MySQL 实例的与用户相关的关键组件. MySQL Docker 安装与常见的非 Docker 安装的不同在以下几个方面:

- 包含的二进制文件仅限于:

    - `/usr/bin/my_print_defaults`

    - `/usr/bin/mysql`

    - `/usr/bin/mysql_config`

    - `/usr/bin/mysql_install_db`

    - `/usr/bin/mysql_tzinfo_to_sql`

    - `/usr/bin/mysql_upgrade`

    - `/usr/bin/mysqladmin`

    - `/usr/bin/mysqlcheck`

    - `/usr/bin/mysqldump`

    - `/usr/bin/mysqlpump`

    - `/usr/bin/mysqlbackup` (仅适用于 MySQL 8.0 企业版)

    - `/usr/sbin/mysqld`

- 所有的二进制文件都会被删除; 它们不包含调试信息.

##### 配置 MySQL 服务器

当你启动 MySQL Docker 容器时, 你可以通过 `docker run` 命令将配置选项传递给服务器; 例如:

```bash
docker run --name mysql1 -d mysql/mysql-server:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_col
```

命令使用 `utf8mb4` 作为默认字符集, 使用 `utf8mb4_col` 作为数据库的默认排序规则启动 MySQL 服务器.

配置 MySQL 服务器的另外一种方式是准备一个配置文件, 将其挂载到容器内服务器配置文件的位置. 参阅[持久化数据和配置更改](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration)获取详情.

##### 持久化数据和配置更改

Docker 容器原则上是短暂的, 如果容器被删除或者损坏了, 任何数据或者配置都有可能会丢失([这里](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)查看讨论). [Docker volumes](https://docs.docker.com/engine/admin/volumes/volumes/), 然而, 提供了一种机制来保护 Docker 容器内创建的数据. 在初始化时, MySQL 服务器容器为服务器数据目录创建一个 Docker volume. 在容器上运行 `docker inspect` 命令的 JSON 输出中有一个 `Mount` 键, 其值提供了关于数据目录卷(volume) 的相关信息:

```bash
shell> docker inspect mysql1 
...
 "Mounts": [
            {
                "Type": "volume",
                "Name": "4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652",
                "Source": "/var/lib/docker/volumes/4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
...
```

输出显示源文件夹 `/var/lib/docker/volumes/4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652/_data`, 已经挂载到 `/var/lib/mysql`, 即容器内的服务器数据目录.

保存数据的另一种方式时在创建容器时使用 —— `--mount` 选项 [bind-mount](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-volumes-or-memory-filesystems) 主机目录. 可以使用相同的技术来保存服务器的配置. 下面的命令创建一个 MySQL Server 容器并绑定挂载数据目录和服务器配置文件:

```bash
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
--mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \
-d mysql/mysql-server:tag
```

命令挂载 `path-on-host-machine/my.cnf` 到 `/etc/my.cnf` (容器内的服务器配置文件), 并且挂载 `path-on-host-machine/datadir` 到 `/var/lib/mysql` (容器内的数据目录). 必须满足以下条件, 才能绑定挂载工作:

- 配置文件 `path-on-host-machine/my.cnf` 必须总是存在, 它必须包含启动服务器的指定用户 `mysql`:

```ini
[mysqld]
user=mysql
```

你也可以在文件中加载其他服务器配置项.

- 数据目录 `path-on-host-machine/datadir` 必须已存在. 要对服务器进行初始化, 目录必须为空. 可以挂载填充了数据的目录, 并使用它启动服务器; 然而, you must make sure you start the Docker container with the same configuration as the server that created the data, and any host files or directories required are mounted when starting the container.

##### 运行其他初始化脚本

如果在数据库创建后, 有任何 `.sh` 或者 `.sql` 脚本希望立即在数据库上运行, 你可以将它们放入到主机目录内, 然后将目录挂载到容器内的 `/docker-entrypoint-initdb.d/` 目录. 例如:

```bash
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/scripts/,dst=/docker-entrypoint-initdb.d/ \
-d mysql/mysql-server:tag
```

##### 从另外一个 Docker 容器中的应用连接到 MySQL

通过设置 Docker 网络, 你可以允许多个 Docker 容器之间互相通信, 因此另外一个 Docker 容器中的客户端应用可以访问服务器容器中的 MySQL Server. 首先, 创建 Docker 网络:

```bash
docker network create my-custom-net
```

然后, 当你创建和启动服务器和客户端容器时, use the `--network` option to put them on network you created. 例如:

```bash
docker run --name=mysql1 --network=my-custom-net -d mysql/mysql-server
```
```bash
docker run --name=myapp1 --network=my-custom-net -d myapp
```

`myapp1` 容器可以使用 `mysql1` 主机名连接到 `mysql1`容器, 反之亦然, Docker 会自动为给定的容器名称设置 DNS. 在下面的示例中, 我们运行 `myapp1` 容器中的 [`mysql`](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端连接到 `mysql1` 主机所在的容器:

```bash
docker exec -it myapp1 mysql --host=mysql1 --user=myuser --password
```

关于容器的其他网络技术, 参阅 Docker 文档中的 [Docker 容器网络](https://docs.docker.com/engine/userguide/networking/).

##### 服务器错误日志

当 MySQL Server 首次使用你的服务器容器启动时, 如果满足以下任何一个条件, 则不会生成[服务器错误日志](https://dev.mysql.com/doc/refman/8.0/en/error-log.html):

- 主机中已挂载服务器配置文件, 但是文件不包含系统变量 [`log_error`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_error) (关于 bind-mounting 服务器配置文件参阅 [持久化数据和配置更改](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration)).

- 主机并没有挂载服务器配置文件, 但是 Docker 环境变量 [`MYSQL_LOG_CONSOLE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-log-console) 为 true (MySQL 8.0 服务器容器的变量默认状态). MySQL Server 的错误日志会重定向到 `stderr`, 因此错误日志进入到 Docker 容器日志并且可以使用 `docker logs mysqld-container` 命令查看.

To make MySQL Server generate an error log when either of the two conditions is true, use the [`--log-error`](https://dev.mysql.com/doc/refman/8.0/en/server-options.html#option_mysqld_log-error) option to [configure the server](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-configuring-server) to generate the error log at a specific location inside the container. To persist the error log, mount a host file at the location of the error log inside the container as explained in [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration). 然而, you must make sure your MySQL Server inside its container has write access to the mounted host file.

##### 使用 Docker MySQL 企业版备份

[MySQL Enterprise Backup](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/) is a commercially-licensed backup utility for MySQL Server, available with [MySQL Enterprise Edition](https://www.mysql.com/products/enterprise/). MySQL Enterprise Backup is included in the Docker installation of MySQL Enterprise Edition.

在下面的示例中, 我们假设你已经在 Docker 容器中运行了 MySQL Server (关于如何在 Docker 中启动一个 MySQL Server, 参阅 [2.5.6.1 使用 Docker 部署 MySQL 服务器的基本步骤”](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html)). For MySQL Enterprise Backup to back up the MySQL Server, it must have access to the server's data directory. 可以通过以下方式实现, 例如, [bind-mounting a host directory on the data directory of the MySQL Server](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) when you start the server:

```bash
docker run --name=mysqlserver \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
-d store/oracle/mysql-enterprise-server:8.0
```

With this command, the MySQL Server is started with a Docker image of the MySQL Enterprise Edition, and the host directory `/path-on-host-machine/datadir/` has been mounted onto the server's data directory (`/var/lib/mysql`) inside the server container. We also assume that, after the server has been started, the required privileges have also been set up for MySQL Enterprise Backup to access the server (see [Grant MySQL Privileges to Backup Administrator](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/mysqlbackup.privileges.html) for details). Use the following steps then to backup and restore a MySQL Server instance.

**To backup a MySQL Server instance running in a Docker container using MySQL Enterprise Backup with Docker:**

1. On the same host where the MySQL Server container is running, start another container with an image of MySQL Enterprise Edition to perform a back up with the MySQL Enterprise Backup command [`backup-to-image`](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/backup-commands-backup.html#option_meb_backup-to-image). Provide access to the server's data directory using the bind mount we created in the last step. Also, mount a host directory (`/path-on-host-machine/backups/` in this example) onto the storage folder for backups in the container (`/data/backups` in the example) to persist the backups we are creating. 下面是这个步骤的示例命令:

```bash
shell> docker run \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
--mount type=bind,src=/path-on-host-machine/backups/,dst=/data/backups \ 
--rm store/oracle/mysql-enterprise-server:8.0 \
mysqlbackup -umysqlbackup -ppassword --backup-dir=/tmp/backup-tmp --with-timestamp \
--backup-image=/data/backups/db.mbi backup-to-image

[Entrypoint] MySQL Docker Image 8.0.11-1.1.5
MySQL Enterprise Backup version 8.0.11 Linux-4.1.12-61.1.16.el7uek.x86_64-x86_64 [2018-04-08  07:06:45] 
Copyright (c) 2003, 2018, Oracle and/or its affiliates. All Rights Reserved.

180921 17:27:25 MAIN    INFO: A thread created with Id '140594390935680' 
180921 17:27:25 MAIN    INFO: Starting with following command line ...
...

-------------------------------------------------------------
   Parameters Summary         
-------------------------------------------------------------
   Start LSN                  : 29615616
   End LSN                    : 29651854
-------------------------------------------------------------

mysqlbackup completed OK!
```

It is important to check the end of the output by **mysqlbackup** to make sure the backup has been completed successfully.

2. The container exits once the backup job is finished and, with the `--rm` option used to start it, it is removed after it exits. An image backup has been created, and can be found in the host directory mounted in the last step for storing backups:

```bash
shell> ls /tmp/backups
db.mbi
```

**To restore a MySQL Server instance in a Docker container using MySQL Enterprise Backup with Docker:**

1. 停止 MySQL 服务器容器, 这也会停止在内部运行的 MySQL 服务器:

```bash
docker stop mysqlserver
```

2. On the host, delete all contents in the bind mount for the MySQL Server data directory:

```bash
rm -rf /path-on-host-machine/datadir/*
```

3. Start a container with an image of MySQL Enterprise Edition to perform the restore with the MySQL Enterprise Backup command [`copy-back-and-apply-log`](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/backup-commands-restore.html#option_meb_copy-back-and-apply-log). Bind-mount the server's data directory and the storage folder for the backups, like what we did when we backed up the server:

```bash
shell> docker run \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
--mount type=bind,src=/path-on-host-machine/backups/,dst=/data/backups \ 
--rm store/oracle/mysql-enterprise-server:8.0 \
mysqlbackup --backup-dir=/tmp/backup-tmp --with-timestamp \
--datadir=/var/lib/mysql --backup-image=/data/backups/db.mbi copy-back-and-apply-log

[Entrypoint] MySQL Docker Image 8.0.11-1.1.5
MySQL Enterprise Backup version 8.0.11 Linux-4.1.12-61.1.16.el7uek.x86_64-x86_64 [2018-04-08  07:06:45] 
Copyright (c) 2003, 2018, Oracle and/or its affiliates. All Rights Reserved.

180921 22:06:52 MAIN    INFO: A thread created with Id '139768047519872' 
180921 22:06:52 MAIN    INFO: Starting with following command line ...
...
180921 22:06:52 PCR1    INFO: We were able to parse ibbackup_logfile up to
          lsn 29680612.
180921 22:06:52 PCR1    INFO: Last MySQL binlog file position 0 155, file name binlog.000003
180921 22:06:52 PCR1    INFO: The first data file is '/var/lib/mysql/ibdata1'
                              and the new created log files are at '/var/lib/mysql'
180921 22:06:52 MAIN    INFO: No Keyring file to process.
180921 22:06:52 MAIN    INFO: Apply-log operation completed successfully.
180921 22:06:52 MAIN    INFO: Full Backup has been restored successfully.

mysqlbackup completed OK! with 3 warnings
```

The container exits once the backup job is finished and, with the `--rm` option used when starting it, it is removed after it exits.

4. Restart the server container, which also restarts the restored server:

```bash
docker restart mysqlserver
```

Or, start a new MySQL Server on the restored data directory:

```bash
docker run --name=mysqlserver2 \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
-d store/oracle/mysql-enterprise-server:8.0
```

Log on to the server to check that the server is running with the restored data.

##### Docker 环境变量

当你创建 MySQL 服务器容器时, 你可以使用 `--env` 选项 (`-e`) 并指定一个或者多个下列的环境变量来配置 MySQL 实例.

> **注意**
>
>  - 如果你挂载的数据目录不是空的, 那么下列的变量都不会有效果, 因为服务器没有尝试初始化它们(参阅[持久化数据和配置更改](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration)获取详情). 在容器启动时, 文件夹中任何预先存在的内容, 包括任何旧的服务器配置, 都不会被修改.

> - bool 变量包含 [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password), [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password), [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password), 和 [`MYSQL_LOG_CONSOLE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-log-console) 通过设置一些非0长度的字符串来设置为 true. 因此, 设置它们为如 “0”, “false”, 或者 “no” 并不能使它们为 false, 但实际上让他们为 true. 这对于 MySQL 服务器容器来说是一个已知的问题.

- [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password): 为 true 时(这是它的默认状态, 除非 [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password) 被设置或者 [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password) 设置为 true),  Docker 容器启动的时候, 将为服务器的 root 用户生成一个随机密码. 密码打印到容器的 stdout, 可以通过查看容器的日志找到密码(参阅 [启动 MySQL 服务器实例](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server)).

- [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password): 为 true 时(这是它的默认状态, 除非 [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password) 被设置或者 [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password) 设置为 true), root 用户的密码设置为过期, 必须先更改密码, MySQL 才能正常使用.

- [`MYSQL_DATABASE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_database): 这个变量允许你在镜像启动时指定创建的数据库的名称. 如果使用 [`MYSQL_USER`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password) 和 [`MYSQL_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password)指定了用户名和密码, 创建用户并收钱超级用户对其的访问权限 (对应 `GRANT ALL`). 通过 [CREATE DATABASE IF NOT EXIST](https://dev.mysql.com/doc/refman/8.0/en/create-database.html) 语句创建指定的数据库, 如果数据库已存在则该变量无效.

[`MYSQL_USER`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password), [`MYSQL_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password): 这些变量用户创建用户并设置密码, 授予通过 [`MYSQL_DATABASE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_database) 变量指定数据库的超级用户权限. 在创建用户时同时需要 [`MYSQL_USER`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password) 和 [`MYSQL_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password)—如果未设置两个变量中的任何一个, 则忽略零一个变量. 如果同时设置了这两个变量, 但是没有设置 [`MYSQL_DATABASE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_database), 那么创建的用户没有任何权限.

> **注意**
>
> 不需要使用这个机制来创建 root 超级用户, which is created by default with the password set by either one of the mechanisms discussed in the descriptions for [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password) and [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password), 除非 [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password) 为 true.

- [`MYSQL_ROOT_HOST`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-host): 默认情况下, MySQL 创建 `'root'@'localhost'` 账号. This account can only be connected to from inside the container as described in [Connecting to MySQL Server from within the Container](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-connecting-within-container). 允许其它主机进行 root 连接, 设置此环境变量. 例如, `172.17.0.1`, 这是默认的 Docker 网关 IP, 允许运行容器的主机连接. 该选项只接受一个入口, 但是允许通配符(例如, `MYSQL_ROOT_HOST=172.*.*.*` 或者 `MYSQL_ROOT_HOST=%`).

- [`MYSQL_LOG_CONSOLE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-log-console): 当变量为 true (这是 MySQL 8.0 服务器容器默认的状态), MySQL 服务器的错误日志被重定向到 `stderr`, 所以错误日志就进入到 Docker 容器的日志并且可以使用 `docker logs mysqld-container` 命令查看.

> **注意**
>
> 如果服务器配置文件是从主机中挂载的, 则该变量不起作用 (参阅 [持久化数据和配置更改](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) 中的 bind-mounting 配置文件).

- [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password): 该变量为 MySQL root 账号之指定一个密码.

> **警告**
>
> 在命令上设置 root 用户密码是不安全的. 作为显式指定密码的替代方法, you can set the variable with a container file path for a password file, and then mount a file from your host that contains the password at the container file path. 这仍然不是很安全, 密码文件的位置仍然处于公开状态. 最好使用 [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password) 和 [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) 的默认设置都为 true.

- [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password). 设置它为 true 允许以 root 用户空密码启动容器.

> **警告**
>
> 设置此变量为 true 是不安全的, 因为它将使你的 MySQL 实例完全不受保护, 允许任何人获得完整的 root 用户访问权限. 最好使用 [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password) 和 [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) 的默认设置都为 true.