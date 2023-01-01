import{_ as n,o as s,c as a,d as t}from"./app.43ec1c76.js";const p={},e=t(`<p><img src="https://user-images.githubusercontent.com/43411944/188320459-46a214c4-210e-4521-8085-075e02a8af80.png" alt="image"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// A class to store a binary tree node</span>
<span class="token keyword">class</span> <span class="token class-name">Node</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> data<span class="token punctuation">;</span>
	<span class="token class-name">Node</span> left<span class="token punctuation">,</span> right<span class="token punctuation">;</span>

	<span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Utility function to check if a given node is a leaf node</span>
	<span class="token keyword">boolean</span> <span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Main</span>
<span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printLeftBoundary</span><span class="token punctuation">(</span><span class="token class-name">Node</span> root<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">// base case: root is empty</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token class-name">Node</span> node <span class="token operator">=</span> root<span class="token punctuation">;</span>

		<span class="token comment">// do for all non-leaf nodes</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>node<span class="token punctuation">.</span><span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">// print the current node</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// next process, the left child of \`root\` if it exists;</span>
			<span class="token comment">// otherwise, move to the right child</span>
			node <span class="token operator">=</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> node<span class="token punctuation">.</span>left<span class="token operator">:</span> node<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Recursive function to print the right boundary of the given binary tree</span>
	<span class="token comment">// in a bottom-up fashion, except for the leaf nodes</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printRightBoundary</span><span class="token punctuation">(</span><span class="token class-name">Node</span> root<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">// base case: root is empty, or root is a leaf node</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> root<span class="token punctuation">.</span><span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// recur for the right child of \`root\` if it exists;</span>
		<span class="token comment">// otherwise, recur for the left child</span>
		<span class="token function">printRightBoundary</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> root<span class="token punctuation">.</span>right<span class="token operator">:</span> root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// To ensure bottom-up order, print the value of the nodes</span>
		<span class="token comment">// after recursion unfolds</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Recursive function to print the leaf nodes of the given</span>
	<span class="token comment">// binary tree in an inorder fashion</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printLeafNodes</span><span class="token punctuation">(</span><span class="token class-name">Node</span> root<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">// base case</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// recur for the left subtree</span>
		<span class="token function">printLeafNodes</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// print only leaf nodes</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span><span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// recur for the right subtree</span>
		<span class="token function">printLeafNodes</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Function to perform the boundary traversal on a given tree</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">performBoundaryTraversal</span><span class="token punctuation">(</span><span class="token class-name">Node</span> root<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">// base case</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// print the root node</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// print the left boundary (except leaf nodes)</span>
		<span class="token function">printLeftBoundary</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// print all leaf nodes</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">.</span><span class="token function">isLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">printLeafNodes</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// print the right boundary (except leaf nodes)</span>
		<span class="token function">printRightBoundary</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">// construct a binary tree as per the above diagram</span>
		<span class="token class-name">Node</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>right<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>right<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>right<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>right<span class="token punctuation">.</span>right<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left<span class="token punctuation">.</span>right<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left<span class="token punctuation">.</span>right<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span>right<span class="token punctuation">.</span>right<span class="token punctuation">.</span>left<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token function">performBoundaryTraversal</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","打印二叉树的边界节点.html.vue"]]);export{k as default};
