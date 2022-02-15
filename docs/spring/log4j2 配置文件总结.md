**其实 log4j2 的配置文件就玩个 appender 和 logger，一个管输出，一个管输入，只要了解了这个骨架，log4j2 就没问题了，剩下的通过 google 都可以搞定**

## 配置

### 根节点 Configuration

 有两个属性: status 和 monitorinterval，有两个子节点: Appenders 和 Loggers

* status 用来指定 log4j 本身的打印日志的级别.

* monitorinterval 用于指定 log4j 自动重新配置的监测间隔时间，单位是 s，最小是 5s.

### Appenders 节点

常见的有三种子节点: Console、File、RollingFile.

#### Console 节点

用来定义输出到控制台的 Appender.

* name: 指定Appender的名字.

* target: SYSTEM_OUT 或 SYSTEM_ERR,一般只设置默认: SYSTEM_OUT.

* PatternLayout: 输出格式，不设置默认为: %m%n.

#### File 节点

用来定义输出到指定位置的文件的 Appender.

* name: 指定 Appender 的名字.

* fileName: 指定输出日志的目的文件带全路径的文件名.

* PatternLayout: 输出格式，不设置默认为: %m%n.

#### RollingFile 节点

用来定义超过指定大小自动删除旧的创建新的的 Appender.

* name: 指定 Appender 的名字.

* fileName: 指定输出日志的目的文件带全路径的文件名.

* filePattern: 指定新建日志文件的名称格式.

* PatternLayout: 输出格式，不设置默认为: %m%n.

* Policies: 指定滚动日志的策略，就是什么时候进行新建日志文件输出日志.
  
  * TimeBasedTriggeringPolicy: Policies 子节点，基于时间的滚动策略，interval 属性用来指定多久滚动一次，默认是 1 hour。modulate = true 用来调整时间：比如现在是早上 3am，interval 是 4，那么第一次滚动是在 4am，接着是 8am，12am...而不是 7am.
  * SizeBasedTriggeringPolicy: Policies 子节点，基于指定文件大小的滚动策略，size 属性用来定义每个日志文件的大小.
  * DefaultRolloverStrategy: 用来指定同一个文件夹下最多有几个日志文件时开始删除最旧的，创建新的(通过max属性)。

#### PatternLayout

| 标记  | 描述                                   |
|:--- |:------------------------------------ |
| %m  | 输出代码中指定的消息                           |
| %p  | 输出优先级，DEBUG，INFO，WARN，ERROR，FATAL    |
| %r  | 输出自应用启动到输出该log信息耗费的毫秒数               |
| %t  | 输出产生该日志事件的线程名                        |
| %n  | 输出一个回车换行符，Windows平台为 /r/n，Unix平台为 /n |
| %d  | 输出日志时间点的日期或时间                        |
| %c  | 输出所属的类目，通常就是所在类的全名，%c{2} 意为保留最后两层    |
| %l  | 输出日志事件的发生位置，包括包名，方法名，行号              |
| %L  | 输出行号                                 |

### Loggers 节点

常见的有两种:Root和Logger.

#### Root 节点

用来指定项目的根日志，如果没有单独指定 Logger，那么就会默认使用该 Root 日志输出

* level: 日志输出级别，共有8个级别，按照从低到高为：All < Trace < Debug < Info < Warn < Error < Fatal < OFF.

* appenderRef：Root 的子节点，用来指定该日志输出到哪个 Appender.

#### Logger 节点

用来单独指定日志的形式，比如要为指定包下的class指定不同的日志级别等。

* level: 日志输出级别

* name: 用来指定该 Logger 所适用的类或者类所在的包全路径,继承自 Root 节点.

* AppenderRef：Logger 的子节点，用来指定该日志输出到哪个 Appender,如果没有指定，就会默认继承自 Root.如果指定了，那么会在指定的这个 Appender 和 Root 的 Appender 中都会输出，此时我们可以设置 Logger 的 additivity="false" 只在自定义的 Appender 中进行输出。

## 模板

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="5">
    <!--monitorInterval 自动更新配置文件的周期-->
    <properties>
        <property name="logPath">/logs</property>
        <property name="every_file_size">50M</property><!-- 日志切割单位 -->
    </properties>
    <!--输出介质-->
    <Appenders>
        <!--控制台-->
        <Console name="console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c{2}:%L - %msg%n"/>
            <!-- <PatternLayout pattern="%d{HH:mm:ss} [%t] %-5level %logger{36} - %msg%n" /> -->
            <!-- <PatternLayout pattern="%-d [%t] %-5p %c{1}:%L - %m%n" /> -->
        </Console>
        <!--文件-->
        <RollingFile name="root" filename="${logPath}/root.log"
                     filepattern="${logPath}/%d{yyyyMMdd}-%i-root.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss,SSS} [%t] %-5p %c{1}:%L - %msg%n"/>
            <Policies>
                <!--单文件的最大 size-->
                <SizeBasedTriggeringPolicy size="${every_file_size}"/>
                <!--  ${sys:every_file_size} == System.getProperty("every_file_size")-->
                <!--  <SizeBasedTriggeringPolicy size="${sys:every_file_size}"/>-->
            </Policies>
            <!--最多保留 100 个文件-->
            <DefaultRolloverStrategy max="100"/>
        </RollingFile>
        <RollingFile name="root-error" filename="${logPath}/root-error.log"
                     filepattern="${logPath}/%d{yyyyMMdd}-%i-root-error.log">
            <ThresholdFilter level="error" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss,SSS} [%t] %-5p %c{1}:%L - %msg%n"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="${every_file_size}"/>
            </Policies>
            <DefaultRolloverStrategy max="100"/>
        </RollingFile>

    </Appenders>
    <!--输入管理-->
    <Loggers>
        <!--必须有这个才能让 mybatis 打印出 sql 语句-->
        <!-- additivity 默认是 true-->
        <logger name="com.example.mybatis.mapper" level="debug"/>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="root"/>
            <AppenderRef ref="root-error"/>
        </Root>
    </Loggers>
</Configuration>
```
