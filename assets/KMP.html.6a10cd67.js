import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const a={},r=s(`<p>kmp \u4E5F\u53EF\u4EE5\u7406\u89E3\u4E3A\u4E00\u79CD\u52A8\u6001\u89C4\u5212\uFF0C\u76F8\u5BF9\u4E8E\u524D\u7F00\u8868\u6B8A\u9014\u540C\u5F52\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public class KMP {
    private final int[][] dp;
    private final String pat;

    public KMP(String pat) {
        this.pat = pat;
        // \u901A\u8FC7 pat \u6784\u5EFA dp \u6570\u7EC4
        // \u9700\u8981 O(M) \u65F6\u95F4
        int m = pat.length();
        dp = new int[m][256];
        dp[0][pat.charAt(0)] = 1;
        // \u6298\u8FD4\u4F4D\u7F6E
        int x = 0;
        for (int j = 1; j &lt; m; j++) {
            var char_ = pat.charAt(j);
            for (int i = 0; i &lt; 256; i++) {
                dp[j][i] = char_ == i ? j + 1 : dp[x][i];
            }
            x = dp[x][char_];
        }
    }

    public int search(String txt) {
        // \u501F\u52A9 dp \u6570\u7EC4\u53BB\u5339\u914D txt
        // \u9700\u8981 O(N) \u65F6\u95F4
        int m = pat.length();
        int n = txt.length();
        // \u72B6\u6001\u673A\u7684\u72B6\u6001
        int j = 0;
        for (int i = 0; i &lt; n; i++) {
            j = dp[j][txt.charAt(i)];
            if (j == m) return i - m + 1;
        }
        return -1;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><hr><p>\u524D\u7F00\u8868\u7248\u672C</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public class KMP {
    int[] next;
    String pat;

    KMP(String pat) {
        this.pat = pat;
        // \u6784\u5EFA next \u6570\u7EC4
        var l = pat.length();
        next = new int[l];
        next[0] = 0;
        // \u6700\u957F\u76F8\u540C\u524D\u540E\u7F00\u7684\u524D\u7F00\u6307\u9488
        var i = 0;
        for (int j = 1; j &lt; l; j++) {
            var char_ = pat.charAt(j);
            while (i &gt; 0 &amp;&amp; char_ != pat.charAt(i)) {
                // \u8FD9\u91CC\u4E3A\u4EC0\u4E48\u662F i = next [i - 1]; \u800C\u4E0D\u662F i-- \uFF1F
                // eg aabaaf
                // \u6709\u4E00\u79CD\u5BF9\u79F0\u7684\u611F\u89C9\uFF0C\u540E\u534A\u90E8\u5206\u5176\u5B9E\u662F\u6BD4\u8F83\u8FC7\u7684\u4E86\uFF0C
                // \u6240\u4EE5\u76F4\u63A5\u901A\u8FC7 next [i - 1] \u518D\u627E\u516C\u5171\u524D\u540E\u7F00\u6BD4\u4E00\u4E0B\u672B\u5C3E\u5C31\u884C
                i = next[i - 1];
            }
            if (char_ == pat.charAt(i)) {
                i++;
            }
            next[j] = i;
        }
    }

    int search(String txt) {
        var l = txt.length();
        var j = 0;
        for (int i = 0; i &lt; l; i++) {
            while (j &gt; 0 &amp;&amp; txt.charAt(i) != pat.charAt(j)) {
                j = next[j - 1];
            }
            if (txt.charAt(i) == pat.charAt(j)) {
                j++;
            }
            if (j == pat.length()) {
                return i - j + 1;
            }
        }
        return -1;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div>`,5);function e(p,l){return r}var c=n(a,[["render",e],["__file","KMP.html.vue"]]);export{c as default};
