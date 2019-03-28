# 2 安装和更新 MySQL

本章描述了如何获得和安装 MySQL. 以下是过程的摘要, 后面的章节提供了详细信息. 如果你计划升级现有版本的 MySQL 为较新版本, 而不是第一次安装, see [Section 2.11, “Upgrading MySQL”](https://dev.mysql.com/doc/refman/8.0/en/upgrading.html), for information about upgrade procedures and about issues that you should consider before upgrading.

如果你有兴趣从另外的数据库系统中迁移到 MySQL, 参阅 [A.8, “MySQL 8.0 常见问题解答: 迁移](https://dev.mysql.com/doc/refman/8.0/en/faqs-migration.html), 那里包含了一些常见迁移问题的答案.

Installation of MySQL generally follows the steps outlined here:

1. ***确定 MySQL 是否在你的平台上运行并支持.***

    Please note that not all platforms are equally suitable for running MySQL, and that not all platforms on which MySQL is known to run are officially supported by Oracle Corporation. For information about those platforms that are officially supported, see https://www.mysql.com/support/supportedplatforms/database.html on the MySQL website.

2. ***选择要安装的发行包.***

    MySQL 有几个版本可用, and most are available in several distribution formats. You can choose from pre-packaged distributions containing binary (precompiled) programs or source code. 如果有疑问, 请使用二进制发行包. Oracle also provides access to the MySQL source code for those who want to see recent developments and test new code. To determine which version and type of distribution you should use, see [Section 2.1.1, “Which MySQL Version and Distribution to Install”](https://dev.mysql.com/doc/refman/8.0/en/which-version.html).

3. ***下载要安装的发行包.***

    有关说明, 参阅 [2.1.2, “如何获得 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/getting-mysql.html). 验证发行包的完整性, use the instructions in [Section 2.1.3, “Verifying Package Integrity Using MD5 Checksums or GnuPG”](https://dev.mysql.com/doc/refman/8.0/en/verifying-package-integrity.html).

4. ***安装发行包.***

    从二进制发行包中安装 MySQL, use the instructions in [Section 2.2, “Installing MySQL on Unix/Linux Using Generic Binaries”](https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html).

    To install MySQL from a source distribution or from the current development source tree, use the instructions in [Section 2.9, “Installing MySQL from Source”](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html).

5. ***执行任何安装后的设置.***

    安装 MySQL 之后, 确定 MySQL 服务器正常运行的信息, 参阅 [2.10, “安装后设置和测试”](https://dev.mysql.com/doc/refman/8.0/en/postinstallation.html). Also refer to the information provided in [Section 2.10.4, “Securing the Initial MySQL Account”](https://dev.mysql.com/doc/refman/8.0/en/default-privileges.html). This section describes how to secure the initial MySQL `root` user account, *which has no password* until you assign one. The section applies whether you install MySQL using a binary or source distribution.

6. 如果你想运行 MySQL benchmark 脚本, 必须提供对 MySQL 的 Perl 支持. 参阅 [2.13, “Perl 安装说明”](https://dev.mysql.com/doc/refman/8.0/en/perl-support.html).

Instructions for installing MySQL on different platforms and environments is available on a platform by platform basis:

- ***Unix, Linux, FreeBSD***

    For instructions on installing MySQL on most Linux and Unix platforms using a generic binary (for example, a .tar.gz package), see [Section 2.2, “Installing MySQL on Unix/Linux Using Generic Binaries”](https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html).

    For information on building MySQL entirely from the source code distributions or the source code repositories, see [Section 2.9, “Installing MySQL from Source”](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html)

    对于指定平台的安装, 配置和从源文件编译的帮助, 请参阅对应平台章节:

    - Linux, including notes on distribution specific methods, 参阅 [2.5, “在 Linux” 上安装 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html).

    - IBM AIX, 参阅 [2.7, “在 Solaris 上安装 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/solaris-installation.html).

    - FreeBSD, 参阅 [2.8, “在 FreeBSD 上安装 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/freebsd-installation.html).

- ***Microsoft Windows***

    有关在 Microsoft Windows 安装 MySQL 的说明, 使用 MySQL 安装程序或者二进制压缩包, 参阅 [2.3, “在 Microsoft Windows 上安装 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html).

    有关管理 MySQL 实例的说明, 参阅 [2.3.4, “MySQL Notifier”](https://dev.mysql.com/doc/refman/8.0/en/windows-notifier.html).

    For details and instructions on building MySQL from source code using Microsoft Visual Studio, see [Section 2.9, “Installing MySQL from Source”](https://dev.mysql.com/doc/refman/8.0/en/source-installation.html).

- ***OS X***

    对于 OS X 上安装, 包含使用二进制包和原生 PKG 格式两种, 参阅 [Section 2.4, “在 macOS 上安装 MySQL”](https://dev.mysql.com/doc/refman/8.0/en/osx-installation.html).

    For information on making use of an OS X Launch Daemon to automatically start and stop MySQL, see [Section 2.4.3, “Installing and Using the MySQL Launch Daemon”](https://dev.mysql.com/doc/refman/8.0/en/osx-installation-launchd.html).

    For information on the MySQL Preference Pane, see [Section 2.4.4, “Installing and Using the MySQL Preference Pane”](https://dev.mysql.com/doc/refman/8.0/en/osx-installation-prefpane.html).