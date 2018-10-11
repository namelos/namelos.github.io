webpackJsonp([9339818220304],{239:function(n,s){n.exports={data:{orga:{html:'<div class="section"><h1>Exercise 3.1</h1><div>An accumulator is a procedure that is called repeatedly with a single numeric argument and accumulates its arguments into a sum. Each time it is called, it returns the currently accumulated sum. Write a procedure make-accumulator that generates accumulators, each maintaining an independent sum. The input to make-accumulator should specify the initial value of the sum; for example</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> A <span class="token punctuation">(</span><span class="token function">make-accumulator</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token function">A</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">; => 10</span>\n<span class="token punctuation">(</span><span class="token function">A</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">; => 25</span></code></pre><div>Solution:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-accumulator</span> initial-value<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>delta<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> initial-value\n             <span class="token punctuation">(</span><span class="token operator">+</span> initial-value delta<span class="token punctuation">)</span><span class="token punctuation">)</span>\n           initial-value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre></div><div class="section"><h1>Exercise 3.2</h1><div>In software-testing applications, it is useful to be able to count the number of times a given procedure is called during the course of a computation. Write a procedure make-monitored that takes as input a procedure, f, that itself takes one input. The result returned by make-monitored is a third procedure, say mf, that keeps track of the number of times it has been called by maintaining an internal counter. If the input to mf is the special symbol how-many-calls?, then mf returns the value of the counter. If the input is the special symbol reset-count, then mf resets the counter to zero. For any other input, mf returns the result of calling f on that input and increments the counter. For instance, we could make a monitored version of the sqrt procedure:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> s <span class="token punctuation">(</span><span class="token function">make-monitored</span> sqrt<span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">(</span><span class="token function">s</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token comment">; => 10</span>\n<span class="token punctuation">(</span><span class="token function">s</span> <span class="token string">\'how-many-calls?)</span> <span class="token comment">; => 1</span></code></pre><div>Solution:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-monitored</span> f<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">call-count</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span>how-many-calls?<span class="token punctuation">)</span>\n      call-count<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span>reset-count<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">set!</span> call-count <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">invoke</span> argument<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">set!</span> call-count <span class="token punctuation">(</span><span class="token operator">+</span> call-count <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token function">f</span> argument<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">dispatch</span> m<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">cond</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'how-many-calls?)</span> <span class="token punctuation">(</span>how-many-calls?<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'reset-count)</span> <span class="token punctuation">(</span>reset-count<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">(</span><span class="token keyword">else</span> <span class="token punctuation">(</span><span class="token function">invoke</span> m<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    dispatch<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre></div><div class="section"><h1>Exercise 3.3</h1><div>Modify the make-account procedure so that it creates password-protected accounts. That is, make-account should take a symbol as an additional argument, as in</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> acc <span class="token punctuation">(</span><span class="token function">make-account</span> <span class="token number">100</span> <span class="token string">\'secret-password))</span></code></pre><div>The resulting account object should process a request only if it is accompanied by the password with which the account was created, and should otherwise return a complaint:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">acc</span> <span class="token string">\'secret-password</span> <span class="token string">\'withdraw)</span> <span class="token number">40</span><span class="token punctuation">)</span> <span class="token comment">; => 60</span>\n<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">acc</span> <span class="token string">\'some-other-password</span> <span class="token string">\'deposit)</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token comment">; => "Incorrect password"</span></code></pre><div>Solution:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-account</span> balance password<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">withdraw</span> amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">>=</span> balance amount<span class="token punctuation">)</span>\n        <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n               balance<span class="token punctuation">)</span>\n        <span class="token string">"Insufficient funds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">deposit</span> amount<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">+</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    balance<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">dispatch</span> password-input m<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">cond</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">not</span> <span class="token punctuation">(</span><span class="token function">eq?</span> password password-input<span class="token punctuation">)</span><span class="token punctuation">)</span>\n           <span class="token punctuation">(</span><span class="token keyword">lambda</span> <span class="token punctuation">(</span>amount<span class="token punctuation">)</span> <span class="token string">"Incorrect password"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'withdraw)</span> withdraw<span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'deposit)</span> deposit<span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token keyword">else</span> <span class="token punctuation">(</span><span class="token function">error</span> <span class="token string">"Unknown request -- MAKE-ACCOUNT"</span> m<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  dispatch<span class="token punctuation">)</span></code></pre></div><div class="section"><h1>Exercise 3.4</h1><div>Modify the make-account procedure of exercise 3.3 by adding another local state variable so that, if an account is accessed more than seven consecutive times with an incorrect password, it invokes the procedure call-the-cops.</div><div>Solution:</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">make-account</span> balance password<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">consecutive-failures</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span>call-cops<span class="token punctuation">)</span>\n      <span class="token string">"Dialing!"</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span>increment-failures<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">set!</span> consecutive-failures <span class="token punctuation">(</span><span class="token operator">+</span> consecutive-failures <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span>reset-consecutive-failures<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">set!</span> consecutive-failures <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">withdraw</span> amount<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span>reset-consecutive-failures<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">>=</span> balance amount<span class="token punctuation">)</span>\n          <span class="token punctuation">(</span><span class="token keyword">begin</span> <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">-</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n                 balance<span class="token punctuation">)</span>\n          <span class="token string">"Insufficient funds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">deposit</span> amount<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span>reset-consecutive-failures<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">set!</span> balance <span class="token punctuation">(</span><span class="token operator">+</span> balance amount<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      balance<span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">incorrect-password</span> amount<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">cond</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">>=</span> consecutive-failures <span class="token number">7</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>call-cops<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">(</span><span class="token keyword">else</span> <span class="token punctuation">(</span>increment-failures<span class="token punctuation">)</span>\n                  <span class="token string">"Incorrect password"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">dispatch</span> password-input m<span class="token punctuation">)</span>\n      <span class="token punctuation">(</span><span class="token keyword">cond</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">not</span> <span class="token punctuation">(</span><span class="token function">eq?</span> password password-input<span class="token punctuation">)</span><span class="token punctuation">)</span> incorrect-password<span class="token punctuation">)</span>\n            <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'withdraw)</span> withdraw<span class="token punctuation">)</span>\n            <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">eq?</span> m <span class="token string">\'deposit)</span> deposit<span class="token punctuation">)</span>\n            <span class="token punctuation">(</span><span class="token keyword">else</span> <span class="token punctuation">(</span><span class="token function">error</span> <span class="token string">"Unknown request -- MAKE-ACCOUNT"</span> m<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    dispatch<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre></div><div class="section"><h1>Exercise 3.7</h1><div>Consider the bank account objects created by make-account, with the password modification described in exercise 3.3. Suppose that our banking system requires the ability to make joint accounts. Define a procedure make-joint that accomplishes this. Make-joint should take three arguments. The first is a password-protected account. The second argument must match the password with which the account was defined in order for the make-joint operation to proceed. The third argument is a new password. Make-joint is to create an additional access to the original account using the new password. For example, if peter-acc is a bank account with password open-sesame, then</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> paul-acc\n  <span class="token punctuation">(</span><span class="token function">make-joint</span> peter-acc <span class="token string">\'open-sesame</span> <span class="token string">\'rosebud))</span></code></pre><div>will allow one to make transactions on peter-acc using the name paul-acc and the password rosebud. You may wish to modify your solution to exercise 3.3 to accommodate this new feature.</div></div><div class="section"><h1>Exercise 3.8</h1><div>When we defined the evaluation model in section 1.1.3, we said that the first step in evaluating an expression is to evaluate its subexpressions. But we never specified the order in which the subexpressions should be evaluated (e.g., left to right or right to left). When we introduce assignment, the order in which the arguments to a procedure are evaluated can make a difference to the result. Define a simple procedure f such that evaluating (+ (f 0) (f 1)) will return 0 if the arguments to + are evaluated from left to right but will return 1 if the arguments are evaluated from right to left.</div></div><div class="section"><h1>Exercise 3.9</h1><div>In section 1.2.1 we used the substitution model to analyze two procedures for computing factorials, a recursive version</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">factorial</span> n<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">=</span> n <span class="token number">1</span><span class="token punctuation">)</span>\n      <span class="token number">1</span>\n      <span class="token punctuation">(</span><span class="token operator">*</span> n <span class="token punctuation">(</span><span class="token function">factorial</span> <span class="token punctuation">(</span><span class="token operator">-</span> n <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>and an iterative version</div><pre><code class="language-scheme"><span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">factorial</span> n<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token function">fact-iter</span> <span class="token number">1</span> <span class="token number">1</span> n<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token punctuation">(</span><span class="token keyword">define</span> <span class="token punctuation">(</span><span class="token function">fact-iter</span> product counter max-count<span class="token punctuation">)</span>\n  <span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">></span> counter max-count<span class="token punctuation">)</span>\n      product\n      <span class="token punctuation">(</span><span class="token function">fact-iter</span> <span class="token punctuation">(</span><span class="token operator">*</span> counter product<span class="token punctuation">)</span>\n                 <span class="token punctuation">(</span><span class="token operator">+</span> counter <span class="token number">1</span><span class="token punctuation">)</span>\n                 max-count<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>Show the environment structures created by evaluating (factorial 6) using each version of the factorial procedure.</div></div>',meta:{title:"SICP Chapter 3 Exercises",date:"2018-09-23"}}},pathContext:{slug:"/sicp-exercise-ch-3/"}}}});
//# sourceMappingURL=path---sicp-exercise-ch-3-2102c65245a8e79f425c.js.map