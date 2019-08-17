### 3.3.2 Creating a Table

Creating the database is the easy part, but at this point it is empty, as [`SHOW TABLES`](https://dev.mysql.com/doc/refman/8.0/en/show-tables.html) tells you:

```sql
mysql> SHOW TABLES;
Empty set (0.00 sec)
```

The harder part is deciding what the structure of your database should be: what tables you need and what columns should be in each of them.

You want a table that contains a record for each of your pets. This can be called the `pet` table, and it should contain, as a bare minimum, each animal's name. Because the name by itself is not very interesting, the table should contain other information. For example, if more than one person in your family keeps pets, you might want to list each animal's owner. You might also want to record some basic descriptive information such as species and sex.

How about age? That might be of interest, but it is not a good thing to store in a database. Age changes as time passes, which means you'd have to update your records often. Instead, it is better to store a fixed value such as date of birth. Then, whenever you need age, you can calculate it as the difference between the current date and the birth date. MySQL provides functions for doing date arithmetic, so this is not difficult. Storing birth date rather than age has other advantages, too:

- You can use the database for tasks such as generating reminders for upcoming pet birthdays. (If you think this type of query is somewhat silly, note that it is the same question you might ask in the context of a business database to identify clients to whom you need to send out birthday greetings in the current week or month, for that computer-assisted personal touch.)

- You can calculate age in relation to dates other than the current date. For example, if you store death date in the database, you can easily calculate how old a pet was when it died.

You can probably think of other types of information that would be useful in the `pet` table, but the ones identified so far are sufficient: name, owner, species, sex, birth, and death.

Use a [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) statement to specify the layout of your table:

```sql
mysql> CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
       species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
```

[`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) is a good choice for the `name`, `owner`, and `species` columns because the column values vary in length. The lengths in those column definitions need not all be the same, and need not be **20**. You can normally pick any length from **1** to **65535**, whatever seems most reasonable to you. If you make a poor choice and it turns out later that you need a longer field, MySQL provides an [`ALTER TABLE`](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html) statement.

Several types of values can be chosen to represent sex in animal records, such as `'m'` and `'f'`, or perhaps `'male'` and `'female'`. It is simplest to use the single characters `'m'` and `'f'`.

The use of the [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) data type for the birth and death columns is a fairly obvious choice.

Once you have created a table, [`SHOW TABLES`](https://dev.mysql.com/doc/refman/8.0/en/show-tables.html) should produce some output:

```sql
mysql> SHOW TABLES;
+---------------------+
| Tables in menagerie |
+---------------------+
| pet                 |
+---------------------+
```

To verify that your table was created the way you expected, use a [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html) statement:

```sql
mysql> DESCRIBE pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
```

You can use [`DESCRIBE`](https://dev.mysql.com/doc/refman/8.0/en/describe.html) any time, for example, if you forget the names of the columns in your table or what types they have.

For more information about MySQL data types, see [Chapter 11, ***Data Types***](https://dev.mysql.com/doc/refman/8.0/en/data-types.html).