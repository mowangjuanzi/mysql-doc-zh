#### 2.5.6.1 Basic Steps for MySQL Server Deployment with Docker

> **Warning**
>
> The MySQL Docker images maintained by the MySQL team are built specifically for Linux platforms. Other platforms are not supported, and users using these MySQL Docker images on them are doing so at their own risk. See the [discussion here](https://dev.mysql.com/doc/refman/8.0/en/deploy-mysql-nonlinux-docker.html) for some known limitations for running these containers on non-Linux operating systems.

##### Accepting the License Agreement and Logging in with the Docker Client (for MySQL Enterprise Edition)

_A subscription is required to use the Docker images for MySQL Enterprise Edition._ Subscriptions work by a Bring Your Own License model; see [How to Buy MySQL Products and Services](https://www.mysql.com/buy-mysql/) for details. You also need to accept the license agreement and log in to the container repository before downloading the MySQL Enterprise Edition image.

For downloading from the Oracle Container Registry:

- Visit the Oracle Container Registry at https://container-registry.oracle.com/ and choose MySQL.

- Under the list of MySQL repositories, choose `enterprise-server`.

- If you have not signed in to the Oracle Container Registry yet, click the **Sign in** button on the right of the page, and then enter your Oracle account credentials when prompted to.

- Follow the instructions on the right of the page to accept the license agreement.

- Log in to the Oracle Container Registry with your Docker client (the `docker` command). Use the `docker login` command for the purpose:

```bash
# docker login container-registry.oracle.com 
Username: Oracle-Account-ID
Password: password
Login successful.
```

For downloading from the Docker Store:

- Visit the MySQL Server Enterprise Edition page at https://store.docker.com/images/mysql-enterprise-server.

- If you have not logged in to the Docker Store yet, do so using the **Log in** link and your Docker credentials.

- Click the **Proceed to Checkout** button that appears.

- Follow the instructions on the right of the page to accept the license agreement.

- Log in to the Docker Store with your Docker client (the `docker` command). Use the `docker login` command for the purpose:

```bash
# docker login
Username: Docker-ID
Password: password
Login successful.
```

##### Downloading a MySQL Server Docker Image

Downloading the server image in a separate step is not strictly necessary; however, performing this step before you create your Docker container ensures your local image is up to date. To download the MySQL Community Edition image, run this command:

```bash
docker pull mysql/mysql-server:tag
```
The `tag` is the label for the image version you want to pull (for example, `5.5`, `5.6`, `5.7`, `8.0`, or `latest`). If `:tag` is omitted, the `latest` label is used, and the image for the latest GA version of MySQL Community Server is downloaded. Refer to the list of tags for available versions on the [mysql/mysql-server page in the Docker Hub](https://hub.docker.com/r/mysql/mysql-server/tags/).

You can list downloaded Docker images with this command:

```bash
shell> docker images
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
mysql/mysql-server   latest              3157d7f55f8d        4 weeks ago         241MB
```

To download the MySQL Enterprise Edition image from the Docker Store, run this command:

```bash
docker pull  store/oracle/mysql-enterprise-server:tag
```

To download the MySQL Enterprise Edition image from the Oracle Container Registry, run this command:

```bash
docker pull  container-registry.oracle.com/mysql/enterprise-server:tag
```

There are different choices for `tag`, corresponding to the two versions of MySQL Enterprise Edition Docker images provided by the MySQL team at Oracle:

`8.0`, `8.0.x` (`x` is the latest version number in the 8.0 series): MySQL Enterprise Edition 8.0, the latest GA

`5.7`, `5.7.y` (`y` is the latest version number in the 5.7 series): MySQL Enterprise Edition 5.7

##### Starting a MySQL Server Instance

Start a new Docker container for the MySQL Community Server with this command:

```bash
docker run --name=mysql1 -d mysql/mysql-server:tag
```

Start a new Docker container for the MySQL Enterprise Server with this command, if the Docker image was downloaded from the Oracle Container Registry:

```bash
docker run --name=mysql1 -d container-registry.oracle.com/mysql/enterprise-server:tag
```

Start a new Docker container for the MySQL Enterprise Server with this command, if the Docker image was downloaded from the Docker Store:

```bash
docker run --name=mysql1 -d store/oracle/mysql-enterprise-server:tag
```

The `--name` option, for supplying a custom name for your server container (`mysql1` in the example), is optional; if no container name is supplied, a random one is generated. If the Docker image of the specified name and tag has not been downloaded by an earlier `docker pull` or `docker run` command, the image is now downloaded. After download completes, initialization for the container begins, and the container appears in the list of running containers when you run the `docker ps` command; for example:

```bash
shell> docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS                              PORTS                NAMES
a24888f0d6f4   mysql/mysql-server   "/entrypoint.sh my..."   14 seconds ago      Up 13 seconds (health: starting)    3306/tcp, 33060/tcp  mysql1
```

The container initialization might take some time. When the server is ready for use, the STATUS of the container in the output of the `docker ps` command changes from `(health: starting)` to `(healthy)`.

The `-d` option used in the `docker run` command above makes the container run in the background. Use this command to monitor the output from the container:

```bash
docker logs mysql1
```

Once initialization is finished, the command's output is going to contain the random password generated for the root user; check the password with, for example, this command:

```bash
shell> docker logs mysql1 2>&1 | grep GENERATED
GENERATED ROOT PASSWORD: Axegh3kAJyDLaRuBemecis&EShOs
```

##### Connecting to MySQL Server from within the Container

Once the server is ready, you can run the [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client within the MySQL Server container you just started, and connect it to the MySQL Server. Use the `docker exec -it` command to start a [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client inside the Docker container you have started, like the following:

```bash
docker exec -it mysql1 mysql -uroot -p
```

When asked, enter the generated root password (see the last step in [Starting a MySQL Server Instance](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server) above on how to find the password). Because the [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) option is true by default, after you have connected a [mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client to the server, you must reset the server root password by issuing this statement:

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
```

Substitute `password` with the password of your choice. Once the password is reset, the server is ready for use.

##### Container Shell Access

To have shell access to your MySQL Server container, use the `docker exec -it` command to start a bash shell inside the container:

```bash
shell> docker exec -it mysql1 bash 
bash-4.2#
```

You can then run Linux commands inside the container. For example, to view contents in the server's data directory inside the container, use this command:

```bash
bash-4.2# ls /var/lib/mysql
auto.cnf    ca.pem	     client-key.pem  ib_logfile0  ibdata1  mysql       mysql.sock.lock	   private_key.pem  server-cert.pem  sys
ca-key.pem  client-cert.pem  ib_buffer_pool  ib_logfile1  ibtmp1   mysql.sock  performance_schema  public_key.pem   server-key.pem
```

##### Stopping and Deleting a MySQL Container

To stop the MySQL Server container we have created, use this command:

```bash
docker stop mysql1
```

`docker stop` sends a SIGTERM signal to the [mysqld](https://dev.mysql.com/doc/refman/8.0/en/mysqld.html) process, so that the server is shut down gracefully.

Also notice that when the main process of a container ([mysqld](https://dev.mysql.com/doc/refman/8.0/en/mysqld.html) in the case of a MySQL Server container) is stopped, the Docker container stops automatically.

To start the MySQL Server container again:

```bash
docker start mysql1
```

To stop and start again the MySQL Server container with a single command:

```bash
docker restart mysql1
```

To delete the MySQL container, stop it first, and then use the `docker rm` command:

```bash
docker stop mysql1
```
```bash
docker rm mysql1
```

If you want the [Docker volume for the server's data directory](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) to be deleted at the same time, add the `-v` option to the `docker rm` command.

##### Upgrading a MySQL Server Container

> **Important**
>
> - Before performing any upgrade to MySQL, follow carefully the instructions in [Section 2.11, “Upgrading MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html). Among other instructions discussed there, it is especially important to back up your database before the upgrade.
> - The instructions in this section require that the server's data and configuration have been persisted on the host. See [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) for details.

Follow these steps to upgrade a Docker installation of MySQL 5.7 to 8.0:

- Stop the MySQL 5.7 server (container name is mysql57 in this example):

```bash
docker stop mysql57
```

- Download the MySQL 8.0 Server Docker image. See instructions in [Downloading a MySQL Server Docker Image](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-download-image); make sure you use the right tag for MySQL 8.0.

- Start a new MySQL 8.0 Docker container (named `mysql80` in this example) with the old server data and configuration (with proper modifications if needed—see [Section 2.11, “Upgrading MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html)) that have been persisted on the host (by [bind-mounting](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-or-volumes) in this example). For the MySQL Community Server, run this command:

```bash
docker run --name=mysql80 \
   --mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
   --mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \        
   -d mysql/mysql-server:8.0
```

If needed, adjust `mysql/mysql-server` to the correct repository name—for example, replace it with `store/oracle/mysql-enterprise-server` for MySQL Enterprise Edition images from the Docker Store, or with `container-registry.oracle.com/mysql/enterprise-server` for the MySQL Enterprise Edition images from the Oracle Container Registry.

- Wait for the server to finish startup. You can check the status of the server using the `docker ps` command (see [Starting a MySQL Server Instance](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server) for how to do that).

- *For MySQL 8.0.15 and ealrier*: Run the [mysql_upgrade](https://dev.mysql.com/doc/refman/8.0/en/mysql-upgrade.html) utility in the MySQL 8.0 Server container (not required for MySQL 8.0.16 and later):

```bash
docker exec -it mysql80 mysql_upgrade -uroot -p
```

When prompted, enter the root password for your old MySQL 5.7 Server.

- Finish the upgrade by restarting the MySQL 8.0 Server container:

```bash
docker restart mysql80
```

##### More Topics on Deploying MySQL Server with Docker

For more topics on deploying MySQL Server with Docker like server configuration, persisting data and configuration, server error log, and container environment variables, see [Section 2.5.6.2, “More Topics on Deploying MySQL Server with Docker”](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html).