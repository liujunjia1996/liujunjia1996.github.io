import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.7a7684da.js";const a={},e=s(`<h1 id="\u4E24\u6570\u4E4B\u548C" tabindex="-1"><a class="header-anchor" href="#\u4E24\u6570\u4E4B\u548C" aria-hidden="true">#</a> \u4E24\u6570\u4E4B\u548C</h1><p>\u8FD9\u4E2A\u662F\u627E\u7D22\u5F15\uFF0C\u6240\u4EE5\u4E0D\u80FD\u7528\u53CC\u6307\u9488\uFF08\u53CC\u6307\u9488\u8981\u6C42\u6570\u7EC4\u6709\u5E8F\uFF0C\u4F46\u662F\u4E00\u65E6\u6392\u5E8F\u5C31\u4E0D\u80FD\u5F97\u5230\u539F\u6765\u7684\u7D22\u5F15\u4E86\uFF09</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map&lt;Integer, Integer&gt; map = new HashMap&lt;&gt;();
        for (int i = 0; i &lt; nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                return new int[]{map.get(target - nums[i]), i};
            }
            map.put(nums[i], i);
        }

        return null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h1 id="\u4E09\u6570\u4E4B\u548C" tabindex="-1"><a class="header-anchor" href="#\u4E09\u6570\u4E4B\u548C" aria-hidden="true">#</a> \u4E09\u6570\u4E4B\u548C</h1><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums) {
        return threeSum(nums, 0);
    }


    public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums, int begin, int target) {
        var l = nums.length;
        var res = new ArrayList&lt;List&lt;Integer&gt;&gt;();
        for (int i = begin; i &lt; l - 2; i++) {
            if (i == begin || nums[i] != nums[i - 1]) {
                final int v = nums[i];
                var twoSumList = twoSum(nums, i, target - v);
                twoSumList.forEach(list -&gt; {
                    list.add(v);
                    res.add(list);
                });
            }
        }
        return res;
    }

    private List&lt;List&lt;Integer&gt;&gt; twoSum(int[] nums, int begin, int target) {
        int left, right, start, end;
        start = left = begin + 1;
        end = right = nums.length - 1;
        var res = new ArrayList&lt;List&lt;Integer&gt;&gt;();
        while (left &lt; right) {
            //\u8DF3\u8FC7\u76F8\u540C\u7684
            if (left != start &amp;&amp; nums[left] == nums[left - 1]) {
                left++;
                continue;
            }
            if (right != end &amp;&amp; nums[right] == nums[right + 1]) {
                right--;
                continue;
            }
            var sum = nums[left] + nums[right];
            if (sum &gt; target) {
                right--;
            } else if (sum == target) {
                var list = new ArrayList&lt;Integer&gt;();
                list.add(nums[left]);
                list.add(nums[right]);
                res.add(list);
                left++;
                right--;
            } else {
                left++;
            }

        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><h1 id="\u56DB\u6570\u4E4B\u548C" tabindex="-1"><a class="header-anchor" href="#\u56DB\u6570\u4E4B\u548C" aria-hidden="true">#</a> \u56DB\u6570\u4E4B\u548C</h1><p>\u7ED9\u4E09\u6570\u4E4B\u548C\u5957\u4E00\u5C42</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {

    public List&lt;List&lt;Integer&gt;&gt; fourSum(int[] nums, int target) {
        var res = new ArrayList&lt;List&lt;Integer&gt;&gt;();
        Arrays.sort(nums);

        for (int i = 0; i &lt; nums.length - 3; i++) {
            final int v = nums[i];
            if (i == 0 || v != nums[i - 1]) {
                var threeSumRes = threeSum(nums, i + 1, target - v);
                threeSumRes.forEach(list -&gt; {
                    list.add(v);
                    res.add(list);
                });
            }
        }
        return res;
    }

    public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums, int begin, int target) {
        var l = nums.length;
        var res = new ArrayList&lt;List&lt;Integer&gt;&gt;();
        for (int i = begin; i &lt; l - 2; i++) {
            if (i == begin || nums[i] != nums[i - 1]) {
                final int v = nums[i];
                var twoSumList = twoSum(nums, i, target - v);
                twoSumList.forEach(list -&gt; {
                    list.add(v);
                    res.add(list);
                });
            }
        }
        return res;
    }

    private List&lt;List&lt;Integer&gt;&gt; twoSum(int[] nums, int begin, int target) {
        int left, right, start, end;
        start = left = begin + 1;
        end = right = nums.length - 1;
        var res = new ArrayList&lt;List&lt;Integer&gt;&gt;();
        while (left &lt; right) {
            //\u8DF3\u8FC7\u76F8\u540C\u7684
            if (left != start &amp;&amp; nums[left] == nums[left - 1]) {
                left++;
                continue;
            }
            if (right != end &amp;&amp; nums[right] == nums[right + 1]) {
                right--;
                continue;
            }
            var sum = nums[left] + nums[right];
            if (sum &gt; target) {
                right--;
            } else if (sum == target) {
                var list = new ArrayList&lt;Integer&gt;();
                list.add(nums[left]);
                list.add(nums[right]);
                res.add(list);
                left++;
                right--;
            } else {
                left++;
            }

        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div><h1 id="n-\u6570\u4E4B\u548C" tabindex="-1"><a class="header-anchor" href="#n-\u6570\u4E4B\u548C" aria-hidden="true">#</a> n \u6570\u4E4B\u548C</h1><p>\u4ECE\u4E09\u6570\u4E4B\u548C\u3001\u56DB\u6570\u4E4B\u548C\u53EF\u4EE5\u627E\u5230\u89C4\u5F8B\uFF0C\u5728 n \u5927\u4E8E 2 \u65F6\u5FAA\u73AF\u9012\u5F52\uFF0C\u7B49\u4E8E 2 \u65F6\u53CC\u6307\u9488\u5BFB\u627E</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {

    public List&lt;List&lt;Integer&gt;&gt; fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        return nSum(nums, 4, 0, target);
    }

    public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums) {
        Arrays.sort(nums);
        return nSum(nums, 3, 0, 0);
    }

    public List&lt;List&lt;Integer&gt;&gt; nSum(int[] nums, int n, int begin, int target) {
        var l = nums.length;

        var res = new ArrayList&lt;List&lt;Integer&gt;&gt;();

        if (n == 2) {
            int left, right, start, end;
            start = left = begin;
            end = right = l - 1;
            while (left &lt; right) {
                //\u8DF3\u8FC7\u76F8\u540C\u7684
                if (left != start &amp;&amp; nums[left] == nums[left - 1]) {
                    left++;
                    continue;
                }
                if (right != end &amp;&amp; nums[right] == nums[right + 1]) {
                    right--;
                    continue;
                }
                var sum = nums[left] + nums[right];
                if (sum &gt; target) {
                    right--;
                } else if (sum == target) {
                    var list = new ArrayList&lt;Integer&gt;();
                    list.add(nums[left]);
                    list.add(nums[right]);
                    res.add(list);
                    left++;
                    right--;
                } else {
                    left++;
                }
            }
        } else {
            for (int i = begin; i &lt; l - n + 1; i++) {
                if (i == begin || nums[i] != nums[i - 1]) {
                    final int v = nums[i];
                    nSum(nums, n - 1, i + 1, target - v).forEach(list -&gt; {
                        list.add(v);
                        res.add(list);
                    });
                }
            }
        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div>`,11);function r(l,i){return e}var t=n(a,[["render",r],["__file","\u4E4B\u548C\u95EE\u9898.html.vue"]]);export{t as default};
