import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const a={},e=s(`<h1 id="\u56DE\u6587\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#\u56DE\u6587\u5B57\u7B26\u4E32" aria-hidden="true">#</a> \u56DE\u6587\u5B57\u7B26\u4E32</h1><h2 id="\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u9A8C\u8BC1\u5B83\u662F\u5426\u662F\u56DE\u6587\u4E32\uFF0C\u53EA\u8003\u8651\u5B57\u6BCD\u548C\u6570\u5B57\u5B57\u7B26\uFF0C\u53EF\u4EE5\u5FFD\u7565\u5B57\u6BCD\u7684\u5927\u5C0F\u5199\u3002</p><p>\u8BF4\u660E\uFF1A\u672C\u9898\u4E2D\uFF0C\u6211\u4EEC\u5C06\u7A7A\u5B57\u7B26\u4E32\u5B9A\u4E49\u4E3A\u6709\u6548\u7684\u56DE\u6587\u4E32\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 1:

\u8F93\u5165: &quot;A man, a plan, a canal: Panama&quot;
\u8F93\u51FA: true
\u89E3\u91CA\uFF1A&quot;amanaplanacanalpanama&quot; \u662F\u56DE\u6587\u4E32
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 2:

\u8F93\u5165: &quot;race a car&quot;
\u8F93\u51FA: false
\u89E3\u91CA\uFF1A&quot;raceacar&quot; \u4E0D\u662F\u56DE\u6587\u4E32
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0" aria-hidden="true">#</a> \u5B9E\u73B0</h2><p>\u91C7\u7528\u53CC\u6307\u9488\u7684\u65B9\u6CD5\uFF0C\u9700\u8981\u7528\u5230 <code>Character.isLetterOrDigit()</code> \u8DF3\u8FC7\u975E\u6570\u5B57\u5B57\u6BCD</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public boolean isPalindrome(String s) {
        int n = s.length();
        int left = 0, right = n - 1;
        while (left &lt; right) {
            while(!Character.isLetterOrDigit(s.charAt(left))&amp;&amp;left&lt;n-1) 
                left++;
            
            while(!Character.isLetterOrDigit(s.charAt(right))&amp;&amp;right&gt;0) 
                right--;
            
            if(left &gt;= right) 
                return true;
            
            if (Character.toLowerCase(s.charAt(left)) 
                != Character.toLowerCase(s.charAt(right))) 
                return false;
            
            left++;
            right--;
        }
        return true;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h1 id="\u56DE\u6587\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u56DE\u6587\u94FE\u8868" aria-hidden="true">#</a> \u56DE\u6587\u94FE\u8868</h1><h2 id="\u63CF\u8FF0-1" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0-1" aria-hidden="true">#</a> \u63CF\u8FF0</h2><p>\u4F60\u4E00\u4E2A\u5355\u94FE\u8868\u7684\u5934\u8282\u70B9 head \uFF0C\u8BF7\u4F60\u5224\u65AD\u8BE5\u94FE\u8868\u662F\u5426\u4E3A\u56DE\u6587\u94FE\u8868\u3002\u5982\u679C\u662F\uFF0C\u8FD4\u56DE true \uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE false \u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 1\uFF1A

\u8F93\u5165\uFF1Ahead = [1,2,2,1]
\u8F93\u51FA\uFF1Atrue
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u793A\u4F8B 2\uFF1A

\u8F93\u5165\uFF1Ahead = [1,2]
\u8F93\u51FA\uFF1Afalse
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="\u5B9E\u73B0-1" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0-1" aria-hidden="true">#</a> \u5B9E\u73B0</h2><p>\u4F7F\u7528\u5FEB\u6162\u6307\u9488\u548C\u94FE\u8868\u7FFB\u8F6C</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode fast = head;
        ListNode slow = head;

        //\u901A\u8FC7\u5FEB\u6162\u6307\u9488\u627E\u5230\u4E2D\u70B9
        while ((fast != null) &amp;&amp; (fast.next != null)) {
            fast = fast.next.next;
            slow = slow.next;
        }

        //\u5982\u679Cfast\u4E0D\u4E3A\u7A7A\uFF0C\u8BF4\u660E\u94FE\u8868\u7684\u957F\u5EA6\u662F\u5947\u6570\u4E2A
        if (fast != null) 
            slow = slow.next;

        //\u53CD\u8F6C\u540E\u534A\u90E8\u5206\u94FE\u8868
        slow = reverse(slow);

        fast = head;

        while (slow != null) {
            //\u7136\u540E\u6BD4\u8F83\uFF0C\u5224\u65AD\u8282\u70B9\u503C\u662F\u5426\u76F8\u7B49
            if (fast.val != slow.val) 
                return false;

            fast = fast.next;
            slow = slow.next;
        }

        return true;
    }

    //\u53CD\u8F6C\u94FE\u8868
    public ListNode reverse(ListNode head) {
        ListNode prev = null;

        while (head != null) {
            var next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }

        return prev;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div>`,17);function r(l,p){return e}var c=n(a,[["render",r],["__file","\u56DE\u6587\u5B57\u7B26\u4E32\u3001\u56DE\u6587\u94FE\u8868.html.vue"]]);export{c as default};
