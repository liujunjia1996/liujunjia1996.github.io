<template><h2 id="业务场景" tabindex="-1"><a class="header-anchor" href="#业务场景" aria-hidden="true">#</a> 业务场景</h2>
<p>多实例之间访问共享资源，有时需要加锁，防止产生并发执行问题。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<h3 id="版本-1" tabindex="-1"><a class="header-anchor" href="#版本-1" aria-hidden="true">#</a> 版本 1</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if (setnx(key, 1) == 1){
    expire(key, 30)
    try {
        //TODO 业务逻辑
    } finally {
        del(key)
    }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="版本-1-存在的问题" tabindex="-1"><a class="header-anchor" href="#版本-1-存在的问题" aria-hidden="true">#</a> 版本 1 存在的问题</h3>
<p>如果 SETNX 成功，在设置锁超时时间后，如果服务器宕机、重启或网络有波动，EXPIRE 命令执行失败，导致锁没有设置超时时间而变成死锁。</p>
<h3 id="版本-2" tabindex="-1"><a class="header-anchor" href="#版本-2" aria-hidden="true">#</a> 版本 2</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'setnx'</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> 
then <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> 
end<span class="token punctuation">;</span> 
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'expire'</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token function">tonumber</span><span class="token punctuation">(</span>ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>添加 lua 脚本，使加锁和设置锁过期时间成为一个原子逻辑。</p>
<h3 id="锁过期导致的问题" tabindex="-1"><a class="header-anchor" href="#锁过期导致的问题" aria-hidden="true">#</a> 锁过期导致的问题</h3>
<p>如果线程 A 成功获取到了锁，并且设置了过期时间 30 秒，但线程 A 执行时间超过了 30 秒，锁过期自动释放，此时线程 B 获取到了锁；<br>
随后 A 执行完成，线程 A 使用 DEL 命令来释放锁，但此时线程 B 加的锁还没有执行完成，线程 A 实际释放的线程 B 加的锁。<br>
这样就会导致分布式锁，锁不住的问题。<br>
可以通过设置守护线程自动续期解决或者直接设置足够大的过期时间解决。</p>
</template>
