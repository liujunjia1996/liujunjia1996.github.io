import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const e={},a=s(`<p>\u516C\u53F8 sso \u6709\u6548\u65F6\u95F4\u77ED\u7684\u79BB\u8C31\uFF0C\u8981\u4E0D\u505C\u91CD\u65B0\u767B\u5F55\uFF0C\u800C\u4E14\u4E00\u4E2A sso \u641E\u4E86 n \u79CD\u767B\u5F55\u754C\u9762\uFF0C\u540E\u9762\u5982\u679C\u5BC6\u7801\u6539\u4E86\uFF0C\u8FD9\u51E0\u4E2A\u767B\u5F55\u9875\u9762\u8FD8\u8981\u6328\u4E2A\u91CD\u65B0\u8BB0\u4F4F\u5BC6\u7801<br> \u60F3\u4E86\u60F3\uFF0C\u8FD8\u662F\u5199\u4E86\u8FD9\u4E2A\u6CB9\u7334\u811A\u672C\u63D0\u9AD8\u5DE5\u4F5C\u6548\u7387</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>// ==UserScript==
// @name         auto login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://authex.hihonor.com/*
// @include      http://authex.hihonor.com/*
// @include      https://idaas.hihonor.com/login.html*
// @include      https://console.heds.hihonor.com/epstenant/*
// @include      http://console.heds.hihonor.com/epstenant/*
// @include      https://auth.hihonor.com/login1*
// @icon         https://www.google.com/s2/favicons?sz=64&amp;domain=hihonor.com
// @grant        none
// ==/UserScript==

(function () {
    var ak = &#39;*****&#39;
    var ak_heds = &#39;*****&#39;
    var sk = &#39;****&#39;
    var authx, idaas, heds;

    window.onload = () =&gt; {
        if (authx = document.querySelector(&quot;.el-button.el-button--default&quot;)) {
            document.querySelector(&quot;#username&quot;).value = ak
            document.querySelector(&quot;#username&quot;).dispatchEvent(new Event(&#39;input&#39;))

            document.querySelector(&quot;div.inputPsd&gt;input&quot;).value = sk
            document.querySelector(&quot;div.inputPsd&gt;input&quot;).dispatchEvent(new Event(&#39;input&#39;))

            setTimeout(() =&gt; {
                var app = document.querySelector(&quot;#app&quot;)
                app.click();
                authx.disabled = false

                authx.click()
                console.log(&#39;click&#39;)
            }, 100)
        }

        if (idaas = document.querySelector(&quot;.login-btn&quot;)) {
            document.querySelector(&quot;#account-input&quot;).value = ak
            document.querySelector(&quot;#password-input&quot;).value = sk

            idaas.click()
            console.log(&#39;click&#39;)
        }

        if (heds = document.querySelector(&quot;#getLogin&quot;)) {
            console.log(&#39;heds&#39;)
            document.querySelector(&quot;#username&quot;).value = ak_heds
            document.querySelector(&quot;#username&quot;).dispatchEvent(new Event(&#39;input&#39;))

            document.querySelector(&quot;#password&quot;).value = sk
            document.querySelector(&quot;#password&quot;).dispatchEvent(new Event(&#39;input&#39;))

            if (window.cookieStore) {
                window.cookieStore.getAll().then(cookies =&gt; cookies.forEach(cookie =&gt; {
                    if (cookie.name !== &quot;hic_lang&quot;) {
                        window.cookieStore.delete(cookie.name);
                    }
                }));
            }

            setTimeout(() =&gt; {
                heds.click()
                console.log(&#39;click&#39;)
            }, 100)
        }
    }

})();
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div>`,2);function r(l,p){return a}var o=n(e,[["render",r],["__file","\u6CB9\u7334\u81EA\u52A8\u767B\u5F55.html.vue"]]);export{o as default};
