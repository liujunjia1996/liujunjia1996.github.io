import{_ as n,o as s,c as a,d as e}from"./app.43ec1c76.js";const t={},p=e(`<h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面" aria-hidden="true">#</a> 写在前面</h2><p>最近在读 ThreadLocal 的源码，感觉 ThreadLocal 设计的还是很巧妙的，首先它利用了魔数，尽量避免 hash 冲突，其次它解决 hash 冲突的方式也不是 hashmap 的那种拉链法，而是使用了开放地址法，还有，它的 set/get 甚至 remove 方法都包含了清理 stale entry 的逻辑，设计者真是为了内存泄漏操碎了心啊。</p><h2 id="源码注释" tabindex="-1"><a class="header-anchor" href="#源码注释" aria-hidden="true">#</a> 源码注释</h2><p>下面是我自己注释的完整 ThreadLocal 的源码，来自 openJdk 11.</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">Copyright</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">1997</span><span class="token punctuation">,</span> <span class="token number">2013</span><span class="token punctuation">,</span> <span class="token class-name">Oracle</span> and<span class="token operator">/</span>or its <span class="token class-name"><span class="token namespace">affiliates<span class="token punctuation">.</span></span> All</span> rights reserved<span class="token punctuation">.</span>
 <span class="token operator">*</span> <span class="token constant">DO</span> <span class="token constant">NOT</span> <span class="token constant">ALTER</span> <span class="token constant">OR</span> <span class="token constant">REMOVE</span> <span class="token constant">COPYRIGHT</span> <span class="token constant">NOTICES</span> <span class="token constant">OR</span> <span class="token constant">THIS</span> <span class="token constant">FILE</span> <span class="token constant">HEADER</span><span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">This</span> code is free software<span class="token punctuation">;</span> you can redistribute it and<span class="token operator">/</span>or modify it
 <span class="token operator">*</span> under the terms of the <span class="token constant">GNU</span> <span class="token class-name">General</span> <span class="token class-name">Public</span> <span class="token class-name">License</span> version <span class="token number">2</span> only<span class="token punctuation">,</span> as
 <span class="token operator">*</span> published by the <span class="token class-name">Free</span> <span class="token class-name">Software</span> <span class="token class-name">Foundation<span class="token punctuation">.</span>  Oracle</span> designates <span class="token keyword">this</span>
 <span class="token operator">*</span> particular file as subject <span class="token keyword">to</span> <span class="token namespace">the</span> <span class="token string">&quot;Classpath&quot;</span> exception as provided
 <span class="token operator">*</span> by <span class="token class-name">Oracle</span> in the <span class="token constant">LICENSE</span> file that accompanied <span class="token keyword">this</span> code<span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">This</span> code is distributed in the hope that it will be useful<span class="token punctuation">,</span> but <span class="token constant">WITHOUT</span>
 <span class="token operator">*</span> <span class="token class-name">ANY</span> <span class="token constant">WARRANTY</span><span class="token punctuation">;</span> without even the implied warranty of <span class="token constant">MERCHANTABILITY</span> or
 <span class="token operator">*</span> <span class="token constant">FITNESS</span> <span class="token constant">FOR</span> <span class="token class-name">A</span> <span class="token constant">PARTICULAR</span> <span class="token class-name">PURPOSE<span class="token punctuation">.</span>  See</span> the <span class="token constant">GNU</span> <span class="token class-name">General</span> <span class="token class-name">Public</span> <span class="token class-name">License</span>
 <span class="token operator">*</span> version <span class="token number">2</span> <span class="token keyword">for</span> more details <span class="token punctuation">(</span>a copy is included in the <span class="token constant">LICENSE</span> file that
 <span class="token operator">*</span> accompanied <span class="token keyword">this</span> code<span class="token punctuation">)</span><span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">You</span> should have received a copy of the <span class="token constant">GNU</span> <span class="token class-name">General</span> <span class="token class-name">Public</span> <span class="token class-name">License</span> version
 <span class="token operator">*</span> <span class="token number">2</span> along <span class="token keyword">with</span> <span class="token keyword">this</span> work<span class="token punctuation">;</span> <span class="token keyword">if</span> not<span class="token punctuation">,</span> write <span class="token keyword">to</span> <span class="token namespace">the</span> <span class="token class-name">Free</span> <span class="token class-name">Software</span> <span class="token class-name">Foundation</span><span class="token punctuation">,</span>
 <span class="token operator">*</span> <span class="token class-name">Inc</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token number">51</span> <span class="token class-name">Franklin</span> <span class="token class-name">St</span><span class="token punctuation">,</span> <span class="token class-name">Fifth</span> <span class="token class-name">Floor</span><span class="token punctuation">,</span> <span class="token class-name">Boston</span><span class="token punctuation">,</span> <span class="token constant">MA</span> <span class="token number">02110</span><span class="token operator">-</span><span class="token number">1301</span> <span class="token constant">USA</span><span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">Please</span> contact <span class="token class-name">Oracle</span><span class="token punctuation">,</span> <span class="token number">500</span> <span class="token class-name">Oracle</span> <span class="token class-name">Parkway</span><span class="token punctuation">,</span> <span class="token class-name">Redwood</span> <span class="token class-name">Shores</span><span class="token punctuation">,</span> <span class="token constant">CA</span> <span class="token number">94065</span> <span class="token constant">USA</span>
 <span class="token operator">*</span> or visit www<span class="token punctuation">.</span>oracle<span class="token punctuation">.</span>com <span class="token keyword">if</span> you need additional information or have any
 <span class="token operator">*</span> questions<span class="token punctuation">.</span>
 <span class="token operator">*</span><span class="token operator">/</span>


<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jdk<span class="token punctuation">.</span>internal<span class="token punctuation">.</span>misc<span class="token punctuation">.</span></span><span class="token class-name">TerminatingThreadLocal</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>ref<span class="token punctuation">.</span></span><span class="token class-name">WeakReference</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Objects</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>atomic<span class="token punctuation">.</span></span><span class="token class-name">AtomicInteger</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>function<span class="token punctuation">.</span></span><span class="token class-name">Supplier</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * This class provides thread-local variables.  These variables differ from
 * their normal counterparts in that each thread that accesses one (via its
 * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">get</span></span><span class="token punctuation">}</span> or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">set</span></span><span class="token punctuation">}</span> method) has its own, independently initialized
 * copy of the variable.  <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">ThreadLocal</span></span></span><span class="token punctuation">}</span> instances are typically private
 * static fields in classes that wish to associate state with a thread (e.g.,
 * a user ID or Transaction ID).
 *
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> For example, the class below generates unique identifiers local to each
 * thread.
 * A thread&#39;s id is assigned the first time it invokes <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">ThreadId</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span></span><span class="token punctuation">}</span>
 * and remains unchanged on subsequent calls.
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pre</span><span class="token punctuation">&gt;</span></span>
 <span class="token code-section">* <span class="token line"><span class="token code language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>atomic<span class="token punctuation">.</span></span><span class="token class-name">AtomicInteger</span></span><span class="token punctuation">;</span></span></span>
 *
 * <span class="token line"><span class="token code language-java"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadId</span> <span class="token punctuation">{</span></span></span>
 *     <span class="token line"><span class="token code language-java"><span class="token comment">// Atomic integer containing the next thread ID to be assigned</span></span></span>
 *     <span class="token line"><span class="token code language-java"><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">AtomicInteger</span> nextId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></span>
 *
 *     <span class="token line"><span class="token code language-java"><span class="token comment">// Thread local variable containing each thread&#39;s ID</span></span></span>
 *     <span class="token line"><span class="token code language-java"><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span></span><span class="token entity named-entity" title="&lt;">&amp;lt;</span><span class="token code language-java"> <span class="token class-name">Integer</span></span><span class="token entity named-entity" title="&gt;">&amp;gt;</span><span class="token code language-java"> threadId <span class="token operator">=</span></span></span>
 *         <span class="token line"><span class="token code language-java"><span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span></span><span class="token entity named-entity" title="&lt;">&amp;lt;</span><span class="token code language-java"> <span class="token class-name">Integer</span></span><span class="token entity named-entity" title="&gt;">&amp;gt;</span><span class="token code language-java"><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span></span>
 *             <span class="token line"><span class="token entity" title="@">&amp;#64;</span><span class="token code language-java"> <span class="token class-name">Override</span> <span class="token keyword">protected</span> <span class="token class-name">Integer</span> <span class="token function">initialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span></span>
 *                 <span class="token line"><span class="token code language-java"><span class="token keyword">return</span> nextId<span class="token punctuation">.</span><span class="token function">getAndIncrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></span>
 *         <span class="token line"><span class="token code language-java"><span class="token punctuation">}</span></span></span>
 *     <span class="token line"><span class="token code language-java"><span class="token punctuation">}</span><span class="token punctuation">;</span></span></span>
 *
 *     <span class="token line"><span class="token code language-java"><span class="token comment">// Returns the current thread&#39;s unique ID, assigning it if necessary</span></span></span>
 *     <span class="token line"><span class="token code language-java"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span></span>
 *         <span class="token line"><span class="token code language-java"><span class="token keyword">return</span> threadId<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></span>
 *     <span class="token line"><span class="token code language-java"><span class="token punctuation">}</span></span></span>
 * <span class="token line"><span class="token code language-java"><span class="token punctuation">}</span></span></span>
 *</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pre</span><span class="token punctuation">&gt;</span></span>
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> Each thread holds an implicit reference to its copy of a thread-local
 * variable as long as the thread is alive and the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">ThreadLocal</span></span></span><span class="token punctuation">}</span>
 * instance is accessible; after a thread goes away, all of its copies of
 * thread-local instances are subject to garbage collection (unless other
 * references to these copies exist).
 *
 * <span class="token keyword">@author</span> Josh Bloch and Doug Lea
 * <span class="token keyword">@since</span> 1.2
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * ThreadLocals rely on per-thread linear-probe hash maps attached
     * to each thread (Thread.threadLocals and
     * inheritableThreadLocals).  The ThreadLocal objects act as keys,
     * searched via threadLocalHashCode.  This is a custom hash code
     * (useful only within ThreadLocalMaps) that eliminates collisions
     * in the common case where consecutively constructed ThreadLocals
     * are used by the same threads, while remaining well-behaved in
     * less common cases.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> threadLocalHashCode <span class="token operator">=</span> <span class="token function">nextHashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * The next hash code to be given out. Updated atomically. Starts at
     * zero.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">AtomicInteger</span> nextHashCode <span class="token operator">=</span>
            <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * The difference between successively generated hash codes - turns
     * implicit sequential thread-local IDs into near-optimally spread
     * multiplicative hash values for power-of-two-sized tables.
     * 每 new ThreadLocal 的实例都会 getAndAdd 一个魔数
     * 魔数要搭配容量是 2 的 n 次方的数组效果才比较好
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">HASH_INCREMENT</span> <span class="token operator">=</span> <span class="token number">0x61c88647</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns the next hash code.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">nextHashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> nextHashCode<span class="token punctuation">.</span><span class="token function">getAndAdd</span><span class="token punctuation">(</span><span class="token constant">HASH_INCREMENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Returns the current thread&#39;s &quot;initial value&quot; for this
     * thread-local variable.  This method will be invoked the first
     * time a thread accesses the variable with the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">get</span></span><span class="token punctuation">}</span>
     * method, unless the thread previously invoked the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">set</span></span><span class="token punctuation">}</span>
     * method, in which case the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">initialValue</span></span><span class="token punctuation">}</span> method will not
     * be invoked for the thread.  Normally, this method is invoked at
     * most once per thread, but it may be invoked again in case of
     * subsequent invocations of <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">remove</span></span><span class="token punctuation">}</span> followed by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">get</span></span><span class="token punctuation">}</span>.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span> This implementation simply returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>; if the
     * programmer desires thread-local variables to have an initial
     * value other than <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">ThreadLocal</span></span></span><span class="token punctuation">}</span> must be
     * subclassed, and this method overridden.  Typically, an
     * anonymous inner class will be used.
     *
     * <span class="token keyword">@return</span> the initial value for this thread-local
     * 默认的初始值是 0 ，可以重写这个方法
     */</span>
    <span class="token keyword">protected</span> <span class="token class-name">T</span> <span class="token function">initialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Creates a thread local variable. The initial value of the variable is
     * determined by invoking the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">get</span></span><span class="token punctuation">}</span> method on the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Supplier</span></span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>S<span class="token punctuation">&gt;</span></span>      the type of the thread local&#39;s value
     * <span class="token keyword">@param</span> <span class="token parameter">supplier</span> the supplier to be used to determine the initial value
     * <span class="token keyword">@return</span> a new thread local variable
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified supplier is null
     * <span class="token keyword">@since</span> 1.8
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">S</span><span class="token punctuation">&gt;</span></span> <span class="token function">withInitial</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">S</span><span class="token punctuation">&gt;</span></span> supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SuppliedThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>supplier<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Creates a thread local variable.
     *
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">withInitial</span><span class="token punctuation">(</span><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>function<span class="token punctuation">.</span></span><span class="token class-name">Supplier</span><span class="token punctuation">)</span></span>
     * 惰性初始化，第一次 get 或 set 的时候再初始化 map
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">ThreadLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Returns the value in the current thread&#39;s copy of this
     * thread-local variable.  If the variable has no value for the
     * current thread, it is first initialized to the value returned
     * by an invocation of the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">initialValue</span></span><span class="token punctuation">}</span> method.
     *
     * <span class="token keyword">@return</span> the current thread&#39;s value of this thread-local
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>map <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ThreadLocalMap<span class="token punctuation">.</span>Entry</span> e <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
                <span class="token class-name">T</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span> e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
                <span class="token keyword">return</span> result<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 走到这有可能是</span>
        <span class="token comment">// 1. map 为 null</span>
        <span class="token comment">// 2. map 不为 null，但 entry 为 null</span>
        <span class="token keyword">return</span> <span class="token function">setInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if there is a value in the current thread&#39;s copy of
     * this thread-local variable, even if that values is <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if current thread has associated value in this
     * thread-local variable; <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">false</span></span></span><span class="token punctuation">}</span> if not
     * 没什么好说的
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> map <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> map<span class="token punctuation">.</span><span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Variant of set() to establish initialValue. Used instead
     * of set() in case user has overridden the set() method.
     *
     * <span class="token keyword">@return</span> the initial value
     * 没什么好说的
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> <span class="token function">setInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">T</span> value <span class="token operator">=</span> <span class="token function">initialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>map <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">createMap</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">TerminatingThreadLocal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">TerminatingThreadLocal</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">TerminatingThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Sets the current thread&#39;s copy of this thread-local variable
     * to the specified value.  Most subclasses will have no need to
     * override this method, relying solely on the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">initialValue</span></span><span class="token punctuation">}</span>
     * method to set the values of thread-locals.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> the value to be stored in the current thread&#39;s copy of
     *              this thread-local.
     *
     * 没什么好说的
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">T</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>map <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">createMap</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Removes the current thread&#39;s value for this thread-local
     * variable.  If this thread-local variable is subsequently
     * <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">get</span></span> read<span class="token punctuation">}</span> by the current thread, its value will be
     * reinitialized by invoking its <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">initialValue</span></span><span class="token punctuation">}</span> method,
     * unless its value is <span class="token punctuation">{</span><span class="token keyword">@linkplain</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">set</span></span> set<span class="token punctuation">}</span> by the current thread
     * in the interim.  This may result in multiple invocations of the
     * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">initialValue</span></span><span class="token punctuation">}</span> method in the current thread.
     *
     * <span class="token keyword">@since</span> 1.5
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
     * 实际上是删除 threadlocalMap 上某个 entry
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ThreadLocalMap</span> m <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 调用 map 自身的 remove 方法, 传入自身的引用</span>
            m<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Get the map associated with a ThreadLocal. Overridden in
     * InheritableThreadLocal.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">t</span> the current thread
     * <span class="token keyword">@return</span> the map
     */</span>
    <span class="token class-name">ThreadLocalMap</span> <span class="token function">getMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> t<span class="token punctuation">.</span>threadLocals<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Create the map associated with a ThreadLocal. Overridden in
     * InheritableThreadLocal.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">t</span>          the current thread
     * <span class="token keyword">@param</span> <span class="token parameter">firstValue</span> value for the initial entry of the map
     */</span>
    <span class="token keyword">void</span> <span class="token function">createMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">,</span> <span class="token class-name">T</span> firstValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span>threadLocals <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocalMap</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> firstValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Factory method to create map of inherited thread locals.
     * Designed to be called only from Thread constructor.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">parentMap</span> the map associated with parent thread
     * <span class="token keyword">@return</span> a map containing the parent&#39;s inheritable bindings
     */</span>
    <span class="token keyword">static</span> <span class="token class-name">ThreadLocalMap</span> <span class="token function">createInheritedMap</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocalMap</span> parentMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocalMap</span><span class="token punctuation">(</span>parentMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Method childValue is visibly defined in subclass
     * InheritableThreadLocal, but is internally defined here for the
     * sake of providing createInheritedMap factory method without
     * needing to subclass the map class in InheritableThreadLocal.
     * This technique is preferable to the alternative of embedding
     * instanceof tests in methods.
     */</span>
    <span class="token class-name">T</span> <span class="token function">childValue</span><span class="token punctuation">(</span><span class="token class-name">T</span> parentValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * An extension of ThreadLocal that obtains its initial value from
     * the specified <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Supplier</span></span></span><span class="token punctuation">}</span>.
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">SuppliedThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> supplier<span class="token punctuation">;</span>

        <span class="token class-name">SuppliedThreadLocal</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>supplier <span class="token operator">=</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>supplier<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">protected</span> <span class="token class-name">T</span> <span class="token function">initialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * ThreadLocalMap is a customized hash map suitable only for
     * maintaining thread local values. No operations are exported
     * outside of the ThreadLocal class. The class is package private to
     * allow declaration of fields in class Thread.  To help deal with
     * very large and long-lived usages, the hash table entries use
     * WeakReferences for keys. However, since reference queues are not
     * used, stale entries are guaranteed to be removed only when
     * the table starts running out of space.
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ThreadLocalMap</span> <span class="token punctuation">{</span>

        <span class="token doc-comment comment">/**
         * The entries in this hash map extend WeakReference, using
         * its main ref field as the key (which is always a
         * ThreadLocal object).  Note that null keys (i.e. entry.get()
         * == null) mean that the key is no longer referenced, so the
         * entry can be expunged from table.  Such entries are referred to
         * as &quot;stale entries&quot; in the code that follows.
         */</span>
        <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Entry</span> <span class="token keyword">extends</span> <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ThreadLocal</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

            <span class="token doc-comment comment">/**
             * The value associated with this ThreadLocal.
             */</span>
            <span class="token class-name">Object</span> value<span class="token punctuation">;</span>

            <span class="token class-name">Entry</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k<span class="token punctuation">,</span> <span class="token class-name">Object</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">super</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>
                value <span class="token operator">=</span> v<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * The initial capacity -- MUST be a power of two.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">INITIAL_CAPACITY</span> <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * The table, resized as necessary.
         * table.length MUST always be a power of two.
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> table<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * The number of entries in the table.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * The next size value at which to resize.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> threshold<span class="token punctuation">;</span> <span class="token comment">// Default to 0</span>

        <span class="token doc-comment comment">/**
         * Set the resize threshold to maintain at worst a 2/3 load factor.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">setThreshold</span><span class="token punctuation">(</span><span class="token keyword">int</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            threshold <span class="token operator">=</span> len <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Increment i modulo len.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> len<span class="token punctuation">)</span> <span class="token operator">?</span> i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Decrement i modulo len.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">prevIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">?</span> i <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">:</span> len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Construct a new map initially containing (firstKey, firstValue).
         * ThreadLocalMaps are constructed lazily, so we only create
         * one when we have at least one entry to put in it.
         */</span>
        <span class="token class-name">ThreadLocalMap</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> firstKey<span class="token punctuation">,</span> <span class="token class-name">Object</span> firstValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            table <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token constant">INITIAL_CAPACITY</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> firstKey<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token constant">INITIAL_CAPACITY</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            table<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>firstKey<span class="token punctuation">,</span> firstValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
            size <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token function">setThreshold</span><span class="token punctuation">(</span><span class="token constant">INITIAL_CAPACITY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Construct a new map including all Inheritable ThreadLocals
         * from given parent map. Called only by createInheritedMap.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">parentMap</span> the map associated with parent thread.
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">ThreadLocalMap</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocalMap</span> parentMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parentTable <span class="token operator">=</span> parentMap<span class="token punctuation">.</span>table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> parentTable<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token function">setThreshold</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            table <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span>len<span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span> e <span class="token operator">:</span> parentTable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
                    <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> key <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Object</span> value <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">childValue</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">Entry</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">int</span> h <span class="token operator">=</span> key<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span>table<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                            h <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        table<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">=</span> c<span class="token punctuation">;</span>
                        size<span class="token operator">++</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Get the entry associated with key.  This method
         * itself handles only the fast path: a direct hit of existing
         * key. It otherwise relays to getEntryAfterMiss.  This is
         * designed to maximize performance for direct hits, in part
         * by making this method readily inlinable.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">key</span> the thread local object
         * <span class="token keyword">@return</span> the entry associated with key, or null if no such
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">Entry</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> key<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>table<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Entry</span> e <span class="token operator">=</span> table<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// 没有发现 hash 冲突</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> key<span class="token punctuation">)</span>
                <span class="token keyword">return</span> e<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token comment">// hash 冲突了，用开放地址法寻找</span>
                <span class="token keyword">return</span> <span class="token function">getEntryAfterMiss</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> i<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Version of getEntry method for use when key is not found in
         * its direct hash slot.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">key</span> the thread local object
         * <span class="token keyword">@param</span> <span class="token parameter">i</span>   the table index for key&#39;s hash code
         * <span class="token keyword">@param</span> <span class="token parameter">e</span>   the entry at table [i]
         * <span class="token keyword">@return</span> the entry associated with key, or null if no such
         */</span>
        <span class="token keyword">private</span> <span class="token class-name">Entry</span> <span class="token function">getEntryAfterMiss</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token class-name">Entry</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

            <span class="token comment">// 就算 hash 冲突 entry 也应该是连续的，所以遍历到 entry 为 null 就可以停了，</span>
            <span class="token comment">// 后面的不用找了</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 找到了直接就返回</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span>
                    <span class="token keyword">return</span> e<span class="token punctuation">;</span>
                <span class="token comment">// k 是 null，说明 entry 过期了，进行回收</span>
                <span class="token comment">// 这个函数不仅仅只回收这一个 entry ，而是顺便向后遍历，多回收几个过期的 entry</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 执行到这里，要么 entry 的位置有变化，要么 i 有变化</span>
                <span class="token comment">// 所以计算出来的 e 肯定和以前的不一样</span>
                e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Set the value associated with key.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">key</span>   the thread local object
         * <span class="token keyword">@param</span> <span class="token parameter">value</span> the value to be set
         */</span>
        <span class="token comment">// for (初始条件; 循环检测条件; 条件更新语句) {</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token comment">// We don&#39;t use a fast path as with get() because it is at</span>
            <span class="token comment">// least as common to use set() to create new entries as</span>
            <span class="token comment">// it is to replace existing ones, in which case, a fast</span>
            <span class="token comment">// path would fail more often than not.</span>

            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> key<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span> e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                 e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                 e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// 找到重复的就直接覆盖</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// 值为 null, 说明过期了，剩下的逻辑全部由 replaceStaleEntry 方法实现</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">replaceStaleEntry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 上面的循环没发现重复的 或 没有发现过期的 entry</span>
            tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> sz <span class="token operator">=</span> <span class="token operator">++</span>size<span class="token punctuation">;</span>
            <span class="token comment">// 从 i 向后清理一些 stale entry, 并且判断一下容量是否大于阈值</span>
            <span class="token comment">// 如果没有清理掉 stale entry，sz 肯定不会比阈值大，所以用短路与</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> sz<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> sz <span class="token operator">&gt;=</span> threshold<span class="token punctuation">)</span>
                <span class="token comment">// rehash 这个函数不仅有 rehash 还有 resize 的逻辑</span>
                <span class="token function">rehash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Remove the entry for key.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> key<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span> e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                 e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                 e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 回收 k</span>
                    e<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 回收 k 之后，就变成 stale entry 了, 直接调 expungeStaleEntry，</span>
                    <span class="token comment">// 还能顺便向后清理一下其他 stale entry</span>
                    <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Replace a stale entry encountered during a set operation
         * with an entry for the specified key.  The value passed in
         * the value parameter is stored in the entry, whether or not
         * an entry already exists for the specified key.
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * As a side effect, this method expunges all stale entries in the
         * &quot;run&quot; containing the stale entry.  (A run is a sequence of entries
         * between two null slots.)
         *
         * <span class="token keyword">@param</span> <span class="token parameter">key</span>       the key
         * <span class="token keyword">@param</span> <span class="token parameter">value</span>     the value to be associated with key
         * <span class="token keyword">@param</span> <span class="token parameter">staleSlot</span> index of the first stale entry encountered while
         *                  searching for key.
         *
         * 稍微有些复杂，先向前探测，再向后探测，A run is a sequence of entries between two null slots
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">replaceStaleEntry</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span>
                                       <span class="token keyword">int</span> staleSlot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token class-name">Entry</span> e<span class="token punctuation">;</span>

            <span class="token doc-comment comment">/**
             * Back up to check for prior stale entry in current run.
             * We clean out whole runs at a time to avoid continual incremental rehashing
             * due to garbage collector freeing up refs in bunches
             * 大概的意思就是说这样可以减少 rehash
             */</span>
            <span class="token keyword">int</span> slotToExpunge <span class="token operator">=</span> staleSlot<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token function">prevIndex</span><span class="token punctuation">(</span>staleSlot<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token punctuation">(</span>e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                 i <span class="token operator">=</span> <span class="token function">prevIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    slotToExpunge <span class="token operator">=</span> i<span class="token punctuation">;</span>

            <span class="token comment">// Find either the key or trailing null slot of run, whichever</span>
            <span class="token comment">// occurs first</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>staleSlot<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token punctuation">(</span>e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                 i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// If we find key, then we need to swap it</span>
                <span class="token comment">// with the stale entry to maintain hash table order.</span>
                <span class="token comment">// The newly stale slot, or any other stale slot</span>
                <span class="token comment">// encountered above it, can then be sent to expungeStaleEntry</span>
                <span class="token comment">// to remove or rehash all of the other entries in run.</span>
                <span class="token comment">// 找到了可以覆盖的 entry</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>

                    tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>

                    <span class="token comment">// Start expunge at preceding stale entry if it exists</span>
                    <span class="token comment">// 如果先前没有找 stale entry，就从当前的位置开始处理过期 stale entry</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>slotToExpunge <span class="token operator">==</span> staleSlot<span class="token punctuation">)</span>
                        slotToExpunge <span class="token operator">=</span> i<span class="token punctuation">;</span>
                    <span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span><span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>slotToExpunge<span class="token punctuation">)</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// If we didn&#39;t find stale entry on backward scan, the</span>
                <span class="token comment">// first stale entry seen while scanning for key is the</span>
                <span class="token comment">// first still present in the run.</span>
                <span class="token comment">// 如果先前没有找 stale entry ，反而是在后面找到了，</span>
                <span class="token comment">// 直接把 slotToExpunge 更新为后面的第一个 stale entry 的索引</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> slotToExpunge <span class="token operator">==</span> staleSlot<span class="token punctuation">)</span>
                    slotToExpunge <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// If key not found, put new entry in stale slot</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// If there are any other stale entries in run, expunge them</span>
            <span class="token comment">// 如果 slotToExpunge 不等于 staleSlot，</span>
            <span class="token comment">// 说明在上面一系列逻辑中发现了 stale entry，那就需要清理一下了</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>slotToExpunge <span class="token operator">!=</span> staleSlot<span class="token punctuation">)</span>
                <span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span><span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>slotToExpunge<span class="token punctuation">)</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Expunge a stale entry by rehashing any possibly colliding entries
         * lying between staleSlot and the next null slot.  This also expunges
         * any other stale entries encountered before the trailing null.  See
         * Knuth, Section 6.4
         *
         * <span class="token keyword">@param</span> <span class="token parameter">staleSlot</span> index of slot known to have null key
         * <span class="token keyword">@return</span> the index of the next null slot after staleSlot
         * (all between staleSlot and this slot will have been checked
         * for expunging).
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * 不仅会删除传入的槽位上的 entry
         * 还会向后遍历，消除后面的槽位的 stale entry
         * 以及尽可能的使后面没 stale 的 entry，挪到更接近
         * k.threadLocalHashCode &amp; (len - 1) 算出来的值
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * 返回值是处理后第一个空槽的索引
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span><span class="token keyword">int</span> staleSlot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

            <span class="token comment">// expunge entry at staleSlot</span>
            <span class="token comment">// 先把当前传入的 stale entry 删除</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            size<span class="token operator">--</span><span class="token punctuation">;</span>

            <span class="token comment">// Rehash until we encounter null</span>
            <span class="token class-name">Entry</span> e<span class="token punctuation">;</span>
            <span class="token keyword">int</span> i<span class="token punctuation">;</span>
            <span class="token comment">// 向后遍历，直到 i 指向 null</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>staleSlot<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token punctuation">(</span>e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                 i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 发现 k 为 null 就 删除</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    size<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// k 不是 null 就再算一下 hash，</span>
                    <span class="token comment">// 看位置能不能调整到离真正的 hash 更近的位置</span>
                    <span class="token keyword">int</span> h <span class="token operator">=</span> k<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">!=</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

                        <span class="token comment">// Unlike Knuth 6.4 Algorithm R, we must scan until</span>
                        <span class="token comment">// null because multiple entries could have been stale.</span>
                        <span class="token comment">// 从真正的 hash 向后遍历，找到一个空位</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span>tab<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                            h <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        tab<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Heuristically scan some cells looking for stale entries.
         * This is invoked when either a new element is added, or
         * another stale one has been expunged. It performs a
         * logarithmic number of scans, as a balance between no
         * scanning (fast but retains garbage) and a number of scans
         * proportional to number of elements, that would find all
         * garbage but would cause some insertions to take O(n) time.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">i</span> a position known NOT to hold a stale entry. The
         *          scan starts at the element after i.
         * <span class="token keyword">@param</span> <span class="token parameter">n</span> scan control: <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token function">log2</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span></span></span><span class="token punctuation">}</span> cells are scanned,
         *          unless a stale entry is found, in which case
         *          <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token function">log2</span><span class="token punctuation">(</span>table<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span></span></span><span class="token punctuation">}</span> additional cells are scanned.
         *          When called from insertions, this parameter is the number
         *          of elements, but when from replaceStaleEntry, it is the
         *          table length. (Note: all this could be changed to be either
         *          more or less aggressive by weighting n instead of just
         *          using straight log n. But this version is simple, fast, and
         *          seems to work well.)
         * <span class="token keyword">@return</span> true if any stale entries have been removed.
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * 从 i 开始向后扫 log2(n) 次，如果发现 stale entry 会重置 n
         * 返回值是：是否删除了元素
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> removed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token keyword">do</span> <span class="token punctuation">{</span>
                i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Entry</span> e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 重置 n</span>
                    n <span class="token operator">=</span> len<span class="token punctuation">;</span>
                    removed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    i <span class="token operator">=</span> <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>n <span class="token operator">&gt;&gt;&gt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> removed<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Re-pack and/or re-size the table. First scan the entire
         * table removing stale entries. If this doesn&#39;t sufficiently
         * shrink the size of the table, double the table size.
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * 进到这里说明。size 已经大于阈值了
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">rehash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">expungeStaleEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Use lower threshold for doubling to avoid hysteresis</span>
            <span class="token comment">// 经过上面的函数之后，整个 tab 数组，没有 stale entry 了，</span>
            <span class="token comment">// 但是还有 null 槽</span>
            <span class="token comment">// 如果现在 tab 数组里的 entry 大于了 threshold 的 3/4，</span>
            <span class="token comment">// 说明单纯处理 stale entry 后，槽里面的元素还是很多，所以要扩容</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">&gt;=</span> threshold <span class="token operator">-</span> threshold <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">)</span>
                <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Double the capacity of the table.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> oldTab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> oldLen <span class="token operator">=</span> oldTab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token comment">// 直接 * 2</span>
            <span class="token keyword">int</span> newLen <span class="token operator">=</span> oldLen <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newTab <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span>newLen<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span> e <span class="token operator">:</span> oldTab<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 这里又判断了一次，k 是否为 null</span>
                    <span class="token comment">// 按理说 expungeStaleEntries 后，应该没有 stale entry 了</span>
                    <span class="token comment">// 可能是怕 expungeStaleEntries 和 resize 执行的间隙发生了 gc，把 k 回收了，</span>
                    <span class="token comment">// 这个说法先存疑</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// Help the GC</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 跟 expungeStaleEntry 类似</span>
                        <span class="token keyword">int</span> h <span class="token operator">=</span> k<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>newLen <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span>newTab<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                            h <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> newLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        newTab<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>
                        count<span class="token operator">++</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token function">setThreshold</span><span class="token punctuation">(</span>newLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
            size <span class="token operator">=</span> count<span class="token punctuation">;</span>
            table <span class="token operator">=</span> newTab<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Expunge all stale entries in the table.
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * 这个方法比较狠，所有的槽都统统遍历一遍，只要 e.get() 为空 就执行 expungeStaleEntry
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">expungeStaleEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">Entry</span> e <span class="token operator">=</span> tab<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2><p>给源码注释的时候也遇到了一些写的很好的博客：</p><ul><li>https://blog.csdn.net/anlian523/article/details/105523826</li><li>https://blog.csdn.net/weixin_30342639/article/details/108427230</li></ul>`,8),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","ThreadLocal 源码逐行注解.html.vue"]]);export{r as default};
