#### 2.5.6.1 使用 Docker 部署 MySQL 服务器的基本步骤

> **警告**
>
> The MySQL Docker images maintained by the MySQL team are built specifically for Linux platforms. Other platforms are not supported, and users using these MySQL Docker images on them are doing so at their own risk. See the [discussion here](https://dev.mysql.com/doc/refman/8.0/en/deploy-mysql-nonlinux-docker.html) for some known limitations for running these containers on non-Linux operating systems.

##### 接受许可协议并使用Docker Client登录 (MySQL企业版)

_A subscription is required to use the Docker images for MySQL Enterprise Edition._ Subscriptions work by a Bring Your Own License model; see [How to Buy MySQL Products and Services](https://www.mysql.com/buy-mysql/) for details. You also need to accept the license agreement and log in to the container repository before downloading the MySQL Enterprise Edition image.

For downloading from the Oracle Container Registry:

- Visit the Oracle Container Registry at https://container-registry.oracle.com/ and choose MySQL.

- Under the list of MySQL repositories, choose `enterprise-server`.

- If you have not **signed in** to the Oracle Container Registry yet, click the Sign in button on the right of the page, and then enter your Oracle account credentials when prompted to.

- 按照页面右侧的说明接受许可协议.

- Log in to the Oracle Container Registry with your Docker client (the `docker` command). Use the `docker login` command for the purpose:

```bash
# docker login container-registry.oracle.com 
Username: Oracle-Account-ID
Password: password
Login successful.
```

从 Docker 商店下载:

- Visit the MySQL Server Enterprise Edition page at https://store.docker.com/images/mysql-enterprise-server.

- If you have not logged in to the Docker Store yet, do so using the **Log in** link and your Docker credentials.

- Click the **Proceed to Checkout** button that appears.

- 按照页面右侧的说明接受许可协议.

- 使用 Docker 客户端 (`docker` 命令) 登录到 Docker 商店. 使用 `docker login` 命令:

```bash
# docker login
Username: Docker-ID
Password: password
Login successful.
```

##### 下载 MySQL 服务器 Docker 镜像

Downloading the server image in a separate step is not strictly necessary; 然而, 在创建容器之前执行此步骤可以确保本地镜像是最新的. 下载 MySQL 社区版镜像, 运行命令:

```bash
docker pull mysql/mysql-server:tag
```
`tag` 是你想拉取的镜像版本的标签 (例如, `5.5`, `5.6`, `5.7`, `8.0`, 或者 `latest`). 如果 `:tag` 被省略, 将使用 `latest` 标签, 下载 MySQL 社区服务器的最新 GA 版本镜像. Refer to the list of tags for available versions on the [mysql/mysql-server page in the Docker Hub](https://hub.docker.com/r/mysql/mysql-server/tags/).

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

`tag` 有不同的选择, corresponding to the two versions of MySQL Enterprise Edition Docker images provided by the MySQL team at Oracle:

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

`--name` 选项, 用于为服务器容器提供自定义命令 (在本示例中是 `mysql1`), 可选; 如果没有提供容器名称, 会随机生成一个. If the Docker image of the specified name and tag has not been downloaded by an earlier `docker pull` or `docker run` command, the image is now downloaded. 下载完成后, 开始初始化容器, 当你运行 `docker ps` 命令时, 容器会出现在正在运行的容器列表中; 例如:

```bash
shell> docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS                              PORTS                NAMES
a24888f0d6f4   mysql/mysql-server   "/entrypoint.sh my..."   14 seconds ago      Up 13 seconds (health: starting)    3306/tcp, 33060/tcp  mysql1
```

The container initialization might take some time. When the server is ready for use, the STATUS of the container in the output of the `docker ps` command changes from `(health: starting)` to `(healthy)`.

The `-d` option used in the `docker run` command above makes the container run in the background. 使用这个命令监视容器的输出:

```bash
docker logs mysql1
```

初始化完成后, 命令输出包含为 root 用户生成的随机密码; 例如, 使用这个命令查询密码:

```bash
shell> docker logs mysql1 2>&1 | grep GENERATED
GENERATED ROOT PASSWORD: Axegh3kAJyDLaRuBemecis&EShOs
```

##### 从容器内连接到 MySQL 服务器

Once the server is ready, you can run the [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client within the MySQL Server container you just started, and connect it to the MySQL Server. Use the `docker exec -it` command to start a [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client inside the Docker container you have started, like the following:

```bash
docker exec -it mysql1 mysql -uroot -p
```

当询问时, 输入生成的 root 密码 (see the last step in [Starting a MySQL Server Instance](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server) above on how to find the password). 因为 [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) 选项默认为 true, 当 [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) 客户端连接服务器之后, 你必须通过发出此语句重置服务器 root 密码:

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
```

Substitute `password` with the password of your choice. 重置密码后, 服务器就可以使用了.

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

If you want the [Docker volume for the server's data directory](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) to be deleted at the same time, add the `-v` option to the `docker rm` command.

##### 升级 MySQL 服务器容器

> **重要**
>
> - 在执行任何 MySQL 升级之前, 请仔细阅读 [2.11节, “升级 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html) 中的说明. Among other instructions discussed there, 在升级前备份你的数据至关重要.
> - The instructions in this section require that the server's data and configuration have been persisted on the host. See [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) for details.

按照以下步骤 MySQL Docker 安装从 5.7 升级到 8.0:

- 停止 MySQL 5.7 服务器 (在这个示例中容器名称是 mysql57):

```bash
docker stop mysql57
```

- 下载 MySQL 8.0 服务器 Docker 镜像. See instructions in [Downloading a MySQL Server Docker Image](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-download-image); 确保你对 MySQL 8.0 使用了正确的 tag.

- 使用在这个主机上持久化的 (在本例中使用 [bind-mounting](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-or-volumes) in this example) 旧的服务器数据和配置 (如有需要可适当修改—参阅 [2.11节, “升级 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html)) 启动新的 MySQL 8.0 Docker 容器 (在这个示例中命名为 `mysql80`). MySQL 社区服务器, 运行命令:

```bash
docker run --name=mysql80 \
   --mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
   --mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \        
   -d mysql/mysql-server:8.0
```

如果需要, 调整 `mysql/mysql-server` 为正确的库名称. 例如, replace it with `store/oracle/mysql-enterprise-server` for MySQL Enterprise Edition images from the Docker Store, or with `container-registry.oracle.com/mysql/enterprise-server` for the MySQL Enterprise Edition images from the Oracle Container Registry.

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