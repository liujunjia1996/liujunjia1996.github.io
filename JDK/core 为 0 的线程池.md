## 背景知识

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/23/4c130e7841914263aae49cef50b7260e.png)

线程池的执行规则：

（1）当线程数小于核心线程数时，创建线程。

（2）当线程数大于等于核心线程数，且任务队列未满时，将任务放入任务队列。

（3）当线程数大于等于核心线程数，且任务队列已满：

若线程数小于最大线程数，创建线程。

若线程数等于最大线程数，抛出异常，拒绝任务。

## 问题

以上是网络上的线程池任务处理流程，大体上没有问题，但是在对于一些边际场景没有描述，比如今天我在处理一个逻辑的时候，写出了这样的代码：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/20/81445153cf2c4bf99b4f8b13b9e20915.png)

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/20/3b47a7930c144bd48b4e033c34a2a126.png)

期望的结果是：每 8 个任务为一批执行，其余的任务在队列里等待，因为每天只跑一次，所有任务执行完毕后 12s 后所有的线程自动回收。

而实际执行的结果却是一直是一个线程在执行任务，直到所有任务执行完毕，类似这样：

```java
IntStream.range(0, 10).forEach(i -> pool1.submit(() ->
		System.out.println(String.valueOf(i) + ' ' + Thread.currentThread().getName())
	)
);

0 pool-2-thread-1
1 pool-2-thread-1
2 pool-2-thread-1
3 pool-2-thread-1
4 pool-2-thread-1
5 pool-2-thread-1
6 pool-2-thread-1
7 pool-2-thread-1
8 pool-2-thread-1
9 pool-2-thread-1
```

查看线程池源码，关键代码如下:

来自 openjdk11

```java
public void execute(Runnable command) {
    if (command == null)
        throw new NullPointerException();
    int c = ctl.get();
    if (workerCountOf(c) < corePoolSize) {
        if (addWorker(command, true))
            return;
        c = ctl.get();
    }
    if (isRunning(c) && workQueue.offer(command)) {
        int recheck = ctl.get();
        if (! isRunning(recheck) && remove(command))
            reject(command);
        else if (workerCountOf(recheck) == 0)
            addWorker(null, false);
    }
    else if (!addWorker(command, false))
        reject(command);
}
```

我的代码里，核心线程为 0，队列采用 ArrayBlockingQueue ，第一次进来时，会在 `else if (workerCountOf(recheck) == 0)` 这个语句的下一行创建一个线程，之后再提任务进来都不会再创建新的线程了，最终就形成了上面的打印结果。

同样的执行，线程池换 jdk 提供的 CachedThreadPool，执行结果如下

```java
IntStream.range(0, 10).forEach(i -> pool1.submit(() ->
		System.out.println(String.valueOf(i) + ' ' + Thread.currentThread().getName())
	)
);

1 pool-3-thread-2
4 pool-3-thread-5
5 pool-3-thread-6
7 pool-3-thread-8
3 pool-3-thread-4
2 pool-3-thread-3
0 pool-3-thread-1
9 pool-3-thread-10
6 pool-3-thread-7
8 pool-3-thread-9
```

同样的执行逻辑，换了 CachedThreadPool 就得到了不同的结果，查看 CachedThreadPool  源码：

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                60L, TimeUnit.SECONDS,
                new SynchronousQueue<Runnable>());
}
```

CachedThreadPool  采用了 SynchronousQueue，它内部不存储元素。

```
注意1：它一种阻塞队列，其中每个 put 必须等待一个 take，反之亦然。同步队列没有任何内部容量，甚至连一个队列的容量都没有。
注意2：它是线程安全的，是阻塞的。
注意3: 不允许使用 null 元素。
注意4：公平排序策略是指调用put的线程之间，或take的线程之间。公平排序策略可以查考ArrayBlockingQueue中的公平策略。
注意5: SynchronousQueue的以下方法很有趣：
  * iterator() 永远返回空，因为里面没东西。
  * peek() 永远返回null。
  * put() 往queue放进去一个element以后就一直wait直到有其他thread进来把这个element取走。
  * offer() 往queue里放一个element后立即返回，如果碰巧这个element被另一个thread取走了，offer方法返回true，认为offer成功；否则返回false。
  * offer(2000, TimeUnit.SECONDS) 往queue里放一个element但是等待指定的时间后才返回，返回的逻辑和offer()方法一样。
  * take() 取出并且remove掉queue里的element（认为是在queue里的。。。），取不到东西他会一直等。
  * poll() 取出并且remove掉queue里的element（认为是在queue里的。。。），只有到碰巧另外一个线程正在往 queue 里 offer 数据或者put数据的时候，
    该方法才会取到东西。否则立即返回null。
  * poll(2000, TimeUnit.SECONDS) 等待指定的时间然后取出并且remove掉queue里的element,其实就是再等其他的thread来往里塞。
  * isEmpty()永远是true。
  * remainingCapacity() 永远是0。
  * remove()和removeAll() 永远是false。
```

所以当提交任务进入线程池，且线程池此刻没有空闲线程时，

这行代码会得出 false：

```java
isRunning(c) && workQueue.offer(command)
```

那么会走到源码这里的逻辑：

```java
else if (!addWorker(command, false))
	reject(command);
```

最后会新建一个线程处理这个任务，就会得到以上的打印结果。

## 结果

这个需求用 CachedThreadPool   其实是比较合适的，但是 CachedThreadPool  的最大线程数太大了，这也是阿里巴巴的编程规约不推荐用它的原因，所以最终使用的线程池配置如下：

```java
final ExecutorService pool = new ThreadPoolExecutor(0, 30,
		12L, TimeUnit.SECONDS,
		new SynchronousQueue<>());
```

这个虽然基本满足了我的需求，但是还是没有完全达到当初设想的交互：

> 每 8 个任务为一批执行，其余的任务在队列里等待，因为每天只跑一次，所有任务执行完毕后所有的线程都要自动回收。

等以后找到解决方案再来还愿 。
