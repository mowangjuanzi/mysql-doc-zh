#### 2.5.6.1 使用 Docker 部署 MySQL 服务器的基本步骤

> **警告**
>
> MySQL 团队维护的 MySQL Docker 镜像是专门为 Linux 平台构建的. 不支持其他平台, 使用这些 MySQL Docker 镜像的用户自行承担风险. 有关在非 Linux 操作系统中运行这些容器的一些已知限制, 请参阅[此处的讨论](https://dev.mysql.com/doc/refman/8.0/en/deploy-mysql-nonlinux-docker.html).

##### 接受许可协议并使用Docker Client登录 (MySQL企业版)

_使用 MySQL 企业版的 Docker 镜像需要订阅._ 订阅的工作原理是携带你自己的许可证模型; 参阅 [如何购买 MySQL 产品和服务](https://www.mysql.com/buy-mysql/) 获取详情. 在下载 MySQL 企业版镜像之前, 你需要接受许可协议并登录到容器库.

从 Oracle 容器库下载:

- 在 https://container-registry.oracle.com/ 浏览 Oracle 容器库并选择 MySQL.

- 在 MySQL 库列表下, 选择 `enterprise-server`.

- 如果你至今没有登录到 Oracle 容器库, 点击页面右侧的 `Sign in` 按钮, 然后在提示时输入你的 Oracle 账户凭证.

- 按照页面右侧的说明接受许可协议.

- 使用你的 Docker 客户端 (`docker` 命令) 登录 Oracle 容器源. 使用 `docker login` 命令:

```bash
# docker login container-registry.oracle.com 
Username: Oracle-Account-ID
Password: password
Login successful.
```

从 Docker 商店下载:

- 在 https://store.docker.com/images/mysql-enterprise-server 浏览 MySQL 服务器企业版页面.

- 如果你还没登录到 Docker 商店, 使用 **Log in** 链接和你的 Docker 证书进行登录.

- 点击出现的 **Proceed to Checkout** 按钮.

- 按照页面右侧的说明接受许可协议.

- 使用 Docker 客户端 (`docker` 命令) 登录到 Docker 商店. 使用 `docker login` 命令:

```bash
# docker login
Username: Docker-ID
Password: password
Login successful.
```

##### 下载 MySQL 服务器 Docker 镜像

严格来说, 在单独的步骤中下载服务器镜像不是必需的; 然而, 在创建容器之前执行此步骤可以确保本地镜像是最新的. 下载 MySQL 社区版镜像, 运行命令:

```bash
docker pull mysql/mysql-server:tag
```
`tag` 是你想拉取的镜像版本的标签 (例如, `5.5`, `5.6`, `5.7`, `8.0`, 或者 `latest`). 如果 `:tag` 被省略, 将使用 `latest` 标签, 下载 MySQL 社区服务器的最新 GA 版本镜像. 在 [Docker Hub 的 mysql/mysql-server 页面](https://hub.docker.com/r/mysql/mysql-server/tags/) 参考可用版本的标签列表.

列出已下载的 Docker 镜像:

```bash
shell> docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
mysql/mysql-server   latest              3157d7f55f8d        4 weeks ago         241MB
```

从 Docker 商店下载 MySQL 企业版镜像:

```bash
docker pull  store/oracle/mysql-enterprise-server:tag
```

从 Oracle 容器源下载 MySQL 企业版镜像:

```bash
docker pull  container-registry.oracle.com/mysql/enterprise-server:tag
```

`tag` 有不同的选择, 对应 MySQL 团队在 Oracle 提供的两个版本的 MySQL 企业版 Docker 镜像:

`8.0`, `8.0.x` (`x` 是 8.0 系列的最新版本号): MySQL 8.0 企业版，最新的GA

`5.7`, `5.7.y` (`y` 是 85.7 系列的最新版本号): MySQL 5.7 企业版

##### 启动 MySQL 服务器实例

为 MySQL 社区版服务器启动一个新的 Docker 容器:

```bash
docker run --name=mysql1 -d mysql/mysql-server:tag
```

使用此命令为 MySQL 企业版服务器启动一个新的 Docker 容器, 如果 Docker 镜像是从 Oracle 容器库中下载的:

```bash
docker run --name=mysql1 -d container-registry.oracle.com/mysql/enterprise-server:tag
```

使用此命令为 MySQL 企业版服务器启动一个新的 Docker 容器, 如果 Docker 镜像是从 Docker 商店下载的:

```bash
docker run --name=mysql1 -d store/oracle/mysql-enterprise-server:tag
```

`--name` 选项, 用于为服务器容器提供自定义命令 (在本示例中是 `mysql1`), 可选; 如果没有提供容器名称, 会随机生成一个. 如果指定名称和 tag 的镜像没有在以前通过 `docker pull` 或者 `docker run` 命令下载, 则现在讲下载该镜像. 下载完成后, 开始初始化容器, 当你运行 `docker ps` 命令时, 容器会出现在正在运行的容器列表中; 例如:

```bash
shell> docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS                              PORTS                NAMES
a24888f0d6f4   mysql/mysql-server   "/entrypoint.sh my..."   14 seconds ago      Up 13 seconds (health: starting)    3306/tcp, 33060/tcp  mysql1
```

容器初始化可能需要一些时间. 当服务器准备好使用时, 容器在状态在 `docker ps` 命令的输出中从 `(health: starting)` 到 `(healthy)`.

在 `docker run` 命令中使用 `-d` 选项使容器在后台运行. 使用这个命令监视容器的输出:

```bash
docker logs mysql1
```

初始化完成后, 命令输出包含为 root 用户生成的随机密码; 例如, 使用这个命令查询密码:

```bash
shell> docker logs mysql1 2>&1 | grep GENERATED
GENERATED ROOT PASSWORD: Axegh3kAJyDLaRuBemecis&EShOs
```

##### 从容器内连接到 MySQL 服务器

一旦服务器准备好了, 你可以在你刚启动的 MySQL Server 容器中运行 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端, 并连接到 MySQL Server. 使用 `docker exec -it` 命令在已运行的 Docker 容器内启动 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端, 如下所示:

```bash
docker exec -it mysql1 mysql -uroot -p
```

当询问时, 输入生成的 root 密码 (有关如何查找密码, 请参阅 [启动 MySQL 服务器实例](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server) 的最后一步). 因为 [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) 选项默认为 true, 当 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端连接服务器之后, 你必须通过发出此语句重置服务器 root 密码:

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
```

使用你选择的密码替换 `password`. 重置密码后, 服务器就可以使用了.

##### 容器 Shell 访问

让 shell 访问 MySQL 服务器容器, 使用 `docker exec -it` 命令在容器内启动 bash shell:

```bash
shell> docker exec -it mysql1 bash 
bash-4.2#
```

然后可以在容器中运行 Linux 命令. 例如, 查看容器内服务器数据目录的内容, 使用此命令:

```bash
bash-4.2# ls /var/lib/mysql
auto.cnf    ca.pem	     client-key.pem  ib_logfile0  ibdata1  mysql       mysql.sock.lock	   private_key.pem  server-cert.pem  sys
ca-key.pem  client-cert.pem  ib_buffer_pool  ib_logfile1  ibtmp1   mysql.sock  performance_schema  public_key.pem   server-key.pem
```

##### 停止和删除 MySQL 容器

停止我们创建的 MySQL 服务器容器, 使用这个命令:

```bash
docker stop mysql1
```

`docker stop` 发送 SIGTERM 信号到 [mysqld](https://dev.mysql.com/doc/refman/8.0/en/mysqld.html) 进程, 以便服务器正常关闭.

请注意, 当容器的主进程 (MySQL 服务器容器中的 [mysqld](https://dev.mysql.com/doc/refman/8.0/en/mysqld.html)) 停止时, Docker 容器也会自动停止.

再次启动 MySQL 服务器容器:

```bash
docker start mysql1
```

重启 MySQL 服务器容器:

```bash
docker restart mysql1
```

删除 MySQL 容器, 先停止, 然后使用 `docker rm` 命令:

```bash
docker stop mysql1
```
```bash
docker rm mysql1
```

如果你想同时删除 [服务器数据目录的 Docker volume](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration), 添加 `-v` 选项到 `docker rm` 命令.

##### 升级 MySQL 服务器容器

> **重要**
>
> - 在执行任何 MySQL 升级之前, 请仔细阅读 [2.11节, “升级 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html) 中的说明. 在这里讨论的其他说明中, 在升级前备份你的数据尤为重要.
> - 本节要求在主机上保留服务器的数据和配置. 参阅 [保留数据和配置更改](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) 获取详情.

按照以下步骤 MySQL Docker 安装从 5.7 升级到 8.0:

- 停止 MySQL 5.7 服务器 (在这个示例中容器名称是 mysql57):

```bash
docker stop mysql57
```

- 下载 MySQL 8.0 服务器 Docker 镜像. 请参阅[下载 MySQL 服务器 Docker 镜像](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-download-image); 确保你对 MySQL 8.0 使用了正确的 tag.

- 使用在这个主机上持久化的 (在本例中使用 [bind-mounting](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-or-volumes)) 旧的服务器数据和配置 (如有需要可适当修改—参阅 [2.11节, “升级 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html)) 启动新的 MySQL 8.0 Docker 容器 (在这个示例中命名为 `mysql80`). MySQL 社区服务器, 运行命令:

```bash
docker run --name=mysql80 \
   --mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
   --mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \        
   -d mysql/mysql-server:8.0
```

如果需要, 调整 `mysql/mysql-server` 为正确的库名称. 例如, 替换为 `store/oracle/mysql-enterprise-server` 是 Docker 商店的 MySQL 企业版镜像, 或者 `container-registry.oracle.com/mysql/enterprise-server` 是 Oracle 容器库的 MySQL 企业版镜像.

- 等待服务器完成启动. 你可以使用 `docker ps` 命令检查服务器的状态 (参阅 [启动 MySQL 服务器实例](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server) 获取如何操作).

- *对于 MySQL 8.0.15 和更早的*: 在 MySQL 8.0 服务器容器中运行 [mysql_upgrade](https://dev.mysql.com/doc/refman/8.0/en/mysql-upgrade.html) 工具 (不支持 MySQL 8.0.16 和更高版本):

```bash
docker exec -it mysql80 mysql_upgrade -uroot -p
```

当提示时, 输入你的旧的 MySQL 5.7 服务器 root 密码.

- 通过重启 MySQL 8.0 服务器容器完成升级:

```bash
docker restart mysql80
```

##### 使用 Docker 部署 MySQL 服务器的更多主题

有关使用Docker部署MySQL服务器的更多主题, 例如服务器配置, 持久化数据和配置, 服务器错误日志, 和容器环境变量, 参阅 [2.5.6.2节, “使用 Docker 部署 MySQL 服务器的更多主题”](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html).