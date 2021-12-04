## 描述
运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。  
实现 LRUCache 类：  

LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存  
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。  
void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 
```
示例：

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
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
```
## 实现
### 链表
没看题解，写了个链表版的，在 20 / 21 个用例时超时了
```java
import java.util.Objects;

class LRUCache {

    int capacity;

    int curCapacity;

    Node head;

    public LRUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        var cur = head;
        Node last = null;
        while (cur != null) {
            if (key == cur.k) {
                // 调整链表顺序
                replace2Top(last, cur);
                return cur.v;
            }
            last = cur;
            cur = cur.next;
        }
        return -1;
    }

    /*
     *  先看有无重复，重复就替换
     *  如果没有重复，就看是否超过容量，超过需要淘汰旧值
     */
    public void put(int key, int value) {
        if (null == head) {
            curCapacity++;
            head = new Node(key, value, null);
            return;
        }
        var cur = head;
        Node last = null;
        while (true) {
            if (key == cur.k) {
                cur.v = value;
                replace2Top(last, cur);
                return;
            }
            // 最后一个都没找到重复的 2 1 2
            if (cur.next == null) {
                curCapacity++;
                head = new Node(key, value, head);
                // 容量超了
                if (curCapacity > capacity) {
                    Objects.requireNonNullElseGet(last, () -> head).next = null;
                    curCapacity--;
                }
                return;
            }
            last = cur;
            cur = cur.next;
        }

    }

    public void replace2Top(Node last, Node cur) {
        if (last == null) return;
        last.next = cur.next;
        cur.next = head;
        head = cur;
    }

    static class Node {
        int k;
        int v;
        Node next;

        public Node(int k, int v, Node next) {
            this.k = k;
            this.v = v;
            this.next = next;
        }
    }
}
```