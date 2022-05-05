import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9c7ab487.js";const a={},e=s(`<p>\u6469\u5C14\u6295\u7968\u65F6\u662F\u4E00\u79CD\u540C\u5F52\u4E8E\u5C3D\u7684\u601D\u60F3\uFF0C\u6362\u53E5\u8BDD\u8BF4\u5C31\u662F\uFF0C\u5229\u7528\u76EE\u6807\u5143\u7D20\u662F\u591A\u6570\u7684\u7279\u70B9\uFF0C\u8BA9\u975E\u76EE\u6807\u5143\u7D20\u548C\u76EE\u6807\u5143\u7D20\u8FDB\u884C \u201D\u4E00\u6362\u4E00\u201C \u7684\u4E00\u79CD\u601D\u60F3\u3002<br> \u6709\u4E24\u4E2A\u9898\u7528\u4E86\u6469\u5C14\u6295\u7968\uFF1A</p><h2 id="\u591A\u6570\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#\u591A\u6570\u5143\u7D20" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/majority-element/" target="_blank" rel="noopener noreferrer">\u591A\u6570\u5143\u7D20</a></h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int majorityElement(int[] nums) {
        // \u4F7F\u7528\u6469\u5C14\u6295\u7968\u6CD5\uFF0C\u53EA\u9700\u904D\u5386\u4E00\u6B21\u5373\u53EF
        var res = nums[0];
        var times = 1;
        for (int i = 1; i &lt; nums.length; i++) {
            if (times == 0) {
                res = nums[i];
                times = 1;
                continue;
            }
            times = nums[i] == res ? times + 1 : times - 1;
        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u6C42\u4F17\u6570" tabindex="-1"><a class="header-anchor" href="#\u6C42\u4F17\u6570" aria-hidden="true">#</a> <a href="https://leetcode-cn.com/problems/majority-element-ii/" target="_blank" rel="noopener noreferrer">\u6C42\u4F17\u6570</a></h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public List&lt;Integer&gt; majorityElement(int[] nums) {
        // analyze\uFF1Amust be 2 or 1 num
        var l = nums.length;
        int num1 = Integer.MAX_VALUE, num2 = Integer.MAX_VALUE;
        var count1 = 0;
        var count2 = 0;
        for (int num : nums) {
            if (count1 == 0 &amp;&amp; num != num2) {
                count1 = 1;
                num1 = num;
            } else if (count2 == 0 &amp;&amp; num != num1) {
                count2 = 1;
                num2 = num;
            } else if (num == num1) {
                count1++;
            } else if (num == num2) {
                count2++;
            } else {
                count1--;
                count2--;
            }
        }
        var newCount1 = 0;
        var newCount2 = 0;
        for (int num : nums) {
            if (num == num1) newCount1++;
            if (num == num2) newCount2++;
        }
        var res = new ArrayList&lt;Integer&gt;();
        if (newCount1 * 3 &gt; l) {
            res.add(num1);
        }
        if (newCount2 * 3 &gt; l) {
            res.add(num2);
        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div>`,5);function r(l,p){return e}var b=n(a,[["render",r],["__file","\u6469\u5C14\u6295\u7968.html.vue"]]);export{b as default};
