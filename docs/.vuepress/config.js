module.exports = {
    lang: 'zh-CN',
    title: "liujunjia's blog",
    themeConfig: {
        sidebar: [ {
                            text: '#21 年书单',
                            link: '/#21 年书单.md',
                          }, {
                    text: 'JDK',
                    children: [ {
                            text: 'Array.asList 和 List.of 的区别',
                            link: '/JDK/Array.asList 和 List.of 的区别.md',
                          }, {
                            text: 'CompletableFuture 的应用',
                            link: '/JDK/CompletableFuture 的应用.md',
                          }, {
                            text: 'core 为 0 的线程池',
                            link: '/JDK/core 为 0 的线程池.md',
                          }, {
                            text: 'HashMap 原理分析',
                            link: '/JDK/HashMap 原理分析.md',
                          }, {
                            text: 'ThreadLocal 源码逐行注解',
                            link: '/JDK/ThreadLocal 源码逐行注解.md',
                          }, {
                            text: '值传递和引用传递',
                            link: '/JDK/值传递和引用传递.md',
                          }, {
                            text: '多线程基础',
                            link: '/JDK/多线程基础.md',
                          }, {
                            text: '如何处理 interruptExp',
                            link: '/JDK/如何处理 interruptExp.md',
                          }, {
                            text: '由类路径错误引发的配置失效分析',
                            link: '/JDK/由类路径错误引发的配置失效分析.md',
                          }],
                  } , {
                    text: 'spring',
                    children: [ {
                            text: 'bean 注入循环依赖报错',
                            link: '/spring/bean 注入循环依赖报错.md',
                          }, {
                            text: 'SpringBoot 自动装配',
                            link: '/spring/SpringBoot 自动装配.md',
                          }],
                  } , {
                    text: '中间件',
                    children: [ {
                            text: 'kafka 昌平机房发送延时',
                            link: '/中间件/kafka 昌平机房发送延时.md',
                          }, {
                            text: 'redis 分布式锁',
                            link: '/中间件/redis 分布式锁.md',
                          }, {
                            text: 'redis 的 zset',
                            link: '/中间件/redis 的 zset.md',
                          }],
                  } , {
                    text: '其他',
                    children: [ {
                            text: 'display visibility opacity',
                            link: '/其他/display visibility opacity.md',
                          }, {
                            text: 'git 基础',
                            link: '/其他/git 基础.md',
                          }, {
                            text: 'oauth 2.0 ',
                            link: '/其他/oauth 2.0 .md',
                          }, {
                            text: 'vueAdmin',
                            link: '/其他/vueAdmin.md',
                          }, {
                            text: '关闭 idea 的语法检查',
                            link: '/其他/关闭 idea 的语法检查.md',
                          }, {
                            text: '分布式事务',
                            link: '/其他/分布式事务.md',
                          }, {
                            text: '如何画时序图',
                            link: '/其他/如何画时序图.md',
                          }, {
                            text: '接口幂等',
                            link: '/其他/接口幂等.md',
                          }, {
                            text: '解决 git 命令慢',
                            link: '/其他/解决 git 命令慢.md',
                          }, {
                            text: '跨域',
                            link: '/其他/跨域.md',
                          }],
                  } , {
                    text: '数据库',
                    children: [ {
                            text: 'mysql explain 例解',
                            link: '/数据库/mysql explain 例解.md',
                          }, {
                            text: 'mysql 总结',
                            link: '/数据库/mysql 总结.md',
                          }, {
                            text: '数据库对比',
                            link: '/数据库/数据库对比.md',
                          }],
                  } , {
                    text: '方案',
                    children: [ {
                            text: '复杂 sql 优化',
                            link: '/方案/复杂 sql 优化.md',
                          }, {
                            text: '操作日志迭代',
                            link: '/方案/操作日志迭代.md',
                          }],
                  } , {
                    text: '算法',
                    children: [ {
                            text: '排序算法',
                            link: '/算法/排序算法.md',
                          }, {
                            text: '最长回文子串、子序列',
                            link: '/算法/最长回文子串、子序列.md',
                          }],
                  } ],
    },
}