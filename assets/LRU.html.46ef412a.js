import{_ as n,o as s,c as a,b as p}from"./app.f50d196c.js";const t={},e=p(`<h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u8FD0\u7528\u4F60\u6240\u638C\u63E1\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u8BBE\u8BA1\u548C\u5B9E\u73B0\u4E00\u4E2A\xA0 LRU (\u6700\u8FD1\u6700\u5C11\u4F7F\u7528) \u7F13\u5B58\u673A\u5236 \u3002<br> \u5B9E\u73B0 LRUCache \u7C7B\uFF1A</p><p>LRUCache(int capacity) \u4EE5\u6B63\u6574\u6570\u4F5C\u4E3A\u5BB9\u91CF\xA0capacity \u521D\u59CB\u5316 LRU \u7F13\u5B58<br> int get(int key) \u5982\u679C\u5173\u952E\u5B57 key \u5B58\u5728\u4E8E\u7F13\u5B58\u4E2D\uFF0C\u5219\u8FD4\u56DE\u5173\u952E\u5B57\u7684\u503C\uFF0C\u5426\u5219\u8FD4\u56DE -1 \u3002<br> void put(int key, int value)\xA0\u5982\u679C\u5173\u952E\u5B57\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5219\u53D8\u66F4\u5176\u6570\u636E\u503C\uFF1B\u5982\u679C\u5173\u952E\u5B57\u4E0D\u5B58\u5728\uFF0C\u5219\u63D2\u5165\u8BE5\u7EC4\u300C\u5173\u952E\u5B57-\u503C\u300D\u3002\u5F53\u7F13\u5B58\u5BB9\u91CF\u8FBE\u5230\u4E0A\u9650\u65F6\uFF0C\u5B83\u5E94\u8BE5\u5728\u5199\u5165\u65B0\u6570\u636E\u4E4B\u524D\u5220\u9664\u6700\u4E45\u672A\u4F7F\u7528\u7684\u6570\u636E\u503C\uFF0C\u4ECE\u800C\u4E3A\u65B0\u7684\u6570\u636E\u503C\u7559\u51FA\u7A7A\u95F4\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B\uFF1A

\u8F93\u5165
[&quot;LRUCache&quot;, &quot;put&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;get&quot;]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
\u8F93\u51FA
[null, null, null, 1, null, -1, null, -1, 3, 4]

\u89E3\u91CA
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // \u7F13\u5B58\u662F {1=1}
lRUCache.put(2, 2); // \u7F13\u5B58\u662F {1=1, 2=2}
lRUCache.get(1);    // \u8FD4\u56DE 1
lRUCache.put(3, 3); // \u8BE5\u64CD\u4F5C\u4F1A\u4F7F\u5F97\u5173\u952E\u5B57 2 \u4F5C\u5E9F\uFF0C\u7F13\u5B58\u662F {1=1, 3=3}
lRUCache.get(2);    // \u8FD4\u56DE -1 (\u672A\u627E\u5230)
lRUCache.put(4, 4); // \u8BE5\u64CD\u4F5C\u4F1A\u4F7F\u5F97\u5173\u952E\u5B57 1 \u4F5C\u5E9F\uFF0C\u7F13\u5B58\u662F {4=4, 3=3}
lRUCache.get(1);    // \u8FD4\u56DE -1 (\u672A\u627E\u5230)
lRUCache.get(3);    // \u8FD4\u56DE 3
lRUCache.get(4);    // \u8FD4\u56DE 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0" aria-hidden="true">#</a> \u5B9E\u73B0</h2><h3 id="\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u94FE\u8868" aria-hidden="true">#</a> \u94FE\u8868</h3><p>\u6CA1\u770B\u9898\u89E3\uFF0C\u5199\u4E86\u4E2A\u94FE\u8868\u7248\u7684\uFF0C\u5728 20 / 21 \u4E2A\u7528\u4F8B\u65F6\u8D85\u65F6\u4E86</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Objects</span></span><span class="token punctuation">;</span>

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
                <span class="token comment">// \u8C03\u6574\u94FE\u8868\u987A\u5E8F</span>
                <span class="token function">replace2Top</span><span class="token punctuation">(</span>last<span class="token punctuation">,</span> cur<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> cur<span class="token punctuation">.</span>v<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            last <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
     *  \u5148\u770B\u6709\u65E0\u91CD\u590D\uFF0C\u91CD\u590D\u5C31\u66FF\u6362
     *  \u5982\u679C\u6CA1\u6709\u91CD\u590D\uFF0C\u5C31\u770B\u662F\u5426\u8D85\u8FC7\u5BB9\u91CF\uFF0C\u8D85\u8FC7\u9700\u8981\u6DD8\u6C70\u65E7\u503C
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
            <span class="token comment">// \u6700\u540E\u4E00\u4E2A\u90FD\u6CA1\u627E\u5230\u91CD\u590D\u7684 2 1 2</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                curCapacity<span class="token operator">++</span><span class="token punctuation">;</span>
                head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// \u5BB9\u91CF\u8D85\u4E86</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="linkedhashmap" tabindex="-1"><a class="header-anchor" href="#linkedhashmap" aria-hidden="true">#</a> LinkedHashMap</h3><p>\u7528 hash \u5BFB\u5740\u6027\u80FD\u5C31\u597D\u5F88\u591A\u4E86</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LRUCache</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> cap<span class="token punctuation">;</span>
    <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">LRUCache</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">this</span><span class="token punctuation">.</span>cap <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5C06 key \u53D8\u4E3A\u6700\u8FD1\u4F7F\u7528</span>
        <span class="token function">makeRecently</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u4FEE\u6539 key \u7684\u503C</span>
            cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// \u5C06 key \u53D8\u4E3A\u6700\u8FD1\u4F7F\u7528</span>
            <span class="token function">makeRecently</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u94FE\u8868\u5934\u90E8\u5C31\u662F\u6700\u4E45\u672A\u4F7F\u7528\u7684 key</span>
            <span class="token keyword">int</span> oldestKey <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5C06\u65B0\u7684 key \u6DFB\u52A0\u94FE\u8868\u5C3E\u90E8</span>
        cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">makeRecently</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> val <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u5220\u9664 key\uFF0C\u91CD\u65B0\u63D2\u5165\u5230\u961F\u5C3E</span>
        cache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),c=[e];function o(l,i){return s(),a("div",null,c)}var k=n(t,[["render",o],["__file","LRU.html.vue"]]);export{k as default};
