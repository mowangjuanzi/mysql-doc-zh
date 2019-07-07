### 3.6.7 两个键上搜索

在一个键上使用 [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or) 非常好优化, 就像是处理 [`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and) 一样.

一个棘手的情况是在两个不同的键上使用 [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or):

```sql
SELECT field1_index, field2_index FROM test_table
WHERE field1_index = '1' OR  field2_index = '1'
```

这种情况优化过. 参阅 [Section 8.2.1.3, “索引合并优化”](https://dev.mysql.com/doc/refman/8.0/en/index-merge-optimization.html).

你还可以使用 [`UNION`](https://dev.mysql.com/doc/refman/8.0/en/union.html) 组合两个单独的 [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 语句的输出解决这个问题. 参阅 [Section 13.2.10.3, “UNION 语法”](https://dev.mysql.com/doc/refman/8.0/en/union.html).

每个 [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) 只搜索一个键, 可以优化:

```sql
SELECT field1_index, field2_index
    FROM test_table WHERE field1_index = '1'
UNION
SELECT field1_index, field2_index
    FROM test_table WHERE field2_index = '1';
```