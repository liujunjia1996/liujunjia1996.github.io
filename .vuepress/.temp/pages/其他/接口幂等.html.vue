<template><h2 id="什么是接口幂等" tabindex="-1"><a class="header-anchor" href="#什么是接口幂等" aria-hidden="true">#</a> 什么是接口幂等</h2>
<p>以相同的请求调用同一接口一次和多次，对系统产生的影响是相同的</p>
<h2 id="什么场景需要幂等" tabindex="-1"><a class="header-anchor" href="#什么场景需要幂等" aria-hidden="true">#</a> 什么场景需要幂等</h2>
<p>删、改、查天生幂等，增加操作需要</p>
<h2 id="如何实现" tabindex="-1"><a class="header-anchor" href="#如何实现" aria-hidden="true">#</a> 如何实现</h2>
<h3 id="请求序列号" tabindex="-1"><a class="header-anchor" href="#请求序列号" aria-hidden="true">#</a> 请求序列号</h3>
<p>每个请求前端带一个 uuid，后端放入缓存，入库前判断请求序列号是否已经在缓存中了，如果没有才处理。</p>
<h3 id="唯一索引" tabindex="-1"><a class="header-anchor" href="#唯一索引" aria-hidden="true">#</a> 唯一索引</h3>
<p>建立唯一索引，重复后会报错给前端，前端提示用户刷新</p>
<h3 id="upsert" tabindex="-1"><a class="header-anchor" href="#upsert" aria-hidden="true">#</a> upsert</h3>
<p>mongodb 有一个原子的 upsert 命令，可能有幂等问题的接口可以使用 upsert ，无则插入，有则更新，重复执行了也不会有问题。</p>
<p>ps：幂等问题前端也可以通过提交前不允许再次点击按钮来尽量避免</p>
</template>
