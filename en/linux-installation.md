## 2.5 Installing MySQL on Linux

Linux supports a number of different solutions for installing MySQL. We recommend that you use one of the distributions from Oracle, for which several methods for installation are available:

**Table 2.7 Linux Installation Methods and Information**

| Type | Setup Method | Additional Information |
|:---:|:---:|:---:|
| Apt | Enable the [MySQL Apt repository](https://dev.mysql.com/downloads/repo/apt/) | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-apt-repo.html) |
| Yum | Enable the [MySQL Yum repository](https://dev.mysql.com/downloads/repo/yum/) | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-yum-repo.html) |
| Zypper | Enable the [MySQL SLES repository](https://dev.mysql.com/downloads/repo/suse/) | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-sles-repo.html) |
| RPM | [Download](https://dev.mysql.com/downloads/mysql/) a specific package | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-rpm.html) |
| DEB | [Download](https://dev.mysql.com/downloads/mysql/) a specific package | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-debian.html) |
| Generic | [Download](https://dev.mysql.com/downloads/mysql/) a generic package | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html) |
| Source | Compile from [source](https://dev.mysql.com/downloads/mysql/) | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html) |
| Docker | Use Docker Hub, Docker Store, or Oracle Container Registry | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-docker.html) |
| Oracle Unbreakable Linux Network | Use ULN channels | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/uln-installation.html) |

As an alternative, you can use the package manager on your system to automatically download and install MySQL with packages from the native software repositories of your Linux distribution. These native packages are often several versions behind the currently available release. You will also normally be unable to install development milestone releases (DMRs), as these are not usually made available in the native repositories. For more information on using the native package installers, see [Section 2.5.7, “Installing MySQL on Linux from the Native Software Repositories”](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-native.html).

> **Note**
> 
> For many Linux installations, you will want to set up MySQL to be started automatically when your machine starts. Many of the native package installations perform this operation for you, but for source, binary and RPM solutions you may need to set this up separately. The required script, [mysql.server](https://dev.mysql.com/doc/refman/8.0/en/mysql-server.html), can be found in the `support-files` directory under the MySQL installation directory or in a MySQL source tree. You can install it as `/etc/init.d/mysql` for automatic MySQL startup and shutdown. See [Section 4.3.3, “**mysql.server** — MySQL Server Startup Script”](https://dev.mysql.com/doc/refman/8.0/en/mysql-server.html).