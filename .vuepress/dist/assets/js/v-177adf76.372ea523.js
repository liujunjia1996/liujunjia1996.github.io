"use strict";(self.webpackChunkblog_vue_press=self.webpackChunkblog_vue_press||[]).push([[462],{5630:(a,s,n)=>{n.r(s),n.d(s,{data:()=>e});const e={key:"v-177adf76",path:"/JDK/HashMap%20%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"数据结构",slug:"数据结构",children:[{level:3,title:"容器",slug:"容器",children:[]},{level:3,title:"元素",slug:"元素",children:[]}]},{level:2,title:"算法",slug:"算法",children:[{level:3,title:"初始化",slug:"初始化",children:[]},{level:3,title:"put",slug:"put",children:[]},{level:3,title:"get",slug:"get",children:[]}]},{level:2,title:"问题点",slug:"问题点",children:[{level:3,title:"为什么容量要是 2 的指数",slug:"为什么容量要是-2-的指数",children:[]},{level:3,title:"合并高位影响为什么采用异或，而不是与 or 或",slug:"合并高位影响为什么采用异或-而不是与-or-或",children:[]},{level:3,title:"为什么要重写 hashcode  / equals",slug:"为什么要重写-hashcode-equals",children:[]},{level:3,title:"为什么转红黑树前要判断容量是否小于 64",slug:"为什么转红黑树前要判断容量是否小于-64",children:[]},{level:3,title:"头插和尾插的区别",slug:"头插和尾插的区别",children:[]},{level:3,title:"table 字段为什么要加 transient",slug:"table-字段为什么要加-transient",children:[]},{level:3,title:"HashMap 使用的注意事项",slug:"hashmap-使用的注意事项",children:[]},{level:3,title:"解决 hash 冲突的几种方法",slug:"解决-hash-冲突的几种方法",children:[]},{level:3,title:"为什么 ThreadLocal 不直接用 HashMap",slug:"为什么-threadlocal-不直接用-hashmap",children:[]},{level:3,title:"HashTable 和 HashTable 区别",slug:"hashtable-和-hashtable-区别",children:[]},{level:3,title:"HashMap 的并发有什么问题（chm 解决了什么问题）",slug:"hashmap-的并发有什么问题-chm-解决了什么问题",children:[]}]}],filePathRelative:"JDK/HashMap 原理分析.md",git:{updatedTime:1637316008e3,contributors:[{name:"liujunjia",email:"43411944+liujunjia1996@users.noreply.github.com",commits:1}]}}},6970:(a,s,n)=>{n.r(s),n.d(s,{default:()=>l});const e=(0,n(6252).uE)('<blockquote><p>编程的世界中，任何东西都可以用数据结构和算法概括，大到整个应用程序，小到 HashMap 这个数据结构本身。下面我将从数据结构和算法的角度分析 HashMap 的原理。</p></blockquote><h2 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h2><h3 id="容器" tabindex="-1"><a class="header-anchor" href="#容器" aria-hidden="true">#</a> 容器</h3><p>数组 + 链表/红黑树</p><h3 id="元素" tabindex="-1"><a class="header-anchor" href="#元素" aria-hidden="true">#</a> 元素</h3><p>里面是键值对和键的 hash 以及后继节点的指针组成</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">final</span> <span class="token keyword">int</span> hash<span class="token punctuation">;</span>\n    <span class="token keyword">final</span> <span class="token class-name">K</span> key<span class="token punctuation">;</span>\n    <span class="token class-name">V</span> value<span class="token punctuation">;</span>\n    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>结论：HashMap 内部是由一个一个 node 为单位存储在数组/链表/红黑树中的。</p><h2 id="算法" tabindex="-1"><a class="header-anchor" href="#算法" aria-hidden="true">#</a> 算法</h2><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3><p>HashMap 的初始化是惰性的</p><p>常见的空参构造函数中，只初始化了加载因子，即 0.75</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public HashMap() {\n    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>带容量和加载因子的构造函数，也只是处理了一些简单逻辑</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">,</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Illegal initial capacity: &quot;</span> <span class="token operator">+</span>\n                                            initialCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;</span> MAXIMUM_CAPACITY<span class="token punctuation">)</span>\n        initialCapacity <span class="token operator">=</span> MAXIMUM_CAPACITY<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>loadFactor <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">isNaN</span><span class="token punctuation">(</span>loadFactor<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Illegal load factor: &quot;</span> <span class="token operator">+</span>\n                                            loadFactor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>loadFactor <span class="token operator">=</span> loadFactor<span class="token punctuation">;</span>\n    <span class="token comment">// tableSizeFor 返回一个不小于给定值的最小的 2 的指数值，例如，7-&gt;8，8-&gt;8，9-&gt;16</span>\n    <span class="token comment">// 至于这里为什么这样设置阈值下文会有解释</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>threshold <span class="token operator">=</span> <span class="token function">tableSizeFor</span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="put" tabindex="-1"><a class="header-anchor" href="#put" aria-hidden="true">#</a> put</h3><h3 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> get</h3><h2 id="问题点" tabindex="-1"><a class="header-anchor" href="#问题点" aria-hidden="true">#</a> 问题点</h2><h3 id="为什么容量要是-2-的指数" tabindex="-1"><a class="header-anchor" href="#为什么容量要是-2-的指数" aria-hidden="true">#</a> 为什么容量要是 2 的指数</h3><p>2 的指数的容量对应到索引值是 0 到 2 的 n 次方 - 1，此时最大索引的二进制每一位都是 1。</p><p>key 的 hashcode 合并高位影响，再与该容量按位与之后，不会扰动 hashcode，利于 node 在数组上均匀分布。</p><h3 id="合并高位影响为什么采用异或-而不是与-or-或" tabindex="-1"><a class="header-anchor" href="#合并高位影响为什么采用异或-而不是与-or-或" aria-hidden="true">#</a> 合并高位影响为什么采用异或，而不是与 or 或</h3><p>与和或可以只凭一个元素确定结果，而异或必须两个元素一起参与运算<br> 与的时候，任意元素是 0，结果必是 0<br> 或的时候，任意元素是 1，结果必是 1</p><h3 id="为什么要重写-hashcode-equals" tabindex="-1"><a class="header-anchor" href="#为什么要重写-hashcode-equals" aria-hidden="true">#</a> 为什么要重写 hashcode / equals</h3><p>hashcode 用来定位 node 在数组上的位置，equals 用来判断，当 hashcode 冲突时，是覆写还是追加。</p><p>如果只重写 hashcode，当 hashcode 冲突时会发生值覆盖的问题。</p><p>如果只重写 equals，会出现桶位置堆积的情况，影响插入和查询效率。</p><h3 id="为什么转红黑树前要判断容量是否小于-64" tabindex="-1"><a class="header-anchor" href="#为什么转红黑树前要判断容量是否小于-64" aria-hidden="true">#</a> 为什么转红黑树前要判断容量是否小于 64</h3><p>首先要知道为什么会出现红黑树结构 ———— hash 冲突严重，用链表结构查询太慢，红黑树有较好的查询性能。</p><p>但是，扩容数组也可以解决 hash 冲突，增加查询性能，并且当总容量比较小的时候，rehash 的整体成本低于维护一个红黑树（红黑树的新建和添加值都有性能开销）。</p><p>所以当容量小于 64 的时候优先扩容，相当于用空间换时间了。</p><h3 id="头插和尾插的区别" tabindex="-1"><a class="header-anchor" href="#头插和尾插的区别" aria-hidden="true">#</a> 头插和尾插的区别</h3><p>...</p><h3 id="table-字段为什么要加-transient" tabindex="-1"><a class="header-anchor" href="#table-字段为什么要加-transient" aria-hidden="true">#</a> table 字段为什么要加 transient</h3><p>数组里最少有四分之一是空值，不能直接序列化。</p><h3 id="hashmap-使用的注意事项" tabindex="-1"><a class="header-anchor" href="#hashmap-使用的注意事项" aria-hidden="true">#</a> HashMap 使用的注意事项</h3><ul><li><p>初始化时指定容量，防止频繁扩容</p></li><li><p>遍历时遍历 EntrySet，防止再去根据 key 取找 value</p></li></ul><h3 id="解决-hash-冲突的几种方法" tabindex="-1"><a class="header-anchor" href="#解决-hash-冲突的几种方法" aria-hidden="true">#</a> 解决 hash 冲突的几种方法</h3><p>拉链和开放地址法，HashMap 使用拉链法，ThreadLocal 使用开放地址法</p><h3 id="为什么-threadlocal-不直接用-hashmap" tabindex="-1"><a class="header-anchor" href="#为什么-threadlocal-不直接用-hashmap" aria-hidden="true">#</a> 为什么 ThreadLocal 不直接用 HashMap</h3><p>软引用</p><h3 id="hashtable-和-hashtable-区别" tabindex="-1"><a class="header-anchor" href="#hashtable-和-hashtable-区别" aria-hidden="true">#</a> HashTable 和 HashTable 区别</h3><p>最主要的区别是 HashTable 的 put/get/contains 都加了 synchronized，所以 HashTable 是线程安全的，但性能不佳</p><h3 id="hashmap-的并发有什么问题-chm-解决了什么问题" tabindex="-1"><a class="header-anchor" href="#hashmap-的并发有什么问题-chm-解决了什么问题" aria-hidden="true">#</a> HashMap 的并发有什么问题（chm 解决了什么问题）</h3>',44),t={},l=(0,n(3744).Z)(t,[["render",function(a,s){return e}]])},3744:(a,s)=>{s.Z=(a,s)=>{const n=a.__vccOpts||a;for(const[a,e]of s)n[a]=e;return n}}}]);