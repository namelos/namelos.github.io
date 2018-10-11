webpackJsonp([0x80fe983eee17],{233:function(n,s){n.exports={data:{orga:{html:'<div>We ordinarily view the world by <i>objects</i>. Each object can contain internal state and could be changed over time. In a system composed with many objects, object can influence each other\'s through interactions. This can make subsystems or objects internally closely coupled which keeping loosely coupled with other systems.</div><blockquote>We will investigate two prominent organizational strategies arising from two rather different ``world views\'\' of the structure of systems. The first organizational strategy concentrates on objects, viewing a large system as a collection of distinct objects whose behaviors may change over time. An alternative organizational strategy concentrates on the streams of information that flow in the system, much as an electrical engineer views a signal-processing system.</blockquote><div class="section"><h1>Assignment and Local State</h1><div>Think of this API:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token function">withdraw</span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token comment">; => 75</span>\n<span class="token punctuation">(</span><span class="token function">withdraw</span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token comment">; => 50</span>\n<span class="token punctuation">(</span><span class="token function">withdraw</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token comment">; => "insufficient funds"</span>\n<span class="token punctuation">(</span><span class="token function">withdraw</span> <span class="token number">35</span><span class="token punctuation">)</span> <span class="token comment">; => 35</span></code></pre><div>Expression <code>(withdraw 25)</code> was evaluated twice, and yield different values. Until now, all of our procedure could be viewed as mathmatical functions. Calling a procedure with same arguments, always preduced the same results.</div><div>We could implment <code>withdraw</code> like this:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">withdraw</span> amount<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">>=</span> balance amount<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n             balance<span class="token punctuation">)</span>\n      <span class="token string">"Insufficient funds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>Decrementing is accomplished by <code>set!</code>, whose syntax is:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">set!</span> &lt;name> &lt;new-value><span class="token punctuation">)</span></code></pre><div>And <code>begin</code> can evaluated a sequnce of expressions and return the last expression\'s value.</div><div>Although our <code>withdraw</code> work as expected, the global variable <code>balance</code> was exposed and could be freely examined and modified.</div><div>We can make <code>balance</code> internal to <code>withdraw</code>:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> new-withdraw\n  <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">balance</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">>=</span> balance amount<span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n                 balance<span class="token punctuation">)</span>\n          <span class="token string">"Insufficient funds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>We use <code>let</code> to introduce a local variable <code>balance</code>. And with this local environment, we use <code>lambda</code> to create a procedure that takes <code>amount</code> as argument, and behaves like previous <code>withdraw</code>.</div><div>After we introduced assignment to our code, the substitution is no longer an adequate model.</div><div>Then we can create a constructor:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-withdraw</span> balance<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">>=</span> balance amount<span class="token punctuation">)</span>\n        <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n               balance<span class="token punctuation">)</span>\n        <span class="token string">"Insufficient funds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>Play with it a little bit:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> W1 <span class="token punctuation">(</span><span class="token function">make-withdraw</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token keyword">define</span> W2 <span class="token punctuation">(</span><span class="token function">make-withdraw</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token function">W1</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token comment">; => 50</span>\n<span class="token punctuation">(</span><span class="token function">W2</span> <span class="token number">70</span><span class="token punctuation">)</span> <span class="token comment">; => 30</span>\n<span class="token punctuation">(</span><span class="token function">W2</span> <span class="token number">40</span><span class="token punctuation">)</span> <span class="token comment">; => "Insufficient funds"</span>\n<span class="token punctuation">(</span><span class="token function">W1</span> <span class="token number">40</span><span class="token punctuation">)</span> <span class="token comment">; => 10</span></code></pre><div>Interestingly, <code>W1</code> and <code>W2</code> are completely independent, each with its own local state variable <code>balance</code>.</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-account</span> balance<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">withdraw</span> amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">>=</span> balance amount<span class="token punctuation">)</span>\n        <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n               balance<span class="token punctuation">)</span>\n        <span class="token string">"Insufficient funds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">deposit</span> amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">+</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    balance<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">dispatch</span> m<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">cond</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'withdraw)</span> withdraw<span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'deposit)</span> deposit<span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token keyword">else</span> <span class="token punctuation">(</span><span class="token function">error</span> <span class="token string">"Unknown request -- MAKE-ACCOUNT"</span> m<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  dispatch<span class="token punctuation">)</span>\n\n<span class="token punctuation">(</span><span class="token keyword">define</span> acc <span class="token punctuation">(</span><span class="token function">make-account</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">acc</span> <span class="token string">\'withdraw)</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token comment">; => 50</span>\n<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">acc</span> <span class="token string">\'deposit)</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token comment">; => "Insufficient funds"</span>\n<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">acc</span> <span class="token string">\'withdraw)</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token comment">; => 30</span></code></pre><div>We return an additional procedure <code>dispatch</code> that takes a message as input and return one of the two local precedures. This is precisely the <i>message-passing</i> style of programming.</div></div><div class="section"><h1>The Benefits of Introducing Assignment</h1><div>Introducing assignment is both introducing diffculties and benefits. For the benefits part, it\'s a powerful technique for maintaining modular design.</div><blockquote>To be implemented Monte Carlo Simulation section</blockquote></div><div class="section"><h1>The Costs of Introducing Assignment</h1><div>Consider these two functions:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-simplified-withdraw</span> balance<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    balance<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-decrementer</span> balance<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>We can use substitution model to explain how <code>make-decrementer</code> works:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">make-decrementer</span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">25</span> amount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">25</span> <span class="token number">20</span><span class="token punctuation">)</span>\n<span class="token number">5</span></code></pre><div>However, if we attempt a similar substitution analysis with <code>make-simplified-withdraw</code>:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">make-simplified-withdraw</span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">25</span> amount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token number">25</span><span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> <span class="token number">25</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token number">25</span></code></pre><div>This is incorrect because <code>set!</code> first set <code>balance</code> to 5 then return 25 as the value of the expression. The trouble here is that substitution is based ultimately on the notion that the symbols in our language ar essentially names for values. But as soon as we introduce <code>set!</code> and the idea that the value of a variable can change, a variable can no longer simply be a name.</div></div><div class="section"><h1>Sameness and change</h1><div>Not only substitution model is violated after introducing variable, many notions become problematical. One of them is two things being <strong>the same</strong>. Say we call <code>make-decrementer</code> twice:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> D1 <span class="token punctuation">(</span><span class="token function">make-decrementer</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token keyword">define</span> D2 <span class="token punctuation">(</span><span class="token function">make-decrementer</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>D1 and D2 are conceptual same because they have same computational behavior. In constract if we call <code>make-simplified-withdraw</code> twice:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> W1 <span class="token punctuation">(</span><span class="token function">make-simplified-withdraw</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token keyword">define</span> W2 <span class="token punctuation">(</span><span class="token function">make-simplified-withdraw</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>They are not same because they are not <i>referentially transparent</i>. In another word, it disables the mental model inlanguage that \'equals can be substitued for equals\'.</div><div>However, in real world the meaning of \'same\' is hardly clear itself. Even Peter and Paul\'s bank accounts have same deposit, they are different accounts. A bank account is still \'the same\' even if we change the balance. Conversely, rational number could be still the same even they have different numerator and denomenator.</div></div><div class="section"><h1>Pitfall of imperative programming</h1><div>In constrast to <i>functional programming</i>, programming that make extensive use of assignment is known as <i>imperative programming</i>. Program written in imperative style are suspectipble to bugs that cannot occur in functional programs. For previous <code>factorial</code> example:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">factorial</span> n<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">iter</span> product counter<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">></span> counter n<span class="token punctuation">)</span>\n        product\n        <span class="token punctuation">(</span><span class="token function">iter</span> <span class="token punctuation">(</span><span class="token operator">*</span> counter product<span class="token punctuation">)</span>\n              <span class="token punctuation">(</span><span class="token operator">+</span> counter <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token function">iter</span> <span class="token number">1</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>If we make it in a imperative manner:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">factorial</span> n<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">product</span> <span class="token number">1</span><span class="token punctuation">)</span>\n        <span class="token punctuation">(</span><span class="token function">counter</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span>iter<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">></span> counter n<span class="token punctuation">)</span>\n          product\n          <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> product <span class="token punctuation">(</span><span class="token operator">*</span> counter product<span class="token punctuation">)</span><span class="token punctuation">)</span>\n                 <span class="token punctuation">(</span><span class="token keyword">set!</span> counter <span class="token punctuation">(</span><span class="token operator">+</span> counter <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                 <span class="token punctuation">(</span>iter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span>iter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>This is correct but if we write it in the opposite order it would have produced an incorrect result:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">set!</span> counter <span class="token punctuation">(</span><span class="token operator">+</span> counter <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token keyword">set!</span> product <span class="token punctuation">(</span><span class="token operator">*</span> counter product<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>This will become even worse if we consider applications in which several processes execute concurrently.</div></div>',meta:{title:"SICP Reading Notes",date:"2018-01-01"}}},pathContext:{slug:"/sicp-1/"}}}});
//# sourceMappingURL=path---sicp-1-22c766c8bd58c1f5083f.js.map