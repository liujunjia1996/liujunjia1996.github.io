"use strict";(self.webpackChunkblog_vue_press=self.webpackChunkblog_vue_press||[]).push([[930],{2463:(t,d,s)=>{s.r(d),s.d(d,{data:()=>e});const e={key:"v-7f2776c2",path:"/db/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%B9%E6%AF%94.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"db/数据库对比.md",git:{updatedTime:1637925151e3,contributors:[{name:"liujunjia",email:"liujunjia@oppo.com",commits:1}]}}},8970:(t,d,s)=>{s.r(d),s.d(d,{default:()=>r});const e=(0,s(6252).uE)("<table><thead><tr><th>支持情况</th><th>差(或者不支持)</th><th>一般</th><th>好</th><th>极好</th></tr></thead><tbody><tr><td>数据规模</td><td>Redis</td><td>Es、Mysql</td><td>mongodb</td><td>Hbase</td></tr><tr><td>查询性能</td><td>Hbase</td><td>Es、Mysql</td><td>mongodb</td><td>Redis</td></tr><tr><td>写入性能</td><td>Es</td><td>Mysql</td><td>Hbase、mongodb</td><td>Redis</td></tr><tr><td>复杂查询/索引功能</td><td>Redis</td><td>Hbase、Mysql</td><td>mongodb</td><td>Es</td></tr><tr><td>水平扩容/数据迁移</td><td>Mysql</td><td>redis、Hbase、Es</td><td></td><td>mongodb</td></tr><tr><td>事务</td><td>Redis、Hbase、Es</td><td>mongodb(4.X)</td><td></td><td>Mysql</td></tr><tr><td>分布式事务</td><td>Redis、Hbase、Mysql、Es</td><td>mongodb(4.2)</td><td></td><td></td></tr><tr><td>水平扩容/数据迁移</td><td>Mysql</td><td>Redis、Hbase、Es</td><td></td><td>mongodb</td></tr><tr><td>丢数据</td><td>Redis Es Mysql(异步复制)</td><td></td><td>mongodb(异步复制) Mysql(同步复制)</td><td>mongodb(raft复制)</td></tr><tr><td>磁盘空间占用 (一亿条数据，5字段，单条数据230字节)</td><td>Es(120G)</td><td>Mysql(57G)</td><td>Hbase(42G)</td><td>mongodb(24G)</td></tr></tbody></table><p>业务上选择 mongo 的理由</p><ol><li>海量数据</li><li>数据结构复杂，字段嵌套查询</li><li>schema free，列可能经常变动</li><li>弱事务</li></ol><p>中台选择 mongo 理由</p><p>中台是提供通用能力的平台，需要一个一级字段松散，二级字段灵活的数据结构以支持大量不同业务的接入，同时，mongo 天生又支持了各种各样的复杂查询，也符合中台查询维度复杂的情况。</p><p>另外，得益于 mongo 是非关系型的，制品数据收敛于一个文档对象里，中台用 mongo 后基本不涉及事务，对制品的修改基本一条语句就可以完成。</p><p>最后，中台是需要面向手机端的，手机有 4亿+，对数据库 tps 要求比较高，mongo 单机的查询性能 2w 以上，性能较好。</p>",7),o={},r=(0,s(3744).Z)(o,[["render",function(t,d){return e}]])},3744:(t,d)=>{d.Z=(t,d)=>{const s=t.__vccOpts||t;for(const[t,e]of d)s[t]=e;return s}}}]);