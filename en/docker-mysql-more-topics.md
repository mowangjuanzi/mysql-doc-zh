#### 2.5.6.2 More Topics on Deploying MySQL Server with Docker

> **Note**
>
> Most of the sample commands below have `mysql/mysql-server` as the Docker image repository when that has to be specified (like with the `docker pull` and `docker run` commands); change that if your image is from another repository—for example, replace it with `store/oracle/mysql-enterprise-server` for MySQL Enterprise Edition images from the Docker Store, or with `container-registry.oracle.com/mysql/enterprise-server` for MySQL Enterprise Edition images from the Oracle Container Registry.

##### The Optimized MySQL Installation for Docker

Docker images for MySQL are optimized for code size, which means they only include crucial components that are expected to be relevant for the majority of users who run MySQL instances in Docker containers. A MySQL Docker installation is different from a common, non-Docker installation in the following aspects:

- Included binaries are limited to:

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

    - `/usr/bin/mysqlbackup` (for MySQL Enterprise Edition 8.0 only)

    - `/usr/sbin/mysqld`

- All binaries are stripped; they contain no debug information.

##### Configuring the MySQL Server

When you start the MySQL Docker container, you can pass configuration options to the server through the `docker run` command; for example:

```bash
docker run --name mysql1 -d mysql/mysql-server:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_col
```

The command starts your MySQL Server with `utf8mb4` as the default character set and `utf8mb4_col` as the default collation for your databases.

Another way to configure the MySQL Server is to prepare a configuration file and mount it at the location of the server configuration file inside the container. See [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) for details.

##### Persisting Data and Configuration Changes

