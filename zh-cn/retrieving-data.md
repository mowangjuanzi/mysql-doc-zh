### 3.3.4 从表中检索数据

The [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statement is used to pull information from a table. The general form of the statement is:

```sql
SELECT what_to_select
FROM which_table
WHERE conditions_to_satisfy;
```

*`what_to_select`* indicates what you want to see. This can be a list of columns, or `*` to indicate “all columns.” *`which_table`* indicates the table from which you want to retrieve data. The `WHERE` clause is optional. If it is present, *`conditions_to_satisfy`* specifies one or more conditions that rows must satisfy to qualify for retrieval.