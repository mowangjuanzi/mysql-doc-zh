### 3.6.7 Searching on Two Keys

An [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or) using a single key is well optimized, as is the handling of [`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and).

The one tricky case is that of searching on two different keys combined with [`OR`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_or):

```sql
SELECT field1_index, field2_index FROM test_table
WHERE field1_index = '1' OR  field2_index = '1'
```

This case is optimized. See [Section 8.2.1.3, “Index Merge Optimization”](https://dev.mysql.com/doc/refman/8.0/en/index-merge-optimization.html).

You can also solve the problem efficiently by using a [`UNION`](https://dev.mysql.com/doc/refman/8.0/en/union.html) that combines the output of two separate [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statements. See [Section 13.2.10.3, “UNION Syntax”](https://dev.mysql.com/doc/refman/8.0/en/union.html).

Each [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) searches only one key and can be optimized:

```sql
SELECT field1_index, field2_index
    FROM test_table WHERE field1_index = '1'
UNION
SELECT field1_index, field2_index
    FROM test_table WHERE field2_index = '1';
```