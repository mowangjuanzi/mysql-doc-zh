### 3.3.3 Loading Data into a Table

After creating your table, you need to populate it. The [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) and [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) statements are useful for this.

Suppose that your pet records can be described as shown here. (Observe that MySQL expects dates in `'YYYY-MM-DD'` format; this may be different from what you are used to.)

| name | owner | species | sex | birth | death |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Fluffy | Harold | cat | f | 1993-02-04 | |
| Claws | Gwen | cat | m | 1994-03-17| |
| Buffy | Harold | dog | f | 1989-05-13| |
| Fang | Benny | dog | m | 1990-08-27 | |
| Bowser | Diane | dog | m | 1979-08-31 | 1995-07-29 |
| Chirpy | Gwen | bird | f | 1998-09-11 | |
| Whistler | Gwen | bird | | 1997-12-09 | |
| Slim | Benny | snake | m | 1996-04-29 | &nbsp; |

Because you are beginning with an empty table, an easy way to populate it is to create a text file containing a row for each of your animals, then load the contents of the file into the table with a single statement.

You could create a text file `pet.txt` containing one record per line, with values separated by tabs, and given in the order in which the columns were listed in the [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) statement. For missing values (such as unknown sexes or death dates for animals that are still living), you can use `NULL` values. To represent these in your text file, use `\N` (backslash, capital-N). For example, the record for Whistler the bird would look like this (where the whitespace between values is a single tab character):

```text
Whistler        Gwen    bird    \N      1997-12-09      \N
```

To load the text file `pet.txt` into the `pet` table, use this statement:

```sql
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet;
```

If you created the file on Windows with an editor that uses `\r\n` as a line terminator, you should use this statement instead:

```sql
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet
       LINES TERMINATED BY '\r\n';
```

(On an Apple machine running OS X, you would likely want to use `LINES TERMINATED BY '\r'`.)

You can specify the column value separator and end of line marker explicitly in the [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) statement if you wish, but the defaults are tab and linefeed. These are sufficient for the statement to read the file `pet.txt` properly.

If the statement fails, it is likely that your MySQL installation does not have local file capability enabled by default. See [Section 6.1.6, “Security Issues with LOAD DATA LOCAL”](https://dev.mysql.com/doc/refman/8.0/en/load-data-local.html), for information on how to change this.

When you want to add new records one at a time, the [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) statement is useful. In its simplest form, you supply values for each column, in the order in which the columns were listed in the [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) statement. Suppose that Diane gets a new hamster named “Puffball”. You could add a new record using an [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) statement like this:

```sql
mysql> INSERT INTO pet
       VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);
```

String and date values are specified as quoted strings here. Also, with [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html), you can insert `NULL` directly to represent a missing value. You do not use `\N` like you do with [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html).

From this example, you should be able to see that there would be a lot more typing involved to load your records initially using several [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) statements rather than a single [`LOAD DATA`](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) statement.

