"use strict";(self.webpackChunkblog_vue_press=self.webpackChunkblog_vue_press||[]).push([[371],{1922:(e,i,l)=>{l.r(i),l.d(i,{data:()=>p});const p={key:"v-4b068843",path:"/%E6%96%B9%E6%A1%88/%E5%A4%8D%E6%9D%82%20sql%20%E4%BC%98%E5%8C%96.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"背景",slug:"背景",children:[]},{level:2,title:"方案 1 添加索引",slug:"方案-1-添加索引",children:[]},{level:2,title:"方案 2 拆 sql",slug:"方案-2-拆-sql",children:[]},{level:2,title:"方案 3 冗余表",slug:"方案-3-冗余表",children:[{level:3,title:"步骤 1 建表",slug:"步骤-1-建表",children:[]},{level:3,title:"步骤 2 定时任务",slug:"步骤-2-定时任务",children:[]},{level:3,title:"步骤 3 生成冗余表",slug:"步骤-3-生成冗余表",children:[]},{level:3,title:"步骤 4 修改原 sql",slug:"步骤-4-修改原-sql",children:[]},{level:3,title:"步骤 5 预留手动同步接口",slug:"步骤-5-预留手动同步接口",children:[]}]},{level:2,title:"优化后效果",slug:"优化后效果",children:[]},{level:2,title:"后续",slug:"后续",children:[]}],filePathRelative:"方案/复杂 sql 优化.md",git:{updatedTime:1637316008e3,contributors:[{name:"liujunjia",email:"43411944+liujunjia1996@users.noreply.github.com",commits:1}]}}},3396:(e,i,l)=>{l.r(i),l.d(i,{default:()=>a});const p=(0,l(6252).uE)('<p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232205.png" alt=""></p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>接手别的团队的项目中的一个接口，又加了两个字段，在原有 sql 的基础上不得已又联了两张表，让这个 sql 变成了 n 多子查询和联表语句的复杂结构，使原来就很慢的接口变得更慢了。</p><p>ps：阿里规范是禁止三张表以上的连接的，所以这样的 sql 是不合理的，但是这是别人的老项目，刚接手，业务逻辑不是很熟悉，目前还不太敢直接重构</p><p>ui</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232230.png" alt=""></p><p>sql</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232117.png" alt=""></p><p>执行计划</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232248.png" alt=""></p><p>优化前耗时</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232302.png" alt=""></p><p><code>可以看到非常慢了</code></p><h2 id="方案-1-添加索引" tabindex="-1"><a class="header-anchor" href="#方案-1-添加索引" aria-hidden="true">#</a> 方案 1 添加索引</h2><p><code>`sql CREATE INDEX need_review ON andriod_commit(need_review) `</code></p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232333.png" alt=""></p><p>没吉尔用，因为 need_review 列非 0 即 1，数据分离度不够大，虽然减少了一部分扫表开销，但是增加了回表开销，一减一增两相抵消了。</p><p>看来简单的加索引不能解决这个问题。</p><h2 id="方案-2-拆-sql" tabindex="-1"><a class="header-anchor" href="#方案-2-拆-sql" aria-hidden="true">#</a> 方案 2 拆 sql</h2><p>查出 pageSize 条主体数据，剩下需要的字段通过 in 关键字的方式在其他表查出。</p><p>再把这些表该加的索引都加上，性能应该有较大的提升。</p><p>但是，太多联表了，要重新写很多代码，如上面所说，对这个业务还不是很熟悉，改动太大，容易弄出 bug。</p><p>不适合项目现状，舍弃。</p><h2 id="方案-3-冗余表" tabindex="-1"><a class="header-anchor" href="#方案-3-冗余表" aria-hidden="true">#</a> 方案 3 冗余表</h2><p>用定时任务的方式一口气把所需数据全部查出来，生成一个冗余表以供查询。</p><p>准备选这种方式优化，理由是：</p><ol><li>可以直接用现有的 service 的方法，不分页，就能拿到所有的数据了。</li><li>因为之前导数据时也用了分布式定时任务，所以有现成的分布式定时任务实现。</li><li>这个项目统计时效性要求不高，且数据总量不大，在可预计的未来也不会爆发式增长。</li><li>这个方案性能优于方案二，典型的以空间换时间。</li></ol><p>但是这个方案也有缺点，就是后期维护比较麻烦，比如需要再加一个字段时，不仅要改原表的表结构，还要改冗余表的。</p><p>最后，结合利弊，准备实现一下方案 3 看看效果。</p><h3 id="步骤-1-建表" tabindex="-1"><a class="header-anchor" href="#步骤-1-建表" aria-hidden="true">#</a> 步骤 1 建表</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232354.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232412.png" alt=""></p><h3 id="步骤-2-定时任务" tabindex="-1"><a class="header-anchor" href="#步骤-2-定时任务" aria-hidden="true">#</a> 步骤 2 定时任务</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232501.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232532.png" alt=""></p><h3 id="步骤-3-生成冗余表" tabindex="-1"><a class="header-anchor" href="#步骤-3-生成冗余表" aria-hidden="true">#</a> 步骤 3 生成冗余表</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232550.png" alt=""></p><h3 id="步骤-4-修改原-sql" tabindex="-1"><a class="header-anchor" href="#步骤-4-修改原-sql" aria-hidden="true">#</a> 步骤 4 修改原 sql</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232611.png" alt=""></p><h3 id="步骤-5-预留手动同步接口" tabindex="-1"><a class="header-anchor" href="#步骤-5-预留手动同步接口" aria-hidden="true">#</a> 步骤 5 预留手动同步接口</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232634.png" alt=""></p><p>因为第一次上线的时候冗余表为空，并且没到执行定时任务的时间，所以需要手动触发一次。</p><h2 id="优化后效果" tabindex="-1"><a class="header-anchor" href="#优化后效果" aria-hidden="true">#</a> 优化后效果</h2><p>改完，发上去验证一下，130ms 左右，效果刚刚的。</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232648.png" alt=""></p><p>再看看生产环境日志，日志三个实例是不是只有一个能抢到锁，执行定时任务。</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232657.png" alt=""></p><p>可以看到，17.05 分只有一台机子执行了任务，其他两个机子都 abandon 了。</p><h2 id="后续" tabindex="-1"><a class="header-anchor" href="#后续" aria-hidden="true">#</a> 后续</h2><p>第二天的时候，查看冗余表，发现表的主键 id 已经自增到 4w+</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232714.png" alt=""></p><p>只发了上去大半天就自增到这么大了，有主键溢出的风险。 这个问题应该是删除数据后，再次重新生成冗余表时，自增主键的起始值没有重置。 所以把删除数据的 sql 从：</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232724.png" alt=""></p><p>改为：</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232738.png" alt=""></p><p>后续的后续，发现生产没有权限执行 truncate，只能手动生成 id 了。</p><p>补一个 delete 相比 trancate 的区别：</p><ol><li>可以用 where 限制范围</li><li>记录删除日志，可用于恢复，且不释放记录和索引占用的空间，trancate 会全部释放</li><li>触发触发器</li><li>不重置标识列</li><li>属于 dml 而不是 ddl，只需要表的 alter 的权限而不是 delete 权限</li></ol>',58),t={},a=(0,l(3744).Z)(t,[["render",function(e,i){return p}]])},3744:(e,i)=>{i.Z=(e,i)=>{const l=e.__vccOpts||e;for(const[e,p]of i)l[e]=p;return l}}}]);