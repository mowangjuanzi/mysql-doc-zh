# 第 2 章 安装和升级 MySQL

本章描述了如何获得和安装 MySQL。以下是过程的摘要，后面的章节提供了详细信息。如果计划升级现有版本的 MySQL 为较新版本，而不是第一次安装，参阅[第 2.10 节 “升级 MySQL”](/upgrading.html)，获取有关升级过程以及升级前应考虑的问题的相关信息。

如果有兴趣从另外的数据库系统中迁移到 MySQL，参阅 [A.8 “MySQL 8.0 常见问题: 迁移](/faqs-migration.html)，那里包含了一些常见迁移问题的答案。

安装 MySQL 通常遵循以下步骤：

1. ***确定 MySQL 是否在你的平台上运行并支持。***

    请注意，并不是所有的平台都适合运行 MySQL，并且并非所有运行 MySQL 的平台都得到 Oracle 公司的官方支持。有关官方支持平台的信息，请访问 MySQL 站点的 https://www.mysql.com/support/supportedplatforms/database.html 。

2. ***选择要安装的发行版。***

    MySQL 有几个版本可用，大多数都有几种分发格式。可以选择预打包的二进制（预编译）或源代码。如果有疑问，请使用二进制发行包。Oracle 还为那些想要查看最新开发和测试新代码的人提供了对 MySQL 源代码的访问。要确认应该使用哪个版本或类型的发行版，参阅[第 2.1.2 节 “安装哪个 MySQL 版本和发行版”](/which-version.html)。

3. ***下载要安装的发行版。***

    有关说明，参阅[第 2.1.3 节 “如何获得 MySQL”](/getting-mysql.html)。验证发行包的完整性，使用[第 2.1.4 节 “使用 MD5 校验和 GnuPG” 验证包完整性”](/verifying-package-integrity.html) 的说明。

4. ***安装发行版。***

    从二进制发行版中安装 MySQL，使用[第 2.2 节 “在 Unix/Linux 上使用通用二进制文件安装 MySQL”](/binary-installation.html) 的说明。或者使用[安全部署教程](https://dev.mysql.com/doc/mysql-secure-deployment-guide/8.0/en/)，该教程提供了部署 MySQL 企业版服务器的通用二进制发行版部署程序，带有用于管理 MySQL 安装安全性的功能。
    
    如果要从源代码或当前的开发源代码树安装 MySQL，请使用[第 2.8 节 “从源码安装 MySQL”](/source-installation.html)中的说明。

5. ***执行任何安装后的设置。***

    安装 MySQL 之后，确定 MySQL 服务器正常运行的信息，参阅 [第 2.9 节 “安装后设置和测试”](/postinstallation.html)。另请参阅[第 2.9.4 节 “安全的初始化 MySQL 账户”](/default-privileges.html)提供的信息。本章介绍了如何安全的初始化 MySQL `root` 用户账户，在分配前，*没有密码*。该章节适用于使用二进制或源代码安装 MySQL 的情况。

6. 如果运行 MySQL benchmark 脚本，必须提供对 MySQL 的 Perl 支持。参阅[第 2.12 节 “Perl 安装说明”](/perl-support.html)。

有关在不同平台和环境上安装 MySQL 的说明可按平台逐个查看：

- ***Unix，Linux***

    有关在大多数 Linux 和 Unix 平台上使用通用二进制文件（例如 .tar.gz 包）安装 MySQL 的说明，参阅[第 2.2 节 “使用通用二进制文件在 Unix/Linux 上安装 MySQL”](/binary-installation.html)。

    有关从源代码发行版或者源代码存储库编译 MySQL 的信息，参阅[第 2.8 节 “从源代码安装 MySQL”](/source-installation.html)

    对于指定平台的安装，配置和从源文件编译的帮助，请参阅对应平台章节：

    - Linux，包括发行版特定方法的说明，参阅[第 2.5 节 “在 Linux” 上安装 MySQL”](/linux-installation.html)。

    - IBM AIX，参阅[第 2.7 节 “在 Solaris 上安装 MySQL”](/solaris-installation.html)。

- ***Microsoft Windows***

    有关在 Microsoft Windows 安装 MySQL 的说明，使用 MySQL 安装程序或者二进制压缩包，参阅[第 2.3 节 “在 Microsoft Windows 上安装 MySQL”](/windows-installation.html)。

    有关使用 Microsoft Visual Studio 从源代码构建 MySQL 的详细信息和说明，参阅[第 2.8 节 “从源码安装 MySQL”](/source-installation.html)。

- ***macOS***

    对于 macOS 上安装，包含使用二进制包和原生 PKG 格式两种参阅[第 2.4 节 “在 macOS 上安装 MySQL”](/osx-installation.html)。

    对于使用 macOS Launch Daemon 自动启动和停止的信息，参阅[第 2.4.3 节 “安装和使用 MySQL Launch Daemon”](/osx-installation-launchd.html)。

    有关 MySQL 偏好面板的信息，参阅[第 2.4.4 节 “安装和使用 MySQL 偏好面板”](/osx-installation-prefpane.html)。