"use strict";(self.webpackChunkblog_vue_press=self.webpackChunkblog_vue_press||[]).push([[507],{5185:(s,n,a)=>{a.r(n),a.d(n,{data:()=>e});const e={key:"v-389a4c7f",path:"/%E5%85%B6%E4%BB%96/vueAdmin.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:3,title:"项目结构",slug:"项目结构",children:[]},{level:3,title:"配置相关",slug:"配置相关",children:[]},{level:3,title:"mock",slug:"mock",children:[]},{level:3,title:"权限控制",slug:"权限控制",children:[]},{level:3,title:"部署相关",slug:"部署相关",children:[]}],filePathRelative:"其他/vueAdmin.md",git:{updatedTime:1637325657e3,contributors:[{name:"liujunjia",email:"liujunjia@oppo.com",commits:1}]}}},1412:(s,n,a)=>{a.r(n),a.d(n,{default:()=>t});const e=(0,a(6252).uE)('<p>最近开发了两个后台管理项目，使用到了 vue admin template ，在使用的过程中遇到了一些问题，在这里总结一下</p><h3 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>src\n├─ api\n├─ App<span class="token punctuation">.</span>vue\n├─ assets\n├─ components\n├─ icons\n├─ layout\n├─ main<span class="token punctuation">.</span>js\n├─ permission<span class="token punctuation">.</span>js\n├─ router\n├─ settings<span class="token punctuation">.</span>js\n├─ store\n├─ styles\n├─ utils\n└─ views\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> api</h4><p>在这里封装对接口的请求。另外。如果接口返回的数据格式和需要的不一致，可以在这里处理一下数据结构，如：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export function detail(id) {\n  return request({\n    url: &#39;module/&#39; + id,\n    method: &#39;get&#39;\n  }).then(res =&gt; {\n    // 因为数据结构奇葩，需提前处理数据\n    res.data.modelFlag = res.data.modelFlag + &#39;&#39;\n    res.data.moduleModelRelList = res.data.moduleModelRelList\n    .reduce((pre, cur) =&gt; {\n      pre.push(cur.model)\n      return pre\n    }, [])\n    res.data.moduleColorosVersionRelList = res.data.moduleColorosVersionRelList\n    .reduce((pre, cur) =&gt; {\n      pre.push(cur.colorosVersion)\n      return pre\n    }, [])\n    res.data.time = [new Date(res.data.validBeginDate), new Date(res.data.validEndDate)]\n    return res\n  })\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h4 id="app-vue" tabindex="-1"><a class="header-anchor" href="#app-vue" aria-hidden="true">#</a> App.vue</h4><p>页面的根组件，里面主要是一个 router-view</p><h4 id="assets" tabindex="-1"><a class="header-anchor" href="#assets" aria-hidden="true">#</a> assets</h4><p>图片、字体等资源</p><h4 id="components" tabindex="-1"><a class="header-anchor" href="#components" aria-hidden="true">#</a> components</h4><p>组件</p><h4 id="icons" tabindex="-1"><a class="header-anchor" href="#icons" aria-hidden="true">#</a> icons</h4><p>存放 svg 图标，vue admin template 在 svg logo 的使用上做了一些优化：</p><ul><li>配置 webpack ，将 src/icons 里的 svg 从 file-loader exclude 掉，再将其 include 进 svg-sprite-loader</li><li>在 src/icon/index.js 使用 webpack requireContext api 自动导入所有 svg</li><li>在 src/icon/index.js 全局注册 svg-icon 组件</li><li>使用 svgo 优化 svg 文件大小，配置文件是 src/icons/svgo.yml</li></ul><p>配置好后，需要新图标只需在 src/icons/svg 新建图标文件，再在 svg-icon 组件上传入对应类名即可</p><h4 id="layout" tabindex="-1"><a class="header-anchor" href="#layout" aria-hidden="true">#</a> layout</h4><p>布局相关的组件：具体是Sidebar，Navbar，AppMain。其中 Navbar 里使用了Breadcrumb 和 Hamburger</p><h4 id="main-js" tabindex="-1"><a class="header-anchor" href="#main-js" aria-hidden="true">#</a> main.js</h4><p>入口文件。进行样式导入，插件注册，根组件挂载等逻辑</p><h4 id="permission" tabindex="-1"><a class="header-anchor" href="#permission" aria-hidden="true">#</a> permission</h4><p>权限相关逻辑，后面涉及</p><h4 id="router" tabindex="-1"><a class="header-anchor" href="#router" aria-hidden="true">#</a> router</h4><p>路由文件</p><h4 id="settings-js" tabindex="-1"><a class="header-anchor" href="#settings-js" aria-hidden="true">#</a> settings.js</h4><p>项目配置文件</p><h4 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> store</h4><p>vuex 文件</p><h4 id="styles" tabindex="-1"><a class="header-anchor" href="#styles" aria-hidden="true">#</a> styles</h4><p>全局样式</p><h4 id="utils" tabindex="-1"><a class="header-anchor" href="#utils" aria-hidden="true">#</a> utils</h4><p>工具函数，axios 封装，时间格式化，标题拼接，链接检测等</p><h4 id="views" tabindex="-1"><a class="header-anchor" href="#views" aria-hidden="true">#</a> views</h4><p>页面文件，项目的页面写在这里，是后续开发最常访问的文件夹</p><hr><h3 id="配置相关" tabindex="-1"><a class="header-anchor" href="#配置相关" aria-hidden="true">#</a> 配置相关</h3><p>做新项目时不只是直接进入 views 文件夹开发页面，还有一些其他的细节需要配置</p><ul><li><p>页面 title ，在 src/settings.js 里面配置</p></li><li><p>页面 logo ，在项目根目录的 public 里进行替换</p></li><li><p>主题色修改</p><p>新建 scss</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token comment">/* 改变主题色变量 */</span>\n<span class="token property"><span class="token variable">$--color-primary</span></span><span class="token punctuation">:</span> teal<span class="token punctuation">;</span>\n\n<span class="token comment">/* 改变 icon 字体路径变量，必需 */</span>\n<span class="token property"><span class="token variable">$--font-path</span></span><span class="token punctuation">:</span> <span class="token string">&#39;~element-ui/lib/theme-chalk/fonts&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">@import</span> <span class="token string">&quot;~element-ui/packages/theme-chalk/src/index&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在 main.js 引入这个自定义的 scss 取代 element 默认 scss</p></li><li><p>element-ui 按需引入（可选），如果对打包后的资源有体积上的要求，可以配合 babel-plugin-component 实现按需加载</p></li></ul><hr><h3 id="mock" tabindex="-1"><a class="header-anchor" href="#mock" aria-hidden="true">#</a> mock</h3><p>可以利用 mock 来模拟接口调用，mock 的逻辑写在根目录的 mock 文件夹下，可以根据后端 yapi 上分好的模块建立对应的 js 文件，如 yapi 上有 table 模块，就在 mock 文件夹中创建 table.js ，按 yapi 模块创建对应 js 可以防止多人开发时，重复定义 mock 接口</p><p>table.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> Mock <span class="token keyword">from</span> <span class="token string">&#39;mockjs&#39;</span>\n\n<span class="token keyword">const</span> data <span class="token operator">=</span> Mock<span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token string">&#39;items|30&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n    id<span class="token operator">:</span> <span class="token string">&#39;@id&#39;</span><span class="token punctuation">,</span>\n    title<span class="token operator">:</span> <span class="token string">&#39;@sentence(10, 20)&#39;</span><span class="token punctuation">,</span>\n    <span class="token string">&#39;status|1&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;published&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;draft&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;deleted&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    author<span class="token operator">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span>\n    display_time<span class="token operator">:</span> <span class="token string">&#39;@datetime&#39;</span><span class="token punctuation">,</span>\n    pageviews<span class="token operator">:</span> <span class="token string">&#39;@integer(300, 5000)&#39;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    url<span class="token operator">:</span> <span class="token string">&#39;/vue-admin-template/table/list&#39;</span><span class="token punctuation">,</span>\n    type<span class="token operator">:</span> <span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">response</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> items <span class="token operator">=</span> data<span class="token punctuation">.</span>items\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        code<span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">,</span>\n        data<span class="token operator">:</span> <span class="token punctuation">{</span>\n          total<span class="token operator">:</span> items<span class="token punctuation">.</span>length<span class="token punctuation">,</span>\n          items<span class="token operator">:</span> items\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">]</span>\n<span class="token comment">//...</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>如果 table 模块除了 list 还有其他接口，只需在继续添加即可</p><p>mock 的语法可参考</p><p>http://mockjs.com/examples.html</p><hr><h3 id="权限控制" tabindex="-1"><a class="header-anchor" href="#权限控制" aria-hidden="true">#</a> 权限控制</h3><p>权限控制有两种场景：</p><ul><li>路由级权限控制</li><li>页面级权限控制</li></ul><h4 id="路由级权限控制" tabindex="-1"><a class="header-anchor" href="#路由级权限控制" aria-hidden="true">#</a> 路由级权限控制</h4><p>通过静态路由和动态路由的拼接实现。具体的做法是在 router 定义时分为静态路由和动态路由，在动态路由的 meta 里配置好可访问的角色数组，在获取到用户信息后，根据用户角色，过滤出可访问的动态路由，再拼接上静态路由即可得出完整的路由表</p><h4 id="页面级权限控制" tabindex="-1"><a class="header-anchor" href="#页面级权限控制" aria-hidden="true">#</a> 页面级权限控制</h4><p>页面级权限控制并不和路由级权限控制冲突，只是细粒度更小，可以实现更多的需求：</p><ul><li>针对个别页面进行权限弹窗提示</li><li>在个别页面内根据不同角色显示不同内容</li></ul><p>这些需求主要是将用户信息存入 vuex 中，再通过路由钩子、自定义组件、自定义命令等方式实现</p><hr><h3 id="部署相关" tabindex="-1"><a class="header-anchor" href="#部署相关" aria-hidden="true">#</a> 部署相关</h3><p>这里的部署主要针对接入 usp</p><p>因为接入 usp 的页面并不是部署在域名的根目录，以绝对路径请求的话转发不到网关拿不到资源，所以首先要修改 vue.config.js 中的 publicPath，将<code>/</code>改为<code>./</code></p><p>其次，还要修改 .env 文件的 VUE_APP_BASE_API，改成对应 usp 域名的 /proxy/aaa/bbb , aaa 为 usp 项目名称，bbb 为接口前缀，这样使得请求可以准确的到达网关，可以被进一步转发至后端</p><p>最后，接入 usp 还需配置 nginx ：</p><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>\n        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">8299</span></span><span class="token punctuation">;</span>\n        <span class="token directive"><span class="token keyword">real_ip_header</span> proxy_protocol</span><span class="token punctuation">;</span>\n\n        <span class="token directive"><span class="token keyword">location</span>  /api/</span> <span class="token punctuation">{</span>\n                <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">proxy_set_header</span> Cookie <span class="token variable">$http_cookie</span></span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">proxy_set_header</span> Host   <span class="token variable">$host</span></span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP      <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">proxy_pass</span>  http://10.84.20.154:9052/api/</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>\n                <span class="token directive"><span class="token keyword">root</span> /home/service/app/game-space-admin-page/release</span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">rewrite</span> ^(.*)$ /index.html break</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token directive"><span class="token keyword">location</span> ~* \\.(js|gif|jpg|jpeg|png|css|icon|woff|ttf)$</span> <span class="token punctuation">{</span>\n                <span class="token directive"><span class="token keyword">root</span> /home/service/app/game-space-admin-page/release</span><span class="token punctuation">;</span>\n                <span class="token directive"><span class="token keyword">add_header</span> Cache-Control no-cache</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>注：后端地址为域名时要去掉 <code>proxy_set_header Host $host;</code></p>',64),p={},t=(0,a(3744).Z)(p,[["render",function(s,n){return e}]])},3744:(s,n)=>{n.Z=(s,n)=>{const a=s.__vccOpts||s;for(const[s,e]of n)a[s]=e;return a}}}]);