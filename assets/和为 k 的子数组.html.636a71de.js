import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9c7ab487.js";const a={},e=s(`<h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p><strong>https://leetcode-cn.com/problems/subarray-sum-equals-k/</strong></p><p>\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 nums \u548C\u4E00\u4E2A\u6574\u6570\xA0k \uFF0C\u8BF7\u4F60\u7EDF\u8BA1\u5E76\u8FD4\u56DE\u8BE5\u6570\u7EC4\u4E2D\u548C\u4E3A\xA0k\xA0\u7684\u8FDE\u7EED\u5B50\u6570\u7EC4\u7684\u4E2A\u6570\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 1\uFF1A

\u8F93\u5165\uFF1Anums = [1,1,1], k = 2
\u8F93\u51FA\uFF1A2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 2\uFF1A

\u8F93\u5165\uFF1Anums = [1,2,3], k = 3
\u8F93\u51FA\uFF1A2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0" aria-hidden="true">#</a> \u5B9E\u73B0</h2><h3 id="\u66B4\u529B\u89E3" tabindex="-1"><a class="header-anchor" href="#\u66B4\u529B\u89E3" aria-hidden="true">#</a> \u66B4\u529B\u89E3</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        for (int right = 0; right &lt; nums.length; ++right) {
            int sum = 0;
            for (int left = right; left &gt;= 0; --left) {
                sum += nums[left];
                if (sum == k) {
                    count++;
                }
            }
        }
        return count;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="\u524D\u7F00\u548C" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F00\u548C" aria-hidden="true">#</a> \u524D\u7F00\u548C</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0, pre = 0;
        HashMap &lt; Integer, Integer &gt; cache = new HashMap &lt;&gt;();
        // \u5904\u7406 0-i \u521A\u597D\u6EE1\u8DB3\u8981\u6C42\u7684\u60C5\u51B5
        cache.put(0, 1);
        for (int i = 0; i &lt; nums.length; i++) {
            pre += nums[i];
            count += cache.getOrDefault(pre - k, 0);
            cache.put(pre, cache.getOrDefault(pre, 0) + 1);
        }
        return count;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div>`,10);function r(l,i){return e}var c=n(a,[["render",r],["__file","\u548C\u4E3A k \u7684\u5B50\u6570\u7EC4.html.vue"]]);export{c as default};
