import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const e={},a=s(`<p>\u6700\u8FD1\u505A\u4E00\u4E2A\u9700\u6C42\uFF0C\u6211\u8D1F\u8D23\u7F16\u5199\u5E94\u7528\u5C42\u670D\u52A1\uFF0C\u4E00\u4E2A\u5E94\u7528\u5C42\u670D\u52A1\u7684\u8BF7\u6C42\u53EF\u80FD\u4F1A\u8C03\u7528\u591A\u6B21\u9886\u57DF\u5C42\u670D\u52A1\uFF08\u8BFB\u653E\u5927\uFF09\uFF0C\u5E76\u4E14\u6211\u548C\u4E0B\u6E38\u9886\u57DF\u5C42\u662F\u901A\u8FC7 http \u4EA4\u4E92\u7684\uFF0C\u6240\u4EE5\u6211\u5C31\u60F3\u80FD\u4E0D\u80FD\u5E76\u53D1\u5730\u8C03\u7528\u9886\u57DF\u5C42\u3002</p><p>\u5728 js \u4E2D\u6709 Promise.all() \u8FD9\u79CD\u65B9\u6CD5\u6765\u4E00\u6B21\u6267\u884C\u5F88\u591A\u5F02\u6B65\u4EFB\u52A1\uFF0C\u7B49\u6240\u6709\u7684\u4EFB\u52A1\u90FD\u5B8C\u6210\u8FD9\u4E2A\u5927 Promise \u5BF9\u8C61\u7684\u72B6\u6001\u624D\u4F1A\u66F4\u65B0\u3002</p><p>\u6240\u4EE5\uFF0C\u5728 java \u4E2D\u6211\u5199\u4E86\u4E00\u4E2A\u7C7B\u4F3C\u529F\u80FD\u7684\u5DE5\u5177\u7C7B\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>package com.allawn.rtsw.operating.common.util;

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
            , 0, TimeUnit.DAYS, new SynchronousQueue&lt;&gt;(),
            r -&gt; new Thread(r, &quot;httpSender &quot; + r.hashCode()), new ThreadPoolExecutor.AbortPolicy());

    public static &lt;T&gt; List&lt;T&gt; getAllRes(List&lt;CompletableFuture&lt;T&gt;&gt; futureList) {
        // \u628A\u6240\u6709 future \u5305\u88C5\u6210\u4E00\u4E2A\u5927 future
        var allFuture = CompletableFuture.allOf(futureList.toArray(new CompletableFuture[0]));

        var resList = new ArrayList&lt;T&gt;();
        long start = System.currentTimeMillis();
        try {
            // \u963B\u585E\u5F53\u524D\u7EBF\u7A0B\uFF0C\u7B49\u5F85\u6240\u6709\u7ED3\u679C\u90FD\u8FD4\u56DE\uFF0C\u8FD9\u4E2A allFuture \u7684\u8FD4\u56DE\u503C\u4E0D\u7528\u5173\u6CE8\uFF0C\u5B83\u53EA\u662F\u7528\u6765\u963B\u585E\u7EBF\u7A0B\u7684
            allFuture.get(10, TimeUnit.SECONDS);
            long end = System.currentTimeMillis();
            LogUtils.debug(&quot;\u6267\u884C\u8017\u65F6 {}&quot;, end - start);

            for (CompletableFuture&lt;T&gt; mapCompletableFuture : futureList) {
                T res = mapCompletableFuture.get();
                resList.add(res);
            }
        } catch (InterruptedException e) {
            LogUtils.error(&quot;\u4E2D\u65AD\u5F02\u5E38\uFF0C{}&quot;, e);
            Thread.currentThread().interrupt();
            throw new BizException(ErrorEnum.EXECUTE_ERROR);
        } catch (ExecutionException e) {
            LogUtils.error(&quot;\u6267\u884C\u9519\u8BEF\uFF0C{}&quot;, e);
            throw new BizException(ErrorEnum.EXECUTE_ERROR);
        } catch (TimeoutException e) {
            LogUtils.error(&quot;\u6267\u884C\u8D85\u65F6\uFF0C{}&quot;, e);
            throw new BizException(ErrorEnum.EXECUTE_TIMEOUT_ERROR);
        }

        return resList;
    }

    public static &lt;T&gt; List&lt;CompletableFuture&lt;T&gt;&gt; genFutureList(List&lt;Supplier&lt;T&gt;&gt; supplierList) {
        var futureList = new ArrayList&lt;CompletableFuture&lt;T&gt;&gt;();
        supplierList.forEach(supplier -&gt; futureList.add(CompletableFuture.supplyAsync(supplier, EXECUTOR)));
        return futureList;
    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br></div></div><p>\u4F7F\u7528\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>var resData = new HashMap&lt;String, Object&gt;(16);
var supplierList = new ArrayList&lt;Supplier&lt;Map&lt;String, Object&gt;&gt;&gt;();
for (var entry : dataQueryBo.getContent().entrySet()) {
    // \u6784\u9020\u8BF7\u6C42\u4F53
    var requestBody = getRequestBody(dataQueryBo);
    requestBody.put(CommonConst.CONTENT, entry.getValue());
    var strategy = entry.getKey();

    // \u6784\u5EFA supplier
    supplierList.add(() -&gt; {
        var httpResp = HttpUtils.post(getUrl(dataQueryBo, strategy), headers, requestBody);
        httpResp.put(CommonConst.STRATEGY, strategy);
        return httpResp;
    });
}

// \u4ECE\u8FD9\u91CC\u5F00\u59CB\u4F7F\u7528\u4E86\u5DE5\u5177\u7C7B
// 1.\u6784\u9020\u4EFB\u52A1\u5217\u8868
var futureList = ExecuteUtils.genFutureList(supplierList);
// 2. \u963B\u585E\u7EBF\u7A0B\uFF0C\u7B49\u5F85\u6240\u6709\u4EFB\u52A1\u90FD\u6267\u884C\u5B8C\u6BD5
var resList = ExecuteUtils.getAllRes(futureList);
// 3. \u6267\u884C\u5230\u8FD9\u91CC\u8BF4\u660E\uFF0C\u6240\u6709\u7684\u8BF7\u6C42\u90FD\u5DF2\u6267\u884C\u5B8C\u6BD5\uFF0C\u904D\u5386\u7ED3\u679C\uFF0C\u8FDB\u884C\u4E1A\u52A1\u903B\u8F91
for (Map&lt;String, Object&gt; domainRespMap : resList) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>ps: \u8FC7\u4E86\u51E0\u5929\u6211\u53D1\u73B0\u5176\u5B9E\u4E0D\u7528\u8FD9\u4E48\u9EBB\u70E6\uFF0C\u76F4\u63A5\u4F7F\u7528 springboot \u7684 @async \u6CE8\u89E3\u4F1A\u66F4\u52A0\u4F18\u96C5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>@Async
public CompletableFuture&lt;String&gt; doTaskOne() throws Exception {
    log.info(&quot;\u5F00\u59CB\u505A\u4EFB\u52A1\u4E00&quot;);
    long start = System.currentTimeMillis();
    Thread.sleep(random.nextInt(10000));
    long end = System.currentTimeMillis();
    log.info(&quot;\u5B8C\u6210\u4EFB\u52A1\u4E00\uFF0C\u8017\u65F6\uFF1A&quot; + (end - start) + &quot;\u6BEB\u79D2&quot;);
    return CompletableFuture.completedFuture(&quot;\u4EFB\u52A1\u4E00\u5B8C\u6210&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>@Test
public void test() throws Exception {
    long start = System.currentTimeMillis();

    CompletableFuture&lt;String&gt; task1 = asyncTasks.doTaskOne();
    CompletableFuture&lt;String&gt; task2 = asyncTasks.doTaskTwo();
    CompletableFuture&lt;String&gt; task3 = asyncTasks.doTaskThree();

    CompletableFuture.allOf(task1, task2, task3).join();

    long end = System.currentTimeMillis();

    log.info(&quot;\u4EFB\u52A1\u5168\u90E8\u5B8C\u6210\uFF0C\u603B\u8017\u65F6\uFF1A&quot; + (end - start) + &quot;\u6BEB\u79D2&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,9);function r(l,t){return a}var i=n(e,[["render",r],["__file","CompletableFuture \u7684\u5E94\u7528.html.vue"]]);export{i as default};
