**其实 log4j2 的配置文件就玩个 appender 和 logger，一个管输出，一个管输入，只要把这个骨架看明白，log4j2 就没问题了，剩下的通过 google 都可以搞定**   
 |标记   | 描述   |
 |-- |:-- |
 %m | 输出代码中指定的消息
 %p | 输出优先级，DEBUG，INFO，WARN，ERROR，FATAL
 %r | 输出自应用启动到输出该log信息耗费的毫秒数
 %t | 输出产生该日志事件的线程名
 %n | 输出一个回车换行符，Windows平台为 /r/n，Unix平台为 /n
 %d | 输出日志时间点的日期或时间
 %c | 输出所属的类目，通常就是所在类的全名，%c{2} 意为保留最后两层
 %l | 输出日志事件的发生位置，包括包名，方法名，行号
 %L | 输出行号

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
