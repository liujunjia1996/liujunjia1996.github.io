import{_ as t,r as o,o as c,c as l,d as n,a as e,F as r,e as s,b as p}from"./app.234f468b.js";const u={},i={href:"https://leetcode-cn.com/problems/reverse-linked-list/",target:"_blank",rel:"noopener noreferrer"},k=s("\u53CD\u8F6C\u94FE\u8868"),d=p(`<p>\u8FD9\u4E00\u9053\u662F\u4E2A\u7B80\u5355\u9898\uFF0C\u4F46\u662F\u975E\u5E38\u7684\u7ECF\u5178\uFF0C\u7ECF\u5178\u4E4B\u5904\u5728\u4E8E\u53EF\u4EE5\u5E2E\u52A9\u4EBA\u5F88\u597D\u7684\u7406\u89E3\u9012\u5F52\u3002</p><p><img src="https://user-images.githubusercontent.com/43411944/150676367-47549883-e02e-4789-9cc6-4e433502bed2.png" alt="image"></p><h2 id="\u53CC\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u53CC\u6307\u9488" aria-hidden="true">#</a> \u53CC\u6307\u9488</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> temp <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            temp <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span><span class="token comment">// \u4FDD\u5B58\u4E0B\u4E00\u4E2A\u8282\u70B9</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            prev <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="\u6B63\u5411\u9012\u5F52" tabindex="-1"><a class="header-anchor" href="#\u6B63\u5411\u9012\u5F52" aria-hidden="true">#</a> \u6B63\u5411\u9012\u5F52</h2>`,5),b=s("\u8FD9\u4E2A\u5F88\u597D\u7406\u89E3\uFF0C\u57FA\u672C\u5C31\u662F\u7528\u9012\u5F52\u66FF\u6362\u53CC\u6307\u9488\u7684\u5FAA\u73AF\u800C\u5DF2\uFF1B\u8FD9\u4E2A\u9898\u521A\u597D\u8FD8\u662F\u4E2A "),m={href:"https://www.ruanyifeng.com/blog/2015/04/tail-call.html",target:"_blank",rel:"noopener noreferrer"},h=s("\u5C3E\u9012\u5F52"),v=s("\u3002"),_=p(`<div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> head<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> pre<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cur <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
        <span class="token keyword">var</span> temp <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        cur<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">reverse</span><span class="token punctuation">(</span>cur<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="\u53CD\u5411\u9012\u5F52" tabindex="-1"><a class="header-anchor" href="#\u53CD\u5411\u9012\u5F52" aria-hidden="true">#</a> \u53CD\u5411\u9012\u5F52</h2><p>\u8FD9\u4E2A\u5C31\u6BD4\u8F83\u96BE\u60F3\u4E86\uFF0C\u80FD\u953B\u70BC\u9012\u5F52\u7684\u62BD\u8C61\u601D\u7EF4\u3002<br> reverse \u51FD\u6570\u7684\u4F5C\u7528\u662F \u53CD\u8F6C head \u5143\u7D20\u540E\u9762\u7684\u5143\u7D20\uFF1A<br><img src="https://user-images.githubusercontent.com/43411944/150687103-b1d762f9-b9b5-4bd7-935e-5698673e3da0.png" alt="image"><br> \u5982\u56FE\uFF0C\u7ECF\u8FC7 reverse \u540E\uFF0C\u53EA\u9700\u8981\u5904\u7406 2 \u548C 1 \u7684\u6307\u5411\u5373\u53EF</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">reverse</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token keyword">var</span> last <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> last<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,4);function w(y,f){const a=o("ExternalLinkIcon");return c(),l(r,null,[n("p",null,[n("a",i,[k,e(a)])]),d,n("p",null,[b,n("a",m,[h,e(a)]),v]),_],64)}var x=t(u,[["render",w],["__file","\u53CD\u8F6C\u94FE\u8868.html.vue"]]);export{x as default};
