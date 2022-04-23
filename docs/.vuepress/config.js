const { path } = require('@vuepress/utils')
module.exports = {
lang: 'zh-CN',
title: "liujunjia's blog",
themeConfig: {
    navbar: [ {
                    link: '/alg',
                    text: '算法',
                  }
                , {
                    link: '/db',
                    text: '数据库',
                  }
                , {
                    link: '/jdk',
                    text: 'JDK',
                  }
                , {
                    link: '/middleware',
                    text: '中间件',
                  }
                , {
                    link: '/other',
                    text: '其他',
                  }
                , {
                    link: '/plan',
                    text: '方案',
                  }
                , {
                    link: '/spring',
                    text: 'spring',
                  }
                ],
    sidebar: {'/21 年书单': {
                        text: '21 年书单',
                        link: '/21 年书单.md',
                      },'/alg':[{
                    children: [ {
                                text: 'KMP',
                                link: '/alg/KMP.md',
                              }, {
                                text: 'LRU',
                                link: '/alg/LRU.md',
                              }, {
                                text: '之和问题',
                                link: '/alg/之和问题.md',
                              }, {
                                text: '二叉树的简单遍历',
                                link: '/alg/二叉树的简单遍历.md',
                              }, {
                                text: '反转链表',
                                link: '/alg/反转链表.md',
                              }, {
                                text: '和为 k 的子数组',
                                link: '/alg/和为 k 的子数组.md',
                              }, {
                                text: '回文字符串、回文链表',
                                link: '/alg/回文字符串、回文链表.md',
                              }, {
                                text: '排序算法',
                                link: '/alg/排序算法.md',
                              }, {
                                text: '摩尔投票',
                                link: '/alg/摩尔投票.md',
                              }, {
                                text: '整数拆分',
                                link: '/alg/整数拆分.md',
                              }, {
                                text: '最长回文子串、子序列',
                                link: '/alg/最长回文子串、子序列.md',
                              }],
               }] ,'/db':[{
                    children: [ {
                                text: 'mysql explain 例解',
                                link: '/db/mysql explain 例解.md',
                              }, {
                                text: 'mysql thread',
                                link: '/db/mysql thread.md',
                              }, {
                                text: 'mysql 总结',
                                link: '/db/mysql 总结.md',
                              }, {
                                text: '数据库对比',
                                link: '/db/数据库对比.md',
                              }],
               }] ,'/jdk':[{
                    children: [ {
                                text: 'Array.asList 和 List.of 的区别',
                                link: '/jdk/Array.asList 和 List.of 的区别.md',
                              }, {
                                text: 'CompletableFuture 的应用',
                                link: '/jdk/CompletableFuture 的应用.md',
                              }, {
                                text: 'HashMap 原理分析',
                                link: '/jdk/HashMap 原理分析.md',
                              }, {
                                text: 'ThreadLocal 源码逐行注解',
                                link: '/jdk/ThreadLocal 源码逐行注解.md',
                              }, {
                                text: 'core 为 0 的线程池',
                                link: '/jdk/core 为 0 的线程池.md',
                              }, {
                                text: 'record',
                                link: '/jdk/record.md',
                              }, {
                                text: '值传递和引用传递',
                                link: '/jdk/值传递和引用传递.md',
                              }, {
                                text: '多线程基础',
                                link: '/jdk/多线程基础.md',
                              }, {
                                text: '如何处理 interruptExp',
                                link: '/jdk/如何处理 interruptExp.md',
                              }, {
                                text: '由类路径错误引发的配置失效分析',
                                link: '/jdk/由类路径错误引发的配置失效分析.md',
                              }],
               }] ,'/middleware':[{
                    children: [ {
                                text: 'docker 部署网络不通问题',
                                link: '/middleware/docker 部署网络不通问题.md',
                              }, {
                                text: 'kafka 昌平机房发送延时',
                                link: '/middleware/kafka 昌平机房发送延时.md',
                              }, {
                                text: 'redis 分布式锁',
                                link: '/middleware/redis 分布式锁.md',
                              }, {
                                text: 'redis 的 zset',
                                link: '/middleware/redis 的 zset.md',
                              }],
               }] ,'/other':[{
                    children: [ {
                                text: 'display visibility opacity',
                                link: '/other/display visibility opacity.md',
                              }, {
                                text: 'git 基础',
                                link: '/other/git 基础.md',
                              }, {
                                text: 'java 数组声明转换',
                                link: '/other/java 数组声明转换.md',
                              }, {
                                text: 'oauth 2.0 ',
                                link: '/other/oauth 2.0 .md',
                              }, {
                                text: 'rm -rf 排除指定文件',
                                link: '/other/rm -rf 排除指定文件.md',
                              }, {
                                text: 'vueAdmin',
                                link: '/other/vueAdmin.md',
                              }, {
                                text: '关闭 idea 的语法检查',
                                link: '/other/关闭 idea 的语法检查.md',
                              }, {
                                text: '分布式事务',
                                link: '/other/分布式事务.md',
                              }, {
                                text: '如何画时序图',
                                link: '/other/如何画时序图.md',
                              }, {
                                text: '接口幂等',
                                link: '/other/接口幂等.md',
                              }, {
                                text: '油猴自动登录',
                                link: '/other/油猴自动登录.md',
                              }, {
                                text: '解决 git 命令慢',
                                link: '/other/解决 git 命令慢.md',
                              }, {
                                text: '调整 ssh 自动登出时间',
                                link: '/other/调整 ssh 自动登出时间.md',
                              }, {
                                text: '跨域',
                                link: '/other/跨域.md',
                              }],
               }] ,'/plan':[{
                    children: [ {
                                text: '复杂 sql 优化',
                                link: '/plan/复杂 sql 优化.md',
                              }, {
                                text: '操作日志迭代',
                                link: '/plan/操作日志迭代.md',
                              }],
               }] ,'/spring':[{
                    children: [ {
                                text: 'SpringBoot 自动装配',
                                link: '/spring/SpringBoot 自动装配.md',
                              }, {
                                text: 'bean 注入循环依赖报错',
                                link: '/spring/bean 注入循环依赖报错.md',
                              }, {
                                text: 'log4j2 配置文件总结',
                                link: '/spring/log4j2 配置文件总结.md',
                              }],
               }] },
},
head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
bundler: '@vuepress/bundler-vite',
theme: path.resolve(__dirname, './theme'),
bundlerConfig: {
  viteOptions: {
    css: {
      postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer')
          ]
      }
    },
  }
},
plugins: [
  [
    '@vuepress/plugin-search',
    {
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    },
  ],
  [
    '@vuepress/plugin-register-components',
    {
      componentsDir: path.resolve(__dirname, './components')
    }
  ]
],
}