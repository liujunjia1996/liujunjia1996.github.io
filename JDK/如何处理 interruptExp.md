# 背景
我在编写一个 sdk 时，封装了一个用于发 mq 的方法。

这个方法不属于业务的主逻辑，失败了也无所谓，所以不希望这个方法抛给业务任何异常而导致业务不可用。

因此封装这个方法时我写了这样的代码：
```java
try{
  send();
} catch(Exception e) {
  log.error("发送出错", e);
}
```
这时我得到了一个 sonar-lint 的警告：

> Either re-interrupt this method or rethrow the “InterruptedException”

这个 interruptedException 有什么特别之处吗，为啥别的异常都能直接 catch 就完事，它非要报警告?

# 线程的 interrupt 方法
可以使线程的中断标志位 true，但是不会对线程产生实质影响，线程可以通过 `isInterrupted()`查询中断状态并自行响应

# 什么是 interruptException
线程在执行 sleep 或 join 等阻塞方法时，对其调用 xxxThread.interrupt() 时产生

# 两种处理方式
1. 往上抛
2. 忽略，手动设置线程的中断状态

根据我的使用场景，选择了第二种方式：
```java
try{
  send();
} catch(InterruptedException e) {
  log.error("中断异常",e);
  // 这里再次调用 interrupt 是为了让堆栈中更深的方法也能感知到这个异常
  // 不然它们根本不知道有中断发生，更不用谈处理了
  Thread.currentThread().interrupt();
} catch(Exception e) {
  log.error("发送出错",e);
}
```

最后，[这篇](https://www.jianshu.com/p/a8abe097d4ed)关于 interruptException 的文章写的也很好，mark 一下
