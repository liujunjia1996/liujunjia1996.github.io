## 问题描述

中台分发侧应用层服务，guass-dist-server：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/21/140e33c1826d4fcc932fc303e34fe999.png)

在两个机房应用版本和配置文件均完全一致的情况下，kafka 上报函数昌平耗时 200ms，连云耗时 0ms 

虽然是平均值是 200ms，但是发送的耗时分布极差很大，很多都是 0 或者 1，很多有几百上千。 

因为上报数据的逻辑耗时比较久，导致整个应用程序被拖慢，影响了其他接口。

![](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/04/09/532276437fcb48c2b79dc3e5b8632337.jpg)

### 昌平机房

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/21/4299c15b785849e98f25957fc5b58e8f.png)

### 连云机房

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/21/cfbcb69df9e04c46a42379ade5591a5f.png)



## 问题排查

### 网络问题

向运维申请权限，登录生产环境实例分别在昌平和连云机房 `ping` kafka 集群域名，查看延时：

昌平：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/21/7398c6d5ea264cd28e925ce72d1ba543.png)

连云：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/08/21/fe69fb83932b4b70ab0def8244c380ab.png)

两机房没有明显区别，再让运维抓包，查看昌平的详细信息：

`tcpdump host 10.64.108.74 -c 800 -vvv -w test.pcap`

![image](https://user-images.githubusercontent.com/43411944/130311445-4f94fd7d-3aa2-4138-979f-68e8e367674f.png)

经过运维分析，也没有异常

网络问题基本可以排除

### broker 问题

再去和 kafka 管理员联系，查看 kafka 集群信息，发现给当前业务分配的集群的名字是：

`cp_common_kafka`

所以怀疑用的是公共的昌平机房公共的 kafka，于是问 kafka 那边：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/04/02/db54ca7ea8f74766bde69f38f53edee8.jpg)

确认了是公共 kafka 集群后，基本可以断定是 kafka 集群这边出了问题。

把当前业务的 topic 发给 kafka 管理员，查看负载后发现这些节点的负载比较高。

于是，联系管理员做了迁移。

晚些时候，再次查看昌平机房调用链，发送平均耗时已经降到 0 了：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/04/09/3265ff3cc7114653ba23b22c3bacaef1.jpg)

后续询问 kafka 管理员得知:

kafka 集群为我们业务的每一个 topic 均分配了 3 个 kafka 节点，且没有动态扩容、负载均衡之类的策略，一旦别的业务量有增量或我们业务自身有增量，就会造成消息发送延时。

后续想根本解决该问题，可以申请独立的 kafka 集群。

### kafka 常见问题分析

问题到这里其实已经解决了，为了方便以后 kafka 出现问题的排查，在此一并总结。

#### kafka 客户端发送流程

##### Kafka 整体交互

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/04/09/ca63acf1ce364f34b9b42c946db6ea05.jpg)

##### Topic 和 Partition

kafka 为了提升消息的吞吐量，引入了 partition 的概念：

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/04/09/f393ad2a4c3c423eb3867f5b841c662c.jpg)

##### 客户端发送流程

![img](http://s3v2-qos.storage.wanyol.com/guass-cloud-storage-provider/wallpaper/21/04/09/f785157f098142a39fefd1a3263f2949.jpg)

Kafka 客户端一共有两个线程，主线程和 sender 线程，这两个线程都与消息收集器交互，主线程写入收集器，sender 线程读取收集器。

#### 可能造成 kafka 发送延时的操作

1. acks 配置

   0 发出去后不等待回应

   1 等待分区的 leader 回应

   -1/all 等待分区的 follower 回应

   如果 acks 配置的不合理，会降低 kafka 发送速度

2. buffer.memory

   消息收集器的大小，默认为 32m，如果生产者发送消息的速度超过发送到服务器的速度，则会导致生产者空间不足，这个时候 KafkaProducer 的 send 方法调用要么被阻塞，要么抛出异常，这个取决于参数max.block.ms 的配置，此参数的默认值为60000,即60 秒

3. batch.size

   在消息收集器内，kafka 采用池化思想，维护了一个 bufferPool，对特定的大小的内存区域进行了缓存，默认值为 16kb

   如果此参数值设置的太小，那么 bufferPool 就失去了作用
   如果此参数设置的太大，那么会浪费内存，白白占用了消息累加器的内存

   如果此参数设置很合适，那么每次都会利用到 bufferPool 缓存的内存，省去了频繁创建和销毁的流程

4. linger.ms

   指定生产者发送 ProducerBatch 之前等待更多消息（ ProducerRecord ）加入 Producer Batch 的时间，默认值为0。生产者客户端会在ProducerBatch 被填满或等待时间超过 linger.ms 值时发送出去。

   增大这个参数的值会增加消息的延迟，但是同时能提升一定的吞吐量

5. max.in.flight.requests.per.connection

   指定了生产者在收到服务器响应之前可以发送多少个消息，如果想要保证同一分区顺序发送可以将该值设置为 1
#### 消费者和分区的关系

1. 消费者组之间互不影响，如果同时订阅了某个 topic 则每个消费者组都会收到消息
2. 同一个消费者组内，每个消费者消费的分区数为`总分数/消费者个数`，如果不能整除就会出现负载不均衡的问题，甚至如果消费者个数大于分区数会出现某些消费者空闲的问题
