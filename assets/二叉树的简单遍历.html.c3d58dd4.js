import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{b as e}from"./app.7a7684da.js";const s={},r=e(`<p>\u524D\u3001\u4E2D\u3001\u540E\u3001\u5C42\u5E8F\u904D\u5386\u548C\u53F3\u4FA7\u89C6\u56FE\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>class TraverseBinaryTree {

    void preOrder(TreeNode root) {
        if (root == null) return;
        preOrder(root.left);
        System.out.println(root);
        preOrder(root.right);
    }

    void inOrder(TreeNode root) {
        if (root == null) return;
        System.out.println(root);
        inOrder(root.left);
        inOrder(root.right);
    }

    void postOrder(TreeNode root) {
        if (root == null) return;
        postOrder(root.left);
        postOrder(root.right);
        System.out.println(root);
    }

    // \u5C42\u5E8F\u904D\u5386
    void index(TreeNode root) {
        LinkedList&lt;TreeNode&gt; q = new LinkedList&lt;&gt;();
        q.add(root);
        while (!q.isEmpty()) {
            var node = q.remove();
            System.out.println(node.val);
            if (node.left != null)
                q.add(node.left);
            if (node.right != null)
                q.add(node.right);
        }
    }

    // \u4E8C\u53C9\u6811\u7684\u53F3\u4FA7\u89C6\u56FE
    List&lt;Integer&gt; rightSideView(TreeNode root) {
        var map = new TreeMap&lt;Integer, Integer&gt;();
        var res = new ArrayList&lt;Integer&gt;();
        travel(root, 1, map);
        return new ArrayList&lt;&gt;(map.values());
    }

    void travel(TreeNode node, int index, Map&lt;Integer, Integer&gt; cache) {
        if (node == null) return;
        cache.putIfAbsent(index, node.val);
        travel(node.right, index + 1, cache);
        travel(node.left, index + 1, cache);
    }

    List&lt;Integer&gt; rightSideViewIndex(TreeNode root) {
        if(root == null) return List.of();

        Map&lt;Integer, Integer&gt; rightmostValueAtDepth = new TreeMap&lt;&gt;();

        // \u91C7\u7528\u53CC\u6808
        Queue&lt;TreeNode&gt; nodeQueue = new ArrayDeque&lt;&gt;();
        Queue&lt;Integer&gt; depthQueue = new ArrayDeque&lt;&gt;();

        // \u521D\u59CB\u5316
        nodeQueue.add(root);
        depthQueue.add(0);

        while (!nodeQueue.isEmpty()) {
            TreeNode node = nodeQueue.remove();
            int depth = depthQueue.remove();

            // \u7531\u4E8E\u6BCF\u4E00\u5C42\u6700\u540E\u4E00\u4E2A\u8BBF\u95EE\u5230\u7684\u8282\u70B9\u624D\u662F\u6211\u4EEC\u8981\u7684\u7B54\u6848\uFF0C\u56E0\u6B64\u4E0D\u65AD\u66F4\u65B0\u5BF9\u5E94\u6DF1\u5EA6\u7684\u4FE1\u606F\u5373\u53EF
            rightmostValueAtDepth.put(depth, node.val);

            if (node.left != null) {
                nodeQueue.add(node.left);
                depthQueue.add(depth + 1);
            }
            if (node.right != null) {
                nodeQueue.add(node.right);
                depthQueue.add(depth + 1);
            }
        }

        return new ArrayList&lt;&gt;(rightmostValueAtDepth.values());
    }
    
    // \u7FFB\u8F6C\u4E8C\u53C9\u6811
    TreeNode invertTree(TreeNode root) {
        if (root == null) return root;
        var temp = root.right;
        root.right = invertTree(root.left);
        root.left = invertTree(temp);
        return root;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br></div></div>`,2);function a(l,p){return r}var i=n(s,[["render",a],["__file","\u4E8C\u53C9\u6811\u7684\u7B80\u5355\u904D\u5386.html.vue"]]);export{i as default};