Docker containers are in principle ephemeral, and any data or configuration are expected to be lost if the container is deleted or corrupted (see discussions [here](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)). [Docker volumes](https://docs.docker.com/engine/admin/volumes/volumes/), however, provides a mechanism to persist data created inside a Docker container. At its initialization, the MySQL Server container creates a Docker volume for the server data directory. The JSON output for running the `docker inspect` command on the container has a `Mount` key, whose value provides information on the data directory volume:

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

The output shows that the source folder `/var/lib/docker/volumes/4f2d463cfc4bdd4baebcb098c97d7da3337195ed2c6572bc0b89f7e845d27652/_data`, in which data is persisted on the host, has been mounted at `/var/lib/mysql`, the server data directory inside the container.

Another way to preserve data is to [bind-mount](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-volumes-or-memory-filesystems) a host directory using the `--mount` option when creating the container. The same technique can be used to persist the configuration of the server. The following command creates a MySQL Server container and bind-mounts both the data directory and the server configuration file:

```bash
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
--mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \
-d mysql/mysql-server:tag
```

The command mounts `path-on-host-machine/my.cnf` at `/etc/my.cnf` (the server configuration file inside the container), and `path-on-host-machine/datadir` at `/var/lib/mysql` (the data directory inside the container). The following conditions must be met for the bind-mounting to work:

- The configuration file path-on-host-machine/my.cnf must already exist, and it must contain the specification for starting the server using the user mysql:

```ini
[mysqld]
user=mysql
```

You can also include other server configuration options in the file.

- The data directory `path-on-host-machine/datadir` must already exist. For server initialization to happen, the directory must be empty. You can also mount a directory prepopulated with data and start the server with it; however, you must make sure you start the Docker container with the same configuration as the server that created the data, and any host files or directories required are mounted when starting the container.

##### Running Additional Initialization Scripts

If there are any `.sh` or `.sql` scripts you want to run on the database immediately after it has been created, you can put them into a host directory and then mount the directory at `/docker-entrypoint-initdb.d/` inside the container. For example:

```bash
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/scripts/,dst=/docker-entrypoint-initdb.d/ \
-d mysql/mysql-server:tag
```

##### Connect to MySQL from an Application in Another Docker Container

By setting up a Docker network, you can allow multiple Docker containers to communicate with each other, so that a client application in another Docker container can access the MySQL Server in the server container. First, create a Docker network:

```bash
docker network create my-custom-net
```

Then, when you are creating and starting the server and the client containers, use the `--network` option to put them on network you created. For example:

```bash
docker run --name=mysql1 --network=my-custom-net -d mysql/mysql-server
```
```bash
docker run --name=myapp1 --network=my-custom-net -d myapp
```

The `myapp1` container can then connect to the `mysql1` container with the `mysql1` hostname and vice versa, as Docker automatically sets up a DNS for the given container names. In the following example, we run the [`mysql`](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) client from inside the `myapp1` container to connect to host `mysql1` in its own container:

```bash
docker exec -it myapp1 mysql --host=mysql1 --user=myuser --password
```

For other networking techniques for containers, see the [Docker container networking](https://docs.docker.com/engine/userguide/networking/) section in the Docker Documentation.

##### Server Error Log

When the MySQL Server is first started with your server container, a [server error log](https://dev.mysql.com/doc/refman/8.0/en/error-log.html) is NOT generated if either of the following conditions is true:

- A server configuration file from the host has been mounted, but the file does not contain the system variable [`log_error`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_log_error) (see [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) on bind-mounting a server configuration file).

- A server configuration file from the host has not been mounted, but the Docker environment variable [`MYSQL_LOG_CONSOLE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-log-console) is true (which is the variable's default state for MySQL 8.0 server containers). The MySQL Server's error log is then redirected to `stderr`, so that the error log goes into the Docker container's log and is viewable using the `docker logs mysqld-container` command.

To make MySQL Server generate an error log when either of the two conditions is true, use the [`--log-error`](https://dev.mysql.com/doc/refman/8.0/en/server-options.html#option_mysqld_log-error) option to [configure the server](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-configuring-server) to generate the error log at a specific location inside the container. To persist the error log, mount a host file at the location of the error log inside the container as explained in [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration). However, you must make sure your MySQL Server inside its container has write access to the mounted host file.

##### Using MySQL Enterprise Backup with Docker

[MySQL Enterprise Backup](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/) is a commercially-licensed backup utility for MySQL Server, available with [MySQL Enterprise Edition](https://www.mysql.com/products/enterprise/). MySQL Enterprise Backup is included in the Docker installation of MySQL Enterprise Edition.

In the following example, we assume that you already have a MySQL Server running in a Docker container (see [Section 2.5.6.1, “Basic Steps for MySQL Server Deployment with Docker”](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html) on how to start a MySQL Server instance with Docker). For MySQL Enterprise Backup to back up the MySQL Server, it must have access to the server's data directory. This can be achieved by, for example, [bind-mounting a host directory on the data directory of the MySQL Server](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) when you start the server:

```bash
docker run --name=mysqlserver \
--mount type=bind,src=/path-on-host-machine/datadir/,dst=/var/lib/mysql \
-d store/oracle/mysql-enterprise-server:8.0
```

With this command, the MySQL Server is started with a Docker image of the MySQL Enterprise Edition, and the host directory `/path-on-host-machine/datadir/` has been mounted onto the server's data directory (`/var/lib/mysql`) inside the server container. We also assume that, after the server has been started, the required privileges have also been set up for MySQL Enterprise Backup to access the server (see [Grant MySQL Privileges to Backup Administrator](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/mysqlbackup.privileges.html) for details). Use the following steps then to backup and restore a MySQL Server instance.

**To backup a MySQL Server instance running in a Docker container using MySQL Enterprise Backup with Docker:**

1. On the same host where the MySQL Server container is running, start another container with an image of MySQL Enterprise Edition to perform a back up with the MySQL Enterprise Backup command [`backup-to-image`](https://dev.mysql.com/doc/mysql-enterprise-backup/8.0/en/backup-commands-backup.html#option_meb_backup-to-image). Provide access to the server's data directory using the bind mount we created in the last step. Also, mount a host directory (`/path-on-host-machine/backups/` in this example) onto the storage folder for backups in the container (`/data/backups` in the example) to persist the backups we are creating. Here is a sample command for this step:

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

1. Stop the MySQL Server container, which also stops the MySQL Server running inside:

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

##### Docker Environment Variables

When you create a MySQL Server container, you can configure the MySQL instance by using the `--env` option (`-e` in short) and specifying one or more of the following environment variables.

> Notes
>
>  - None of the variables below has any effect if the data directory you mount is not empty, as no server initialization is going to be attempted then (see [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) for more details). Any pre-existing contents in the folder, including any old server settings, are not modified during the container startup.

> - The boolean variables including [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password), [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password), [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password), and [`MYSQL_LOG_CONSOLE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-log-console) are made true by setting them with any strings of nonzero lengths. Therefore, setting them to, for example, “0”, “false”, or “no” does not make them false, but actually makes them true. This is a known issue of the MySQL Server containers.

- [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password): When this variable is true (which is its default state, unless [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password) is set or [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password) is set to true), a random password for the server's root user is generated when the Docker container is started. The password is printed to stdout of the container and can be found by looking at the container’s log (see [Starting a MySQL Server Instance](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server)).

- [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password): When the variable is true (which is its default state, unless [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password) is set or [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password) is set to true), the root user's password is set as expired and must be changed before MySQL can be used normally.

- [`MYSQL_DATABASE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_database): This variable allows you to specify the name of a database to be created on image startup. If a user name and a password are supplied with [`MYSQL_USER`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password) and [`MYSQL_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password), the user is created and granted superuser access to this database (corresponding to `GRANT ALL`). The specified database is created by a [CREATE DATABASE IF NOT EXIST](https://dev.mysql.com/doc/refman/8.0/en/create-database.html) statement, so that the variable has no effect if the database already exists.

[`MYSQL_USER`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password), [`MYSQL_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password): These variables are used in conjunction to create a user and set that user's password, and the user is granted superuser permissions for the database specified by the [`MYSQL_DATABASE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_database) variable. Both [`MYSQL_USER`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password) and [`MYSQL_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_user_password) are required for a user to be created—if any of the two variables is not set, the other is ignored. If both variables are set but [`MYSQL_DATABASE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_database) is not, the user is created without any privileges.

> **Note**
>
> There is no need to use this mechanism to create the root superuser, which is created by default with the password set by either one of the mechanisms discussed in the descriptions for [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password) and [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password), unless [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password) is true.

- [`MYSQL_ROOT_HOST`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-host): By default, MySQL creates the `'root'@'localhost'` account. This account can only be connected to from inside the container as described in [Connecting to MySQL Server from within the Container](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-connecting-within-container). To allow root connections from other hosts, set this environment variable. For example, the value `172.17.0.1`, which is the default Docker gateway IP, allows connections from the host machine that runs the container. The option accepts only one entry, but wildcards are allowed (for example, `MYSQL_ROOT_HOST=172.*.*.*` or `MYSQL_ROOT_HOST=%`).

- [`MYSQL_LOG_CONSOLE`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-log-console): When the variable is true (which is its default state for MySQL 8.0 server containers), the MySQL Server's error log is redirected to `stderr`, so that the error log goes into the Docker container's log and is viewable using the `docker logs mysqld-container` command.

> **Note**
>
> The variable has no effect if a server configuration file from the host has been mounted (see [Persisting Data and Configuration Changes](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration) on bind-mounting a configuration file).

- [`MYSQL_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-root-password): This variable specifies a password that is set for the MySQL root account.

> **Warning**
>
> Setting the MySQL root user password on the command line is insecure. As an alternative to specifying the password explicitly, you can set the variable with a container file path for a password file, and then mount a file from your host that contains the password at the container file path. This is still not very secure, as the location of the password file is still exposed. It is preferable to use the default settings of [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password) and [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) both being true.

- [`MYSQL_ALLOW_EMPTY_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql-allow-empty-password). Set it to true to allow the container to be started with a blank password for the root user.

> **Warning**
>
> Setting this variable to true is insecure, because it is going to leave your MySQL instance completely unprotected, allowing anyone to gain complete superuser access. It is preferable to use the default settings of [`MYSQL_RANDOM_ROOT_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_random_root_password) and [`MYSQL_ONETIME_PASSWORD`](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker_var_mysql_onetime_password) both being true.