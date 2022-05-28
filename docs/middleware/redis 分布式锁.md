## 业务场景
多实例之间访问共享资源，有时需要加锁，防止产生并发执行问题。
## 代码实现
### 版本 1  
```
if (setnx(key, 1) == 1){
    expire(key, 30)
    try {
        //TODO 业务逻辑
    } finally {
        del(key)
    }
}
```
### 版本 1 存在的问题
如果 SETNX 成功，在设置锁超时时间后，如果服务器宕机、重启或网络有波动，EXPIRE 命令执行失败，导致锁没有设置超时时间而变成死锁。  
### 版本 2 
```java
if (redis.call('setnx',KEYS[1],ARGV[1]) < 1) 
then return 0; 
end; 
redis.call('expire',KEYS[1],tonumber(ARGV[2])); 
return 1;
```
添加 lua 脚本，使加锁和设置锁过期时间成为一个原子逻辑。   
ps：用 redisTemplate 的 putIfAbsent 同时传入 key value 和 过期时间也可以实现
### 锁过期导致的问题
如果线程 A 成功获取到了锁，并且设置了过期时间 30 秒，但线程 A 执行时间超过了 30 秒，锁过期自动释放，此时线程 B 获取到了锁；  
随后 A 执行完成，线程 A 使用 DEL 命令来释放锁，但此时线程 B 加的锁还没有执行完成，线程 A 实际释放的线程 B 加的锁。  
这样就会导致分布式锁，锁不住的问题。  
可以通过设置守护线程自动续期解决或者直接设置足够大的过期时间解决。  
