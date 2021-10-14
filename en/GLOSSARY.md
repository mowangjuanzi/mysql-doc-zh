## .ARM file

Metadata for `ARCHIVE` tables. Contrast with ***.ARZ file***. Files with this extension are always included in backups produced by the `mysqlbackup` command of the ***MySQL Enterprise Backup*** product.

See Also .ARZ file, MySQL Enterprise Backup, mysqlbackup command.

## .ARZ file

Data for ARCHIVE tables. Contrast with ***.ARM file***. Files with this extension are always included in backups produced by the `mysqlbackup` command of the ***MySQL Enterprise Backup*** product.

See Also .ARM file, MySQL Enterprise Backup, mysqlbackup command.

## ACID

An acronym standing for atomicity, consistency, isolation, and durability. These properties are all desirable in a database system, and are all closely tied to the notion of a ***transaction***. The transactional features of `InnoDB` adhere to the ACID principles.

Transactions are ***atomic*** units of work that can be ***committed*** or ***rolled back***. When a transaction makes multiple changes to the database, either all the changes succeed when the transaction is committed, or all the changes are undone when the transaction is rolled back.

The database remains in a consistent state at all times — after each commit or rollback, and while transactions are in progress. If related data is being updated across multiple tables, queries see either all old values or all new values, not a mix of old and new values.

Transactions are protected (isolated) from each other while they are in progress; they cannot interfere with each other or see each other's uncommitted data. This isolation is achieved through the ***locking*** mechanism. Experienced users can adjust the ***isolation level***, trading off less protection in favor of increased performance and ***concurrency***, when they can be sure that the transactions really do not interfere with each other.

The results of transactions are durable: once a commit operation succeeds, the changes made by that transaction are safe from power failures, system crashes, race conditions, or other potential dangers that many non-database applications are vulnerable to. Durability typically involves writing to disk storage, with a certain amount of redundancy to protect against power failures or software crashes during write operations. (In `InnoDB`, the ***doublewrite buffer*** assists with durability.)

See Also atomic, commit, concurrency, doublewrite buffer, isolation level, locking, rollback, transaction.

## adaptive flushing

An algorithm for ***InnoDB*** tables that smooths out the I/O overhead introduced by ***checkpoints***. Instead of ***flushing*** all modified ***pages*** from the ***buffer pool*** to the ***data files*** at once, MySQL periodically flushes small sets of modified pages. The adaptive flushing algorithm extends this process by estimating the optimal rate to perform these periodic flushes, based on the rate of flushing and how fast ***redo*** information is generated.

See Also buffer pool, checkpoint, data files, flush, InnoDB, page, redo log.

## adaptive hash index

