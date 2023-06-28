# 3.6 常见查询示例

下面使如何用 MySQL 解决一些常见问题的示例. 

一些示例表使用 shop 表为特定的贸易商(经销商)保存每个商品(商品编号)的价格. 假设每个商人的每件物品都有一个固定的价格, 然后 (`article`, `dealer`) 使每条记录的主键. 

启动命令行工具 [mysql](mysql.html) 并选择一个数据库: 

```bash
$> mysql your-database-name
```

创建和填充示例表, 使用以下语句: 

```sql
CREATE TABLE shop (
    article INT UNSIGNED  DEFAULT '0000' NOT NULL,
    dealer  CHAR(20)      DEFAULT ''     NOT NULL,
    price   DECIMAL(16,2) DEFAULT '0.00' NOT NULL,
    PRIMARY KEY(article, dealer));
INSERT INTO shop VALUES
    (1,'A',3.45),(1,'B',3.99),(2,'A',10.99),(3,'B',1.45),
    (3,'C',1.69),(3,'D',1.25),(4,'D',19.95);
```

在执行以下语句后, 表应该显示如下内容: 

```bash
SELECT * FROM shop ORDER BY article;

+---------+--------+-------+
| article | dealer | price |
+---------+--------+-------+
|       1 | A      |  3.45 |
|       1 | B      |  3.99 |
|       2 | A      | 10.99 |
|       3 | B      |  1.45 |
|       3 | C      |  1.69 |
|       3 | D      |  1.25 |
|       4 | D      | 19.95 |
+---------+--------+-------+
```
