show variables like "%version%"`  
![image](https://user-images.githubusercontent.com/43411944/140270326-5dbc4219-efb9-4a7f-b150-3e7162d73721.png)

## mysql 服务器流程
连接器 -> 查询缓存 -> 解析器(关键字有没有用错，结构对不对) -> 处理器(表名、字段是不是存在，别名的处理) -> 优化器 -> 执行引擎 -> 后处理，返回结果

## sql 执行顺序
explain 结果的第一列 id 用来标识整个 SQL 的执行顺序。id 如果相同，从上往下依次执行；id 不同，id 值越大，执行优先级越高，越先被执行；如果行引用其他行的并集结果，则该值可以为 NULL，如例 1 的用于去重的临时表的 id 就是 null。

## 例 1
```
EXPLAIN
SELECT * FROM tbl_user AS tb1 WHERE user_name = '薛沉香'
UNION
SELECT * FROM tbl_user AS tb2 WHERE user_name = '慕容兰娟';
```
因为 UNION 默认是去重的，所以需要用一个临时表存去重后的结果集，id 越大越先执行，id 相同则从上到下执行：  
  
![image](https://user-images.githubusercontent.com/43411944/140271057-d448eb9e-5bc7-4ac8-8ec8-28a0da91c851.png)

如果将 UNION 改为 UNION ALL，就不需要临时表了  
  
![image](https://user-images.githubusercontent.com/43411944/140271189-fd8230c7-1a9e-4eb5-bc07-fdcf48337ca6.png)

## 例 2
```
CREATE TABLE `student` (
  `studentid` int(11) NOT NULL,
  `studentname` varchar(45) NOT NULL,
  `teacherid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `teacher` (
  `teacherid` int(11) NOT NULL,
  `teachername` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

`explain select * from student where teacherid in (select teacherid from teacher);`    

![image](https://user-images.githubusercontent.com/43411944/141982616-13e06571-f613-42d6-8b4d-83364cc1e390.png)

这条语句，mysql 会优化成半连接 (semi join)，具体的执行流程大概是：   
1) 先执行子查询语句 select teacherid from teacher，将结果集放入到临时表，该临时表就是子查询结果集的列，并进行去重。如果结果集不大，建立基于内存的 Memory 存储引擎的临时表，并建立 hash 索引；如果结果集非常大，超过了系统变量 tmp_table_size 或者 max_heap_table_size，临时表会转而使用基于磁盘的存储引擎来保存结果集中的记录，索引类型也对应转变为 B+ 树索引。   

 结果集记录保存到临时表的过程，称之为物化 (Materialize)，该临时表称之为物化表。   

2) 物化之后，对于 student 表，如表记录的 teacherid 值在物化表中，会记录到最终的结果集；同样对于物化表，其每个列值 (teacherid) 在 student 表能找到对应列的值，就能写到最终结果集。所以就相当于 student 表与物化表 (materialize_table) 内联。   


```sql
select * from student where teacherid in (select teacherid from teacher);
select * from student s inner join teacher t on s.teacherid = t.teacherid;
```
这两条 sql 看似一样，其实有细微差别，前者需要去重，但后者不需要去重，所以前者这种子查询不能直接优化成联表，只能优化成半连接，那么 mysql 什么情况下会把子查询优化成真正的联表呢？  

答案是把 teacher 表的 teacherid 设置为主键，主键不可重复，这个查询直接就可以通过表上拉优化（指子查询优化成联表的过程），不再需要临时表去重，等同于真正的联表；

![image](https://user-images.githubusercontent.com/43411944/141982645-78b26a5b-86c3-4a29-bc06-b23d1acbe281.png)  