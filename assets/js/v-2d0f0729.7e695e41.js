"use strict";(self.webpackChunkblog_vue_press=self.webpackChunkblog_vue_press||[]).push([[652],{1911:(a,n,s)=>{s.r(n),s.d(n,{data:()=>e});const e={key:"v-2d0f0729",path:"/JDK/%E7%94%B1%E7%B1%BB%E8%B7%AF%E5%BE%84%E9%94%99%E8%AF%AF%E5%BC%95%E5%8F%91%E7%9A%84%E9%85%8D%E7%BD%AE%E5%A4%B1%E6%95%88%E5%88%86%E6%9E%90.html",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"现象",slug:"现象",children:[]},{level:2,title:"分析",slug:"分析",children:[]},{level:2,title:"解决",slug:"解决",children:[{level:3,title:"classPath 基础知识",slug:"classpath-基础知识",children:[]},{level:3,title:"项目执行流程",slug:"项目执行流程",children:[]},{level:3,title:"java 启动指定类路径",slug:"java-启动指定类路径",children:[]},{level:3,title:"java -jar 启动指定类路径",slug:"java-jar-启动指定类路径",children:[]}]}],filePathRelative:"JDK/由类路径错误引发的配置失效分析.md",git:{updatedTime:1637806521e3,contributors:[{name:"liujunjia",email:"liujunjia@oppo.com",commits:1}]}}},4773:(a,n,s)=>{s.r(n),s.d(n,{default:()=>p});const e=(0,s(6252).uE)('<h2 id="现象" tabindex="-1"><a class="header-anchor" href="#现象" aria-hidden="true">#</a> 现象</h2><p>有一个新上的服务，接入了 esa-conf (动态配置)这个中间件。发到测试环境后，发现，</p><p>对于 application.properties 配置文件，不管是初始值的获取还是配置的动态更新都是正常的，但是对于 log4j2.xml 这个文件，服务好像完全没有读取。</p><p>除此以外，本地环境使用 esa-conf 下发 log4j2.xml 却是没有问题的。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>分析 esa-conf 的启动流程，查看 esa-conf 的启动日志，得出 esa-conf 的启动流程大概是这样的：</p><ol><li>根据应用 id、环境等信息，从配置中心，获取当前服务的配置我就列表</li><li>得到列表后，将配置文件一一下载到临时目录</li><li>获取当前程序的类路径</li><li>将临时目录的配置文件拷贝到第 3 步得到的路径</li><li>扫描动态配置的注解，读取文件，进行值的注入</li><li>......</li></ol><p>对比正常的服务，发现第 3 步获取类路径时，esa-conf 获取的值是一个 jar 包内的路径，而正常服务的类路径是后缀为 ./conf 的字符串</p><p>所以应该是类路径错误导致的 log4j2 的配置失效，但是为什么 application.xml 没有失效呢，猜测应该是 esa-conf 重写了 spring-boot 加载 application.xml 的逻辑，而对于 log4j2 esa-conf 没有特殊处理，所以当类路径配置错误时，log4j2 无法读取到 log4j2.xml 配置文件。</p><h2 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h2><h3 id="classpath-基础知识" tabindex="-1"><a class="header-anchor" href="#classpath-基础知识" aria-hidden="true">#</a> classPath 基础知识</h3><p>既然已经判断了是 cp 的问题，那首先要了解 cp 的来源：</p><ul><li><p>“. ”， 即当前目录，缺省值</p></li><li><p>环境变量</p></li><li><p>-cp 参数</p></li><li><p>jar 的 MANIFEST.MF 中 Class-Path 的配置</p></li></ul><p>虚拟机对 cp 的处理逻辑是这样的：</p><p>如果没有使用 java -jar 启动，那么 jvm 会优先读取 -cp 参数，如果没有 -cp，就会读环境变量的配置，如也没有环境变量就会使用缺省值。</p><p>但是，如果使用 java -jar 的方式启动，那么无论是 -cp 还是 环境变量的值都会被 <em><strong>忽略</strong></em> ！</p><p>目前很多 java 项目基本都是通过 java -jar 命令来启动的，所以当类路径出现问题时，无论怎么修改 -cp 还是环境变量都是没有意义的。</p><h3 id="项目执行流程" tabindex="-1"><a class="header-anchor" href="#项目执行流程" aria-hidden="true">#</a> 项目执行流程</h3><p>要解决这个问题，需要了解一个 java 项目的打包和执行全流程。</p><p>首先是持续集成，通常一个 java 项目可以通过二者之一打包：</p><ul><li>spring-boot-maven-plugin</li><li>maven-jar-plugin</li></ul><p>打成 jar 包之后，再通过</p><ul><li>maven-assembly-plugin</li></ul><p>打成 zip，打成 zip 后 ，云平台如果是镜像部署，会再构建成 Linux 镜像后上传到版本库（包部署就直接上传了）</p><p>持续部署时，容器通过调用项目内置的启动脚本来启动项目。</p><p>要确保类路径不出错，打包插件的配置和启动脚本都有一些要求。</p><h3 id="java-启动指定类路径" tabindex="-1"><a class="header-anchor" href="#java-启动指定类路径" aria-hidden="true">#</a> java 启动指定类路径</h3><p>用以下方式启动，以 -cp 参数指定</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>java -cp &#39;conf:lib/*:.&#39;  com.xx.xx.Application\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我们团队大部分的项目都不是这样启动的，因为这样写会导致启动脚本不通用（每个项目的主类不一样），写在这里仅供参考。</p><h3 id="java-jar-启动指定类路径" tabindex="-1"><a class="header-anchor" href="#java-jar-启动指定类路径" aria-hidden="true">#</a> java -jar 启动指定类路径</h3><h4 id="spring-boot-maven-plugin" tabindex="-1"><a class="header-anchor" href="#spring-boot-maven-plugin" aria-hidden="true">#</a> spring-boot-maven-plugin</h4><p>如果采用 spring-boot 提供的打包方式，打出来的 jar 包可以称为 fat-jar ，即一个 jar 包里包含了业务代码和它的所有依赖。</p><p>spring 封装了一些 maven 打包的逻辑，使 spring-boot-maven-plugin 打包确保类路径正确需要配置以下两点：</p><ol><li>layout 配置为 zip</li></ol><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout</span><span class="token punctuation">&gt;</span></span>ZIP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>layout 有三个主要的可能的值：</p><p>​ a. JAR，即通常的可执行 jar，main-class 是 org.springframework.boot.loader.jarLauncher</p><p>​ b. WAR，通常的可执行 war，main-class 是 org.springframework.boot.loader.warLauncher</p><p>​ c. ZIP，即通常的可执行 jar，main-class 是 org.springframework.boot.loader.propertiesLauncher</p><blockquote><p>The <code>org.springframework.boot.loader.Launcher</code> class is a special bootstrap class that is used as an executable jar’s main entry point. It is the actual <code>Main-Class</code> in your jar file, and it is used to setup an appropriate <code>URLClassLoader</code> and ultimately call your <code>main()</code> method.</p><p>There are three launcher subclasses (<code>JarLauncher</code>, <code>WarLauncher</code>, and <code>PropertiesLauncher</code>). Their purpose is to load resources (<code>.class</code> files and so on) from nested jar files or war files in directories (as opposed to those explicitly on the classpath). In the case of <code>JarLauncher</code> and <code>WarLauncher</code>, the nested paths are fixed. <code>JarLauncher</code> looks in <code>BOOT-INF/lib/</code>, and <code>WarLauncher</code> looks in <code>WEB-INF/lib/</code> and <code>WEB-INF/lib-provided/</code>. You can add extra jars in those locations if you want more. The <code>PropertiesLauncher</code> looks in <code>BOOT-INF/lib/</code> in your application archive by default. You can add additional locations by setting an environment variable called <code>LOADER_PATH</code> or <code>loader.path</code> in <code>loader.properties</code> (which is a comma-separated list of directories, archives, or directories within archives).</p></blockquote><p>main-class 是 jar 文件的实际主类，它自定义了类加载器，从 spring 自定义结构的胖 jar 中加载类，最终再调用项目里的主类，将服务启动起来。</p><p>其中 launcher 是 propertiesLauncher 时才可以用启动参数设置外部的类路径。</p><ol start="2"><li>启动参数加 -Dloader.path=xxx</li></ol><p>当且仅当 layout 为 ZIP 时这个参数才生效，这样才能指定项目的类路径</p><ol start="3"><li>其次，可能是 esa-conf 的 bug，用 spring-boot-maven-plugin 打包时启动类里可能还需要再加一次</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>HeraclesBootstrap.getInstance();\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="maven-jar-plugin" tabindex="-1"><a class="header-anchor" href="#maven-jar-plugin" aria-hidden="true">#</a> maven-jar-plugin</h4><p>当用 maven-jar-plugin 打包时，需要添加此行来指定类路径：</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifestEntries</span><span class="token punctuation">&gt;</span></span>\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Class-Path</span><span class="token punctuation">&gt;</span></span>../conf/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Class-Path</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifestEntries</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>',50),t={},p=(0,s(3744).Z)(t,[["render",function(a,n){return e}]])},3744:(a,n)=>{n.Z=(a,n)=>{const s=a.__vccOpts||a;for(const[a,e]of n)s[a]=e;return s}}}]);