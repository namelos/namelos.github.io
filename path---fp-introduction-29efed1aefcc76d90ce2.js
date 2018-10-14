webpackJsonp([78168251461804],{232:function(s,a){s.exports={data:{orga:{html:'<div class="section"><h1>引用透明</h1><div>对一般编程语言来说，函数的执行取决于函数定义（函数），参数以及函数的执行环境（上下文）。执行环境可能异常复杂，函数式编程鼓励引用透明，即任何程序中函数调用都可以直接替换为函数执行结果，也就是说函数的执行是上下文无关的。进而分析程序的模型可以由环境模型大幅简化为代换模型，无需再关心特定的时间和特定的地点的求值环境，因此引用透明的函数：</div><ul><li>可测试</li><li>可移植</li><li>易读</li><li>幂等</li></ul></div><div class="section"><h1>可组合</h1><div>函数式编程风格大量使用函数组合，f . g会返回一个等效于g f连续调用等价的函数：</div><pre><code class="language-haskell"><span class="token punctuation">(</span><span class="token hvariable">f</span> <span class="token punctuation">(</span><span class="token hvariable">g</span> <span class="token hvariable">x</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre><div>等价于</div><pre><code class="language-haskell"><span class="token punctuation">(</span><span class="token hvariable">f</span><span class="token operator"> . </span><span class="token hvariable">g</span><span class="token punctuation">)</span> <span class="token hvariable">x</span></code></pre><div>使用函数组合可以高效复用逻辑，提高代码的抽象程度。</div></div><div class="section"><h1>代数类型</h1><div>函数式编程使用的数据类型叫做代数类型(Algebra data type)：</div><pre><code class="language-haskell"><span class="token keyword">data</span> <span class="token constant">List</span> <span class="token constant">Int</span> <span class="token operator">=</span> <span class="token constant">Cons</span> <span class="token constant">Int</span> <span class="token punctuation">(</span><span class="token constant">List</span> <span class="token constant">Int</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token constant">Empty</span></code></pre><div>列表List可能由序对Cons或Empty组成，而序对则要接受两个成员作为构造参数。在常见编程语言如Java中，class可以表达Cons这种有成员的数据结构，且其可以继承List作为子类。然而Empty并没有成员，但概念上也是List的子类。虽然Java有enum类型，但enum却不能像class一样拥有构造函数和成员。 代数类型可以看作同时具有class和enum的结构，既可以表达Cons Int (List Int)这种“且”的概念，又能同时表达| Empty这种“或”的概念。大量使用代数类型后，我们会发现面向对象的建模方式会强制统一子类接口，然而现实世界建模却经常需要风格各异的子类。</div></div><div class="section"><h1>面向对象特别需要重构的原因</h1><div>代数类型仅描述数据类型，而非像面向对象一样将方法绑定在数据结构上。将方法绑定在类上是面向对象语言需要不断重构的主要因素：</div><div class="section"><h2>方法建模十分困难</h2><div>常见建模的难度为：事件 &#x3C; 数据 &#x3C; 方法，这也是event storming为什么有效的原因--事件是最容易设计的，通过事件反推模型就容易一些。 事件建模最简单，如marry like了42号文章可以表达为Like marry article42。无论怎么设计这个数据结构，都总接近唯一最优解，几乎不会出错。 数据类型建模就会困难很多，如user上都应该有什么字段，article有什么字段，user和article如何关联等等一系列问题。找到数据模型的方法是找到可以表达所有业务场景的最简单的表示方式，我们经常可以找到一部分必须且固定的部分（比如article name还是放在article上的），因此数据类型的建模难度适中。 最困难的是方法设计，排除和领域事件同构的主要方法，我们大多数类中都有很多较小粒度的方法。虽然这些小方法的目的是减少单个方法的行数，让代码更可读，但应有哪些方法和哪些对象是非常困难的。当方法逐渐增多时，我们会把类拆成更多不同的层来让模块化更进一步。虽然主观感受上变得更好，但这通常是个新的陷阱。这种做法的弊端是方法和类的分层是十分主观的，在持续开发中一定会碰到和新业务不匹配的情况。因此面向对象语言需要大量反复重构来将就新的设计（对应Alan Perlis的100个函数操作1个数据结构，优于10个函数操作10个数据结构）。</div></div><div class="section"><h2>继承结构僵化</h2><div>现代面向对象语言的核心是继承。继承的问题是继承关系是一个静态结构，这个结构惩罚一切临时合作（也就是Alan Perlis所说的金字塔）。在业务不变的情况下，面向对象可以拥有很好的建模质量。然而在业务不断更迭的情况下，单一的继承树往往不能满足多种业务需求。同一模型往往需要服务多种目的。函数式编程不绑定数据和函数，降低了这种耦合性，提高了扩展能力。</div></div><div class="section"><h2>子类多态缺乏表现力</h2><div>Class和接口可以表现出一部分多态。这种处理多态的方式称作子类多态（Subtype polymorphism）。Java在挣扎很久之后终于加入了泛型，也就是参数化多态（Parametric polymorphism），理论上讲，带有类型限定（Bounded quantification，即Java和C#的where关键字）的参数化多态可以表示所有子类多态，而反之不然。函数式编程大量使用参数化多态，上述列表类型可以表示为：</div><pre><code class="language-haskell"><span class="token keyword">data</span> <span class="token constant">List</span> <span class="token hvariable">a</span> <span class="token operator">=</span> <span class="token constant">Cons</span> <span class="token hvariable">a</span> <span class="token punctuation">(</span><span class="token constant">List</span> <span class="token hvariable">a</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token constant">Empty</span></code></pre><div>如此列表中的内容就不用一定是Int了。</div></div></div><div class="section"><h1>Haskell</h1><div>Haskell是函数式编程语言的标杆。除了典型的函数式编程特点之外，还有很多其他特性：</div><ul><li>静态类型</li><li>不允许副作用</li><li>惰性求值</li></ul></div>',meta:{title:"函数式编程简介",date:"2018-10-14"}}},pathContext:{slug:"/fp-introduction/"}}}});
//# sourceMappingURL=path---fp-introduction-29efed1aefcc76d90ce2.js.map