import{_ as e,b as p}from"./app.234f468b.js";const a={},i=p('<p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232205.png" alt=""></p><h2 id="\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#\u80CC\u666F" aria-hidden="true">#</a> \u80CC\u666F</h2><p>\u63A5\u624B\u522B\u7684\u56E2\u961F\u7684\u9879\u76EE\u4E2D\u7684\u4E00\u4E2A\u63A5\u53E3\uFF0C\u53C8\u52A0\u4E86\u4E24\u4E2A\u5B57\u6BB5\uFF0C\u5728\u539F\u6709 sql \u7684\u57FA\u7840\u4E0A\u4E0D\u5F97\u5DF2\u53C8\u8054\u4E86\u4E24\u5F20\u8868\uFF0C\u8BA9\u8FD9\u4E2A sql \u53D8\u6210\u4E86 n \u591A\u5B50\u67E5\u8BE2\u548C\u8054\u8868\u8BED\u53E5\u7684\u590D\u6742\u7ED3\u6784\uFF0C\u4F7F\u539F\u6765\u5C31\u5F88\u6162\u7684\u63A5\u53E3\u53D8\u5F97\u66F4\u6162\u4E86\u3002</p><p>ps\uFF1A\u963F\u91CC\u89C4\u8303\u662F\u7981\u6B62\u4E09\u5F20\u8868\u4EE5\u4E0A\u7684\u8FDE\u63A5\u7684\uFF0C\u6240\u4EE5\u8FD9\u6837\u7684 sql \u662F\u4E0D\u5408\u7406\u7684\uFF0C\u4F46\u662F\u8FD9\u662F\u522B\u4EBA\u7684\u8001\u9879\u76EE\uFF0C\u521A\u63A5\u624B\uFF0C\u4E1A\u52A1\u903B\u8F91\u4E0D\u662F\u5F88\u719F\u6089\uFF0C\u76EE\u524D\u8FD8\u4E0D\u592A\u6562\u76F4\u63A5\u91CD\u6784</p><p>ui</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232230.png" alt=""></p><p>sql</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232117.png" alt=""></p><p>\u6267\u884C\u8BA1\u5212</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232248.png" alt=""></p><p>\u4F18\u5316\u524D\u8017\u65F6</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232302.png" alt=""></p><p><code>\u53EF\u4EE5\u770B\u5230\u975E\u5E38\u6162\u4E86</code></p><h2 id="\u65B9\u6848-1-\u6DFB\u52A0\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848-1-\u6DFB\u52A0\u7D22\u5F15" aria-hidden="true">#</a> \u65B9\u6848 1 \u6DFB\u52A0\u7D22\u5F15</h2><p><code>`sql CREATE INDEX need_review ON andriod_commit(need_review) `</code></p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232333.png" alt=""></p><p>\u6CA1\u5409\u5C14\u7528\uFF0C\u56E0\u4E3A need_review \u5217\u975E 0 \u5373 1\uFF0C\u6570\u636E\u5206\u79BB\u5EA6\u4E0D\u591F\u5927\uFF0C\u867D\u7136\u51CF\u5C11\u4E86\u4E00\u90E8\u5206\u626B\u8868\u5F00\u9500\uFF0C\u4F46\u662F\u589E\u52A0\u4E86\u56DE\u8868\u5F00\u9500\uFF0C\u4E00\u51CF\u4E00\u589E\u4E24\u76F8\u62B5\u6D88\u4E86\u3002</p><p>\u770B\u6765\u7B80\u5355\u7684\u52A0\u7D22\u5F15\u4E0D\u80FD\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u3002</p><h2 id="\u65B9\u6848-2-\u62C6-sql" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848-2-\u62C6-sql" aria-hidden="true">#</a> \u65B9\u6848 2 \u62C6 sql</h2><p>\u67E5\u51FA pageSize \u6761\u4E3B\u4F53\u6570\u636E\uFF0C\u5269\u4E0B\u9700\u8981\u7684\u5B57\u6BB5\u901A\u8FC7 in \u5173\u952E\u5B57\u7684\u65B9\u5F0F\u5728\u5176\u4ED6\u8868\u67E5\u51FA\u3002</p><p>\u518D\u628A\u8FD9\u4E9B\u8868\u8BE5\u52A0\u7684\u7D22\u5F15\u90FD\u52A0\u4E0A\uFF0C\u6027\u80FD\u5E94\u8BE5\u6709\u8F83\u5927\u7684\u63D0\u5347\u3002</p><p>\u4F46\u662F\uFF0C\u592A\u591A\u8054\u8868\u4E86\uFF0C\u8981\u91CD\u65B0\u5199\u5F88\u591A\u4EE3\u7801\uFF0C\u5982\u4E0A\u9762\u6240\u8BF4\uFF0C\u5BF9\u8FD9\u4E2A\u4E1A\u52A1\u8FD8\u4E0D\u662F\u5F88\u719F\u6089\uFF0C\u6539\u52A8\u592A\u5927\uFF0C\u5BB9\u6613\u5F04\u51FA bug\u3002</p><p>\u4E0D\u9002\u5408\u9879\u76EE\u73B0\u72B6\uFF0C\u820D\u5F03\u3002</p><h2 id="\u65B9\u6848-3-\u5197\u4F59\u8868" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848-3-\u5197\u4F59\u8868" aria-hidden="true">#</a> \u65B9\u6848 3 \u5197\u4F59\u8868</h2><p>\u7528\u5B9A\u65F6\u4EFB\u52A1\u7684\u65B9\u5F0F\u4E00\u53E3\u6C14\u628A\u6240\u9700\u6570\u636E\u5168\u90E8\u67E5\u51FA\u6765\uFF0C\u751F\u6210\u4E00\u4E2A\u5197\u4F59\u8868\u4EE5\u4F9B\u67E5\u8BE2\u3002</p><p>\u51C6\u5907\u9009\u8FD9\u79CD\u65B9\u5F0F\u4F18\u5316\uFF0C\u7406\u7531\u662F\uFF1A</p><ol><li>\u53EF\u4EE5\u76F4\u63A5\u7528\u73B0\u6709\u7684 service \u7684\u65B9\u6CD5\uFF0C\u4E0D\u5206\u9875\uFF0C\u5C31\u80FD\u62FF\u5230\u6240\u6709\u7684\u6570\u636E\u4E86\u3002</li><li>\u56E0\u4E3A\u4E4B\u524D\u5BFC\u6570\u636E\u65F6\u4E5F\u7528\u4E86\u5206\u5E03\u5F0F\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u6240\u4EE5\u6709\u73B0\u6210\u7684\u5206\u5E03\u5F0F\u5B9A\u65F6\u4EFB\u52A1\u5B9E\u73B0\u3002</li><li>\u8FD9\u4E2A\u9879\u76EE\u7EDF\u8BA1\u65F6\u6548\u6027\u8981\u6C42\u4E0D\u9AD8\uFF0C\u4E14\u6570\u636E\u603B\u91CF\u4E0D\u5927\uFF0C\u5728\u53EF\u9884\u8BA1\u7684\u672A\u6765\u4E5F\u4E0D\u4F1A\u7206\u53D1\u5F0F\u589E\u957F\u3002</li><li>\u8FD9\u4E2A\u65B9\u6848\u6027\u80FD\u4F18\u4E8E\u65B9\u6848\u4E8C\uFF0C\u5178\u578B\u7684\u4EE5\u7A7A\u95F4\u6362\u65F6\u95F4\u3002</li></ol><p>\u4F46\u662F\u8FD9\u4E2A\u65B9\u6848\u4E5F\u6709\u7F3A\u70B9\uFF0C\u5C31\u662F\u540E\u671F\u7EF4\u62A4\u6BD4\u8F83\u9EBB\u70E6\uFF0C\u6BD4\u5982\u9700\u8981\u518D\u52A0\u4E00\u4E2A\u5B57\u6BB5\u65F6\uFF0C\u4E0D\u4EC5\u8981\u6539\u539F\u8868\u7684\u8868\u7ED3\u6784\uFF0C\u8FD8\u8981\u6539\u5197\u4F59\u8868\u7684\u3002</p><p>\u6700\u540E\uFF0C\u7ED3\u5408\u5229\u5F0A\uFF0C\u51C6\u5907\u5B9E\u73B0\u4E00\u4E0B\u65B9\u6848 3 \u770B\u770B\u6548\u679C\u3002</p><h3 id="\u6B65\u9AA4-1-\u5EFA\u8868" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4-1-\u5EFA\u8868" aria-hidden="true">#</a> \u6B65\u9AA4 1 \u5EFA\u8868</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232354.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232412.png" alt=""></p><h3 id="\u6B65\u9AA4-2-\u5B9A\u65F6\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4-2-\u5B9A\u65F6\u4EFB\u52A1" aria-hidden="true">#</a> \u6B65\u9AA4 2 \u5B9A\u65F6\u4EFB\u52A1</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232501.png" alt=""></p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232532.png" alt=""></p><h3 id="\u6B65\u9AA4-3-\u751F\u6210\u5197\u4F59\u8868" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4-3-\u751F\u6210\u5197\u4F59\u8868" aria-hidden="true">#</a> \u6B65\u9AA4 3 \u751F\u6210\u5197\u4F59\u8868</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232550.png" alt=""></p><h3 id="\u6B65\u9AA4-4-\u4FEE\u6539\u539F-sql" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4-4-\u4FEE\u6539\u539F-sql" aria-hidden="true">#</a> \u6B65\u9AA4 4 \u4FEE\u6539\u539F sql</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232611.png" alt=""></p><h3 id="\u6B65\u9AA4-5-\u9884\u7559\u624B\u52A8\u540C\u6B65\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4-5-\u9884\u7559\u624B\u52A8\u540C\u6B65\u63A5\u53E3" aria-hidden="true">#</a> \u6B65\u9AA4 5 \u9884\u7559\u624B\u52A8\u540C\u6B65\u63A5\u53E3</h3><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232634.png" alt=""></p><p>\u56E0\u4E3A\u7B2C\u4E00\u6B21\u4E0A\u7EBF\u7684\u65F6\u5019\u5197\u4F59\u8868\u4E3A\u7A7A\uFF0C\u5E76\u4E14\u6CA1\u5230\u6267\u884C\u5B9A\u65F6\u4EFB\u52A1\u7684\u65F6\u95F4\uFF0C\u6240\u4EE5\u9700\u8981\u624B\u52A8\u89E6\u53D1\u4E00\u6B21\u3002</p><h2 id="\u4F18\u5316\u540E\u6548\u679C" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316\u540E\u6548\u679C" aria-hidden="true">#</a> \u4F18\u5316\u540E\u6548\u679C</h2><p>\u6539\u5B8C\uFF0C\u53D1\u4E0A\u53BB\u9A8C\u8BC1\u4E00\u4E0B\uFF0C130ms \u5DE6\u53F3\uFF0C\u6548\u679C\u521A\u521A\u7684\u3002</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232648.png" alt=""></p><p>\u518D\u770B\u770B\u751F\u4EA7\u73AF\u5883\u65E5\u5FD7\uFF0C\u65E5\u5FD7\u4E09\u4E2A\u5B9E\u4F8B\u662F\u4E0D\u662F\u53EA\u6709\u4E00\u4E2A\u80FD\u62A2\u5230\u9501\uFF0C\u6267\u884C\u5B9A\u65F6\u4EFB\u52A1\u3002</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232657.png" alt=""></p><p>\u53EF\u4EE5\u770B\u5230\uFF0C17.05 \u5206\u53EA\u6709\u4E00\u53F0\u673A\u5B50\u6267\u884C\u4E86\u4EFB\u52A1\uFF0C\u5176\u4ED6\u4E24\u4E2A\u673A\u5B50\u90FD abandon \u4E86\u3002</p><h2 id="\u540E\u7EED" tabindex="-1"><a class="header-anchor" href="#\u540E\u7EED" aria-hidden="true">#</a> \u540E\u7EED</h2><p>\u7B2C\u4E8C\u5929\u7684\u65F6\u5019\uFF0C\u67E5\u770B\u5197\u4F59\u8868\uFF0C\u53D1\u73B0\u8868\u7684\u4E3B\u952E id \u5DF2\u7ECF\u81EA\u589E\u5230 4w+</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232714.png" alt=""></p><p>\u53EA\u53D1\u4E86\u4E0A\u53BB\u5927\u534A\u5929\u5C31\u81EA\u589E\u5230\u8FD9\u4E48\u5927\u4E86\uFF0C\u6709\u4E3B\u952E\u6EA2\u51FA\u7684\u98CE\u9669\u3002 \u8FD9\u4E2A\u95EE\u9898\u5E94\u8BE5\u662F\u5220\u9664\u6570\u636E\u540E\uFF0C\u518D\u6B21\u91CD\u65B0\u751F\u6210\u5197\u4F59\u8868\u65F6\uFF0C\u81EA\u589E\u4E3B\u952E\u7684\u8D77\u59CB\u503C\u6CA1\u6709\u91CD\u7F6E\u3002 \u6240\u4EE5\u628A\u5220\u9664\u6570\u636E\u7684 sql \u4ECE\uFF1A</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232724.png" alt=""></p><p>\u6539\u4E3A\uFF1A</p><p><img src="https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210603232738.png" alt=""></p><p>\u540E\u7EED\u7684\u540E\u7EED\uFF0C\u53D1\u73B0\u751F\u4EA7\u6CA1\u6709\u6743\u9650\u6267\u884C truncate\uFF0C\u53EA\u80FD\u624B\u52A8\u751F\u6210 id \u4E86\u3002</p><p>\u8865\u4E00\u4E2A delete \u76F8\u6BD4 trancate \u7684\u533A\u522B\uFF1A</p><ol><li>\u53EF\u4EE5\u7528 where \u9650\u5236\u8303\u56F4</li><li>\u8BB0\u5F55\u5220\u9664\u65E5\u5FD7\uFF0C\u53EF\u7528\u4E8E\u6062\u590D\uFF0C\u4E14\u4E0D\u91CA\u653E\u8BB0\u5F55\u548C\u7D22\u5F15\u5360\u7528\u7684\u7A7A\u95F4\uFF0Ctrancate \u4F1A\u5168\u90E8\u91CA\u653E</li><li>\u89E6\u53D1\u89E6\u53D1\u5668</li><li>\u4E0D\u91CD\u7F6E\u6807\u8BC6\u5217</li><li>\u5C5E\u4E8E dml \u800C\u4E0D\u662F ddl\uFF0C\u53EA\u9700\u8981\u8868\u7684 alter \u7684\u6743\u9650\u800C\u4E0D\u662F delete \u6743\u9650</li></ol>',58);function t(d,r){return i}var n=e(a,[["render",t],["__file","\u590D\u6742 sql \u4F18\u5316.html.vue"]]);export{n as default};
