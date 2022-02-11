今天跑一个 mybatis 的 demo 项目，执行第一条数据库操作时会报错，重启数据库又自动恢复了，比较奇怪  
经过简单的研究，发现连接数不够导致的，但是连接数为什么会不够呢？  
   
![image](https://user-images.githubusercontent.com/43411944/153551030-50a0ea54-fe75-4fd4-b4be-1a4c5a423dd2.png)   
   
my.ini 里面设置的连接数是 20：     
```ini
# 允许最大连接数
max_connections=20
```
hikari 默认连接池的容量是 10，所以只要不同时起好几个服务应该都是没问题的，初步怀疑是 hikari 没归还连接？  
但是后面在 mysql 命令行使用：`show processlist`，发现里面有好多昨天启动 java 应用在占用数据库连接，所以判断还可能是 idea 的 bug，最后再使用 jps 验证，看到果然有好多昨天的 java 应用一直没关  
使用`tskill pid`把这些无关应用关闭之后，一切又恢复正常了，看来真的是错怪 hikari 了

下面是 `show status like  'Threads%'` 里面每一行的含义：  
* Threads_cached：mysql 被客户端断连后不会立即销毁线程，减少频繁创建连接的开销提升性能  
* Threads_connected：当前连接数，和 `show processlist` 的结果一致，但是 `show processlist` 会详细些
* Threads_created：总新建数
* Threads_running：活跃连接数，这个值一般比较小
