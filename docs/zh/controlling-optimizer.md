# 8.9 控制查询优化器

MySQL 通过系统变量提供优化器控制，这些变量会影响查询计划的评估方式，包括可切换的优化、优化器和索引提示以及优化器成本模型。

服务器会在 `column_statistics` 数据字典表中维护关于列值的直方图统计信息（详见 [8.9.6 节 “优化器统计信息”](optimizer-statistics.html)）。与其他数据字典表类似，用户不能直接访问该表。相反，可以通过查询 [`INFORMATION_SCHEMA.COLUMN_STATISTICS`](information-schema-column-statistics-table.html) 来获取直方图信息，该视图是数据字典表的实现。也可以使用 [`ANALYZE TABLE`](analyze-table.html) 语句执行直方图管理操作。