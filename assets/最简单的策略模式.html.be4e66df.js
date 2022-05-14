import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const e={},a=s(`<p>\u6700\u8FD1\u5E2E\u670B\u53CB\u770B\u4E00\u4E2A\u4ED6\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u5176\u4E2D\u6709\u4E00\u4E2A\u9700\u6C42\uFF0C\u8981\u6839\u636E\u4E00\u4E2A key \u9009\u62E9\u4E0D\u901A\u7684\u65B9\u6CD5\u6267\u884C<br> \u8FD9\u4E2A\u903B\u8F91\u4E0D\u7BA1\u662F\u7528 switch case \u8FD8\u662F if else \u90FD\u4E0D\u592A\u4F18\u96C5\uFF0C\u4E8E\u662F\u60F3\u5230\u7528\u7B80\u5355\u7684\u7B56\u7565\u6A21\u5F0F\u5C01\u88C5\u4E00\u4E0B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>@Slf4j
public class ShowCase {

    static Map&lt;LogLevel, Consumer&lt;String&gt;&gt; printer;

    static {
        printer = new HashMap&lt;&gt;();
        printer.put(LogLevel.TRACE, log::trace);
        printer.put(LogLevel.DEBUG, log::debug);
        printer.put(LogLevel.INFO, log::info);
        printer.put(LogLevel.WARN, log::warn);
        printer.put(LogLevel.ERROR, log::error);
    }

    // \u7B56\u7565\u6A21\u5F0F\u7684\u65B9\u5F0F
    void doPrintStrategy(LogLevel level, String msg) {
        printer.get(Optional.ofNullable(level).orElse(LogLevel.INFO)).accept(msg);
    }


    // if-else \u7684\u65B9\u5F0F
    void doPrintNormal(LogLevel level, String msg) {
        if (LogLevel.TRACE.equals(level)) {
            log.trace(msg);
        } else if (LogLevel.DEBUG.equals(level)) {
            log.debug(msg);
        } else if (LogLevel.INFO.equals(level)) {
            log.info(msg);
        } else if (LogLevel.WARN.equals(level)) {
            log.warn(msg);
        } else if (LogLevel.ERROR.equals(level)) {
            log.error(msg);
        } else {
            log.info(msg);
        }
    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div>`,2);function l(r,p){return a}var c=n(e,[["render",l],["__file","\u6700\u7B80\u5355\u7684\u7B56\u7565\u6A21\u5F0F.html.vue"]]);export{c as default};
