import{r,c as n,a,d,F as s,b as t,e,o as h}from"./app.e9861b75.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const o={},p=t('<p>\u5E73\u65F6\u5DE5\u4F5C\u4E2D\uFF0C\u5BF9 git \u7684\u4F7F\u7528\u5F88\u9891\u7E41\uFF0C\u4F46\u662F\u8FD8\u4ECE\u6765\u6CA1\u6709\u5177\u4F53\u4E86\u89E3\u8FC7 git\uFF0C\u6240\u4EE5\u4ECA\u5929\u7AD9\u5728\u4E00\u4E2A\u4F7F\u7528\u8005\u7684\u89D2\u5EA6\uFF0C\u6765\u603B\u7ED3\u4E00\u4E0B git\u3002</p><h1 id="\u4E09\u4E2A\u5206\u533A" tabindex="-1"><a class="header-anchor" href="#\u4E09\u4E2A\u5206\u533A" aria-hidden="true">#</a> \u4E09\u4E2A\u5206\u533A</h1><p>\u5DE5\u4F5C\u533A workSpace \u5B58\u653E\u9879\u76EE\u4EE3\u7801\u7684\u5730\u65B9</p><p>\u6682\u5B58\u533A index \u4E34\u65F6\u5B58\u653E\u6539\u52A8\u7684\u5730\u65B9</p><p>\u7248\u672C\u5E93 repository \u5B58\u653E\u672C\u5730\u5DF2\u7ECF\u63D0\u4EA4\u7684\u4EE3\u7801\u7684\u5730\u65B9</p><h1 id="\u4E09\u79CD\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u4E09\u79CD\u72B6\u6001" aria-hidden="true">#</a> \u4E09\u79CD\u72B6\u6001</h1><p>\u5DF2\u4FEE\u6539\uFF08modified\uFF09\u6587\u4EF6\u5DF2\u88AB\u4FEE\u6539\uFF0C\u4F46\u8FD8\u6CA1\u6709\u63D0\u4EA4\u4FDD\u5B58</p><p>\u5DF2\u6682\u5B58\uFF08staged\uFF09\u6587\u4EF6\u5DF2\u88AB\u4FEE\u6539\uFF0C\u5E76\u4E14\u5DF2\u7ECF\u6682\u5B58</p><p>\u5DF2\u63D0\u4EA4\uFF08committed\uFF09\u6587\u4EF6\u5DF2\u7ECF\u88AB\u4FDD\u5B58\u5728\u672C\u5730\u4ED3\u5E93\u4E2D</p><h1 id="\u4E24\u79CD\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u4E24\u79CD\u6307\u9488" aria-hidden="true">#</a> \u4E24\u79CD\u6307\u9488</h1><p>git \u6709\u4E00\u4E2A HEAD \u6307\u9488\uFF0C\u6307\u5411\u5F53\u524D\u6240\u5728\u7684\u63D0\u4EA4</p><p>git \u8FD8\u6709\u4E00\u79CD branch \u6307\u9488\uFF0C\u6307\u5411\u67D0\u4E2A\u5206\u652F</p><h1 id="\u56DB\u79CD\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u56DB\u79CD\u5BF9\u8C61" aria-hidden="true">#</a> \u56DB\u79CD\u5BF9\u8C61</h1><h2 id="blob-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#blob-\u5BF9\u8C61" aria-hidden="true">#</a> Blob \u5BF9\u8C61</h2><p>\u65B0\u6587\u4EF6\u7EB3\u5165\u5230 Git \u540E\uFF0C\u5B83\u7684\u5185\u5BB9\u5B58\u5230\u4E00\u4E2A blob \u5BF9\u8C61\u4E2D\uFF0C\u5B83\u7684\u5BF9\u8C61\u540D\u662F\u57FA\u4E8E\u5185\u5BB9\u8FD0\u7B97\u751F\u6210\u7684\u4E00\u4E2A 40 \u4E2A\u5B57\u7B26\u7684 SHA1\u503C\u3002</p><p>SHA1 \u662F\u4E00\u79CD hash \u7B97\u6CD5\uFF0C\u7C7B\u4F3C\u7684\u8FD8\u6709 MD5\uFF0CSHA256 \u7B49\u3002\u4ED6\u4EEC\u4E4B\u95F4\u7684\u533A\u522B\u662F\u957F\u5EA6\u4E0D\u540C\uFF0C\u6BD4\u5982 SHA1 \u662F 160 bit \u7684\uFF0C\u7528 16 \u8FDB\u5236\u8868\u793A\u5C31\u662F 40 \u4E2A\u5B57\u7B26\u4E86\u3002</p><h2 id="tree-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#tree-\u5BF9\u8C61" aria-hidden="true">#</a> Tree \u5BF9\u8C61</h2><p>\u53EF\u4EE5\u628A tree \u5BF9\u8C61\u7406\u89E3\u4E3A\u4E00\u4E2A\u6587\u4EF6\u5939\uFF0C\u91CC\u9762\u5305\u542B</p><ol><li>\u5B50\u7EA7 tree \uFF08\u5B50\u6587\u4EF6\u5939\uFF09</li><li>blob \uFF08\u5B50\u6587\u4EF6\uFF09</li></ol><h2 id="commit-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#commit-\u5BF9\u8C61" aria-hidden="true">#</a> Commit \u5BF9\u8C61</h2><p>\u7531\u4EE5\u4E0B\u51E0\u90E8\u5206\u7EC4\u6210</p><ol><li>\u4F5C\u8005</li><li>\u63D0\u4EA4\u8005</li><li>\u6CE8\u91CA</li><li>\u6307\u5411\u4E00\u4E2A big tree \u7684\u6307\u9488</li></ol><p><img src="https://user-images.githubusercontent.com/43411944/131253067-df7b6cae-6193-48bd-81c9-c415f10a242e.png" alt="image"></p><h2 id="tag-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#tag-\u5BF9\u8C61" aria-hidden="true">#</a> Tag \u5BF9\u8C61</h2><p>\u8FD9\u4E2A\u6BD4\u8F83\u7528\u7684\u6BD4\u8F83\u5C11\uFF0C\u7528\u6765\u6807\u8BB0\u67D0\u4E2A commit \u5BF9\u8C61\uFF0C\u4E3B\u8981\u662F\u4E3A\u4E86\u89E3\u51B3 commit \u7684 id \u592A\u957F\u4E0D\u597D\u8BB0\u7684\u95EE\u9898</p><h1 id="\u4E94\u79CD\u5206\u652F\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u4E94\u79CD\u5206\u652F\u6A21\u578B" aria-hidden="true">#</a> \u4E94\u79CD\u5206\u652F\u6A21\u578B</h1><h2 id="\u57FA\u7840\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u6A21\u578B" aria-hidden="true">#</a> \u57FA\u7840\u6A21\u578B</h2><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211200.png" alt=""></p><p>\u6240\u6709\u4FEE\u6539\u76F4\u63A5\u5728 master \u4E0A\u8FDB\u884C\uFF0C\u4EC5\u9002\u5408\u4E2A\u4EBA\u9879\u76EE\u6216 demo\u3002</p><h2 id="feature-\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#feature-\u6A21\u578B" aria-hidden="true">#</a> feature \u6A21\u578B</h2><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211225.png" alt=""></p><p>\u5F00\u53D1\u65B0\u529F\u80FD\u5C31\u4ECE master \u5207\u5206\u652F\u51FA\u6765\uFF0C\u5F00\u53D1\u6D4B\u8BD5\u5B8C\u518D\u5408\u5165 master\u3002</p><h2 id="git-flow" tabindex="-1"><a class="header-anchor" href="#git-flow" aria-hidden="true">#</a> git flow</h2><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829220201.png" alt=""></p>',34),l=e("\u8FD9\u4E2A\u662F\u4E00\u4E2A\u5F88\u6709\u540D\u7684"),g={href:"https://nvie.com/posts/a-successful-git-branching-model/",target:"_blank",rel:"noopener noreferrer"},b=e("\u535A\u5BA2"),u=e("\u63D0\u51FA\u7684\uFF0C\u6BD4\u8F83\u9002\u5408\u5927\u7248\u672C\u8FED\u4EE3\u7684\u573A\u666F\uFF0C\u4E0D\u9002\u5408\u7ECF\u5E38\u8FED\u4EE3\u3002"),m=t(`<blockquote><p>Git flow\u7684\u4F18\u70B9\u662F\u6E05\u6670\u53EF\u63A7\uFF0C\u7F3A\u70B9\u662F\u76F8\u5BF9\u590D\u6742\uFF0C\u9700\u8981\u540C\u65F6\u7EF4\u62A4\u4E24\u4E2A\u957F\u671F\u5206\u652F\u3002\u5927\u591A\u6570\u5DE5\u5177\u90FD\u5C06<code>master</code>\u5F53\u4F5C\u9ED8\u8BA4\u5206\u652F\uFF0C\u53EF\u662F\u5F00\u53D1\u662F\u5728<code>develop</code>\u5206\u652F\u8FDB\u884C\u7684\uFF0C\u8FD9\u5BFC\u81F4\u7ECF\u5E38\u8981\u5207\u6362\u5206\u652F\uFF0C\u975E\u5E38\u70E6\u4EBA\u3002\u66F4\u5927\u95EE\u9898\u5728\u4E8E\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u662F\u57FA\u4E8E&quot;\u7248\u672C\u53D1\u5E03&quot;\u7684\uFF0C\u76EE\u6807\u662F\u4E00\u6BB5\u65F6\u95F4\u4EE5\u540E\u4EA7\u51FA\u4E00\u4E2A\u65B0\u7248\u672C\u3002\u4F46\u662F\uFF0C\u5F88\u591A\u7F51\u7AD9\u9879\u76EE\u662F&quot;\u6301\u7EED\u53D1\u5E03&quot;\uFF0C\u4EE3\u7801\u4E00\u6709\u53D8\u52A8\uFF0C\u5C31\u90E8\u7F72\u4E00\u6B21\u3002\u8FD9\u65F6\uFF0C<code>master</code>\u5206\u652F\u548C<code>develop</code>\u5206\u652F\u7684\u5DEE\u522B\u4E0D\u5927\uFF0C\u6CA1\u5FC5\u8981\u7EF4\u62A4\u4E24\u4E2A\u957F\u671F\u5206\u652F\u3002</p></blockquote><h2 id="github-flow" tabindex="-1"><a class="header-anchor" href="#github-flow" aria-hidden="true">#</a> github flow</h2><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211459.png" alt=""></p><p>github \u7684 pr \u6A21\u578B\uFF0C\u6700\u5927\u7684\u7279\u70B9\u5C31\u662F\u7B80\u5355\uFF0C\u6CA1\u4EC0\u4E48\u597D\u8BF4\u7684</p><h2 id="gitlab-flow" tabindex="-1"><a class="header-anchor" href="#gitlab-flow" aria-hidden="true">#</a> gitlab flow</h2><p>\u6301\u7EED\u53D1\u5E03</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211700.png" alt=""></p><p>\u57FA\u4E8E\u7248\u672C</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211710.png" alt=""></p><p>\u76EE\u524D\uFF0C\u6211\u6240\u5728\u7684\u56E2\u961F\u7684\u5206\u652F\u6A21\u578B\u5C5E\u4E8E\u7B2C\u4E8C\u79CD\u7684\u53D8\u79CD\uFF1A <img src="https://user-images.githubusercontent.com/43411944/131253007-6a0fddbf-cd1d-4f3f-b2d3-4b3642fb1457.png" alt="image"></p><h1 id="\u82E5\u5E72\u4E2A-git-\u5B9E\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u82E5\u5E72\u4E2A-git-\u5B9E\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u82E5\u5E72\u4E2A git \u5B9E\u7528\u547D\u4EE4</h1><h2 id="gitignore-\u5931\u6548" tabindex="-1"><a class="header-anchor" href="#gitignore-\u5931\u6548" aria-hidden="true">#</a> gitignore \u5931\u6548</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git rm -r --cached .
git add .
git commit -m &quot;update .gitignore&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="\u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1. \u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93
git remote add origin https://github.com/liujunjia1996/blog
2. \u5C06\u8FDC\u7A0B\u5206\u652F\u548C\u672C\u5730\u5206\u652F\u5173\u8054
git branch --set-upstream-to=origin/main master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,15);function f(x,_){const i=r("OutboundLink");return h(),n(s,null,[p,a("p",null,[l,a("a",g,[b,d(i)]),u]),m],64)}var v=c(o,[["render",f]]);export{v as default};
