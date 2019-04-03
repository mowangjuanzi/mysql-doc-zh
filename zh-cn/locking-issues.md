## 8.11 Optimizing Locking Operations

MySQL manages contention for table contents using [locking](https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_locking): 

- Internal locking is performed within the MySQL server itself to manage contention for table contents by multiple threads. This type of locking is internal because it is performed entirely by the server and involves no other programs. See [Section 8.11.1, “Internal Locking Methods”](https://dev.mysql.com/doc/refman/8.0/en/internal-locking.html). 
- External locking occurs when the server and other programs lock [`MyISAM`](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html) table files to coordinate among themselves which program can access the tables at which time. See [Section 8.11.5, “External Locking”](https://dev.mysql.com/doc/refman/8.0/en/external-locking.html). 