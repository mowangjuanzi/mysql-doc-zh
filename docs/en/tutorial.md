# Chapter 3 Tutorial

This chapter provides a tutorial introduction to MySQL by showing how to use the [mysql](/mysql.html) client program to create and use a simple database. [mysql](/mysql.html) (sometimes referred to as the “terminal monitor” or just “monitor”) is an interactive program that enables you to connect to a MySQL server, run queries, and view the results. [mysql](/mysql.html) may also be used in batch mode: you place your queries in a file beforehand, then tell [mysql](/mysql.html) to execute the contents of the file. Both ways of using [mysql](/mysql.html) are covered here. 

To see a list of options provided by [mysql](/mysql.html), invoke it with the [`--help`](/mysql-command-options.html#option_mysql_help) option: 

```bash
$> mysql --help
```

This chapter assumes that [mysql](/mysql.html) is installed on your machine and that a MySQL server is available to which you can connect. If this is not true, contact your MySQL administrator. (If you are the administrator, you need to consult the relevant portions of this manual, such as [Chapter 5, *MySQL Server Administration*](/server-administration.html).) 

This chapter describes the entire process of setting up and using a database. If you are interested only in accessing an existing database, you may want to skip the sections that describe how to create the database and the tables it contains. 

Because this chapter is tutorial in nature, many details are necessarily omitted. Consult the relevant sections of the manual for more information on the topics covered here.
