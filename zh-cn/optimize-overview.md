## 8.1 优化概述

数据库性能取决于数据库级别的多个因素, 例如表, 查询和配置设置. 这些软件构造导致了硬件级别的 CPU 和 I/O 操作, 你必须尽可能最小化并尽可能提高效率. As you work on database performance, you start by learning the high-level rules and guidelines for the software side, and measuring performance using wall-clock time. 随着你成为专家, 你将会学习更多内部发生的事情, 并开始测试 CPU 周期 和 I/O 操作等内容. 

典型的用户目标是从现有的软件和硬件配置中获得最佳的数据库性能. 高级用户寻找机会来改进 MySQL 软件本身, 或者开发自己的存储引擎和硬件设备来扩展 MySQL 生态系统. 

- [数据库级别优化](#数据库级别优化)
- [硬件级别优化](#硬件级别优化)
- [平衡可移植性和性能](#平衡可移植性和性能)

### 数据库级别优化

使数据库应用快速运行的最重要因素是它的基本设计:

- 表的结构是否正确? In particular, do the columns have the right data types, and does each table have the appropriate columns for the type of work? 例如, 执行频繁更新的应用程序常常很多表只有很少的列, 而分析大量数据的应用程序通常只有很少的表有很多的列. 
- 是否有适当的[索引]((https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html))来提升查询效率? 
- 你是否为每个表使用合适的存储引擎, 并利用了每个存储引擎的优点和特性? 特别是, 诸如 [`InnoDB`](https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb.html) 之类的事务存储引擎或诸如 [`MyISAM`](https://dev.mysql.com/doc/refman/8.0/en/optimizing-myisam.html) 之类的非事务性存储引擎的选择对于性能和可伸缩性非常重要. 

    > **注意**
    > 
    > InnoDB 是新表的默认存储引擎. 实际上, 先进的 `InnoDB` 性能特征意味着 `InnoDB` 表通常优于更简单的 `MyISAM` 表, 尤其是对与繁忙的数据. 

- 每个表是否使用了适当的行格式? 这个选择也取决于使用的表的存储引擎. 特别是, 压缩表是否较少的磁盘空间, 因此需要较少的磁盘 I/O 来读取和写入数据. 压缩适用于所有使用 `InnoDB` 表的工作负载, 也适用于只读 `MyISAM` 表. 
- 应用程序是否使用了适当的[锁策略](https://dev.mysql.com/doc/refman/8.0/en/locking-issues.html)? 例如, 在可能的情况下允许共享访问, 以便数据库操作可以并发运行, 在适当的情况下请求独占访问, 以便关键操作获得优先级. 同样, 搜索引擎的选择也很重要. `InnoDB` 存储引擎可以在不需要你参与的情况下处理大多数锁问题, 从而提高数据库的并发性, 减少代码的实验和调优. 
- Are all[ memory areas used for caching](https://dev.mysql.com/doc/refman/8.0/en/buffering-caching.html) sized correctly? 也就是说, 足够大以容纳频繁访问的数据, 但也不能太大以至于超载物理内存并导致分页. 要配置的最主要内存区域是 `InnoDB` 缓冲池(buffer pool) 和 `MyISAM` 键缓存(key cache). 

### 硬件级别优化

随着数据库变得越来越繁忙, 任何数据库应用程序最终都会达到硬件限制. DBA 必须评估是否可以调优应用程序或重新配置服务器以避免这些[瓶颈](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_bottleneck), 或者是需要更多的硬件资源. 系统瓶颈通常来自于下面这些: 

- 磁盘寻道. 磁盘需要一段时间才能找到一块数据. 对于现代磁盘, 这一过程的平均时间通常低于10ms, 所以理论上我们可以每秒进行100次搜索. 这段时间随着新磁盘的使用而缓慢改善并且很难对单表进行优化. 优化寻道时间的方法是将数据分布到多个磁盘上. 
- 磁盘读写. 当磁盘位于正确的位置时, 我们需要读取或写入数据. 使用现代磁盘, 一个磁盘可提供至少 10-20MB/s 的吞吐量. 这比寻道更容易优化, 因为你可以从多个磁盘并行读取. 
- CPU 周期. 当数据在主存储器时, 我们必须处理他们以获得我们的结果. 与内存量相比, 具有较大的表时最常见的限制因素. 但是小表, 速度通常不是问题. 
- 内存带宽. 当 CPU 需要的数据超过 CPU 缓存容量时, 主内存带宽将成为瓶颈. 对大多数系统来说, 这是一个不常见的瓶颈, 但是需要注意. 

### 平衡可移植性和性能

To use performance-oriented SQL extensions in a portable MySQL program, you can wrap MySQL-specific keywords in a statement within `/*! */` comment delimiters. 其它 SQL 服务器忽略注释关键字. 有关撰写注释的信息, 参阅 [Section 9.6, “注释语法”](https://dev.mysql.com/doc/refman/8.0/en/comments.html). 