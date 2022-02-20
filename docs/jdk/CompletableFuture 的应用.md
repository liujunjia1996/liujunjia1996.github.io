最近做一个需求，我负责编写应用层服务，一个应用层服务的请求可能会调用多次领域层服务（读放大），并且我和下游领域层是通过 http 交互的，所以我就想能不能并发地调用领域层。

在 js 中有 Promise.all() 这种方法来一次执行很多异步任务，等所有的任务都完成这个大 Promise 对象的状态才会更新。

所以，在 java 中我写了一个类似功能的工具类：

```java
package com.allawn.rtsw.operating.common.util;

import com.allawn.rtsw.operating.common.enums.ErrorEnum;
import com.allawn.rtsw.operating.common.exp.BizException;
import com.oppo.trace.threadpool.TraceThreadPoolExecutor;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.function.Supplier;

/**
 * @author liujunjia
 * 2021/7/22 11: 44
 **/
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExecuteUtils {

    static final Executor EXECUTOR = new TraceThreadPoolExecutor(128, 128
            , 0, TimeUnit.DAYS, new SynchronousQueue<>(),
            r -> new Thread(r, "httpSender " + r.hashCode()), new ThreadPoolExecutor.AbortPolicy());

    public static <T> List<T> getAllRes(List<CompletableFuture<T>> futureList) {
        // 把所有 future 包装成一个大 future
        var allFuture = CompletableFuture.allOf(futureList.toArray(new CompletableFuture[0]));

        var resList = new ArrayList<T>();
        long start = System.currentTimeMillis();
        try {
            // 阻塞当前线程，等待所有结果都返回，这个 allFuture 的返回值不用关注，它只是用来阻塞线程的
            allFuture.get(10, TimeUnit.SECONDS);
            long end = System.currentTimeMillis();
            LogUtils.debug("执行耗时 {}", end - start);

            for (CompletableFuture<T> mapCompletableFuture : futureList) {
                T res = mapCompletableFuture.get();
                resList.add(res);
            }
        } catch (InterruptedException e) {
            LogUtils.error("中断异常，{}", e);
            Thread.currentThread().interrupt();
            throw new BizException(ErrorEnum.EXECUTE_ERROR);
        } catch (ExecutionException e) {
            LogUtils.error("执行错误，{}", e);
            throw new BizException(ErrorEnum.EXECUTE_ERROR);
        } catch (TimeoutException e) {
            LogUtils.error("执行超时，{}", e);
            throw new BizException(ErrorEnum.EXECUTE_TIMEOUT_ERROR);
        }

        return resList;
    }

    public static <T> List<CompletableFuture<T>> genFutureList(List<Supplier<T>> supplierList) {
        var futureList = new ArrayList<CompletableFuture<T>>();
        supplierList.forEach(supplier -> futureList.add(CompletableFuture.supplyAsync(supplier, EXECUTOR)));
        return futureList;
    }

}

```

使用：
```java
var resData = new HashMap<String, Object>(16);
var supplierList = new ArrayList<Supplier<Map<String, Object>>>();
for (var entry : dataQueryBo.getContent().entrySet()) {
    // 构造请求体
    var requestBody = getRequestBody(dataQueryBo);
    requestBody.put(CommonConst.CONTENT, entry.getValue());
    var strategy = entry.getKey();

    // 构建 supplier
    supplierList.add(() -> {
        var httpResp = HttpUtils.post(getUrl(dataQueryBo, strategy), headers, requestBody);
        httpResp.put(CommonConst.STRATEGY, strategy);
        return httpResp;
    });
}

// 从这里开始使用了工具类
// 1.构造任务列表
var futureList = ExecuteUtils.genFutureList(supplierList);
// 2. 阻塞线程，等待所有任务都执行完毕
var resList = ExecuteUtils.getAllRes(futureList);
// 3. 执行到这里说明，所有的请求都已执行完毕，遍历结果，进行业务逻辑
for (Map<String, Object> domainRespMap : resList) {
}
```

ps: 过了几天我发现其实不用这么麻烦，直接使用 springboot 的 @async 注解会更加优雅

```java
@Async
public CompletableFuture<String> doTaskOne() throws Exception {
    log.info("开始做任务一");
    long start = System.currentTimeMillis();
    Thread.sleep(random.nextInt(10000));
    long end = System.currentTimeMillis();
    log.info("完成任务一，耗时：" + (end - start) + "毫秒");
    return CompletableFuture.completedFuture("任务一完成");
}
```

```java
@Test
public void test() throws Exception {
    long start = System.currentTimeMillis();

    CompletableFuture<String> task1 = asyncTasks.doTaskOne();
    CompletableFuture<String> task2 = asyncTasks.doTaskTwo();
    CompletableFuture<String> task3 = asyncTasks.doTaskThree();

    CompletableFuture.allOf(task1, task2, task3).join();

    long end = System.currentTimeMillis();

    log.info("任务全部完成，总耗时：" + (end - start) + "毫秒");
}
```