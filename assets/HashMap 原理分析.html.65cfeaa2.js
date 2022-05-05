import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9c7ab487.js";const a={},e=s(`<blockquote><p>\u7F16\u7A0B\u7684\u4E16\u754C\u4E2D\uFF0C\u4EFB\u4F55\u4E1C\u897F\u90FD\u53EF\u4EE5\u7528\u6570\u636E\u7ED3\u6784\u548C\u7B97\u6CD5\u6982\u62EC\uFF0C\u5927\u5230\u6574\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5C0F\u5230 HashMap \u8FD9\u4E2A\u6570\u636E\u7ED3\u6784\u672C\u8EAB\u3002\u4E0B\u9762\u6211\u5C06\u4ECE\u6570\u636E\u7ED3\u6784\u548C\u7B97\u6CD5\u7684\u89D2\u5EA6\u5206\u6790 HashMap \u7684\u539F\u7406\u3002</p></blockquote><h2 id="\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> \u6570\u636E\u7ED3\u6784</h2><h3 id="\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668" aria-hidden="true">#</a> \u5BB9\u5668</h3><p>\u6570\u7EC4 + \u94FE\u8868/\u7EA2\u9ED1\u6811</p><h3 id="\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#\u5143\u7D20" aria-hidden="true">#</a> \u5143\u7D20</h3><p>\u91CC\u9762\u662F\u952E\u503C\u5BF9\u548C\u952E\u7684 hash \u4EE5\u53CA\u540E\u7EE7\u8282\u70B9\u7684\u6307\u9488\u7EC4\u6210</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>static class Node&lt;K,V&gt; implements Map.Entry&lt;K,V&gt; {
    final int hash;
    final K key;
    V value;
    Node&lt;K,V&gt; next;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u7ED3\u8BBA\uFF1AHashMap \u5185\u90E8\u662F\u7531\u4E00\u4E2A\u4E00\u4E2A node \u4E3A\u5355\u4F4D\u5B58\u50A8\u5728\u6570\u7EC4/\u94FE\u8868/\u7EA2\u9ED1\u6811\u4E2D\u7684\u3002</p><h2 id="\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u7B97\u6CD5" aria-hidden="true">#</a> \u7B97\u6CD5</h2><h3 id="\u521D\u59CB\u5316" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316" aria-hidden="true">#</a> \u521D\u59CB\u5316</h3><p>HashMap \u7684\u521D\u59CB\u5316\u662F\u60F0\u6027\u7684</p><p>\u5E38\u89C1\u7684\u7A7A\u53C2\u6784\u9020\u51FD\u6570\u4E2D\uFF0C\u53EA\u521D\u59CB\u5316\u4E86\u52A0\u8F7D\u56E0\u5B50\uFF0C\u5373 0.75</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u5E26\u5BB9\u91CF\u548C\u52A0\u8F7D\u56E0\u5B50\u7684\u6784\u9020\u51FD\u6570\uFF0C\u4E5F\u53EA\u662F\u5904\u7406\u4E86\u4E00\u4E9B\u7B80\u5355\u903B\u8F91</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity &lt; 0)
        throw new IllegalArgumentException(&quot;Illegal initial capacity: &quot; +
                                            initialCapacity);
    if (initialCapacity &gt; MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor &lt;= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException(&quot;Illegal load factor: &quot; +
                                            loadFactor);
    this.loadFactor = loadFactor;
    // tableSizeFor \u8FD4\u56DE\u4E00\u4E2A\u4E0D\u5C0F\u4E8E\u7ED9\u5B9A\u503C\u7684\u6700\u5C0F\u7684 2 \u7684\u6307\u6570\u503C\uFF0C\u4F8B\u5982\uFF0C7-&gt; 8\uFF0C8-&gt; 8\uFF0C9-&gt; 16
    // \u81F3\u4E8E\u8FD9\u91CC\u4E3A\u4EC0\u4E48\u8FD9\u6837\u8BBE\u7F6E\u9608\u503C\u4E0B\u6587\u4F1A\u6709\u89E3\u91CA
    this.threshold = tableSizeFor(initialCapacity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="put" tabindex="-1"><a class="header-anchor" href="#put" aria-hidden="true">#</a> put</h3><h3 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> get</h3><h2 id="\u95EE\u9898\u70B9" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u70B9" aria-hidden="true">#</a> \u95EE\u9898\u70B9</h2><h3 id="\u4E3A\u4EC0\u4E48\u5BB9\u91CF\u8981\u662F-2-\u7684\u6307\u6570" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u5BB9\u91CF\u8981\u662F-2-\u7684\u6307\u6570" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u5BB9\u91CF\u8981\u662F 2 \u7684\u6307\u6570</h3><p>2 \u7684\u6307\u6570\u7684\u5BB9\u91CF\u5BF9\u5E94\u5230\u7D22\u5F15\u503C\u662F 0 \u5230 2 \u7684 n \u6B21\u65B9 - 1\uFF0C\u6B64\u65F6\u6700\u5927\u7D22\u5F15\u7684\u4E8C\u8FDB\u5236\u6BCF\u4E00\u4F4D\u90FD\u662F 1\u3002</p><p>key \u7684 hashcode \u5408\u5E76\u9AD8\u4F4D\u5F71\u54CD\uFF0C\u518D\u4E0E\u8BE5\u5BB9\u91CF\u6309\u4F4D\u4E0E\u4E4B\u540E\uFF0C\u4E0D\u4F1A\u6270\u52A8 hashcode\uFF0C\u5229\u4E8E node \u5728\u6570\u7EC4\u4E0A\u5747\u5300\u5206\u5E03\u3002</p><h3 id="\u5408\u5E76\u9AD8\u4F4D\u5F71\u54CD\u4E3A\u4EC0\u4E48\u91C7\u7528\u5F02\u6216-\u800C\u4E0D\u662F\u4E0E-or-\u6216" tabindex="-1"><a class="header-anchor" href="#\u5408\u5E76\u9AD8\u4F4D\u5F71\u54CD\u4E3A\u4EC0\u4E48\u91C7\u7528\u5F02\u6216-\u800C\u4E0D\u662F\u4E0E-or-\u6216" aria-hidden="true">#</a> \u5408\u5E76\u9AD8\u4F4D\u5F71\u54CD\u4E3A\u4EC0\u4E48\u91C7\u7528\u5F02\u6216\uFF0C\u800C\u4E0D\u662F\u4E0E or \u6216</h3><p>\u4E0E\u548C\u6216\u53EF\u4EE5\u53EA\u51ED\u4E00\u4E2A\u5143\u7D20\u786E\u5B9A\u7ED3\u679C\uFF0C\u800C\u5F02\u6216\u5FC5\u987B\u4E24\u4E2A\u5143\u7D20\u4E00\u8D77\u53C2\u4E0E\u8FD0\u7B97<br> \u4E0E\u7684\u65F6\u5019\uFF0C\u4EFB\u610F\u5143\u7D20\u662F 0\uFF0C\u7ED3\u679C\u5FC5\u662F 0<br> \u6216\u7684\u65F6\u5019\uFF0C\u4EFB\u610F\u5143\u7D20\u662F 1\uFF0C\u7ED3\u679C\u5FC5\u662F 1</p><h3 id="\u4E3A\u4EC0\u4E48\u8981\u91CD\u5199-hashcode-equals" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u8981\u91CD\u5199-hashcode-equals" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u8981\u91CD\u5199 hashcode / equals</h3><p>hashcode \u7528\u6765\u5B9A\u4F4D node \u5728\u6570\u7EC4\u4E0A\u7684\u4F4D\u7F6E\uFF0Cequals \u7528\u6765\u5224\u65AD\uFF0C\u5F53 hashcode \u51B2\u7A81\u65F6\uFF0C\u662F\u8986\u5199\u8FD8\u662F\u8FFD\u52A0\u3002</p><p>\u5982\u679C\u53EA\u91CD\u5199 hashcode\uFF0C\u5F53 hashcode \u51B2\u7A81\u65F6\u4F1A\u53D1\u751F\u503C\u8986\u76D6\u7684\u95EE\u9898\u3002</p><p>\u5982\u679C\u53EA\u91CD\u5199 equals\uFF0C\u4F1A\u51FA\u73B0\u6876\u4F4D\u7F6E\u5806\u79EF\u7684\u60C5\u51B5\uFF0C\u5F71\u54CD\u63D2\u5165\u548C\u67E5\u8BE2\u6548\u7387\u3002</p><h3 id="\u4E3A\u4EC0\u4E48\u8F6C\u7EA2\u9ED1\u6811\u524D\u8981\u5224\u65AD\u5BB9\u91CF\u662F\u5426\u5C0F\u4E8E-64" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u8F6C\u7EA2\u9ED1\u6811\u524D\u8981\u5224\u65AD\u5BB9\u91CF\u662F\u5426\u5C0F\u4E8E-64" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u8F6C\u7EA2\u9ED1\u6811\u524D\u8981\u5224\u65AD\u5BB9\u91CF\u662F\u5426\u5C0F\u4E8E 64</h3><p>\u9996\u5148\u8981\u77E5\u9053\u4E3A\u4EC0\u4E48\u4F1A\u51FA\u73B0\u7EA2\u9ED1\u6811\u7ED3\u6784 \u2014\u2014\u2014\u2014 hash \u51B2\u7A81\u4E25\u91CD\uFF0C\u7528\u94FE\u8868\u7ED3\u6784\u67E5\u8BE2\u592A\u6162\uFF0C\u7EA2\u9ED1\u6811\u6709\u8F83\u597D\u7684\u67E5\u8BE2\u6027\u80FD\u3002</p><p>\u4F46\u662F\uFF0C\u6269\u5BB9\u6570\u7EC4\u4E5F\u53EF\u4EE5\u89E3\u51B3 hash \u51B2\u7A81\uFF0C\u589E\u52A0\u67E5\u8BE2\u6027\u80FD\uFF0C\u5E76\u4E14\u5F53\u603B\u5BB9\u91CF\u6BD4\u8F83\u5C0F\u7684\u65F6\u5019\uFF0Crehash \u7684\u6574\u4F53\u6210\u672C\u4F4E\u4E8E\u7EF4\u62A4\u4E00\u4E2A\u7EA2\u9ED1\u6811\uFF08\u7EA2\u9ED1\u6811\u7684\u65B0\u5EFA\u548C\u6DFB\u52A0\u503C\u90FD\u6709\u6027\u80FD\u5F00\u9500\uFF09\u3002</p><p>\u6240\u4EE5\u5F53\u5BB9\u91CF\u5C0F\u4E8E 64 \u7684\u65F6\u5019\u4F18\u5148\u6269\u5BB9\uFF0C\u76F8\u5F53\u4E8E\u7528\u7A7A\u95F4\u6362\u65F6\u95F4\u4E86\u3002</p><h3 id="\u5934\u63D2\u548C\u5C3E\u63D2\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u5934\u63D2\u548C\u5C3E\u63D2\u7684\u533A\u522B" aria-hidden="true">#</a> \u5934\u63D2\u548C\u5C3E\u63D2\u7684\u533A\u522B</h3><p>...</p><h3 id="table-\u5B57\u6BB5\u4E3A\u4EC0\u4E48\u8981\u52A0-transient" tabindex="-1"><a class="header-anchor" href="#table-\u5B57\u6BB5\u4E3A\u4EC0\u4E48\u8981\u52A0-transient" aria-hidden="true">#</a> table \u5B57\u6BB5\u4E3A\u4EC0\u4E48\u8981\u52A0 transient</h3><p>\u6570\u7EC4\u91CC\u6700\u5C11\u6709\u56DB\u5206\u4E4B\u4E00\u662F\u7A7A\u503C\uFF0C\u4E0D\u80FD\u76F4\u63A5\u5E8F\u5217\u5316\u3002</p><h3 id="hashmap-\u4F7F\u7528\u7684\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#hashmap-\u4F7F\u7528\u7684\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> HashMap \u4F7F\u7528\u7684\u6CE8\u610F\u4E8B\u9879</h3><ul><li><p>\u521D\u59CB\u5316\u65F6\u6307\u5B9A\u5BB9\u91CF\uFF0C\u9632\u6B62\u9891\u7E41\u6269\u5BB9</p></li><li><p>\u904D\u5386\u65F6\u904D\u5386 EntrySet\uFF0C\u9632\u6B62\u518D\u53BB\u6839\u636E key \u53D6\u627E value</p></li></ul><h3 id="\u89E3\u51B3-hash-\u51B2\u7A81\u7684\u51E0\u79CD\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3-hash-\u51B2\u7A81\u7684\u51E0\u79CD\u65B9\u6CD5" aria-hidden="true">#</a> \u89E3\u51B3 hash \u51B2\u7A81\u7684\u51E0\u79CD\u65B9\u6CD5</h3><p>\u62C9\u94FE\u548C\u5F00\u653E\u5730\u5740\u6CD5\uFF0CHashMap \u4F7F\u7528\u62C9\u94FE\u6CD5\uFF0CThreadLocal \u4F7F\u7528\u5F00\u653E\u5730\u5740\u6CD5</p><h3 id="\u4E3A\u4EC0\u4E48-threadlocal-\u4E0D\u76F4\u63A5\u7528-hashmap" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48-threadlocal-\u4E0D\u76F4\u63A5\u7528-hashmap" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48 ThreadLocal \u4E0D\u76F4\u63A5\u7528 HashMap</h3><p>\u8F6F\u5F15\u7528</p><h3 id="hashtable-\u548C-hashtable-\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#hashtable-\u548C-hashtable-\u533A\u522B" aria-hidden="true">#</a> HashTable \u548C HashTable \u533A\u522B</h3><p>\u6700\u4E3B\u8981\u7684\u533A\u522B\u662F HashTable \u7684 put/get/contains \u90FD\u52A0\u4E86 synchronized\uFF0C\u6240\u4EE5 HashTable \u662F\u7EBF\u7A0B\u5B89\u5168\u7684\uFF0C\u4F46\u6027\u80FD\u4E0D\u4F73</p><h3 id="hashmap-\u7684\u5E76\u53D1\u6709\u4EC0\u4E48\u95EE\u9898-chm-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#hashmap-\u7684\u5E76\u53D1\u6709\u4EC0\u4E48\u95EE\u9898-chm-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898" aria-hidden="true">#</a> HashMap \u7684\u5E76\u53D1\u6709\u4EC0\u4E48\u95EE\u9898\uFF08chm \u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898\uFF09</h3><p>\u591A\u7EBF\u7A0B\u64CD\u4F5C HashMap \u53EF\u80FD\u4F1A\u9020\u6210\u4E22\u6570\u636E\uFF0C\u6216\u6B7B\u5FAA\u73AF\u94FE\u8868\u3002chm \u901A\u8FC7\u52A0\u9501\u89E3\u51B3\u4E86\u8FD9\u4E2A\u95EE\u9898\u3002<br> 1.7 \u662F\u5206\u6BB5\u9501\uFF0C\u4F46\u662F\u7F3A\u9677\u662F Segment \u6570\u7EC4\u4E00\u65E6\u521D\u59CB\u5316\u4E86\u4E4B\u540E\u4E0D\u4F1A\u6269\u5BB9\uFF0C\u4E0D\u80FD\u968F\u7740\u5BB9\u91CF\u7684\u63D0\u5347\u800C\u81EA\u52A8\u589E\u52A0\u5E76\u53D1\u5EA6\uFF0C\u6240\u4EE5\u9700\u8981\u4F7F\u7528\u8005\u63D0\u524D\u8BC4\u4F30\u9700\u8981\u591A\u5927\u7684\u5E76\u53D1\u5EA6\u3002<br> 1.8 \u662F\u69FD\u4F4D\u9501\uFF0C\u4E00\u4E2A hash \u69FD\u5C31\u662F\u4E00\u628A\u9501\uFF0C\u7EC6\u7C92\u5EA6\u5F88\u5C0F\uFF0C\u5E76\u53D1\u5EA6\u8DDF\u5BB9\u91CF\u6B63\u76F8\u5173\uFF0C\u6027\u80FD\u8F83\u597D\u3002</p><h3 id="\u4E3A\u4EC0\u4E48-concurrenthashmap-\u4E0D\u652F\u6301-key-\u6216\u8005-value-\u4E3A-null" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48-concurrenthashmap-\u4E0D\u652F\u6301-key-\u6216\u8005-value-\u4E3A-null" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48 ConcurrentHashMap \u4E0D\u652F\u6301 key \u6216\u8005 value \u4E3A null \uFF1F</h3><p>\u9996\u5148\uFF0C key \u4E3A\u4EC0\u4E48\u4E5F\u4E0D\u80FD\u4E3A null \uFF1F\u6211\u4E0D\u77E5\u9053\uFF0C\u6CA1\u60F3\u660E\u767D\uFF0C\u53EF\u80FD\u662F\u4F5C\u8005 lea \u4F6C\u4E0D\u559C\u6B22 null \u503C\u3002\u90A3 value \u4E3A\u4EC0\u4E48\u4E0D\u80FD\u4E3A null \uFF1F\u56E0\u4E3A\u5728\u591A\u7EBF\u7A0B\u60C5\u51B5\u4E0B\uFF0C null \u503C\u4F1A\u4EA7\u751F\u4E8C\u4E49\u6027\uFF0C\u56E0\u4E3A\u4F60\u4E0D\u6E05\u695A map \u91CC\u5230\u5E95\u662F\u4E0D\u5B58\u5728\u5728\u8FD9\u4E2A key \uFF0C\u8FD8\u662F\u8BF4\u88AB put(key\uFF0Cnull)\u3002\u8FD9\u91CC\u53EF\u80FD\u6709\u4EBA\u4F1A\u8BF4\uFF0C\u90A3 HashMap \u4E0D\u4E00\u6837\u6709\u8FD9\u4E2A\u95EE\u9898\uFF1FHashMap \u53EF\u4EE5\u901A\u8FC7 containsKey \u6765\u5224\u65AD\u662F\u5426\u5B58\u5728\u8FD9\u4E2A key\uFF0C\u800C\u591A\u7EBF\u7A0B\u4F7F\u7528\u7684 ConcurrentHashMap \u5C31\u4E0D\u80FD\u591F\u3002\u6BD4\u5982\u4F60 get\uFF08key\uFF09 \u5F97\u5230\u4E86 null\uFF0C\u6B64\u65F6 map \u91CC\u9762\u6CA1\u6709\u8FD9\u4E2A key \u7684\uFF0C\u4F46\u662F\u4F60\u4E0D\u77E5\u9053\uFF0C\u6240\u4EE5\u4F60\u60F3\u8C03\u7528 containsKey \u770B\u770B\uFF0C\u800C\u6070\u5DE7\u5728\u4F60\u8C03\u7528\u4E4B\u524D\uFF0C\u522B\u7684\u7EBF\u7A0B put \u4E86\u8FD9\u4E2A key \uFF0C\u8FD9\u6837\u4F60 containsKey \u5C31\u53D1\u73B0\u6709\u8FD9\u4E2A key\uFF0C\u8FD9\u662F\u4E0D\u662F\u5C31\u53D1\u751F\u201C\u8BEF\u4F1A\u201D\u4E86\u3002</p><h3 id="concurrenthashmap-\u7684-size-\u600E\u4E48\u7B97" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap-\u7684-size-\u600E\u4E48\u7B97" aria-hidden="true">#</a> ConcurrentHashMap \u7684 size \u600E\u4E48\u7B97\uFF1F</h3><ul><li>JDK1.7 \u548C JDK1.8 \u5BF9 size \u7684\u8BA1\u7B97\u662F\u4E0D\u4E00\u6837\u7684\u3002 1.7 \u4E2D\u662F\u5148\u4E0D\u52A0\u9501\u8BA1\u7B97\u4E09\u6B21\uFF0C\u5982\u679C\u4E09\u6B21\u7ED3\u679C\u4E0D\u4E00\u6837\u518D\u9501\u5168\u90E8 Segment \u7D2F\u52A0\u3002</li><li>JDK1.8 size \u662F\u901A\u8FC7\u5BF9 baseCount \u548C counterCell \u8FDB\u884C CAS \u8BA1\u7B97\uFF08\u5148\u5C1D\u8BD5\u66F4\u65B0 baseCount\uFF0Ccas baseCount \u5931\u8D25\u518D cas counterCell\uFF0C\u5982\u679C\u8FD8\u662F\u5931\u8D25\u5C31\u91CD\u8BD5\u76F4\u5230 cas \u6210\u529F\uFF09\uFF0C\u6700\u7EC8\u901A\u8FC7 baseCount \u548C \u904D\u5386 CounterCell \u6570\u7EC4\u5F97\u51FA size\u3002</li><li>JDK1.8 \u63A8\u8350\u4F7F\u7528 mappingCount \u65B9\u6CD5\uFF0C\u56E0\u4E3A\u8FD9\u4E2A\u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u662F long \u7C7B\u578B\uFF0C\u4E0D\u4F1A\u56E0\u4E3A size \u65B9\u6CD5\u662F int \u7C7B\u578B\u9650\u5236\u6700\u5927\u503C\u3002</li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>*
 * Copyright (c) 1997, 2018, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the &quot;Classpath&quot; exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.util;

import jdk.internal.misc.SharedSecrets;

import java.io.IOException;
import java.io.InvalidObjectException;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * Hash table based implementation of the {@code Map} interface.  This
 * implementation provides all of the optional map operations, and permits
 * {@code null} values and the {@code null} key.  (The {@code HashMap}
 * class is roughly equivalent to {@code Hashtable}, except that it is
 * unsynchronized and permits nulls.)  This class makes no guarantees as to
 * the order of the map; in particular, it does not guarantee that the order
 * will remain constant over time.
 *
 * &lt;p&gt; This implementation provides constant-time performance for the basic
 * operations ({@code get} and {@code put}), assuming the hash function
 * disperses the elements properly among the buckets.  Iteration over
 * collection views requires time proportional to the &quot;capacity&quot; of the
 * {@code HashMap} instance (the number of buckets) plus its size (the number
 * of key-value mappings).  Thus, it&#39;s very important not to set the initial
 * capacity too high (or the load factor too low) if iteration performance is
 * important.
 *
 * &lt;p&gt; An instance of {@code HashMap} has two parameters that affect its
 * performance: &lt;i&gt; initial capacity &lt;/i&gt; and &lt;i&gt; load factor &lt;/i&gt;.  The
 * &lt;i&gt; capacity &lt;/i&gt; is the number of buckets in the hash table, and the initial
 * capacity is simply the capacity at the time the hash table is created.  The
 * &lt;i&gt; load factor &lt;/i&gt; is a measure of how full the hash table is allowed to
 * get before its capacity is automatically increased.  When the number of
 * entries in the hash table exceeds the product of the load factor and the
 * current capacity, the hash table is &lt;i&gt; rehashed &lt;/i&gt; (that is, internal data
 * structures are rebuilt) so that the hash table has approximately twice the
 * number of buckets.
 *
 * &lt;p&gt; As a general rule, the default load factor (.75) offers a good
 * tradeoff between time and space costs.  Higher values decrease the
 * space overhead but increase the lookup cost (reflected in most of
 * the operations of the {@code HashMap} class, including
 * {@code get} and {@code put}).  The expected number of entries in
 * the map and its load factor should be taken into account when
 * setting its initial capacity, so as to minimize the number of
 * rehash operations.  If the initial capacity is greater than the
 * maximum number of entries divided by the load factor, no rehash
 * operations will ever occur.
 *
 * &lt;p&gt; If many mappings are to be stored in a {@code HashMap}
 * instance, creating it with a sufficiently large capacity will allow
 * the mappings to be stored more efficiently than letting it perform
 * automatic rehashing as needed to grow the table.  Note that using
 * many keys with the same {@code hashCode()} is a sure way to slow
 * down performance of any hash table. To ameliorate impact, when keys
 * are {@link Comparable}, this class may use comparison order among
 * keys to help break ties.
 *
 * &lt;p&gt; &lt;strong&gt; Note that this implementation is not synchronized.&lt;/strong&gt;
 * If multiple threads access a hash map concurrently, and at least one of
 * the threads modifies the map structurally, it &lt;i&gt; must &lt;/i&gt; be
 * synchronized externally.  (A structural modification is any operation
 * that adds or deletes one or more mappings; merely changing the value
 * associated with a key that an instance already contains is not a
 * structural modification.)  This is typically accomplished by
 * synchronizing on some object that naturally encapsulates the map.
 * &lt;p&gt;
 * If no such object exists, the map should be &quot;wrapped&quot; using the
 * {@link Collections#synchronizedMap Collections.synchronizedMap}
 * method.  This is best done at creation time, to prevent accidental
 * unsynchronized access to the map: &lt;pre&gt;
 *   Map m = Collections.synchronizedMap(new HashMap(...)); &lt;/pre&gt;
 *
 * &lt;p&gt; The iterators returned by all of this class&#39;s &quot;collection view methods&quot;
 * are &lt;i&gt; fail-fast &lt;/i&gt;: if the map is structurally modified at any time after
 * the iterator is created, in any way except through the iterator&#39;s own
 * {@code remove} method, the iterator will throw a
 * {@link ConcurrentModificationException}.  Thus, in the face of concurrent
 * modification, the iterator fails quickly and cleanly, rather than risking
 * arbitrary, non-deterministic behavior at an undetermined time in the
 * future.
 *
 * &lt;p&gt; Note that the fail-fast behavior of an iterator cannot be guaranteed
 * as it is, generally speaking, impossible to make any hard guarantees in the
 * presence of unsynchronized concurrent modification.  Fail-fast iterators
 * throw {@code ConcurrentModificationException} on a best-effort basis.
 * Therefore, it would be wrong to write a program that depended on this
 * exception for its correctness: &lt;i&gt; the fail-fast behavior of iterators
 * should be used only to detect bugs.&lt;/i&gt;
 *
 * &lt;p&gt; This class is a member of the
 * &lt;a href=&quot;{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework&quot;&gt;
 * Java Collections Framework &lt;/a&gt;.
 *
 * @param &lt;K&gt; the type of keys maintained by this map
 * @param &lt;V&gt; the type of mapped values
 * @author Doug Lea
 * @author Josh Bloch
 * @author Arthur van Hoff
 * @author Neal Gafter
 * @see Object#hashCode()
 * @see Collection
 * @see Map
 * @see TreeMap
 * @see Hashtable
 * @since 1.2
 */
public class HashMap&lt;K, V&gt; extends AbstractMap&lt;K, V&gt;
        implements Map&lt;K, V&gt;, Cloneable, Serializable {

    private static final long serialVersionUID = 362498820763181265L;

    /*
     * Implementation notes.
     *
     * This map usually acts as a binned (bucketed) hash table, but
     * when bins get too large, they are transformed into bins of
     * TreeNodes, each structured similarly to those in
     * java.util.TreeMap. Most methods try to use normal bins, but
     * relay to TreeNode methods when applicable (simply by checking
     * instanceof a node).  Bins of TreeNodes may be traversed and
     * used like any others, but additionally support faster lookup
     * when overpopulated. However, since the vast majority of bins in
     * normal use are not overpopulated, checking for existence of
     * tree bins may be delayed in the course of table methods.
     *
     * Tree bins (i.e., bins whose elements are all TreeNodes) are
     * ordered primarily by hashCode, but in the case of ties, if two
     * elements are of the same &quot;class C implements Comparable &lt;C&gt;&quot;,
     * type then their compareTo method is used for ordering. (We
     * conservatively check generic types via reflection to validate
     * this -- see method comparableClassFor).  The added complexity
     * of tree bins is worthwhile in providing worst-case O(log n)
     * operations when keys either have distinct hashes or are
     * orderable, Thus, performance degrades gracefully under
     * accidental or malicious usages in which hashCode() methods
     * return values that are poorly distributed, as well as those in
     * which many keys share a hashCode, so long as they are also
     * Comparable. (If neither of these apply, we may waste about a
     * factor of two in time and space compared to taking no
     * precautions. But the only known cases stem from poor user
     * programming practices that are already so slow that this makes
     * little difference.)
     *
     * Because TreeNodes are about twice the size of regular nodes, we
     * use them only when bins contain enough nodes to warrant use
     * (see TREEIFY_THRESHOLD). And when they become too small (due to
     * removal or resizing) they are converted back to plain bins.  In
     * usages with well-distributed user hashCodes, tree bins are
     * rarely used.  Ideally, under random hashCodes, the frequency of
     * nodes in bins follows a Poisson distribution
     * (http://en.wikipedia.org/wiki/Poisson_distribution) with a
     * parameter of about 0.5 on average for the default resizing
     * threshold of 0.75, although with a large variance because of
     * resizing granularity. Ignoring variance, the expected
     * occurrences of list size k are (exp(-0.5) * pow(0.5, k) /
     * factorial(k)). The first values are:
     *
     * 0:    0.60653066
     * 1:    0.30326533
     * 2:    0.07581633
     * 3:    0.01263606
     * 4:    0.00157952
     * 5:    0.00015795
     * 6:    0.00001316
     * 7:    0.00000094
     * 8:    0.00000006
     * more: less than 1 in ten million
     *
     * The root of a tree bin is normally its first node.  However,
     * sometimes (currently only upon Iterator.remove), the root might
     * be elsewhere, but can be recovered following parent links
     * (method TreeNode.root()).
     *
     * All applicable internal methods accept a hash code as an
     * argument (as normally supplied from a public method), allowing
     * them to call each other without recomputing user hashCodes.
     * Most internal methods also accept a &quot;tab&quot; argument, that is
     * normally the current table, but may be a new or old one when
     * resizing or converting.
     *
     * When bin lists are treeified, split, or untreeified, we keep
     * them in the same relative access/traversal order (i.e., field
     * Node.next) to better preserve locality, and to slightly
     * simplify handling of splits and traversals that invoke
     * iterator.remove. When using comparators on insertion, to keep a
     * total ordering (or as close as is required here) across
     * rebalancings, we compare classes and identityHashCodes as
     * tie-breakers.
     *
     * The use and transitions among plain vs tree modes is
     * complicated by the existence of subclass LinkedHashMap. See
     * below for hook methods defined to be invoked upon insertion,
     * removal and access that allow LinkedHashMap internals to
     * otherwise remain independent of these mechanics. (This also
     * requires that a map instance be passed to some utility methods
     * that may create new nodes.)
     *
     * The concurrent-programming-like SSA-based coding style helps
     * avoid aliasing errors amid all of the twisty pointer operations.
     */

    /**
     * The default initial capacity - MUST be a power of two.
     */
    static final int DEFAULT_INITIAL_CAPACITY = 1 &lt;&lt; 4; // aka 16

    /**
     * The maximum capacity, used if a higher value is implicitly specified
     * by either of the constructors with arguments.
     * MUST be a power of two &lt;= 1 &lt;&lt; 30.
     * \u5373 2 \u7684 31 \u6B21\u65B9
     */
    static final int MAXIMUM_CAPACITY = 1 &lt;&lt; 30;

    /**
     * The load factor used when none specified in constructor.
     */
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    /**
     * The bin count threshold for using a tree rather than list for a
     * bin.  Bins are converted to trees when adding an element to a
     * bin with at least this many nodes. The value must be greater
     * than 2 and should be at least 8 to mesh with assumptions in
     * tree removal about conversion back to plain bins upon
     * shrinkage.
     */
    static final int TREEIFY_THRESHOLD = 8;

    /**
     * The bin count threshold for untreeifying a (split) bin during a
     * resize operation. Should be less than TREEIFY_THRESHOLD, and at
     * most 6 to mesh with shrinkage detection under removal.
     */
    static final int UNTREEIFY_THRESHOLD = 6;

    /**
     * The smallest table capacity for which bins may be treeified.
     * (Otherwise the table is resized if too many nodes in a bin.)
     * Should be at least 4 * TREEIFY_THRESHOLD to avoid conflicts
     * between resizing and treeification thresholds.
     */
    static final int MIN_TREEIFY_CAPACITY = 64;

    /**
     * Basic hash bin node, used for most entries.  (See below for
     * TreeNode subclass, and in LinkedHashMap for its Entry subclass.)
     */
    static class Node&lt;K, V&gt; implements Map.Entry&lt;K, V&gt; {

        final int hash;

        final K key;

        V value;

        Node&lt;K, V&gt; next;

        Node(int hash, K key, V value, Node&lt;K, V&gt; next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }

        public final K getKey() {
            return key;
        }

        public final V getValue() {
            return value;
        }

        public final String toString() {
            return key + &quot;=&quot; + value;
        }

        public final int hashCode() {
            return Objects.hashCode(key) ^ Objects.hashCode(value);
        }

        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }

        public final boolean equals(Object o) {
            if (o == this)
                return true;
            if (o instanceof Map.Entry) {
                Map.Entry&lt;?, ?&gt; e = (Map.Entry&lt;?, ?&gt;) o;
                if (Objects.equals(key, e.getKey()) &amp;&amp;
                        Objects.equals(value, e.getValue()))
                    return true;
            }
            return false;
        }

    }

    /* ---------------- Static utilities -------------- */

    /**
     * Computes key.hashCode() and spreads (XORs) higher bits of hash
     * to lower.  Because the table uses power-of-two masking, sets of
     * hashes that vary only in bits above the current mask will
     * always collide. (Among known examples are sets of Float keys
     * holding consecutive whole numbers in small tables.)  So we
     * apply a transform that spreads the impact of higher bits
     * downward. There is a tradeoff between speed, utility, and
     * quality of bit-spreading. Because many common sets of hashes
     * are already reasonably distributed (so don&#39;t benefit from
     * spreading), and because we use trees to handle large sets of
     * collisions in bins, we just XOR some shifted bits in the
     * cheapest possible way to reduce systematic lossage, as well as
     * to incorporate impact of the highest bits that would otherwise
     * never be used in index calculations because of table bounds.
     */
    static final int hash(Object key) {
        int h;
        // \u53F3\u79FB 16 \u4F4D\u4EE5\u5408\u5E76\u9AD8\u4F4D\u7684\u5F71\u54CD
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h &gt;&gt;&gt; 16);
    }

    /**
     * Returns x&#39;s Class if it is of the form &quot; class C implements
     * Comparable &lt;C&gt; &quot;, else null.
     * \u7EA2\u9ED1\u6811\u7528\u7684
     */
    static Class&lt;?&gt; comparableClassFor(Object x) {
        if (x instanceof Comparable) {
            Class&lt;?&gt; c;
            Type[] ts, as;
            ParameterizedType p;
            if ((c = x.getClass()) == String.class) // bypass checks
                return c;
            if ((ts = c.getGenericInterfaces()) != null) {
                for (Type t : ts) {
                    if ((t instanceof ParameterizedType) &amp;&amp;
                            ((p = (ParameterizedType) t).getRawType() ==
                                    Comparable.class) &amp;&amp;
                            (as = p.getActualTypeArguments()) != null &amp;&amp;
                            as.length == 1 &amp;&amp; as[0] == c) // type arg is c
                        return c;
                }
            }
        }
        return null;
    }

    /**
     * Returns k.compareTo(x) if x matches kc (k&#39;s screened comparable
     * class), else 0.
     * \u7EA2\u9ED1\u6811\u7528\u7684
     */
    @SuppressWarnings({&quot;rawtypes&quot;, &quot;unchecked&quot;}) // for cast to Comparable
    static int compareComparables(Class&lt;?&gt; kc, Object k, Object x) {
        return (x == null || x.getClass() != kc ? 0 :
                ((Comparable) k).compareTo(x));
    }

    /**
     * Returns a power of two size for the given target capacity.
     */
    static final int tableSizeFor(int cap) {
        // -1 = 11111111111111111111111111111111
        // \u628A -1 \u8FDB\u884C\u65E0\u7B26\u53F7\u53F3\u79FB\uFF08zero-fill-shift\uFF09\u518D\u52A0\u4E00\uFF0C\u5373\u53EF\u83B7\u5F97\u4E0D\u5C0F\u4E8E cap \u7684\u6700\u5C0F\u7684 2 \u7684 n \u6B21\u65B9
        // numberOfLeadingZeros \u8FD9\u4E2A\u65B9\u6CD5\u83B7\u53D6\u4E00\u4E2A\u4E8C\u7EA7\u5236\u6570\u7684\u524D\u5BFC 0 \u7684\u4E2A\u6570\uFF0C\u8FD4\u56DE\u503C\u5728 0-32 \u4E4B\u95F4
        // cap - 1 \u662F\u4E3A\u4E86\u517C\u5BB9 cap \u521A\u597D\u662F 2 \u7684 n \u6B21\u65B9\u7684\u60C5\u51B5\uFF0C\u4E0D\u51CF\u7684\u8BDD\u5C31\u4F1A\u628A\u539F\u6765\u5DF2\u7ECF\u662F 2 \u7684 n \u6B21\u65B9\u7684\u5BB9\u91CF\u518D\u7FFB\u500D
        int n = -1 &gt;&gt;&gt; Integer.numberOfLeadingZeros(cap - 1);
        return (n &lt; 0) ? 1 : (n &gt;= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }

    /* ---------------- Fields -------------- */

    /**
     * The table, initialized on first use, and resized as
     * necessary. When allocated, length is always a power of two.
     * (We also tolerate length zero in some operations to allow
     * bootstrapping mechanics that are currently not needed.)
     * &lt;p&gt;
     * \u52A0 transient \u662F\u56E0\u4E3A\u8D1F\u8F7D\u56E0\u5B50\u7684\u5B58\u5728\uFF0C\u8FD9\u4E2A table \u662F\u7A00\u758F\u7684\uFF0C\u4E0D\u80FD\u76F4\u63A5\u53C2\u4E0E\u5E8F\u5217\u5316
     */
    transient Node&lt;K, V&gt;[] table;

    /**
     * Holds cached entrySet(). Note that AbstractMap fields are used
     * for keySet() and values().
     */
    transient Set&lt;Map.Entry&lt;K, V&gt;&gt; entrySet;

    /**
     * The number of key-value mappings contained in this map.
     */
    transient int size;

    /**
     * The number of times this HashMap has been structurally modified
     * Structural modifications are those that change the number of mappings in
     * the HashMap or otherwise modify its internal structure (e.g.,
     * rehash).  This field is used to make iterators on Collection-views of
     * the HashMap fail-fast.  (See ConcurrentModificationException).
     * &lt;p&gt;
     * \u5982\u679C\u5728\u904D\u5386\u65F6\u5BF9 hashmap \u505A\u4E86\u4FEE\u6539\uFF0C\u6821\u9A8C modcount \u7684\u503C\u53EF\u4EE5\u5FEB\u901F\u5931\u8D25\uFF0C\u5E76\u629B\u51FA\u5E76\u53D1\u4FEE\u6539\u5F02\u5E38
     */
    transient int modCount;

    /**
     * The next size value at which to resize (capacity * load factor).
     *
     * @serial
     */
    // (The javadoc description is true upon serialization.
    // Additionally, if the table array has not been allocated, this
    // field holds the initial array capacity, or zero signifying
    // DEFAULT_INITIAL_CAPACITY.)
    //
    // resize \u7684\u9608\u503C
    int threshold;

    /**
     * The load factor for the hash table.
     *
     * @serial \u52A0\u8F7D\u56E0\u5B50
     */
    final float loadFactor;

    /* ---------------- Public operations -------------- */

    /**
     * Constructs an empty {@code HashMap} with the specified initial
     * capacity and load factor.
     *
     * @param initialCapacity the initial capacity
     * @param loadFactor      the load factor
     * @throws IllegalArgumentException if the initial capacity is negative
     *                                  or the load factor is nonpositive
     *                                  &lt;p&gt;
     *                                  \u5E26\u521D\u59CB\u5BB9\u91CF\u548C\u52A0\u8F7D\u56E0\u5B50\u7684\u6784\u9020\u51FD\u6570
     *                                  \u8C03\u7528\u6784\u9020\u51FD\u6570\u65F6\uFF0C\u53EA\u662F\u8BBE\u7F6E\u4E86\u9608\u503C\u548C\u52A0\u8F7D\u56E0\u5B50\uFF0C\u6CA1\u6709\u4EFB\u4F55\u7A7A\u95F4\u7684\u5206\u914D
     *                                  \u4E5F\u5C31\u662F\u8BF4\u548C ThreadLocal\u3001\u7EBF\u7A0B\u6C60\u7B49\u7C7B\u4F3C\uFF0C\u90FD\u662F\u61D2\u52A0\u8F7D\u7684
     */
    public HashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity &lt; 0)
            throw new IllegalArgumentException(&quot;Illegal initial capacity: &quot; +
                    initialCapacity);
        if (initialCapacity &gt; MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor &lt;= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException(&quot;Illegal load factor: &quot; +
                    loadFactor);
        this.loadFactor = loadFactor;
        this.threshold = tableSizeFor(initialCapacity);
    }

    /**
     * Constructs an empty {@code HashMap} with the specified initial
     * capacity and the default load factor (0.75).
     *
     * @param initialCapacity the initial capacity.
     * @throws IllegalArgumentException if the initial capacity is negative.
     *                                  &lt;p&gt;
     *                                  \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
     */
    public HashMap(int initialCapacity) {
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }

    /**
     * Constructs an empty {@code HashMap} with the default initial capacity
     * (16) and the default load factor (0.75).
     * &lt;p&gt;
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
     */
    public HashMap() {
        this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
    }

    /**
     * Constructs a new {@code HashMap} with the same mappings as the
     * specified {@code Map}.  The {@code HashMap} is created with
     * default load factor (0.75) and an initial capacity sufficient to
     * hold the mappings in the specified {@code Map}.
     *
     * @param m the map whose mappings are to be placed in this map
     * @throws NullPointerException if the specified map is null
     */
    public HashMap(Map&lt;? extends K, ? extends V&gt; m) {
        this.loadFactor = DEFAULT_LOAD_FACTOR;
        // evict = \u9A71\u9010
        putMapEntries(m, false);
    }

    /**
     * Implements Map.putAll and Map constructor.
     *
     * @param m     the map
     * @param evict false when initially constructing this map, else
     *              true (relayed to method afterNodeInsertion).
     */
    final void putMapEntries(Map&lt;? extends K, ? extends V&gt; m, boolean evict) {
        int s = m.size();
        if (s &gt; 0) {
            if (table == null) { // pre-size
                // ft \u5E94\u8BE5\u662F float threshold \u7684\u7F29\u5199
                // +1.0 \u76F8\u5F53\u4E8E\u5411\u4E0A\u53D6\u6574\uFF0C\u56E0\u4E3A\u4E0B\u9762\u6709\u53EF\u80FD\u5F3A\u8F6C\u4E3A int
                float ft = ((float) s / loadFactor) + 1.0F;
                int t = ((ft &lt; (float) MAXIMUM_CAPACITY) ?
                        (int) ft : MAXIMUM_CAPACITY);
                if (t &gt; threshold)
                    threshold = tableSizeFor(t);
            } else if (s &gt; threshold)
                resize();
            for (Map.Entry&lt;? extends K, ? extends V&gt; e : m.entrySet()) {
                K key = e.getKey();
                V value = e.getValue();
                putVal(hash(key), key, value, false, evict);
            }
        }
    }

    /**
     * Returns the number of key-value mappings in this map.
     *
     * @return the number of key-value mappings in this map
     */
    public int size() {
        return size;
    }

    /**
     * Returns {@code true} if this map contains no key-value mappings.
     *
     * @return {@code true} if this map contains no key-value mappings
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Returns the value to which the specified key is mapped,
     * or {@code null} if this map contains no mapping for the key.
     *
     * &lt;p&gt; More formally, if this map contains a mapping from a key
     * {@code k} to a value {@code v} such that {@code (key == null ? k == null :
     * key.equals(k))}, then this method returns {@code v}; otherwise
     * it returns {@code null}.  (There can be at most one such mapping.)
     *
     * &lt;p&gt; A return value of {@code null} does not &lt;i&gt; necessarily &lt;/i&gt;
     * indicate that the map contains no mapping for the key; it&#39;s also
     * possible that the map explicitly maps the key to {@code null}.
     * The {@link #containsKey containsKey} operation may be used to
     * distinguish these two cases.
     *
     * @see #put(Object, Object)
     */
    public V get(Object key) {
        Node&lt;K, V&gt; e;
        return (e = getNode(hash(key), key)) == null ? null : e.value;
    }

    /**
     * Implements Map.get and related methods.
     *
     * @param hash hash for key
     * @param key  the key
     * @return the node, or null if none
     */
    final Node&lt;K, V&gt; getNode(int hash, Object key) {
        Node&lt;K, V&gt;[] tab;
        Node&lt;K, V&gt; first, e;
        int n;
        K k;
        if ((tab = table) != null &amp;&amp; (n = tab.length) &gt; 0 &amp;&amp;
                (first = tab[(n - 1) &amp; hash]) != null) {
            if (first.hash == hash &amp;&amp; // always check first node
                    ((k = first.key) == key || (key != null &amp;&amp; key.equals(k))))
                return first;
            if ((e = first.next) != null) {
                if (first instanceof TreeNode)
                    return ((TreeNode&lt;K, V&gt;) first).getTreeNode(hash, key);
                do {
                    if (e.hash == hash &amp;&amp;
                            ((k = e.key) == key || (key != null &amp;&amp; key.equals(k))))
                        return e;
                } while ((e = e.next) != null);
            }
        }
        return null;
    }

    /**
     * Returns {@code true} if this map contains a mapping for the
     * specified key.
     *
     * @param key The key whose presence in this map is to be tested
     * @return {@code true} if this map contains a mapping for the specified
     * key.
     */
    public boolean containsKey(Object key) {
        return getNode(hash(key), key) != null;
    }

    /**
     * Associates the specified value with the specified key in this map.
     * If the map previously contained a mapping for the key, the old
     * value is replaced.
     *
     * @param key   key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @return the previous value associated with {@code key}, or
     * {@code null} if there was no mapping for {@code key}.
     * (A {@code null} return can also indicate that the map
     * previously associated {@code null} with {@code key}.)
     */
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }

    /**
     * Implements Map.put and related methods.
     *
     * @param hash         hash for key
     * @param key          the key
     * @param value        the value to put
     * @param onlyIfAbsent if true, don&#39;t change existing value
     * @param evict        if false, the table is in creation mode.
     * @return previous value, or null if none
     */
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node&lt;K, V&gt;[] tab;
        Node&lt;K, V&gt; p;
        int n, i;
        // \u521D\u59CB\u5316 tab\uFF0Ctab.length \u662F\u53EF\u80FD\u662F 0 \u7684\uFF08\u6784\u9020\u53C2\u6570\u91CC capacity \u4F20 0\uFF09
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        // tab \u4E0A\u6709\u7A7A\u4F4D\uFF0C\u76F4\u63A5\u653E\u8FDB\u53BB\u5373\u53EF
        if ((p = tab[i = (n - 1) &amp; hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node&lt;K, V&gt; e;
            K k;
            // key \u76F8\u540C\uFF0C\u81F3\u4E8C\u7EA7\u8986\u76D6
            if (p.hash == hash &amp;&amp;
                    ((k = p.key) == key || (key != null &amp;&amp; key.equals(k))))
                e = p;
            // \u5982\u679C\u51B2\u7A81\u7684\u4F4D\u7F6E\u4E0A\u7684 node \u662F TreeNode
            else if (p instanceof TreeNode)
                e = ((TreeNode&lt;K, V&gt;) p).putTreeVal(this, tab, hash, key, value);
            else {
                // \u662F\u94FE\u8868\u4E86\uFF0C\u8FDB\u884C\u904D\u5386
                for (int binCount = 0; ; ++binCount) {
                    // \u627E\u5230\u94FE\u8868\u5C3E\uFF0C\u4E5F\u5C31\u662F \u5C3E\u63D2
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        // \u592A\u957F\u65F6\u9700\u8981\u8F6C\u4E3A\u7EA2\u9ED1\u6811
                        if (binCount &gt;= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    // \u5728\u94FE\u8868\u4E0A\u627E\u5230\u4E86 key \u5B8C\u5168\u76F8\u540C\u7684 node
                    if (e.hash == hash &amp;&amp;
                            ((k = e.key) == key || (key != null &amp;&amp; key.equals(k))))
                        break;
                    p = e;
                }
            }
            // \u9700\u8981\u8986\u76D6\u65E7\u503C\u65F6 e \u4E0D\u4E3A null
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                // \u5982\u679C\u5141\u8BB8\u8986\u76D6\u6216\u65E7\u503C\u4E3A null \u65F6\u624D\u80FD\u8986\u76D6
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                // \u5E94\u8BE5\u662F\u57CB\u70B9\uFF0C\u7559\u7ED9\u5B50\u7C7B\u91CD\u5199\u7684
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size &gt; threshold)
            resize();
        afterNodeInsertion(evict); // \u5728 LinkedHashMap \u4E2D\u7528\u5230, \u8FD9\u91CC\u662F\u7A7A\u51FD\u6570
        return null;
    }

    /**
     * Initializes or doubles table size.  If null, allocates in
     * accord with initial capacity target held in field threshold.
     * Otherwise, because we are using power-of-two expansion, the
     * elements from each bin must either stay at same index, or move
     * with a power of two offset in the new table.
     *
     * @return the table
     */
    final Node&lt;K, V&gt;[] resize() {
        Node&lt;K, V&gt;[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap &gt; 0) { // \u771F\u6B63\u7684\u6269\u5BB9
            if (oldCap &gt;= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                // \u5982\u679C\u592A\u5927\u4E86\uFF0C\u6574\u4E2A\u65B9\u6CD5\u76F4\u63A5 return
                return oldTab;
            } else if ((newCap = oldCap &lt;&lt; 1) &lt; MAXIMUM_CAPACITY &amp;&amp;
                    oldCap &gt;= DEFAULT_INITIAL_CAPACITY)
            // newCap \u7B49\u4E8E MAXIMUM_CAPACITY \u65F6\uFF0C\u4E0B\u4E00\u884C\u7684 newThr \u4E0D\u4F1A\u88AB\u8D4B\u503C
            // \u8BF4\u767D\u4E86\u5C31\u662F\u5F53 threshold \u6BD4\u8F83\u5C0F\u7684\u65F6\u5019\uFF08eg\uFF1A1,3\uFF09 \u53F3\u79FB 1 \u4F4D \u548C newCap * loadFactor \u8FD9\u4E24\u79CD\u7B97\u51FA\u6765\u7684\u503C\u4E0D\u4E00\u6837
            /*
               The optimization isn\u2019t so hard to understand.
               The formal definition of the new threshold is
               newCap * loadFactor whereas loadFactor is a floating point value.
               But when you double the capacity,
               you know that the new threshold will also be the double of the old threshold,
               so you can do this with integer arithmetic (left shift by one),
               without needing a floating point multiplication nor type conversions.
               However, when the numbers are too small, you can\u2019t do that,
               as the rounding errors would be too high. Further,
               you have to care when the new threshold doesn\u2019t fit into an int.
               That\u2019s all. https://stackoverflow.com/questions/41157974/hashmap-resize-in-jdk8
             */
             newThr = oldThr &lt;&lt; 1; // double threshold
        } else if (oldThr &gt; 0) // \u521D\u59CB\u5316\uFF0C\u800C\u4E14\u662F\u6709\u53C2\u6784\u9020\u5668\u6784\u9020\u7684\uFF0Cinitial capacity was placed in threshold
            newCap = oldThr
        else {                 // \u521D\u59CB\u5316\uFF0C\u800C\u4E14\u662F\u7A7A\u53C2\u6784\u9020\u5668\u6784\u9020\u7684\uFF0Czero initial threshold signifies using defaults
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int) (DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {     // \u7ECF\u8FC7\u4E0A\u9762\u7684\u903B\u8F91 \u53EF\u80FD newThr \u4ECD\u4E3A 0\uFF0C\u9700\u8981\u91CD\u65B0\u8BBE\u7F6E newThr
            float ft = (float) newCap * loadFactor;
            newThr = (newCap &lt; MAXIMUM_CAPACITY &amp;&amp; ft &lt; (float) MAXIMUM_CAPACITY ?
                    (int) ft : Integer.MAX_VALUE);
        }
        threshold = newThr;
        // \u5F00\u8F9F\u4E00\u4E2A\u5BB9\u91CF\u4E3A newCap \u7684 Node \u6570\u7EC4
        @SuppressWarnings({&quot;rawtypes&quot;, &quot;unchecked&quot;})
        Node&lt;K, V&gt;[] newTab = (Node&lt;K, V&gt;[]) new Node[newCap];
        // \u6CE8\u610F\uFF0C\u76F4\u63A5\u628A\u7A7A\u6570\u7EC4\u8D4B\u503C\u5230\u4E86 table \u4E0A\u4E86\uFF0C\u6240\u4EE5\u8FD9\u65F6\u5019\u591A\u7EBF\u7A0B\u5E76\u53D1\u8BBF\u95EE\u4F1A\u6709\u95EE\u9898
        table = newTab;
        // \u5982\u679C\u662F\u521D\u59CB\u5316\u573A\u666F\uFF0C\u4E0B\u9762\u7684\u903B\u8F91\u5C31\u4E0D\u7528\u6267\u884C\u4E86
        if (oldTab != null) {
            for (int j = 0; j &lt; oldCap; ++j) {
                Node&lt;K, V&gt; e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null) // \u4E0D\u662F\u94FE\u8868\u6216\u7EA2\u9ED1\u6811\u7684\u9996\u8282\u70B9\u7684\u8BDD\uFF0C\u76F4\u63A5\u91CD\u65B0\u8BA1\u7B97\u4F4D\u7F6E\u5373\u53EF
                        newTab[e.hash &amp; (newCap - 1)] = e;
                    else if (e instanceof TreeNode) // \u7EA2\u9ED1\u6811\u7ED3\u6784
                        ((TreeNode&lt;K, V&gt;) e).split(this, newTab, j, oldCap);
                    else { // preserve order
                        Node&lt;K, V&gt; loHead = null, loTail = null;  // \u6309\u547D\u540D\u6765\u7FFB\u8BD1\u7684\u8BDD\uFF0C\u5E94\u8BE5\u53EB\u4F4E\u4F4D\u9996\u5C3E\u8282\u70B9
                        Node&lt;K, V&gt; hiHead = null, hiTail = null;  // \u6309\u547D\u540D\u6765\u7FFB\u8BD1\u7684\u8BDD\uFF0C\u5E94\u8BE5\u53EB\u9AD8\u4F4D\u9996\u5C3E\u8282\u70B9
                        // \u9996\u5148\u660E\u786E\u8FD9\u4E2A\u94FE\u8868\u6709\u4E00\u4E2A\u7279\u70B9\uFF1A \u6309 oldCap &amp; hash \u7B97\u51FA\u6765\u7684\u503C\u662F\u4E00\u6837\u7684\uFF01
                        // \u4EE5\u4E0A\u7684\u4F4E\u4F4D\u6307\u7684\u662F\u65B0\u6570\u7EC4\u7684 0 \u5230 oldCap - 1 \u3001\u9AD8\u4F4D\u6307\u7684\u662F oldCap \u5230 newCap - 1
                        Node&lt;K, V&gt; next;
                        // \u904D\u5386\u94FE\u8868
                        do {
                            next = e.next;
                            // \u62FF\u5143\u7D20\u7684 hash \u503C\u548C\u8001\u6570\u7EC4\u7684\u957F\u5EA6\u4E0E\u8FD0\u7B97
                            // \u6570\u7EC4\u7684\u957F\u5EA6\u4E00\u5B9A\u662F 2 \u7684 N \u6B21\u65B9\uFF0C\u505A\u4E0E\u8FD0\u7B97\uFF0C\u90A3\u4E48\u8BE5 hash \u503C\u53EF\u53C2\u4E0E\u8BA1\u7B97\u7684\u6709\u6548\u4E8C\u8FDB\u5236\u4F4D\u5C31\u662F\u548C\u957F\u5EA6\u4E8C\u8FDB\u5236\u5BF9\u7B49\u7684\u540E\u51E0\u4F4D
                            // \u5982\u679C\u7ED3\u679C\u4E3A 0\uFF0C\u8BF4\u660E hash \u503C\u4E2D\u53C2\u4E0E\u8BA1\u7B97\u7684\u5BF9\u7B49\u7684\u4E8C\u8FDB\u5236\u4F4D\u7684\u6700\u9AD8\u4F4D\u4E00\u5B9A\u4E3A 0.
                            // \u56E0\u4E3A\u6570\u7EC4\u957F\u5EA6\u7684\u4E8C\u8FDB\u5236\u6709\u6548\u6700\u9AD8\u4F4D\u662F 1\uFF08\u4F8B\u5982 16 \u5BF9\u5E94\u7684\u4E8C\u8FDB\u5236\u662F 10000\uFF09\uFF0C
                            // \u53EA\u6709 0 **** \u548C 10000 \u8FDB\u884C\u4E0E\u8FD0\u7B97\u7ED3\u679C\u624D\u4E3A 00000
                            if ((e.hash &amp; oldCap) == 0) {
                                // PS4
                                if (loTail == null) // \u5982\u679C\u6CA1\u6709\u5C3E\uFF0C\u8BF4\u660E\u94FE\u8868\u4E3A\u7A7A
                                    loHead = e; // \u94FE\u8868\u4E3A\u7A7A\u65F6\uFF0C\u5934\u8282\u70B9\u6307\u5411\u8BE5\u5143\u7D20
                                else
                                    loTail.next = e; // \u5982\u679C\u6709\u5C3E\uFF0C\u90A3\u4E48\u94FE\u8868\u4E0D\u4E3A\u7A7A\uFF0C\u628A\u8BE5\u5143\u7D20\u6302\u5230\u94FE\u8868\u7684\u6700\u540E\u3002
                                loTail = e; // \u628A\u5C3E\u8282\u70B9\u8BBE\u7F6E\u4E3A\u5F53\u524D\u5143\u7D20
                            }

                            // \u5982\u679C\u4E0E\u8FD0\u7B97\u7ED3\u679C\u4E0D\u4E3A 0\uFF0C\u8BF4\u660E hash &amp; newCap \u503C\u6BD4\u65E7\u4F4D\u7F6E\u5927\u4E8E\u4E00\u4E2A\u8001\u6570\u7EC4\u957F\u5EA6\uFF08\u4F8B\u5982 hash \u503C\u4E3A 17\uFF09
                            // \u6B64\u65F6\u8BE5\u5143\u7D20\u5E94\u8BE5\u653E\u7F6E\u5230\u65B0\u6570\u7EC4\u7684\u9AD8\u4F4D\u4F4D\u7F6E\u4E0A
                            else {  // \u4EE5\u4E0B\u903B\u8F91\u540C PS4
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) { // \u4F4E\u4F4D\u7684\u5143\u7D20\u7EC4\u6210\u7684\u94FE\u8868\u8FD8\u662F\u653E\u7F6E\u5728\u539F\u6765\u7684\u4F4D\u7F6E
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {  // \u9AD8\u4F4D\u7684\u5143\u7D20\u7EC4\u6210\u7684\u94FE\u8868\u653E\u7F6E\u7684\u4F4D\u7F6E\u53EA\u662F\u5728\u539F\u6709\u4F4D\u7F6E\u4E0A\u504F\u79FB\u4E86\u8001\u6570\u7EC4\u7684\u957F\u5EA6\u4E2A\u4F4D\u7F6E\u3002
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }

    /**
     * Replaces all linked nodes in bin at index for given hash unless
     * table is too small, in which case resizes instead.
     */
    final void treeifyBin(Node&lt;K, V&gt;[] tab, int hash) {
        int n, index;
        Node&lt;K, V&gt; e;
        // \u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E MIN_TREEIFY_CAPACITY \uFF0864\uFF09\uFF0C\u5426\u5219\u76F4\u63A5\u6269\u5BB9
        if (tab == null || (n = tab.length) &lt; MIN_TREEIFY_CAPACITY)
            resize();
        else if ((e = tab[index = (n - 1) &amp; hash]) != null) {
            TreeNode&lt;K, V&gt; hd = null, tl = null;
            do {
                TreeNode&lt;K, V&gt; p = replacementTreeNode(e, null);
                if (tl == null)
                    hd = p;
                else {
                    p.prev = tl;
                    tl.next = p;
                }
                tl = p;
            } while ((e = e.next) != null);
            if ((tab[index] = hd) != null)
                hd.treeify(tab);
        }
    }

    /**
     * Copies all of the mappings from the specified map to this map.
     * These mappings will replace any mappings that this map had for
     * any of the keys currently in the specified map.
     *
     * @param m mappings to be stored in this map
     * @throws NullPointerException if the specified map is null
     */
    public void putAll(Map&lt;? extends K, ? extends V&gt; m) {
        putMapEntries(m, true);
    }

    /**
     * Removes the mapping for the specified key from this map if present.
     *
     * @param key key whose mapping is to be removed from the map
     * @return the previous value associated with {@code key}, or
     * {@code null} if there was no mapping for {@code key}.
     * (A {@code null} return can also indicate that the map
     * previously associated {@code null} with {@code key}.)
     */
    public V remove(Object key) {
        Node&lt;K, V&gt; e;
        return (e = removeNode(hash(key), key, null, false, true)) == null ?
                null : e.value;
    }

    /**
     * Implements Map.remove and related methods.
     *
     * @param hash       hash for key
     * @param key        the key
     * @param value      the value to match if matchValue, else ignored
     * @param matchValue if true only remove if value is equal
     * @param movable    if false do not move other nodes while removing
     * @return the node, or null if none
     */
    final Node&lt;K, V&gt; removeNode(int hash, Object key, Object value,
                                boolean matchValue, boolean movable) {
        Node&lt;K, V&gt;[] tab;
        Node&lt;K, V&gt; p;
        int n, index;
        if ((tab = table) != null &amp;&amp; (n = tab.length) &gt; 0 &amp;&amp;
                (p = tab[index = (n - 1) &amp; hash]) != null) {
            Node&lt;K, V&gt; node = null, e;
            K k;
            V v;
            if (p.hash == hash &amp;&amp;
                    ((k = p.key) == key || (key != null &amp;&amp; key.equals(k))))
                node = p;
            else if ((e = p.next) != null) {
                if (p instanceof TreeNode)
                    node = ((TreeNode&lt;K, V&gt;) p).getTreeNode(hash, key);
                else {
                    do {
                        if (e.hash == hash &amp;&amp;
                                ((k = e.key) == key ||
                                        (key != null &amp;&amp; key.equals(k)))) {
                            node = e;
                            break;
                        }
                        p = e;
                    } while ((e = e.next) != null);
                }
            }
            if (node != null &amp;&amp; (!matchValue || (v = node.value) == value ||
                    (value != null &amp;&amp; value.equals(v)))) {
                if (node instanceof TreeNode)
                    ((TreeNode&lt;K, V&gt;) node).removeTreeNode(this, tab, movable);
                else if (node == p)
                    tab[index] = node.next;
                else
                    p.next = node.next;
                ++modCount;
                --size;
                afterNodeRemoval(node);
                return node;
            }
        }
        return null;
    }

    /**
     * Removes all of the mappings from this map.
     * The map will be empty after this call returns.
     */
    public void clear() {
        Node&lt;K, V&gt;[] tab;
        modCount++;
        if ((tab = table) != null &amp;&amp; size &gt; 0) {
            size = 0;
            for (int i = 0; i &lt; tab.length; ++i)
                tab[i] = null;
        }
    }

    /**
     * Returns {@code true} if this map maps one or more keys to the
     * specified value.
     *
     * @param value value whose presence in this map is to be tested
     * @return {@code true} if this map maps one or more keys to the
     * specified value
     */
    public boolean containsValue(Object value) {
        Node&lt;K, V&gt;[] tab;
        V v;
        if ((tab = table) != null &amp;&amp; size &gt; 0) {
            for (Node&lt;K, V&gt; e : tab) {
                for (; e != null; e = e.next) {
                    if ((v = e.value) == value ||
                            (value != null &amp;&amp; value.equals(v)))
                        return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns a {@link Set} view of the keys contained in this map.
     * The set is backed by the map, so changes to the map are
     * reflected in the set, and vice-versa.  If the map is modified
     * while an iteration over the set is in progress (except through
     * the iterator&#39;s own {@code remove} operation), the results of
     * the iteration are undefined.  The set supports element removal,
     * which removes the corresponding mapping from the map, via the
     * {@code Iterator.remove}, {@code Set.remove},
     * {@code removeAll}, {@code retainAll}, and {@code clear}
     * operations.  It does not support the {@code add} or {@code addAll}
     * operations.
     *
     * @return a set view of the keys contained in this map
     */
    public Set&lt;K&gt; keySet() {
        Set&lt;K&gt; ks = keySet;
        if (ks == null) {
            ks = new KeySet();
            keySet = ks;
        }
        return ks;
    }

    final class KeySet extends AbstractSet&lt;K&gt; {

        public final int size() {
            return size;
        }

        public final void clear() {
            HashMap.this.clear();
        }

        public final Iterator&lt;K&gt; iterator() {
            return new KeyIterator();
        }

        public final boolean contains(Object o) {
            return containsKey(o);
        }

        public final boolean remove(Object key) {
            return removeNode(hash(key), key, null, false, true) != null;
        }

        public final Spliterator&lt;K&gt; spliterator() {
            return new KeySpliterator&lt;&gt;(HashMap.this, 0, -1, 0, 0);
        }

        public final void forEach(Consumer&lt;? super K&gt; action) {
            Node&lt;K, V&gt;[] tab;
            if (action == null)
                throw new NullPointerException();
            if (size &gt; 0 &amp;&amp; (tab = table) != null) {
                int mc = modCount;
                for (Node&lt;K, V&gt; e : tab) {
                    for (; e != null; e = e.next)
                        action.accept(e.key);
                }
                if (modCount != mc)
                    throw new ConcurrentModificationException();
            }
        }

    }

    /**
     * Returns a {@link Collection} view of the values contained in this map.
     * The collection is backed by the map, so changes to the map are
     * reflected in the collection, and vice-versa.  If the map is
     * modified while an iteration over the collection is in progress
     * (except through the iterator&#39;s own {@code remove} operation),
     * the results of the iteration are undefined.  The collection
     * supports element removal, which removes the corresponding
     * mapping from the map, via the {@code Iterator.remove},
     * {@code Collection.remove}, {@code removeAll},
     * {@code retainAll} and {@code clear} operations.  It does not
     * support the {@code add} or {@code addAll} operations.
     *
     * @return a view of the values contained in this map
     */
    public Collection&lt;V&gt; values() {
        Collection&lt;V&gt; vs = values;
        if (vs == null) {
            vs = new Values();
            values = vs;
        }
        return vs;
    }

    final class Values extends AbstractCollection&lt;V&gt; {

        public final int size() {
            return size;
        }

        public final void clear() {
            HashMap.this.clear();
        }

        public final Iterator&lt;V&gt; iterator() {
            return new ValueIterator();
        }

        public final boolean contains(Object o) {
            return containsValue(o);
        }

        public final Spliterator&lt;V&gt; spliterator() {
            return new ValueSpliterator&lt;&gt;(HashMap.this, 0, -1, 0, 0);
        }

        public final void forEach(Consumer&lt;? super V&gt; action) {
            Node&lt;K, V&gt;[] tab;
            if (action == null)
                throw new NullPointerException();
            if (size &gt; 0 &amp;&amp; (tab = table) != null) {
                int mc = modCount;
                for (Node&lt;K, V&gt; e : tab) {
                    for (; e != null; e = e.next)
                        action.accept(e.value);
                }
                if (modCount != mc)
                    throw new ConcurrentModificationException();
            }
        }

    }

    /**
     * Returns a {@link Set} view of the mappings contained in this map.
     * The set is backed by the map, so changes to the map are
     * reflected in the set, and vice-versa.  If the map is modified
     * while an iteration over the set is in progress (except through
     * the iterator&#39;s own {@code remove} operation, or through the
     * {@code setValue} operation on a map entry returned by the
     * iterator) the results of the iteration are undefined.  The set
     * supports element removal, which removes the corresponding
     * mapping from the map, via the {@code Iterator.remove},
     * {@code Set.remove}, {@code removeAll}, {@code retainAll} and
     * {@code clear} operations.  It does not support the
     * {@code add} or {@code addAll} operations.
     *
     * @return a set view of the mappings contained in this map
     */
    public Set&lt;Map.Entry&lt;K, V&gt;&gt; entrySet() {
        Set&lt;Map.Entry&lt;K, V&gt;&gt; es;
        return (es = entrySet) == null ? (entrySet = new EntrySet()) : es;
    }

    final class EntrySet extends AbstractSet&lt;Map.Entry&lt;K, V&gt;&gt; {

        public final int size() {
            return size;
        }

        public final void clear() {
            HashMap.this.clear();
        }

        public final Iterator&lt;Map.Entry&lt;K, V&gt;&gt; iterator() {
            return new EntryIterator();
        }

        public final boolean contains(Object o) {
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry&lt;?, ?&gt; e = (Map.Entry&lt;?, ?&gt;) o;
            Object key = e.getKey();
            Node&lt;K, V&gt; candidate = getNode(hash(key), key);
            return candidate != null &amp;&amp; candidate.equals(e);
        }

        public final boolean remove(Object o) {
            if (o instanceof Map.Entry) {
                Map.Entry&lt;?, ?&gt; e = (Map.Entry&lt;?, ?&gt;) o;
                Object key = e.getKey();
                Object value = e.getValue();
                return removeNode(hash(key), key, value, true, true) != null;
            }
            return false;
        }

        public final Spliterator&lt;Map.Entry&lt;K, V&gt;&gt; spliterator() {
            return new EntrySpliterator&lt;&gt;(HashMap.this, 0, -1, 0, 0);
        }

        public final void forEach(Consumer&lt;? super Map.Entry&lt;K, V&gt;&gt; action) {
            Node&lt;K, V&gt;[] tab;
            if (action == null)
                throw new NullPointerException();
            if (size &gt; 0 &amp;&amp; (tab = table) != null) {
                int mc = modCount;
                for (Node&lt;K, V&gt; e : tab) {
                    for (; e != null; e = e.next)
                        action.accept(e);
                }
                if (modCount != mc)
                    throw new ConcurrentModificationException();
            }
        }

    }

    // Overrides of JDK8 Map extension methods

    @Override
    public V getOrDefault(Object key, V defaultValue) {
        Node&lt;K, V&gt; e;
        return (e = getNode(hash(key), key)) == null ? defaultValue : e.value;
    }

    @Override
    public V putIfAbsent(K key, V value) {
        return putVal(hash(key), key, value, true, true);
    }

    @Override
    public boolean remove(Object key, Object value) {
        return removeNode(hash(key), key, value, true, true) != null;
    }

    @Override
    public boolean replace(K key, V oldValue, V newValue) {
        Node&lt;K, V&gt; e;
        V v;
        if ((e = getNode(hash(key), key)) != null &amp;&amp;
                ((v = e.value) == oldValue || (v != null &amp;&amp; v.equals(oldValue)))) {
            e.value = newValue;
            afterNodeAccess(e);
            return true;
        }
        return false;
    }

    @Override
    public V replace(K key, V value) {
        Node&lt;K, V&gt; e;
        if ((e = getNode(hash(key), key)) != null) {
            V oldValue = e.value;
            e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
        return null;
    }

    /**
     * {@inheritDoc}
     *
     * &lt;p&gt; This method will, on a best-effort basis, throw a
     * {@link ConcurrentModificationException} if it is detected that the
     * mapping function modifies this map during computation.
     *
     * @throws ConcurrentModificationException if it is detected that the
     *                                         mapping function modified this map
     */
    @Override
    public V computeIfAbsent(K key,
                             Function&lt;? super K, ? extends V&gt; mappingFunction) {
        if (mappingFunction == null)
            throw new NullPointerException();
        int hash = hash(key);
        Node&lt;K, V&gt;[] tab;
        Node&lt;K, V&gt; first;
        int n, i;
        int binCount = 0;
        TreeNode&lt;K, V&gt; t = null;
        Node&lt;K, V&gt; old = null;
        if (size &gt; threshold || (tab = table) == null ||
                (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((first = tab[i = (n - 1) &amp; hash]) != null) {
            if (first instanceof TreeNode)
                old = (t = (TreeNode&lt;K, V&gt;) first).getTreeNode(hash, key);
            else {
                Node&lt;K, V&gt; e = first;
                K k;
                do {
                    if (e.hash == hash &amp;&amp;
                            ((k = e.key) == key || (key != null &amp;&amp; key.equals(k)))) {
                        old = e;
                        break;
                    }
                    ++binCount;
                } while ((e = e.next) != null);
            }
            V oldValue;
            if (old != null &amp;&amp; (oldValue = old.value) != null) {
                afterNodeAccess(old);
                return oldValue;
            }
        }
        int mc = modCount;
        V v = mappingFunction.apply(key);
        if (mc != modCount) {
            throw new ConcurrentModificationException();
        }
        if (v == null) {
            return null;
        } else if (old != null) {
            old.value = v;
            afterNodeAccess(old);
            return v;
        } else if (t != null)
            t.putTreeVal(this, tab, hash, key, v);
        else {
            tab[i] = newNode(hash, key, v, first);
            if (binCount &gt;= TREEIFY_THRESHOLD - 1)
                treeifyBin(tab, hash);
        }
        modCount = mc + 1;
        ++size;
        afterNodeInsertion(true);
        return v;
    }

    /**
     * {@inheritDoc}
     *
     * &lt;p&gt; This method will, on a best-effort basis, throw a
     * {@link ConcurrentModificationException} if it is detected that the
     * remapping function modifies this map during computation.
     *
     * @throws ConcurrentModificationException if it is detected that the
     *                                         remapping function modified this map
     */
    @Override
    public V computeIfPresent(K key,
                              BiFunction&lt;? super K, ? super V, ? extends V&gt; remappingFunction) {
        if (remappingFunction == null)
            throw new NullPointerException();
        Node&lt;K, V&gt; e;
        V oldValue;
        int hash = hash(key);
        if ((e = getNode(hash, key)) != null &amp;&amp;
                (oldValue = e.value) != null) {
            int mc = modCount;
            V v = remappingFunction.apply(key, oldValue);
            if (mc != modCount) {
                throw new ConcurrentModificationException();
            }
            if (v != null) {
                e.value = v;
                afterNodeAccess(e);
                return v;
            } else
                removeNode(hash, key, null, false, true);
        }
        return null;
    }

    /**
     * {@inheritDoc}
     *
     * &lt;p&gt; This method will, on a best-effort basis, throw a
     * {@link ConcurrentModificationException} if it is detected that the
     * remapping function modifies this map during computation.
     *
     * @throws ConcurrentModificationException if it is detected that the
     *                                         remapping function modified this map
     */
    @Override
    public V compute(K key,
                     BiFunction&lt;? super K, ? super V, ? extends V&gt; remappingFunction) {
        if (remappingFunction == null)
            throw new NullPointerException();
        int hash = hash(key);
        Node&lt;K, V&gt;[] tab;
        Node&lt;K, V&gt; first;
        int n, i;
        int binCount = 0;
        TreeNode&lt;K, V&gt; t = null;
        Node&lt;K, V&gt; old = null;
        if (size &gt; threshold || (tab = table) == null ||
                (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((first = tab[i = (n - 1) &amp; hash]) != null) {
            if (first instanceof TreeNode)
                old = (t = (TreeNode&lt;K, V&gt;) first).getTreeNode(hash, key);
            else {
                Node&lt;K, V&gt; e = first;
                K k;
                do {
                    if (e.hash == hash &amp;&amp;
                            ((k = e.key) == key || (key != null &amp;&amp; key.equals(k)))) {
                        old = e;
                        break;
                    }
                    ++binCount;
                } while ((e = e.next) != null);
            }
        }
        V oldValue = (old == null) ? null : old.value;
        int mc = modCount;
        V v = remappingFunction.apply(key, oldValue);
        if (mc != modCount) {
            throw new ConcurrentModificationException();
        }
        if (old != null) {
            if (v != null) {
                old.value = v;
                afterNodeAccess(old);
            } else
                removeNode(hash, key, null, false, true);
        } else if (v != null) {
            if (t != null)
                t.putTreeVal(this, tab, hash, key, v);
            else {
                tab[i] = newNode(hash, key, v, first);
                if (binCount &gt;= TREEIFY_THRESHOLD - 1)
                    treeifyBin(tab, hash);
            }
            modCount = mc + 1;
            ++size;
            afterNodeInsertion(true);
        }
        return v;
    }

    /**
     * {@inheritDoc}
     *
     * &lt;p&gt; This method will, on a best-effort basis, throw a
     * {@link ConcurrentModificationException} if it is detected that the
     * remapping function modifies this map during computation.
     *
     * @throws ConcurrentModificationException if it is detected that the
     *                                         remapping function modified this map
     */
    @Override
    public V merge(K key, V value,
                   BiFunction&lt;? super V, ? super V, ? extends V&gt; remappingFunction) {
        if (value == null)
            throw new NullPointerException();
        if (remappingFunction == null)
            throw new NullPointerException();
        int hash = hash(key);
        Node&lt;K, V&gt;[] tab;
        Node&lt;K, V&gt; first;
        int n, i;
        int binCount = 0;
        TreeNode&lt;K, V&gt; t = null;
        Node&lt;K, V&gt; old = null;
        if (size &gt; threshold || (tab = table) == null ||
                (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((first = tab[i = (n - 1) &amp; hash]) != null) {
            if (first instanceof TreeNode)
                old = (t = (TreeNode&lt;K, V&gt;) first).getTreeNode(hash, key);
            else {
                Node&lt;K, V&gt; e = first;
                K k;
                do {
                    if (e.hash == hash &amp;&amp;
                            ((k = e.key) == key || (key != null &amp;&amp; key.equals(k)))) {
                        old = e;
                        break;
                    }
                    ++binCount;
                } while ((e = e.next) != null);
            }
        }
        if (old != null) {
            V v;
            if (old.value != null) {
                int mc = modCount;
                v = remappingFunction.apply(old.value, value);
                if (mc != modCount) {
                    throw new ConcurrentModificationException();
                }
            } else {
                v = value;
            }
            if (v != null) {
                old.value = v;
                afterNodeAccess(old);
            } else
                removeNode(hash, key, null, false, true);
            return v;
        }
        if (value != null) {
            if (t != null)
                t.putTreeVal(this, tab, hash, key, value);
            else {
                tab[i] = newNode(hash, key, value, first);
                if (binCount &gt;= TREEIFY_THRESHOLD - 1)
                    treeifyBin(tab, hash);
            }
            ++modCount;
            ++size;
            afterNodeInsertion(true);
        }
        return value;
    }

    @Override
    public void forEach(BiConsumer&lt;? super K, ? super V&gt; action) {
        Node&lt;K, V&gt;[] tab;
        if (action == null)
            throw new NullPointerException();
        if (size &gt; 0 &amp;&amp; (tab = table) != null) {
            int mc = modCount;
            for (Node&lt;K, V&gt; e : tab) {
                for (; e != null; e = e.next)
                    action.accept(e.key, e.value);
            }
            if (modCount != mc)
                throw new ConcurrentModificationException();
        }
    }

    @Override
    public void replaceAll(BiFunction&lt;? super K, ? super V, ? extends V&gt; function) {
        Node&lt;K, V&gt;[] tab;
        if (function == null)
            throw new NullPointerException();
        if (size &gt; 0 &amp;&amp; (tab = table) != null) {
            int mc = modCount;
            for (Node&lt;K, V&gt; e : tab) {
                for (; e != null; e = e.next) {
                    e.value = function.apply(e.key, e.value);
                }
            }
            if (modCount != mc)
                throw new ConcurrentModificationException();
        }
    }

    /* ------------------------------------------------------------ */
    // Cloning and serialization

    /**
     * Returns a shallow copy of this {@code HashMap} instance: the keys and
     * values themselves are not cloned.
     *
     * @return a shallow copy of this map
     */
    @SuppressWarnings(&quot;unchecked&quot;)
    @Override
    public Object clone() {
        HashMap&lt;K, V&gt; result;
        try {
            result = (HashMap&lt;K, V&gt;) super.clone();
        } catch (CloneNotSupportedException e) {
            // this shouldn&#39;t happen, since we are Cloneable
            throw new InternalError(e);
        }
        result.reinitialize();
        result.putMapEntries(this, false);
        return result;
    }

    // These methods are also used when serializing HashSets
    final float loadFactor() {
        return loadFactor;
    }

    final int capacity() {
        return (table != null) ? table.length :
                (threshold &gt; 0) ? threshold :
                        DEFAULT_INITIAL_CAPACITY;
    }

    /**
     * Saves this map to a stream (that is, serializes it).
     *
     * @param s the stream
     * @throws IOException if an I/O error occurs
     * @serialData The &lt;i&gt; capacity &lt;/i&gt; of the HashMap (the length of the
     * bucket array) is emitted (int), followed by the
     * &lt;i&gt; size &lt;/i&gt; (an int, the number of key-value
     * mappings), followed by the key (Object) and value (Object)
     * for each key-value mapping.  The key-value mappings are
     * emitted in no particular order.
     */
    private void writeObject(java.io.ObjectOutputStream s)
            throws IOException {
        int buckets = capacity();
        // Write out the threshold, loadfactor, and any hidden stuff
        s.defaultWriteObject();
        s.writeInt(buckets);
        s.writeInt(size);
        internalWriteEntries(s);
    }

    /**
     * Reconstitutes this map from a stream (that is, deserializes it).
     *
     * @param s the stream
     * @throws ClassNotFoundException if the class of a serialized object
     *                                could not be found
     * @throws IOException            if an I/O error occurs
     */
    private void readObject(java.io.ObjectInputStream s)
            throws IOException, ClassNotFoundException {
        // Read in the threshold (ignored), loadfactor, and any hidden stuff
        s.defaultReadObject();
        reinitialize();
        if (loadFactor &lt;= 0 || Float.isNaN(loadFactor))
            throw new InvalidObjectException(&quot;Illegal load factor: &quot; +
                    loadFactor);
        s.readInt();                // Read and ignore number of buckets
        int mappings = s.readInt(); // Read number of mappings (size)
        if (mappings &lt; 0)
            throw new InvalidObjectException(&quot;Illegal mappings count: &quot; +
                    mappings);
        else if (mappings &gt; 0) { // (if zero, use defaults)
            // Size the table using given load factor only if within
            // range of 0.25...4.0
            float lf = Math.min(Math.max(0.25f, loadFactor), 4.0f);
            float fc = (float) mappings / lf + 1.0f;
            int cap = ((fc &lt; DEFAULT_INITIAL_CAPACITY) ?
                    DEFAULT_INITIAL_CAPACITY :
                    (fc &gt;= MAXIMUM_CAPACITY) ?
                            MAXIMUM_CAPACITY :
                            tableSizeFor((int) fc));
            float ft = (float) cap * lf;
            threshold = ((cap &lt; MAXIMUM_CAPACITY &amp;&amp; ft &lt; MAXIMUM_CAPACITY) ?
                    (int) ft : Integer.MAX_VALUE);

            // Check Map.Entry [].class since it&#39;s the nearest public type to
            // what we&#39;re actually creating.
            SharedSecrets.getJavaObjectInputStreamAccess().checkArray(s, Map.Entry[].class, cap);
            @SuppressWarnings({&quot;rawtypes&quot;, &quot;unchecked&quot;})
            Node&lt;K, V&gt;[] tab = (Node&lt;K, V&gt;[]) new Node[cap];
            table = tab;

            // Read the keys and values, and put the mappings in the HashMap
            for (int i = 0; i &lt; mappings; i++) {
                @SuppressWarnings(&quot;unchecked&quot;)
                K key = (K) s.readObject();
                @SuppressWarnings(&quot;unchecked&quot;)
                V value = (V) s.readObject();
                putVal(hash(key), key, value, false, false);
            }
        }
    }

    /* ------------------------------------------------------------ */
    // iterators

    abstract class HashIterator {

        Node&lt;K, V&gt; next;        // next entry to return

        Node&lt;K, V&gt; current;     // current entry

        int expectedModCount;  // for fast-fail

        int index;             // current slot

        HashIterator() {
            expectedModCount = modCount;
            Node&lt;K, V&gt;[] t = table;
            current = next = null;
            index = 0;
            if (t != null &amp;&amp; size &gt; 0) { // advance to first entry
                do {
                } while (index &lt; t.length &amp;&amp; (next = t[index++]) == null);
            }
        }

        public final boolean hasNext() {
            return next != null;
        }

        final Node&lt;K, V&gt; nextNode() {
            Node&lt;K, V&gt;[] t;
            Node&lt;K, V&gt; e = next;
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
            if (e == null)
                throw new NoSuchElementException();
            if ((next = (current = e).next) == null &amp;&amp; (t = table) != null) {
                do {
                } while (index &lt; t.length &amp;&amp; (next = t[index++]) == null);
            }
            return e;
        }

        public final void remove() {
            Node&lt;K, V&gt; p = current;
            if (p == null)
                throw new IllegalStateException();
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
            current = null;
            removeNode(p.hash, p.key, null, false, false);
            expectedModCount = modCount;
        }

    }

    final class KeyIterator extends HashIterator
            implements Iterator&lt;K&gt; {

        public final K next() {
            return nextNode().key;
        }

    }

    final class ValueIterator extends HashIterator
            implements Iterator&lt;V&gt; {

        public final V next() {
            return nextNode().value;
        }

    }

    final class EntryIterator extends HashIterator
            implements Iterator&lt;Map.Entry&lt;K, V&gt;&gt; {

        public final Map.Entry&lt;K, V&gt; next() {
            return nextNode();
        }

    }

    /* ------------------------------------------------------------ */
    // spliterators

    static class HashMapSpliterator&lt;K, V&gt; {

        final HashMap&lt;K, V&gt; map;

        Node&lt;K, V&gt; current;          // current node

        int index;                  // current index, modified on advance/split

        int fence;                  // one past last index

        int est;                    // size estimate

        int expectedModCount;       // for comodification checks

        HashMapSpliterator(HashMap&lt;K, V&gt; m, int origin,
                           int fence, int est,
                           int expectedModCount) {
            this.map = m;
            this.index = origin;
            this.fence = fence;
            this.est = est;
            this.expectedModCount = expectedModCount;
        }

        final int getFence() { // initialize fence and size on first use
            int hi;
            if ((hi = fence) &lt; 0) {
                HashMap&lt;K, V&gt; m = map;
                est = m.size;
                expectedModCount = m.modCount;
                Node&lt;K, V&gt;[] tab = m.table;
                hi = fence = (tab == null) ? 0 : tab.length;
            }
            return hi;
        }

        public final long estimateSize() {
            getFence(); // force init
            return (long) est;
        }

    }

    static final class KeySpliterator&lt;K, V&gt;
            extends HashMapSpliterator&lt;K, V&gt;
            implements Spliterator&lt;K&gt; {

        KeySpliterator(HashMap&lt;K, V&gt; m, int origin, int fence, int est,
                       int expectedModCount) {
            super(m, origin, fence, est, expectedModCount);
        }

        public KeySpliterator&lt;K, V&gt; trySplit() {
            int hi = getFence(), lo = index, mid = (lo + hi) &gt;&gt;&gt; 1;
            return (lo &gt;= mid || current != null) ? null :
                    new KeySpliterator&lt;&gt;(map, lo, index = mid, est &gt;&gt;&gt;= 1,
                            expectedModCount);
        }

        public void forEachRemaining(Consumer&lt;? super K&gt; action) {
            int i, hi, mc;
            if (action == null)
                throw new NullPointerException();
            HashMap&lt;K, V&gt; m = map;
            Node&lt;K, V&gt;[] tab = m.table;
            if ((hi = fence) &lt; 0) {
                mc = expectedModCount = m.modCount;
                hi = fence = (tab == null) ? 0 : tab.length;
            } else
                mc = expectedModCount;
            if (tab != null &amp;&amp; tab.length &gt;= hi &amp;&amp;
                    (i = index) &gt;= 0 &amp;&amp; (i &lt; (index = hi) || current != null)) {
                Node&lt;K, V&gt; p = current;
                current = null;
                do {
                    if (p == null)
                        p = tab[i++];
                    else {
                        action.accept(p.key);
                        p = p.next;
                    }
                } while (p != null || i &lt; hi);
                if (m.modCount != mc)
                    throw new ConcurrentModificationException();
            }
        }

        public boolean tryAdvance(Consumer&lt;? super K&gt; action) {
            int hi;
            if (action == null)
                throw new NullPointerException();
            Node&lt;K, V&gt;[] tab = map.table;
            if (tab != null &amp;&amp; tab.length &gt;= (hi = getFence()) &amp;&amp; index &gt;= 0) {
                while (current != null || index &lt; hi) {
                    if (current == null)
                        current = tab[index++];
                    else {
                        K k = current.key;
                        current = current.next;
                        action.accept(k);
                        if (map.modCount != expectedModCount)
                            throw new ConcurrentModificationException();
                        return true;
                    }
                }
            }
            return false;
        }

        public int characteristics() {
            return (fence &lt; 0 || est == map.size ? Spliterator.SIZED : 0) |
                    Spliterator.DISTINCT;
        }

    }

    static final class ValueSpliterator&lt;K, V&gt;
            extends HashMapSpliterator&lt;K, V&gt;
            implements Spliterator&lt;V&gt; {

        ValueSpliterator(HashMap&lt;K, V&gt; m, int origin, int fence, int est,
                         int expectedModCount) {
            super(m, origin, fence, est, expectedModCount);
        }

        public ValueSpliterator&lt;K, V&gt; trySplit() {
            int hi = getFence(), lo = index, mid = (lo + hi) &gt;&gt;&gt; 1;
            return (lo &gt;= mid || current != null) ? null :
                    new ValueSpliterator&lt;&gt;(map, lo, index = mid, est &gt;&gt;&gt;= 1,
                            expectedModCount);
        }

        public void forEachRemaining(Consumer&lt;? super V&gt; action) {
            int i, hi, mc;
            if (action == null)
                throw new NullPointerException();
            HashMap&lt;K, V&gt; m = map;
            Node&lt;K, V&gt;[] tab = m.table;
            if ((hi = fence) &lt; 0) {
                mc = expectedModCount = m.modCount;
                hi = fence = (tab == null) ? 0 : tab.length;
            } else
                mc = expectedModCount;
            if (tab != null &amp;&amp; tab.length &gt;= hi &amp;&amp;
                    (i = index) &gt;= 0 &amp;&amp; (i &lt; (index = hi) || current != null)) {
                Node&lt;K, V&gt; p = current;
                current = null;
                do {
                    if (p == null)
                        p = tab[i++];
                    else {
                        action.accept(p.value);
                        p = p.next;
                    }
                } while (p != null || i &lt; hi);
                if (m.modCount != mc)
                    throw new ConcurrentModificationException();
            }
        }

        public boolean tryAdvance(Consumer&lt;? super V&gt; action) {
            int hi;
            if (action == null)
                throw new NullPointerException();
            Node&lt;K, V&gt;[] tab = map.table;
            if (tab != null &amp;&amp; tab.length &gt;= (hi = getFence()) &amp;&amp; index &gt;= 0) {
                while (current != null || index &lt; hi) {
                    if (current == null)
                        current = tab[index++];
                    else {
                        V v = current.value;
                        current = current.next;
                        action.accept(v);
                        if (map.modCount != expectedModCount)
                            throw new ConcurrentModificationException();
                        return true;
                    }
                }
            }
            return false;
        }

        public int characteristics() {
            return (fence &lt; 0 || est == map.size ? Spliterator.SIZED : 0);
        }

    }

    static final class EntrySpliterator&lt;K, V&gt;
            extends HashMapSpliterator&lt;K, V&gt;
            implements Spliterator&lt;Map.Entry&lt;K, V&gt;&gt; {

        EntrySpliterator(HashMap&lt;K, V&gt; m, int origin, int fence, int est,
                         int expectedModCount) {
            super(m, origin, fence, est, expectedModCount);
        }

        public EntrySpliterator&lt;K, V&gt; trySplit() {
            int hi = getFence(), lo = index, mid = (lo + hi) &gt;&gt;&gt; 1;
            return (lo &gt;= mid || current != null) ? null :
                    new EntrySpliterator&lt;&gt;(map, lo, index = mid, est &gt;&gt;&gt;= 1,
                            expectedModCount);
        }

        public void forEachRemaining(Consumer&lt;? super Map.Entry&lt;K, V&gt;&gt; action) {
            int i, hi, mc;
            if (action == null)
                throw new NullPointerException();
            HashMap&lt;K, V&gt; m = map;
            Node&lt;K, V&gt;[] tab = m.table;
            if ((hi = fence) &lt; 0) {
                mc = expectedModCount = m.modCount;
                hi = fence = (tab == null) ? 0 : tab.length;
            } else
                mc = expectedModCount;
            if (tab != null &amp;&amp; tab.length &gt;= hi &amp;&amp;
                    (i = index) &gt;= 0 &amp;&amp; (i &lt; (index = hi) || current != null)) {
                Node&lt;K, V&gt; p = current;
                current = null;
                do {
                    if (p == null)
                        p = tab[i++];
                    else {
                        action.accept(p);
                        p = p.next;
                    }
                } while (p != null || i &lt; hi);
                if (m.modCount != mc)
                    throw new ConcurrentModificationException();
            }
        }

        public boolean tryAdvance(Consumer&lt;? super Map.Entry&lt;K, V&gt;&gt; action) {
            int hi;
            if (action == null)
                throw new NullPointerException();
            Node&lt;K, V&gt;[] tab = map.table;
            if (tab != null &amp;&amp; tab.length &gt;= (hi = getFence()) &amp;&amp; index &gt;= 0) {
                while (current != null || index &lt; hi) {
                    if (current == null)
                        current = tab[index++];
                    else {
                        Node&lt;K, V&gt; e = current;
                        current = current.next;
                        action.accept(e);
                        if (map.modCount != expectedModCount)
                            throw new ConcurrentModificationException();
                        return true;
                    }
                }
            }
            return false;
        }

        public int characteristics() {
            return (fence &lt; 0 || est == map.size ? Spliterator.SIZED : 0) |
                    Spliterator.DISTINCT;
        }

    }

    /* ------------------------------------------------------------ */
    // LinkedHashMap support


    /*
     * The following package-protected methods are designed to be
     * overridden by LinkedHashMap, but not by any other subclass.
     * Nearly all other internal methods are also package-protected
     * but are declared final, so can be used by LinkedHashMap, view
     * classes, and HashSet.
     */

    // Create a regular (non-tree) node
    Node&lt;K, V&gt; newNode(int hash, K key, V value, Node&lt;K, V&gt; next) {
        return new Node&lt;&gt;(hash, key, value, next);
    }

    // For conversion from TreeNodes to plain nodes
    Node&lt;K, V&gt; replacementNode(Node&lt;K, V&gt; p, Node&lt;K, V&gt; next) {
        return new Node&lt;&gt;(p.hash, p.key, p.value, next);
    }

    // Create a tree bin node
    TreeNode&lt;K, V&gt; newTreeNode(int hash, K key, V value, Node&lt;K, V&gt; next) {
        return new TreeNode&lt;&gt;(hash, key, value, next);
    }

    // For treeifyBin
    TreeNode&lt;K, V&gt; replacementTreeNode(Node&lt;K, V&gt; p, Node&lt;K, V&gt; next) {
        return new TreeNode&lt;&gt;(p.hash, p.key, p.value, next);
    }

    /**
     * Reset to initial default state.  Called by clone and readObject.
     */
    void reinitialize() {
        table = null;
        entrySet = null;
        keySet = null;
        values = null;
        modCount = 0;
        threshold = 0;
        size = 0;
    }

    // Callbacks to allow LinkedHashMap post-actions
    // \u8FD9\u4E2A\u4E09\u4E2A\u65B9\u6CD5\u90FD\u662F\u4E3A\u4E86\u7EE7\u627F HashMap \u7684 LinkedHashMap \u7C7B\u670D\u52A1\u7684
    void afterNodeAccess(Node&lt;K, V&gt; p) {
    }

    void afterNodeInsertion(boolean evict) {
    }

    void afterNodeRemoval(Node&lt;K, V&gt; p) {
    }

    // Called only from writeObject, to ensure compatible ordering.
    void internalWriteEntries(java.io.ObjectOutputStream s) throws IOException {
        Node&lt;K, V&gt;[] tab;
        if (size &gt; 0 &amp;&amp; (tab = table) != null) {
            for (Node&lt;K, V&gt; e : tab) {
                for (; e != null; e = e.next) {
                    s.writeObject(e.key);
                    s.writeObject(e.value);
                }
            }
        }
    }

    /* ------------------------------------------------------------ */
    // Tree bins

    /**
     * Entry for Tree bins. Extends LinkedHashMap.Entry (which in turn
     * extends Node) so can be used as extension of either regular or
     * linked node.
     */
    static final class TreeNode&lt;K, V&gt; extends LinkedHashMap.Entry&lt;K, V&gt; {

        TreeNode&lt;K, V&gt; parent;  // red-black tree links

        TreeNode&lt;K, V&gt; left;

        TreeNode&lt;K, V&gt; right;

        TreeNode&lt;K, V&gt; prev;    // needed to unlink next upon deletion

        boolean red;

        TreeNode(int hash, K key, V val, Node&lt;K, V&gt; next) {
            super(hash, key, val, next);
        }

        /**
         * Returns root of tree containing this node.
         */
        final TreeNode&lt;K, V&gt; root() {
            for (TreeNode&lt;K, V&gt; r = this, p; ; ) {
                if ((p = r.parent) == null)
                    return r;
                r = p;
            }
        }

        /**
         * Ensures that the given root is the first node of its bin.
         */
        static &lt;K, V&gt; void moveRootToFront(Node&lt;K, V&gt;[] tab, TreeNode&lt;K, V&gt; root) {
            int n;
            if (root != null &amp;&amp; tab != null &amp;&amp; (n = tab.length) &gt; 0) {
                int index = (n - 1) &amp; root.hash;
                TreeNode&lt;K, V&gt; first = (TreeNode&lt;K, V&gt;) tab[index];
                if (root != first) {
                    Node&lt;K, V&gt; rn;
                    tab[index] = root;
                    TreeNode&lt;K, V&gt; rp = root.prev;
                    if ((rn = root.next) != null)
                        ((TreeNode&lt;K, V&gt;) rn).prev = rp;
                    if (rp != null)
                        rp.next = rn;
                    if (first != null)
                        first.prev = root;
                    root.next = first;
                    root.prev = null;
                }
                assert checkInvariants(root);
            }
        }

        /**
         * Finds the node starting at root p with the given hash and key.
         * The kc argument caches comparableClassFor(key) upon first use
         * comparing keys.
         */
        final TreeNode&lt;K, V&gt; find(int h, Object k, Class&lt;?&gt; kc) {
            TreeNode&lt;K, V&gt; p = this;
            do {
                int ph, dir;
                K pk;
                TreeNode&lt;K, V&gt; pl = p.left, pr = p.right, q;
                if ((ph = p.hash) &gt; h)
                    p = pl;
                else if (ph &lt; h)
                    p = pr;
                else if ((pk = p.key) == k || (k != null &amp;&amp; k.equals(pk)))
                    return p;
                else if (pl == null)
                    p = pr;
                else if (pr == null)
                    p = pl;
                else if ((kc != null ||
                        (kc = comparableClassFor(k)) != null) &amp;&amp;
                        (dir = compareComparables(kc, k, pk)) != 0)
                    p = (dir &lt; 0) ? pl : pr;
                else if ((q = pr.find(h, k, kc)) != null)
                    return q;
                else
                    p = pl;
            } while (p != null);
            return null;
        }

        /**
         * Calls find for root node.
         */
        final TreeNode&lt;K, V&gt; getTreeNode(int h, Object k) {
            return ((parent != null) ? root() : this).find(h, k, null);
        }

        /**
         * Tie-breaking utility for ordering insertions when equal
         * hashCodes and non-comparable. We don&#39;t require a total
         * order, just a consistent insertion rule to maintain
         * equivalence across rebalancings. Tie-breaking further than
         * necessary simplifies testing a bit.
         */
        static int tieBreakOrder(Object a, Object b) {
            int d;
            if (a == null || b == null ||
                    (d = a.getClass().getName().
                            compareTo(b.getClass().getName())) == 0)
                d = (System.identityHashCode(a) &lt;= System.identityHashCode(b) ?
                        -1 : 1);
            return d;
        }

        /**
         * Forms tree of the nodes linked from this node.
         */
        final void treeify(Node&lt;K, V&gt;[] tab) {
            TreeNode&lt;K, V&gt; root = null;
            for (TreeNode&lt;K, V&gt; x = this, next; x != null; x = next) {
                next = (TreeNode&lt;K, V&gt;) x.next;
                x.left = x.right = null;
                if (root == null) {
                    x.parent = null;
                    x.red = false;
                    root = x;
                } else {
                    K k = x.key;
                    int h = x.hash;
                    Class&lt;?&gt; kc = null;
                    for (TreeNode&lt;K, V&gt; p = root; ; ) {
                        int dir, ph;
                        K pk = p.key;
                        if ((ph = p.hash) &gt; h)
                            dir = -1;
                        else if (ph &lt; h)
                            dir = 1;
                        else if ((kc == null &amp;&amp;
                                (kc = comparableClassFor(k)) == null) ||
                                (dir = compareComparables(kc, k, pk)) == 0)
                            dir = tieBreakOrder(k, pk);

                        TreeNode&lt;K, V&gt; xp = p;
                        if ((p = (dir &lt;= 0) ? p.left : p.right) == null) {
                            x.parent = xp;
                            if (dir &lt;= 0)
                                xp.left = x;
                            else
                                xp.right = x;
                            root = balanceInsertion(root, x);
                            break;
                        }
                    }
                }
            }
            moveRootToFront(tab, root);
        }

        /**
         * Returns a list of non-TreeNodes replacing those linked from
         * this node.
         */
        final Node&lt;K, V&gt; untreeify(HashMap&lt;K, V&gt; map) {
            Node&lt;K, V&gt; hd = null, tl = null;
            for (Node&lt;K, V&gt; q = this; q != null; q = q.next) {
                Node&lt;K, V&gt; p = map.replacementNode(q, null);
                if (tl == null)
                    hd = p;
                else
                    tl.next = p;
                tl = p;
            }
            return hd;
        }

        /**
         * Tree version of putVal.
         */
        final TreeNode&lt;K, V&gt; putTreeVal(HashMap&lt;K, V&gt; map, Node&lt;K, V&gt;[] tab,
                                        int h, K k, V v) {
            Class&lt;?&gt; kc = null;
            boolean searched = false;
            TreeNode&lt;K, V&gt; root = (parent != null) ? root() : this;
            for (TreeNode&lt;K, V&gt; p = root; ; ) {
                int dir, ph;
                K pk;
                if ((ph = p.hash) &gt; h)
                    dir = -1;
                else if (ph &lt; h)
                    dir = 1;
                else if ((pk = p.key) == k || (k != null &amp;&amp; k.equals(pk)))
                    return p;
                else if ((kc == null &amp;&amp;
                        (kc = comparableClassFor(k)) == null) ||
                        (dir = compareComparables(kc, k, pk)) == 0) {
                    if (!searched) {
                        TreeNode&lt;K, V&gt; q, ch;
                        searched = true;
                        if (((ch = p.left) != null &amp;&amp;
                                (q = ch.find(h, k, kc)) != null) ||
                                ((ch = p.right) != null &amp;&amp;
                                        (q = ch.find(h, k, kc)) != null))
                            return q;
                    }
                    dir = tieBreakOrder(k, pk);
                }

                TreeNode&lt;K, V&gt; xp = p;
                if ((p = (dir &lt;= 0) ? p.left : p.right) == null) {
                    Node&lt;K, V&gt; xpn = xp.next;
                    TreeNode&lt;K, V&gt; x = map.newTreeNode(h, k, v, xpn);
                    if (dir &lt;= 0)
                        xp.left = x;
                    else
                        xp.right = x;
                    xp.next = x;
                    x.parent = x.prev = xp;
                    if (xpn != null)
                        ((TreeNode&lt;K, V&gt;) xpn).prev = x;
                    moveRootToFront(tab, balanceInsertion(root, x));
                    return null;
                }
            }
        }

        /**
         * Removes the given node, that must be present before this call.
         * This is messier than typical red-black deletion code because we
         * cannot swap the contents of an interior node with a leaf
         * successor that is pinned by &quot;next&quot; pointers that are accessible
         * independently during traversal. So instead we swap the tree
         * linkages. If the current tree appears to have too few nodes,
         * the bin is converted back to a plain bin. (The test triggers
         * somewhere between 2 and 6 nodes, depending on tree structure).
         */
        final void removeTreeNode(HashMap&lt;K, V&gt; map, Node&lt;K, V&gt;[] tab,
                                  boolean movable) {
            int n;
            if (tab == null || (n = tab.length) == 0)
                return;
            int index = (n - 1) &amp; hash;
            TreeNode&lt;K, V&gt; first = (TreeNode&lt;K, V&gt;) tab[index], root = first, rl;
            TreeNode&lt;K, V&gt; succ = (TreeNode&lt;K, V&gt;) next, pred = prev;
            if (pred == null)
                tab[index] = first = succ;
            else
                pred.next = succ;
            if (succ != null)
                succ.prev = pred;
            if (first == null)
                return;
            if (root.parent != null)
                root = root.root();
            if (root == null
                    || (movable
                    &amp;&amp; (root.right == null
                    || (rl = root.left) == null
                    || rl.left == null))) {
                tab[index] = first.untreeify(map);  // too small
                return;
            }
            TreeNode&lt;K, V&gt; p = this, pl = left, pr = right, replacement;
            if (pl != null &amp;&amp; pr != null) {
                TreeNode&lt;K, V&gt; s = pr, sl;
                while ((sl = s.left) != null) // find successor
                    s = sl;
                boolean c = s.red;
                s.red = p.red;
                p.red = c; // swap colors
                TreeNode&lt;K, V&gt; sr = s.right;
                TreeNode&lt;K, V&gt; pp = p.parent;
                if (s == pr) { // p was s&#39;s direct parent
                    p.parent = s;
                    s.right = p;
                } else {
                    TreeNode&lt;K, V&gt; sp = s.parent;
                    if ((p.parent = sp) != null) {
                        if (s == sp.left)
                            sp.left = p;
                        else
                            sp.right = p;
                    }
                    if ((s.right = pr) != null)
                        pr.parent = s;
                }
                p.left = null;
                if ((p.right = sr) != null)
                    sr.parent = p;
                if ((s.left = pl) != null)
                    pl.parent = s;
                if ((s.parent = pp) == null)
                    root = s;
                else if (p == pp.left)
                    pp.left = s;
                else
                    pp.right = s;
                if (sr != null)
                    replacement = sr;
                else
                    replacement = p;
            } else if (pl != null)
                replacement = pl;
            else if (pr != null)
                replacement = pr;
            else
                replacement = p;
            if (replacement != p) {
                TreeNode&lt;K, V&gt; pp = replacement.parent = p.parent;
                if (pp == null)
                    (root = replacement).red = false;
                else if (p == pp.left)
                    pp.left = replacement;
                else
                    pp.right = replacement;
                p.left = p.right = p.parent = null;
            }

            TreeNode&lt;K, V&gt; r = p.red ? root : balanceDeletion(root, replacement);

            if (replacement == p) {  // detach
                TreeNode&lt;K, V&gt; pp = p.parent;
                p.parent = null;
                if (pp != null) {
                    if (p == pp.left)
                        pp.left = null;
                    else if (p == pp.right)
                        pp.right = null;
                }
            }
            if (movable)
                moveRootToFront(tab, r);
        }

        /**
         * Splits nodes in a tree bin into lower and upper tree bins,
         * or untreeifies if now too small. Called only from resize;
         * see above discussion about split bits and indices.
         *
         * @param map   the map
         * @param tab   the table for recording bin heads
         * @param index the index of the table being split
         * @param bit   the bit of hash to split on
         */
        final void split(HashMap&lt;K, V&gt; map, Node&lt;K, V&gt;[] tab, int index, int bit) {
            TreeNode&lt;K, V&gt; b = this;
            // Relink into lo and hi lists, preserving order
            TreeNode&lt;K, V&gt; loHead = null, loTail = null;
            TreeNode&lt;K, V&gt; hiHead = null, hiTail = null;
            int lc = 0, hc = 0;
            for (TreeNode&lt;K, V&gt; e = b, next; e != null; e = next) {
                next = (TreeNode&lt;K, V&gt;) e.next;
                e.next = null;
                if ((e.hash &amp; bit) == 0) {
                    if ((e.prev = loTail) == null)
                        loHead = e;
                    else
                        loTail.next = e;
                    loTail = e;
                    ++lc;
                } else {
                    if ((e.prev = hiTail) == null)
                        hiHead = e;
                    else
                        hiTail.next = e;
                    hiTail = e;
                    ++hc;
                }
            }

            if (loHead != null) {
                if (lc &lt;= UNTREEIFY_THRESHOLD)
                    tab[index] = loHead.untreeify(map);
                else {
                    tab[index] = loHead;
                    if (hiHead != null) // (else is already treeified)
                        loHead.treeify(tab);
                }
            }
            if (hiHead != null) {
                if (hc &lt;= UNTREEIFY_THRESHOLD)
                    tab[index + bit] = hiHead.untreeify(map);
                else {
                    tab[index + bit] = hiHead;
                    if (loHead != null)
                        hiHead.treeify(tab);
                }
            }
        }

        /* ------------------------------------------------------------ */
        // Red-black tree methods, all adapted from CLR

        static &lt;K, V&gt; TreeNode&lt;K, V&gt; rotateLeft(TreeNode&lt;K, V&gt; root,
                                                TreeNode&lt;K, V&gt; p) {
            TreeNode&lt;K, V&gt; r, pp, rl;
            if (p != null &amp;&amp; (r = p.right) != null) {
                if ((rl = p.right = r.left) != null)
                    rl.parent = p;
                if ((pp = r.parent = p.parent) == null)
                    (root = r).red = false;
                else if (pp.left == p)
                    pp.left = r;
                else
                    pp.right = r;
                r.left = p;
                p.parent = r;
            }
            return root;
        }

        static &lt;K, V&gt; TreeNode&lt;K, V&gt; rotateRight(TreeNode&lt;K, V&gt; root,
                                                 TreeNode&lt;K, V&gt; p) {
            TreeNode&lt;K, V&gt; l, pp, lr;
            if (p != null &amp;&amp; (l = p.left) != null) {
                if ((lr = p.left = l.right) != null)
                    lr.parent = p;
                if ((pp = l.parent = p.parent) == null)
                    (root = l).red = false;
                else if (pp.right == p)
                    pp.right = l;
                else
                    pp.left = l;
                l.right = p;
                p.parent = l;
            }
            return root;
        }

        static &lt;K, V&gt; TreeNode&lt;K, V&gt; balanceInsertion(TreeNode&lt;K, V&gt; root,
                                                      TreeNode&lt;K, V&gt; x) {
            x.red = true;
            for (TreeNode&lt;K, V&gt; xp, xpp, xppl, xppr; ; ) {
                if ((xp = x.parent) == null) {
                    x.red = false;
                    return x;
                } else if (!xp.red || (xpp = xp.parent) == null)
                    return root;
                if (xp == (xppl = xpp.left)) {
                    if ((xppr = xpp.right) != null &amp;&amp; xppr.red) {
                        xppr.red = false;
                        xp.red = false;
                        xpp.red = true;
                        x = xpp;
                    } else {
                        if (x == xp.right) {
                            root = rotateLeft(root, x = xp);
                            xpp = (xp = x.parent) == null ? null : xp.parent;
                        }
                        if (xp != null) {
                            xp.red = false;
                            if (xpp != null) {
                                xpp.red = true;
                                root = rotateRight(root, xpp);
                            }
                        }
                    }
                } else {
                    if (xppl != null &amp;&amp; xppl.red) {
                        xppl.red = false;
                        xp.red = false;
                        xpp.red = true;
                        x = xpp;
                    } else {
                        if (x == xp.left) {
                            root = rotateRight(root, x = xp);
                            xpp = (xp = x.parent) == null ? null : xp.parent;
                        }
                        if (xp != null) {
                            xp.red = false;
                            if (xpp != null) {
                                xpp.red = true;
                                root = rotateLeft(root, xpp);
                            }
                        }
                    }
                }
            }
        }

        static &lt;K, V&gt; TreeNode&lt;K, V&gt; balanceDeletion(TreeNode&lt;K, V&gt; root,
                                                     TreeNode&lt;K, V&gt; x) {
            for (TreeNode&lt;K, V&gt; xp, xpl, xpr; ; ) {
                if (x == null || x == root)
                    return root;
                else if ((xp = x.parent) == null) {
                    x.red = false;
                    return x;
                } else if (x.red) {
                    x.red = false;
                    return root;
                } else if ((xpl = xp.left) == x) {
                    if ((xpr = xp.right) != null &amp;&amp; xpr.red) {
                        xpr.red = false;
                        xp.red = true;
                        root = rotateLeft(root, xp);
                        xpr = (xp = x.parent) == null ? null : xp.right;
                    }
                    if (xpr == null)
                        x = xp;
                    else {
                        TreeNode&lt;K, V&gt; sl = xpr.left, sr = xpr.right;
                        if ((sr == null || !sr.red) &amp;&amp;
                                (sl == null || !sl.red)) {
                            xpr.red = true;
                            x = xp;
                        } else {
                            if (sr == null || !sr.red) {
                                if (sl != null)
                                    sl.red = false;
                                xpr.red = true;
                                root = rotateRight(root, xpr);
                                xpr = (xp = x.parent) == null ?
                                        null : xp.right;
                            }
                            if (xpr != null) {
                                xpr.red = (xp == null) ? false : xp.red;
                                if ((sr = xpr.right) != null)
                                    sr.red = false;
                            }
                            if (xp != null) {
                                xp.red = false;
                                root = rotateLeft(root, xp);
                            }
                            x = root;
                        }
                    }
                } else { // symmetric
                    if (xpl != null &amp;&amp; xpl.red) {
                        xpl.red = false;
                        xp.red = true;
                        root = rotateRight(root, xp);
                        xpl = (xp = x.parent) == null ? null : xp.left;
                    }
                    if (xpl == null)
                        x = xp;
                    else {
                        TreeNode&lt;K, V&gt; sl = xpl.left, sr = xpl.right;
                        if ((sl == null || !sl.red) &amp;&amp;
                                (sr == null || !sr.red)) {
                            xpl.red = true;
                            x = xp;
                        } else {
                            if (sl == null || !sl.red) {
                                if (sr != null)
                                    sr.red = false;
                                xpl.red = true;
                                root = rotateLeft(root, xpl);
                                xpl = (xp = x.parent) == null ?
                                        null : xp.left;
                            }
                            if (xpl != null) {
                                xpl.red = (xp == null) ? false : xp.red;
                                if ((sl = xpl.left) != null)
                                    sl.red = false;
                            }
                            if (xp != null) {
                                xp.red = false;
                                root = rotateRight(root, xp);
                            }
                            x = root;
                        }
                    }
                }
            }
        }

        /**
         * Recursive invariant check
         */
        static &lt;K, V&gt; boolean checkInvariants(TreeNode&lt;K, V&gt; t) {
            TreeNode&lt;K, V&gt; tp = t.parent, tl = t.left, tr = t.right,
                    tb = t.prev, tn = (TreeNode&lt;K, V&gt;) t.next;
            if (tb != null &amp;&amp; tb.next != t)
                return false;
            if (tn != null &amp;&amp; tn.prev != t)
                return false;
            if (tp != null &amp;&amp; t != tp.left &amp;&amp; t != tp.right)
                return false;
            if (tl != null &amp;&amp; (tl.parent != t || tl.hash &gt; t.hash))
                return false;
            if (tr != null &amp;&amp; (tr.parent != t || tr.hash &lt; t.hash))
                return false;
            if (t.red &amp;&amp; tl != null &amp;&amp; tl.red &amp;&amp; tr != null &amp;&amp; tr.red)
                return false;
            if (tl != null &amp;&amp; !checkInvariants(tl))
                return false;
            if (tr != null &amp;&amp; !checkInvariants(tr))
                return false;
            return true;
        }

    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br><span class="line-number">327</span><br><span class="line-number">328</span><br><span class="line-number">329</span><br><span class="line-number">330</span><br><span class="line-number">331</span><br><span class="line-number">332</span><br><span class="line-number">333</span><br><span class="line-number">334</span><br><span class="line-number">335</span><br><span class="line-number">336</span><br><span class="line-number">337</span><br><span class="line-number">338</span><br><span class="line-number">339</span><br><span class="line-number">340</span><br><span class="line-number">341</span><br><span class="line-number">342</span><br><span class="line-number">343</span><br><span class="line-number">344</span><br><span class="line-number">345</span><br><span class="line-number">346</span><br><span class="line-number">347</span><br><span class="line-number">348</span><br><span class="line-number">349</span><br><span class="line-number">350</span><br><span class="line-number">351</span><br><span class="line-number">352</span><br><span class="line-number">353</span><br><span class="line-number">354</span><br><span class="line-number">355</span><br><span class="line-number">356</span><br><span class="line-number">357</span><br><span class="line-number">358</span><br><span class="line-number">359</span><br><span class="line-number">360</span><br><span class="line-number">361</span><br><span class="line-number">362</span><br><span class="line-number">363</span><br><span class="line-number">364</span><br><span class="line-number">365</span><br><span class="line-number">366</span><br><span class="line-number">367</span><br><span class="line-number">368</span><br><span class="line-number">369</span><br><span class="line-number">370</span><br><span class="line-number">371</span><br><span class="line-number">372</span><br><span class="line-number">373</span><br><span class="line-number">374</span><br><span class="line-number">375</span><br><span class="line-number">376</span><br><span class="line-number">377</span><br><span class="line-number">378</span><br><span class="line-number">379</span><br><span class="line-number">380</span><br><span class="line-number">381</span><br><span class="line-number">382</span><br><span class="line-number">383</span><br><span class="line-number">384</span><br><span class="line-number">385</span><br><span class="line-number">386</span><br><span class="line-number">387</span><br><span class="line-number">388</span><br><span class="line-number">389</span><br><span class="line-number">390</span><br><span class="line-number">391</span><br><span class="line-number">392</span><br><span class="line-number">393</span><br><span class="line-number">394</span><br><span class="line-number">395</span><br><span class="line-number">396</span><br><span class="line-number">397</span><br><span class="line-number">398</span><br><span class="line-number">399</span><br><span class="line-number">400</span><br><span class="line-number">401</span><br><span class="line-number">402</span><br><span class="line-number">403</span><br><span class="line-number">404</span><br><span class="line-number">405</span><br><span class="line-number">406</span><br><span class="line-number">407</span><br><span class="line-number">408</span><br><span class="line-number">409</span><br><span class="line-number">410</span><br><span class="line-number">411</span><br><span class="line-number">412</span><br><span class="line-number">413</span><br><span class="line-number">414</span><br><span class="line-number">415</span><br><span class="line-number">416</span><br><span class="line-number">417</span><br><span class="line-number">418</span><br><span class="line-number">419</span><br><span class="line-number">420</span><br><span class="line-number">421</span><br><span class="line-number">422</span><br><span class="line-number">423</span><br><span class="line-number">424</span><br><span class="line-number">425</span><br><span class="line-number">426</span><br><span class="line-number">427</span><br><span class="line-number">428</span><br><span class="line-number">429</span><br><span class="line-number">430</span><br><span class="line-number">431</span><br><span class="line-number">432</span><br><span class="line-number">433</span><br><span class="line-number">434</span><br><span class="line-number">435</span><br><span class="line-number">436</span><br><span class="line-number">437</span><br><span class="line-number">438</span><br><span class="line-number">439</span><br><span class="line-number">440</span><br><span class="line-number">441</span><br><span class="line-number">442</span><br><span class="line-number">443</span><br><span class="line-number">444</span><br><span class="line-number">445</span><br><span class="line-number">446</span><br><span class="line-number">447</span><br><span class="line-number">448</span><br><span class="line-number">449</span><br><span class="line-number">450</span><br><span class="line-number">451</span><br><span class="line-number">452</span><br><span class="line-number">453</span><br><span class="line-number">454</span><br><span class="line-number">455</span><br><span class="line-number">456</span><br><span class="line-number">457</span><br><span class="line-number">458</span><br><span class="line-number">459</span><br><span class="line-number">460</span><br><span class="line-number">461</span><br><span class="line-number">462</span><br><span class="line-number">463</span><br><span class="line-number">464</span><br><span class="line-number">465</span><br><span class="line-number">466</span><br><span class="line-number">467</span><br><span class="line-number">468</span><br><span class="line-number">469</span><br><span class="line-number">470</span><br><span class="line-number">471</span><br><span class="line-number">472</span><br><span class="line-number">473</span><br><span class="line-number">474</span><br><span class="line-number">475</span><br><span class="line-number">476</span><br><span class="line-number">477</span><br><span class="line-number">478</span><br><span class="line-number">479</span><br><span class="line-number">480</span><br><span class="line-number">481</span><br><span class="line-number">482</span><br><span class="line-number">483</span><br><span class="line-number">484</span><br><span class="line-number">485</span><br><span class="line-number">486</span><br><span class="line-number">487</span><br><span class="line-number">488</span><br><span class="line-number">489</span><br><span class="line-number">490</span><br><span class="line-number">491</span><br><span class="line-number">492</span><br><span class="line-number">493</span><br><span class="line-number">494</span><br><span class="line-number">495</span><br><span class="line-number">496</span><br><span class="line-number">497</span><br><span class="line-number">498</span><br><span class="line-number">499</span><br><span class="line-number">500</span><br><span class="line-number">501</span><br><span class="line-number">502</span><br><span class="line-number">503</span><br><span class="line-number">504</span><br><span class="line-number">505</span><br><span class="line-number">506</span><br><span class="line-number">507</span><br><span class="line-number">508</span><br><span class="line-number">509</span><br><span class="line-number">510</span><br><span class="line-number">511</span><br><span class="line-number">512</span><br><span class="line-number">513</span><br><span class="line-number">514</span><br><span class="line-number">515</span><br><span class="line-number">516</span><br><span class="line-number">517</span><br><span class="line-number">518</span><br><span class="line-number">519</span><br><span class="line-number">520</span><br><span class="line-number">521</span><br><span class="line-number">522</span><br><span class="line-number">523</span><br><span class="line-number">524</span><br><span class="line-number">525</span><br><span class="line-number">526</span><br><span class="line-number">527</span><br><span class="line-number">528</span><br><span class="line-number">529</span><br><span class="line-number">530</span><br><span class="line-number">531</span><br><span class="line-number">532</span><br><span class="line-number">533</span><br><span class="line-number">534</span><br><span class="line-number">535</span><br><span class="line-number">536</span><br><span class="line-number">537</span><br><span class="line-number">538</span><br><span class="line-number">539</span><br><span class="line-number">540</span><br><span class="line-number">541</span><br><span class="line-number">542</span><br><span class="line-number">543</span><br><span class="line-number">544</span><br><span class="line-number">545</span><br><span class="line-number">546</span><br><span class="line-number">547</span><br><span class="line-number">548</span><br><span class="line-number">549</span><br><span class="line-number">550</span><br><span class="line-number">551</span><br><span class="line-number">552</span><br><span class="line-number">553</span><br><span class="line-number">554</span><br><span class="line-number">555</span><br><span class="line-number">556</span><br><span class="line-number">557</span><br><span class="line-number">558</span><br><span class="line-number">559</span><br><span class="line-number">560</span><br><span class="line-number">561</span><br><span class="line-number">562</span><br><span class="line-number">563</span><br><span class="line-number">564</span><br><span class="line-number">565</span><br><span class="line-number">566</span><br><span class="line-number">567</span><br><span class="line-number">568</span><br><span class="line-number">569</span><br><span class="line-number">570</span><br><span class="line-number">571</span><br><span class="line-number">572</span><br><span class="line-number">573</span><br><span class="line-number">574</span><br><span class="line-number">575</span><br><span class="line-number">576</span><br><span class="line-number">577</span><br><span class="line-number">578</span><br><span class="line-number">579</span><br><span class="line-number">580</span><br><span class="line-number">581</span><br><span class="line-number">582</span><br><span class="line-number">583</span><br><span class="line-number">584</span><br><span class="line-number">585</span><br><span class="line-number">586</span><br><span class="line-number">587</span><br><span class="line-number">588</span><br><span class="line-number">589</span><br><span class="line-number">590</span><br><span class="line-number">591</span><br><span class="line-number">592</span><br><span class="line-number">593</span><br><span class="line-number">594</span><br><span class="line-number">595</span><br><span class="line-number">596</span><br><span class="line-number">597</span><br><span class="line-number">598</span><br><span class="line-number">599</span><br><span class="line-number">600</span><br><span class="line-number">601</span><br><span class="line-number">602</span><br><span class="line-number">603</span><br><span class="line-number">604</span><br><span class="line-number">605</span><br><span class="line-number">606</span><br><span class="line-number">607</span><br><span class="line-number">608</span><br><span class="line-number">609</span><br><span class="line-number">610</span><br><span class="line-number">611</span><br><span class="line-number">612</span><br><span class="line-number">613</span><br><span class="line-number">614</span><br><span class="line-number">615</span><br><span class="line-number">616</span><br><span class="line-number">617</span><br><span class="line-number">618</span><br><span class="line-number">619</span><br><span class="line-number">620</span><br><span class="line-number">621</span><br><span class="line-number">622</span><br><span class="line-number">623</span><br><span class="line-number">624</span><br><span class="line-number">625</span><br><span class="line-number">626</span><br><span class="line-number">627</span><br><span class="line-number">628</span><br><span class="line-number">629</span><br><span class="line-number">630</span><br><span class="line-number">631</span><br><span class="line-number">632</span><br><span class="line-number">633</span><br><span class="line-number">634</span><br><span class="line-number">635</span><br><span class="line-number">636</span><br><span class="line-number">637</span><br><span class="line-number">638</span><br><span class="line-number">639</span><br><span class="line-number">640</span><br><span class="line-number">641</span><br><span class="line-number">642</span><br><span class="line-number">643</span><br><span class="line-number">644</span><br><span class="line-number">645</span><br><span class="line-number">646</span><br><span class="line-number">647</span><br><span class="line-number">648</span><br><span class="line-number">649</span><br><span class="line-number">650</span><br><span class="line-number">651</span><br><span class="line-number">652</span><br><span class="line-number">653</span><br><span class="line-number">654</span><br><span class="line-number">655</span><br><span class="line-number">656</span><br><span class="line-number">657</span><br><span class="line-number">658</span><br><span class="line-number">659</span><br><span class="line-number">660</span><br><span class="line-number">661</span><br><span class="line-number">662</span><br><span class="line-number">663</span><br><span class="line-number">664</span><br><span class="line-number">665</span><br><span class="line-number">666</span><br><span class="line-number">667</span><br><span class="line-number">668</span><br><span class="line-number">669</span><br><span class="line-number">670</span><br><span class="line-number">671</span><br><span class="line-number">672</span><br><span class="line-number">673</span><br><span class="line-number">674</span><br><span class="line-number">675</span><br><span class="line-number">676</span><br><span class="line-number">677</span><br><span class="line-number">678</span><br><span class="line-number">679</span><br><span class="line-number">680</span><br><span class="line-number">681</span><br><span class="line-number">682</span><br><span class="line-number">683</span><br><span class="line-number">684</span><br><span class="line-number">685</span><br><span class="line-number">686</span><br><span class="line-number">687</span><br><span class="line-number">688</span><br><span class="line-number">689</span><br><span class="line-number">690</span><br><span class="line-number">691</span><br><span class="line-number">692</span><br><span class="line-number">693</span><br><span class="line-number">694</span><br><span class="line-number">695</span><br><span class="line-number">696</span><br><span class="line-number">697</span><br><span class="line-number">698</span><br><span class="line-number">699</span><br><span class="line-number">700</span><br><span class="line-number">701</span><br><span class="line-number">702</span><br><span class="line-number">703</span><br><span class="line-number">704</span><br><span class="line-number">705</span><br><span class="line-number">706</span><br><span class="line-number">707</span><br><span class="line-number">708</span><br><span class="line-number">709</span><br><span class="line-number">710</span><br><span class="line-number">711</span><br><span class="line-number">712</span><br><span class="line-number">713</span><br><span class="line-number">714</span><br><span class="line-number">715</span><br><span class="line-number">716</span><br><span class="line-number">717</span><br><span class="line-number">718</span><br><span class="line-number">719</span><br><span class="line-number">720</span><br><span class="line-number">721</span><br><span class="line-number">722</span><br><span class="line-number">723</span><br><span class="line-number">724</span><br><span class="line-number">725</span><br><span class="line-number">726</span><br><span class="line-number">727</span><br><span class="line-number">728</span><br><span class="line-number">729</span><br><span class="line-number">730</span><br><span class="line-number">731</span><br><span class="line-number">732</span><br><span class="line-number">733</span><br><span class="line-number">734</span><br><span class="line-number">735</span><br><span class="line-number">736</span><br><span class="line-number">737</span><br><span class="line-number">738</span><br><span class="line-number">739</span><br><span class="line-number">740</span><br><span class="line-number">741</span><br><span class="line-number">742</span><br><span class="line-number">743</span><br><span class="line-number">744</span><br><span class="line-number">745</span><br><span class="line-number">746</span><br><span class="line-number">747</span><br><span class="line-number">748</span><br><span class="line-number">749</span><br><span class="line-number">750</span><br><span class="line-number">751</span><br><span class="line-number">752</span><br><span class="line-number">753</span><br><span class="line-number">754</span><br><span class="line-number">755</span><br><span class="line-number">756</span><br><span class="line-number">757</span><br><span class="line-number">758</span><br><span class="line-number">759</span><br><span class="line-number">760</span><br><span class="line-number">761</span><br><span class="line-number">762</span><br><span class="line-number">763</span><br><span class="line-number">764</span><br><span class="line-number">765</span><br><span class="line-number">766</span><br><span class="line-number">767</span><br><span class="line-number">768</span><br><span class="line-number">769</span><br><span class="line-number">770</span><br><span class="line-number">771</span><br><span class="line-number">772</span><br><span class="line-number">773</span><br><span class="line-number">774</span><br><span class="line-number">775</span><br><span class="line-number">776</span><br><span class="line-number">777</span><br><span class="line-number">778</span><br><span class="line-number">779</span><br><span class="line-number">780</span><br><span class="line-number">781</span><br><span class="line-number">782</span><br><span class="line-number">783</span><br><span class="line-number">784</span><br><span class="line-number">785</span><br><span class="line-number">786</span><br><span class="line-number">787</span><br><span class="line-number">788</span><br><span class="line-number">789</span><br><span class="line-number">790</span><br><span class="line-number">791</span><br><span class="line-number">792</span><br><span class="line-number">793</span><br><span class="line-number">794</span><br><span class="line-number">795</span><br><span class="line-number">796</span><br><span class="line-number">797</span><br><span class="line-number">798</span><br><span class="line-number">799</span><br><span class="line-number">800</span><br><span class="line-number">801</span><br><span class="line-number">802</span><br><span class="line-number">803</span><br><span class="line-number">804</span><br><span class="line-number">805</span><br><span class="line-number">806</span><br><span class="line-number">807</span><br><span class="line-number">808</span><br><span class="line-number">809</span><br><span class="line-number">810</span><br><span class="line-number">811</span><br><span class="line-number">812</span><br><span class="line-number">813</span><br><span class="line-number">814</span><br><span class="line-number">815</span><br><span class="line-number">816</span><br><span class="line-number">817</span><br><span class="line-number">818</span><br><span class="line-number">819</span><br><span class="line-number">820</span><br><span class="line-number">821</span><br><span class="line-number">822</span><br><span class="line-number">823</span><br><span class="line-number">824</span><br><span class="line-number">825</span><br><span class="line-number">826</span><br><span class="line-number">827</span><br><span class="line-number">828</span><br><span class="line-number">829</span><br><span class="line-number">830</span><br><span class="line-number">831</span><br><span class="line-number">832</span><br><span class="line-number">833</span><br><span class="line-number">834</span><br><span class="line-number">835</span><br><span class="line-number">836</span><br><span class="line-number">837</span><br><span class="line-number">838</span><br><span class="line-number">839</span><br><span class="line-number">840</span><br><span class="line-number">841</span><br><span class="line-number">842</span><br><span class="line-number">843</span><br><span class="line-number">844</span><br><span class="line-number">845</span><br><span class="line-number">846</span><br><span class="line-number">847</span><br><span class="line-number">848</span><br><span class="line-number">849</span><br><span class="line-number">850</span><br><span class="line-number">851</span><br><span class="line-number">852</span><br><span class="line-number">853</span><br><span class="line-number">854</span><br><span class="line-number">855</span><br><span class="line-number">856</span><br><span class="line-number">857</span><br><span class="line-number">858</span><br><span class="line-number">859</span><br><span class="line-number">860</span><br><span class="line-number">861</span><br><span class="line-number">862</span><br><span class="line-number">863</span><br><span class="line-number">864</span><br><span class="line-number">865</span><br><span class="line-number">866</span><br><span class="line-number">867</span><br><span class="line-number">868</span><br><span class="line-number">869</span><br><span class="line-number">870</span><br><span class="line-number">871</span><br><span class="line-number">872</span><br><span class="line-number">873</span><br><span class="line-number">874</span><br><span class="line-number">875</span><br><span class="line-number">876</span><br><span class="line-number">877</span><br><span class="line-number">878</span><br><span class="line-number">879</span><br><span class="line-number">880</span><br><span class="line-number">881</span><br><span class="line-number">882</span><br><span class="line-number">883</span><br><span class="line-number">884</span><br><span class="line-number">885</span><br><span class="line-number">886</span><br><span class="line-number">887</span><br><span class="line-number">888</span><br><span class="line-number">889</span><br><span class="line-number">890</span><br><span class="line-number">891</span><br><span class="line-number">892</span><br><span class="line-number">893</span><br><span class="line-number">894</span><br><span class="line-number">895</span><br><span class="line-number">896</span><br><span class="line-number">897</span><br><span class="line-number">898</span><br><span class="line-number">899</span><br><span class="line-number">900</span><br><span class="line-number">901</span><br><span class="line-number">902</span><br><span class="line-number">903</span><br><span class="line-number">904</span><br><span class="line-number">905</span><br><span class="line-number">906</span><br><span class="line-number">907</span><br><span class="line-number">908</span><br><span class="line-number">909</span><br><span class="line-number">910</span><br><span class="line-number">911</span><br><span class="line-number">912</span><br><span class="line-number">913</span><br><span class="line-number">914</span><br><span class="line-number">915</span><br><span class="line-number">916</span><br><span class="line-number">917</span><br><span class="line-number">918</span><br><span class="line-number">919</span><br><span class="line-number">920</span><br><span class="line-number">921</span><br><span class="line-number">922</span><br><span class="line-number">923</span><br><span class="line-number">924</span><br><span class="line-number">925</span><br><span class="line-number">926</span><br><span class="line-number">927</span><br><span class="line-number">928</span><br><span class="line-number">929</span><br><span class="line-number">930</span><br><span class="line-number">931</span><br><span class="line-number">932</span><br><span class="line-number">933</span><br><span class="line-number">934</span><br><span class="line-number">935</span><br><span class="line-number">936</span><br><span class="line-number">937</span><br><span class="line-number">938</span><br><span class="line-number">939</span><br><span class="line-number">940</span><br><span class="line-number">941</span><br><span class="line-number">942</span><br><span class="line-number">943</span><br><span class="line-number">944</span><br><span class="line-number">945</span><br><span class="line-number">946</span><br><span class="line-number">947</span><br><span class="line-number">948</span><br><span class="line-number">949</span><br><span class="line-number">950</span><br><span class="line-number">951</span><br><span class="line-number">952</span><br><span class="line-number">953</span><br><span class="line-number">954</span><br><span class="line-number">955</span><br><span class="line-number">956</span><br><span class="line-number">957</span><br><span class="line-number">958</span><br><span class="line-number">959</span><br><span class="line-number">960</span><br><span class="line-number">961</span><br><span class="line-number">962</span><br><span class="line-number">963</span><br><span class="line-number">964</span><br><span class="line-number">965</span><br><span class="line-number">966</span><br><span class="line-number">967</span><br><span class="line-number">968</span><br><span class="line-number">969</span><br><span class="line-number">970</span><br><span class="line-number">971</span><br><span class="line-number">972</span><br><span class="line-number">973</span><br><span class="line-number">974</span><br><span class="line-number">975</span><br><span class="line-number">976</span><br><span class="line-number">977</span><br><span class="line-number">978</span><br><span class="line-number">979</span><br><span class="line-number">980</span><br><span class="line-number">981</span><br><span class="line-number">982</span><br><span class="line-number">983</span><br><span class="line-number">984</span><br><span class="line-number">985</span><br><span class="line-number">986</span><br><span class="line-number">987</span><br><span class="line-number">988</span><br><span class="line-number">989</span><br><span class="line-number">990</span><br><span class="line-number">991</span><br><span class="line-number">992</span><br><span class="line-number">993</span><br><span class="line-number">994</span><br><span class="line-number">995</span><br><span class="line-number">996</span><br><span class="line-number">997</span><br><span class="line-number">998</span><br><span class="line-number">999</span><br><span class="line-number">1000</span><br><span class="line-number">1001</span><br><span class="line-number">1002</span><br><span class="line-number">1003</span><br><span class="line-number">1004</span><br><span class="line-number">1005</span><br><span class="line-number">1006</span><br><span class="line-number">1007</span><br><span class="line-number">1008</span><br><span class="line-number">1009</span><br><span class="line-number">1010</span><br><span class="line-number">1011</span><br><span class="line-number">1012</span><br><span class="line-number">1013</span><br><span class="line-number">1014</span><br><span class="line-number">1015</span><br><span class="line-number">1016</span><br><span class="line-number">1017</span><br><span class="line-number">1018</span><br><span class="line-number">1019</span><br><span class="line-number">1020</span><br><span class="line-number">1021</span><br><span class="line-number">1022</span><br><span class="line-number">1023</span><br><span class="line-number">1024</span><br><span class="line-number">1025</span><br><span class="line-number">1026</span><br><span class="line-number">1027</span><br><span class="line-number">1028</span><br><span class="line-number">1029</span><br><span class="line-number">1030</span><br><span class="line-number">1031</span><br><span class="line-number">1032</span><br><span class="line-number">1033</span><br><span class="line-number">1034</span><br><span class="line-number">1035</span><br><span class="line-number">1036</span><br><span class="line-number">1037</span><br><span class="line-number">1038</span><br><span class="line-number">1039</span><br><span class="line-number">1040</span><br><span class="line-number">1041</span><br><span class="line-number">1042</span><br><span class="line-number">1043</span><br><span class="line-number">1044</span><br><span class="line-number">1045</span><br><span class="line-number">1046</span><br><span class="line-number">1047</span><br><span class="line-number">1048</span><br><span class="line-number">1049</span><br><span class="line-number">1050</span><br><span class="line-number">1051</span><br><span class="line-number">1052</span><br><span class="line-number">1053</span><br><span class="line-number">1054</span><br><span class="line-number">1055</span><br><span class="line-number">1056</span><br><span class="line-number">1057</span><br><span class="line-number">1058</span><br><span class="line-number">1059</span><br><span class="line-number">1060</span><br><span class="line-number">1061</span><br><span class="line-number">1062</span><br><span class="line-number">1063</span><br><span class="line-number">1064</span><br><span class="line-number">1065</span><br><span class="line-number">1066</span><br><span class="line-number">1067</span><br><span class="line-number">1068</span><br><span class="line-number">1069</span><br><span class="line-number">1070</span><br><span class="line-number">1071</span><br><span class="line-number">1072</span><br><span class="line-number">1073</span><br><span class="line-number">1074</span><br><span class="line-number">1075</span><br><span class="line-number">1076</span><br><span class="line-number">1077</span><br><span class="line-number">1078</span><br><span class="line-number">1079</span><br><span class="line-number">1080</span><br><span class="line-number">1081</span><br><span class="line-number">1082</span><br><span class="line-number">1083</span><br><span class="line-number">1084</span><br><span class="line-number">1085</span><br><span class="line-number">1086</span><br><span class="line-number">1087</span><br><span class="line-number">1088</span><br><span class="line-number">1089</span><br><span class="line-number">1090</span><br><span class="line-number">1091</span><br><span class="line-number">1092</span><br><span class="line-number">1093</span><br><span class="line-number">1094</span><br><span class="line-number">1095</span><br><span class="line-number">1096</span><br><span class="line-number">1097</span><br><span class="line-number">1098</span><br><span class="line-number">1099</span><br><span class="line-number">1100</span><br><span class="line-number">1101</span><br><span class="line-number">1102</span><br><span class="line-number">1103</span><br><span class="line-number">1104</span><br><span class="line-number">1105</span><br><span class="line-number">1106</span><br><span class="line-number">1107</span><br><span class="line-number">1108</span><br><span class="line-number">1109</span><br><span class="line-number">1110</span><br><span class="line-number">1111</span><br><span class="line-number">1112</span><br><span class="line-number">1113</span><br><span class="line-number">1114</span><br><span class="line-number">1115</span><br><span class="line-number">1116</span><br><span class="line-number">1117</span><br><span class="line-number">1118</span><br><span class="line-number">1119</span><br><span class="line-number">1120</span><br><span class="line-number">1121</span><br><span class="line-number">1122</span><br><span class="line-number">1123</span><br><span class="line-number">1124</span><br><span class="line-number">1125</span><br><span class="line-number">1126</span><br><span class="line-number">1127</span><br><span class="line-number">1128</span><br><span class="line-number">1129</span><br><span class="line-number">1130</span><br><span class="line-number">1131</span><br><span class="line-number">1132</span><br><span class="line-number">1133</span><br><span class="line-number">1134</span><br><span class="line-number">1135</span><br><span class="line-number">1136</span><br><span class="line-number">1137</span><br><span class="line-number">1138</span><br><span class="line-number">1139</span><br><span class="line-number">1140</span><br><span class="line-number">1141</span><br><span class="line-number">1142</span><br><span class="line-number">1143</span><br><span class="line-number">1144</span><br><span class="line-number">1145</span><br><span class="line-number">1146</span><br><span class="line-number">1147</span><br><span class="line-number">1148</span><br><span class="line-number">1149</span><br><span class="line-number">1150</span><br><span class="line-number">1151</span><br><span class="line-number">1152</span><br><span class="line-number">1153</span><br><span class="line-number">1154</span><br><span class="line-number">1155</span><br><span class="line-number">1156</span><br><span class="line-number">1157</span><br><span class="line-number">1158</span><br><span class="line-number">1159</span><br><span class="line-number">1160</span><br><span class="line-number">1161</span><br><span class="line-number">1162</span><br><span class="line-number">1163</span><br><span class="line-number">1164</span><br><span class="line-number">1165</span><br><span class="line-number">1166</span><br><span class="line-number">1167</span><br><span class="line-number">1168</span><br><span class="line-number">1169</span><br><span class="line-number">1170</span><br><span class="line-number">1171</span><br><span class="line-number">1172</span><br><span class="line-number">1173</span><br><span class="line-number">1174</span><br><span class="line-number">1175</span><br><span class="line-number">1176</span><br><span class="line-number">1177</span><br><span class="line-number">1178</span><br><span class="line-number">1179</span><br><span class="line-number">1180</span><br><span class="line-number">1181</span><br><span class="line-number">1182</span><br><span class="line-number">1183</span><br><span class="line-number">1184</span><br><span class="line-number">1185</span><br><span class="line-number">1186</span><br><span class="line-number">1187</span><br><span class="line-number">1188</span><br><span class="line-number">1189</span><br><span class="line-number">1190</span><br><span class="line-number">1191</span><br><span class="line-number">1192</span><br><span class="line-number">1193</span><br><span class="line-number">1194</span><br><span class="line-number">1195</span><br><span class="line-number">1196</span><br><span class="line-number">1197</span><br><span class="line-number">1198</span><br><span class="line-number">1199</span><br><span class="line-number">1200</span><br><span class="line-number">1201</span><br><span class="line-number">1202</span><br><span class="line-number">1203</span><br><span class="line-number">1204</span><br><span class="line-number">1205</span><br><span class="line-number">1206</span><br><span class="line-number">1207</span><br><span class="line-number">1208</span><br><span class="line-number">1209</span><br><span class="line-number">1210</span><br><span class="line-number">1211</span><br><span class="line-number">1212</span><br><span class="line-number">1213</span><br><span class="line-number">1214</span><br><span class="line-number">1215</span><br><span class="line-number">1216</span><br><span class="line-number">1217</span><br><span class="line-number">1218</span><br><span class="line-number">1219</span><br><span class="line-number">1220</span><br><span class="line-number">1221</span><br><span class="line-number">1222</span><br><span class="line-number">1223</span><br><span class="line-number">1224</span><br><span class="line-number">1225</span><br><span class="line-number">1226</span><br><span class="line-number">1227</span><br><span class="line-number">1228</span><br><span class="line-number">1229</span><br><span class="line-number">1230</span><br><span class="line-number">1231</span><br><span class="line-number">1232</span><br><span class="line-number">1233</span><br><span class="line-number">1234</span><br><span class="line-number">1235</span><br><span class="line-number">1236</span><br><span class="line-number">1237</span><br><span class="line-number">1238</span><br><span class="line-number">1239</span><br><span class="line-number">1240</span><br><span class="line-number">1241</span><br><span class="line-number">1242</span><br><span class="line-number">1243</span><br><span class="line-number">1244</span><br><span class="line-number">1245</span><br><span class="line-number">1246</span><br><span class="line-number">1247</span><br><span class="line-number">1248</span><br><span class="line-number">1249</span><br><span class="line-number">1250</span><br><span class="line-number">1251</span><br><span class="line-number">1252</span><br><span class="line-number">1253</span><br><span class="line-number">1254</span><br><span class="line-number">1255</span><br><span class="line-number">1256</span><br><span class="line-number">1257</span><br><span class="line-number">1258</span><br><span class="line-number">1259</span><br><span class="line-number">1260</span><br><span class="line-number">1261</span><br><span class="line-number">1262</span><br><span class="line-number">1263</span><br><span class="line-number">1264</span><br><span class="line-number">1265</span><br><span class="line-number">1266</span><br><span class="line-number">1267</span><br><span class="line-number">1268</span><br><span class="line-number">1269</span><br><span class="line-number">1270</span><br><span class="line-number">1271</span><br><span class="line-number">1272</span><br><span class="line-number">1273</span><br><span class="line-number">1274</span><br><span class="line-number">1275</span><br><span class="line-number">1276</span><br><span class="line-number">1277</span><br><span class="line-number">1278</span><br><span class="line-number">1279</span><br><span class="line-number">1280</span><br><span class="line-number">1281</span><br><span class="line-number">1282</span><br><span class="line-number">1283</span><br><span class="line-number">1284</span><br><span class="line-number">1285</span><br><span class="line-number">1286</span><br><span class="line-number">1287</span><br><span class="line-number">1288</span><br><span class="line-number">1289</span><br><span class="line-number">1290</span><br><span class="line-number">1291</span><br><span class="line-number">1292</span><br><span class="line-number">1293</span><br><span class="line-number">1294</span><br><span class="line-number">1295</span><br><span class="line-number">1296</span><br><span class="line-number">1297</span><br><span class="line-number">1298</span><br><span class="line-number">1299</span><br><span class="line-number">1300</span><br><span class="line-number">1301</span><br><span class="line-number">1302</span><br><span class="line-number">1303</span><br><span class="line-number">1304</span><br><span class="line-number">1305</span><br><span class="line-number">1306</span><br><span class="line-number">1307</span><br><span class="line-number">1308</span><br><span class="line-number">1309</span><br><span class="line-number">1310</span><br><span class="line-number">1311</span><br><span class="line-number">1312</span><br><span class="line-number">1313</span><br><span class="line-number">1314</span><br><span class="line-number">1315</span><br><span class="line-number">1316</span><br><span class="line-number">1317</span><br><span class="line-number">1318</span><br><span class="line-number">1319</span><br><span class="line-number">1320</span><br><span class="line-number">1321</span><br><span class="line-number">1322</span><br><span class="line-number">1323</span><br><span class="line-number">1324</span><br><span class="line-number">1325</span><br><span class="line-number">1326</span><br><span class="line-number">1327</span><br><span class="line-number">1328</span><br><span class="line-number">1329</span><br><span class="line-number">1330</span><br><span class="line-number">1331</span><br><span class="line-number">1332</span><br><span class="line-number">1333</span><br><span class="line-number">1334</span><br><span class="line-number">1335</span><br><span class="line-number">1336</span><br><span class="line-number">1337</span><br><span class="line-number">1338</span><br><span class="line-number">1339</span><br><span class="line-number">1340</span><br><span class="line-number">1341</span><br><span class="line-number">1342</span><br><span class="line-number">1343</span><br><span class="line-number">1344</span><br><span class="line-number">1345</span><br><span class="line-number">1346</span><br><span class="line-number">1347</span><br><span class="line-number">1348</span><br><span class="line-number">1349</span><br><span class="line-number">1350</span><br><span class="line-number">1351</span><br><span class="line-number">1352</span><br><span class="line-number">1353</span><br><span class="line-number">1354</span><br><span class="line-number">1355</span><br><span class="line-number">1356</span><br><span class="line-number">1357</span><br><span class="line-number">1358</span><br><span class="line-number">1359</span><br><span class="line-number">1360</span><br><span class="line-number">1361</span><br><span class="line-number">1362</span><br><span class="line-number">1363</span><br><span class="line-number">1364</span><br><span class="line-number">1365</span><br><span class="line-number">1366</span><br><span class="line-number">1367</span><br><span class="line-number">1368</span><br><span class="line-number">1369</span><br><span class="line-number">1370</span><br><span class="line-number">1371</span><br><span class="line-number">1372</span><br><span class="line-number">1373</span><br><span class="line-number">1374</span><br><span class="line-number">1375</span><br><span class="line-number">1376</span><br><span class="line-number">1377</span><br><span class="line-number">1378</span><br><span class="line-number">1379</span><br><span class="line-number">1380</span><br><span class="line-number">1381</span><br><span class="line-number">1382</span><br><span class="line-number">1383</span><br><span class="line-number">1384</span><br><span class="line-number">1385</span><br><span class="line-number">1386</span><br><span class="line-number">1387</span><br><span class="line-number">1388</span><br><span class="line-number">1389</span><br><span class="line-number">1390</span><br><span class="line-number">1391</span><br><span class="line-number">1392</span><br><span class="line-number">1393</span><br><span class="line-number">1394</span><br><span class="line-number">1395</span><br><span class="line-number">1396</span><br><span class="line-number">1397</span><br><span class="line-number">1398</span><br><span class="line-number">1399</span><br><span class="line-number">1400</span><br><span class="line-number">1401</span><br><span class="line-number">1402</span><br><span class="line-number">1403</span><br><span class="line-number">1404</span><br><span class="line-number">1405</span><br><span class="line-number">1406</span><br><span class="line-number">1407</span><br><span class="line-number">1408</span><br><span class="line-number">1409</span><br><span class="line-number">1410</span><br><span class="line-number">1411</span><br><span class="line-number">1412</span><br><span class="line-number">1413</span><br><span class="line-number">1414</span><br><span class="line-number">1415</span><br><span class="line-number">1416</span><br><span class="line-number">1417</span><br><span class="line-number">1418</span><br><span class="line-number">1419</span><br><span class="line-number">1420</span><br><span class="line-number">1421</span><br><span class="line-number">1422</span><br><span class="line-number">1423</span><br><span class="line-number">1424</span><br><span class="line-number">1425</span><br><span class="line-number">1426</span><br><span class="line-number">1427</span><br><span class="line-number">1428</span><br><span class="line-number">1429</span><br><span class="line-number">1430</span><br><span class="line-number">1431</span><br><span class="line-number">1432</span><br><span class="line-number">1433</span><br><span class="line-number">1434</span><br><span class="line-number">1435</span><br><span class="line-number">1436</span><br><span class="line-number">1437</span><br><span class="line-number">1438</span><br><span class="line-number">1439</span><br><span class="line-number">1440</span><br><span class="line-number">1441</span><br><span class="line-number">1442</span><br><span class="line-number">1443</span><br><span class="line-number">1444</span><br><span class="line-number">1445</span><br><span class="line-number">1446</span><br><span class="line-number">1447</span><br><span class="line-number">1448</span><br><span class="line-number">1449</span><br><span class="line-number">1450</span><br><span class="line-number">1451</span><br><span class="line-number">1452</span><br><span class="line-number">1453</span><br><span class="line-number">1454</span><br><span class="line-number">1455</span><br><span class="line-number">1456</span><br><span class="line-number">1457</span><br><span class="line-number">1458</span><br><span class="line-number">1459</span><br><span class="line-number">1460</span><br><span class="line-number">1461</span><br><span class="line-number">1462</span><br><span class="line-number">1463</span><br><span class="line-number">1464</span><br><span class="line-number">1465</span><br><span class="line-number">1466</span><br><span class="line-number">1467</span><br><span class="line-number">1468</span><br><span class="line-number">1469</span><br><span class="line-number">1470</span><br><span class="line-number">1471</span><br><span class="line-number">1472</span><br><span class="line-number">1473</span><br><span class="line-number">1474</span><br><span class="line-number">1475</span><br><span class="line-number">1476</span><br><span class="line-number">1477</span><br><span class="line-number">1478</span><br><span class="line-number">1479</span><br><span class="line-number">1480</span><br><span class="line-number">1481</span><br><span class="line-number">1482</span><br><span class="line-number">1483</span><br><span class="line-number">1484</span><br><span class="line-number">1485</span><br><span class="line-number">1486</span><br><span class="line-number">1487</span><br><span class="line-number">1488</span><br><span class="line-number">1489</span><br><span class="line-number">1490</span><br><span class="line-number">1491</span><br><span class="line-number">1492</span><br><span class="line-number">1493</span><br><span class="line-number">1494</span><br><span class="line-number">1495</span><br><span class="line-number">1496</span><br><span class="line-number">1497</span><br><span class="line-number">1498</span><br><span class="line-number">1499</span><br><span class="line-number">1500</span><br><span class="line-number">1501</span><br><span class="line-number">1502</span><br><span class="line-number">1503</span><br><span class="line-number">1504</span><br><span class="line-number">1505</span><br><span class="line-number">1506</span><br><span class="line-number">1507</span><br><span class="line-number">1508</span><br><span class="line-number">1509</span><br><span class="line-number">1510</span><br><span class="line-number">1511</span><br><span class="line-number">1512</span><br><span class="line-number">1513</span><br><span class="line-number">1514</span><br><span class="line-number">1515</span><br><span class="line-number">1516</span><br><span class="line-number">1517</span><br><span class="line-number">1518</span><br><span class="line-number">1519</span><br><span class="line-number">1520</span><br><span class="line-number">1521</span><br><span class="line-number">1522</span><br><span class="line-number">1523</span><br><span class="line-number">1524</span><br><span class="line-number">1525</span><br><span class="line-number">1526</span><br><span class="line-number">1527</span><br><span class="line-number">1528</span><br><span class="line-number">1529</span><br><span class="line-number">1530</span><br><span class="line-number">1531</span><br><span class="line-number">1532</span><br><span class="line-number">1533</span><br><span class="line-number">1534</span><br><span class="line-number">1535</span><br><span class="line-number">1536</span><br><span class="line-number">1537</span><br><span class="line-number">1538</span><br><span class="line-number">1539</span><br><span class="line-number">1540</span><br><span class="line-number">1541</span><br><span class="line-number">1542</span><br><span class="line-number">1543</span><br><span class="line-number">1544</span><br><span class="line-number">1545</span><br><span class="line-number">1546</span><br><span class="line-number">1547</span><br><span class="line-number">1548</span><br><span class="line-number">1549</span><br><span class="line-number">1550</span><br><span class="line-number">1551</span><br><span class="line-number">1552</span><br><span class="line-number">1553</span><br><span class="line-number">1554</span><br><span class="line-number">1555</span><br><span class="line-number">1556</span><br><span class="line-number">1557</span><br><span class="line-number">1558</span><br><span class="line-number">1559</span><br><span class="line-number">1560</span><br><span class="line-number">1561</span><br><span class="line-number">1562</span><br><span class="line-number">1563</span><br><span class="line-number">1564</span><br><span class="line-number">1565</span><br><span class="line-number">1566</span><br><span class="line-number">1567</span><br><span class="line-number">1568</span><br><span class="line-number">1569</span><br><span class="line-number">1570</span><br><span class="line-number">1571</span><br><span class="line-number">1572</span><br><span class="line-number">1573</span><br><span class="line-number">1574</span><br><span class="line-number">1575</span><br><span class="line-number">1576</span><br><span class="line-number">1577</span><br><span class="line-number">1578</span><br><span class="line-number">1579</span><br><span class="line-number">1580</span><br><span class="line-number">1581</span><br><span class="line-number">1582</span><br><span class="line-number">1583</span><br><span class="line-number">1584</span><br><span class="line-number">1585</span><br><span class="line-number">1586</span><br><span class="line-number">1587</span><br><span class="line-number">1588</span><br><span class="line-number">1589</span><br><span class="line-number">1590</span><br><span class="line-number">1591</span><br><span class="line-number">1592</span><br><span class="line-number">1593</span><br><span class="line-number">1594</span><br><span class="line-number">1595</span><br><span class="line-number">1596</span><br><span class="line-number">1597</span><br><span class="line-number">1598</span><br><span class="line-number">1599</span><br><span class="line-number">1600</span><br><span class="line-number">1601</span><br><span class="line-number">1602</span><br><span class="line-number">1603</span><br><span class="line-number">1604</span><br><span class="line-number">1605</span><br><span class="line-number">1606</span><br><span class="line-number">1607</span><br><span class="line-number">1608</span><br><span class="line-number">1609</span><br><span class="line-number">1610</span><br><span class="line-number">1611</span><br><span class="line-number">1612</span><br><span class="line-number">1613</span><br><span class="line-number">1614</span><br><span class="line-number">1615</span><br><span class="line-number">1616</span><br><span class="line-number">1617</span><br><span class="line-number">1618</span><br><span class="line-number">1619</span><br><span class="line-number">1620</span><br><span class="line-number">1621</span><br><span class="line-number">1622</span><br><span class="line-number">1623</span><br><span class="line-number">1624</span><br><span class="line-number">1625</span><br><span class="line-number">1626</span><br><span class="line-number">1627</span><br><span class="line-number">1628</span><br><span class="line-number">1629</span><br><span class="line-number">1630</span><br><span class="line-number">1631</span><br><span class="line-number">1632</span><br><span class="line-number">1633</span><br><span class="line-number">1634</span><br><span class="line-number">1635</span><br><span class="line-number">1636</span><br><span class="line-number">1637</span><br><span class="line-number">1638</span><br><span class="line-number">1639</span><br><span class="line-number">1640</span><br><span class="line-number">1641</span><br><span class="line-number">1642</span><br><span class="line-number">1643</span><br><span class="line-number">1644</span><br><span class="line-number">1645</span><br><span class="line-number">1646</span><br><span class="line-number">1647</span><br><span class="line-number">1648</span><br><span class="line-number">1649</span><br><span class="line-number">1650</span><br><span class="line-number">1651</span><br><span class="line-number">1652</span><br><span class="line-number">1653</span><br><span class="line-number">1654</span><br><span class="line-number">1655</span><br><span class="line-number">1656</span><br><span class="line-number">1657</span><br><span class="line-number">1658</span><br><span class="line-number">1659</span><br><span class="line-number">1660</span><br><span class="line-number">1661</span><br><span class="line-number">1662</span><br><span class="line-number">1663</span><br><span class="line-number">1664</span><br><span class="line-number">1665</span><br><span class="line-number">1666</span><br><span class="line-number">1667</span><br><span class="line-number">1668</span><br><span class="line-number">1669</span><br><span class="line-number">1670</span><br><span class="line-number">1671</span><br><span class="line-number">1672</span><br><span class="line-number">1673</span><br><span class="line-number">1674</span><br><span class="line-number">1675</span><br><span class="line-number">1676</span><br><span class="line-number">1677</span><br><span class="line-number">1678</span><br><span class="line-number">1679</span><br><span class="line-number">1680</span><br><span class="line-number">1681</span><br><span class="line-number">1682</span><br><span class="line-number">1683</span><br><span class="line-number">1684</span><br><span class="line-number">1685</span><br><span class="line-number">1686</span><br><span class="line-number">1687</span><br><span class="line-number">1688</span><br><span class="line-number">1689</span><br><span class="line-number">1690</span><br><span class="line-number">1691</span><br><span class="line-number">1692</span><br><span class="line-number">1693</span><br><span class="line-number">1694</span><br><span class="line-number">1695</span><br><span class="line-number">1696</span><br><span class="line-number">1697</span><br><span class="line-number">1698</span><br><span class="line-number">1699</span><br><span class="line-number">1700</span><br><span class="line-number">1701</span><br><span class="line-number">1702</span><br><span class="line-number">1703</span><br><span class="line-number">1704</span><br><span class="line-number">1705</span><br><span class="line-number">1706</span><br><span class="line-number">1707</span><br><span class="line-number">1708</span><br><span class="line-number">1709</span><br><span class="line-number">1710</span><br><span class="line-number">1711</span><br><span class="line-number">1712</span><br><span class="line-number">1713</span><br><span class="line-number">1714</span><br><span class="line-number">1715</span><br><span class="line-number">1716</span><br><span class="line-number">1717</span><br><span class="line-number">1718</span><br><span class="line-number">1719</span><br><span class="line-number">1720</span><br><span class="line-number">1721</span><br><span class="line-number">1722</span><br><span class="line-number">1723</span><br><span class="line-number">1724</span><br><span class="line-number">1725</span><br><span class="line-number">1726</span><br><span class="line-number">1727</span><br><span class="line-number">1728</span><br><span class="line-number">1729</span><br><span class="line-number">1730</span><br><span class="line-number">1731</span><br><span class="line-number">1732</span><br><span class="line-number">1733</span><br><span class="line-number">1734</span><br><span class="line-number">1735</span><br><span class="line-number">1736</span><br><span class="line-number">1737</span><br><span class="line-number">1738</span><br><span class="line-number">1739</span><br><span class="line-number">1740</span><br><span class="line-number">1741</span><br><span class="line-number">1742</span><br><span class="line-number">1743</span><br><span class="line-number">1744</span><br><span class="line-number">1745</span><br><span class="line-number">1746</span><br><span class="line-number">1747</span><br><span class="line-number">1748</span><br><span class="line-number">1749</span><br><span class="line-number">1750</span><br><span class="line-number">1751</span><br><span class="line-number">1752</span><br><span class="line-number">1753</span><br><span class="line-number">1754</span><br><span class="line-number">1755</span><br><span class="line-number">1756</span><br><span class="line-number">1757</span><br><span class="line-number">1758</span><br><span class="line-number">1759</span><br><span class="line-number">1760</span><br><span class="line-number">1761</span><br><span class="line-number">1762</span><br><span class="line-number">1763</span><br><span class="line-number">1764</span><br><span class="line-number">1765</span><br><span class="line-number">1766</span><br><span class="line-number">1767</span><br><span class="line-number">1768</span><br><span class="line-number">1769</span><br><span class="line-number">1770</span><br><span class="line-number">1771</span><br><span class="line-number">1772</span><br><span class="line-number">1773</span><br><span class="line-number">1774</span><br><span class="line-number">1775</span><br><span class="line-number">1776</span><br><span class="line-number">1777</span><br><span class="line-number">1778</span><br><span class="line-number">1779</span><br><span class="line-number">1780</span><br><span class="line-number">1781</span><br><span class="line-number">1782</span><br><span class="line-number">1783</span><br><span class="line-number">1784</span><br><span class="line-number">1785</span><br><span class="line-number">1786</span><br><span class="line-number">1787</span><br><span class="line-number">1788</span><br><span class="line-number">1789</span><br><span class="line-number">1790</span><br><span class="line-number">1791</span><br><span class="line-number">1792</span><br><span class="line-number">1793</span><br><span class="line-number">1794</span><br><span class="line-number">1795</span><br><span class="line-number">1796</span><br><span class="line-number">1797</span><br><span class="line-number">1798</span><br><span class="line-number">1799</span><br><span class="line-number">1800</span><br><span class="line-number">1801</span><br><span class="line-number">1802</span><br><span class="line-number">1803</span><br><span class="line-number">1804</span><br><span class="line-number">1805</span><br><span class="line-number">1806</span><br><span class="line-number">1807</span><br><span class="line-number">1808</span><br><span class="line-number">1809</span><br><span class="line-number">1810</span><br><span class="line-number">1811</span><br><span class="line-number">1812</span><br><span class="line-number">1813</span><br><span class="line-number">1814</span><br><span class="line-number">1815</span><br><span class="line-number">1816</span><br><span class="line-number">1817</span><br><span class="line-number">1818</span><br><span class="line-number">1819</span><br><span class="line-number">1820</span><br><span class="line-number">1821</span><br><span class="line-number">1822</span><br><span class="line-number">1823</span><br><span class="line-number">1824</span><br><span class="line-number">1825</span><br><span class="line-number">1826</span><br><span class="line-number">1827</span><br><span class="line-number">1828</span><br><span class="line-number">1829</span><br><span class="line-number">1830</span><br><span class="line-number">1831</span><br><span class="line-number">1832</span><br><span class="line-number">1833</span><br><span class="line-number">1834</span><br><span class="line-number">1835</span><br><span class="line-number">1836</span><br><span class="line-number">1837</span><br><span class="line-number">1838</span><br><span class="line-number">1839</span><br><span class="line-number">1840</span><br><span class="line-number">1841</span><br><span class="line-number">1842</span><br><span class="line-number">1843</span><br><span class="line-number">1844</span><br><span class="line-number">1845</span><br><span class="line-number">1846</span><br><span class="line-number">1847</span><br><span class="line-number">1848</span><br><span class="line-number">1849</span><br><span class="line-number">1850</span><br><span class="line-number">1851</span><br><span class="line-number">1852</span><br><span class="line-number">1853</span><br><span class="line-number">1854</span><br><span class="line-number">1855</span><br><span class="line-number">1856</span><br><span class="line-number">1857</span><br><span class="line-number">1858</span><br><span class="line-number">1859</span><br><span class="line-number">1860</span><br><span class="line-number">1861</span><br><span class="line-number">1862</span><br><span class="line-number">1863</span><br><span class="line-number">1864</span><br><span class="line-number">1865</span><br><span class="line-number">1866</span><br><span class="line-number">1867</span><br><span class="line-number">1868</span><br><span class="line-number">1869</span><br><span class="line-number">1870</span><br><span class="line-number">1871</span><br><span class="line-number">1872</span><br><span class="line-number">1873</span><br><span class="line-number">1874</span><br><span class="line-number">1875</span><br><span class="line-number">1876</span><br><span class="line-number">1877</span><br><span class="line-number">1878</span><br><span class="line-number">1879</span><br><span class="line-number">1880</span><br><span class="line-number">1881</span><br><span class="line-number">1882</span><br><span class="line-number">1883</span><br><span class="line-number">1884</span><br><span class="line-number">1885</span><br><span class="line-number">1886</span><br><span class="line-number">1887</span><br><span class="line-number">1888</span><br><span class="line-number">1889</span><br><span class="line-number">1890</span><br><span class="line-number">1891</span><br><span class="line-number">1892</span><br><span class="line-number">1893</span><br><span class="line-number">1894</span><br><span class="line-number">1895</span><br><span class="line-number">1896</span><br><span class="line-number">1897</span><br><span class="line-number">1898</span><br><span class="line-number">1899</span><br><span class="line-number">1900</span><br><span class="line-number">1901</span><br><span class="line-number">1902</span><br><span class="line-number">1903</span><br><span class="line-number">1904</span><br><span class="line-number">1905</span><br><span class="line-number">1906</span><br><span class="line-number">1907</span><br><span class="line-number">1908</span><br><span class="line-number">1909</span><br><span class="line-number">1910</span><br><span class="line-number">1911</span><br><span class="line-number">1912</span><br><span class="line-number">1913</span><br><span class="line-number">1914</span><br><span class="line-number">1915</span><br><span class="line-number">1916</span><br><span class="line-number">1917</span><br><span class="line-number">1918</span><br><span class="line-number">1919</span><br><span class="line-number">1920</span><br><span class="line-number">1921</span><br><span class="line-number">1922</span><br><span class="line-number">1923</span><br><span class="line-number">1924</span><br><span class="line-number">1925</span><br><span class="line-number">1926</span><br><span class="line-number">1927</span><br><span class="line-number">1928</span><br><span class="line-number">1929</span><br><span class="line-number">1930</span><br><span class="line-number">1931</span><br><span class="line-number">1932</span><br><span class="line-number">1933</span><br><span class="line-number">1934</span><br><span class="line-number">1935</span><br><span class="line-number">1936</span><br><span class="line-number">1937</span><br><span class="line-number">1938</span><br><span class="line-number">1939</span><br><span class="line-number">1940</span><br><span class="line-number">1941</span><br><span class="line-number">1942</span><br><span class="line-number">1943</span><br><span class="line-number">1944</span><br><span class="line-number">1945</span><br><span class="line-number">1946</span><br><span class="line-number">1947</span><br><span class="line-number">1948</span><br><span class="line-number">1949</span><br><span class="line-number">1950</span><br><span class="line-number">1951</span><br><span class="line-number">1952</span><br><span class="line-number">1953</span><br><span class="line-number">1954</span><br><span class="line-number">1955</span><br><span class="line-number">1956</span><br><span class="line-number">1957</span><br><span class="line-number">1958</span><br><span class="line-number">1959</span><br><span class="line-number">1960</span><br><span class="line-number">1961</span><br><span class="line-number">1962</span><br><span class="line-number">1963</span><br><span class="line-number">1964</span><br><span class="line-number">1965</span><br><span class="line-number">1966</span><br><span class="line-number">1967</span><br><span class="line-number">1968</span><br><span class="line-number">1969</span><br><span class="line-number">1970</span><br><span class="line-number">1971</span><br><span class="line-number">1972</span><br><span class="line-number">1973</span><br><span class="line-number">1974</span><br><span class="line-number">1975</span><br><span class="line-number">1976</span><br><span class="line-number">1977</span><br><span class="line-number">1978</span><br><span class="line-number">1979</span><br><span class="line-number">1980</span><br><span class="line-number">1981</span><br><span class="line-number">1982</span><br><span class="line-number">1983</span><br><span class="line-number">1984</span><br><span class="line-number">1985</span><br><span class="line-number">1986</span><br><span class="line-number">1987</span><br><span class="line-number">1988</span><br><span class="line-number">1989</span><br><span class="line-number">1990</span><br><span class="line-number">1991</span><br><span class="line-number">1992</span><br><span class="line-number">1993</span><br><span class="line-number">1994</span><br><span class="line-number">1995</span><br><span class="line-number">1996</span><br><span class="line-number">1997</span><br><span class="line-number">1998</span><br><span class="line-number">1999</span><br><span class="line-number">2000</span><br><span class="line-number">2001</span><br><span class="line-number">2002</span><br><span class="line-number">2003</span><br><span class="line-number">2004</span><br><span class="line-number">2005</span><br><span class="line-number">2006</span><br><span class="line-number">2007</span><br><span class="line-number">2008</span><br><span class="line-number">2009</span><br><span class="line-number">2010</span><br><span class="line-number">2011</span><br><span class="line-number">2012</span><br><span class="line-number">2013</span><br><span class="line-number">2014</span><br><span class="line-number">2015</span><br><span class="line-number">2016</span><br><span class="line-number">2017</span><br><span class="line-number">2018</span><br><span class="line-number">2019</span><br><span class="line-number">2020</span><br><span class="line-number">2021</span><br><span class="line-number">2022</span><br><span class="line-number">2023</span><br><span class="line-number">2024</span><br><span class="line-number">2025</span><br><span class="line-number">2026</span><br><span class="line-number">2027</span><br><span class="line-number">2028</span><br><span class="line-number">2029</span><br><span class="line-number">2030</span><br><span class="line-number">2031</span><br><span class="line-number">2032</span><br><span class="line-number">2033</span><br><span class="line-number">2034</span><br><span class="line-number">2035</span><br><span class="line-number">2036</span><br><span class="line-number">2037</span><br><span class="line-number">2038</span><br><span class="line-number">2039</span><br><span class="line-number">2040</span><br><span class="line-number">2041</span><br><span class="line-number">2042</span><br><span class="line-number">2043</span><br><span class="line-number">2044</span><br><span class="line-number">2045</span><br><span class="line-number">2046</span><br><span class="line-number">2047</span><br><span class="line-number">2048</span><br><span class="line-number">2049</span><br><span class="line-number">2050</span><br><span class="line-number">2051</span><br><span class="line-number">2052</span><br><span class="line-number">2053</span><br><span class="line-number">2054</span><br><span class="line-number">2055</span><br><span class="line-number">2056</span><br><span class="line-number">2057</span><br><span class="line-number">2058</span><br><span class="line-number">2059</span><br><span class="line-number">2060</span><br><span class="line-number">2061</span><br><span class="line-number">2062</span><br><span class="line-number">2063</span><br><span class="line-number">2064</span><br><span class="line-number">2065</span><br><span class="line-number">2066</span><br><span class="line-number">2067</span><br><span class="line-number">2068</span><br><span class="line-number">2069</span><br><span class="line-number">2070</span><br><span class="line-number">2071</span><br><span class="line-number">2072</span><br><span class="line-number">2073</span><br><span class="line-number">2074</span><br><span class="line-number">2075</span><br><span class="line-number">2076</span><br><span class="line-number">2077</span><br><span class="line-number">2078</span><br><span class="line-number">2079</span><br><span class="line-number">2080</span><br><span class="line-number">2081</span><br><span class="line-number">2082</span><br><span class="line-number">2083</span><br><span class="line-number">2084</span><br><span class="line-number">2085</span><br><span class="line-number">2086</span><br><span class="line-number">2087</span><br><span class="line-number">2088</span><br><span class="line-number">2089</span><br><span class="line-number">2090</span><br><span class="line-number">2091</span><br><span class="line-number">2092</span><br><span class="line-number">2093</span><br><span class="line-number">2094</span><br><span class="line-number">2095</span><br><span class="line-number">2096</span><br><span class="line-number">2097</span><br><span class="line-number">2098</span><br><span class="line-number">2099</span><br><span class="line-number">2100</span><br><span class="line-number">2101</span><br><span class="line-number">2102</span><br><span class="line-number">2103</span><br><span class="line-number">2104</span><br><span class="line-number">2105</span><br><span class="line-number">2106</span><br><span class="line-number">2107</span><br><span class="line-number">2108</span><br><span class="line-number">2109</span><br><span class="line-number">2110</span><br><span class="line-number">2111</span><br><span class="line-number">2112</span><br><span class="line-number">2113</span><br><span class="line-number">2114</span><br><span class="line-number">2115</span><br><span class="line-number">2116</span><br><span class="line-number">2117</span><br><span class="line-number">2118</span><br><span class="line-number">2119</span><br><span class="line-number">2120</span><br><span class="line-number">2121</span><br><span class="line-number">2122</span><br><span class="line-number">2123</span><br><span class="line-number">2124</span><br><span class="line-number">2125</span><br><span class="line-number">2126</span><br><span class="line-number">2127</span><br><span class="line-number">2128</span><br><span class="line-number">2129</span><br><span class="line-number">2130</span><br><span class="line-number">2131</span><br><span class="line-number">2132</span><br><span class="line-number">2133</span><br><span class="line-number">2134</span><br><span class="line-number">2135</span><br><span class="line-number">2136</span><br><span class="line-number">2137</span><br><span class="line-number">2138</span><br><span class="line-number">2139</span><br><span class="line-number">2140</span><br><span class="line-number">2141</span><br><span class="line-number">2142</span><br><span class="line-number">2143</span><br><span class="line-number">2144</span><br><span class="line-number">2145</span><br><span class="line-number">2146</span><br><span class="line-number">2147</span><br><span class="line-number">2148</span><br><span class="line-number">2149</span><br><span class="line-number">2150</span><br><span class="line-number">2151</span><br><span class="line-number">2152</span><br><span class="line-number">2153</span><br><span class="line-number">2154</span><br><span class="line-number">2155</span><br><span class="line-number">2156</span><br><span class="line-number">2157</span><br><span class="line-number">2158</span><br><span class="line-number">2159</span><br><span class="line-number">2160</span><br><span class="line-number">2161</span><br><span class="line-number">2162</span><br><span class="line-number">2163</span><br><span class="line-number">2164</span><br><span class="line-number">2165</span><br><span class="line-number">2166</span><br><span class="line-number">2167</span><br><span class="line-number">2168</span><br><span class="line-number">2169</span><br><span class="line-number">2170</span><br><span class="line-number">2171</span><br><span class="line-number">2172</span><br><span class="line-number">2173</span><br><span class="line-number">2174</span><br><span class="line-number">2175</span><br><span class="line-number">2176</span><br><span class="line-number">2177</span><br><span class="line-number">2178</span><br><span class="line-number">2179</span><br><span class="line-number">2180</span><br><span class="line-number">2181</span><br><span class="line-number">2182</span><br><span class="line-number">2183</span><br><span class="line-number">2184</span><br><span class="line-number">2185</span><br><span class="line-number">2186</span><br><span class="line-number">2187</span><br><span class="line-number">2188</span><br><span class="line-number">2189</span><br><span class="line-number">2190</span><br><span class="line-number">2191</span><br><span class="line-number">2192</span><br><span class="line-number">2193</span><br><span class="line-number">2194</span><br><span class="line-number">2195</span><br><span class="line-number">2196</span><br><span class="line-number">2197</span><br><span class="line-number">2198</span><br><span class="line-number">2199</span><br><span class="line-number">2200</span><br><span class="line-number">2201</span><br><span class="line-number">2202</span><br><span class="line-number">2203</span><br><span class="line-number">2204</span><br><span class="line-number">2205</span><br><span class="line-number">2206</span><br><span class="line-number">2207</span><br><span class="line-number">2208</span><br><span class="line-number">2209</span><br><span class="line-number">2210</span><br><span class="line-number">2211</span><br><span class="line-number">2212</span><br><span class="line-number">2213</span><br><span class="line-number">2214</span><br><span class="line-number">2215</span><br><span class="line-number">2216</span><br><span class="line-number">2217</span><br><span class="line-number">2218</span><br><span class="line-number">2219</span><br><span class="line-number">2220</span><br><span class="line-number">2221</span><br><span class="line-number">2222</span><br><span class="line-number">2223</span><br><span class="line-number">2224</span><br><span class="line-number">2225</span><br><span class="line-number">2226</span><br><span class="line-number">2227</span><br><span class="line-number">2228</span><br><span class="line-number">2229</span><br><span class="line-number">2230</span><br><span class="line-number">2231</span><br><span class="line-number">2232</span><br><span class="line-number">2233</span><br><span class="line-number">2234</span><br><span class="line-number">2235</span><br><span class="line-number">2236</span><br><span class="line-number">2237</span><br><span class="line-number">2238</span><br><span class="line-number">2239</span><br><span class="line-number">2240</span><br><span class="line-number">2241</span><br><span class="line-number">2242</span><br><span class="line-number">2243</span><br><span class="line-number">2244</span><br><span class="line-number">2245</span><br><span class="line-number">2246</span><br><span class="line-number">2247</span><br><span class="line-number">2248</span><br><span class="line-number">2249</span><br><span class="line-number">2250</span><br><span class="line-number">2251</span><br><span class="line-number">2252</span><br><span class="line-number">2253</span><br><span class="line-number">2254</span><br><span class="line-number">2255</span><br><span class="line-number">2256</span><br><span class="line-number">2257</span><br><span class="line-number">2258</span><br><span class="line-number">2259</span><br><span class="line-number">2260</span><br><span class="line-number">2261</span><br><span class="line-number">2262</span><br><span class="line-number">2263</span><br><span class="line-number">2264</span><br><span class="line-number">2265</span><br><span class="line-number">2266</span><br><span class="line-number">2267</span><br><span class="line-number">2268</span><br><span class="line-number">2269</span><br><span class="line-number">2270</span><br><span class="line-number">2271</span><br><span class="line-number">2272</span><br><span class="line-number">2273</span><br><span class="line-number">2274</span><br><span class="line-number">2275</span><br><span class="line-number">2276</span><br><span class="line-number">2277</span><br><span class="line-number">2278</span><br><span class="line-number">2279</span><br><span class="line-number">2280</span><br><span class="line-number">2281</span><br><span class="line-number">2282</span><br><span class="line-number">2283</span><br><span class="line-number">2284</span><br><span class="line-number">2285</span><br><span class="line-number">2286</span><br><span class="line-number">2287</span><br><span class="line-number">2288</span><br><span class="line-number">2289</span><br><span class="line-number">2290</span><br><span class="line-number">2291</span><br><span class="line-number">2292</span><br><span class="line-number">2293</span><br><span class="line-number">2294</span><br><span class="line-number">2295</span><br><span class="line-number">2296</span><br><span class="line-number">2297</span><br><span class="line-number">2298</span><br><span class="line-number">2299</span><br><span class="line-number">2300</span><br><span class="line-number">2301</span><br><span class="line-number">2302</span><br><span class="line-number">2303</span><br><span class="line-number">2304</span><br><span class="line-number">2305</span><br><span class="line-number">2306</span><br><span class="line-number">2307</span><br><span class="line-number">2308</span><br><span class="line-number">2309</span><br><span class="line-number">2310</span><br><span class="line-number">2311</span><br><span class="line-number">2312</span><br><span class="line-number">2313</span><br><span class="line-number">2314</span><br><span class="line-number">2315</span><br><span class="line-number">2316</span><br><span class="line-number">2317</span><br><span class="line-number">2318</span><br><span class="line-number">2319</span><br><span class="line-number">2320</span><br><span class="line-number">2321</span><br><span class="line-number">2322</span><br><span class="line-number">2323</span><br><span class="line-number">2324</span><br><span class="line-number">2325</span><br><span class="line-number">2326</span><br><span class="line-number">2327</span><br><span class="line-number">2328</span><br><span class="line-number">2329</span><br><span class="line-number">2330</span><br><span class="line-number">2331</span><br><span class="line-number">2332</span><br><span class="line-number">2333</span><br><span class="line-number">2334</span><br><span class="line-number">2335</span><br><span class="line-number">2336</span><br><span class="line-number">2337</span><br><span class="line-number">2338</span><br><span class="line-number">2339</span><br><span class="line-number">2340</span><br><span class="line-number">2341</span><br><span class="line-number">2342</span><br><span class="line-number">2343</span><br><span class="line-number">2344</span><br><span class="line-number">2345</span><br><span class="line-number">2346</span><br><span class="line-number">2347</span><br><span class="line-number">2348</span><br><span class="line-number">2349</span><br><span class="line-number">2350</span><br><span class="line-number">2351</span><br><span class="line-number">2352</span><br><span class="line-number">2353</span><br><span class="line-number">2354</span><br><span class="line-number">2355</span><br><span class="line-number">2356</span><br><span class="line-number">2357</span><br><span class="line-number">2358</span><br><span class="line-number">2359</span><br><span class="line-number">2360</span><br><span class="line-number">2361</span><br><span class="line-number">2362</span><br><span class="line-number">2363</span><br><span class="line-number">2364</span><br><span class="line-number">2365</span><br><span class="line-number">2366</span><br><span class="line-number">2367</span><br><span class="line-number">2368</span><br><span class="line-number">2369</span><br><span class="line-number">2370</span><br><span class="line-number">2371</span><br><span class="line-number">2372</span><br><span class="line-number">2373</span><br><span class="line-number">2374</span><br><span class="line-number">2375</span><br><span class="line-number">2376</span><br><span class="line-number">2377</span><br><span class="line-number">2378</span><br><span class="line-number">2379</span><br><span class="line-number">2380</span><br><span class="line-number">2381</span><br><span class="line-number">2382</span><br><span class="line-number">2383</span><br><span class="line-number">2384</span><br><span class="line-number">2385</span><br><span class="line-number">2386</span><br><span class="line-number">2387</span><br><span class="line-number">2388</span><br><span class="line-number">2389</span><br><span class="line-number">2390</span><br><span class="line-number">2391</span><br><span class="line-number">2392</span><br><span class="line-number">2393</span><br><span class="line-number">2394</span><br><span class="line-number">2395</span><br><span class="line-number">2396</span><br><span class="line-number">2397</span><br><span class="line-number">2398</span><br><span class="line-number">2399</span><br><span class="line-number">2400</span><br><span class="line-number">2401</span><br><span class="line-number">2402</span><br><span class="line-number">2403</span><br><span class="line-number">2404</span><br><span class="line-number">2405</span><br><span class="line-number">2406</span><br><span class="line-number">2407</span><br><span class="line-number">2408</span><br><span class="line-number">2409</span><br><span class="line-number">2410</span><br><span class="line-number">2411</span><br><span class="line-number">2412</span><br><span class="line-number">2413</span><br><span class="line-number">2414</span><br><span class="line-number">2415</span><br><span class="line-number">2416</span><br><span class="line-number">2417</span><br><span class="line-number">2418</span><br><span class="line-number">2419</span><br><span class="line-number">2420</span><br><span class="line-number">2421</span><br><span class="line-number">2422</span><br><span class="line-number">2423</span><br><span class="line-number">2424</span><br><span class="line-number">2425</span><br><span class="line-number">2426</span><br><span class="line-number">2427</span><br><span class="line-number">2428</span><br><span class="line-number">2429</span><br><span class="line-number">2430</span><br><span class="line-number">2431</span><br><span class="line-number">2432</span><br><span class="line-number">2433</span><br><span class="line-number">2434</span><br><span class="line-number">2435</span><br><span class="line-number">2436</span><br><span class="line-number">2437</span><br><span class="line-number">2438</span><br><span class="line-number">2439</span><br><span class="line-number">2440</span><br><span class="line-number">2441</span><br><span class="line-number">2442</span><br><span class="line-number">2443</span><br><span class="line-number">2444</span><br><span class="line-number">2445</span><br><span class="line-number">2446</span><br><span class="line-number">2447</span><br><span class="line-number">2448</span><br><span class="line-number">2449</span><br><span class="line-number">2450</span><br><span class="line-number">2451</span><br><span class="line-number">2452</span><br><span class="line-number">2453</span><br><span class="line-number">2454</span><br><span class="line-number">2455</span><br><span class="line-number">2456</span><br><span class="line-number">2457</span><br><span class="line-number">2458</span><br><span class="line-number">2459</span><br><span class="line-number">2460</span><br><span class="line-number">2461</span><br><span class="line-number">2462</span><br><span class="line-number">2463</span><br><span class="line-number">2464</span><br><span class="line-number">2465</span><br><span class="line-number">2466</span><br><span class="line-number">2467</span><br><span class="line-number">2468</span><br><span class="line-number">2469</span><br><span class="line-number">2470</span><br><span class="line-number">2471</span><br><span class="line-number">2472</span><br><span class="line-number">2473</span><br><span class="line-number">2474</span><br><span class="line-number">2475</span><br><span class="line-number">2476</span><br><span class="line-number">2477</span><br><span class="line-number">2478</span><br><span class="line-number">2479</span><br><span class="line-number">2480</span><br><span class="line-number">2481</span><br><span class="line-number">2482</span><br><span class="line-number">2483</span><br><span class="line-number">2484</span><br><span class="line-number">2485</span><br><span class="line-number">2486</span><br><span class="line-number">2487</span><br><span class="line-number">2488</span><br><span class="line-number">2489</span><br><span class="line-number">2490</span><br><span class="line-number">2491</span><br><span class="line-number">2492</span><br><span class="line-number">2493</span><br><span class="line-number">2494</span><br><span class="line-number">2495</span><br><span class="line-number">2496</span><br><span class="line-number">2497</span><br><span class="line-number">2498</span><br><span class="line-number">2499</span><br><span class="line-number">2500</span><br><span class="line-number">2501</span><br><span class="line-number">2502</span><br><span class="line-number">2503</span><br><span class="line-number">2504</span><br><span class="line-number">2505</span><br><span class="line-number">2506</span><br><span class="line-number">2507</span><br><span class="line-number">2508</span><br><span class="line-number">2509</span><br><span class="line-number">2510</span><br><span class="line-number">2511</span><br><span class="line-number">2512</span><br><span class="line-number">2513</span><br><span class="line-number">2514</span><br><span class="line-number">2515</span><br><span class="line-number">2516</span><br><span class="line-number">2517</span><br><span class="line-number">2518</span><br><span class="line-number">2519</span><br><span class="line-number">2520</span><br><span class="line-number">2521</span><br><span class="line-number">2522</span><br><span class="line-number">2523</span><br><span class="line-number">2524</span><br><span class="line-number">2525</span><br><span class="line-number">2526</span><br><span class="line-number">2527</span><br><span class="line-number">2528</span><br><span class="line-number">2529</span><br><span class="line-number">2530</span><br><span class="line-number">2531</span><br><span class="line-number">2532</span><br><span class="line-number">2533</span><br><span class="line-number">2534</span><br><span class="line-number">2535</span><br><span class="line-number">2536</span><br><span class="line-number">2537</span><br><span class="line-number">2538</span><br><span class="line-number">2539</span><br><span class="line-number">2540</span><br><span class="line-number">2541</span><br><span class="line-number">2542</span><br><span class="line-number">2543</span><br><span class="line-number">2544</span><br><span class="line-number">2545</span><br><span class="line-number">2546</span><br><span class="line-number">2547</span><br><span class="line-number">2548</span><br><span class="line-number">2549</span><br><span class="line-number">2550</span><br><span class="line-number">2551</span><br><span class="line-number">2552</span><br><span class="line-number">2553</span><br><span class="line-number">2554</span><br><span class="line-number">2555</span><br><span class="line-number">2556</span><br><span class="line-number">2557</span><br><span class="line-number">2558</span><br><span class="line-number">2559</span><br><span class="line-number">2560</span><br><span class="line-number">2561</span><br><span class="line-number">2562</span><br><span class="line-number">2563</span><br><span class="line-number">2564</span><br><span class="line-number">2565</span><br><span class="line-number">2566</span><br><span class="line-number">2567</span><br><span class="line-number">2568</span><br><span class="line-number">2569</span><br><span class="line-number">2570</span><br><span class="line-number">2571</span><br><span class="line-number">2572</span><br><span class="line-number">2573</span><br><span class="line-number">2574</span><br><span class="line-number">2575</span><br><span class="line-number">2576</span><br><span class="line-number">2577</span><br><span class="line-number">2578</span><br><span class="line-number">2579</span><br><span class="line-number">2580</span><br><span class="line-number">2581</span><br><span class="line-number">2582</span><br><span class="line-number">2583</span><br><span class="line-number">2584</span><br><span class="line-number">2585</span><br><span class="line-number">2586</span><br><span class="line-number">2587</span><br><span class="line-number">2588</span><br><span class="line-number">2589</span><br><span class="line-number">2590</span><br><span class="line-number">2591</span><br><span class="line-number">2592</span><br><span class="line-number">2593</span><br><span class="line-number">2594</span><br><span class="line-number">2595</span><br><span class="line-number">2596</span><br><span class="line-number">2597</span><br><span class="line-number">2598</span><br><span class="line-number">2599</span><br><span class="line-number">2600</span><br><span class="line-number">2601</span><br><span class="line-number">2602</span><br><span class="line-number">2603</span><br><span class="line-number">2604</span><br><span class="line-number">2605</span><br><span class="line-number">2606</span><br><span class="line-number">2607</span><br><span class="line-number">2608</span><br><span class="line-number">2609</span><br><span class="line-number">2610</span><br><span class="line-number">2611</span><br><span class="line-number">2612</span><br><span class="line-number">2613</span><br><span class="line-number">2614</span><br><span class="line-number">2615</span><br><span class="line-number">2616</span><br><span class="line-number">2617</span><br><span class="line-number">2618</span><br><span class="line-number">2619</span><br><span class="line-number">2620</span><br><span class="line-number">2621</span><br><span class="line-number">2622</span><br><span class="line-number">2623</span><br><span class="line-number">2624</span><br><span class="line-number">2625</span><br><span class="line-number">2626</span><br><span class="line-number">2627</span><br><span class="line-number">2628</span><br><span class="line-number">2629</span><br></div></div>`,50);function l(r,p){return e}var t=n(a,[["render",l],["__file","HashMap \u539F\u7406\u5206\u6790.html.vue"]]);export{t as default};
