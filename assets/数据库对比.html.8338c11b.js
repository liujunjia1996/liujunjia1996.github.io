import{_ as t,b as d}from"./app.234f468b.js";const s={},o=d("<table><thead><tr><th>\u652F\u6301\u60C5\u51B5</th><th>\u5DEE(\u6216\u8005\u4E0D\u652F\u6301)</th><th>\u4E00\u822C</th><th>\u597D</th><th>\u6781\u597D</th></tr></thead><tbody><tr><td>\u6570\u636E\u89C4\u6A21</td><td>Redis</td><td>Es\u3001Mysql</td><td>mongodb</td><td>Hbase</td></tr><tr><td>\u67E5\u8BE2\u6027\u80FD</td><td>Hbase</td><td>Es\u3001Mysql</td><td>mongodb</td><td>Redis</td></tr><tr><td>\u5199\u5165\u6027\u80FD</td><td>Es</td><td>Mysql</td><td>Hbase\u3001mongodb</td><td>Redis</td></tr><tr><td>\u590D\u6742\u67E5\u8BE2/\u7D22\u5F15\u529F\u80FD</td><td>Redis</td><td>Hbase\u3001Mysql</td><td>mongodb</td><td>Es</td></tr><tr><td>\u6C34\u5E73\u6269\u5BB9/\u6570\u636E\u8FC1\u79FB</td><td>Mysql</td><td>redis\u3001Hbase\u3001Es</td><td></td><td>mongodb</td></tr><tr><td>\u4E8B\u52A1</td><td>Redis\u3001Hbase\u3001Es</td><td>mongodb(4.X)</td><td></td><td>Mysql</td></tr><tr><td>\u5206\u5E03\u5F0F\u4E8B\u52A1</td><td>Redis\u3001Hbase\u3001Mysql\u3001Es</td><td>mongodb(4.2)</td><td></td><td></td></tr><tr><td>\u6C34\u5E73\u6269\u5BB9/\u6570\u636E\u8FC1\u79FB</td><td>Mysql</td><td>Redis\u3001Hbase\u3001Es</td><td></td><td>mongodb</td></tr><tr><td>\u4E22\u6570\u636E</td><td>Redis Es Mysql(\u5F02\u6B65\u590D\u5236)</td><td></td><td>mongodb(\u5F02\u6B65\u590D\u5236) Mysql(\u540C\u6B65\u590D\u5236)</td><td>mongodb(raft \u590D\u5236)</td></tr><tr><td>\u78C1\u76D8\u7A7A\u95F4\u5360\u7528 (\u4E00\u4EBF\u6761\u6570\u636E\uFF0C5 \u5B57\u6BB5\uFF0C\u5355\u6761\u6570\u636E 230 \u5B57\u8282)</td><td>Es(120G)</td><td>Mysql(57G)</td><td>Hbase(42G)</td><td>mongodb(24G)</td></tr></tbody></table><p>\u4E1A\u52A1\u4E0A\u9009\u62E9 mongo \u7684\u7406\u7531</p><ol><li>\u6D77\u91CF\u6570\u636E</li><li>\u6570\u636E\u7ED3\u6784\u590D\u6742\uFF0C\u5B57\u6BB5\u5D4C\u5957\u67E5\u8BE2</li><li>schema free\uFF0C\u5217\u53EF\u80FD\u7ECF\u5E38\u53D8\u52A8</li><li>\u5F31\u4E8B\u52A1</li></ol><p>\u4E2D\u53F0\u9009\u62E9 mongo \u7406\u7531</p><p>\u4E2D\u53F0\u662F\u63D0\u4F9B\u901A\u7528\u80FD\u529B\u7684\u5E73\u53F0\uFF0C\u9700\u8981\u4E00\u4E2A\u4E00\u7EA7\u5B57\u6BB5\u677E\u6563\uFF0C\u4E8C\u7EA7\u5B57\u6BB5\u7075\u6D3B\u7684\u6570\u636E\u7ED3\u6784\u4EE5\u652F\u6301\u5927\u91CF\u4E0D\u540C\u4E1A\u52A1\u7684\u63A5\u5165\uFF0C\u540C\u65F6\uFF0Cmongo \u5929\u751F\u53C8\u652F\u6301\u4E86\u5404\u79CD\u5404\u6837\u7684\u590D\u6742\u67E5\u8BE2\uFF0C\u4E5F\u7B26\u5408\u4E2D\u53F0\u67E5\u8BE2\u7EF4\u5EA6\u590D\u6742\u7684\u60C5\u51B5\u3002</p><p>\u53E6\u5916\uFF0C\u5F97\u76CA\u4E8E mongo \u662F\u975E\u5173\u7CFB\u578B\u7684\uFF0C\u5236\u54C1\u6570\u636E\u6536\u655B\u4E8E\u4E00\u4E2A\u6587\u6863\u5BF9\u8C61\u91CC\uFF0C\u4E2D\u53F0\u7528 mongo \u540E\u57FA\u672C\u4E0D\u6D89\u53CA\u4E8B\u52A1\uFF0C\u5BF9\u5236\u54C1\u7684\u4FEE\u6539\u57FA\u672C\u4E00\u6761\u8BED\u53E5\u5C31\u53EF\u4EE5\u5B8C\u6210\u3002</p><p>\u6700\u540E\uFF0C\u4E2D\u53F0\u662F\u9700\u8981\u9762\u5411\u624B\u673A\u7AEF\u7684\uFF0C\u624B\u673A\u6709 4 \u4EBF+\uFF0C\u5BF9\u6570\u636E\u5E93 tps \u8981\u6C42\u6BD4\u8F83\u9AD8\uFF0Cmongo \u5355\u673A\u7684\u67E5\u8BE2\u6027\u80FD 2w \u4EE5\u4E0A\uFF0C\u6027\u80FD\u8F83\u597D\u3002</p>",7);function e(r,l){return o}var n=t(s,[["render",e],["__file","\u6570\u636E\u5E93\u5BF9\u6BD4.html.vue"]]);export{n as default};
