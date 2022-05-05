import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as e}from"./app.9c7ab487.js";const s={},a=e(`<p><a href="https://leetcode-cn.com/problems/reverse-linked-list/" target="_blank" rel="noopener noreferrer">\u53CD\u8F6C\u94FE\u8868</a></p><p>\u8FD9\u4E00\u9053\u662F\u4E2A\u7B80\u5355\u9898\uFF0C\u4F46\u662F\u975E\u5E38\u7684\u7ECF\u5178\uFF0C\u7ECF\u5178\u4E4B\u5904\u5728\u4E8E\u53EF\u4EE5\u5E2E\u52A9\u4EBA\u5F88\u597D\u7684\u7406\u89E3\u9012\u5F52\u3002</p><p><img src="https://user-images.githubusercontent.com/43411944/150676367-47549883-e02e-4789-9cc6-4e433502bed2.png" alt="image"></p><h2 id="\u53CC\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u53CC\u6307\u9488" aria-hidden="true">#</a> \u53CC\u6307\u9488</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode cur = head;
        ListNode temp = null;
        while (cur != null) {
            temp = cur.next;// \u4FDD\u5B58\u4E0B\u4E00\u4E2A\u8282\u70B9
            cur.next = prev;
            prev = cur;
            cur = temp;
        }
        return prev;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="\u6B63\u5411\u9012\u5F52" tabindex="-1"><a class="header-anchor" href="#\u6B63\u5411\u9012\u5F52" aria-hidden="true">#</a> \u6B63\u5411\u9012\u5F52</h2><p>\u8FD9\u4E2A\u5F88\u597D\u7406\u89E3\uFF0C\u57FA\u672C\u5C31\u662F\u7528\u9012\u5F52\u66FF\u6362\u53CC\u6307\u9488\u7684\u5FAA\u73AF\u800C\u5DF2\uFF1B\u8FD9\u4E2A\u9898\u521A\u597D\u8FD8\u662F\u4E2A <a href="https://www.ruanyifeng.com/blog/2015/04/tail-call.html" target="_blank" rel="noopener noreferrer">\u5C3E\u9012\u5F52</a>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {

    public ListNode reverseList(ListNode head) {
        return reverse(null, head);
    }

    public ListNode reverse(ListNode pre, ListNode cur) {
        if (cur == null) return pre;
        var temp = cur.next;
        cur.next = pre;
        return reverse(cur, temp);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="\u53CD\u5411\u9012\u5F52" tabindex="-1"><a class="header-anchor" href="#\u53CD\u5411\u9012\u5F52" aria-hidden="true">#</a> \u53CD\u5411\u9012\u5F52</h2><p>\u8FD9\u4E2A\u5C31\u6BD4\u8F83\u96BE\u60F3\u4E86\uFF0C\u80FD\u953B\u70BC\u9012\u5F52\u7684\u62BD\u8C61\u601D\u7EF4\u3002<br> reverse \u51FD\u6570\u7684\u4F5C\u7528\u662F \u53CD\u8F6C head \u5143\u7D20\u540E\u9762\u7684\u5143\u7D20\uFF1A<br><img src="https://user-images.githubusercontent.com/43411944/150687103-b1d762f9-b9b5-4bd7-935e-5698673e3da0.png" alt="image"><br> \u5982\u56FE\uFF0C\u7ECF\u8FC7 reverse \u540E\uFF0C\u53EA\u9700\u8981\u5904\u7406 2 \u548C 1 \u7684\u6307\u5411\u5373\u53EF</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {

    public ListNode reverseList(ListNode head) {
        if (head == null) return null;
        return reverse(head);
    }

    public ListNode reverse(ListNode head) {
        if (head.next == null) return head;
        var last = reverse(head.next);
        head.next.next = head;
        head.next = null;
        return last;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,11);function r(l,p){return a}var u=n(s,[["render",r],["__file","\u53CD\u8F6C\u94FE\u8868.html.vue"]]);export{u as default};
