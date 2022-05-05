import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as s}from"./app.9c7ab487.js";const a={},e=s(`<p>\u5173\u4E8E\u6392\u5E8F\u7B97\u6CD5\u5DF2\u7ECF\u770B\u4E86\u65E0\u6570\u6B21\u4E5F\u5199\u4E86\u65E0\u6570\u6B21\u4E86\uFF0C\u4F46\u662F\u603B\u662F\u611F\u89C9\u8BB0\u4E0D\u4F4F\uFF0C\u6240\u4EE5\u5E72\u8106\u76F4\u63A5\u90FD\u5199\u5728\u4E00\u8D77\u603B\u7ED3\u4E0B\u5427\u3002</p><p>\u5B9E\u73B0\u7684\u8BED\u8A00\u5C31\u7528 java \u5427\uFF0C\u53CD\u6B63\u4E5F\u90FD\u5DEE\u4E0D\u591A\u3002</p><h1 id="\u5192\u6CE1\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5192\u6CE1\u6392\u5E8F" aria-hidden="true">#</a> \u5192\u6CE1\u6392\u5E8F</h1><p>\u65F6\u95F4\u590D\u6742\u5EA6 O(n2)</p><p>\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] sortArray(int[] nums) {
        bubbleSort(nums);
        return nums;
    }
    
    public void bubbleSort(int[] nums) {
        // \u6392\u597D\u4E00\u4E2A\u957F\u5EA6\u662F n \u7684\u6570\u7EC4\u5C31\u8981\u5192 n-1 \u6B21\u6CE1
        for(int i = 0;i &lt; nums.length - 1;i++) {
            // \u6BCF\u6B21\u5192\u51FA\u4E00\u4E2A\u5F53\u524D\u5FAA\u73AF\u7684\u6700\u5927\u7684
            for(int j = 0; j &lt; nums.length - 1 - i;j++) {
                if(nums[j]&gt;nums[j+1]) {
                    swap(nums,j,j+1);
                }
            }
        }
    }

    public void swap(int[] nums,int a,int b) {
        if(a != b) {
            int temp = nums[a];
            nums[a] = nums[b];
            nums[b] = temp;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h1 id="\u9009\u62E9\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u9009\u62E9\u6392\u5E8F" aria-hidden="true">#</a> \u9009\u62E9\u6392\u5E8F</h1><p>\u65F6\u95F4\u590D\u6742\u5EA6 O(n2)</p><p>\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] sortArray(int[] nums) {
        selectSort(nums);
        return nums;
    }

    public void selectSort(int[] nums) {
        // \u8981\u9009\u62E9 n - 1 \u8F6E
        for(int i = 0;i &lt; nums.length - 1;i++) {
            // \u627E\u5230\u6BCF\u4E00\u8F6E\u7684\u6700\u5927\u548C\u5F53\u524D i \u6307\u5411\u7684\u5143\u7D20\u4EA4\u6362
            int min = i;
            for (int j = i + 1; j &lt; nums.length; j++) {
                if (nums[j] &lt; nums[min]) {
                    min = j;
                }
            }
            swap(nums, min, i);
        }
    }

    public void swap(int[] nums,int a,int b) {
        if(a != b) {
            int temp = nums[a];
            nums[a] = nums[b];
            nums[b] = temp;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h1 id="\u63D2\u5165\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u63D2\u5165\u6392\u5E8F" aria-hidden="true">#</a> \u63D2\u5165\u6392\u5E8F</h1><p>\u65F6\u95F4\u590D\u6742\u5EA6 O(n2)</p><p>\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] sortArray(int[] nums) {
        insertSort(nums);
        return nums;
    }

    // \u5FEB\u901F\u6392\u5E8F\u7684\u968F\u673A\u5316\u7248\u672C\uFF0C\u9664\u4E86\u8C03\u7528\u5212\u5206\u51FD\u6570\u4E0D\u540C\uFF0C\u548C\u4E4B\u524D\u5FEB\u6392\u7684\u4EE3\u7801\u7ED3\u6784\u4E00\u6A21\u4E00\u6837
    public void insertSort(int[] nums) {
        // \u4ECE\u7B2C\u4E8C\u4E2A\u5F00\u59CB\u904D\u5386
        for(int i = 1;i &lt; nums.length;i++) {
            int j = i;
            while(j &gt;= 1 &amp;&amp; nums[j] &lt; nums[j-1] ) {
                swap(nums, j, j - 1);
                j--;
            }
        }
    }


    public void swap(int[] nums,int a,int b) {
        if(a != b) {
            int temp = nums[a];
            nums[a] = nums[b];
            nums[b] = temp;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h1 id="\u5FEB\u901F\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u6392\u5E8F" aria-hidden="true">#</a> \u5FEB\u901F\u6392\u5E8F</h1><p>\u65F6\u95F4\u590D\u6742\u5EA6 O(nlogn)</p><p>\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>public class Solution {
    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    private void quickSort(int[] nums, int start, int end) {
        if (start &gt;= end) return;
        int left = start, right = end;
        int pivot = nums[start];
        while (left &lt; right) {
            while (left &lt; right &amp;&amp; nums[right] &gt;= pivot) right--;
            nums[left] = nums[right];
            while (left &lt; right &amp;&amp; nums[left] &lt;= pivot) left++;
            nums[right] = nums[left];
        }
        nums[left] = pivot;
        quickSort(nums, start, left - 1);
        quickSort(nums, left + 1, end);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u4ECA\u5929\u5728\u7B97\u6CD5\u5BFC\u8BBA\u91CC\u770B\u5230\u4E86\u53E6\u4E00\u4E2A\u7248\u672C\u7684\u5FEB\u901F\u6392\u5E8F\uFF0C\u76F8\u6BD4\u4E4B\u524D\u7684\uFF0C\u4ED6\u6709\u5982\u4E0B\u4E24\u4E2A\u533A\u522B</p><ol><li>\u7528\u6700\u53F3\u8FB9\u7684\u6570\u505A\u57FA\u51C6\u3002\u8FD9\u4E2A\u548C\u7528\u5DE6\u8FB9\u6216\u8005\u7528\u4E2D\u95F4\u7684\u6570\u5012\u533A\u522B\u4E0D\u5927\uFF0C\u53EA\u662F\u5F00\u62D3\u4E86\u601D\u8DEF</li><li>\u91C7\u7528\u968F\u673A\u5316\u5206\u7EC4\uFF0C\u5BF9\u5DF2\u7ECF\u6709\u5E8F\u7684\u6570\u7EC4\u63D0\u5347\u6781\u5927(\u4E4B\u524D\u7684\u7B97\u6CD5\u5BF9\u5DF2\u7ECF\u6709\u5E8F\u7684\u6570\u7EC4\u65F6\u95F4\u590D\u6742\u5EA6\u5C06\u9000\u5316\u5230 n2)</li></ol><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] sortArray(int[] nums) {
        randomQuickSort(nums,0,nums.length - 1);
        return nums;
    }

    // \u5FEB\u901F\u6392\u5E8F\uFF0C\u5206\u89E3 + \u89E3\u51B3 + \u5408\u5E76
    public void quickSort(int[] a, int left, int right) {
        if (left &lt; right) {
            int p = partition(a, left, right);
            quickSort(a, left, p - 1);
            quickSort(a, p + 1, right);
        }
    }

    // \u5FEB\u901F\u6392\u5E8F\u7684\u968F\u673A\u5316\u7248\u672C\uFF0C\u9664\u4E86\u8C03\u7528\u5212\u5206\u51FD\u6570\u4E0D\u540C\uFF0C\u548C\u4E4B\u524D\u5FEB\u6392\u7684\u4EE3\u7801\u7ED3\u6784\u4E00\u6A21\u4E00\u6837
    public void randomQuickSort(int[] nums, int left, int right) {
        if (left &lt; right) {
            int p = randomPartition(nums,left, right);
            randomQuickSort(nums, left, p - 1);
            randomQuickSort(nums, p + 1, right);
        }
    }

    // \u968F\u673A\u5316\u5212\u5206
    public int randomPartition(int[] nums, int left, int right) {
        int r = new Random().nextInt(right - left) + left; 
        swap(nums, right, r); //\u5C06\u4E3B\u5143\u4E0E\u5E8F\u5217\u6700\u53F3\u8FB9\u5143\u7D20\u4E92\u6362\u4F4D\u7F6E
        return partition(nums, left, right); //\u76F4\u63A5\u8C03\u7528\u4E4B\u524D\u7684\u4EE3\u7801
    }

    // \u6570\u7EC4\u5212\u5206
    private int partition(int[] nums, int left, int right) {
        int x = nums[right];
        int p = left - 1; // p \u6307\u5411\u6700\u540E\u4E00\u4E2A\u5C0F\u4E8E x \u7684\u6570
        for (int i = left; i &lt; right; i++) {
            if (nums[i] &lt;= x) { // \u6BD4 x \u5C0F\uFF0Cp \u5C31\u53EF\u4EE5\u524D\u79FB
                p++;
                swap(nums, p, i);
            }
        }
        swap(nums, p + 1, right);
        return p + 1;
    }

    public void swap(int[] nums,int a,int b) {
        if(a != b) {
            int temp = nums[a];
            nums[a] = nums[b];
            nums[b] = temp;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><p><img src="https://user-images.githubusercontent.com/43411944/135760753-df8dea40-f751-4cea-9ad4-7492ea961dd7.png" alt="image"></p><p>\u7531\u6B64\u53EF\u89C1 leetcode \u4E0A\u7684\u7528\u4F8B\u5E94\u8BE5\u6709\u5F88\u591A\u90FD\u662F\u6709\u5E8F\u7684</p><h1 id="\u5F52\u5E76\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5F52\u5E76\u6392\u5E8F" aria-hidden="true">#</a> \u5F52\u5E76\u6392\u5E8F</h1><p>\u65F6\u95F4\u590D\u6742\u5EA6 O(nlogn)</p><p>\u7A7A\u95F4\u590D\u6742\u5EA6 O(n)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] sortArray(int[] nums) {
        return mergeSort(nums,0,nums.length - 1);
    }

    public static int[] mergeSort(int[] nums, int left, int right) {
        if (left == right)
            return new int[] { nums[left] };
         
         // \u9012\u5F52\u5206\u6CBB
        int mid = left + (right - left) / 2;
        int[] leftArr = mergeSort(nums, left, mid); //\u5DE6\u6709\u5E8F\u6570\u7EC4
        int[] rightArr = mergeSort(nums, mid + 1, right); //\u53F3\u6709\u5E8F\u6570\u7EC4
        int[] newNum = new int[leftArr.length + rightArr.length]; //\u65B0\u6709\u5E8F\u6570\u7EC4

         // \u5408\u5E76\u6570\u7EC4
        int m = 0, i = 0, j = 0; 
        while (i &lt; leftArr.length &amp;&amp; j &lt; rightArr.length) {
            newNum[m++] = leftArr[i] &lt; rightArr[j] ? leftArr[i++] : rightArr[j++];
        }
        while (i &lt; leftArr.length)
            newNum[m++] = leftArr[i++];
        while (j &lt; rightArr.length)
            newNum[m++] = rightArr[j++];
        return newNum;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h1 id="\u5806\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5806\u6392\u5E8F" aria-hidden="true">#</a> \u5806\u6392\u5E8F</h1><p>\u5806\u7684\u5B9A\u4E49:</p><ol><li>\u5B8C\u5168\u4E8C\u53C9\u6811\uFF0C\u5728\u4E00\u9897\u4E8C\u53C9\u6811\u4E2D\uFF0C\u82E5\u9664\u6700\u540E\u4E00\u5C42\u5916\u7684\u5176\u4F59\u5C42\u90FD\u662F\u6EE1\u7684\uFF0C\u5E76\u4E14\u6700\u540E\u4E00\u5C42\u8981\u4E48\u662F\u6EE1\u7684\uFF0C\u8981\u4E48\u5728\u53F3\u8FB9\u7F3A\u5C11\u8FDE\u7EED\u82E5\u5E72\u8282\u70B9\uFF0C\u5219\u6B64\u4E8C\u53C9\u6811\u4E3A\u5B8C\u5168\u4E8C\u53C9\u6811\uFF08Complete Binary Tree\uFF09</li><li>\u7236\u8282\u70B9\u5927\u4E8E\u5B50\u8282\u70B9</li></ol><p>\u6574\u4F53\u6D41\u7A0B:</p><p>\u5148\u6784\u5EFA\u4E00\u4E2A\u5806\uFF0C\u5C06\u9996\u8282\u70B9\u4E0E\u5C3E\u8282\u70B9\u4EA4\u6362\uFF0C\u88C1\u53BB\u4EA4\u6362\u540E\u7684\u5C3E\u8282\u70B9\u5E76\u538B\u5165\u7ED3\u679C\u6570\u7EC4\uFF0C\u91CD\u65B0 heapify \u9996\u8282\u70B9\u3002\u4E4B\u540E\u91CD\u590D\u4E4B\u524D\u7684\u4EA4\u6362\u548C\u88C1\u53BB\u7684\u6D41\u7A0B\uFF0C\u76F4\u5230\u6392\u5E8F\u5B8C\u6BD5\u3002</p><p>\u65F6\u95F4\u590D\u6742\u5EA6 O(nlogn)</p><p>\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class Solution {
    public int[] sortArray(int[] nums) {
        heapSort(nums);
        return nums;
    }

    public static void heapSort(int[] tree) {
        /*
         * \u7B2C\u4E00\u6B65\uFF1A\u5C06\u6570\u7EC4\u5806\u5316 beginIndex = \u6700\u540E\u4E00\u4E2A\u975E\u53F6\u5B50\u8282\u70B9\u3002\u65E0\u9700\u4ECE\u6700\u540E\u4E00\u4E2A\u53F6\u5B50\u8282\u70B9\u5F00\u59CB\u3002
         * \u53F6\u5B50\u8282\u70B9\u53EF\u4EE5\u770B\u4F5C\u5DF2\u7B26\u5408\u5806\u8981\u6C42\u7684\u8282\u70B9\uFF0C\u6839\u8282\u70B9\u5C31\u662F\u5B83\u81EA\u5DF1\u4E14\u81EA\u5DF1\u4EE5\u4E0B\u503C\u4E3A\u6700\u5927\u3002
         */
        int len = tree.length - 1;
        int beginIndex = (tree.length &gt;&gt; 1) - 1;
        for (int i = beginIndex; i &gt;= 0; i--)
            maxHeapify(tree, i, len);
        /*
         * \u7B2C\u4E8C\u6B65\uFF1A\u5BF9\u5806\u5316\u6570\u636E\u6392\u5E8F \u6BCF\u6B21\u90FD\u662F\u79FB\u51FA\u6700\u9876\u5C42\u7684\u6839\u8282\u70B9 A [0]\uFF0C\u4E0E\u6700\u5C3E\u90E8\u8282\u70B9\u4F4D\u7F6E\u8C03\u6362\uFF0C\u540C\u65F6\u904D\u5386\u957F\u5EA6 - 1\u3002
         * \u7136\u540E\u4ECE\u65B0\u6574\u7406\u88AB\u6362\u5230\u6839\u8282\u70B9\u7684\u672B\u5C3E\u5143\u7D20\uFF0C\u4F7F\u5176\u7B26\u5408\u5806\u7684\u7279\u6027\u3002 \u76F4\u81F3\u672A\u6392\u5E8F\u7684\u5806\u957F\u5EA6\u4E3A 0\u3002
         */
        for (int i = len; i &gt; 0; i--) {
            swap(tree, 0, i);
            maxHeapify(tree, 0, i - 1);
        }
    }

    private static void swap(int[] tree, int i, int j) {
        int temp = tree[i];
        tree[i] = tree[j];
        tree[j] = temp;
    }

    /**
     * \u8C03\u6574\u7D22\u5F15\u4E3A index \u5904\u7684\u6570\u636E\uFF0C\u4F7F\u5176\u7B26\u5408\u5806\u7684\u7279\u6027\u3002
     *
     * @param index \u9700\u8981\u5806\u5316\u5904\u7406\u7684\u6570\u636E\u7684\u7D22\u5F15
     * @param len   \u672A\u6392\u5E8F\u7684\u5806\uFF08\u6570\u7EC4\uFF09\u7684\u957F\u5EA6
     */
    private static void maxHeapify(int[] tree, int index, int len) {
        int li = (index &lt;&lt; 1) + 1; // \u5DE6\u5B50\u8282\u70B9\u7D22\u5F15
        int ri = li + 1; // \u53F3\u5B50\u8282\u70B9\u7D22\u5F15
        int cMax = li; // \u5B50\u8282\u70B9\u503C\u6700\u5927\u7D22\u5F15\uFF0C\u9ED8\u8BA4\u5DE6\u5B50\u8282\u70B9\u3002
        if (li &gt; len)
            return; // \u5DE6\u5B50\u8282\u70B9\u7D22\u5F15\u8D85\u51FA\u8BA1\u7B97\u8303\u56F4\uFF0C\u76F4\u63A5\u8FD4\u56DE\u3002
        if (ri &lt;= len &amp;&amp; tree[ri] &gt; tree[li]) // \u5148\u5224\u65AD\u5DE6\u53F3\u5B50\u8282\u70B9\uFF0C\u54EA\u4E2A\u8F83\u5927\u3002
            cMax = ri;
        if (tree[cMax] &gt; tree[index]) {
            swap(tree, cMax, index); // \u5982\u679C\u7236\u8282\u70B9\u88AB\u5B50\u8282\u70B9\u8C03\u6362\uFF0C
            maxHeapify(tree, cMax, len); // \u5219\u9700\u8981\u7EE7\u7EED\u5224\u65AD\u6362\u4E0B\u540E\u7684\u7236\u8282\u70B9\u662F\u5426\u7B26\u5408\u5806\u7684\u7279\u6027\u3002
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><p>\u5806\u6392\u5E8F\u5BF9\u5806\u6709\u4E24\u79CD\u64CD\u4F5C\uFF0C\u4E00\u79CD\u662F\u6784\u5EFA\u5806\uFF0C\u4E00\u79CD\u662F\u8C03\u6574\u5806<br> \u8C03\u6574\u5806\u53EA\u80FD\u628A\u5F53\u524D\u5C42\u7684\u6700\u5927\u503C\u7F6E\u9876\uFF0C\u4E0D\u80FD\u628A\u4F4D\u4E8E\u5B59\u5B50\u8282\u70B9\u7684\u6700\u5927\u503C\u7F6E\u9876<br> \u6240\u4EE5\u6784\u5EFA\u5806\u9700\u8981\u4ECE\u5B8C\u5168\u4E8C\u53C9\u6811\u7684\u6700\u540E\u4E00\u4E2A\u975E\u53F6\u5B50\u8282\u70B9\u5F00\u59CB\u5148\u524D\u6328\u4E2A\u8C03\u7528\u8C03\u6574\u5806\u7684\u65B9\u6CD5</p>`,36);function r(l,i){return e}var u=n(a,[["render",r],["__file","\u6392\u5E8F\u7B97\u6CD5.html.vue"]]);export{u as default};
