import{_ as n,o as s,c as a,d as p}from"./app.43ec1c76.js";const t={},e=p(`<h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h2><p>运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。<br> 实现 LRUCache 类：</p><p>LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存<br> int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。<br> void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>示例：

输入
[&quot;LRUCache&quot;, &quot;put&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;get&quot;]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><h3 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h3><p>没看题解，写了个链表版的，在 20 / 21 个用例时超时了</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Objects</span></span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">LRUCache</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> capacity<span class="token punctuation">;</span>

    <span class="token keyword">int</span> curCapacity<span class="token punctuation">;</span>

    <span class="token class-name">Node</span> head<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">LRUCache</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> last <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> cur<span class="token punctuation">.</span>k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 调整链表顺序</span>
                <span class="token function">replace2Top</span><span class="token punctuation">(</span>last<span class="token punctuation">,</span> cur<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> cur<span class="token punctuation">.</span>v<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            last <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     *  先看有无重复，重复就替换
     *  如果没有重复，就看是否超过容量，超过需要淘汰旧值
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            curCapacity<span class="token operator">++</span><span class="token punctuation">;</span>
            head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">var</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> last <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> cur<span class="token punctuation">.</span>k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cur<span class="token punctuation">.</span>v <span class="token operator">=</span> value<span class="token punctuation">;</span>
                <span class="token function">replace2Top</span><span class="token punctuation">(</span>last<span class="token punctuation">,</span> cur<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 最后一个都没找到重复的 2 1 2</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                curCapacity<span class="token operator">++</span><span class="token punctuation">;</span>
                head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 容量超了</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>curCapacity <span class="token operator">&gt;</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNullElseGet</span><span class="token punctuation">(</span>last<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> head<span class="token punctuation">)</span><span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    curCapacity<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            last <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">replace2Top</span><span class="token punctuation">(</span><span class="token class-name">Node</span> last<span class="token punctuation">,</span> <span class="token class-name">Node</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>last <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        last<span class="token punctuation">.</span>next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        cur<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        head <span class="token operator">=</span> cur<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> k<span class="token punctuation">;</span>
        <span class="token keyword">int</span> v<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> k<span class="token punctuation">,</span> <span class="token keyword">int</span> v<span class="token punctuation">,</span> <span class="token class-name">Node</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>k <span class="token operator">=</span> k<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>v <span class="token operator">=</span> v<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="linkedhashmap" tabindex="-1"><a class="header-anchor" href="#linkedhashmap" aria-hidden="true">#</a> LinkedHashMap</h3><p>用 hash 寻址性能就好很多了</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LRUCache</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> cap<span class="token punctuation">;</span>
    <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">LRUCache</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">this</span><span class="token punctuation">.</span>cap <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 将 key 变为最近使用</span>
        <span class="token function">makeRecently</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 修改 key 的值</span>
            cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 将 key 变为最近使用</span>
            <span class="token function">makeRecently</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 链表头部就是最久未使用的 key</span>
            <span class="token keyword">int</span> oldestKey <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 将新的 key 添加链表尾部</span>
        cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">makeRecently</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> val <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 删除 key，重新插入到队尾</span>
        cache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","LRU.html.vue"]]);export{k as default};
