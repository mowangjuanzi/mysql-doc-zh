### 8.2.1 Optimizing SELECT Statements

Queries, in the form of [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statements, perform all the lookup operations in the database. Tuning these statements is a top priority, whether to achieve sub-second response times for dynamic web pages, or to chop hours off the time to generate huge overnight reports.

Besides [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statements, the tuning techniques for queries also apply to constructs such as [`CREATE TABLE...AS SELECT`](https://dev.mysql.com/doc/refman/8.0/en/create-table-select.html), [`INSERT INTO...SELECT`](https://dev.mysql.com/doc/refman/8.0/en/insert-select.html), and `WHERE` clauses in [`DELETE`](https://dev.mysql.com/doc/refman/8.0/en/delete.html) statements. Those statements have additional performance considerations because they combine write operations with the read-oriented query operations.

NDB Cluster supports a join pushdown optimization whereby a qualifying join is sent in its entirety to NDB Cluster data nodes, where it can be distributed among them and executed in parallel. For more information about this optimization, see [Conditions for NDB pushdown joins](https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster-options-variables.html#ndb_join_pushdown-conditions),

The main considerations for optimizing queries are:

- To make a slow `SELECT ... WHERE` query faster, the first thing to check is whether you can add an [index](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_index). Set up indexes on columns used in the `WHERE` clause, to speed up evaluation, filtering, and the final retrieval of results. To avoid wasted disk space, construct a small set of indexes that speed up many related queries used in your application.

  Indexes are especially important for queries that reference different tables, using features such as [joins](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_join) and [foreign keys](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_foreign_key). You can use the [`EXPLAIN`](https://dev.mysql.com/doc/refman/8.0/en/explain.html) statement to determine which indexes are used for a [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html). See [Section 8.3.1, “How MySQL Uses Indexes”](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html) and [Section 8.8.1, “Optimizing Queries with EXPLAIN”](https://dev.mysql.com/doc/refman/8.0/en/using-explain.html).

- Isolate and tune any part of the query, such as a function call, that takes excessive time. Depending on how the query is structured, a function could be called once for every row in the result set, or even once for every row in the table, greatly magnifying any inefficiency.

- Minimize the number of [full table scans](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_full_table_scan) in your queries, particularly for big tables.

- Keep table statistics up to date by using the [`ANALYZE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/analyze-table.html) statement periodically, so the optimizer has the information needed to construct an efficient execution plan.

- Learn the tuning techniques, indexing techniques, and configuration parameters that are specific to the storage engine for each table. Both `InnoDB` and `MyISAM` have sets of guidelines for enabling and sustaining high performance in queries. For details, see [Section 8.5.6, “Optimizing InnoDB Queries”](https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-queries.html) and [Section 8.6.1, “Optimizing MyISAM Queries”](https://dev.mysql.com/doc/refman/8.0/en/optimizing-queries-myisam.html).

- You can optimize single-query transactions for InnoDB tables, using the technique in [Section 8.5.3, “Optimizing InnoDB Read-Only Transactions”](https://dev.mysql.com/doc/refman/8.0/en/innodb-performance-ro-txn.html).

- Avoid transforming the query in ways that make it hard to understand, especially if the optimizer does some of the same transformations automatically.

- If a performance issue is not easily solved by one of the basic guidelines, investigate the internal details of the specific query by reading the [`EXPLAIN`](https://dev.mysql.com/doc/refman/8.0/en/explain.html) plan and adjusting your indexes, `WHERE` clauses, join clauses, and so on. (When you reach a certain level of expertise, reading the [`EXPLAIN`](https://dev.mysql.com/doc/refman/8.0/en/explain.html) plan might be your first step for every query.)

- Adjust the size and properties of the memory areas that MySQL uses for caching. With efficient use of the `InnoDB` [buffer pool](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_buffer_pool), `MyISAM` key cache, and the MySQL query cache, repeated queries run faster because the results are retrieved from memory the second and subsequent times.

- Even for a query that runs fast using the cache memory areas, you might still optimize further so that they require less cache memory, making your application more scalable. Scalability means that your application can handle more simultaneous users, larger requests, and so on without experiencing a big drop in performance.

- Deal with locking issues, where the speed of your query might be affected by other sessions accessing the tables at the same time.

