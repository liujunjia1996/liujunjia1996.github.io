import{_ as n,o as s,c as a,d as e}from"./app.d1650e38.js";const t={},p=e(`<h2 id="\u5199\u5728\u524D\u9762" tabindex="-1"><a class="header-anchor" href="#\u5199\u5728\u524D\u9762" aria-hidden="true">#</a> \u5199\u5728\u524D\u9762</h2><p>\u6700\u8FD1\u5728\u8BFB ThreadLocal \u7684\u6E90\u7801\uFF0C\u611F\u89C9 ThreadLocal \u8BBE\u8BA1\u7684\u8FD8\u662F\u5F88\u5DE7\u5999\u7684\uFF0C\u9996\u5148\u5B83\u5229\u7528\u4E86\u9B54\u6570\uFF0C\u5C3D\u91CF\u907F\u514D hash \u51B2\u7A81\uFF0C\u5176\u6B21\u5B83\u89E3\u51B3 hash \u51B2\u7A81\u7684\u65B9\u5F0F\u4E5F\u4E0D\u662F hashmap \u7684\u90A3\u79CD\u62C9\u94FE\u6CD5\uFF0C\u800C\u662F\u4F7F\u7528\u4E86\u5F00\u653E\u5730\u5740\u6CD5\uFF0C\u8FD8\u6709\uFF0C\u5B83\u7684 set/get \u751A\u81F3 remove \u65B9\u6CD5\u90FD\u5305\u542B\u4E86\u6E05\u7406 stale entry \u7684\u903B\u8F91\uFF0C\u8BBE\u8BA1\u8005\u771F\u662F\u4E3A\u4E86\u5185\u5B58\u6CC4\u6F0F\u64CD\u788E\u4E86\u5FC3\u554A\u3002</p><h2 id="\u6E90\u7801\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#\u6E90\u7801\u6CE8\u91CA" aria-hidden="true">#</a> \u6E90\u7801\u6CE8\u91CA</h2><p>\u4E0B\u9762\u662F\u6211\u81EA\u5DF1\u6CE8\u91CA\u7684\u5B8C\u6574 ThreadLocal \u7684\u6E90\u7801\uFF0C\u6765\u81EA openJdk 11.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">Copyright</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">1997</span><span class="token punctuation">,</span> <span class="token number">2013</span><span class="token punctuation">,</span> <span class="token class-name">Oracle</span> and<span class="token operator">/</span>or its <span class="token class-name"><span class="token namespace">affiliates<span class="token punctuation">.</span></span> All</span> rights reserved<span class="token punctuation">.</span>
 <span class="token operator">*</span> DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER<span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">This</span> code is free software<span class="token punctuation">;</span> you can redistribute it and<span class="token operator">/</span>or modify it
 <span class="token operator">*</span> under the terms of the GNU <span class="token class-name">General</span> <span class="token class-name">Public</span> <span class="token class-name">License</span> version <span class="token number">2</span> only<span class="token punctuation">,</span> as
 <span class="token operator">*</span> published by the <span class="token class-name">Free</span> <span class="token class-name">Software</span> <span class="token class-name">Foundation<span class="token punctuation">.</span>  Oracle</span> designates <span class="token keyword">this</span>
 <span class="token operator">*</span> particular file as subject <span class="token keyword">to</span> <span class="token namespace">the</span> <span class="token string">&quot;Classpath&quot;</span> exception as provided
 <span class="token operator">*</span> by <span class="token class-name">Oracle</span> in the LICENSE file that accompanied <span class="token keyword">this</span> code<span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">This</span> code is distributed in the hope that it will be useful<span class="token punctuation">,</span> but WITHOUT
 <span class="token operator">*</span> <span class="token class-name">ANY</span> WARRANTY<span class="token punctuation">;</span> without even the implied warranty of MERCHANTABILITY or
 <span class="token operator">*</span> FITNESS FOR <span class="token class-name">A</span> PARTICULAR <span class="token class-name">PURPOSE<span class="token punctuation">.</span>  See</span> the GNU <span class="token class-name">General</span> <span class="token class-name">Public</span> <span class="token class-name">License</span>
 <span class="token operator">*</span> version <span class="token number">2</span> <span class="token keyword">for</span> more details <span class="token punctuation">(</span>a copy is included in the LICENSE file that
 <span class="token operator">*</span> accompanied <span class="token keyword">this</span> code<span class="token punctuation">)</span><span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">You</span> should have received a copy of the GNU <span class="token class-name">General</span> <span class="token class-name">Public</span> <span class="token class-name">License</span> version
 <span class="token operator">*</span> <span class="token number">2</span> along <span class="token keyword">with</span> <span class="token keyword">this</span> work<span class="token punctuation">;</span> <span class="token keyword">if</span> not<span class="token punctuation">,</span> write <span class="token keyword">to</span> <span class="token namespace">the</span> <span class="token class-name">Free</span> <span class="token class-name">Software</span> <span class="token class-name">Foundation</span><span class="token punctuation">,</span>
 <span class="token operator">*</span> <span class="token class-name">Inc</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token number">51</span> <span class="token class-name">Franklin</span> <span class="token class-name">St</span><span class="token punctuation">,</span> <span class="token class-name">Fifth</span> <span class="token class-name">Floor</span><span class="token punctuation">,</span> <span class="token class-name">Boston</span><span class="token punctuation">,</span> MA <span class="token number">02110</span><span class="token operator">-</span><span class="token number">1301</span> USA<span class="token punctuation">.</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> <span class="token class-name">Please</span> contact <span class="token class-name">Oracle</span><span class="token punctuation">,</span> <span class="token number">500</span> <span class="token class-name">Oracle</span> <span class="token class-name">Parkway</span><span class="token punctuation">,</span> <span class="token class-name">Redwood</span> <span class="token class-name">Shores</span><span class="token punctuation">,</span> CA <span class="token number">94065</span> USA
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
     * \u6BCF new ThreadLocal \u7684\u5B9E\u4F8B\u90FD\u4F1A getAndAdd \u4E00\u4E2A\u9B54\u6570
     * \u9B54\u6570\u8981\u642D\u914D\u5BB9\u91CF\u662F 2 \u7684 n \u6B21\u65B9\u7684\u6570\u7EC4\u6548\u679C\u624D\u6BD4\u8F83\u597D
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> HASH_INCREMENT <span class="token operator">=</span> <span class="token number">0x61c88647</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns the next hash code.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">nextHashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> nextHashCode<span class="token punctuation">.</span><span class="token function">getAndAdd</span><span class="token punctuation">(</span>HASH_INCREMENT<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
     * \u9ED8\u8BA4\u7684\u521D\u59CB\u503C\u662F 0 \uFF0C\u53EF\u4EE5\u91CD\u5199\u8FD9\u4E2A\u65B9\u6CD5
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
     * \u60F0\u6027\u521D\u59CB\u5316\uFF0C\u7B2C\u4E00\u6B21 get \u6216 set \u7684\u65F6\u5019\u518D\u521D\u59CB\u5316 map
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
        <span class="token comment">// \u8D70\u5230\u8FD9\u6709\u53EF\u80FD\u662F</span>
        <span class="token comment">// 1. map \u4E3A null</span>
        <span class="token comment">// 2. map \u4E0D\u4E3A null\uFF0C\u4F46 entry \u4E3A null</span>
        <span class="token keyword">return</span> <span class="token function">setInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if there is a value in the current thread&#39;s copy of
     * this thread-local variable, even if that values is <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if current thread has associated value in this
     * thread-local variable; <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">false</span></span></span><span class="token punctuation">}</span> if not
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
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
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
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
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
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
     * \u5B9E\u9645\u4E0A\u662F\u5220\u9664 threadlocalMap \u4E0A\u67D0\u4E2A entry
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ThreadLocalMap</span> m <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u8C03\u7528 map \u81EA\u8EAB\u7684 remove \u65B9\u6CD5, \u4F20\u5165\u81EA\u8EAB\u7684\u5F15\u7528</span>
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
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> INITIAL_CAPACITY <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

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
            table <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span>INITIAL_CAPACITY<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> firstKey<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>INITIAL_CAPACITY <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            table<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>firstKey<span class="token punctuation">,</span> firstValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
            size <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token function">setThreshold</span><span class="token punctuation">(</span>INITIAL_CAPACITY<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
            <span class="token comment">// \u6CA1\u6709\u53D1\u73B0 hash \u51B2\u7A81</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> key<span class="token punctuation">)</span>
                <span class="token keyword">return</span> e<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token comment">// hash \u51B2\u7A81\u4E86\uFF0C\u7528\u5F00\u653E\u5730\u5740\u6CD5\u5BFB\u627E</span>
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

            <span class="token comment">// \u5C31\u7B97 hash \u51B2\u7A81 entry \u4E5F\u5E94\u8BE5\u662F\u8FDE\u7EED\u7684\uFF0C\u6240\u4EE5\u904D\u5386\u5230 entry \u4E3A null \u5C31\u53EF\u4EE5\u505C\u4E86\uFF0C</span>
            <span class="token comment">// \u540E\u9762\u7684\u4E0D\u7528\u627E\u4E86</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// \u627E\u5230\u4E86\u76F4\u63A5\u5C31\u8FD4\u56DE</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span>
                    <span class="token keyword">return</span> e<span class="token punctuation">;</span>
                <span class="token comment">// k \u662F null\uFF0C\u8BF4\u660E entry \u8FC7\u671F\u4E86\uFF0C\u8FDB\u884C\u56DE\u6536</span>
                <span class="token comment">// \u8FD9\u4E2A\u51FD\u6570\u4E0D\u4EC5\u4EC5\u53EA\u56DE\u6536\u8FD9\u4E00\u4E2A entry \uFF0C\u800C\u662F\u987A\u4FBF\u5411\u540E\u904D\u5386\uFF0C\u591A\u56DE\u6536\u51E0\u4E2A\u8FC7\u671F\u7684 entry</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// \u6267\u884C\u5230\u8FD9\u91CC\uFF0C\u8981\u4E48 entry \u7684\u4F4D\u7F6E\u6709\u53D8\u5316\uFF0C\u8981\u4E48 i \u6709\u53D8\u5316</span>
                <span class="token comment">// \u6240\u4EE5\u8BA1\u7B97\u51FA\u6765\u7684 e \u80AF\u5B9A\u548C\u4EE5\u524D\u7684\u4E0D\u4E00\u6837</span>
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
        <span class="token comment">// for (\u521D\u59CB\u6761\u4EF6; \u5FAA\u73AF\u68C0\u6D4B\u6761\u4EF6; \u6761\u4EF6\u66F4\u65B0\u8BED\u53E5) {</span>
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

                <span class="token comment">// \u627E\u5230\u91CD\u590D\u7684\u5C31\u76F4\u63A5\u8986\u76D6</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// \u503C\u4E3A null, \u8BF4\u660E\u8FC7\u671F\u4E86\uFF0C\u5269\u4E0B\u7684\u903B\u8F91\u5168\u90E8\u7531 replaceStaleEntry \u65B9\u6CD5\u5B9E\u73B0</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">replaceStaleEntry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u4E0A\u9762\u7684\u5FAA\u73AF\u6CA1\u53D1\u73B0\u91CD\u590D\u7684 \u6216 \u6CA1\u6709\u53D1\u73B0\u8FC7\u671F\u7684 entry</span>
            tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> sz <span class="token operator">=</span> <span class="token operator">++</span>size<span class="token punctuation">;</span>
            <span class="token comment">// \u4ECE i \u5411\u540E\u6E05\u7406\u4E00\u4E9B stale entry, \u5E76\u4E14\u5224\u65AD\u4E00\u4E0B\u5BB9\u91CF\u662F\u5426\u5927\u4E8E\u9608\u503C</span>
            <span class="token comment">// \u5982\u679C\u6CA1\u6709\u6E05\u7406\u6389 stale entry\uFF0Csz \u80AF\u5B9A\u4E0D\u4F1A\u6BD4\u9608\u503C\u5927\uFF0C\u6240\u4EE5\u7528\u77ED\u8DEF\u4E0E</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> sz<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> sz <span class="token operator">&gt;=</span> threshold<span class="token punctuation">)</span>
                <span class="token comment">// rehash \u8FD9\u4E2A\u51FD\u6570\u4E0D\u4EC5\u6709 rehash \u8FD8\u6709 resize \u7684\u903B\u8F91</span>
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
                    <span class="token comment">// \u56DE\u6536 k</span>
                    e<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// \u56DE\u6536 k \u4E4B\u540E\uFF0C\u5C31\u53D8\u6210 stale entry \u4E86, \u76F4\u63A5\u8C03 expungeStaleEntry\uFF0C</span>
                    <span class="token comment">// \u8FD8\u80FD\u987A\u4FBF\u5411\u540E\u6E05\u7406\u4E00\u4E0B\u5176\u4ED6 stale entry</span>
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
         * \u7A0D\u5FAE\u6709\u4E9B\u590D\u6742\uFF0C\u5148\u5411\u524D\u63A2\u6D4B\uFF0C\u518D\u5411\u540E\u63A2\u6D4B\uFF0CA run is a sequence of entries between two null slots
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
             * \u5927\u6982\u7684\u610F\u601D\u5C31\u662F\u8BF4\u8FD9\u6837\u53EF\u4EE5\u51CF\u5C11 rehash
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
                <span class="token comment">// \u627E\u5230\u4E86\u53EF\u4EE5\u8986\u76D6\u7684 entry</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>

                    tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>

                    <span class="token comment">// Start expunge at preceding stale entry if it exists</span>
                    <span class="token comment">// \u5982\u679C\u5148\u524D\u6CA1\u6709\u627E stale entry\uFF0C\u5C31\u4ECE\u5F53\u524D\u7684\u4F4D\u7F6E\u5F00\u59CB\u5904\u7406\u8FC7\u671F stale entry</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>slotToExpunge <span class="token operator">==</span> staleSlot<span class="token punctuation">)</span>
                        slotToExpunge <span class="token operator">=</span> i<span class="token punctuation">;</span>
                    <span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span><span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span>slotToExpunge<span class="token punctuation">)</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// If we didn&#39;t find stale entry on backward scan, the</span>
                <span class="token comment">// first stale entry seen while scanning for key is the</span>
                <span class="token comment">// first still present in the run.</span>
                <span class="token comment">// \u5982\u679C\u5148\u524D\u6CA1\u6709\u627E stale entry \uFF0C\u53CD\u800C\u662F\u5728\u540E\u9762\u627E\u5230\u4E86\uFF0C</span>
                <span class="token comment">// \u76F4\u63A5\u628A slotToExpunge \u66F4\u65B0\u4E3A\u540E\u9762\u7684\u7B2C\u4E00\u4E2A stale entry \u7684\u7D22\u5F15</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> slotToExpunge <span class="token operator">==</span> staleSlot<span class="token punctuation">)</span>
                    slotToExpunge <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// If key not found, put new entry in stale slot</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// If there are any other stale entries in run, expunge them</span>
            <span class="token comment">// \u5982\u679C slotToExpunge \u4E0D\u7B49\u4E8E staleSlot\uFF0C</span>
            <span class="token comment">// \u8BF4\u660E\u5728\u4E0A\u9762\u4E00\u7CFB\u5217\u903B\u8F91\u4E2D\u53D1\u73B0\u4E86 stale entry\uFF0C\u90A3\u5C31\u9700\u8981\u6E05\u7406\u4E00\u4E0B\u4E86</span>
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
         * \u4E0D\u4EC5\u4F1A\u5220\u9664\u4F20\u5165\u7684\u69FD\u4F4D\u4E0A\u7684 entry
         * \u8FD8\u4F1A\u5411\u540E\u904D\u5386\uFF0C\u6D88\u9664\u540E\u9762\u7684\u69FD\u4F4D\u7684 stale entry
         * \u4EE5\u53CA\u5C3D\u53EF\u80FD\u7684\u4F7F\u540E\u9762\u6CA1 stale \u7684 entry\uFF0C\u632A\u5230\u66F4\u63A5\u8FD1
         * k.threadLocalHashCode &amp; (len - 1) \u7B97\u51FA\u6765\u7684\u503C
         * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
         * \u8FD4\u56DE\u503C\u662F\u5904\u7406\u540E\u7B2C\u4E00\u4E2A\u7A7A\u69FD\u7684\u7D22\u5F15
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">expungeStaleEntry</span><span class="token punctuation">(</span><span class="token keyword">int</span> staleSlot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

            <span class="token comment">// expunge entry at staleSlot</span>
            <span class="token comment">// \u5148\u628A\u5F53\u524D\u4F20\u5165\u7684 stale entry \u5220\u9664</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            tab<span class="token punctuation">[</span>staleSlot<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            size<span class="token operator">--</span><span class="token punctuation">;</span>

            <span class="token comment">// Rehash until we encounter null</span>
            <span class="token class-name">Entry</span> e<span class="token punctuation">;</span>
            <span class="token keyword">int</span> i<span class="token punctuation">;</span>
            <span class="token comment">// \u5411\u540E\u904D\u5386\uFF0C\u76F4\u5230 i \u6307\u5411 null</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>staleSlot<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token punctuation">(</span>e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                 i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// \u53D1\u73B0 k \u4E3A null \u5C31 \u5220\u9664</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    size<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">// k \u4E0D\u662F null \u5C31\u518D\u7B97\u4E00\u4E0B hash\uFF0C</span>
                    <span class="token comment">// \u770B\u4F4D\u7F6E\u80FD\u4E0D\u80FD\u8C03\u6574\u5230\u79BB\u771F\u6B63\u7684 hash \u66F4\u8FD1\u7684\u4F4D\u7F6E</span>
                    <span class="token keyword">int</span> h <span class="token operator">=</span> k<span class="token punctuation">.</span>threadLocalHashCode <span class="token operator">&amp;</span> <span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">!=</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

                        <span class="token comment">// Unlike Knuth 6.4 Algorithm R, we must scan until</span>
                        <span class="token comment">// null because multiple entries could have been stale.</span>
                        <span class="token comment">// \u4ECE\u771F\u6B63\u7684 hash \u5411\u540E\u904D\u5386\uFF0C\u627E\u5230\u4E00\u4E2A\u7A7A\u4F4D</span>
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
         * \u4ECE i \u5F00\u59CB\u5411\u540E\u626B log2(n) \u6B21\uFF0C\u5982\u679C\u53D1\u73B0 stale entry \u4F1A\u91CD\u7F6E n
         * \u8FD4\u56DE\u503C\u662F\uFF1A\u662F\u5426\u5220\u9664\u4E86\u5143\u7D20
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">cleanSomeSlots</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> removed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> len <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token keyword">do</span> <span class="token punctuation">{</span>
                i <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Entry</span> e <span class="token operator">=</span> tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// \u91CD\u7F6E n</span>
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
         * \u8FDB\u5230\u8FD9\u91CC\u8BF4\u660E\u3002size \u5DF2\u7ECF\u5927\u4E8E\u9608\u503C\u4E86
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">rehash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">expungeStaleEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Use lower threshold for doubling to avoid hysteresis</span>
            <span class="token comment">// \u7ECF\u8FC7\u4E0A\u9762\u7684\u51FD\u6570\u4E4B\u540E\uFF0C\u6574\u4E2A tab \u6570\u7EC4\uFF0C\u6CA1\u6709 stale entry \u4E86\uFF0C</span>
            <span class="token comment">// \u4F46\u662F\u8FD8\u6709 null \u69FD</span>
            <span class="token comment">// \u5982\u679C\u73B0\u5728 tab \u6570\u7EC4\u91CC\u7684 entry \u5927\u4E8E\u4E86 threshold \u7684 3/4\uFF0C</span>
            <span class="token comment">// \u8BF4\u660E\u5355\u7EAF\u5904\u7406 stale entry \u540E\uFF0C\u69FD\u91CC\u9762\u7684\u5143\u7D20\u8FD8\u662F\u5F88\u591A\uFF0C\u6240\u4EE5\u8981\u6269\u5BB9</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">&gt;=</span> threshold <span class="token operator">-</span> threshold <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">)</span>
                <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * Double the capacity of the table.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> oldTab <span class="token operator">=</span> table<span class="token punctuation">;</span>
            <span class="token keyword">int</span> oldLen <span class="token operator">=</span> oldTab<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token comment">// \u76F4\u63A5 * 2</span>
            <span class="token keyword">int</span> newLen <span class="token operator">=</span> oldLen <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newTab <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Entry</span><span class="token punctuation">[</span>newLen<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span> e <span class="token operator">:</span> oldTab<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// \u8FD9\u91CC\u53C8\u5224\u65AD\u4E86\u4E00\u6B21\uFF0Ck \u662F\u5426\u4E3A null</span>
                    <span class="token comment">// \u6309\u7406\u8BF4 expungeStaleEntries \u540E\uFF0C\u5E94\u8BE5\u6CA1\u6709 stale entry \u4E86</span>
                    <span class="token comment">// \u53EF\u80FD\u662F\u6015 expungeStaleEntries \u548C resize \u6267\u884C\u7684\u95F4\u9699\u53D1\u751F\u4E86 gc\uFF0C\u628A k \u56DE\u6536\u4E86\uFF0C</span>
                    <span class="token comment">// \u8FD9\u4E2A\u8BF4\u6CD5\u5148\u5B58\u7591</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// Help the GC</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token comment">// \u8DDF expungeStaleEntry \u7C7B\u4F3C</span>
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
         * \u8FD9\u4E2A\u65B9\u6CD5\u6BD4\u8F83\u72E0\uFF0C\u6240\u6709\u7684\u69FD\u90FD\u7EDF\u7EDF\u904D\u5386\u4E00\u904D\uFF0C\u53EA\u8981 e.get() \u4E3A\u7A7A \u5C31\u6267\u884C expungeStaleEntry
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u94FE\u63A5" aria-hidden="true">#</a> \u53C2\u8003\u94FE\u63A5</h2><p>\u7ED9\u6E90\u7801\u6CE8\u91CA\u7684\u65F6\u5019\u4E5F\u9047\u5230\u4E86\u4E00\u4E9B\u5199\u7684\u5F88\u597D\u7684\u535A\u5BA2\uFF1A</p><ul><li>https://blog.csdn.net/anlian523/article/details/105523826</li><li>https://blog.csdn.net/weixin_30342639/article/details/108427230</li></ul>`,8),o=[p];function c(l,i){return s(),a("div",null,o)}var r=n(t,[["render",c],["__file","ThreadLocal \u6E90\u7801\u9010\u884C\u6CE8\u89E3.html.vue"]]);export{r as default};
