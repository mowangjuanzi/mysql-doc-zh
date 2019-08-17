#### 3.3.4.9 使用多个表

`pet` 表记录你拥有哪些宠物. 如果你想记录它们它们生活中的其他事, 比如去看兽医, 或者当幼崽出生时, 你需要另外一张表. 这张表应该是什么样子呢? 它需要包含以下内心:

- 宠物的名字, 这样你就能知道每件事属于哪一种动物.

- 一个日期， 以便你知道事情发生的时间.

- 描述事情的字段.

- 事情类型字段, 如果你想对事情进行分类.

考虑到这些因素, `event` 表的 [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) 语句可能像下面那样:

```sql
mysql> CREATE TABLE event (name VARCHAR(20), date DATE,
       type VARCHAR(15), remark VARCHAR(255));
```

与 `pet` 表一样, 创建一个制表符分隔的包含以下信息的文本文件, 通过加载该文件来初始化记录是最容易的.

| name | date | type | remark |
|:---:|:---:|:---:|:---:|
| Fluffy | 1995-05-15 | litter | 4 kittens, 3 female, 1 male |
| Buffy | 1993-06-23 | litter | 5 puppies, 2 female, 3 male |
| Buffy | 1994-06-19 | litter | 3 puppies, 3 female |
| Chirpy | 1999-03-21 | vet | needed beak straightened |
| Slim | 1997-08-03 | vet | broken rib |
| Bowser | 1991-10-12 | kennel | |
| Fang | 1991-10-12 | kennel | |
| Fang | 1998-08-28 | birthday | Gave him a new chew toy |
| Claws | 1998-03-17 | birthday | Gave him a new flea collar |
| Whistler | 1998-12-09 | birthday | First birthday |

加载记录如下所示:

```sql
mysql> LOAD DATA LOCAL INFILE 'event.txt' INTO TABLE event;
```

基于你在 `pet` 表中运行的查询中学到的知识, 你应该能够对 `event` 表中的记录执行检索; 原理是一样的. 但是什么时候 `event` 表本身不足以回答你可能提出的问题呢?

假设你想知道每只宠物生幼崽的年龄. 我们前面看到了如何从两个日期计算年龄. 母亲的产仔日期在 `event` 表中, 但是要计算该日期的年龄,  你需要它的出生日期, 其存储在 `pet` 表中. 这意味着要查询两个表:

```sql
mysql> SELECT pet.name,
       TIMESTAMPDIFF(YEAR,birth,date) AS age,
       remark
       FROM pet INNER JOIN event
         ON pet.name = event.name
       WHERE event.type = 'litter';
+--------+------+-----------------------------+
| name   | age  | remark                      |
+--------+------+-----------------------------+
| Fluffy |    2 | 4 kittens, 3 female, 1 male |
| Buffy  |    4 | 5 puppies, 2 female, 3 male |
| Buffy  |    5 | 3 puppies, 3 female         |
+--------+------+-----------------------------+
```

关于这个查询, 有几点需要注意:

- `FROM` 子句连接两个表, 因为查询需要从这两个表中提取信息.

- 当从多个表组合 (`joining`) 信息时, 你需要指定如何将一个表中的记录与另一个表中的记录匹配. 这很简单, 因为它们都有一个 `name` 列. 查询使用 `ON` 子句基于 `name` 值来匹配两个表中的值.
	
	查询使用 `INNER JOIN` 来组合表. 如果仅当两个表的记录都满足 `ON` 子句中指定的条件时,  `INNER JOIN` 允许两个表中的记录出现在结果中. 在本例中, `ON` 子句指定 `pet` 表中的 `name` 列与 `event` 表中的 `name` 列匹配. 如果 name 出现在一个表中而没有出现在另一个表中, 那么由于 `ON` 子句中的条件失败, 那么结果中将不会出现该行.

- 因为 `name` 列同时出现在两个表中, 所以在访问该列时, 必须明确指明是哪个表. 这是通过将表名前置到列名前来实现的.

你不需要两个不同的表执行连接. 有时候, 如果你想将表中的记录与该表中的其他记录进行比较, 那么将表连接到它自己是非常有用的. 例如, 要在你的宠物中找出配对进行繁殖, 你可以将 `pet` 表与它自己连接起来, 以生成存活物种的雌性和雄性的候选配对:

```sql
mysql> SELECT p1.name, p1.sex, p2.name, p2.sex, p1.species
       FROM pet AS p1 INNER JOIN pet AS p2
         ON p1.species = p2.species
         AND p1.sex = 'f' AND p1.death IS NULL
         AND p2.sex = 'm' AND p2.death IS NULL;
+--------+------+-------+------+---------+
| name   | sex  | name  | sex  | species |
+--------+------+-------+------+---------+
| Fluffy | f    | Claws | m    | cat     |
| Buffy  | f    | Fang  | m    | dog     |
+--------+------+-------+------+---------+
```

在这个查询中, 我们指定了表的别名以指定访问的列, 并保证访问的列与对应的表的实例进行关联.