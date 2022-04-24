import{_ as n,l as e}from"./app.c6bba32c.js";const s={},a=e(`<p>\u6700\u8FD1\u5347\u7EA7\u4E86 jdk \uFF0C\u5199\u4E00\u4E2A\u6D4B\u8BD5\u4EE3\u7801\u7684\u65F6\u5019\uFF0C\u53D1\u73B0 idea \u6709\u4E2A\u6CE2\u6D6A\u7EBF\uFF0C\u4F5C\u4E3A\u4EE3\u7801\u8B66\u544A\u5F3A\u8FEB\u75C7\uFF0C\u70B9\u5F00\u770B\u4E86\u770B</p><p><img src="https://user-images.githubusercontent.com/43411944/164650963-e7d379cb-a8cf-4ad7-b00d-18bfb7fba14a.png" alt="image"></p><p>\u5FC3\u60F3 record \u662F\u795E\u9A6C\u73A9\u610F\uFF1F\u4E8E\u662F Google \u4E86\u4E00\u6CE2</p><h2 id="record-\u662F\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#record-\u662F\u4EC0\u4E48" aria-hidden="true">#</a> record \u662F\u4EC0\u4E48</h2><p>record \u5176\u5B9E\u662F\u4E00\u4E2A\u8BED\u6CD5\u7CD6\uFF0C\u7B80\u5316\u4E86\u67D0\u4E00\u7C7B\u5BF9\u8C61\u7684\u58F0\u660E\u65B9\u5F0F\u3002\u6BD4\u5982\u4E0B\u9762\u662F jdk16 \u4EE5\u524D\u7684\u58F0\u660E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Person {
    private final String name;
    private final String gender;
    private final int age;

    public Person(String name, String gender, int age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public String getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Person person = (Person) o;
        return age == person.age &amp;&amp;
                Objects.equals(name, person.name) &amp;&amp;
                Objects.equals(gender, person.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, gender, age);
    }

    @Override
    public String toString() {
        return &quot;Person{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, gender=&#39;&quot; + gender + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &#39;}&#39;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>\u5728 jdk17 \uFF0C\u53EA\u9700\u8981\u4E00\u884C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public record Person(String name, String gender, int age) {}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="record-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#record-\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898" aria-hidden="true">#</a> record \u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898</h2><p>\u7B80\u5316\u4E86\u5F88\u591A\u4E00\u6B21\u6027\u5BF9\u8C61(\u66F4\u51C6\u786E\u7684\u8BF4\u662F immutable \u5BF9\u8C61)\u7684\u58F0\u660E\uFF0C\u6BD4\u5982\u4E00\u4E9B vo\u3001dto \u4E4B\u7C7B\u7684</p><blockquote><p>Records provide a compact syntax for declaring classes which are plain immutable data carriers.</p></blockquote><p>\u4F46\u662F record \u611F\u89C9\u8FD8\u662F\u6CA1\u6709 lombok \u7684 @Data \u6CE8\u89E3\u65B9\u4FBF\uFF0C@Data \u7684\u65B9\u5F0F\u4E00\u4E2A\u7C7B\u91CC\u9762\u6709\u4EC0\u4E48\u53D8\u91CF\u4E00\u76EE\u4E86\u7136\uFF0C\u800C\u4E14\u5B57\u6BB5\u662F\u5426\u80FD\u4FEE\u6539\u53D6\u51B3\u4E0E\u662F\u5426\u52A0\u4E86 final \u4FEE\u9970\uFF0C\u6BD4 record \u7075\u6D3B\u591A\u4E86\u3002<br> \u603B\u7ED3\uFF1A\u6CA1\u5565\u7528\uFF0C\u4E0D\u5982 lombok\uFF0Cover<br> ps\uFF1Ajava \u4E0D\u662F\u4E00\u4E2A\u4F4E\u7CD6\u8BED\u8A00\u5417\uFF0C\u600E\u4E48\u611F\u89C9\u8BED\u6CD5\u7CD6\u8D8A\u6765\u8D8A\u591A\u4E86\u3002\u3002\u3002</p>`,12);function r(l,p){return a}var i=n(s,[["render",r],["__file","record.html.vue"]]);export{i as default};