An optimization for `InnoDB` tables that can speed up lookups using `=` and `IN` operators, by constructing a ***hash index*** in memory. MySQL monitors index searches for InnoDB tables, and if queries could benefit from a hash index, it builds one automatically for index ***pages*** that are frequently accessed. In a sense, the adaptive hash index configures MySQL at runtime to take advantage of ample main memory, coming closer to the architecture of main-memory databases. This feature is controlled by the [`innodb_adaptive_hash_index`](innodb-parameters.md#sysvar_innodb_adaptive_hash_index) configuration option. Because this feature benefits some workloads and not others, and the memory used for the hash index is reserved in the ***buffer pool***, typically you should benchmark with this feature both enabled and disabled.

The hash index is always built based on an existing ***B-tree*** index on the table. MySQL can build a hash index on a prefix of any length of the key defined for the B-tree, depending on the pattern of searches against the index. A hash index can be partial; the whole B-tree index does not need to be cached in the buffer pool.

In MySQL 5.6 and higher, another way to take advantage of fast single-value lookups with `InnoDB` tables is to use the `InnoDB` ***memcached*** plugin. See [Section 15.20, “InnoDB memcached Plugin”](innodb-memcached.md) for details.

See Also B-tree, buffer pool, hash index, memcached, page, secondary index.

## ADO.NET

An object-relational mapping (ORM) framework for applications built using .NET technologies such as ***ASP.NET***. Such applications can interface with MySQL through the ***Connector/NET*** component.

See Also .NET, ASP.net, Connector/NET, Mono, Visual Studio.

## AIO

Acronym for ***asynchronous I/O***. You might see this acronym in `InnoDB` messages or keywords.

See Also asynchronous I/O.

## ANSI

In ***ODBC***, an alternative method of supporting character sets and other internationalization aspects. Contrast with ***Unicode***. ***Connector/ODBC*** 3.51 is an ANSI driver, while Connector/ODBC 5.1 is a Unicode driver.

See Also Connector/ODBC, ODBC, Unicode.

## API

APIs provide low-level access to the MySQL protocol and MySQL resources from ***client*** programs. Contrast with the higher-level access provided by a ***Connector***.

See Also C API, client, connector, native C API, Perl API, PHP API, Python API, Ruby API.

## application programming interface (API)

A set of functions or procedures. An API provides a stable set of names and types for functions, procedures, parameters, and return values.

## apply

When a backup produced by the ***MySQL Enterprise Backup*** product does not include the most recent changes that occurred while the backup was underway, the process of updating the backup files to include those changes is known as the ***apply*** step. It is specified by the `apply-log` option of the `mysqlbackup` command.

Before the changes are applied, we refer to the files as a ***raw backup***. After the changes are applied, we refer to the files as a ***prepared backup***. The changes are recorded in the ***ibbackup_logfile*** file; once the apply step is finished, this file is no longer necessary.

See Also hot backup, ibbackup_logfile, MySQL Enterprise Backup, prepared backup, raw backup.

## AS

A Kerberos authentication server. AS can also refer to the authentication service provided by an authentication server.

See Also authentication server.

## ASP.net

A framework for developing web-based applications using ***.NET*** technologies and languages. Such applications can interface with MySQL through the ***Connector/NET*** component.

Another technology for writing server-side web pages with MySQL is ***PHP***.

See Also .NET, ADO.NET, Connector/NET, Mono, PHP, Visual Studio.

## assembly

A library of compiled code in a ***.NET*** system, accessed through ***Connector/NET***. Stored in the ***GAC*** to allow versioning without naming conflicts.

See Also .NET, GAC.

## asynchronous I/O

A type of I/O operation that allows other processing to proceed before the I/O is completed. Also known as ***nonblocking I/O*** and abbreviated as ***AIO***. `InnoDB` uses this type of I/O for certain operations that can run in parallel without affecting the reliability of the database, such as reading pages into the ***buffer pool*** that have not actually been requested, but might be needed soon.

Historically, `InnoDB` used asynchronous I/O on Windows systems only. Starting with the InnoDB Plugin 1.1 and MySQL 5.5, `InnoDB` uses asynchronous I/O on Linux systems. This change introduces a dependency on `libaio`. Asynchronous I/O on Linux systems is configured using the [`innodb_use_native_aio`](innodb-parameters.md#sysvar_innodb_use_native_aio) option, which is enabled by default. On other Unix-like systems, InnoDB uses synchronous I/O only.

See Also buffer pool, nonblocking I/O.

## atomic

In the SQL context, ***transactions*** are units of work that either succeed entirely (when ***committed***) or have no effect at all (when ***rolled back***). The indivisible ("atomic") property of transactions is the “A” in the acronym ***ACID***.

See Also ACID, commit, rollback, transaction.

## atomic DDL

An atomic DDL statement is one that combines the data dictionary updates, storage engine operations, and binary log writes associated with a DDL operation into a single, atomic transaction. The transaction is either fully committed or rolled back, even if the server halts during the operation. Atomic DDL support was added in MySQL 8.0. For more information, see [Section 13.1.1, “Atomic Data Definition Statement Support”](atomic-ddl.md).

See Also binary log, data dictionary, DDL, storage engine.

## atomic instruction

Special instructions provided by the CPU, to ensure that critical low-level operations cannot be interrupted.

## authentication server

In Kerberos, a service that provides the initial ticket needed to obtain a ticket-granting ticket (TGT) that is needed to obtain other tickets from the ticket-granting server (TGS). The authentication server (AS) combined with a TGS make up a key distribution center (KDC).

See Also key distribution center, ticket-granting server.

## auto-increment
A property of a table column (specified by the `AUTO_INCREMENT` keyword) that automatically adds an ascending sequence of values in the column.

It saves work for the developer, not to have to produce new unique values when inserting new rows. It provides useful information for the query optimizer, because the column is known to be not null and with unique values. The values from such a column can be used as lookup keys in various contexts, and because they are auto-generated there is no reason to ever change them; for this reason, primary key columns are often specified as auto-incrementing.

Auto-increment columns can be problematic with statement-based replication, because replaying the statements on a replica might not produce the same set of column values as on the source, due to timing issues. When you have an auto-incrementing primary key, you can use statement-based replication only with the setting [`innodb_autoinc_lock_mode=1`](innodb-parameters.md#sysvar_innodb_autoinc_lock_mode). If you have [`innodb_autoinc_lock_mode=2`](innodb-parameters.md#sysvar_innodb_autoinc_lock_mode), which allows higher concurrency for insert operations, use ***row-based replication*** rather than ***statement-based replication***. The setting [`innodb_autoinc_lock_mode=0`](innodb-parameters.md#sysvar_innodb_autoinc_lock_mode) should not be used except for compatibility purposes.

Consecutive lock mode ([`innodb_autoinc_lock_mode=1`](innodb-parameters.md#sysvar_innodb_autoinc_lock_mode)) is the default setting prior to MySQL 8.0.3. As of MySQL 8.0.3, interleaved lock mode ([`innodb_autoinc_lock_mode=2`](innodb-parameters.md#sysvar_innodb_autoinc_lock_mode)) is the default, which reflects the change from statement-based to row-based replication as the default replication type.

See Also auto-increment locking, innodb_autoinc_lock_mode, primary key, row-based replication, statement-based replication.

## auto-increment locking

The convenience of an ***auto-increment*** primary key involves some tradeoff with concurrency. In the simplest case, if one transaction is inserting values into the table, any other transactions must wait to do their own inserts into that table, so that rows inserted by the first transaction receive consecutive primary key values. `InnoDB` includes optimizations and the [`innodb_autoinc_lock_mode`](innodb-parameters.md#sysvar_innodb_autoinc_lock_mode) option so that you can configure and optimal balance between predictable sequences of auto-increment values and maximum ***concurrency*** for insert operations.

See Also auto-increment, concurrency, innodb_autoinc_lock_mode.

## autocommit

A setting that causes a ***commit*** operation after each ***SQL*** statement. This mode is not recommended for working with `InnoDB` tables with ***transactions*** that span several statements. It can help performance for ***read-only transactions*** on `InnoDB` tables, where it minimizes overhead from ***locking*** and generation of ***undo*** data, especially in MySQL 5.6.4 and up. It is also appropriate for working with [`MyISAM`](myisam-storage-engine.md) tables, where transactions are not applicable.

See Also commit, locking, read-only transaction, SQL, transaction, undo.

## availability

The ability to cope with, and if necessary recover from, failures on the host, including failures of MySQL, the operating system, or the hardware and maintenance activity that may otherwise cause downtime. Often paired with ***scalability*** as critical aspects of a large-scale deployment.

See Also scalability.

## B-tree

A tree data structure that is popular for use in database indexes. The structure is kept sorted at all times, enabling fast lookup for exact matches (equals operator) and ranges (for example, greater than, less than, and BETWEEN operators). This type of index is available for most storage engines, such as [`InnoDB`](innodb-storage-engine.md) and [`MyISAM`](myisam-storage-engine.md).

Because B-tree nodes can have many children, a B-tree is not the same as a binary tree, which is limited to 2 children per node.

Contrast with ***hash index***, which is only available in the [`MEMORY`](memory-storage-engine.md) storage engine. The ***MEMORY*** storage engine can also use B-tree indexes, and you should choose B-tree indexes for ***MEMORY*** tables if some queries use range operators.

The use of the term B-tree is intended as a reference to the general class of index design. B-tree structures used by MySQL storage engines may be regarded as variants due to sophistications not present in a classic B-tree design. For related information, refer to the `InnoDB` Page Structure [Fil Header](https://dev.mysql.com/doc/internals/en/innodb-fil-header.html) section of the [MySQL Internals Manual](https://dev.mysql.com/doc/internals/en/index.html).

See Also hash index.

## backticks

Identifiers within MySQL SQL statements must be quoted using the backtick character (`` ` ``) if they contain special characters or reserved words. For example, to refer to a table named `FOO#BAR` or a column named `SELECT`, you would specify the identifiers as `` `FOO#BAR` `` and `` `SELECT` ``. Since the backticks provide an extra level of safety, they are used extensively in program-generated SQL statements, where the identifier names might not be known in advance.

Many other database systems use double quotation marks (`"`) around such special names. For portability, you can enable `ANSI_QUOTES` mode in MySQL and use double quotation marks instead of backticks to qualify identifier names.

See Also SQL.

## backup

The process of copying some or all table data and metadata from a MySQL instance, for safekeeping. Can also refer to the set of copied files. This is a crucial task for DBAs. The reverse of this process is the ***restore*** operation.

With MySQL, ***physical backups*** are performed by the ***MySQL Enterprise Backup*** product, and ***logical backups*** are performed by the `mysqldump` command. These techniques have different characteristics in terms of size and representation of the backup data, and speed (especially speed of the restore operation).

Backups are further classified as ***hot***, ***warm***, or ***cold*** depending on how much they interfere with normal database operation. (Hot backups have the least interference, cold backups the most.)

See Also cold backup, hot backup, logical backup, MySQL Enterprise Backup, mysqldump, physical backup, warm backup.

## base column

A non-generated table column upon which a stored generated column or virtual generated column is based. In other words, a base column is a non-generated table column that is part of a generated column definition.

See Also generated column, stored generated column, virtual generated column.

## beta

An early stage in the life of a software product, when it is available only for evaluation, typically without a definite release number or a number less than 1. `InnoDB` does not use the beta designation, preferring an ***early adopter*** phase that can extend over several point releases, leading to a ***GA*** release.

## binary log

A file containing a record of all statements or row changes that attempt to change table data. The contents of the binary log can be replayed to bring replicas up to date in a ***replication*** scenario, or to bring a database up to date after restoring table data from a backup. The binary logging feature can be turned on and off, although Oracle recommends always enabling it if you use replication or perform backups.

You can examine the contents of the binary log, or replay it during replication or recovery, by using the [**mysqlbinlog**](mysqlbinlog.md) command. For full information about the binary log, see [Section 5.4.4, “The Binary Log”](binary-log.md). For MySQL configuration options related to the binary log, see [Section 17.1.6.4, “Binary Logging Options and Variables”](replication-options-binary-log.md).

For the ***MySQL Enterprise Backup*** product, the file name of the binary log and the current position within the file are important details. To record this information for the source when taking a backup in a replication context, you can specify the `--slave-info` option.

Prior to MySQL 5.0, a similar capability was available, known as the update log. In MySQL 5.0 and higher, the binary log replaces the update log.

See Also binlog, MySQL Enterprise Backup, replication.

## binlog

An informal name for the ***binary log*** file. For example, you might see this abbreviation used in e-mail messages or forum discussions.

See Also binary log.

## blind query expansion

A special mode of ***full-text search*** enabled by the `WITH QUERY EXPANSION` clause. It performs the search twice, where the search phrase for the second search is the original search phrase concatenated with the few most highly relevant documents from the first search. This technique is mainly applicable for short search phrases, perhaps only a single word. It can uncover relevant matches where the precise search term does not occur in the document.

## BLOB

An SQL data type ([`TINYBLOB`](blob.md), [`BLOB`](blob.md), [`MEDIUMBLOB`](blob.md), and [`LONGBLOB`](blob.md)) for objects containing any kind of binary data, of arbitrary size. Used for storing documents, images, sound files, and other kinds of information that cannot easily be decomposed to rows and columns within a MySQL table. The techniques for handling BLOBs within a MySQL application vary with each ***Connector*** and ***API***. MySQL `Connector/ODBC` defines `BLOB` values as `LONGVARBINARY`. For large, free-form collections of character data, the industry term is ***CLOB***, represented by the MySQL `TEXT` data types.

See Also API, CLOB, connector, Connector/ODBC.

## bottleneck

A portion of a system that is constrained in size or capacity, that has the effect of limiting overall throughput. For example, a memory area might be smaller than necessary; access to a single required resource might prevent multiple CPU cores from running simultaneously; or waiting for disk I/O to complete might prevent the CPU from running at full capacity. Removing bottlenecks tends to improve ***concurrency***. For example, the ability to have multiple `InnoDB` ***buffer pool*** instances reduces contention when multiple sessions read from and write to the buffer pool simultaneously.

See Also buffer pool, concurrency.

## bounce

A ***shutdown*** operation immediately followed by a restart. Ideally with a relatively short ***warmup*** period so that performance and throughput quickly return to a high level.

See Also shutdown.

## buddy allocator

A mechanism for managing different-sized ***pages*** in the InnoDB ***buffer pool***.

See Also buffer pool, page, page size.

## buffer

A memory or disk area used for temporary storage. Data is buffered in memory so that it can be written to disk efficiently, with a few large I/O operations rather than many small ones. Data is buffered on disk for greater reliability, so that it can be recovered even when a ***crash*** or other failure occurs at the worst possible time. The main types of buffers used by InnoDB are the ***buffer pool***, the ***doublewrite buffer***, and the ***change buffer***.

See Also buffer pool, change buffer, crash, doublewrite buffer.

## buffer pool

The memory area that holds cached `InnoDB` data for both tables and indexes. For efficiency of high-volume read operations, the buffer pool is divided into ***pages*** that can potentially hold multiple rows. For efficiency of cache management, the buffer pool is implemented as a linked list of pages; data that is rarely used is aged out of the cache, using a variation of the ***LRU*** algorithm. On systems with large memory, you can improve concurrency by dividing the buffer pool into multiple ***buffer pool instances***.

Several `InnoDB` status variables, `INFORMATION_SCHEMA` tables, and `performance_schema` tables help to monitor the internal workings of the buffer pool. Starting in MySQL 5.6, you can avoid a lengthy warmup period after restarting the server, particularly for instances with large buffer pools, by saving the buffer pool state at server shutdown and restoring the buffer pool to the same state at server startup. See [Section 15.8.3.6, “Saving and Restoring the Buffer Pool State”](innodb-preload-buffer-pool.md).

See Also buffer pool instance, LRU, page, warm up.

## buffer pool instance

Any of the multiple regions into which the ***buffer pool*** can be divided, controlled by the [`innodb_buffer_pool_instances`](innodb-parameters.md#sysvar_innodb_buffer_pool_instances) configuration option. The total memory size specified by [`innodb_buffer_pool_size`](innodb-parameters.md#sysvar_innodb_buffer_pool_size) is divided among all buffer pool instances. Typically, having multiple buffer pool instances is appropriate for systems that allocate multiple gigabytes to the `InnoDB` buffer pool, with each instance being one gigabyte or larger. On systems loading or looking up large amounts of data in the buffer pool from many concurrent sessions, having multiple buffer pool instances reduces contention for exclusive access to data structures that manage the buffer pool.

See Also buffer pool.

## built-in

The built-in `InnoDB` storage engine within MySQL is the original form of distribution for the storage engine. Contrast with the ***InnoDB Plugin***. Starting with MySQL 5.5, the `InnoDB` Plugin is merged back into the MySQL code base as the built-in InnoDB storage engine (known as InnoDB 1.1).

This distinction is important mainly in MySQL 5.1, where a feature or bug fix might apply to the InnoDB Plugin but not the built-in `InnoDB`, or vice versa.

See Also InnoDB.

## business rules

The relationships and sequences of actions that form the basis of business software, used to run a commercial company. Sometimes these rules are dictated by law, other times by company policy. Careful planning ensures that the relationships encoded and enforced by the database, and the actions performed through application logic, accurately reflect the real policies of the company and can handle real-life situations.

For example, an employee leaving a company might trigger a sequence of actions from the human resources department. The human resources database might also need the flexibility to represent data about a person who has been hired, but not yet started work. Closing an account at an online service might result in data being removed from a database, or the data might be moved or flagged so that it could be recovered if the account is re-opened. A company might establish policies regarding salary maximums, minimums, and adjustments, in addition to basic sanity checks such as the salary not being a negative number. A retail database might not allow a purchase with the same serial number to be returned more than once, or might not allow credit card purchases above a certain value, while a database used to detect fraud might allow these kinds of things.

See Also relational.

## .cfg file

A metadata file used with the `InnoDB` ***transportable tablespace*** feature. It is produced by the command `FLUSH TABLES ... FOR EXPORT`, puts one or more tables in a consistent state that can be copied to another server. The `.cfg` file is copied along with the corresponding ***.ibd*** file, and used to adjust the internal values of the `.ibd` file, such as the ***space ID***, during the `ALTER TABLE ... IMPORT TABLESPACE` step.

See Also .ibd file, space ID, transportable tablespace.

## C

A programming language that combines portability with performance and access to low-level hardware features, making it a popular choice for writing operating systems, drivers, and other kinds of system software. Many complex applications, languages, and reusable modules feature pieces written in C, tied together with high-level components written in other languages. Its core syntax is familiar to ***C++***, ***Java***, and ***C#*** developers.

See Also C API, C++, C#, Java.

## C API

The C ***API*** code is distributed with MySQL. It is included in the ***libmysqlclient*** library and enables ***C*** programs to access a database.

See Also API, C, libmysqlclient.

## C#

A programming language combining strong typing and object-oriented features, running within the Microsoft ***.NET*** framework or its open-source counterpart ***Mono***. Often used for creating applications with the ***ASP.net*** framework. Its syntax is familiar to C, C++ and Java developers.

See Also .NET, ASP.net, C, Connector/NET, C++, Java, Mono.

## C++

A programming language with core syntax familiar to ***C*** developers. Provides access to low-level operations for performance, combined with higher-level data types, object-oriented features, and garbage collection. To write C++ applications for MySQL, you use the ***Connector/C++*** component.

See Also C, Connector/C++.

## cache

The general term for any memory area that stores copies of data for frequent or high-speed retrieval. In `InnoDB`, the primary kind of cache structure is the ***buffer pool***.

See Also buffer, buffer pool.

## cardinality

The number of different values in a table ***column***. When queries refer to columns that have an associated ***index***, the cardinality of each column influences which access method is most efficient. For example, for a column with a ***unique constraint***, the number of different values is equal to the number of rows in the table. If a table has a million rows but only 10 different values for a particular column, each value occurs (on average) 100,000 times. A query such as `SELECT c1 FROM t1 WHERE c1 = 50;` thus might return 1 row or a huge number of rows, and the database server might process the query differently depending on the cardinality of `c1`.

If the values in a column have a very uneven distribution, the cardinality might not be a good way to determine the best query plan. For example, `SELECT c1 FROM t1 WHERE c1 = x;` might return 1 row when `x=50` and a million rows when `x=30`. In such a case, you might need to use ***index hints*** to pass along advice about which lookup method is more efficient for a particular query.

Cardinality can also apply to the number of distinct values present in multiple columns, as in a ***composite index***.

See Also column, composite index, index, index hint, persistent statistics, random dive, selectivity, unique constraint.

## change buffer

A special data structure that records changes to ***pages*** in ***secondary indexes***. These values could result from SQL [`INSERT`](insert.md), [`UPDATE`](update.md), or [`DELETE`](delete.md) statements (***DML***). The set of features involving the change buffer is known collectively as ***change buffering***, consisting of ***insert buffering***, ***delete buffering***, and ***purge buffering***.

Changes are only recorded in the change buffer when the relevant page from the secondary index is not in the ***buffer pool***. When the relevant index page is brought into the buffer pool while associated changes are still in the change buffer, the changes for that page are applied in the buffer pool (***merged***) using the data from the change buffer. Periodically, the ***purge*** operation that runs during times when the system is mostly idle, or during a slow shutdown, writes the new index pages to disk. The purge operation can write the disk blocks for a series of index values more efficiently than if each value were written to disk immediately.

Physically, the change buffer is part of the ***system tablespace***, so that the index changes remain buffered across database restarts. The changes are only applied (***merged***) when the pages are brought into the buffer pool due to some other read operation.

The kinds and amount of data stored in the change buffer are governed by the [`innodb_change_buffering`](innodb-parameters.md#sysvar_innodb_change_buffering) and [`innodb_change_buffer_max_size`](innodb-parameters.md#sysvar_innodb_change_buffer_max_size) configuration options. To see information about the current data in the change buffer, issue the [`SHOW ENGINE INNODB STATUS`](show-engine.md) command.

Formerly known as the ***insert buffer***.

See Also buffer pool, change buffering, delete buffering, DML, insert buffer, insert buffering, merge, page, purge, purge buffering, secondary index, system tablespace.

## change buffering

The general term for the features involving the ***change buffer***, consisting of ***insert buffering***, ***delete buffering***, and ***purge buffering***. Index changes resulting from SQL statements, which could normally involve random I/O operations, are held back and performed periodically by a background ***thread***. This sequence of operations can write the disk blocks for a series of index values more efficiently than if each value were written to disk immediately. Controlled by the [`innodb_change_buffering`](innodb-parameters.md#sysvar_innodb_change_buffering) and [`innodb_change_buffer_max_size`](innodb-parameters.md#sysvar_innodb_change_buffer_max_size) configuration options.

See Also change buffer, delete buffering, insert buffering, purge buffering.

## checkpoint

As changes are made to data pages that are cached in the ***buffer pool***, those changes are written to the ***data files*** sometime later, a process known as ***flushing***. The checkpoint is a record of the latest changes (represented by an ***LSN*** value) that have been successfully written to the data files.

See Also buffer pool, data files, flush, fuzzy checkpointing, LSN.

## checksum

In InnoDB, a validation mechanism to detect corruption when a ***page*** in a ***tablespace*** is read from disk into the `InnoDB` ***buffer pool***. This feature is controlled by the [`innodb_checksums`](innodb-parameters.md#sysvar_innodb_checksums) configuration option in MySQL 5.5. [`innodb_checksums`](innodb-parameters.md#sysvar_innodb_checksums) is deprecated in MySQL 5.6.3, replaced by [`innodb_checksum_algorithm`](innodb-parameters.md#sysvar_innodb_checksum_algorithm).

The [innochecksum](innochecksum.md) command helps diagnose corruption problems by testing the checksum values for a specified ***tablespace*** file while the MySQL server is shut down.

MySQL also uses checksums for replication purposes. For details, see the configuration options [`binlog_checksum`](replication-options-binary-log.md#sysvar_binlog_checksum), [`source_verify_checksum`](replication-options-binary-log.md#sysvar_source_verify_checksum) or [`master_verify_checksum`](replication-options-binary-log.md#sysvar_master_verify_checksum), and [`replica_sql_verify_checksum`](replication-options-replica.md#sysvar_replica_sql_verify_checksum) or [`slave_sql_verify_checksum`](replication-options-replica.md#sysvar_slave_sql_verify_checksum).

See Also buffer pool, page, tablespace.

## child table

In a ***foreign key*** relationship, a child table is one whose rows refer (or point) to rows in another table with an identical value for a specific column. This is the table that contains the `FOREIGN KEY ... REFERENCES` clause and optionally `ON UPDATE` and `ON DELETE` clauses. The corresponding row in the ***parent table*** must exist before the row can be created in the child table. The values in the child table can prevent delete or update operations on the parent table, or can cause automatic deletion or updates in the child table, based on the ON `CASCADE` option used when creating the foreign key.

See Also foreign key, parent table.

## clean page

A ***page*** in the `InnoDB` ***buffer pool*** where all changes made in memory have also been written (***flushed***) to the [data files](glossary.md#glos_data_files). The opposite of a ***dirty page***.

See Also buffer pool, data files, dirty page, flush, page.

## clean shutdown

A ***shutdown*** that completes without errors and applies all changes to `InnoDB` tables before finishing, as opposed to a ***crash*** or a ***fast shutdown***. Synonym for ***slow shutdown***.

See Also crash, fast shutdown, shutdown, slow shutdown.

## client

A program that runs outside the database server, communicating with the database by sending requests through a ***Connector***, or an ***API*** made available through ***client libraries***. It can run on the same physical machine as the database server, or on a remote machine connected over a network. It can be a special-purpose database application, or a general-purpose program like the [mysql](mysql.md) command-line processor.

See Also API, client libraries, connector, mysql, server.

## client libraries

Files containing collections of functions for working with databases. By compiling your program with these libraries, or installing them on the same system as your application, you can run a database application (known as a ***client***) on a machine that does not have the MySQL server installed; the application accesses the database over a network. With MySQL, you can use the ***libmysqlclient*** library from the MySQL server itself.

See Also client, libmysqlclient.

## client-side prepared statement

A type of ***prepared statement*** where the caching and reuse are managed locally, emulating the functionality of ***server-side prepared statements***. Historically, used by some ***Connector/J***, ***Connector/ODBC***, and ***Connector/PHP*** developers to work around issues with server-side stored procedures. With modern MySQL server versions, server-side prepared statements are recommended for performance, scalability, and memory efficiency.

See Also Connector/J, Connector/ODBC, Connector/PHP, prepared statement.

## CLOB

An SQL data type ([`TINYTEXT`](/blob.md), ([`TEXT`](/blob.md), ([`MEDIUMTEXT`](/blob.md), or ([`LONGTEXT`](/blob.md)) for objects containing any kind of character data, of arbitrary size. Used for storing text-based documents, with associated character set and collation order. The techniques for handling CLOBs within a MySQL application vary with each ***Connector*** and ***API***. MySQL Connector/ODBC defines TEXT values as `LONGVARCHAR`. For storing binary data, the equivalent is the ***BLOB*** type.

See Also API, BLOB, connector, Connector/ODBC.

## clustered index

The `InnoDB` term for a ***primary key*** index. `InnoDB` table storage is organized based on the values of the primary key columns, to speed up queries and sorts involving the primary key columns. For best performance, choose the primary key columns carefully based on the most performance-critical queries. Because modifying the columns of the clustered index is an expensive operation, choose primary columns that are rarely or never updated.

In the Oracle Database product, this type of table is known as an ***index-organized table***.

See Also index, primary key, secondary index.

## cold backup

A ***backup*** taken while the database is shut down. For busy applications and websites, this might not be practical, and you might prefer a ***warm backup*** or a ***hot backup***.

See Also backup, hot backup, warm backup.

## column

A data item within a ***row***, whose storage and semantics are defined by a data type. Each ***table*** and ***index*** is largely defined by the set of columns it contains.

Each column has a ***cardinality*** value. A column can be the ***primary key*** for its table, or part of the primary key. A column can be subject to a ***unique constraint***, a ***NOT NULL constraint***, or both. Values in different columns, even across different tables, can be linked by a ***foreign key*** relationship.

In discussions of MySQL internal operations, sometimes ***field*** is used as a synonym.

See Also cardinality, foreign key, index, NOT NULL constraint, primary key, row, table, unique constraint.

## column index

An ***index*** on a single column.

See Also composite index, index.

## column prefix

When an ***index*** is created with a length specification, such as `CREATE INDEX idx ON t1 (c1(N))`, only the first N characters of the column value are stored in the index. Keeping the index prefix small makes the index compact, and the memory and disk I/O savings help performance. (Although making the index prefix too small can hinder query optimization by making rows with different values appear to the query optimizer to be duplicates.)

For columns containing binary values or long text strings, where sorting is not a major consideration and storing the entire value in the index would waste space, the index automatically uses the first N (typically 768) characters of the value to do lookups and sorts.

See Also index.

## command interceptor

Synonym for ***statement interceptor***. One aspect of the ***interceptor*** design pattern available for both ***Connector/NET*** and ***Connector/J***. What Connector/NET calls a command, Connector/J refers to as a statement. Contrast with ***exception interceptor***.

See Also Connector/J, Connector/NET, exception interceptor, interceptor, statement interceptor.

## commit

A ***SQL*** statement that ends a ***transaction***, making permanent any changes made by the transaction. It is the opposite of ***rollback***, which undoes any changes made in the transaction.

InnoDB uses an ***optimistic*** mechanism for commits, so that changes can be written to the data files before the commit actually occurs. This technique makes the commit itself faster, with the tradeoff that more work is required in case of a rollback.

By default, MySQL uses the ***autocommit*** setting, which automatically issues a commit following each SQL statement.

See Also autocommit, optimistic, rollback, SQL, transaction.

## compact row format

A ***row format*** for InnoDB tables. It was the default row format from MySQL 5.0.3 to MySQL 5.7.8. In MySQL 8.0, the default row format is defined by the [`innodb_default_row_format`](innodb-parameters.md#sysvar_innodb_default_row_format) configuration option, which has a default setting of ***DYNAMIC***. The ***COMPACT*** row format provides a more compact representation for nulls and variable-length columns than the ***REDUNDANT*** row format.

For additional information about `InnoDB COMPACT` row format, see [Section 15.10, “InnoDB Row Formats”](innodb-row-format.md).

See Also dynamic row format, file format, redundant row format, row format.

## composite index

An ***index*** that includes multiple columns.

See Also index.

## compressed backup

The compression feature of the ***MySQL Enterprise Backup*** product makes a compressed copy of each tablespace, changing the extension from `.ibd` to `.ibz`. Compressing backup data allows you to keep more backups on hand, and reduces the time to transfer backups to a different server. The data is uncompressed during the restore operation. When a compressed backup operation processes a table that is already compressed, it skips the compression step for that table, because compressing again would result in little or no space savings.

A set of files produced by the ***MySQL Enterprise Backup*** product, where each ***tablespace*** is compressed. The compressed files are renamed with a `.ibz` file extension.

Applying ***compression*** at the start of the backup process helps to avoid storage overhead during the compression process, and to avoid network overhead when transferring the backup files to another server. The process of ***applying*** the ***binary log*** takes longer, and requires uncompressing the backup files.

See Also apply, binary log, compression, hot backup, MySQL Enterprise Backup, tablespace.

## compressed row format

A ***row format*** that enables data and index ***compression*** for `InnoDB` tables. Large fields are stored away from the page that holds the rest of the row data, as in ***dynamic row format***. Both index pages and the large fields are compressed, yielding memory and disk savings. Depending on the structure of the data, the decrease in memory and disk usage might or might not outweigh the performance overhead of uncompressing the data as it is used. See [Section 15.9, “InnoDB Table and Page Compression” for usage details](innodb-compression.md).

For additional information about `InnoDB COMPRESSED` row format, see [DYNAMIC Row Format](innodb-row-format.md#innodb-row-format-dynamic).

See Also compression, dynamic row format, row format.

## compressed table

A table for which the data is stored in compressed form. For `InnoDB`, it is a table created with `ROW_FORMAT=COMPRESSED`. See [Section 15.9, “InnoDB Table and Page Compression” for more information](innodb-compression.md).

See Also compressed row format, compression.

## compression

A feature with wide-ranging benefits from using less disk space, performing less I/O, and using less memory for caching.

InnoDB supports both table-level and page-level compression. `InnoDB` page compression is also referred to as ***transparent page compression***. For more information about `InnoDB` compression, see [Section 15.9, “InnoDB Table and Page Compression”](innodb-compression.md).

Another type of compression is the ***compressed backup*** feature of the ***MySQL Enterprise Backup*** product.

See Also buffer pool, compressed backup, compressed row format, DML, transparent page compression.

## compression failure

Not actually an error, rather an expensive operation that can occur when using ***compression*** in combination with ***DML*** operations. It occurs when: updates to a compressed ***page*** overflow the area on the page reserved for recording modifications; the page is compressed again, with all changes applied to the table data; the re-compressed data does not fit on the original page, requiring MySQL to split the data into two new pages and compress each one separately. To check the frequency of this condition, query the [`INFORMATION_SCHEMA.INNODB_CMP`](information-schema-innodb-cmp-table.md) table and check how much the value of the `COMPRESS_OPS` column exceeds the value of the `COMPRESS_OPS_OK` column. Ideally, compression failures do not occur often; when they do, you can adjust the [`innodb_compression_level`](innodb-parameters.md#sysvar_innodb_compression_level), [`innodb_compression_failure_threshold_pct`](innodb-parameters.md#sysvar_innodb_compression_failure_threshold_pct), and [`innodb_compression_pad_pct_max`](innodb-parameters.md#sysvar_innodb_compression_pad_pct_max) configuration options.

See Also compression, DML, page.

## concatenated index

See composite index.

## concurrency

The ability of multiple operations (in database terminology, ***transactions***) to run simultaneously, without interfering with each other. Concurrency is also involved with performance, because ideally the protection for multiple simultaneous transactions works with a minimum of performance overhead, using efficient mechanisms for ***locking***.

See Also ACID, locking, transaction.

## configuration file

The file that holds the ***option*** values used by MySQL at startup. Traditionally, on Linux and Unix this file is named `my.cnf`, and on Windows it is named `my.ini`. You can set a number of options related to InnoDB under the `[mysqld]` section of the file.

See [Section 4.2.2.2, “Using Option Files”](option-files.md) for information about where MySQL searches for configuration files.

When you use the ***MySQL Enterprise Backup*** product, you typically use two configuration files: one that specifies where the data comes from and how it is structured (which could be the original configuration file for your server), and a stripped-down one containing only a small set of options that specify where the backup data goes and how it is structured. The configuration files used with the ***MySQL Enterprise Backup*** product must contain certain options that are typically left out of regular configuration files, so you might need to add options to your existing configuration file for use with ***MySQL Enterprise Backup***.

See Also my.cnf, MySQL Enterprise Backup, option, option file.

## connection

The communication channel between an application and a MySQL server. The performance and scalability of a database applications is influenced by on how quickly a database connection can be established, how many can be made simultaneously, and how long they persist. The parameters such as ***host***, ***port***, and so on are represented as a ***connection string*** in ***Connector/NET***, and as a ***DSN*** in ***Connector/ODBC***. High-traffic systems make use of an optimization known as the ***connection pool***.

See Also connection pool, connection string, Connector/NET, Connector/ODBC, DSN, host, port.

## DDL

Data definition language, a set of `SQL` statements for manipulating the database itself rather than individual table rows. Includes all forms of the CREATE, ALTER, and DROP statements. Also includes the TRUNCATE statement, because it works differently than a DELETE FROM table_name statement, even though the ultimate effect is similar.

DDL statements automatically commit the current transaction; they cannot be rolled back.

The InnoDB online DDL feature enhances performance for CREATE INDEX, DROP INDEX, and many types of ALTER TABLE operations. See Section 15.12, “InnoDB and Online DDL” for more information. Also, the InnoDB file-per-table setting can affect the behavior of DROP TABLE and TRUNCATE TABLE operations.

Contrast with DML and DCL.

See Also commit, DCL, DML, file-per-table, rollback, SQL, transaction.

## DML
Data manipulation language, a set of SQL statements for performing INSERT, UPDATE, and DELETE operations. The SELECT statement is sometimes considered as a DML statement, because the SELECT ... FOR UPDATE form is subject to the same considerations for locking as INSERT, UPDATE, and DELETE.

DML statements for an InnoDB table operate in the context of a transaction, so their effects can be committed or rolled back as a single unit.

Contrast with DDL and DCL.

See Also commit, DCL, DDL, locking, rollback, SQL, transaction.

## query
In SQL, an operation that reads information from one or more tables. Depending on the organization of data and the parameters of the query, the lookup might be optimized by consulting an index. If multiple tables are involved, the query is known as a join.

For historical reasons, sometimes discussions of internal processing for statements use “query” in a broader sense, including other types of MySQL statements such as DDL and DML statements.

See Also DDL, DML, index, join, SQL, table.

## SQL
The Structured Query Language that is standard for performing database operations. Often divided into the categories ***DDL***, ***DML***, and ***queries***. MySQL includes some additional statement categories such as ***replication***. See [Chapter 9, *Language Structure*](language-structure.md) for the building blocks of SQL syntax, [Chapter 11, *Data Types*](data-types.md) for the data types to use for MySQL table columns, [Chapter 13, *SQL Statements*](sql-statements.md) for details about SQL statements and their associated categories, and [Chapter 12, *Functions and Operators*](functions.md) for standard and MySQL-specific functions to use in queries.

See Also DDL, DML, query, replication.

## replication
The practice of sending changes from a source, to one or more replicas, so that all databases have the same data. This technique has a wide range of uses, such as load-balancing for better scalability, disaster recovery, and testing software upgrades and configuration changes. The changes can be sent between the databases by methods called row-based replication and statement-based replication.

See Also replica, row-based replication, source, statement-based replication.