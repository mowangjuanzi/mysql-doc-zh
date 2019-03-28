## 2.5 在 Linux 上安装 MySQL

Linux 支持多种不同的 Linux 安装解决方案. We recommend that you use one of the distributions from Oracle, for which several methods for installation are available:

**表 2.7 Linux 安装方法和信息**

| 类型 | 设置方法 | 附加信息 |
|:---:|:---:|:---:|
| Apt | 启用 [MySQL Apt repository](https://dev.mysql.com/downloads/repo/apt/) | [文档](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-apt-repo.html) |
| Yum | 启用 [MySQL Yum repository](https://dev.mysql.com/downloads/repo/yum/) | [文档](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-yum-repo.html) |
| Zypper | 启用 [MySQL SLES repository](https://dev.mysql.com/downloads/repo/suse/) | [文档](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-sles-repo.html) |
| RPM | [下载](https://dev.mysql.com/downloads/mysql/)通用包 | [文档](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-rpm.html) |
| DEB | [下载](https://dev.mysql.com/downloads/mysql/)通用包 | [文档](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-debian.html) |
| Generic | [下载](https://dev.mysql.com/downloads/mysql/)通用包 | [文档](https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html) |
| Source | 从[源码](https://dev.mysql.com/downloads/mysql/)编译 | [文档](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html) |
| Docker | 使用 Docker Hub, Docker Store, 或者 Oracle Container Registry | [文档](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-docker.html) |
| Oracle Unbreakable Linux Network | Use ULN channels | [文档](https://dev.mysql.com/doc/refman/8.0/en/uln-installation.html) |

As an alternative, you can use the package manager on your system to automatically download and install MySQL with packages from the native software repositories of your Linux distribution. These native packages are often several versions behind the currently available release. You will also normally be unable to install development milestone releases (DMRs), as these are not usually made available in the native repositories. For more information on using the native package installers, see [Section 2.5.7, “Installing MySQL on Linux from the Native Software Repositories”](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-native.html).

> **注意**
> 
> 对于很多 Linux 安装, 你希望将 MySQL 设置为在计算机启动时自动启动. Many of the native package installations perform this operation for you, but for source, binary and RPM solutions you may need to set this up separately. The required script, [mysql.server](https://dev.mysql.com/doc/refman/8.0/en/mysql-server.html), can be found in the `support-files` directory under the MySQL installation directory or in a MySQL source tree. You can install it as `/etc/init.d/mysql` for automatic MySQL startup and shutdown. See [Section 4.3.3, “**mysql.server** — MySQL Server Startup Script”](https://dev.mysql.com/doc/refman/8.0/en/mysql-server.html).