import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const a={},e=s(`<h2 id="\u5199\u5728\u524D\u9762" tabindex="-1"><a class="header-anchor" href="#\u5199\u5728\u524D\u9762" aria-hidden="true">#</a> \u5199\u5728\u524D\u9762</h2><p>\u6700\u8FD1\u5728\u8BFB ThreadLocal \u7684\u6E90\u7801\uFF0C\u611F\u89C9 ThreadLocal \u8BBE\u8BA1\u7684\u8FD8\u662F\u5F88\u5DE7\u5999\u7684\uFF0C\u9996\u5148\u5B83\u5229\u7528\u4E86\u9B54\u6570\uFF0C\u5C3D\u91CF\u907F\u514D hash \u51B2\u7A81\uFF0C\u5176\u6B21\u5B83\u89E3\u51B3 hash \u51B2\u7A81\u7684\u65B9\u5F0F\u4E5F\u4E0D\u662F hashmap \u7684\u90A3\u79CD\u62C9\u94FE\u6CD5\uFF0C\u800C\u662F\u4F7F\u7528\u4E86\u5F00\u653E\u5730\u5740\u6CD5\uFF0C\u8FD8\u6709\uFF0C\u5B83\u7684 set/get \u751A\u81F3 remove \u65B9\u6CD5\u90FD\u5305\u542B\u4E86\u6E05\u7406 stale entry \u7684\u903B\u8F91\uFF0C\u8BBE\u8BA1\u8005\u771F\u662F\u4E3A\u4E86\u5185\u5B58\u6CC4\u6F0F\u64CD\u788E\u4E86\u5FC3\u554A\u3002</p><h2 id="\u6E90\u7801\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#\u6E90\u7801\u6CE8\u91CA" aria-hidden="true">#</a> \u6E90\u7801\u6CE8\u91CA</h2><p>\u4E0B\u9762\u662F\u6211\u81EA\u5DF1\u6CE8\u91CA\u7684\u5B8C\u6574 ThreadLocal \u7684\u6E90\u7801\uFF0C\u6765\u81EA openJdk 11.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>*
 * Copyright (c) 1997, 2013, Oracle and/or its affiliates. All rights reserved.
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


import jdk.internal.misc.TerminatingThreadLocal;

import java.lang.ref.WeakReference;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;

/**
 * This class provides thread-local variables.  These variables differ from
 * their normal counterparts in that each thread that accesses one (via its
 * {@code get} or {@code set} method) has its own, independently initialized
 * copy of the variable.  {@code ThreadLocal} instances are typically private
 * static fields in classes that wish to associate state with a thread (e.g.,
 * a user ID or Transaction ID).
 *
 * &lt;p&gt; For example, the class below generates unique identifiers local to each
 * thread.
 * A thread&#39;s id is assigned the first time it invokes {@code ThreadId.get()}
 * and remains unchanged on subsequent calls.
 * &lt;pre&gt;
 * import java.util.concurrent.atomic.AtomicInteger;
 *
 * public class ThreadId {
 *     // Atomic integer containing the next thread ID to be assigned
 *     private static final AtomicInteger nextId = new AtomicInteger(0);
 *
 *     // Thread local variable containing each thread&#39;s ID
 *     private static final ThreadLocal&amp;lt; Integer&amp;gt; threadId =
 *         new ThreadLocal&amp;lt; Integer&amp;gt;() {
 *             &amp;#64; Override protected Integer initialValue() {
 *                 return nextId.getAndIncrement();
 *         }
 *     };
 *
 *     // Returns the current thread&#39;s unique ID, assigning it if necessary
 *     public static int get() {
 *         return threadId.get();
 *     }
 * }
 * &lt;/pre&gt;
 * &lt;p&gt; Each thread holds an implicit reference to its copy of a thread-local
 * variable as long as the thread is alive and the {@code ThreadLocal}
 * instance is accessible; after a thread goes away, all of its copies of
 * thread-local instances are subject to garbage collection (unless other
 * references to these copies exist).
 *
 * @author Josh Bloch and Doug Lea
 * @since 1.2
 */
public class ThreadLocal&lt;T&gt; {

    /**
     * ThreadLocals rely on per-thread linear-probe hash maps attached
     * to each thread (Thread.threadLocals and
     * inheritableThreadLocals).  The ThreadLocal objects act as keys,
     * searched via threadLocalHashCode.  This is a custom hash code
     * (useful only within ThreadLocalMaps) that eliminates collisions
     * in the common case where consecutively constructed ThreadLocals
     * are used by the same threads, while remaining well-behaved in
     * less common cases.
     */
    private final int threadLocalHashCode = nextHashCode();

    /**
     * The next hash code to be given out. Updated atomically. Starts at
     * zero.
     */
    private static AtomicInteger nextHashCode =
            new AtomicInteger();

    /**
     * The difference between successively generated hash codes - turns
     * implicit sequential thread-local IDs into near-optimally spread
     * multiplicative hash values for power-of-two-sized tables.
     * \u6BCF new ThreadLocal \u7684\u5B9E\u4F8B\u90FD\u4F1A getAndAdd \u4E00\u4E2A\u9B54\u6570
     * \u9B54\u6570\u8981\u642D\u914D\u5BB9\u91CF\u662F 2 \u7684 n \u6B21\u65B9\u7684\u6570\u7EC4\u6548\u679C\u624D\u6BD4\u8F83\u597D
     */
    private static final int HASH_INCREMENT = 0x61c88647;

    /**
     * Returns the next hash code.
     */
    private static int nextHashCode() {
        return nextHashCode.getAndAdd(HASH_INCREMENT);
    }

    /**
     * Returns the current thread&#39;s &quot;initial value&quot; for this
     * thread-local variable.  This method will be invoked the first
     * time a thread accesses the variable with the {@link #get}
     * method, unless the thread previously invoked the {@link #set}
     * method, in which case the {@code initialValue} method will not
     * be invoked for the thread.  Normally, this method is invoked at
     * most once per thread, but it may be invoked again in case of
     * subsequent invocations of {@link #remove} followed by {@link #get}.
     *
     * &lt;p&gt; This implementation simply returns {@code null}; if the
     * programmer desires thread-local variables to have an initial
     * value other than {@code null}, {@code ThreadLocal} must be
     * subclassed, and this method overridden.  Typically, an
     * anonymous inner class will be used.
     *
     * @return the initial value for this thread-local
     * \u9ED8\u8BA4\u7684\u521D\u59CB\u503C\u662F 0 \uFF0C\u53EF\u4EE5\u91CD\u5199\u8FD9\u4E2A\u65B9\u6CD5
     */
    protected T initialValue() {
        return null;
    }

    /**
     * Creates a thread local variable. The initial value of the variable is
     * determined by invoking the {@code get} method on the {@code Supplier}.
     *
     * @param &lt;S&gt;      the type of the thread local&#39;s value
     * @param supplier the supplier to be used to determine the initial value
     * @return a new thread local variable
     * @throws NullPointerException if the specified supplier is null
     * @since 1.8
     */
    public static &lt;S&gt; ThreadLocal&lt;S&gt; withInitial(Supplier&lt;? extends S&gt; supplier) {
        return new SuppliedThreadLocal&lt;&gt;(supplier);
    }

    /**
     * Creates a thread local variable.
     *
     * @see #withInitial(java.util.function.Supplier)
     * \u60F0\u6027\u521D\u59CB\u5316\uFF0C\u7B2C\u4E00\u6B21 get \u6216 set \u7684\u65F6\u5019\u518D\u521D\u59CB\u5316 map
     */
    public ThreadLocal() {
    }

    /**
     * Returns the value in the current thread&#39;s copy of this
     * thread-local variable.  If the variable has no value for the
     * current thread, it is first initialized to the value returned
     * by an invocation of the {@link #initialValue} method.
     *
     * @return the current thread&#39;s value of this thread-local
     */
    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings(&quot;unchecked&quot;)
                T result = (T) e.value;
                return result;
            }
        }
        // \u8D70\u5230\u8FD9\u6709\u53EF\u80FD\u662F
        // 1. map \u4E3A null
        // 2. map \u4E0D\u4E3A null\uFF0C\u4F46 entry \u4E3A null
        return setInitialValue();
    }

    /**
     * Returns {@code true} if there is a value in the current thread&#39;s copy of
     * this thread-local variable, even if that values is {@code null}.
     *
     * @return {@code true} if current thread has associated value in this
     * thread-local variable; {@code false} if not
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
     */
    boolean isPresent() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        return map != null &amp;&amp; map.getEntry(this) != null;
    }

    /**
     * Variant of set() to establish initialValue. Used instead
     * of set() in case user has overridden the set() method.
     *
     * @return the initial value
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
     */
    private T setInitialValue() {
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            map.set(this, value);
        } else {
            createMap(t, value);
        }
        if (this instanceof TerminatingThreadLocal) {
            TerminatingThreadLocal.register((TerminatingThreadLocal&lt;?&gt;) this);
        }
        return value;
    }

    /**
     * Sets the current thread&#39;s copy of this thread-local variable
     * to the specified value.  Most subclasses will have no need to
     * override this method, relying solely on the {@link #initialValue}
     * method to set the values of thread-locals.
     *
     * @param value the value to be stored in the current thread&#39;s copy of
     *              this thread-local.
     *
     * \u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684
     */
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            map.set(this, value);
        } else {
            createMap(t, value);
        }
    }

    /**
     * Removes the current thread&#39;s value for this thread-local
     * variable.  If this thread-local variable is subsequently
     * {@linkplain #get read} by the current thread, its value will be
     * reinitialized by invoking its {@link #initialValue} method,
     * unless its value is {@linkplain #set set} by the current thread
     * in the interim.  This may result in multiple invocations of the
     * {@code initialValue} method in the current thread.
     *
     * @since 1.5
     * &lt;p&gt;
     * \u5B9E\u9645\u4E0A\u662F\u5220\u9664 threadlocalMap \u4E0A\u67D0\u4E2A entry
     */
    public void remove() {
        ThreadLocalMap m = getMap(Thread.currentThread());
        if (m != null) {
            // \u8C03\u7528 map \u81EA\u8EAB\u7684 remove \u65B9\u6CD5, \u4F20\u5165\u81EA\u8EAB\u7684\u5F15\u7528
            m.remove(this);
        }
    }

    /**
     * Get the map associated with a ThreadLocal. Overridden in
     * InheritableThreadLocal.
     *
     * @param t the current thread
     * @return the map
     */
    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }

    /**
     * Create the map associated with a ThreadLocal. Overridden in
     * InheritableThreadLocal.
     *
     * @param t          the current thread
     * @param firstValue value for the initial entry of the map
     */
    void createMap(Thread t, T firstValue) {
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }

    /**
     * Factory method to create map of inherited thread locals.
     * Designed to be called only from Thread constructor.
     *
     * @param parentMap the map associated with parent thread
     * @return a map containing the parent&#39;s inheritable bindings
     */
    static ThreadLocalMap createInheritedMap(ThreadLocalMap parentMap) {
        return new ThreadLocalMap(parentMap);
    }

    /**
     * Method childValue is visibly defined in subclass
     * InheritableThreadLocal, but is internally defined here for the
     * sake of providing createInheritedMap factory method without
     * needing to subclass the map class in InheritableThreadLocal.
     * This technique is preferable to the alternative of embedding
     * instanceof tests in methods.
     */
    T childValue(T parentValue) {
        throw new UnsupportedOperationException();
    }

    /**
     * An extension of ThreadLocal that obtains its initial value from
     * the specified {@code Supplier}.
     */
    static final class SuppliedThreadLocal&lt;T&gt; extends ThreadLocal&lt;T&gt; {

        private final Supplier&lt;? extends T&gt; supplier;

        SuppliedThreadLocal(Supplier&lt;? extends T&gt; supplier) {
            this.supplier = Objects.requireNonNull(supplier);
        }

        @Override
        protected T initialValue() {
            return supplier.get();
        }

    }

    /**
     * ThreadLocalMap is a customized hash map suitable only for
     * maintaining thread local values. No operations are exported
     * outside of the ThreadLocal class. The class is package private to
     * allow declaration of fields in class Thread.  To help deal with
     * very large and long-lived usages, the hash table entries use
     * WeakReferences for keys. However, since reference queues are not
     * used, stale entries are guaranteed to be removed only when
     * the table starts running out of space.
     */
    static class ThreadLocalMap {

        /**
         * The entries in this hash map extend WeakReference, using
         * its main ref field as the key (which is always a
         * ThreadLocal object).  Note that null keys (i.e. entry.get()
         * == null) mean that the key is no longer referenced, so the
         * entry can be expunged from table.  Such entries are referred to
         * as &quot;stale entries&quot; in the code that follows.
         */
        static class Entry extends WeakReference&lt;ThreadLocal&lt;?&gt;&gt; {

            /**
             * The value associated with this ThreadLocal.
             */
            Object value;

            Entry(ThreadLocal&lt;?&gt; k, Object v) {
                super(k);
                value = v;
            }

        }

        /**
         * The initial capacity -- MUST be a power of two.
         */
        private static final int INITIAL_CAPACITY = 16;

        /**
         * The table, resized as necessary.
         * table.length MUST always be a power of two.
         */
        private Entry[] table;

        /**
         * The number of entries in the table.
         */
        private int size = 0;

        /**
         * The next size value at which to resize.
         */
        private int threshold; // Default to 0

        /**
         * Set the resize threshold to maintain at worst a 2/3 load factor.
         */
        private void setThreshold(int len) {
            threshold = len * 2 / 3;
        }

        /**
         * Increment i modulo len.
         */
        private static int nextIndex(int i, int len) {
            return ((i + 1 &lt; len) ? i + 1 : 0);
        }

        /**
         * Decrement i modulo len.
         */
        private static int prevIndex(int i, int len) {
            return ((i - 1 &gt;= 0) ? i - 1 : len - 1);
        }

        /**
         * Construct a new map initially containing (firstKey, firstValue).
         * ThreadLocalMaps are constructed lazily, so we only create
         * one when we have at least one entry to put in it.
         */
        ThreadLocalMap(ThreadLocal&lt;?&gt; firstKey, Object firstValue) {
            table = new Entry[INITIAL_CAPACITY];
            int i = firstKey.threadLocalHashCode &amp; (INITIAL_CAPACITY - 1);
            table[i] = new Entry(firstKey, firstValue);
            size = 1;
            setThreshold(INITIAL_CAPACITY);
        }

        /**
         * Construct a new map including all Inheritable ThreadLocals
         * from given parent map. Called only by createInheritedMap.
         *
         * @param parentMap the map associated with parent thread.
         */
        private ThreadLocalMap(ThreadLocalMap parentMap) {
            Entry[] parentTable = parentMap.table;
            int len = parentTable.length;
            setThreshold(len);
            table = new Entry[len];

            for (Entry e : parentTable) {
                if (e != null) {
                    @SuppressWarnings(&quot;unchecked&quot;)
                    ThreadLocal&lt;Object&gt; key = (ThreadLocal&lt;Object&gt;) e.get();
                    if (key != null) {
                        Object value = key.childValue(e.value);
                        Entry c = new Entry(key, value);
                        int h = key.threadLocalHashCode &amp; (len - 1);
                        while (table[h] != null)
                            h = nextIndex(h, len);
                        table[h] = c;
                        size++;
                    }
                }
            }
        }

        /**
         * Get the entry associated with key.  This method
         * itself handles only the fast path: a direct hit of existing
         * key. It otherwise relays to getEntryAfterMiss.  This is
         * designed to maximize performance for direct hits, in part
         * by making this method readily inlinable.
         *
         * @param key the thread local object
         * @return the entry associated with key, or null if no such
         */
        private Entry getEntry(ThreadLocal&lt;?&gt; key) {
            int i = key.threadLocalHashCode &amp; (table.length - 1);
            Entry e = table[i];
            // \u6CA1\u6709\u53D1\u73B0 hash \u51B2\u7A81
            if (e != null &amp;&amp; e.get() == key)
                return e;
            else
                // hash \u51B2\u7A81\u4E86\uFF0C\u7528\u5F00\u653E\u5730\u5740\u6CD5\u5BFB\u627E
                return getEntryAfterMiss(key, i, e);
        }

        /**
         * Version of getEntry method for use when key is not found in
         * its direct hash slot.
         *
         * @param key the thread local object
         * @param i   the table index for key&#39;s hash code
         * @param e   the entry at table [i]
         * @return the entry associated with key, or null if no such
         */
        private Entry getEntryAfterMiss(ThreadLocal&lt;?&gt; key, int i, Entry e) {
            Entry[] tab = table;
            int len = tab.length;

            // \u5C31\u7B97 hash \u51B2\u7A81 entry \u4E5F\u5E94\u8BE5\u662F\u8FDE\u7EED\u7684\uFF0C\u6240\u4EE5\u904D\u5386\u5230 entry \u4E3A null \u5C31\u53EF\u4EE5\u505C\u4E86\uFF0C
            // \u540E\u9762\u7684\u4E0D\u7528\u627E\u4E86
            while (e != null) {
                ThreadLocal&lt;?&gt; k = e.get();
                // \u627E\u5230\u4E86\u76F4\u63A5\u5C31\u8FD4\u56DE
                if (k == key)
                    return e;
                // k \u662F null\uFF0C\u8BF4\u660E entry \u8FC7\u671F\u4E86\uFF0C\u8FDB\u884C\u56DE\u6536
                // \u8FD9\u4E2A\u51FD\u6570\u4E0D\u4EC5\u4EC5\u53EA\u56DE\u6536\u8FD9\u4E00\u4E2A entry \uFF0C\u800C\u662F\u987A\u4FBF\u5411\u540E\u904D\u5386\uFF0C\u591A\u56DE\u6536\u51E0\u4E2A\u8FC7\u671F\u7684 entry
                if (k == null)
                    expungeStaleEntry(i);
                else
                    i = nextIndex(i, len);
                // \u6267\u884C\u5230\u8FD9\u91CC\uFF0C\u8981\u4E48 entry \u7684\u4F4D\u7F6E\u6709\u53D8\u5316\uFF0C\u8981\u4E48 i \u6709\u53D8\u5316
                // \u6240\u4EE5\u8BA1\u7B97\u51FA\u6765\u7684 e \u80AF\u5B9A\u548C\u4EE5\u524D\u7684\u4E0D\u4E00\u6837
                e = tab[i];
            }
            return null;
        }

        /**
         * Set the value associated with key.
         *
         * @param key   the thread local object
         * @param value the value to be set
         */
        // for (\u521D\u59CB\u6761\u4EF6; \u5FAA\u73AF\u68C0\u6D4B\u6761\u4EF6; \u6761\u4EF6\u66F4\u65B0\u8BED\u53E5) {
        private void set(ThreadLocal&lt;?&gt; key, Object value) {

            // We don&#39;t use a fast path as with get() because it is at
            // least as common to use set() to create new entries as
            // it is to replace existing ones, in which case, a fast
            // path would fail more often than not.

            Entry[] tab = table;
            int len = tab.length;
            int i = key.threadLocalHashCode &amp; (len - 1);

            for (Entry e = tab[i];
                 e != null;
                 e = tab[i = nextIndex(i, len)]) {
                ThreadLocal&lt;?&gt; k = e.get();

                // \u627E\u5230\u91CD\u590D\u7684\u5C31\u76F4\u63A5\u8986\u76D6
                if (k == key) {
                    e.value = value;
                    return;
                }

                // \u503C\u4E3A null, \u8BF4\u660E\u8FC7\u671F\u4E86\uFF0C\u5269\u4E0B\u7684\u903B\u8F91\u5168\u90E8\u7531 replaceStaleEntry \u65B9\u6CD5\u5B9E\u73B0
                if (k == null) {
                    replaceStaleEntry(key, value, i);
                    return;
                }
            }
            // \u4E0A\u9762\u7684\u5FAA\u73AF\u6CA1\u53D1\u73B0\u91CD\u590D\u7684 \u6216 \u6CA1\u6709\u53D1\u73B0\u8FC7\u671F\u7684 entry
            tab[i] = new Entry(key, value);
            int sz = ++size;
            // \u4ECE i \u5411\u540E\u6E05\u7406\u4E00\u4E9B stale entry, \u5E76\u4E14\u5224\u65AD\u4E00\u4E0B\u5BB9\u91CF\u662F\u5426\u5927\u4E8E\u9608\u503C
            // \u5982\u679C\u6CA1\u6709\u6E05\u7406\u6389 stale entry\uFF0Csz \u80AF\u5B9A\u4E0D\u4F1A\u6BD4\u9608\u503C\u5927\uFF0C\u6240\u4EE5\u7528\u77ED\u8DEF\u4E0E
            if (!cleanSomeSlots(i, sz) &amp;&amp; sz &gt;= threshold)
                // rehash \u8FD9\u4E2A\u51FD\u6570\u4E0D\u4EC5\u6709 rehash \u8FD8\u6709 resize \u7684\u903B\u8F91
                rehash();
        }

        /**
         * Remove the entry for key.
         */
        private void remove(ThreadLocal&lt;?&gt; key) {
            Entry[] tab = table;
            int len = tab.length;
            int i = key.threadLocalHashCode &amp; (len - 1);
            for (Entry e = tab[i];
                 e != null;
                 e = tab[i = nextIndex(i, len)]) {
                if (e.get() == key) {
                    // \u56DE\u6536 k
                    e.clear();
                    // \u56DE\u6536 k \u4E4B\u540E\uFF0C\u5C31\u53D8\u6210 stale entry \u4E86, \u76F4\u63A5\u8C03 expungeStaleEntry\uFF0C
                    // \u8FD8\u80FD\u987A\u4FBF\u5411\u540E\u6E05\u7406\u4E00\u4E0B\u5176\u4ED6 stale entry
                    expungeStaleEntry(i);
                    return;
                }
            }
        }

        /**
         * Replace a stale entry encountered during a set operation
         * with an entry for the specified key.  The value passed in
         * the value parameter is stored in the entry, whether or not
         * an entry already exists for the specified key.
         * &lt;p&gt;
         * As a side effect, this method expunges all stale entries in the
         * &quot;run&quot; containing the stale entry.  (A run is a sequence of entries
         * between two null slots.)
         *
         * @param key       the key
         * @param value     the value to be associated with key
         * @param staleSlot index of the first stale entry encountered while
         *                  searching for key.
         *
         * \u7A0D\u5FAE\u6709\u4E9B\u590D\u6742\uFF0C\u5148\u5411\u524D\u63A2\u6D4B\uFF0C\u518D\u5411\u540E\u63A2\u6D4B\uFF0CA run is a sequence of entries between two null slots
         */
        private void replaceStaleEntry(ThreadLocal&lt;?&gt; key, Object value,
                                       int staleSlot) {
            Entry[] tab = table;
            int len = tab.length;
            Entry e;

            /**
             * Back up to check for prior stale entry in current run.
             * We clean out whole runs at a time to avoid continual incremental rehashing
             * due to garbage collector freeing up refs in bunches
             * \u5927\u6982\u7684\u610F\u601D\u5C31\u662F\u8BF4\u8FD9\u6837\u53EF\u4EE5\u51CF\u5C11 rehash
             */
            int slotToExpunge = staleSlot;
            for (int i = prevIndex(staleSlot, len);
                 (e = tab[i]) != null;
                 i = prevIndex(i, len))
                if (e.get() == null)
                    slotToExpunge = i;

            // Find either the key or trailing null slot of run, whichever
            // occurs first
            for (int i = nextIndex(staleSlot, len);
                 (e = tab[i]) != null;
                 i = nextIndex(i, len)) {
                ThreadLocal&lt;?&gt; k = e.get();

                // If we find key, then we need to swap it
                // with the stale entry to maintain hash table order.
                // The newly stale slot, or any other stale slot
                // encountered above it, can then be sent to expungeStaleEntry
                // to remove or rehash all of the other entries in run.
                // \u627E\u5230\u4E86\u53EF\u4EE5\u8986\u76D6\u7684 entry
                if (k == key) {
                    e.value = value;

                    tab[i] = tab[staleSlot];
                    tab[staleSlot] = e;

                    // Start expunge at preceding stale entry if it exists
                    // \u5982\u679C\u5148\u524D\u6CA1\u6709\u627E stale entry\uFF0C\u5C31\u4ECE\u5F53\u524D\u7684\u4F4D\u7F6E\u5F00\u59CB\u5904\u7406\u8FC7\u671F stale entry
                    if (slotToExpunge == staleSlot)
                        slotToExpunge = i;
                    cleanSomeSlots(expungeStaleEntry(slotToExpunge), len);
                    return;
                }

                // If we didn&#39;t find stale entry on backward scan, the
                // first stale entry seen while scanning for key is the
                // first still present in the run.
                // \u5982\u679C\u5148\u524D\u6CA1\u6709\u627E stale entry \uFF0C\u53CD\u800C\u662F\u5728\u540E\u9762\u627E\u5230\u4E86\uFF0C
                // \u76F4\u63A5\u628A slotToExpunge \u66F4\u65B0\u4E3A\u540E\u9762\u7684\u7B2C\u4E00\u4E2A stale entry \u7684\u7D22\u5F15
                if (k == null &amp;&amp; slotToExpunge == staleSlot)
                    slotToExpunge = i;
            }

            // If key not found, put new entry in stale slot
            tab[staleSlot].value = null;
            tab[staleSlot] = new Entry(key, value);

            // If there are any other stale entries in run, expunge them
            // \u5982\u679C slotToExpunge \u4E0D\u7B49\u4E8E staleSlot\uFF0C
            // \u8BF4\u660E\u5728\u4E0A\u9762\u4E00\u7CFB\u5217\u903B\u8F91\u4E2D\u53D1\u73B0\u4E86 stale entry\uFF0C\u90A3\u5C31\u9700\u8981\u6E05\u7406\u4E00\u4E0B\u4E86
            if (slotToExpunge != staleSlot)
                cleanSomeSlots(expungeStaleEntry(slotToExpunge), len);
        }

        /**
         * Expunge a stale entry by rehashing any possibly colliding entries
         * lying between staleSlot and the next null slot.  This also expunges
         * any other stale entries encountered before the trailing null.  See
         * Knuth, Section 6.4
         *
         * @param staleSlot index of slot known to have null key
         * @return the index of the next null slot after staleSlot
         * (all between staleSlot and this slot will have been checked
         * for expunging).
         * &lt;p&gt;
         * \u4E0D\u4EC5\u4F1A\u5220\u9664\u4F20\u5165\u7684\u69FD\u4F4D\u4E0A\u7684 entry
         * \u8FD8\u4F1A\u5411\u540E\u904D\u5386\uFF0C\u6D88\u9664\u540E\u9762\u7684\u69FD\u4F4D\u7684 stale entry
         * \u4EE5\u53CA\u5C3D\u53EF\u80FD\u7684\u4F7F\u540E\u9762\u6CA1 stale \u7684 entry\uFF0C\u632A\u5230\u66F4\u63A5\u8FD1
         * k.threadLocalHashCode &amp; (len - 1) \u7B97\u51FA\u6765\u7684\u503C
         * &lt;p&gt;
         * \u8FD4\u56DE\u503C\u662F\u5904\u7406\u540E\u7B2C\u4E00\u4E2A\u7A7A\u69FD\u7684\u7D22\u5F15
         */
        private int expungeStaleEntry(int staleSlot) {
            Entry[] tab = table;
            int len = tab.length;

            // expunge entry at staleSlot
            // \u5148\u628A\u5F53\u524D\u4F20\u5165\u7684 stale entry \u5220\u9664
            tab[staleSlot].value = null;
            tab[staleSlot] = null;
            size--;

            // Rehash until we encounter null
            Entry e;
            int i;
            // \u5411\u540E\u904D\u5386\uFF0C\u76F4\u5230 i \u6307\u5411 null
            for (i = nextIndex(staleSlot, len);
                 (e = tab[i]) != null;
                 i = nextIndex(i, len)) {
                ThreadLocal&lt;?&gt; k = e.get();
                // \u53D1\u73B0 k \u4E3A null \u5C31 \u5220\u9664
                if (k == null) {
                    e.value = null;
                    tab[i] = null;
                    size--;
                } else {
                    // k \u4E0D\u662F null \u5C31\u518D\u7B97\u4E00\u4E0B hash\uFF0C
                    // \u770B\u4F4D\u7F6E\u80FD\u4E0D\u80FD\u8C03\u6574\u5230\u79BB\u771F\u6B63\u7684 hash \u66F4\u8FD1\u7684\u4F4D\u7F6E
                    int h = k.threadLocalHashCode &amp; (len - 1);
                    if (h != i) {
                        tab[i] = null;

                        // Unlike Knuth 6.4 Algorithm R, we must scan until
                        // null because multiple entries could have been stale.
                        // \u4ECE\u771F\u6B63\u7684 hash \u5411\u540E\u904D\u5386\uFF0C\u627E\u5230\u4E00\u4E2A\u7A7A\u4F4D
                        while (tab[h] != null)
                            h = nextIndex(h, len);
                        tab[h] = e;
                    }
                }
            }
            return i;
        }

        /**
         * Heuristically scan some cells looking for stale entries.
         * This is invoked when either a new element is added, or
         * another stale one has been expunged. It performs a
         * logarithmic number of scans, as a balance between no
         * scanning (fast but retains garbage) and a number of scans
         * proportional to number of elements, that would find all
         * garbage but would cause some insertions to take O(n) time.
         *
         * @param i a position known NOT to hold a stale entry. The
         *          scan starts at the element after i.
         * @param n scan control: {@code log2(n)} cells are scanned,
         *          unless a stale entry is found, in which case
         *          {@code log2(table.length)-1} additional cells are scanned.
         *          When called from insertions, this parameter is the number
         *          of elements, but when from replaceStaleEntry, it is the
         *          table length. (Note: all this could be changed to be either
         *          more or less aggressive by weighting n instead of just
         *          using straight log n. But this version is simple, fast, and
         *          seems to work well.)
         * @return true if any stale entries have been removed.
         * &lt;p&gt;
         * \u4ECE i \u5F00\u59CB\u5411\u540E\u626B log2(n) \u6B21\uFF0C\u5982\u679C\u53D1\u73B0 stale entry \u4F1A\u91CD\u7F6E n
         * \u8FD4\u56DE\u503C\u662F\uFF1A\u662F\u5426\u5220\u9664\u4E86\u5143\u7D20
         */
        private boolean cleanSomeSlots(int i, int n) {
            boolean removed = false;
            Entry[] tab = table;
            int len = tab.length;
            do {
                i = nextIndex(i, len);
                Entry e = tab[i];
                if (e != null &amp;&amp; e.get() == null) {
                    // \u91CD\u7F6E n
                    n = len;
                    removed = true;
                    i = expungeStaleEntry(i);
                }
            } while ((n &gt;&gt;&gt;= 1) != 0);
            return removed;
        }

        /**
         * Re-pack and/or re-size the table. First scan the entire
         * table removing stale entries. If this doesn&#39;t sufficiently
         * shrink the size of the table, double the table size.
         * &lt;p&gt;
         * \u8FDB\u5230\u8FD9\u91CC\u8BF4\u660E\u3002size \u5DF2\u7ECF\u5927\u4E8E\u9608\u503C\u4E86
         */
        private void rehash() {
            expungeStaleEntries();

            // Use lower threshold for doubling to avoid hysteresis
            // \u7ECF\u8FC7\u4E0A\u9762\u7684\u51FD\u6570\u4E4B\u540E\uFF0C\u6574\u4E2A tab \u6570\u7EC4\uFF0C\u6CA1\u6709 stale entry \u4E86\uFF0C
            // \u4F46\u662F\u8FD8\u6709 null \u69FD
            // \u5982\u679C\u73B0\u5728 tab \u6570\u7EC4\u91CC\u7684 entry \u5927\u4E8E\u4E86 threshold \u7684 3/4\uFF0C
            // \u8BF4\u660E\u5355\u7EAF\u5904\u7406 stale entry \u540E\uFF0C\u69FD\u91CC\u9762\u7684\u5143\u7D20\u8FD8\u662F\u5F88\u591A\uFF0C\u6240\u4EE5\u8981\u6269\u5BB9
            if (size &gt;= threshold - threshold / 4)
                resize();
        }

        /**
         * Double the capacity of the table.
         */
        private void resize() {
            Entry[] oldTab = table;
            int oldLen = oldTab.length;
            // \u76F4\u63A5 * 2
            int newLen = oldLen * 2;
            Entry[] newTab = new Entry[newLen];
            int count = 0;

            for (Entry e : oldTab) {
                if (e != null) {
                    ThreadLocal&lt;?&gt; k = e.get();
                    // \u8FD9\u91CC\u53C8\u5224\u65AD\u4E86\u4E00\u6B21\uFF0Ck \u662F\u5426\u4E3A null
                    // \u6309\u7406\u8BF4 expungeStaleEntries \u540E\uFF0C\u5E94\u8BE5\u6CA1\u6709 stale entry \u4E86
                    // \u53EF\u80FD\u662F\u6015 expungeStaleEntries \u548C resize \u6267\u884C\u7684\u95F4\u9699\u53D1\u751F\u4E86 gc\uFF0C\u628A k \u56DE\u6536\u4E86\uFF0C
                    // \u8FD9\u4E2A\u8BF4\u6CD5\u5148\u5B58\u7591
                    if (k == null) {
                        e.value = null; // Help the GC
                    } else {
                        // \u8DDF expungeStaleEntry \u7C7B\u4F3C
                        int h = k.threadLocalHashCode &amp; (newLen - 1);
                        while (newTab[h] != null)
                            h = nextIndex(h, newLen);
                        newTab[h] = e;
                        count++;
                    }
                }
            }

            setThreshold(newLen);
            size = count;
            table = newTab;
        }

        /**
         * Expunge all stale entries in the table.
         * &lt;p&gt;
         * \u8FD9\u4E2A\u65B9\u6CD5\u6BD4\u8F83\u72E0\uFF0C\u6240\u6709\u7684\u69FD\u90FD\u7EDF\u7EDF\u904D\u5386\u4E00\u904D\uFF0C\u53EA\u8981 e.get() \u4E3A\u7A7A \u5C31\u6267\u884C expungeStaleEntry
         */
        private void expungeStaleEntries() {
            Entry[] tab = table;
            int len = tab.length;
            for (int j = 0; j &lt; len; j++) {
                Entry e = tab[j];
                if (e != null &amp;&amp; e.get() == null)
                    expungeStaleEntry(j);
            }
        }

    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br><span class="line-number">327</span><br><span class="line-number">328</span><br><span class="line-number">329</span><br><span class="line-number">330</span><br><span class="line-number">331</span><br><span class="line-number">332</span><br><span class="line-number">333</span><br><span class="line-number">334</span><br><span class="line-number">335</span><br><span class="line-number">336</span><br><span class="line-number">337</span><br><span class="line-number">338</span><br><span class="line-number">339</span><br><span class="line-number">340</span><br><span class="line-number">341</span><br><span class="line-number">342</span><br><span class="line-number">343</span><br><span class="line-number">344</span><br><span class="line-number">345</span><br><span class="line-number">346</span><br><span class="line-number">347</span><br><span class="line-number">348</span><br><span class="line-number">349</span><br><span class="line-number">350</span><br><span class="line-number">351</span><br><span class="line-number">352</span><br><span class="line-number">353</span><br><span class="line-number">354</span><br><span class="line-number">355</span><br><span class="line-number">356</span><br><span class="line-number">357</span><br><span class="line-number">358</span><br><span class="line-number">359</span><br><span class="line-number">360</span><br><span class="line-number">361</span><br><span class="line-number">362</span><br><span class="line-number">363</span><br><span class="line-number">364</span><br><span class="line-number">365</span><br><span class="line-number">366</span><br><span class="line-number">367</span><br><span class="line-number">368</span><br><span class="line-number">369</span><br><span class="line-number">370</span><br><span class="line-number">371</span><br><span class="line-number">372</span><br><span class="line-number">373</span><br><span class="line-number">374</span><br><span class="line-number">375</span><br><span class="line-number">376</span><br><span class="line-number">377</span><br><span class="line-number">378</span><br><span class="line-number">379</span><br><span class="line-number">380</span><br><span class="line-number">381</span><br><span class="line-number">382</span><br><span class="line-number">383</span><br><span class="line-number">384</span><br><span class="line-number">385</span><br><span class="line-number">386</span><br><span class="line-number">387</span><br><span class="line-number">388</span><br><span class="line-number">389</span><br><span class="line-number">390</span><br><span class="line-number">391</span><br><span class="line-number">392</span><br><span class="line-number">393</span><br><span class="line-number">394</span><br><span class="line-number">395</span><br><span class="line-number">396</span><br><span class="line-number">397</span><br><span class="line-number">398</span><br><span class="line-number">399</span><br><span class="line-number">400</span><br><span class="line-number">401</span><br><span class="line-number">402</span><br><span class="line-number">403</span><br><span class="line-number">404</span><br><span class="line-number">405</span><br><span class="line-number">406</span><br><span class="line-number">407</span><br><span class="line-number">408</span><br><span class="line-number">409</span><br><span class="line-number">410</span><br><span class="line-number">411</span><br><span class="line-number">412</span><br><span class="line-number">413</span><br><span class="line-number">414</span><br><span class="line-number">415</span><br><span class="line-number">416</span><br><span class="line-number">417</span><br><span class="line-number">418</span><br><span class="line-number">419</span><br><span class="line-number">420</span><br><span class="line-number">421</span><br><span class="line-number">422</span><br><span class="line-number">423</span><br><span class="line-number">424</span><br><span class="line-number">425</span><br><span class="line-number">426</span><br><span class="line-number">427</span><br><span class="line-number">428</span><br><span class="line-number">429</span><br><span class="line-number">430</span><br><span class="line-number">431</span><br><span class="line-number">432</span><br><span class="line-number">433</span><br><span class="line-number">434</span><br><span class="line-number">435</span><br><span class="line-number">436</span><br><span class="line-number">437</span><br><span class="line-number">438</span><br><span class="line-number">439</span><br><span class="line-number">440</span><br><span class="line-number">441</span><br><span class="line-number">442</span><br><span class="line-number">443</span><br><span class="line-number">444</span><br><span class="line-number">445</span><br><span class="line-number">446</span><br><span class="line-number">447</span><br><span class="line-number">448</span><br><span class="line-number">449</span><br><span class="line-number">450</span><br><span class="line-number">451</span><br><span class="line-number">452</span><br><span class="line-number">453</span><br><span class="line-number">454</span><br><span class="line-number">455</span><br><span class="line-number">456</span><br><span class="line-number">457</span><br><span class="line-number">458</span><br><span class="line-number">459</span><br><span class="line-number">460</span><br><span class="line-number">461</span><br><span class="line-number">462</span><br><span class="line-number">463</span><br><span class="line-number">464</span><br><span class="line-number">465</span><br><span class="line-number">466</span><br><span class="line-number">467</span><br><span class="line-number">468</span><br><span class="line-number">469</span><br><span class="line-number">470</span><br><span class="line-number">471</span><br><span class="line-number">472</span><br><span class="line-number">473</span><br><span class="line-number">474</span><br><span class="line-number">475</span><br><span class="line-number">476</span><br><span class="line-number">477</span><br><span class="line-number">478</span><br><span class="line-number">479</span><br><span class="line-number">480</span><br><span class="line-number">481</span><br><span class="line-number">482</span><br><span class="line-number">483</span><br><span class="line-number">484</span><br><span class="line-number">485</span><br><span class="line-number">486</span><br><span class="line-number">487</span><br><span class="line-number">488</span><br><span class="line-number">489</span><br><span class="line-number">490</span><br><span class="line-number">491</span><br><span class="line-number">492</span><br><span class="line-number">493</span><br><span class="line-number">494</span><br><span class="line-number">495</span><br><span class="line-number">496</span><br><span class="line-number">497</span><br><span class="line-number">498</span><br><span class="line-number">499</span><br><span class="line-number">500</span><br><span class="line-number">501</span><br><span class="line-number">502</span><br><span class="line-number">503</span><br><span class="line-number">504</span><br><span class="line-number">505</span><br><span class="line-number">506</span><br><span class="line-number">507</span><br><span class="line-number">508</span><br><span class="line-number">509</span><br><span class="line-number">510</span><br><span class="line-number">511</span><br><span class="line-number">512</span><br><span class="line-number">513</span><br><span class="line-number">514</span><br><span class="line-number">515</span><br><span class="line-number">516</span><br><span class="line-number">517</span><br><span class="line-number">518</span><br><span class="line-number">519</span><br><span class="line-number">520</span><br><span class="line-number">521</span><br><span class="line-number">522</span><br><span class="line-number">523</span><br><span class="line-number">524</span><br><span class="line-number">525</span><br><span class="line-number">526</span><br><span class="line-number">527</span><br><span class="line-number">528</span><br><span class="line-number">529</span><br><span class="line-number">530</span><br><span class="line-number">531</span><br><span class="line-number">532</span><br><span class="line-number">533</span><br><span class="line-number">534</span><br><span class="line-number">535</span><br><span class="line-number">536</span><br><span class="line-number">537</span><br><span class="line-number">538</span><br><span class="line-number">539</span><br><span class="line-number">540</span><br><span class="line-number">541</span><br><span class="line-number">542</span><br><span class="line-number">543</span><br><span class="line-number">544</span><br><span class="line-number">545</span><br><span class="line-number">546</span><br><span class="line-number">547</span><br><span class="line-number">548</span><br><span class="line-number">549</span><br><span class="line-number">550</span><br><span class="line-number">551</span><br><span class="line-number">552</span><br><span class="line-number">553</span><br><span class="line-number">554</span><br><span class="line-number">555</span><br><span class="line-number">556</span><br><span class="line-number">557</span><br><span class="line-number">558</span><br><span class="line-number">559</span><br><span class="line-number">560</span><br><span class="line-number">561</span><br><span class="line-number">562</span><br><span class="line-number">563</span><br><span class="line-number">564</span><br><span class="line-number">565</span><br><span class="line-number">566</span><br><span class="line-number">567</span><br><span class="line-number">568</span><br><span class="line-number">569</span><br><span class="line-number">570</span><br><span class="line-number">571</span><br><span class="line-number">572</span><br><span class="line-number">573</span><br><span class="line-number">574</span><br><span class="line-number">575</span><br><span class="line-number">576</span><br><span class="line-number">577</span><br><span class="line-number">578</span><br><span class="line-number">579</span><br><span class="line-number">580</span><br><span class="line-number">581</span><br><span class="line-number">582</span><br><span class="line-number">583</span><br><span class="line-number">584</span><br><span class="line-number">585</span><br><span class="line-number">586</span><br><span class="line-number">587</span><br><span class="line-number">588</span><br><span class="line-number">589</span><br><span class="line-number">590</span><br><span class="line-number">591</span><br><span class="line-number">592</span><br><span class="line-number">593</span><br><span class="line-number">594</span><br><span class="line-number">595</span><br><span class="line-number">596</span><br><span class="line-number">597</span><br><span class="line-number">598</span><br><span class="line-number">599</span><br><span class="line-number">600</span><br><span class="line-number">601</span><br><span class="line-number">602</span><br><span class="line-number">603</span><br><span class="line-number">604</span><br><span class="line-number">605</span><br><span class="line-number">606</span><br><span class="line-number">607</span><br><span class="line-number">608</span><br><span class="line-number">609</span><br><span class="line-number">610</span><br><span class="line-number">611</span><br><span class="line-number">612</span><br><span class="line-number">613</span><br><span class="line-number">614</span><br><span class="line-number">615</span><br><span class="line-number">616</span><br><span class="line-number">617</span><br><span class="line-number">618</span><br><span class="line-number">619</span><br><span class="line-number">620</span><br><span class="line-number">621</span><br><span class="line-number">622</span><br><span class="line-number">623</span><br><span class="line-number">624</span><br><span class="line-number">625</span><br><span class="line-number">626</span><br><span class="line-number">627</span><br><span class="line-number">628</span><br><span class="line-number">629</span><br><span class="line-number">630</span><br><span class="line-number">631</span><br><span class="line-number">632</span><br><span class="line-number">633</span><br><span class="line-number">634</span><br><span class="line-number">635</span><br><span class="line-number">636</span><br><span class="line-number">637</span><br><span class="line-number">638</span><br><span class="line-number">639</span><br><span class="line-number">640</span><br><span class="line-number">641</span><br><span class="line-number">642</span><br><span class="line-number">643</span><br><span class="line-number">644</span><br><span class="line-number">645</span><br><span class="line-number">646</span><br><span class="line-number">647</span><br><span class="line-number">648</span><br><span class="line-number">649</span><br><span class="line-number">650</span><br><span class="line-number">651</span><br><span class="line-number">652</span><br><span class="line-number">653</span><br><span class="line-number">654</span><br><span class="line-number">655</span><br><span class="line-number">656</span><br><span class="line-number">657</span><br><span class="line-number">658</span><br><span class="line-number">659</span><br><span class="line-number">660</span><br><span class="line-number">661</span><br><span class="line-number">662</span><br><span class="line-number">663</span><br><span class="line-number">664</span><br><span class="line-number">665</span><br><span class="line-number">666</span><br><span class="line-number">667</span><br><span class="line-number">668</span><br><span class="line-number">669</span><br><span class="line-number">670</span><br><span class="line-number">671</span><br><span class="line-number">672</span><br><span class="line-number">673</span><br><span class="line-number">674</span><br><span class="line-number">675</span><br><span class="line-number">676</span><br><span class="line-number">677</span><br><span class="line-number">678</span><br><span class="line-number">679</span><br><span class="line-number">680</span><br><span class="line-number">681</span><br><span class="line-number">682</span><br><span class="line-number">683</span><br><span class="line-number">684</span><br><span class="line-number">685</span><br><span class="line-number">686</span><br><span class="line-number">687</span><br><span class="line-number">688</span><br><span class="line-number">689</span><br><span class="line-number">690</span><br><span class="line-number">691</span><br><span class="line-number">692</span><br><span class="line-number">693</span><br><span class="line-number">694</span><br><span class="line-number">695</span><br><span class="line-number">696</span><br><span class="line-number">697</span><br><span class="line-number">698</span><br><span class="line-number">699</span><br><span class="line-number">700</span><br><span class="line-number">701</span><br><span class="line-number">702</span><br><span class="line-number">703</span><br><span class="line-number">704</span><br><span class="line-number">705</span><br><span class="line-number">706</span><br><span class="line-number">707</span><br><span class="line-number">708</span><br><span class="line-number">709</span><br><span class="line-number">710</span><br><span class="line-number">711</span><br><span class="line-number">712</span><br><span class="line-number">713</span><br><span class="line-number">714</span><br><span class="line-number">715</span><br><span class="line-number">716</span><br><span class="line-number">717</span><br><span class="line-number">718</span><br><span class="line-number">719</span><br><span class="line-number">720</span><br><span class="line-number">721</span><br><span class="line-number">722</span><br><span class="line-number">723</span><br><span class="line-number">724</span><br><span class="line-number">725</span><br><span class="line-number">726</span><br><span class="line-number">727</span><br><span class="line-number">728</span><br><span class="line-number">729</span><br><span class="line-number">730</span><br><span class="line-number">731</span><br><span class="line-number">732</span><br><span class="line-number">733</span><br><span class="line-number">734</span><br><span class="line-number">735</span><br><span class="line-number">736</span><br><span class="line-number">737</span><br><span class="line-number">738</span><br><span class="line-number">739</span><br><span class="line-number">740</span><br><span class="line-number">741</span><br><span class="line-number">742</span><br><span class="line-number">743</span><br><span class="line-number">744</span><br><span class="line-number">745</span><br><span class="line-number">746</span><br><span class="line-number">747</span><br><span class="line-number">748</span><br><span class="line-number">749</span><br><span class="line-number">750</span><br><span class="line-number">751</span><br><span class="line-number">752</span><br><span class="line-number">753</span><br><span class="line-number">754</span><br><span class="line-number">755</span><br><span class="line-number">756</span><br><span class="line-number">757</span><br><span class="line-number">758</span><br><span class="line-number">759</span><br><span class="line-number">760</span><br><span class="line-number">761</span><br><span class="line-number">762</span><br><span class="line-number">763</span><br><span class="line-number">764</span><br><span class="line-number">765</span><br><span class="line-number">766</span><br><span class="line-number">767</span><br><span class="line-number">768</span><br><span class="line-number">769</span><br><span class="line-number">770</span><br><span class="line-number">771</span><br><span class="line-number">772</span><br><span class="line-number">773</span><br><span class="line-number">774</span><br><span class="line-number">775</span><br><span class="line-number">776</span><br><span class="line-number">777</span><br><span class="line-number">778</span><br><span class="line-number">779</span><br><span class="line-number">780</span><br><span class="line-number">781</span><br><span class="line-number">782</span><br><span class="line-number">783</span><br><span class="line-number">784</span><br><span class="line-number">785</span><br><span class="line-number">786</span><br><span class="line-number">787</span><br><span class="line-number">788</span><br><span class="line-number">789</span><br><span class="line-number">790</span><br><span class="line-number">791</span><br><span class="line-number">792</span><br><span class="line-number">793</span><br><span class="line-number">794</span><br><span class="line-number">795</span><br><span class="line-number">796</span><br><span class="line-number">797</span><br><span class="line-number">798</span><br><span class="line-number">799</span><br><span class="line-number">800</span><br><span class="line-number">801</span><br><span class="line-number">802</span><br><span class="line-number">803</span><br><span class="line-number">804</span><br><span class="line-number">805</span><br><span class="line-number">806</span><br><span class="line-number">807</span><br><span class="line-number">808</span><br><span class="line-number">809</span><br><span class="line-number">810</span><br><span class="line-number">811</span><br><span class="line-number">812</span><br><span class="line-number">813</span><br><span class="line-number">814</span><br><span class="line-number">815</span><br><span class="line-number">816</span><br><span class="line-number">817</span><br><span class="line-number">818</span><br><span class="line-number">819</span><br><span class="line-number">820</span><br><span class="line-number">821</span><br><span class="line-number">822</span><br></div></div><h2 id="\u53C2\u8003\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u94FE\u63A5" aria-hidden="true">#</a> \u53C2\u8003\u94FE\u63A5</h2><p>\u7ED9\u6E90\u7801\u6CE8\u91CA\u7684\u65F6\u5019\u4E5F\u9047\u5230\u4E86\u4E00\u4E9B\u5199\u7684\u5F88\u597D\u7684\u535A\u5BA2\uFF1A</p><ul><li>https://blog.csdn.net/anlian523/article/details/105523826</li><li>https://blog.csdn.net/weixin_30342639/article/details/108427230</li></ul>`,8);function l(r,p){return e}var t=n(a,[["render",l],["__file","ThreadLocal \u6E90\u7801\u9010\u884C\u6CE8\u89E3.html.vue"]]);export{t as default};
