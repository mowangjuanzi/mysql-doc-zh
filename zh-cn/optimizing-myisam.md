## 8.6 优化 MyISAM 表

[`MyISAM`](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html) 存储引擎在以读为主的数据或低并发操作时性能最好, 因为表锁限制了同时执行更新的能力. 在 MySQL 中, [`InnoDB`](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html) 是默认的存储引擎, 而不是 `MyISAM`. 