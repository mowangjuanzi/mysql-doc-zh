## 8.9 控制查询优化器

MySQL provides optimizer control through system variables that affect how query plans are evaluated, switchable optimizations, optimizer and index hints, and the optimizer cost model. 

尽管优化器尚未使用此信息, 但服务器还会维护有关列值的统计信息. 