> 其实 log4j2 的配置文件就玩个 appender 和 logger，一个管输出，一个管输入，只要把这个骨架看明白，log4j2 就没问题了

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="5">
    <!--monitorInterval 自动更新配置文件的周期-->
    <properties>
        <property name="logPath">/logs</property>
        <property name="every_file_size">50M</property><!-- 日志切割的最小单位 -->
        <property name="output_log_level">info</property><!-- 日志输出级别 -->
    </properties>
    <!--输出介质-->
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c{2}:%L - %msg%n"/>
            <!-- <PatternLayout pattern="%d{HH:mm:ss} [%t] %-5level %logger{36} - %msg%n" /> -->
            <!-- <PatternLayout pattern="%-d [%t] %-5p %c{1}:%L - %m%n" /> -->
        </Console>
        <RollingFile name="root" filename="${logPath}/root.log"
                     filepattern="${logPath}/%d{yyyyMMdd}-%i-root.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss,SSS} [%t] %-5p %c{1}:%L - %msg%n"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="${every_file_size}"/>
                <!--  ${sys:every_file_size} == System.getProperty("every_file_size")-->
                <!--  <SizeBasedTriggeringPolicy size="${sys:every_file_size}"/>-->
            </Policies>
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
        <logger name="com.example.mybatis.mapper" level="debug"/>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="root"/>
        </Root>
    </Loggers>
</Configuration>
```
