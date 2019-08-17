#### 3.3.4.6 处理 NULL 值

在你习惯之前, `NULL` 值可能会让你感到惊讶. 从概念上讲, `NULL` 意味着“丢失的未知值”, 它的处理方法与其他值有些不同.

对 `NULL` 进行测试, 使用 [`IS NULL`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-null) 和 [`IS NOT NULL`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-not-null) 操作符, 如下所示:

```sql
mysql> SELECT 1 IS NULL, 1 IS NOT NULL;
+-----------+---------------+
| 1 IS NULL | 1 IS NOT NULL |
+-----------+---------------+
|         0 |             1 |
+-----------+---------------+
```

不能使用算术比较运算符, 比如 [`=`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal), [`<`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than), 或者 [`<>`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_not-equal) 来测试 `NULL`. 演示这个, 尝试以下查询:

```sql
mysql> SELECT 1 = NULL, 1 <> NULL, 1 < NULL, 1 > NULL;
+----------+-----------+----------+----------+
| 1 = NULL | 1 <> NULL | 1 < NULL | 1 > NULL |
+----------+-----------+----------+----------+
|     NULL |      NULL |     NULL |     NULL |
+----------+-----------+----------+----------+
```

因为任何与 `NULL` 的算术运算符比较的结果也是 `NULL`, 所以你不能从这样的比较中获得任何有意义的结果.

在 MySQL 中, `0` 或者 `NULL` 是 false 并且其他任何值都是 true. 布尔运算默认真值为 `1`.

`NULL` 的特殊处理就是为什么在前一节中, 必须使用 `death IS NOT NULL` 而不是 `death <> NULL` 来确定哪些动物已经死亡.

在 `GROUP BY` 中, 两个 `NULL` 值就被认为是相等的.

当执行 `ORDER BY` 时, 如果你执行 `ORDER BY ... ASC`, `NULL` 值将排在首位, 如果你执行 `ORDER BY ... DESC` 将排在末尾.

在处理 `NULL` 值是, 一个常见的错误是假设不可能将 0 或者空值插入到定义为 `NOT NULL` 的列中, 但事实并非如此. 它们实际上是值, 而 `NULL` 的意思是 “没有值”. 你可以使用 `IS NOT NULL` 很容易进行测试, 如下所示:

```sql
mysql> SELECT 0 IS NULL, 0 IS NOT NULL, '' IS NULL, '' IS NOT NULL;
+-----------+---------------+------------+----------------+
| 0 IS NULL | 0 IS NOT NULL | '' IS NULL | '' IS NOT NULL |
+-----------+---------------+------------+----------------+
|         0 |             1 |          0 |              1 |
+-----------+---------------+------------+----------------+
```

因此完全有可能将0或者空字符串插入到 `NOT NULL` 列中, 因为这些列实际上是 `NOT NULL`. 参阅 [`Section B.4.4.3, “NULL 值得问题”`](https://dev.mysql.com/doc/refman/8.0/en/problems-with-null.html).