今天新上的一个服务，本地跑没什么问题，但是发到测试环境启动就报错了：

```log
2021-08-31 10:04:51.964 ERROR [SpringApplication.java:843] - Application run failed

org.springframework.beans.factory.BeanCurrentlyInCreationException: 
Error creating bean with name 'publicKeyDao': 
Bean with name 'publicKeyDao' has been injected into other beans [mqConsumerService] in its raw version as part of a circular reference, 
but has eventually been wrapped. This means that said other beans do not use the final version of the bean. 
This is often the result of over-eager type matching - consider using 'getBeanNamesForType' with the 'allowEagerInit' flag turned off, for example.
```

后来通过 @lazy 注解，让这个 Bean 惰性初始化解决了这个问题。

```java
@Component
@Slf4j
public class MqConsumer {

    @Resource
    ConfigManager configManager;

    @Lazy
    @Resource
    PublicKeyDao publicKeyDao;
    
}
```

但是后来转念一想，出现循环依赖的问题，大概率是因为项目的结构不合理，低层组件依赖了高层组件。

一个好的代码结构的依赖关系最好是单向的，比如传统的 mvc 架构，controller -> service -> dao ；再比如 ddd 微服务设计思想也是应用层调用领域层，领域层再调用基础设施。

最后，我修改了项目结构而不是添加 @lazy 解决这个问题。  

***

跑个题，聊一下 spring 如何解决 bean 循环依赖的问题   

## spring 创建 bean 的流程
实例化，通过反射创建出实例  
注入，填充属性  
初始化，执行各种回调  
## 三级缓存
singletonObjects 单例池  
earlySingletonObjects 半成品池  
singletonFactories 工厂方法池，lamda
## 一级缓存的作用
缓存成品 bean
## 二级缓存的作用
缓存半成品 bean
### 三级缓存的作用
缓存能暴露出 bean 的工厂方法，使得可以提前获取到 bean
### 三级缓存为什么是方法
不仅要暴露出 bean，还要执行一些后置处理器   
lamda 存的是这个方法   
```java
protected Object getEarlyBeanReference(String beanName, RootBeanDefinition mbd, Object bean) {
    Object exposedObject = bean;
    if (!mbd.isSynthetic() && hasInstantiationAwareBeanPostProcessors()) {
        for (BeanPostProcessor bp : getBeanPostProcessors()) {
            if (bp instanceof SmartInstantiationAwareBeanPostProcessor) {
                SmartInstantiationAwareBeanPostProcessor ibp = (SmartInstantiationAwareBeanPostProcessor) bp;
                exposedObject = ibp.getEarlyBeanReference(exposedObject, beanName);
            }
        }
    }
    return exposedObject;
}
```
如果没有 aop 情况这个方法相当于：   
```java
Object exposedObject = bean; 
return exposedObject
```
如果有 aop，就会创建出代理对象再返回   

### 整体流程
Spring 通过三级缓存解决了循环依赖，其中一级缓存为单例池（singletonObjects）, 二级缓存为早期曝光对象 earlySingletonObjects，三级缓存为早期曝光对象工厂（singletonFactories）。当 A、B 两个类发生循环引用时，在 A 完成实例化后，就使用实例化后的对象去创建一个对象工厂，并添加到三级缓存中，如果 A 被 AOP 代理，那么通过这个工厂获取到的就是 A 代理后的对象，如果 A 没有被 AOP 代理，那么这个工厂获取到的就是 A 实例化的对象。当 A 进行属性注入时，会去创建 B，同时 B 又依赖了 A，所以创建 B 的同时又会去调用 getBean(a) 来获取需要的依赖，此时的 getBean(a) 会从缓存中获取，第一步，先获取到三级缓存中的工厂；第二步，调用对象工工厂的 getObject 方法来获取到对应的对象，得到这个对象后将其注入到 B 中。紧接着 B 会走完它的生命周期流程，包括初始化、后置处理器等。当 B 创建完后，会将 B 再注入到 A 中，此时 A 再完成它的整个生命周期。   
![image](https://user-images.githubusercontent.com/43411944/139638865-d9e95af5-fd5f-4106-9468-df69f8e35b54.png)

## springboot 2.6 默认情况禁止 Bean 的循环引用
新版的 springboot 已经默认不进行循环引用的处理，会直接报错