import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{b as a}from"./app.7a7684da.js";const s={},n=a(`<h1 id="grep" tabindex="-1"><a class="header-anchor" href="#grep" aria-hidden="true">#</a> grep</h1><p>\u4E3B\u8981\u7528\u4E8E\u641C\u7D22</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ps -ef | grep pid 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="awk" tabindex="-1"><a class="header-anchor" href="#awk" aria-hidden="true">#</a> awk</h1><p>\u4E3B\u8981\u7528\u4E8E\u5207\u5272\u6587\u672C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>#!/bin/sh

useRateStr=\`df -h | grep /dev/vda1 | awk  &#39;{print $5}&#39;\`
useRate=\${useRateStr: 0: 2}

cd \`find /opt -maxdepth 3 -name nacos | awk &#39;NR==1&#39;\`/bin/logs

while [ $useRate -gt 40 ]; do
    ls -l ./ | awk &#39;NR==2&#39; | awk  &#39;{print $9}&#39; | xargs rm -f
    useRateStr=\`df -h | grep /dev/vda1 | awk  &#39;{print $5}&#39;\`
    useRate=\${useRateStr: 0: 2}
done
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h1 id="sed" tabindex="-1"><a class="header-anchor" href="#sed" aria-hidden="true">#</a> sed</h1><p>\u4E3B\u8981\u7528\u4E8E\u641C\u7D22\u3001\u66FF\u6362\u3001\u5220\u9664</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> sed -i &#39;/oo/d&#39; test
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,9);function r(i,d){return n}var c=e(s,[["render",r],["__file","\u6587\u672C\u4E09\u5251\u5BA2.html.vue"]]);export{c as default};
