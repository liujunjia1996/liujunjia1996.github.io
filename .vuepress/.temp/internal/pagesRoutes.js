import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","首页",["/index.html","/README.md"]],
  ["v-70176f80","/JDK/Array.asList%20%E5%92%8C%20List.of%20%E7%9A%84%E5%8C%BA%E5%88%AB.html","",["/JDK/Array.asList 和 List.of 的区别.html","/JDK/Array.asList%20%E5%92%8C%20List.of%20%E7%9A%84%E5%8C%BA%E5%88%AB","/JDK/Array.asList 和 List.of 的区别.md","/JDK/Array.asList%20%E5%92%8C%20List.of%20%E7%9A%84%E5%8C%BA%E5%88%AB.md"]],
  ["v-d42c5e86","/JDK/CompletableFuture%20%E7%9A%84%E5%BA%94%E7%94%A8.html","",["/JDK/CompletableFuture 的应用.html","/JDK/CompletableFuture%20%E7%9A%84%E5%BA%94%E7%94%A8","/JDK/CompletableFuture 的应用.md","/JDK/CompletableFuture%20%E7%9A%84%E5%BA%94%E7%94%A8.md"]],
  ["v-177adf76","/JDK/HashMap%20%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90.html","",["/JDK/HashMap 原理分析.html","/JDK/HashMap%20%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90","/JDK/HashMap 原理分析.md","/JDK/HashMap%20%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90.md"]],
  ["v-42e80e3a","/JDK/ThreadLocal%20%E6%BA%90%E7%A0%81%E9%80%90%E8%A1%8C%E6%B3%A8%E8%A7%A3.html","页面的标题2",["/JDK/ThreadLocal 源码逐行注解.html","/JDK/ThreadLocal%20%E6%BA%90%E7%A0%81%E9%80%90%E8%A1%8C%E6%B3%A8%E8%A7%A3","/JDK/ThreadLocal 源码逐行注解.md","/JDK/ThreadLocal%20%E6%BA%90%E7%A0%81%E9%80%90%E8%A1%8C%E6%B3%A8%E8%A7%A3.md"]],
  ["v-8ba27294","/JDK/core%20%E4%B8%BA%200%20%E7%9A%84%E7%BA%BF%E7%A8%8B%E6%B1%A0.html","",["/JDK/core 为 0 的线程池.html","/JDK/core%20%E4%B8%BA%200%20%E7%9A%84%E7%BA%BF%E7%A8%8B%E6%B1%A0","/JDK/core 为 0 的线程池.md","/JDK/core%20%E4%B8%BA%200%20%E7%9A%84%E7%BA%BF%E7%A8%8B%E6%B1%A0.md"]],
  ["v-dad08a54","/JDK/%E5%80%BC%E4%BC%A0%E9%80%92%E5%92%8C%E5%BC%95%E7%94%A8%E4%BC%A0%E9%80%92.html","",["/JDK/值传递和引用传递.html","/JDK/%E5%80%BC%E4%BC%A0%E9%80%92%E5%92%8C%E5%BC%95%E7%94%A8%E4%BC%A0%E9%80%92","/JDK/值传递和引用传递.md","/JDK/%E5%80%BC%E4%BC%A0%E9%80%92%E5%92%8C%E5%BC%95%E7%94%A8%E4%BC%A0%E9%80%92.md"]],
  ["v-8de2bd00","/JDK/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%9F%BA%E7%A1%80.html","",["/JDK/多线程基础.html","/JDK/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%9F%BA%E7%A1%80","/JDK/多线程基础.md","/JDK/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%9F%BA%E7%A1%80.md"]],
  ["v-264bc4b2","/JDK/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%20interruptExp.html","背景",["/JDK/如何处理 interruptExp.html","/JDK/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%20interruptExp","/JDK/如何处理 interruptExp.md","/JDK/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%20interruptExp.md"]],
  ["v-2d0f0729","/JDK/%E7%94%B1%E7%B1%BB%E8%B7%AF%E5%BE%84%E9%94%99%E8%AF%AF%E5%BC%95%E5%8F%91%E7%9A%84%E9%85%8D%E7%BD%AE%E5%A4%B1%E6%95%88%E5%88%86%E6%9E%90.html","",["/JDK/由类路径错误引发的配置失效分析.html","/JDK/%E7%94%B1%E7%B1%BB%E8%B7%AF%E5%BE%84%E9%94%99%E8%AF%AF%E5%BC%95%E5%8F%91%E7%9A%84%E9%85%8D%E7%BD%AE%E5%A4%B1%E6%95%88%E5%88%86%E6%9E%90","/JDK/由类路径错误引发的配置失效分析.md","/JDK/%E7%94%B1%E7%B1%BB%E8%B7%AF%E5%BE%84%E9%94%99%E8%AF%AF%E5%BC%95%E5%8F%91%E7%9A%84%E9%85%8D%E7%BD%AE%E5%A4%B1%E6%95%88%E5%88%86%E6%9E%90.md"]],
  ["v-d50989a2","/spring/SpringBoot%20%E8%87%AA%E5%8A%A8%E8%A3%85%E9%85%8D.html","",["/spring/SpringBoot 自动装配.html","/spring/SpringBoot%20%E8%87%AA%E5%8A%A8%E8%A3%85%E9%85%8D","/spring/SpringBoot 自动装配.md","/spring/SpringBoot%20%E8%87%AA%E5%8A%A8%E8%A3%85%E9%85%8D.md"]],
  ["v-f594d4c2","/spring/bean%20%E6%B3%A8%E5%85%A5%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96%E6%8A%A5%E9%94%99.html","",["/spring/bean 注入循环依赖报错.html","/spring/bean%20%E6%B3%A8%E5%85%A5%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96%E6%8A%A5%E9%94%99","/spring/bean 注入循环依赖报错.md","/spring/bean%20%E6%B3%A8%E5%85%A5%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96%E6%8A%A5%E9%94%99.md"]],
  ["v-b6b52754","/%E4%B8%AD%E9%97%B4%E4%BB%B6/kafka%20%E6%98%8C%E5%B9%B3%E6%9C%BA%E6%88%BF%E5%8F%91%E9%80%81%E5%BB%B6%E6%97%B6.html","",["/中间件/kafka 昌平机房发送延时.html","/%E4%B8%AD%E9%97%B4%E4%BB%B6/kafka%20%E6%98%8C%E5%B9%B3%E6%9C%BA%E6%88%BF%E5%8F%91%E9%80%81%E5%BB%B6%E6%97%B6","/中间件/kafka 昌平机房发送延时.md","/%E4%B8%AD%E9%97%B4%E4%BB%B6/kafka%20%E6%98%8C%E5%B9%B3%E6%9C%BA%E6%88%BF%E5%8F%91%E9%80%81%E5%BB%B6%E6%97%B6.md"]],
  ["v-24518f69","/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis%20%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81.html","",["/中间件/redis 分布式锁.html","/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis%20%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81","/中间件/redis 分布式锁.md","/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis%20%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81.md"]],
  ["v-3fdc8aa5","/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis%20%E7%9A%84%20zset.html","",["/中间件/redis 的 zset.html","/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis%20%E7%9A%84%20zset","/中间件/redis 的 zset.md","/%E4%B8%AD%E9%97%B4%E4%BB%B6/redis%20%E7%9A%84%20zset.md"]],
  ["v-668d11e9","/%E5%85%B6%E4%BB%96/21%20%E5%B9%B4%E4%B9%A6%E5%8D%95.html","",["/其他/21 年书单.html","/%E5%85%B6%E4%BB%96/21%20%E5%B9%B4%E4%B9%A6%E5%8D%95","/其他/21 年书单.md","/%E5%85%B6%E4%BB%96/21%20%E5%B9%B4%E4%B9%A6%E5%8D%95.md"]],
  ["v-0867232d","/%E5%85%B6%E4%BB%96/display%20visibility%20opacity.html","",["/其他/display visibility opacity.html","/%E5%85%B6%E4%BB%96/display%20visibility%20opacity","/其他/display visibility opacity.md","/%E5%85%B6%E4%BB%96/display%20visibility%20opacity.md"]],
  ["v-1d669e82","/%E5%85%B6%E4%BB%96/git%20%E5%9F%BA%E7%A1%80.html","三个分区",["/其他/git 基础.html","/%E5%85%B6%E4%BB%96/git%20%E5%9F%BA%E7%A1%80","/其他/git 基础.md","/%E5%85%B6%E4%BB%96/git%20%E5%9F%BA%E7%A1%80.md"]],
  ["v-17651ee6","/%E5%85%B6%E4%BB%96/oauth%202.0%20.html","",["/其他/oauth 2.0 .html","/%E5%85%B6%E4%BB%96/oauth%202.0%20","/其他/oauth 2.0 .md","/%E5%85%B6%E4%BB%96/oauth%202.0%20.md"]],
  ["v-389a4c7f","/%E5%85%B6%E4%BB%96/vueAdmin.html","",["/其他/vueAdmin.html","/%E5%85%B6%E4%BB%96/vueAdmin","/其他/vueAdmin.md","/%E5%85%B6%E4%BB%96/vueAdmin.md"]],
  ["v-3dca9191","/%E5%85%B6%E4%BB%96/%E5%85%B3%E9%97%AD%20idea%20%E7%9A%84%E8%AF%AD%E6%B3%95%E6%A3%80%E6%9F%A5.html","",["/其他/关闭 idea 的语法检查.html","/%E5%85%B6%E4%BB%96/%E5%85%B3%E9%97%AD%20idea%20%E7%9A%84%E8%AF%AD%E6%B3%95%E6%A3%80%E6%9F%A5","/其他/关闭 idea 的语法检查.md","/%E5%85%B6%E4%BB%96/%E5%85%B3%E9%97%AD%20idea%20%E7%9A%84%E8%AF%AD%E6%B3%95%E6%A3%80%E6%9F%A5.md"]],
  ["v-bdf8cb9c","/%E5%85%B6%E4%BB%96/%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1.html","",["/其他/分布式事务.html","/%E5%85%B6%E4%BB%96/%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1","/其他/分布式事务.md","/%E5%85%B6%E4%BB%96/%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1.md"]],
  ["v-4798ea8e","/%E5%85%B6%E4%BB%96/%E5%A6%82%E4%BD%95%E7%94%BB%E6%97%B6%E5%BA%8F%E5%9B%BE.html","Object",["/其他/如何画时序图.html","/%E5%85%B6%E4%BB%96/%E5%A6%82%E4%BD%95%E7%94%BB%E6%97%B6%E5%BA%8F%E5%9B%BE","/其他/如何画时序图.md","/%E5%85%B6%E4%BB%96/%E5%A6%82%E4%BD%95%E7%94%BB%E6%97%B6%E5%BA%8F%E5%9B%BE.md"]],
  ["v-e70d52e2","/%E5%85%B6%E4%BB%96/%E6%8E%A5%E5%8F%A3%E5%B9%82%E7%AD%89.html","",["/其他/接口幂等.html","/%E5%85%B6%E4%BB%96/%E6%8E%A5%E5%8F%A3%E5%B9%82%E7%AD%89","/其他/接口幂等.md","/%E5%85%B6%E4%BB%96/%E6%8E%A5%E5%8F%A3%E5%B9%82%E7%AD%89.md"]],
  ["v-03fe3174","/%E5%85%B6%E4%BB%96/%E8%A7%A3%E5%86%B3%20git%20%E5%91%BD%E4%BB%A4%E6%85%A2.html","",["/其他/解决 git 命令慢.html","/%E5%85%B6%E4%BB%96/%E8%A7%A3%E5%86%B3%20git%20%E5%91%BD%E4%BB%A4%E6%85%A2","/其他/解决 git 命令慢.md","/%E5%85%B6%E4%BB%96/%E8%A7%A3%E5%86%B3%20git%20%E5%91%BD%E4%BB%A4%E6%85%A2.md"]],
  ["v-3d5561cd","/%E5%85%B6%E4%BB%96/%E8%B7%A8%E5%9F%9F.html","",["/其他/跨域.html","/%E5%85%B6%E4%BB%96/%E8%B7%A8%E5%9F%9F","/其他/跨域.md","/%E5%85%B6%E4%BB%96/%E8%B7%A8%E5%9F%9F.md"]],
  ["v-1e0a05f5","/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql%20explain%20%E4%BE%8B%E8%A7%A3.html","",["/数据库/mysql explain 例解.html","/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql%20explain%20%E4%BE%8B%E8%A7%A3","/数据库/mysql explain 例解.md","/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql%20explain%20%E4%BE%8B%E8%A7%A3.md"]],
  ["v-0ea96be7","/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql%20%E6%80%BB%E7%BB%93.html","",["/数据库/mysql 总结.html","/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql%20%E6%80%BB%E7%BB%93","/数据库/mysql 总结.md","/%E6%95%B0%E6%8D%AE%E5%BA%93/mysql%20%E6%80%BB%E7%BB%93.md"]],
  ["v-61774888","/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%B9%E6%AF%94.html","",["/数据库/数据库对比.html","/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%B9%E6%AF%94","/数据库/数据库对比.md","/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%B9%E6%AF%94.md"]],
  ["v-4b068843","/%E6%96%B9%E6%A1%88/%E5%A4%8D%E6%9D%82%20sql%20%E4%BC%98%E5%8C%96.html","",["/方案/复杂 sql 优化.html","/%E6%96%B9%E6%A1%88/%E5%A4%8D%E6%9D%82%20sql%20%E4%BC%98%E5%8C%96","/方案/复杂 sql 优化.md","/%E6%96%B9%E6%A1%88/%E5%A4%8D%E6%9D%82%20sql%20%E4%BC%98%E5%8C%96.md"]],
  ["v-5be0ca5a","/%E6%96%B9%E6%A1%88/%E6%93%8D%E4%BD%9C%E6%97%A5%E5%BF%97%E8%BF%AD%E4%BB%A3.html","分析",["/方案/操作日志迭代.html","/%E6%96%B9%E6%A1%88/%E6%93%8D%E4%BD%9C%E6%97%A5%E5%BF%97%E8%BF%AD%E4%BB%A3","/方案/操作日志迭代.md","/%E6%96%B9%E6%A1%88/%E6%93%8D%E4%BD%9C%E6%97%A5%E5%BF%97%E8%BF%AD%E4%BB%A3.md"]],
  ["v-15ed7841","/%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95.html","冒泡排序",["/算法/排序算法.html","/%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95","/算法/排序算法.md","/%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95.md"]],
  ["v-4d6af926","/%E7%AE%97%E6%B3%95/%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2%E3%80%81%E5%AD%90%E5%BA%8F%E5%88%97.html","",["/算法/最长回文子串、子序列.html","/%E7%AE%97%E6%B3%95/%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2%E3%80%81%E5%AD%90%E5%BA%8F%E5%88%97","/算法/最长回文子串、子序列.md","/%E7%AE%97%E6%B3%95/%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2%E3%80%81%E5%AD%90%E5%BA%8F%E5%88%97.md"]],
  ["v-3706649a","/404.html","",["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
