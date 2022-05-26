import{_ as n,o as s,c as a,b as e}from"./app.47fe7ae9.js";const t={},p=e(`<h1 id="\u56DE\u6587\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#\u56DE\u6587\u5B57\u7B26\u4E32" aria-hidden="true">#</a> \u56DE\u6587\u5B57\u7B26\u4E32</h1><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u9A8C\u8BC1\u5B83\u662F\u5426\u662F\u56DE\u6587\u4E32\uFF0C\u53EA\u8003\u8651\u5B57\u6BCD\u548C\u6570\u5B57\u5B57\u7B26\uFF0C\u53EF\u4EE5\u5FFD\u7565\u5B57\u6BCD\u7684\u5927\u5C0F\u5199\u3002</p><p>\u8BF4\u660E\uFF1A\u672C\u9898\u4E2D\uFF0C\u6211\u4EEC\u5C06\u7A7A\u5B57\u7B26\u4E32\u5B9A\u4E49\u4E3A\u6709\u6548\u7684\u56DE\u6587\u4E32\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 1:

\u8F93\u5165: &quot;A man, a plan, a canal: Panama&quot;
\u8F93\u51FA: true
\u89E3\u91CA\uFF1A&quot;amanaplanacanalpanama&quot; \u662F\u56DE\u6587\u4E32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 2:

\u8F93\u5165: &quot;race a car&quot;
\u8F93\u51FA: false
\u89E3\u91CA\uFF1A&quot;raceacar&quot; \u4E0D\u662F\u56DE\u6587\u4E32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0" aria-hidden="true">#</a> \u5B9E\u73B0</h2><p>\u91C7\u7528\u53CC\u6307\u9488\u7684\u65B9\u6CD5\uFF0C\u9700\u8981\u7528\u5230 <code>Character.isLetterOrDigit()</code> \u8DF3\u8FC7\u975E\u6570\u5B57\u5B57\u6BCD</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> right <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isLetterOrDigit</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">&amp;&amp;</span>left<span class="token operator">&lt;</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> 
                left<span class="token operator">++</span><span class="token punctuation">;</span>
            
            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">isLetterOrDigit</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">&amp;&amp;</span>right<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> 
                right<span class="token operator">--</span><span class="token punctuation">;</span>
            
            <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">&gt;=</span> right<span class="token punctuation">)</span> 
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> 
                <span class="token operator">!=</span> <span class="token class-name">Character</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            
            left<span class="token operator">++</span><span class="token punctuation">;</span>
            right<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="\u56DE\u6587\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u56DE\u6587\u94FE\u8868" aria-hidden="true">#</a> \u56DE\u6587\u94FE\u8868</h1><h2 id="\u63CF\u8FF0-1" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0-1" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u4F60\u4E00\u4E2A\u5355\u94FE\u8868\u7684\u5934\u8282\u70B9 head \uFF0C\u8BF7\u4F60\u5224\u65AD\u8BE5\u94FE\u8868\u662F\u5426\u4E3A\u56DE\u6587\u94FE\u8868\u3002\u5982\u679C\u662F\uFF0C\u8FD4\u56DE true \uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE false \u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 1\uFF1A

\u8F93\u5165\uFF1Ahead = [1,2,2,1]
\u8F93\u51FA\uFF1Atrue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 2\uFF1A

\u8F93\u5165\uFF1Ahead = [1,2]
\u8F93\u51FA\uFF1Afalse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B9E\u73B0-1" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0-1" aria-hidden="true">#</a> \u5B9E\u73B0</h2><p>\u4F7F\u7528\u5FEB\u6162\u6307\u9488\u548C\u94FE\u8868\u7FFB\u8F6C</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>

        <span class="token comment">//\u901A\u8FC7\u5FEB\u6162\u6307\u9488\u627E\u5230\u4E2D\u70B9</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//\u5982\u679Cfast\u4E0D\u4E3A\u7A7A\uFF0C\u8BF4\u660E\u94FE\u8868\u7684\u957F\u5EA6\u662F\u5947\u6570\u4E2A</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> 
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>

        <span class="token comment">//\u53CD\u8F6C\u540E\u534A\u90E8\u5206\u94FE\u8868</span>
        slow <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>slow<span class="token punctuation">)</span><span class="token punctuation">;</span>

        fast <span class="token operator">=</span> head<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>slow <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//\u7136\u540E\u6BD4\u8F83\uFF0C\u5224\u65AD\u8282\u70B9\u503C\u662F\u5426\u76F8\u7B49</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>fast<span class="token punctuation">.</span>val <span class="token operator">!=</span> slow<span class="token punctuation">.</span>val<span class="token punctuation">)</span> 
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//\u53CD\u8F6C\u94FE\u8868</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> next <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            head<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            prev <span class="token operator">=</span> head<span class="token punctuation">;</span>
            head <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[p];function c(l,i){return s(),a("div",null,o)}var r=n(t,[["render",c],["__file","\u56DE\u6587\u5B57\u7B26\u4E32\u3001\u56DE\u6587\u94FE\u8868.html.vue"]]);export{r as default};
