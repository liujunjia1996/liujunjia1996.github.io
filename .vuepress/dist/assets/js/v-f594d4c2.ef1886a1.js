"use strict";(self.webpackChunkblog_vue_press=self.webpackChunkblog_vue_press||[]).push([[611],{9049:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-f594d4c2",path:"/spring/bean%20%E6%B3%A8%E5%85%A5%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96%E6%8A%A5%E9%94%99.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"spring 创建 bean 的流程",slug:"spring-创建-bean-的流程",children:[]},{level:2,title:"三级缓存",slug:"三级缓存",children:[]},{level:2,title:"一级缓存的作用",slug:"一级缓存的作用",children:[]},{level:2,title:"二级缓存的作用",slug:"二级缓存的作用",children:[{level:3,title:"三级缓存的作用",slug:"三级缓存的作用",children:[]},{level:3,title:"三级缓存为什么是方法",slug:"三级缓存为什么是方法",children:[]},{level:3,title:"整体流程",slug:"整体流程",children:[]}]}],filePathRelative:"spring/bean 注入循环依赖报错.md",git:{updatedTime:1637316008e3,contributors:[{name:"liujunjia",email:"43411944+liujunjia1996@users.noreply.github.com",commits:1}]}}},1406:(n,a,s)=>{s.r(a),s.d(a,{default:()=>t});const e=(0,s(6252).uE)('<p>今天新上的一个服务，本地跑没什么问题，但是发到测试环境启动就报错了：</p><div class="language-log ext-log line-numbers-mode"><pre class="language-log"><code><span class="token date number">2021-08-31</span> <span class="token time number">10:04:51.964</span> <span class="token level error important">ERROR</span> <span class="token punctuation">[</span>SpringApplication<span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">843</span><span class="token punctuation">]</span> <span class="token operator">-</span> Application run failed\n\n<span class="token property">org.springframework.beans.factory.BeanCurrentlyInCreationException:</span> \nError creating bean with name <span class="token string">&#39;publicKeyDao&#39;</span><span class="token operator">:</span> \nBean with name <span class="token string">&#39;publicKeyDao&#39;</span> has been injected into other beans <span class="token punctuation">[</span>mqConsumerService<span class="token punctuation">]</span> in its raw version as part of a circular reference<span class="token punctuation">,</span> \nbut has eventually been wrapped<span class="token punctuation">.</span> This means that said other beans do not use the final version of the bean<span class="token punctuation">.</span> \nThis is often the result of over<span class="token operator">-</span>eager type matching <span class="token operator">-</span> consider using <span class="token string">&#39;getBeanNamesForType&#39;</span> with the <span class="token string">&#39;allowEagerInit&#39;</span> flag turned off<span class="token punctuation">,</span> for example<span class="token punctuation">.</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>后来通过 @lazy 注解，让这个 Bean 惰性初始化解决了这个问题。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>\n<span class="token annotation punctuation">@Slf4j</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MqConsumer</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Resource</span>\n    <span class="token class-name">ConfigManager</span> configManager<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Lazy</span>\n    <span class="token annotation punctuation">@Resource</span>\n    <span class="token class-name">PublicKeyDao</span> publicKeyDao<span class="token punctuation">;</span>\n    \n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>但是后来转念一想，出现循环依赖的问题，大概率是因为项目的结构不合理，低层组件依赖了高层组件。</p><p>一个好的代码结构的依赖关系最好是单向的，比如传统的 mvc 架构，controller -&gt; service -&gt; dao ；再比如 ddd 微服务设计思想也是应用层调用领域层，领域层再调用基础设施。</p><p>最后，我修改了项目结构而不是添加 @lazy 解决这个问题。</p><hr><p>跑个题，聊一下 spring 如何解决 bean 循环依赖的问题</p><h2 id="spring-创建-bean-的流程" tabindex="-1"><a class="header-anchor" href="#spring-创建-bean-的流程" aria-hidden="true">#</a> spring 创建 bean 的流程</h2><p>实例化，通过反射创建出实例<br> 注入，填充属性<br> 初始化，执行各种回调</p><h2 id="三级缓存" tabindex="-1"><a class="header-anchor" href="#三级缓存" aria-hidden="true">#</a> 三级缓存</h2><p>singletonObjects 单例池<br> earlySingletonObjects 半成品池<br> singletonFactories 工厂方法池，lamda</p><h2 id="一级缓存的作用" tabindex="-1"><a class="header-anchor" href="#一级缓存的作用" aria-hidden="true">#</a> 一级缓存的作用</h2><p>缓存成品 bean</p><h2 id="二级缓存的作用" tabindex="-1"><a class="header-anchor" href="#二级缓存的作用" aria-hidden="true">#</a> 二级缓存的作用</h2><p>缓存半成品 bean</p><h3 id="三级缓存的作用" tabindex="-1"><a class="header-anchor" href="#三级缓存的作用" aria-hidden="true">#</a> 三级缓存的作用</h3><p>缓存能暴露出 bean 的工厂方法，使得可以提前获取到 bean</p><h3 id="三级缓存为什么是方法" tabindex="-1"><a class="header-anchor" href="#三级缓存为什么是方法" aria-hidden="true">#</a> 三级缓存为什么是方法</h3><p>不仅要暴露出 bean，还要执行一些后置处理器<br> lamda 存的是这个方法</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Object</span> exposedObject <span class="token operator">=</span> bean<span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mbd<span class="token punctuation">.</span><span class="token function">isSynthetic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasInstantiationAwareBeanPostProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BeanPostProcessor</span> bp <span class="token operator">:</span> <span class="token function">getBeanPostProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>bp <span class="token keyword">instanceof</span> <span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span> ibp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SmartInstantiationAwareBeanPostProcessor</span><span class="token punctuation">)</span> bp<span class="token punctuation">;</span>\n                exposedObject <span class="token operator">=</span> ibp<span class="token punctuation">.</span><span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span>exposedObject<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> exposedObject<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>如果没有 aop 情况这个方法相当于：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Object</span> exposedObject <span class="token operator">=</span> bean<span class="token punctuation">;</span> \n<span class="token keyword">return</span> exposedObject\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>如果有 aop，就会创建出代理对象再返回</p><h3 id="整体流程" tabindex="-1"><a class="header-anchor" href="#整体流程" aria-hidden="true">#</a> 整体流程</h3><p>Spring 通过三级缓存解决了循环依赖，其中一级缓存为单例池（singletonObjects）,二级缓存为早期曝光对象earlySingletonObjects，三级缓存为早期曝光对象工厂（singletonFactories）。当 A、B 两个类发生循环引用时，在A 完成实例化后，就使用实例化后的对象去创建一个对象工厂，并添加到三级缓存中，如果 A 被 AOP 代理，那么通过这个工厂获取到的就是 A 代理后的对象，如果 A 没有被 AOP 代理，那么这个工厂获取到的就是 A 实例化的对象。当 A 进行属性注入时，会去创建 B，同时 B 又依赖了 A，所以创建 B 的同时又会去调用 getBean(a) 来获取需要的依赖，此时的getBean(a) 会从缓存中获取，第一步，先获取到三级缓存中的工厂；第二步，调用对象工工厂的 getObject 方法来获取到对应的对象，得到这个对象后将其注入到 B 中。紧接着 B 会走完它的生命周期流程，包括初始化、后置处理器等。当 B 创建完后，会将 B 再注入到 A 中，此时 A 再完成它的整个生命周期。<br><img src="https://user-images.githubusercontent.com/43411944/139638865-d9e95af5-fd5f-4106-9468-df69f8e35b54.png" alt="image"></p>',27),p={},t=(0,s(3744).Z)(p,[["render",function(n,a){return e}]])},3744:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,e]of a)s[n]=e;return s}}}]);