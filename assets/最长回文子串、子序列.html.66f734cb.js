import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const a={},e=s(`<p>\u4ECA\u5929\u95F2\u6765\u65E0\u4E8B\uFF0C\u770B\u4E86\u4E24\u9053\u6700\u957F\u56DE\u6587\u4E32\u7684\u9898\uFF0C\u4E00\u4E2A\u662F\u5B50\u4E32\uFF0C\u4E00\u4E2A\u662F\u5B50\u5E8F\u5217\u3002</p><h2 id="\u5B50\u4E32" tabindex="-1"><a class="header-anchor" href="#\u5B50\u4E32" aria-hidden="true">#</a> \u5B50\u4E32</h2><h3 id="\u6ED1\u52A8\u7A97\u53E3-\u53CC\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u6ED1\u52A8\u7A97\u53E3-\u53CC\u6307\u9488" aria-hidden="true">#</a> \u6ED1\u52A8\u7A97\u53E3 + \u53CC\u6307\u9488</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>var longestPalindrome = function(s) {
    var length = s.length;
    if(s.length == 1) {
        return s;
    }
    // \u6ED1\u52A8\u7A97\u53E3\uFF0C\u4ECE\u6700\u5927\u5F00\u59CB\u904D\u5386
    for(var l = length;l &gt; 1;l--) {
        for(var i = 0;i + l &lt;= length;i++) {
            var subStr = s.substr(i,l);
            if(isPalindrome(subStr)) {
                return subStr;
            }
        }
    }
    return s[0];
};

function isPalindrome(s){
    // \u8FD9\u4E2A\u592A\u6162\u4E86
    // return s == s.split(&quot;&quot;).reverse().join(&quot;&quot;);
    // \u6362\u53CC\u6307\u9488
    var i = 0,j = s.length - 1;
    while(i&lt;j) {
        if(s[i] == s[j]) {
            i++;
            j--;
        }else {
            return false;
        }

    }

    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h3 id="\u52A8\u6001\u89C4\u5212" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u89C4\u5212" aria-hidden="true">#</a> \u52A8\u6001\u89C4\u5212</h3><p>\u8FD9\u4E2A\u9898\u7684 dp \u6570\u7EC4\u662F\u4E2A\u4E8C\u7EF4\u7684\u3002<br> \u8001\u751F\u5E38\u8C08\uFF0C\u52A8\u6001\u89C4\u5212\u8981\u5148\u77E5\u9053 dp \u6570\u7EC4\u7684\u5B9A\u4E49\u548C\u8F6C\u6001\u8F6C\u79FB\u7684\u903B\u8F91\u3002<br> \u8FD9\u4E2A\u9898 dp \u6570\u7EC4\u7684\u5B9A\u4E49\u662F\uFF1A dp [i][j] \u8868\u793A\u5B57\u7B26\u4E32 s \u4ECE i \u5230 j \u7684\u5B50\u4E32\u662F\u5426\u662F\u56DE\u6587\u4E32\uFF0C\u5982\u679C\u662F dp [i][j] \u4E3A true\uFF0C\u5426\u5219\u4E3A false\u3002<br> \u8F6C\u6001\u8F6C\u79FB\u7684\u903B\u8F91\u4E3A\uFF1A\u5BF9\u4E0E dp [i][j] \u662F\u5426\u4E3A true\uFF0C\u53D6\u51B3\u4E8E s [i] \u548C s [j] \u662F\u5426\u76F8\u7B49\uFF0C\u5982\u679C\u4E0D\u7B49\u76F4\u63A5\u4E3A false\uFF0C\u5982\u679C\u76F8\u7B49\uFF0C\u8FD8\u8981\u770B j - i \u662F\u5426\u5C0F\u4E8E 3, \u5982\u679C\u5C0F\u4E8E 3 \u8BF4\u660E\u4E0D\u4F9D\u8D56\u4E4B\u524D\u7684\u7ED3\u679C\uFF0C\u76F4\u63A5\u4E3A true, \u5982\u679C\u5927\u4E8E 3 \u8BF4\u660E\u4F9D\u8D56 dp [i + 1][j - 1]\uFF0C\u5373 dp [i][j] = dp [i + 1][j - 1]</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public class Solution {

    public String longestPalindrome(String s) {
        int len = s.length();
        if (len &lt; 2) {
            return s;
        }

        int maxLen = 1;
        int begin = 0;
        // dp [i][j] \u8868\u793A s [i-j] \u662F\u5426\u662F\u56DE\u6587\u4E32
        boolean[][] dp = new boolean[len][len];

        char[] charArray = s.toCharArray();
        // \u9012\u63A8\u5F00\u59CB
        // \u5148\u679A\u4E3E\u5B50\u4E32\u957F\u5EA6
        for (int L = 2; L &lt;= len; L++) {
            for (int i = 0; i &lt; len; i++) {
                // \u7531 L \u548C i \u53EF\u4EE5\u786E\u5B9A\u53F3\u8FB9\u754C\uFF0C\u5373 j - i + 1 = L \u5F97
                int j = L + i - 1;
                // \u5982\u679C\u53F3\u8FB9\u754C\u8D8A\u754C\uFF0C\u5C31\u53EF\u4EE5\u9000\u51FA\u5F53\u524D\u5FAA\u73AF
                if (j &gt;= len) {
                    break;
                }

                if (charArray[i] != charArray[j]) {
                    dp[i][j] = false;
                } else {
                    if (j - i &lt; 3) {
                        dp[i][j] = true;
                    } else {
                        dp[i][j] = dp[i + 1][j - 1];
                    }
                }

                // \u53EA\u8981 dp [i][L] == true \u6210\u7ACB\uFF0C
                // \u5C31\u8868\u793A\u5B50\u4E32 s [i..L] \u662F\u56DE\u6587\uFF0C\u6B64\u65F6\u8BB0\u5F55\u56DE\u6587\u957F\u5EA6\u548C\u8D77\u59CB\u4F4D\u7F6E
                if (dp[i][j] &amp;&amp; j - i + 1 &gt; maxLen) {
                    maxLen = j - i + 1;
                    begin = i;
                }
            }
        }

        return s.substring(begin, begin + maxLen);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h2 id="\u5B50\u5E8F\u5217" tabindex="-1"><a class="header-anchor" href="#\u5B50\u5E8F\u5217" aria-hidden="true">#</a> \u5B50\u5E8F\u5217</h2><p>\u5B50\u5E8F\u5217\u548C\u5B50\u4E32\u7684\u533A\u522B\u662F\uFF0C\u5B50\u5E8F\u5217\u4E0D\u8981\u6C42\u662F\u8FDE\u7EED\u7684<br> dp \u6570\u7EC4\u5B9A\u4E49\u4E3A\uFF1A\u4ECE i \u5230 j \u7684\u5B57\u7B26\u4E32\u7684\u6700\u957F\u56DE\u6587\u5B50\u5E8F\u5217\u7684\u957F\u5EA6<br> \u8F6C\u79FB\u65B9\u7A0B\u4E3A\uFF1A\u5982\u679C s [i] = s [j] \u5219\u5728 dp [i + 1][j - 1] \u7684\u57FA\u7840\u4E0A\u52A0 2\uFF0C\u5982\u679C\u4E0D\u7B49\uFF0C\u5219 i \u548C j \u5206\u522B\u653E\u5165 s [i + 1] \u81F3 s [j - 1] \u7684\u5B50\u4E32\u4E2D\uFF0C\u53D6\u5927\u8005\u3002\u4E5F\u5C31\u662F\u8BF4 dp [i][j] \u7684\u503C <code>\u53EF\u80FD</code> \u4E0E dp [i + 1][j - 1]\u3001 dp [i][j - 1]\u3001dp [i + 1][j] \u6709\u5173\uFF0C\u753B\u6210 i * j \u7684\u77E9\u5F62\u65F6\uFF0C \u7EB5\u8F74\u4E3A i \u6A2A\u8F74\u4E3A j\uFF0C(i, j) \u7684\u503C\u4E0E\u5B83\u5DE6\u4FA7\uFF0C\u4E0B\u4FA7\uFF0C\u5DE6\u4E0B\u4FA7\u7684\u503C\u6709\u5173</p><h3 id="\u52A8\u6001\u89C4\u5212-1" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u89C4\u5212-1" aria-hidden="true">#</a> \u52A8\u6001\u89C4\u5212</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
  public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[][] dp = new int[n][n];
    for (int i = 0; i &lt; n; i++) {
      dp[i][i] = 1;
    }

    for (int i = n - 2; i &gt;= 0; i--) {
      for (int j = i + 1; j &lt; n; j++) {
        if (s.charAt(i) == s.charAt(j)) {
          dp[i][j] = dp[i + 1][j - 1] + 2;
        } else {
          dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
        }
      }
    }

    return dp[0][n - 1];
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="\u72B6\u6001\u538B\u7F29" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u538B\u7F29" aria-hidden="true">#</a> \u72B6\u6001\u538B\u7F29</h3><p>\u8FD9\u662F\u5BF9\u4E0A\u9762\u60C5\u51B5\u7684\u7A7A\u95F4\u4E0A\u7684\u4F18\u5316\uFF0C\u4E86\u89E3\u5373\u53EF</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
  public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[] dp = new int[n];
    for (int i = 0; i &lt; n; i++) {
      dp[i] = 1;
    }

    for (int i = n - 2; i &gt;= 0; i--) {
      int pre = 0;
      for (int j = i + 1; j &lt; n; j++) {
        int temp = dp[j];
        if (s.charAt(i) == s.charAt(j)) {
          dp[j] = pre + 2;
        } else {
          dp[j] = Math.max(dp[j - 1], dp[j]);
        }
        pre = temp;
      }
    }

    return dp[n - 1];
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div>`,14);function r(l,i){return e}var u=n(a,[["render",r],["__file","\u6700\u957F\u56DE\u6587\u5B50\u4E32\u3001\u5B50\u5E8F\u5217.html.vue"]]);export{u as default};
