#### 3.3.4.1 Selecting All Data

The simplest form of [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) retrieves everything from a table:

```sql
mysql> SELECT * FROM pet;
+----------+--------+---------+------+------------+------------+
| name     | owner  | species | sex  | birth      | death      |
+----------+--------+---------+------+------------+------------+
| Fluffy   | Harold | cat     | f    | 1993-02-04 | NULL       |
| Claws    | Gwen   | cat     | m    | 1994-03-17 | NULL       |
| Buffy    | Harold | dog     | f    | 1989-05-13 | NULL       |
| Fang     | Benny  | dog     | m    | 1990-08-27 | NULL       |
| Bowser   | Diane  | dog     | m    | 1979-08-31 | 1995-07-29 |
| Chirpy   | Gwen   | bird    | f    | 1998-09-11 | NULL       |
| Whistler | Gwen   | bird    | NULL | 1997-12-09 | NULL       |
| Slim     | Benny  | snake   | m    | 1996-04-29 | NULL       |
| Puffball | Diane  | hamster | f    | 1999-03-30 | NULL       |
+----------+--------+---------+------+------------+------------+
```

This form of [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) is useful if you want to review your entire table, for example, after you've just loaded it with your initial data set. For example, you may happen to think that the birth date for Bowser doesn't seem quite right. Consulting your original pedigree papers, you find that the correct birth year should be 1989, not 1979.

There are at least two ways to fix this:

- Edit the file `pet.txt` to correct the error, then empty the table and reload it using [`DELETE`](https://dev.mysql.com/doc/refman/8.0/en/delete.html) and [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html):
    ```sql
    mysql> DELETE FROM pet;
    mysql> LOAD DATA LOCAL INFILE 'pet.txt' INTO TABLE pet;
    ```
    However, if you do this, you must also re-enter the record for Puffball.

- Fix only the erroneous record with an [`UPDATE`](https://dev.mysql.com/doc/refman/8.0/en/update.html) statement:
    ```sql
    mysql> UPDATE pet SET birth = '1989-08-31' WHERE name = 'Bowser';
    ```
    The [`UPDATE`](https://dev.mysql.com/doc/refman/8.0/en/update.html) changes only the record in question and does not require you to reload the table.