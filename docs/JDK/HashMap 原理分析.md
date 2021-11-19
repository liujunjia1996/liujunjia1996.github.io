> 编程的世界中，任何东西都可以用数据结构和算法概括，大到整个应用程序，小到 HashMap 这个数据结构本身。下面我将从数据结构和算法的角度分析 HashMap 的原理。

## 数据结构

### 容器

数组 + 链表/红黑树

### 元素

里面是键值对和键的 hash 以及后继节点的指针组成

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```

结论：HashMap 内部是由一个一个 node 为单位存储在数组/链表/红黑树中的。

## 算法

### 初始化
HashMap 的初始化是惰性的

常见的空参构造函数中，只初始化了加载因子，即 0.75
```
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}
```
带容量和加载因子的构造函数，也只是处理了一些简单逻辑
```java
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " +
                                            initialCapacity);
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " +
                                            loadFactor);
    this.loadFactor = loadFactor;
    // tableSizeFor 返回一个不小于给定值的最小的 2 的指数值，例如，7->8，8->8，9->16
    // 至于这里为什么这样设置阈值下文会有解释
    this.threshold = tableSizeFor(initialCapacity);
}
```
### put

### get

## 问题点

### 为什么容量要是 2 的指数

2 的指数的容量对应到索引值是 0 到 2 的 n 次方 - 1，此时最大索引的二进制每一位都是 1。

key 的 hashcode 合并高位影响，再与该容量按位与之后，不会扰动 hashcode，利于 node 在数组上均匀分布。

### 合并高位影响为什么采用异或，而不是与 or 或
与和或可以只凭一个元素确定结果，而异或必须两个元素一起参与运算   
与的时候，任意元素是 0，结果必是 0   
或的时候，任意元素是 1，结果必是 1

### 为什么要重写 hashcode  / equals

hashcode 用来定位 node 在数组上的位置，equals 用来判断，当 hashcode 冲突时，是覆写还是追加。

如果只重写 hashcode，当 hashcode 冲突时会发生值覆盖的问题。

如果只重写 equals，会出现桶位置堆积的情况，影响插入和查询效率。

### 为什么转红黑树前要判断容量是否小于 64

首先要知道为什么会出现红黑树结构 ———— hash 冲突严重，用链表结构查询太慢，红黑树有较好的查询性能。

但是，扩容数组也可以解决 hash 冲突，增加查询性能，并且当总容量比较小的时候，rehash 的整体成本低于维护一个红黑树（红黑树的新建和添加值都有性能开销）。

所以当容量小于 64 的时候优先扩容，相当于用空间换时间了。

### 头插和尾插的区别

...

### table 字段为什么要加 transient

数组里最少有四分之一是空值，不能直接序列化。

### HashMap 使用的注意事项

* 初始化时指定容量，防止频繁扩容

* 遍历时遍历 EntrySet，防止再去根据 key 取找 value

### 解决 hash 冲突的几种方法

拉链和开放地址法，HashMap 使用拉链法，ThreadLocal 使用开放地址法

### 为什么 ThreadLocal 不直接用 HashMap

软引用

### HashTable 和 HashTable 区别
最主要的区别是 HashTable 的 put/get/contains 都加了 synchronized，所以 HashTable 是线程安全的，但性能不佳

### HashMap 的并发有什么问题（chm 解决了什么问题）
