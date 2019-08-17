### 3.6.1 列的最大值

“最大的商品编号是?”

```sql
SELECT MAX(article) AS article FROM shop;

+---------+
| article |
+---------+
|       4 |
+---------+
```