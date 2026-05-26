// 节点树数据
//
// 文案规则（v11，"从效果反推原理"）：
//   - 每个 page 开头先讲"做这个能让用户看到 / 体验到什么"
//   - 再说"背后用到 X"
//   - 短句、不堆英文全名、不用 JSON/endpoint 这种用户不一定懂的词
//
// 字段说明：
//   id, emoji, title, pages, concept, children, lightbulb
//   笔记本按 concept.name 去重
//   children[0] = 主路径；children[i>0] 加 lightbulb: true 是灯泡支线
//   pages 里 <em>术语</em> 自动可点击查 TERM_GLOSSARY 里的解释

const SHARED_NODES = {
  "shared-server": {
    id: "shared-server",
    emoji: "🖥️",
    title: "服务器",
    concept: { name: "服务器", explain: "一台一直开着、连着公网的电脑——你的程序跑上去。" },
    pages: [
      { html: `
        <p>网站、API、bot 要 24 小时挂着——你电脑会关，所以得有一台一直开的电脑。</p>
        <div class="emoji-illust">
          <span class="ei-emoji">💻</span><span class="ei-label">你电脑（会关）</span>
          <span class="ei-arrow">vs</span>
          <span class="ei-emoji">🏢</span><span class="ei-label">服务器（一直开）</span>
        </div>
        <p>这种一直开着、连着公网的电脑，叫<em>服务器</em>。</p>
        <p>租云服务几块到几十块 / 月（阿里云、<em>Cloudflare Pages</em>、<em>Vercel</em>、<em>Railway</em>）。</p>
      ` },
    ],
    children: [],
  },
};

// ============================================================
// 新增分支：先理解代码本身（变量 / 函数 / 数据类型 / 条件循环 / 报错调试）
// 节点按依赖顺序：链尾 console-log 先定义，链头 basics-entry 最后
// ============================================================

const node_console_log = {
  id: "console-log",
  emoji: "📋",
  title: "控制台 / log",
  concept: { name: "控制台 / console.log", explain: "打开浏览器或编辑器的「黑窗口」看程序打的字——排查问题最常用的工具。" },
  pages: [
    { html: `
      <p>代码看着没问题但结果不对？怎么知道它哪一步出岔？</p>
      <p>最常用的招：在关键位置加一行 <em>console.log</em>（Python 是 <em>print</em>），让程序"打字"出来告诉你当前的值。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📝</span><span class="ei-label">代码里加 log</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📋</span><span class="ei-label">控制台显示出来</span>
      </div>
      <p>浏览器看 log：按 <em>F12</em>（Windows）或 <em>Cmd+Option+I</em>（Mac），切到「Console」标签。</p>
      <p>VS Code / Cursor 这种编辑器跑代码：log 直接显示在底部「<em>终端</em>」面板。</p>
      <p>AI 经常说"加几个 console.log 看看"——就是这个意思。</p>
    ` },
  ],
  children: [],
};

const node_error_debug = {
  id: "error-debug",
  emoji: "🚨",
  title: "报错 / bug / 调试",
  concept: { name: "报错 / bug / 调试", explain: "程序出错弹的红字 = 报错；找出原因并修好 = 调试 / debug。" },
  pages: [
    { html: `
      <p>代码跑不动？页面白屏？AI 说改完了但还是错？</p>
      <p>程序出错时会弹一段红字，叫<em>报错</em>（英文 <em>error</em>）。里面有：错误类型 + 出错的文件 + 第几行。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🚨</span><span class="ei-label">报错信息</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🔍</span><span class="ei-label">看哪行哪个文件</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🛠️</span><span class="ei-label">修</span>
      </div>
      <p>程序里没修好的错误叫 <em>bug</em>。整个「找 bug + 修 bug」的过程叫<em>调试</em>（英文 <em>debug</em>）。</p>
      <p>常见报错关键词：</p>
      <ul>
        <li><em>TypeError</em>：类型错了（你把数字当函数调）</li>
        <li><em>ReferenceError</em>：变量没定义就用</li>
        <li><em>SyntaxError</em>：语法写错（括号没配对、漏分号）</li>
        <li><em>undefined is not a function</em>：这个名字写得像函数其实啥也不是</li>
        <li><em>Cannot read property X of undefined</em>：对着空的东西取属性</li>
      </ul>
      <p>报错直接把红字整段复制问 AI——比自己琢磨快十倍。</p>
    ` },
  ],
  children: [node_console_log],
};

const node_control_flow = {
  id: "control-flow",
  emoji: "🔀",
  title: "条件 / 循环",
  concept: { name: "条件 / 循环", explain: "条件 = 如果 X 就做 A 否则做 B；循环 = 把一段代码反复跑 N 次。" },
  pages: [
    { html: `
      <p>代码要会"判断"和"反复做"——不然每件事都得写死。</p>
      <p><em>条件</em>（英文 <em>if</em> / <em>else</em>）：如果 X 就做 A，否则做 B。</p>
      <p>例：「如果库存 &gt; 0 就允许下单，否则提示卖光了」</p>
      <p><em>循环</em>（英文 <em>for</em> / <em>while</em>）：把一段代码反复跑很多次。</p>
      <p>例：「把购物车里每件商品逐个算价格、加起来」</p>
      <p><em>for</em>：知道要跑几次（"每个商品"、"1 到 10"）。</p>
      <p><em>while</em>：不知道要跑几次，跑到某条件不成立为止（"一直要数据直到没了"）。</p>
      <p>条件 + 循环是所有程序的最基础积木——没它们写不出任何稍复杂的逻辑。</p>
    ` },
  ],
  children: [node_error_debug],
};

const node_func = {
  id: "func",
  emoji: "⚙️",
  title: "函数",
  concept: { name: "函数 / 参数 / 返回值", explain: "一段写好后取了名字、可以反复调用的代码。给输入吐输出。" },
  pages: [
    { html: `
      <p>一段代码要反复用？取个名字、下次调用就行——这种打包好的可复用代码叫<em>函数</em>（英文 <em>function</em>）。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📥</span><span class="ei-label">输入（参数）</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">⚙️</span><span class="ei-label">函数（一段处理）</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📤</span><span class="ei-label">输出（返回值）</span>
      </div>
      <p>给它的输入叫<em>参数</em>（英文 <em>parameter</em> 或 <em>argument</em>）。吐回的结果叫<em>返回值</em>（英文 <em>return value</em>）。</p>
      <p>"调用"一个函数 = 让它跑一次。例：<code>add(3, 5)</code> 让名为 add 的函数跑一次、传 3 和 5、它返回 8。</p>
      <p>AI 经常说"我把这段抽成一个函数"——意思是把重复出现的代码打包成一个可复用的小块。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🍳</span>函数 = 一份<strong>食谱</strong>：写一次取个名字，以后任何地方喊「按食谱做」就能用</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">💰</span><strong>算订单总价</strong>：写一个 calcTotal(items)，传商品列表 → 返回总额。购物车 / 结算页 / 支付页都用同一个</div>
              <div class="ex-line"><span class="ex-emoji">🔐</span><strong>校验登录</strong>：写一个 requireLogin()，登录页 / 评论框 / 收藏按钮全用——只改一处全 App 跟着改</div>
              <div class="ex-line"><span class="ex-emoji">📅</span><strong>格式化时间</strong>：写一个 formatDate(ts)，朋友圈 / 订单 / 聊天时间全调它，显示统一</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🔄</span>改一处全联动：算法换了 / 文案改了 / bug 修了 → 调用它的所有地方一起变</div>
              <div class="ex-line"><span class="ex-emoji">📉</span>4 处重复代码 → 1 个函数：代码量少 75%，少错 75%</div>
              <div class="ex-line"><span class="ex-emoji">🗣️</span>跟 AI 说"把这段抽成函数" / "复用 calcTotal" → AI 知道你在说啥</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [node_control_flow],
};

const node_oop = {
  id: "oop",
  emoji: "🏗️",
  title: "类 / 对象 / 方法",
  lightbulb: true,
  concept: { name: "面向对象 / 类 / 实例 / 方法", explain: "把「一类东西的样子」写成模板（类），再造出具体的个体（实例）。" },
  pages: [
    { html: `
      <p>同种东西要造很多个（用户、订单、商品）——每次重写一遍属性很累。</p>
      <p><em>类</em>（<em>class</em>）：写「这一类东西都长什么样、能做什么」的模板。</p>
      <p><em>实例</em>（<em>instance</em>）：按模板造出来的具体一个。</p>
      <p><em>属性</em>（<em>property</em>）：实例身上的数据（用户的名字、年龄）。</p>
      <p><em>方法</em>（<em>method</em>）：实例能做的动作（用户.下单()、用户.改密码()）。</p>
      <p><em>继承</em>（<em>inherit</em>）：管理员「是一种」用户——继承用户类、再加自己独有的能力。</p>
      <p>这整套思路叫<em>面向对象编程</em>（<em>OOP</em>，Object-Oriented Programming）。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">📋</span>类 = <strong>档案模板</strong>（写：这一类东西都有啥属性、能做啥动作）+ 实例 = <strong>按模板填的具体一份</strong></div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">👤</span><strong>用户类 User</strong>：属性 {name, avatar, email}、方法 {发帖()、改头像()、拉黑()}。小明、小红 = 两个实例</div>
              <div class="ex-line"><span class="ex-emoji">📦</span><strong>商品类 Product</strong>：属性 {name, price, stock}、方法 {加入购物车()、下架()}。1000 件商品 = 1000 个实例</div>
              <div class="ex-line"><span class="ex-emoji">👑</span><strong>继承</strong>：管理员 = 普通用户 + 多几个权限动作（封号 / 删帖），不用重写"发帖"那些</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🏢</span>一套代码管几亿用户：定义一次 User 类，每个用户只占一份数据</div>
              <div class="ex-line"><span class="ex-emoji">🔧</span>给 User 加个"夜间模式偏好"字段 → 所有用户自动有，不用一个个改</div>
              <div class="ex-line"><span class="ex-emoji">🗣️</span>看 AI 写的代码出现 class / extends / new XXX() → 知道这是在用模板造实例</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_data_types = {
  id: "data-types",
  emoji: "🔢",
  title: "数据类型",
  concept: { name: "数据类型", explain: "字符串 / 数字 / 布尔 / 数组 / 对象 / null —— 程序处理的各种数据。" },
  pages: [
    { html: `
      <p>变量能装的东西分几种基本类型。AI 老说「这是字符串不是数字、所以报错了」——就是在说数据类型对不上。</p>
      <p><em>字符串</em>（<em>string</em>）：文字「你好」、「abc123」——用引号包起来。</p>
      <p><em>数字</em>（<em>number</em>）：123、3.14。注意「123」和 123 不一样——前者是字符串后者是数字。</p>
      <p><em>布尔</em>（<em>boolean</em>）：只能 <em>true</em>（真）或 <em>false</em>（假）。</p>
      <p><em>数组</em>（<em>array</em>）：一串东西按顺序排，写作 [1, 2, 3] 或 ["苹果", "梨"]。</p>
      <p><em>对象</em>（<em>object</em>）：一组带标签的属性，写作 { name: "小明", age: 10 }。</p>
      <p><em>null</em> / <em>undefined</em>：表示「没值 / 空」。两个有微妙差别但日常都当「空」理解。</p>
      <p>报错里出现「X is undefined」一般是：那个变量被当成有值的用，但实际上是空。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🎁</span>数据类型 = 给值<strong>分箱子</strong>：每种箱子放不同的东西、能做不同的事，弄混就报错</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">📝</span><strong>字符串</strong>：朋友圈文字、用户名、商品标题 → 文字都是 string</div>
              <div class="ex-line"><span class="ex-emoji">🔢</span><strong>数字</strong>：购物车数量、订单金额 39.9、点赞数 → 能做加减乘除</div>
              <div class="ex-line"><span class="ex-emoji">✅</span><strong>布尔</strong>："是否已登录"、"是否会员"、"夜间模式开关" → 只有 true / false</div>
              <div class="ex-line"><span class="ex-emoji">📋</span><strong>数组</strong>：购物车列表、朋友圈 feed、收藏夹 → 一串按顺序排好的东西</div>
              <div class="ex-line"><span class="ex-emoji">🪪</span><strong>对象</strong>：个人资料 {name, age, avatar} → 一组带标签的属性打成一包</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🐛</span>AI 报"类型不对" / "X is undefined" / "NaN" → 是某变量类型对不上 / 值是空</div>
              <div class="ex-line"><span class="ex-emoji">🔧</span>表单收到的"3"是字符串（直接算钱会出错）→ 先转成数字 → 避免算出 33（字符串拼接）</div>
              <div class="ex-line"><span class="ex-emoji">📐</span>列产品字段时标好每个的类型 → 跟 AI 描述需求更精准</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [node_func, node_oop],
};

const node_stack_mem = {
  id: "stack-mem",
  emoji: "🧠",
  title: "栈 / 堆 / 内存",
  lightbulb: true,
  concept: { name: "栈 / 堆 / 内存", explain: "栈和堆是程序运行时存数据的两块区域；栈溢出 = 函数互相调用太深把栈塞满了。" },
  pages: [
    { html: `
      <p>AI 偶尔说"栈溢出"、"内存泄漏"、"调用栈"——这都什么？</p>
      <p>程序跑起来要把东西存到<em>内存</em>。内存里有两块特殊区：<em>栈</em>（<em>stack</em>）和<em>堆</em>（<em>heap</em>）。</p>
      <p><em>栈</em>：放当前正在跑的函数 + 它的局部变量。函数一调用就压一层、跑完弹一层。</p>
      <p><em>堆</em>：放比较大 / 大小不定的东西（数组、对象）。</p>
      <p><em>栈溢出</em>（<em>stack overflow</em>）：函数 A 调 A 调 A 没尽头，栈塞满了——通常是写漏了"停止条件"。</p>
      <p><em>内存泄漏</em>（<em>memory leak</em>）：用过的内存没释放，越占越多，程序越跑越慢直到崩。</p>
      <p><em>调用栈</em>（<em>call stack</em>）：报错里那一串"在哪个函数被哪个函数调用"的轨迹——从下往上读 = 从外往里的调用顺序。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🥞</span><strong>栈</strong> = 食堂叠盘子（后来的放最上面、要用从最上面拿）；<strong>堆</strong> = 仓库（大件东西丢仓库 + 用"地址条"指过去）</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">📞</span>用户点登录 → 跑 <strong>login()</strong> → login 内部叫 <strong>checkPwd()</strong> → checkPwd 叫 <strong>encrypt()</strong>——每叫一层就压一个盘子上栈</div>
              <div class="ex-line"><span class="ex-emoji">📦</span>购物车列表（10 个商品对象）→ 数据丢"堆"里，购物车变量只装一个"地址条"指过去</div>
              <div class="ex-line"><span class="ex-emoji">💥</span>做无限循环的"刷帖"功能缺停止条件 → A 叫 A 叫 A → <strong>栈溢出</strong>程序崩</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🔍</span>看报错的<strong>调用栈</strong>就知道是哪个函数的哪一行炸了——从下往上读 = 从外往里调用顺序</div>
              <div class="ex-line"><span class="ex-emoji">⚠️</span>AI 说"栈溢出"立刻去找有没有"缺停止条件"的递归</div>
              <div class="ex-line"><span class="ex-emoji">🧠</span>程序越跑越卡 = <strong>内存泄漏</strong>（堆里旧货没清），重启服务暂时缓解，根治得查"谁一直占着不放"</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_var = {
  id: "var",
  emoji: "📦",
  title: "变量",
  concept: { name: "变量", explain: "给一个值取个名字——之后可以用名字代替这个值。" },
  pages: [
    { html: `
      <p>代码要记住一些东西——用户名字、商品数量、当前页码——怎么办？</p>
      <p>给那个值取个名字，之后用名字代替它。这个被取了名字的「格子」叫<em>变量</em>。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📦</span><span class="ei-label">name</span>
        <span class="ei-arrow">=</span>
        <span class="ei-label">「小明」</span>
      </div>
      <p>之后写 <code>name</code> 就等于写 「小明」。改一次值，所有用到它的地方一起变。AI 说"声明一个变量"就是这个意思。</p>
      <div class="example-card">
        <button class="example-toggle" data-closed-text="📖 看真实例子 + 怎么用 ↓" data-open-text="收起 ↑">📖 看真实例子 + 怎么用 ↓</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">📮</span>变量 = <strong>装值的小柜子</strong> + <strong>柜子上的名字牌</strong>。柜子<strong>「name」</strong>装着「小明」，你说"name"就知道指那个值</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🛒</span>购物车做"商品数量" → 用变量 <strong>cartCount</strong> 装着。用户加一件就 cartCount + 1</div>
              <div class="ex-line"><span class="ex-emoji">🌓</span>做"夜间模式" → 变量 <strong>isDarkMode</strong> 装 true/false。切换按钮改这一个变量</div>
              <div class="ex-line"><span class="ex-emoji">👤</span>登录后存用户名 → 变量 <strong>currentUser</strong> 装着。整个 App 任何地方要显示"欢迎 XX"都从这里取</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🔄</span>改一处全联动：cartCount 从 2 变 3，<strong>购物车角标 + 结算页 + 顶部小红点</strong>同时变 3，不用手动找一个个改</div>
              <div class="ex-line"><span class="ex-emoji">📝</span>代码读得懂：写 <code>cartCount</code> 比写一串数字清楚 100 倍，3 个月后你自己都能看懂</div>
              <div class="ex-line"><span class="ex-emoji">🔧</span>改需求快：产品要把"件数"改成"总价"显示 → 改一个变量定义，全 App 自动跟着变</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [node_data_types, node_stack_mem],
};

const node_basics_entry = {
  id: "basics-entry",
  emoji: "🧩",
  title: "先理解代码本身",
  concept: { name: "代码", explain: "一段写给电脑的指令——告诉它做什么、什么时候做、怎么做。" },
  pages: [
    { html: `
      <p>不管做什么——网页 / App / bot / 硬件——它们底下都是一堆<em>代码</em>。</p>
      <p>代码 = 写给电脑的指令清单。电脑严格按顺序一行一行跑。</p>
      <p>所有代码翻来覆去就那几个基本积木：</p>
      <ul>
        <li><em>变量</em>：给值取名字</li>
        <li><em>函数</em>：打包一段反复用的代码</li>
        <li><em>数据类型</em>：数字 / 文字 / 列表 / 对象</li>
        <li><em>条件</em>：如果 X 就做 A</li>
        <li><em>循环</em>：反复跑某段</li>
        <li><em>报错</em> / <em>调试</em>：程序出错怎么找原因</li>
      </ul>
      <p>这几个概念清楚之后，AI 说什么、报错说什么，都能对上号。</p>
      <p>这些名词知道是什么就行——会不会自己写都通用。</p>
    ` },
  ],
  children: [node_var],
};

// ============================================================
// 新增分支：写代码用什么工具（编辑器 / AI 助手 / Git / GitHub / 依赖）
// ============================================================

const node_npm = {
  id: "npm-pkg",
  emoji: "📦",
  title: "依赖 / npm install",
  concept: { name: "依赖 / 包管理 / package.json", explain: "项目用了别人写的代码包，一行命令装上才能跑——叫装依赖。" },
  pages: [
    { html: `
      <p>从 GitHub 下载别人项目、按教程跑——第一步常是 <em>npm install</em> 或 <em>pip install</em>。</p>
      <p>意思：「这项目用了别人写的代码包（叫<em>依赖</em>），先把它们都装好」。</p>
      <div class="emoji-illust">
        <span class="ei-label">npm install</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📦</span><span class="ei-label">node_modules/</span>
        <span class="ei-label">（装好的包都堆在这）</span>
      </div>
      <p>装哪些包 / 哪个版本——都记在项目根目录的 <em>package.json</em> 里（Python 是 <em>requirements.txt</em>）。</p>
      <p>装完会多出 <em>node_modules</em> 文件夹（几百兆正常）——这文件夹不上传 GitHub，靠 package.json 让别人也能装出一样的。</p>
      <p>常见错：刚 clone 完没装依赖就跑，会报"找不到模块 X"——先 <em>npm install</em>。</p>
      <p>版本号 <em>1.2.3</em>：第一位大变（不兼容老代码）、第二位加功能、第三位修 bug。这叫<em>语义化版本</em>（<em>semver</em>）。</p>
    ` },
  ],
  children: [],
};

const node_ssh = {
  id: "ssh-auth",
  emoji: "🔑",
  title: "SSH / token / 凭证",
  lightbulb: true,
  concept: { name: "SSH key / GitHub token", explain: "证明「是你在操作 GitHub」的钥匙——省去每次输密码。" },
  pages: [
    { html: `
      <p>第一次 push 到 GitHub 总弹"权限不够 / 输用户名密码"？</p>
      <p>GitHub 早就不准用密码 push 了，要用<em>SSH key</em>（一对密钥文件）或<em>token</em>（一长串字符）代替。</p>
      <p><em>SSH</em>（Secure Shell）：你电脑生成一对钥匙（公钥 + 私钥），公钥贴到 GitHub 设置里、私钥留你电脑——以后 push 自动用它证明身份。</p>
      <p><em>token</em>：在 GitHub 设置里生成的一长串字符，当临时密码用。</p>
      <p><em>GitHub Desktop</em> / <em>VS Code</em> / <em>Cursor</em> 接入 GitHub 一般自动帮你弄好这步——不用手动配。</p>
    ` },
  ],
  children: [],
};

const node_github = {
  id: "github",
  emoji: "🐙",
  title: "GitHub / 仓库",
  concept: { name: "GitHub / repo / clone / push / pull", explain: "存放 git 项目的网站。仓库 = 一个项目的所有代码 + 历史。" },
  pages: [
    { html: `
      <p>你写的代码放在哪？怎么给别人看？怎么和别人合作？</p>
      <p><em>GitHub</em>：存放代码项目的网站，全球最大。免费账号能传无限公开项目。</p>
      <p>一个项目在 GitHub 上叫一个<em>仓库</em>（英文 <em>repo</em>，repository 简称）。仓库里有所有代码 + 完整修改历史。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span><span class="ei-label">你电脑</span>
        <span class="ei-arrow">push</span>
        <span class="ei-emoji">🐙</span><span class="ei-label">GitHub 仓库</span>
        <span class="ei-arrow">clone</span>
        <span class="ei-emoji">👤</span><span class="ei-label">别人电脑</span>
      </div>
      <p><em>clone</em>：把别人的仓库整个下到你电脑。</p>
      <p><em>push</em>：把本机改动传上去。</p>
      <p><em>pull</em>：把别人新的改动拉下来。</p>
      <p>别人发你 GitHub 链接装项目，标准操作：clone 下来 → 装依赖（npm install）→ 跑。</p>
      <p>类似的还有 <em>GitLab</em>、<em>Gitee</em>（国内），用法基本一样。</p>
    ` },
  ],
  children: [node_npm, node_ssh],
};

const node_git = {
  id: "git",
  emoji: "🌿",
  title: "Git / 版本管理",
  concept: { name: "Git / commit / branch / merge", explain: "代码的存档系统——记下每次改了什么，能随时回退到以前的版本。" },
  pages: [
    { html: `
      <p>改代码改崩了想回退？多人协作不撞改？</p>
      <p><em>Git</em>：代码的"存档系统"。每次改完手动"存档"（叫<em>commit</em>），它记下你改了什么、什么时间、谁改的。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📝</span><span class="ei-label">改代码</span>
        <span class="ei-arrow">add</span>
        <span class="ei-label">选要存的文件</span>
        <span class="ei-arrow">commit</span>
        <span class="ei-emoji">💾</span><span class="ei-label">存一档</span>
      </div>
      <p>核心操作：<em>add</em>（选要存的文件）→ <em>commit</em>（存一档 + 写注释说改了啥）→ <em>push</em>（传到 GitHub）。</p>
      <p><em>branch</em>（分支）：开一条独立线试新东西，不影响主线（主线一般叫 <em>main</em> 或 <em>master</em>）。试好了再 <em>merge</em>（合并）回来。</p>
      <p><em>PR</em>（<em>Pull Request</em>）：让别人审你的改动、决定合不合并到主线。开源协作标配。</p>
      <p><em>conflict</em>（冲突）：你和别人改了同一行——Git 不知道选哪个，得你手动决定。</p>
      <p>AI 经常说"先 commit 一下再改"——意思是"先存档，万一改坏能回退"。</p>
    ` },
  ],
  children: [node_github],
};

const node_terminal = {
  id: "terminal",
  emoji: "⌨️",
  title: "终端 / 命令行",
  lightbulb: true,
  concept: { name: "终端 / shell / bash / PowerShell", explain: "黑窗口里敲文字命令操作电脑——装东西、跑代码、传文件都靠它。" },
  pages: [
    { html: `
      <p>AI 老说"在终端里跑 npm install"——终端是啥？</p>
      <p><em>终端</em>（英文 <em>terminal</em>）：电脑里那个黑窗口，敲文字命令做事。</p>
      <p>叫法：Mac / Linux 叫 <em>Terminal</em> 或 <em>bash</em> / <em>zsh</em>；Windows 叫 <em>cmd</em> 或 <em>PowerShell</em>。</p>
      <p>常用命令：</p>
      <ul>
        <li><em>cd 文件夹</em>：进入某个文件夹</li>
        <li><em>ls</em>（Windows 是 dir）：列出当前目录文件</li>
        <li><em>npm install</em>：装依赖</li>
        <li><em>git push</em>：提交代码</li>
        <li><em>python xxx.py</em> / <em>node xxx.js</em>：跑某个脚本</li>
      </ul>
      <p>所有 AI 让你跑的"命令"都是这种——复制粘贴回车。报错就把红字复制问 AI。</p>
    ` },
  ],
  children: [],
};

const node_prompt = {
  id: "prompt-llm",
  emoji: "💬",
  title: "提示词 / 上下文 / token",
  lightbulb: true,
  concept: { name: "Prompt / Context / Token / LLM", explain: "给 AI 的指令叫 prompt；AI 一次能看的内容长度叫 context；按字符算的计费单位叫 token。" },
  pages: [
    { html: `
      <p>跟 Claude / ChatGPT 聊久了 AI 突然忘事？API 收费按什么收？</p>
      <p><em>Prompt</em>（提示词）：你给 AI 的那段指令。写得越清楚 AI 越听话。</p>
      <p><em>Context</em>（上下文）：AI 一次能"看到"的所有内容（你说的 + 它说的 + 你给的文件）。塞满就会忘前面的。</p>
      <p><em>Token</em>：一段文字被 AI 拆成的小块（约 1 个中文字 ≈ 1.5 token、1 个英文词 ≈ 1.3 token）。API 按 token 收费。</p>
      <p><em>Context window</em>：模型一次最多能容下多少 token。Claude Opus 4.7 是 100 万 token，约一本厚书。</p>
      <p><em>LLM</em>（Large Language Model）：大语言模型——Claude、ChatGPT、Gemini、DeepSeek 这些 AI 的统称。</p>
      <p><em>幻觉</em>（<em>hallucination</em>）：AI 一本正经编不存在的东西（函数名、库名、API）——所以重要的事一定要让它跑命令验证。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">💬</span><strong>提示词</strong> = 给 AI 发的指令；<strong>上下文</strong> = AI 这一段能记住的全部内容；<strong>token</strong> = AI 的"按字数收费"单位</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">📝</span>跟 Claude 长聊 → 它突然忘前面 → 因为对话超了上下文窗口（比如 20 万 token）</div>
              <div class="ex-line"><span class="ex-emoji">💸</span>调 OpenAI API 做 AI 客服 → 每条消息按 token 收钱（用户的输入 + AI 的回复 都算）</div>
              <div class="ex-line"><span class="ex-emoji">🔢</span>1 汉字 ≈ 2 token、1 英文词 ≈ 1 token。1000 字提示词 ≈ 烧 2000 token</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">✂️</span>提示词不写太长（费钱 + 挤掉记忆 + 漏关键要求）→ 精简、分多条发</div>
              <div class="ex-line"><span class="ex-emoji">📊</span>做 AI 产品能估成本：1000 用户 × 平均聊 20 轮 × 每轮 1500 token = 算月费</div>
              <div class="ex-line"><span class="ex-emoji">⚠️</span>AI 会编不存在的函数 / 库（叫<strong>幻觉</strong>）→ 重要的代码让它跑命令验证</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [],
};

// ============================================================
// vibecoding 实操流程（4 个 lightbulb 子，挂在 ai-helper 下）
// 这是给 vibe 创作者的"怎么跟 AI 协作"的具体方法论
// ============================================================

const node_vibe_split_task = {
  id: "vibe-split-task",
  emoji: "✂️",
  title: "拆需求给 AI",
  lightbulb: true,
  concept: { name: "拆任务 / 一次一件事", explain: "一次给 AI 一个小目标比一次塞 10 件事效果好——AI 容易跑偏。" },
  pages: [
    { html: `
      <p>很多 vibe 创作者最大的坑：一次跟 AI 说"做一个微信级别的聊天软件"——AI 写一堆能跑不能用的代码。</p>
      <p>正确做法：<strong>拆成一件一件小目标</strong>，一次一件。</p>
      <ul>
        <li>① 先做"两人能发文字"——最基础</li>
        <li>② 跑通后加"消息存数据库"</li>
        <li>③ 再加"对方在线/离线状态"</li>
        <li>④ 再加图片 / 表情 / 群聊...</li>
      </ul>
      <p>每完成一件 → <em>git commit</em> 存档 → 下一件如果 AI 改炸了能回滚。</p>
      <p>跟 AI 说"先只做第 ① 件"比"全做了"清晰 100 倍。</p>
    ` },
  ],
  children: [],
};

const node_vibe_review = {
  id: "vibe-review",
  emoji: "🔍",
  title: "验收 AI 写的代码",
  lightbulb: true,
  concept: { name: "review / 验收 / 跑一遍验证", explain: "AI 改完不能直接信——必须自己跑一遍 + 看 diff，否则 bug 累计到爆炸。" },
  pages: [
    { html: `
      <p>AI 说"改好了"≠ 真好了。常见情况：</p>
      <ul>
        <li>AI 编了一个不存在的函数 / 库名（叫<em>幻觉</em>）</li>
        <li>AI 改了你没让它改的地方</li>
        <li>AI 跑测试通过了但实际操作不对</li>
      </ul>
      <p>每次 AI 改完，必须做：</p>
      <ul>
        <li>① <strong>看 diff</strong>：在编辑器或 git 里看具体改了哪几行</li>
        <li>② <strong>真人跑一遍</strong>：打开页面操作一次，眼睛看是否符合预期</li>
        <li>③ <strong>边界情况</strong>：试一下"没填表单点提交"、"超长字符"、"重复操作"</li>
        <li>④ <strong>没问题再 commit</strong>，有问题立刻让 AI 重做</li>
      </ul>
      <p>"AI 改了我没让它改的地方"——这种最危险。看 diff 时发现多余改动，立刻让它撤回。</p>
    ` },
  ],
  children: [],
};

const node_vibe_refactor = {
  id: "vibe-refactor",
  emoji: "🧹",
  title: "让 AI 重构整理",
  lightbulb: true,
  concept: { name: "重构 / refactor", explain: "代码功能没变但结构变好——AI 是重构利器，比手动整理快 100 倍。" },
  pages: [
    { html: `
      <p>vibe 写一段时间 → 代码乱：一个文件 800 行、变量名乱、重复代码到处都是。</p>
      <p>这时让 AI <em>重构</em>（<em>refactor</em>）——功能不变但代码变干净。</p>
      <p>常见重构指令：</p>
      <ul>
        <li>"把这段重复的逻辑抽成一个函数 / 组件"</li>
        <li>"把这个 800 行文件按功能拆成 3 个小文件"</li>
        <li>"统一变量命名风格：全部用 camelCase"</li>
        <li>"把硬编码的字符串提取成常量"</li>
      </ul>
      <p>重构前一定 <em>git commit</em> 一次——AI 重构有时会破坏功能，能秒回滚。</p>
      <p>重构后必须再跑一遍验证（见"验收 AI 写的代码"）。</p>
    ` },
  ],
  children: [],
};

const node_vibe_prompt_craft = {
  id: "vibe-prompt-craft",
  emoji: "💬",
  title: "跟 AI 怎么拉扯",
  lightbulb: true,
  concept: { name: "提示词技巧 / 高效沟通", explain: "把模糊需求翻译成 AI 能懂的具体指令——同样的需求，写法不同效果差 10 倍。" },
  pages: [
    { html: `
      <p>"做一个登录页"——AI 给你 200 行模板。</p>
      <p>"做一个登录页，邮箱+密码两栏，按钮点了调 /api/login 接口，成功跳 /dashboard，失败弹红色提示"——AI 给你能用的代码。</p>
      <p>写好提示词几招：</p>
      <ul>
        <li><strong>给具体例子</strong>："像 微信 那种气泡布局"比"做聊天界面"清楚</li>
        <li><strong>说清约束</strong>："用 Tailwind 不用其他 CSS 框架"</li>
        <li><strong>说清不要什么</strong>："不要登录功能，先只做静态页"</li>
        <li><strong>分阶段</strong>：先描述大方向 → AI 给方案 → 你确认 → AI 才动手</li>
        <li><strong>给报错原文</strong>：复制整段红字 + 截图比"它不工作"快 10 倍</li>
      </ul>
      <p>跟 AI 拉扯不是一次到位——大需求来回 3-5 轮很正常。</p>
    ` },
  ],
  children: [],
};

const node_ai_helper = {
  id: "ai-helper",
  emoji: "🤖",
  title: "AI 编程助手",
  concept: { name: "AI 编程助手", explain: "能读 / 改你项目代码、跑命令、自己 debug 的 AI 程序。" },
  pages: [
    { html: `
      <p>不会代码也能做东西的关键——AI 帮你写。常用几种：</p>
      <p><strong>终端里跑的（操作整个项目）</strong></p>
      <ul>
        <li><em>Claude Code</em>：Anthropic 出的，能读改你整个项目、跑命令、自己 debug。这个网页就是它做的。</li>
      </ul>
      <p><strong>带 AI 的编辑器</strong></p>
      <ul>
        <li><em>Cursor</em>：基于 VS Code 改的、AI 深度集成。最热门 vibe coding 工具。</li>
        <li><em>Windsurf</em>：类似 Cursor 的 AI 编辑器。</li>
        <li><em>GitHub Copilot</em>：微软出的 AI 代码补全插件，可装到 VS Code。</li>
      </ul>
      <p><strong>网页里一句话出 App</strong></p>
      <ul>
        <li><em>Lovable</em>：聊一句"我要个 X" 直接出可访问网址。</li>
        <li><em>Bolt.new</em>：类似 Lovable，StackBlitz 出的。</li>
        <li><em>Replit Agent</em>：网页 IDE + AI 一条龙。</li>
        <li><em>v0</em>：Vercel 出的，专做前端 UI。</li>
      </ul>
      <p>底下的"大脑"都是同一批 <em>LLM</em>（Claude / GPT / Gemini）——只是套壳和能调的工具不同。</p>
    ` },
  ],
  children: [node_git, node_prompt, node_vibe_prompt_craft, node_vibe_split_task, node_vibe_review, node_vibe_refactor],
};

const node_editor = {
  id: "editor",
  emoji: "📝",
  title: "编辑器 / IDE",
  concept: { name: "编辑器 / IDE", explain: "写代码用的程序——比记事本智能：语法高亮、自动补全、跳定义、跑代码都一站。" },
  pages: [
    { html: `
      <p>代码本质就是文字——用记事本也能写，但极难。</p>
      <p>专门写代码用的程序叫<em>编辑器</em>，全功能的叫 <em>IDE</em>（Integrated Development Environment）。</p>
      <p>主流：</p>
      <ul>
        <li><em>VS Code</em>：微软出的免费王者，全宇宙最流行。</li>
        <li><em>Cursor</em>：在 VS Code 上加了深度 AI，vibe coding 首选。</li>
        <li><em>Windsurf</em>：Cursor 竞争对手，AI 一体化。</li>
        <li><em>Sublime Text</em>、<em>Vim</em>、<em>Emacs</em>：老牌或极客向。</li>
        <li><em>JetBrains</em> 全家桶（IntelliJ / PyCharm / WebStorm）：付费，企业开发用得多。</li>
      </ul>
      <p>关键能力：<em>语法高亮</em>（不同代码块上色）、<em>自动补全</em>（敲一半弹建议）、<em>跳定义</em>（点变量直接跳到它在哪定义的）、<em>调试</em>（断点、单步执行）。</p>
    ` },
  ],
  children: [node_ai_helper, node_terminal],
};

const node_tools_entry = {
  id: "tools-entry",
  emoji: "🛠️",
  title: "写代码用什么工具",
  concept: { name: "开发工具链", explain: "编辑器 + AI 助手 + Git + GitHub + 包管理——做项目的标准工具组合。" },
  pages: [
    { html: `
      <p>不管做什么类型的项目，背后都是这一套工具。</p>
      <p>大致顺序：</p>
      <ul>
        <li>用<em>编辑器</em>（VS Code / Cursor）写代码</li>
        <li>让<em>AI 助手</em>（Claude / Cursor / Lovable）帮你写</li>
        <li>用 <em>Git</em> 存档每次改动</li>
        <li>把代码传到 <em>GitHub</em></li>
        <li>用<em>包管理</em>（npm / pip）装别人写好的库</li>
      </ul>
      <p>大部分 vibe coder 卡壳不是因为代码——是因为这些工具的概念没理顺。先把这套搞清楚，做啥都顺手。</p>
    ` },
  ],
  children: [node_editor],
};

// ============================================================
// 新增灯泡支线节点：localhost / 环境变量 / JSON / 其他平台 / 大型架构
// 都是 lightbulb: true，挂在现有节点的 children 里
// ============================================================

const node_localhost = {
  id: "localhost",
  emoji: "🚪",
  title: "localhost / 端口 / 别人为什么打不开",
  lightbulb: true,
  concept: { name: "localhost / 端口 / 本机服务器", explain: "本机跑的服务器只有你自己能访问；端口是程序在网络上的「门牌号」。" },
  pages: [
    { html: `
      <p>跟教程跑出 <em>http://localhost:3000</em>，自己电脑能开，发给朋友打不开？正常。</p>
      <p><em>localhost</em>：意思就是"你这台电脑自己"。等价于 <em>127.0.0.1</em>。这两个名字指向"自己本机"——别人电脑访问 localhost 是他们自己的电脑。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span><span class="ei-label">你电脑（localhost）</span>
        <span class="ei-arrow">🚫</span>
        <span class="ei-emoji">👤</span><span class="ei-label">别人电脑</span>
        <span class="ei-label">外网根本访问不到</span>
      </div>
      <p><em>端口</em>（英文 <em>port</em>）：localhost 后面的 <em>:3000</em> / <em>:8080</em> / <em>:8765</em>——程序在网络上的"门牌号"。一台电脑能同时跑很多程序、每个占一个端口。</p>
      <p>常见端口：网页默认 80（http）和 443（https）；本机开发 3000 / 5173 / 8000 / 8080 都常见。</p>
      <p>想让别人能访问你做的东西：</p>
      <ul>
        <li>正式做法：<em>部署</em>到服务器（云上电脑 + 公网 IP + 域名）</li>
        <li>临时分享：<em>ngrok</em> / <em>Cloudflare Tunnel</em> 打个隧道，把本机端口暴露成公网网址</li>
      </ul>
      <p>本机服务能不能进还跟<em>防火墙</em>（<em>firewall</em>）有关——公司 / 学校网络常拦截。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🏠</span><strong>localhost</strong> = "我自己这台电脑"（每个人都不一样）；<strong>端口号</strong> = 自家的不同房门（:3000 / :8080）</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🚀</span>跟教程跑 <code>npm run dev</code> → 终端冒出 <code>http://localhost:3000</code> → 在你浏览器开 = 看你刚做的网页</div>
              <div class="ex-line"><span class="ex-emoji">📱</span>把这链接发朋友 → 朋友点开是空白（他的 localhost 是他自己电脑、不是你的）</div>
              <div class="ex-line"><span class="ex-emoji">🌐</span>要让朋友看到 → 部署到 <strong>Vercel / Netlify</strong> 拿个公网网址（比如 my-site.vercel.app）</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🧠</span>不会再问"我打开 localhost:3000 是你的网页吗"——你自己电脑跑啥就是啥</div>
              <div class="ex-line"><span class="ex-emoji">🚪</span>看到 <code>localhost:5173</code> 跟 <code>localhost:3000</code> = 同一台电脑、不同程序</div>
              <div class="ex-line"><span class="ex-emoji">🛠️</span>想让朋友临时看 → 用 <strong>ngrok / Cloudflare Tunnel</strong> 把本机端口暴露成公网</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_env_apikey = {
  id: "env-apikey",
  emoji: "🔑",
  title: "API key / 环境变量 / 密钥",
  lightbulb: true,
  concept: { name: "API key / 环境变量 / .env", explain: "API key 是调用第三方服务的钥匙；不能写代码里、不能上传 GitHub——会被盗刷。" },
  pages: [
    { html: `
      <p>接 GPT、Claude API、微信支付、阿里云存储——对方给你一长串字符叫 <em>API key</em>（也叫 <em>secret</em> / 密钥 / token）。</p>
      <p>用它向对方证明"是我在调"，对方按调用量收钱。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🔑</span><span class="ei-label">API key</span>
        <span class="ei-arrow">⚠️</span>
        <span class="ei-label">绝对不能写代码里 + 上传 GitHub</span>
      </div>
      <p><strong>绝对不能</strong>把 API key 写代码里上传 GitHub——爬虫几小时就扫到、拿你的 key 调爆 API、你账单上万。已经发生过太多次了。</p>
      <p>正确做法：放<em>环境变量</em>（<em>environment variable</em>）里。</p>
      <p>项目根目录建一个 <em>.env</em> 文件写：</p>
      <p style="font-family:monospace;font-size:12px;background:#fff5e6;padding:6px 10px;border-radius:6px;">OPENAI_API_KEY=sk-xxx<br/>DB_PASSWORD=yyy</p>
      <p>代码里读 <code>process.env.OPENAI_API_KEY</code>，不直接写那串字符。</p>
      <p>同时把 <em>.env</em> 加进 <em>.gitignore</em>——告诉 Git 不要上传这个文件。</p>
      <p>真不小心传了？<strong>立刻去对方平台撤销那个 key 重新生成</strong>，删 commit 来不及（GitHub 历史里还在）。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🔑</span><strong>API key</strong> = 用别人家服务的"钥匙" + 银行卡密码——谁拿到谁就能刷你的钱</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🤖</span>接 ChatGPT → 拿到一串 sk-xxx → 这是 OpenAI 给你的"调用钥匙"，按用量收费</div>
              <div class="ex-line"><span class="ex-emoji">🗺️</span>接高德地图 / 微信支付 / 阿里云 OSS → 每家都给一串 key</div>
              <div class="ex-line"><span class="ex-emoji">📁</span>正确做法：建个 <strong>.env</strong> 文件写 <code>OPENAI_API_KEY=sk-xxx</code>，加进 .gitignore 不上传</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能保住钱包）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">😱</span>常见灾难：key 写代码里 → 推 GitHub → 几小时后爬虫扫到 → 盗刷几千刀</div>
              <div class="ex-line"><span class="ex-emoji">✅</span>用 .env + .gitignore → key 不会跟代码一起公开，安全</div>
              <div class="ex-line"><span class="ex-emoji">⚠️</span>不小心传了？<strong>立刻去对方平台撤销 key 重发</strong>，删 commit 救不了（GitHub 历史还在）</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_json_methods = {
  id: "json-methods",
  emoji: "📋",
  title: "JSON / GET POST / 状态码",
  lightbulb: true,
  concept: { name: "JSON / HTTP 方法 / 状态码", explain: "JSON 是常用数据格式；GET POST 是请求动作；200 / 404 / 500 是回应「成不成功」的暗号。" },
  pages: [
    { html: `
      <p>看 API 文档说"POST 请求、body 是 JSON、200 表示成功"——什么意思？</p>
      <p><em>JSON</em>：网络上传数据最常用的格式，像下面这样：</p>
      <p style="font-family:monospace;font-size:12px;background:#fff5e6;padding:6px 10px;border-radius:6px;">{ "name": "小明", "age": 10, "skills": ["画画", "编程"] }</p>
      <p>大括号 + 键值对 + 引号包字符串——这就是 JSON。读起来直观。</p>
      <p><em>请求方法</em>（HTTP method）：你想干啥：</p>
      <ul>
        <li><em>GET</em>：查数据（拿天气、读列表）</li>
        <li><em>POST</em>：发新数据（提交表单、发评论）</li>
        <li><em>PUT</em> / <em>PATCH</em>：改已有数据</li>
        <li><em>DELETE</em>：删数据</li>
      </ul>
      <p><em>状态码</em>（<em>status code</em>）：服务器回应的"成不成"暗号：</p>
      <ul>
        <li><em>200</em>：成了</li>
        <li><em>301</em> / <em>302</em>：跳转去别处</li>
        <li><em>400</em>：你发的内容有问题</li>
        <li><em>401</em>：你没登录 / 没权限</li>
        <li><em>403</em>：知道你是谁但不让你做这事</li>
        <li><em>404</em>：找不到（网址错了或东西删了）</li>
        <li><em>429</em>：你调太频繁了，被限流</li>
        <li><em>500</em>：服务器自己崩了</li>
      </ul>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">📦</span><strong>JSON</strong> = 数据的"快递面单"标准格式；<strong>方法</strong> = 你想干啥（查 / 寄 / 改 / 删）；<strong>状态码</strong> = 服务器回应"成不成"暗号</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🏷️</span>JSON 数据长这样：<code>{"name":"小明","age":10,"vip":true}</code>——前后端互发数据都用这格式</div>
              <div class="ex-line"><span class="ex-emoji">👀</span><strong>GET</strong> 看朋友圈列表 / <strong>POST</strong> 发新帖 / <strong>PUT</strong> 改个人简介 / <strong>DELETE</strong> 删评论</div>
              <div class="ex-line"><span class="ex-emoji">📋</span>状态码：<strong>200</strong> 成 / <strong>401</strong> 没登录 / <strong>404</strong> 找不到 / <strong>429</strong> 太频繁被限 / <strong>500</strong> 服务器崩</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🐛</span>看到 404 → 网址 / 接口名拼错；看到 500 → 后端炸了不是你的锅</div>
              <div class="ex-line"><span class="ex-emoji">📖</span>看 API 文档不慌：知道每个 endpoint 用什么方法、传什么 JSON、返回啥</div>
              <div class="ex-line"><span class="ex-emoji">🗣️</span>跟 AI 说"这个接口用 POST 提交 JSON" / "返回 200 才视为成功" → 沟通精准</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_other_web = {
  id: "other-web",
  emoji: "🧩",
  title: "扩展 / 小程序 / Web 游戏",
  lightbulb: true,
  concept: { name: "浏览器扩展 / 微信小程序 / Web 游戏", explain: "都跑在「网页 / 浏览器」壳里，但分发渠道和能力不同。" },
  pages: [
    { html: `
      <p>不只是独立网页——同样基于网页技术还能做几种东西：</p>
      <p><em>浏览器扩展</em>（<em>extension</em>）：装在 Chrome / Edge 上，能改任意网页、加按钮、做翻译 / 广告拦截 / 笔记同步。用 <em>HTML</em> / <em>CSS</em> / <em>JS</em> 写，打包传 <em>Chrome 商店</em>（一次性 $5）。</p>
      <p><em>油猴脚本</em>（<em>Tampermonkey</em>）：扩展的简化版，一段 JS 就能给某网站加功能，不用上架。</p>
      <p><em>微信小程序</em>：跑在微信里、不用下载、扫码 / 搜索就能用。用微信特供的"类 HTML/CSS/JS"语法（<em>WXML</em> / <em>WXSS</em>）。要在微信开放平台注册 + 审核。</p>
      <p>类似还有<em>支付宝小程序</em>、<em>抖音小程序</em>、<em>百度小程序</em>——各家自己一套。</p>
      <p><em>Web 游戏</em>：浏览器里跑的游戏。简单 2D 用 <em>Phaser</em>、<em>PixiJS</em>；3D 用 <em>Three.js</em>、<em>Babylon.js</em>。不用下载、链接就能玩。</p>
      <p>独立游戏想做装机 PC / Mac / 手机的：<em>Unity</em>（C#）、<em>Godot</em>（轻量开源）、<em>Unreal</em>（3A 级）。</p>
    ` },
  ],
  children: [],
};

const node_big_arch = {
  id: "big-arch",
  emoji: "🏗️",
  title: "做大公司级服务",
  lightbulb: true,
  concept: { name: "大型服务架构", explain: "单体 / 微服务 / 网关 / 熔断 / 缓存 / 队列 / 分库分表 / 容器——为支撑百万级流量加的层层东西。" },
  pages: [
    { html: `
      <p>这一节是「<em>通用扩容技术</em>」——产品做大了（日活几十万、几百万）任何类型都可能撞上。</p>
      <div class="quiz-card">
        <div class="quiz-q">你做一个日活 5 千的工具站，下面哪种方案最合适？</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">微服务架构 + 注册中心 + 网关 + 熔断限流</button>
          <button class="quiz-opt" type="button" data-correct="true">单体应用 + 一台数据库 + Cloudflare / Vercel 部署</button>
          <button class="quiz-opt" type="button" data-correct="false">分库分表 + Redis 集群 + Kafka 队列</button>
        </div>
        <div class="quiz-result">小项目上大型架构是<strong>给自己挖坑</strong>。AI 给你方案直接堆"微服务"——拒绝。</div>
      </div>
      <p>下面几页过一遍这些名词，知道是什么、什么时候真的需要就好。</p>
      <p>不同类型产品（电商 / 社交 / 直播 / 游戏 / IM / AI 套壳……）各自<em>特有</em>的后端能力——是<strong>另一条灯泡</strong>（「🎁 不同类型产品的后端要什么」）。</p>
    ` },
    { html: `
      <p><strong>🧩 微服务 vs 单体</strong></p>
      <p><em>单体</em>：所有功能（用户 / 商品 / 订单 / 支付）写一个程序里。简单，但任意一处崩全挂；改一行整个重新部署。</p>
      <p><em>微服务</em>（<em>microservice</em>）：拆成独立的小服务——用户服务、商品服务、订单服务、支付服务，各跑各的。一个崩别的还活；各自升级。</p>
      <p>代价：通信复杂、运维成本暴增、调试难——小项目用就是自找苦吃。</p>
      <p><strong>📒 注册中心 / 服务发现</strong></p>
      <p>拆几十个服务后——A 服务怎么知道 B 服务在哪台机器、哪个端口？</p>
      <p><em>注册中心</em>（<em>registry</em>）：每个服务启动时报"我叫 X、在 1.2.3.4:8080"。别人去注册中心查地址。这叫<em>服务发现</em>。</p>
      <p>常用：<em>Consul</em>、<em>Nacos</em>、<em>Eureka</em>、<em>etcd</em>。</p>
    ` },
    { html: `
      <p><strong>🚪 API 网关</strong></p>
      <p><em>网关</em>（<em>API gateway</em>）：所有外部请求先到的"前台"，再分发给后面的微服务。</p>
      <p>顺便做：鉴权（验登录）、限流、日志、跨域、协议转换。</p>
      <p>常用：<em>Nginx</em>、<em>Kong</em>、<em>Spring Cloud Gateway</em>、<em>APISIX</em>。</p>
      <p><strong>⚡ 熔断 / 限流</strong></p>
      <p><em>限流</em>（<em>rate limit</em>）：限制每秒最多接多少请求。防爬虫 / 防被人刷爆。</p>
      <p><em>熔断</em>（<em>circuit breaker</em>，断路器）：发现某个下游服务一直超时 / 报错，自动"断电"暂停调它——避免拖垮整个系统。等它好了再恢复。</p>
      <p><em>降级</em>：核心服务挂了，给用户返回兜底数据（"加载中""暂时不可用"），不让整页崩。</p>
      <p>常用：<em>Sentinel</em>、<em>Hystrix</em>、<em>Resilience4j</em>。</p>
    ` },
    { html: `
      <p><strong>🗄️ 缓存</strong></p>
      <p>数据库查得慢——把热门数据先放内存里，下次直接读内存、秒回。这叫<em>缓存</em>（<em>cache</em>）。</p>
      <p>最常用：<em>Redis</em>（内存数据库，极快）、<em>Memcached</em>。</p>
      <p><strong>📨 消息队列</strong></p>
      <p>下单后要做：扣库存 / 发短信 / 写积分 / 通知物流——全部做完用户得等好几秒。</p>
      <p><em>消息队列</em>（<em>message queue</em>，<em>MQ</em>）：下单后只把"有人下了单"丢进队列就立刻回应用户。后面的事让其他服务慢慢从队列拿走异步处理。</p>
      <p>另一个用处：<em>解耦</em>——下游挂了，消息留在队列里等它好了再处理。</p>
      <p>常用：<em>Kafka</em>、<em>RabbitMQ</em>、<em>RocketMQ</em>、<em>NATS</em>。</p>
    ` },
    { html: `
      <p><strong>🗃️ 分库分表 / 读写分离</strong></p>
      <p>单台数据库扛不住几亿条数据。</p>
      <p><em>分表</em>（<em>sharding</em>）：按用户 ID 把订单表拆成 16 张表（user_id % 16），查的时候只查对应那一张。</p>
      <p><em>分库</em>：再拆到几台不同数据库机器上。</p>
      <p><em>读写分离</em>：写一台主库（<em>master</em>），读分散到几台从库（<em>slave</em> / <em>replica</em>）——读多写少能扛更多。</p>
      <p><strong>📦 Docker / Kubernetes / 容器</strong></p>
      <p><em>容器</em>（<em>container</em>）：把程序 + 所有依赖打包成一个标准盒子。「在我电脑能跑、在你电脑跑不了」的痛点终结者。</p>
      <p><em>Docker</em>：最流行的容器工具。</p>
      <p><em>镜像</em>（<em>image</em>）：装好的盒子的快照，能复制无数份。</p>
      <p><em>Kubernetes</em>（简称 <em>K8s</em>，K 和 s 之间 8 个字母）：管理几百几千个容器的工具——挂了自动重启、流量大自动加机器、版本切换不停服。</p>
    ` },
    { html: `
      <p><strong>⚖️ 负载均衡 / Nginx / CDN</strong></p>
      <p><em>负载均衡</em>（<em>load balancer</em>）：一个入口把流量分摊给后面几台机器，每台干一部分。</p>
      <p><em>Nginx</em>：又是 Web 服务器又是反向代理又是负载均衡的多面手，全球使用最广。</p>
      <p><em>反向代理</em>（<em>reverse proxy</em>）：用户访问的不是真实服务器，而是 Nginx——Nginx 再去问后面的服务、把结果转回来。能藏真实服务器、加缓存、做路由。</p>
      <p><em>CDN</em>（Content Delivery Network）：把图片 / 视频 / 静态文件分发到全球各地节点，用户从最近节点拿——加载快、省带宽。</p>
      <p>常用：<em>Cloudflare</em>、<em>七牛</em>、<em>阿里云 CDN</em>。</p>
      <p><strong>🔭 监控 / 日志 / 链路追踪</strong></p>
      <p>几十个服务跑着——挂了哪个、慢在哪一步、谁先挂触发了连锁？</p>
      <p><em>监控</em>：<em>Prometheus</em> + <em>Grafana</em>（看图）。</p>
      <p><em>日志聚合</em>：<em>ELK</em>（Elasticsearch + Logstash + Kibana）、<em>Loki</em>。</p>
      <p><em>链路追踪</em>（<em>tracing</em>）：一次请求经过哪些服务、每段耗时多久。<em>Jaeger</em>、<em>SkyWalking</em>。</p>
      <p><strong>结语</strong>：这些都是"扛大流量"才要的。日活几千 / 几万的小项目，单体 + 一台数据库 + Cloudflare Pages / Vercel 部署就够了。看到 AI 给你方案直接上微服务——拒绝。</p>
    ` },
  ],
  children: [],
};

const node_product_types = {
  id: "product-types",
  emoji: "🎁",
  title: "不同类型产品的后端要什么",
  lightbulb: true,
  concept: { name: "产品类型与后端能力", explain: "不同类型的产品要的后端能力差很多——按方向挑一类看它特有的技术。" },
  pages: [
    { html: `
      <p>不同类型产品要的<em>后端</em>能力差很多——电商要管库存、社交要 <em>Feed 流</em>、游戏要同步、金融要风控。</p>
      <p><strong>你想做的产品偏哪个大方向？</strong>挑一个继续看，每条只给那一类特有的东西。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🛍️</span><span class="ei-label">消费交易</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">💬</span><span class="ei-label">社交内容</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">🎮</span><span class="ei-label">强体验</span>
      </div>
      <div class="emoji-illust">
        <span class="ei-emoji">🏢</span><span class="ei-label">工作工具</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">🔐</span><span class="ei-label">强合规</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">🔮</span><span class="ei-label">前沿 / 个人</span>
      </div>
    ` },
  ],
  children: [],
};

const node_dns = {
  id: "dns",
  emoji: "🔗",
  title: "网址",
  lightbulb: true,
  concept: { name: "域名 / IP / DNS", explain: "域名是人记的名字、IP 是电脑编号、DNS 是翻译电话本。" },
  pages: [
    { html: `
      <p>想让用户敲 <em>example.com</em> 这种好记的网址打开你的网站？</p>
      <div class="emoji-illust">
        <span class="ei-label">example.com</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📒</span>
        <span class="ei-label">DNS 电话本</span>
        <span class="ei-arrow">→</span>
        <span class="ei-label">142.250.4.100</span>
      </div>
      <p>每台电脑其实有真实编号叫 <em>IP</em>（142.250.4.100 这种）。</p>
      <p>给人记的名字叫<em>域名</em>。</p>
      <p>把域名翻成 IP 的电话本，叫 <em>DNS</em>。</p>
    ` },
  ],
  children: [],
};

// ============================================================
// 性能 / 体验 / 运维相关 lightbulb 子节点（PWA / i18n / 暗黑模式 / 备份监控）
// ============================================================

const node_i18n = {
  id: "i18n",
  emoji: "🌏",
  title: "i18n / 多语言",
  lightbulb: true,
  concept: { name: "i18n / 国际化", explain: "让产品支持多种语言切换——不是写两份代码，是写一次 + 提取所有文字到 字典。" },
  pages: [
    { html: `
      <p>产品想给中国 + 海外用户用 → 中文 + 英文都得有 → 怎么不写两遍？</p>
      <p><em>i18n</em>（internationalization 的缩写，i + 18 个字母 + n）：把所有界面文字提取到一份"字典文件"，按用户选的语言查字典渲染。</p>
      <p>典型结构：</p>
      <ul>
        <li><em>zh.json</em>：<code>{ "welcome": "欢迎", "login": "登录" }</code></li>
        <li><em>en.json</em>：<code>{ "welcome": "Welcome", "login": "Login" }</code></li>
        <li>代码里写 <code>t('welcome')</code> 而不是直接 "欢迎"</li>
        <li>用户切换语言 → 重新查字典 → 整个界面瞬间换</li>
      </ul>
      <p>现成方案：<em>i18next</em>（最常用）、<em>react-intl</em>、<em>vue-i18n</em>。</p>
      <p>注意：日期格式 / 数字格式 / 货币 / 排序 也要按地区变（北京 vs New York 时区不同）——叫 <em>l10n</em>（localization 本地化）。</p>
    ` },
  ],
  children: [],
};

const node_dark_mode = {
  id: "dark-mode",
  emoji: "🌓",
  title: "黑暗模式",
  lightbulb: true,
  concept: { name: "黑暗 / 浅色 主题切换", explain: "用 CSS 变量定义所有颜色 → 切换 data-theme 一行改完整套主题。" },
  pages: [
    { html: `
      <p>用户看久了眼睛累 / 晚上不想被白屏闪 → 想要黑暗模式。</p>
      <p>核心做法：所有颜色用 <em>CSS 变量</em> 定义，不要写死颜色。切换主题 = 改变量值。</p>
      <p>简化代码：</p>
      <pre style="font-family:monospace;font-size:11.5px;background:#fff5e6;padding:8px;border-radius:5px;line-height:1.5;">:root { --bg: white; --text: black; }
[data-theme="dark"] { --bg: #1a1a1a; --text: #e0e0e0; }

body { background: var(--bg); color: var(--text); }

// JS 切换：
document.documentElement.setAttribute('data-theme', 'dark');</pre>
      <p>升级招：用 <em>matchMedia('(prefers-color-scheme: dark)')</em> 读用户系统设置——系统是暗的就默认暗。</p>
      <p>用户手动选过 → 存 <em>localStorage</em>，下次记住。</p>
      <p>常见坑：图片 / icon 也要适配（白底 icon 在暗模式看不清）→ 用 SVG + currentColor 让它跟随文字色。</p>
    ` },
  ],
  children: [],
};

const node_pwa = {
  id: "pwa",
  emoji: "📲",
  title: "PWA / 离线可用",
  lightbulb: true,
  concept: { name: "PWA / 渐进式 Web 应用", explain: "让网页能像 App 一样安装到桌面 + 离线可用 + 推送通知。" },
  pages: [
    { html: `
      <p>网页 vs App 最大差距：网页没网不能用、不能装桌面、不能推送通知。<em>PWA</em>（Progressive Web App）就是给网页加上这些 App 能力。</p>
      <p>核心三件套：</p>
      <ul>
        <li><em>manifest.json</em>：声明 App 名字 / 图标 / 启动颜色——浏览器看到才提示"添加到主屏幕"</li>
        <li><em>Service Worker</em>：在后台跑的脚本，能拦截网络请求 + 缓存文件——实现离线可用 + 推送通知</li>
        <li><em>HTTPS</em>：必须 HTTPS 才能跑 Service Worker</li>
      </ul>
      <p>用户体验：</p>
      <ul>
        <li>首次访问 → 浏览器提示"添加到主屏幕" → 用户加了图标到桌面</li>
        <li>点图标打开 → 没浏览器地址栏，跟原生 App 一样</li>
        <li>断网也能开 → Service Worker 缓存了核心文件</li>
      </ul>
      <p>现成框架：<em>Next.js</em> / <em>Vite</em> 配 PWA 插件几分钟搞定。</p>
    ` },
  ],
  children: [],
};

const node_backup_monitor = {
  id: "backup-monitor",
  emoji: "🛟",
  title: "备份 / 日志 / 监控",
  lightbulb: true,
  concept: { name: "数据备份 + 日志 + 监控告警", explain: "产品上线后必须有的"保命三件套"——出事能恢复、能查原因、能及时知道。" },
  pages: [
    { html: `
      <p>产品上线后任何意外都可能发生：服务器宕机、数据库炸了、用户量爆增、有人恶意攻击。三件保命套装：</p>
      <p><strong>1. 备份</strong>（Backup）</p>
      <ul>
        <li>数据库每天自动备份一次 → 存到另一个地方（不能跟主库一起挂）</li>
        <li>云服务通常自带（如 Supabase / 阿里云 RDS 自动备份保留 7-30 天）</li>
        <li>定期演练"从备份恢复"——没演练过 = 备份等于没有</li>
      </ul>
      <p><strong>2. 日志</strong>（Logging）</p>
      <ul>
        <li>程序关键步骤都打日志：用户登录 / 支付 / 报错</li>
        <li>用 <em>Pino</em> / <em>Winston</em>（Node）/ <em>logging</em>（Python）规范化输出</li>
        <li>日志集中收集：<em>Logtail</em> / <em>Better Stack</em> / <em>Sentry</em>（云服务，免费额度够小项目）</li>
      </ul>
      <p><strong>3. 监控告警</strong>（Monitoring）</p>
      <ul>
        <li>关键指标：响应时间 / 错误率 / CPU / 内存 / 数据库连接数</li>
        <li>设阈值告警：错误率 > 1% / CPU > 80% → 自动发邮件 / 短信 / Slack</li>
        <li>现成方案：<em>UptimeRobot</em>（免费监控网址在线）/ <em>Sentry</em>（错误聚合）/ <em>Grafana</em>（自建大屏）</li>
      </ul>
      <p>vibecoding 起步至少做：① 数据库自动备份开启 ② Sentry 接错误监控 ③ UptimeRobot 监控网址在线。</p>
    ` },
  ],
  children: [],
};

const node_framework = {
  id: "framework",
  emoji: "🧱",
  title: "前端框架",
  lightbulb: true,
  concept: { name: "前端框架", explain: "帮你管页面状态、拆组件的工具。" },
  pages: [
    { html: `
      <p>页面一复杂——「现在选中哪个」「输入框里有什么」「侧栏开没开」「购物车有几件」——这些"状态"开始难管。</p>
      <p>帮你管这些状态、把页面拆成组件的工具叫<em>前端框架</em>。</p>
      <p>主流：<em>React</em>、<em>Vue</em>、<em>Svelte</em>。</p>
    ` },
  ],
  children: [node_i18n],
};

// ============================================================
// 网络 / 实时 / 部署相关 lightbulb 子节点（SEO / Lighthouse / OAuth / Webhook）
// ============================================================

const node_seo = {
  id: "seo",
  emoji: "🔎",
  title: "SEO / 让别人搜到",
  lightbulb: true,
  concept: { name: "SEO / 搜索引擎优化", explain: "让 Google / 百度 把你的网页排在搜索结果前面——能省下大量广告费。" },
  pages: [
    { html: `
      <p>做了个工具站发上线 → 没人来？因为搜不到。</p>
      <p><em>SEO</em>（Search Engine Optimization，搜索引擎优化）= 让搜索引擎认识 + 喜欢你的网页，自然排进结果前面。</p>
      <p>核心几件事：</p>
      <ul>
        <li><em>title</em> + <em>description</em>：每个页面都设独立标题 + 一句描述（搜索结果里显示的就是这俩）</li>
        <li><em>语义化 HTML</em>：用 <em>h1 / h2</em> 分层级，用 <em>article / nav</em> 标语义</li>
        <li><em>sitemap.xml</em>：列出所有页面给爬虫看</li>
        <li><em>robots.txt</em>：告诉爬虫哪些能爬</li>
        <li>速度要快（见 Lighthouse 节点）+ 移动端友好</li>
        <li>有外链指向你（别的网站引用你）= 权威分高</li>
      </ul>
      <p>vibecoding 工具站建议：注册 <em>Google Search Console</em> + <em>百度站长平台</em>，提交 sitemap，看哪些关键词带来流量。</p>
    ` },
  ],
  children: [],
};

const node_lighthouse = {
  id: "lighthouse",
  emoji: "🚥",
  title: "Lighthouse / 网页性能审计",
  lightbulb: true,
  concept: { name: "Lighthouse / 性能审计", explain: "Google 出的免费工具，给网页打分（性能 / SEO / 无障碍 / 最佳实践）+ 给具体改进建议。" },
  pages: [
    { html: `
      <p>网页慢 / 不专业感 / 搜索引擎不喜欢——怎么知道哪里出问题？</p>
      <p><em>Lighthouse</em>：Google 出的网页审计工具，浏览器 F12 → Lighthouse 标签 → 跑一次。给你 4 个维度打分（0-100）：</p>
      <ul>
        <li><em>Performance</em>（性能）：加载多快、能多快互动</li>
        <li><em>Accessibility</em>（无障碍）：盲人 / 老人能用吗</li>
        <li><em>Best Practices</em>（最佳实践）：HTTPS / 没用废弃 API 等</li>
        <li><em>SEO</em>：搜索引擎友好吗</li>
      </ul>
      <p>每个分数底下列出具体问题 + 解决建议——按建议改一遍能涨 20-50 分。</p>
      <p>vibecoding 部署后跑一次 → 让 AI 看 Lighthouse 报告里的"机会"那一节 → AI 帮你按建议改。</p>
      <p>常见快速改进：图片用 <em>WebP</em> 格式、加 <em>lazy loading</em>、删没用的 JS、加 <em>meta description</em>。</p>
    ` },
  ],
  children: [],
};

const node_deploy_web = {
  id: "deploy-web",
  emoji: "🚀",
  title: "部署",
  concept: { name: "部署", explain: "把网页放到一直开着的服务器、绑一个网址，让别人能访问。" },
  pages: [
    { html: `
      <p>你电脑上的网页打开能看，但别人访问不到——你电脑不会一直开，也没公开网址。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span>
        <span class="ei-arrow">📤</span>
        <span class="ei-emoji">☁️</span>
        <span class="ei-arrow">🔗</span>
        <span class="ei-emoji">🌐</span>
        <span class="ei-label">用户能访问</span>
      </div>
      <p>把网页传到一台一直开着的服务器、绑一个网址——这一步叫<em>部署</em>。</p>
      <p>免费现成的：<em>Cloudflare Pages</em>、<em>Vercel</em>、<em>Netlify</em>。绑 GitHub，每次提交自动部署。</p>
    ` },
  ],
  children: [{ ref: "shared-server" }, node_localhost, node_seo, node_lighthouse],
};

const node_auth_web = {
  id: "auth-web",
  emoji: "🔐",
  title: "登录",
  concept: { name: "认证 / 授权", explain: "认证 = 你是谁；授权 = 你能干什么。" },
  pages: [
    { html: `
      <p>想让用户登录后看到自己的内容？想让管理员能删帖、普通用户不能？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🪪</span>
        <span class="ei-label">认证（你是谁）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔑</span>
        <span class="ei-label">授权（能干什么）</span>
      </div>
      <p><em>认证</em>：验证你是谁（密码、短信验证码、用微信 / Google 登录都是）。</p>
      <p><em>授权</em>：决定你能干什么（管理员 / 普通用户的权限）。</p>
      <p>容易写漏洞——用 <em>Supabase Auth</em> / <em>Clerk</em> / <em>Auth0</em> 接现成的更稳。</p>
    ` },
  ],
  children: [node_deploy_web],
};

const node_database_web = {
  id: "database-web",
  emoji: "🗃️",
  title: "数据库",
  concept: { name: "数据库", explain: "专门存数据、能快速找到的程序。" },
  pages: [
    { html: `
      <p>想保存用户评论、订单、上传的图、好友列表？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📝</span>
        <span class="ei-label">用户数据</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🗃️</span>
        <span class="ei-label">数据库（建索引）</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🔍</span>
        <span class="ei-label">瞬间找到</span>
      </div>
      <p>用 txt 文件存太慢——百万条数据找一条要扫一遍。</p>
      <p>专门存数据 + 能快速找的程序叫<em>数据库</em>。</p>
      <p>常见：<em>SQLite</em>、<em>MySQL</em>、<em>PostgreSQL</em>。</p>
    ` },
  ],
  children: [node_auth_web],
};

const node_api_http = {
  id: "api-http",
  emoji: "🔌",
  title: "API / HTTP",
  concept: { name: "API / HTTP", explain: "API 是约定的请求格式；HTTP 是底下的对话协议。" },
  pages: [
    { html: `
      <p>想让你的网页接 GPT、发微信、查天气、收支付？</p>
      <div class="fe-be-game">
        <div class="actor"><div class="actor-emoji">📱</div><div class="actor-label">你的应用</div></div>
        <div class="msg-track">
          <div class="msg msg-req">/weather?city=北京</div>
          <div class="msg msg-res">{ temp: 25°C }</div>
        </div>
        <div class="actor"><div class="actor-emoji">🤖</div><div class="actor-label">天气服务</div></div>
      </div>
      <p>你按对方提供的格式发请求，对方按格式回——这种约定叫 <em>API</em>。</p>
      <p>底下用的对话协议叫 <em>HTTP</em>。网址前的 http:// 就是它。</p>
      <p>这是 vc 创作者最魔法的部分——会调 API 就能用上几百个公司的服务。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🍔</span><strong>API</strong> = 服务方提供的"菜单 + 点单规则"；<strong>HTTP</strong> = 负责送菜的快递员（GET 看 / POST 下单）</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🌤️</span>做天气小卡片 → 调<strong>和风天气 API</strong>："GET /now?city=北京" → 拿温度返回</div>
              <div class="ex-line"><span class="ex-emoji">💳</span>做支付 → 调<strong>微信支付 API</strong>："POST /pay" 带订单金额 → 返回支付链接</div>
              <div class="ex-line"><span class="ex-emoji">🤖</span>做 AI 写作 → 调<strong>OpenAI API</strong>："POST /chat" 带提示词 → 返回 AI 答案</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🔌</span>会调 API = 能用上百家公司的服务（天气 / 地图 / 支付 / AI / 翻译）→ 不用自己造</div>
              <div class="ex-line"><span class="ex-emoji">📖</span>看 API 文档不慌：知道 GET/POST 啥意思、状态码意思、参数怎么传</div>
              <div class="ex-line"><span class="ex-emoji">🐛</span>报错"404 Not Found"知道是地址错；"500"是对方服务器崩——不是你 bug</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [node_database_web, node_json_methods],
};

const node_fe_be = {
  id: "fe-be",
  emoji: "🔁",
  title: "前端 / 后端",
  concept: { name: "前端 / 后端", explain: "前端是用户看到的；后端是服务器上跑、用户看不到的。" },
  pages: [
    { html: `
      <p>想让用户登录、想存评论 / 订单、想多人共享数据、想接微信付款——光在浏览器里跑的代码做不到。</p>
      <div class="fe-be-game">
        <div class="actor">
          <div class="actor-emoji">📱</div>
          <div class="actor-label">前端</div>
        </div>
        <div class="msg-track">
          <div class="msg msg-req">"我要登录"</div>
          <div class="msg msg-res">"欢迎你！"</div>
        </div>
        <div class="actor">
          <div class="actor-emoji">🖥️</div>
          <div class="actor-label">后端</div>
        </div>
      </div>
      <p><em>前端</em>：用户看到的部分，跑在浏览器里（<em>HTML</em> / <em>CSS</em> / <em>JS</em> 写的）。</p>
      <p><em>后端</em>：用户看不到的部分，跑在你的服务器上，管账号、存数据、收钱。</p>
      <p>做纯展示工具（番茄钟、计算器）只要前端就够。要存数据 / 多人共享 / 收钱就要加后端。</p>
      <div class="example-card">
        <button class="example-toggle">📖 看真实例子</button>
        <div class="example-content" hidden>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💡</span>原理（一句话）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🍽️</span>餐厅：<strong>前端 = 大堂</strong>（用户能看到摸到）+ <strong>后端 = 后厨</strong>（用户看不见但必须干）</div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">📱</span>在你做的产品里实际怎么用</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">❤️</span>朋友圈<strong>点赞按钮 = 前端</strong>（UI、动画、显示数字）；<strong>"赞数 +1 存进数据库" = 后端</strong></div>
              <div class="ex-line"><span class="ex-emoji">💬</span>聊天<strong>消息气泡 / 输入框 = 前端</strong>；<strong>消息存哪 / 怎么推给对方 = 后端</strong></div>
              <div class="ex-line"><span class="ex-emoji">🛒</span>淘宝<strong>商品页 / 加购按钮 = 前端</strong>；<strong>库存够不够 / 价格多少 / 下单成功 = 后端</strong></div>
            </div>
          </div>
          <div class="ex-section">
            <div class="ex-section-title"><span class="ex-section-icon">💪</span>给你带来什么好处（懂了能干啥）</div>
            <div class="ex-story">
              <div class="ex-line"><span class="ex-emoji">🐛</span>页面卡了 / 按钮没反应 → 找前端；提交后数据丢了 / 别人看不到 → 找后端，不会冤枉</div>
              <div class="ex-line"><span class="ex-emoji">⚡</span>纯展示工具（番茄钟 / 计算器 / 单页 portfolio）只要前端，部署 Vercel 免费用</div>
              <div class="ex-line"><span class="ex-emoji">💰</span>要存数据 / 多人共享 / 收钱 → 必须有后端 → 估算服务器成本</div>
            </div>
          </div>
        </div>
      </div>
    ` },
  ],
  children: [node_api_http, node_env_apikey],
};

const node_web_trio = {
  id: "web-trio",
  emoji: "🌐",
  title: "HTML / CSS / JS",
  concept: { name: "HTML / CSS / JavaScript", explain: "做网页的三件套：HTML 骨架、CSS 外观、JS 逻辑。" },
  pages: [
    { html: `
      <p>用户在你网页上看到的所有东西——文字、按钮、图、输入框——都是这三件套合起来的。</p>
      <div class="web-stack-game">
        <div class="stack-mock">
          <div class="stack-layer html"><div class="mock-title">我的页面</div><span class="mock-btn">按钮</span></div>
          <div class="stack-layer css" style="position:absolute;inset:8px;"><div class="mock-title styled">我的页面</div><span class="mock-btn styled">按钮</span></div>
          <div class="stack-layer js" style="position:absolute;bottom:6px;left:8px;font-size:9.5px;color:#c97b4a;">⚡ 点了按钮 → 弹个窗</div>
        </div>
        <div class="stack-labels">
          <span>📄 HTML 骨架</span>
          <span>🎨 +CSS 变好看</span>
          <span>⚡ +JS 能互动</span>
        </div>
      </div>
      <p><em>HTML</em>：写"页面里有什么"（标题、段落、按钮、图、输入框）。</p>
      <p><em>CSS</em>：写"长什么样"（颜色、字体、布局、间距、圆角）。</p>
      <p><em>JavaScript</em>：写"怎么响应"（点了按钮做什么、输了字算什么）。</p>
    ` },
  ],
  children: [node_fe_be, node_framework, node_dark_mode],
};

const node_where_web = {
  id: "where-web",
  emoji: "🌐",
  title: "在浏览器里打开",
  concept: { name: "浏览器", explain: "运行网页的程序——Chrome、Safari、Edge。" },
  pages: [
    { html: `
      <p>想让用户敲一个网址就能用上你做的东西？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">⌨️</span>
        <span class="ei-label">敲网址</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🌐</span>
        <span class="ei-label">网页打开</span>
      </div>
      <p>用户在 <em>浏览器</em>（Chrome / Safari / Edge）里打开，不用装东西、不用更新，手机电脑都能开。</p>
      <p>vc 创作者最容易出活的一条路。</p>
    ` },
  ],
  children: [node_web_trio, node_dns, node_other_web, node_pwa],
};

// ====== 电脑分支链 ======

const node_electron = {
  id: "electron",
  emoji: "🌐",
  title: "Electron / Tauri",
  concept: { name: "Electron / Tauri", explain: "把网页代码包成桌面 App 的工具。" },
  pages: [
    { html: `
      <p>会写网页（<em>HTML</em> / <em>CSS</em> / <em>JS</em>）就想做桌面 App？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📄+🎨+⚡</span>
        <span class="ei-label">网页代码</span>
        <span class="ei-arrow">📦</span>
        <span class="ei-emoji">💻</span>
        <span class="ei-label">.exe / .app</span>
      </div>
      <p>VS Code、Slack、Discord、飞书桌面版——里面跑的其实是浏览器内核 + 网页代码。</p>
      <p>包成桌面 App 的工具：<em>Electron</em>（功能全但体积大）、<em>Tauri</em>（体积小，用系统自带浏览器）。</p>
    ` },
  ],
  children: [],
};

const node_compile = {
  id: "compile",
  emoji: "📦",
  title: "编译",
  concept: { name: "编译", explain: "把代码翻译成机器能跑的文件（.exe / .app）。" },
  pages: [
    { html: `
      <p>你写的代码是给人看的——电脑直接看不懂。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📝</span>
        <span class="ei-label">人写的代码</span>
        <span class="ei-arrow">⚙️</span>
        <span class="ei-emoji">💾</span>
        <span class="ei-label">.exe / .app</span>
      </div>
      <p>翻译成机器能跑的可执行文件，这一步叫<em>编译</em>。</p>
      <p>Windows 出 .exe、macOS 出 .app。每改一次都要重新编译。</p>
    ` },
  ],
  children: [node_electron],
};

const node_os = {
  id: "os",
  emoji: "🪟",
  title: "操作系统",
  concept: { name: "操作系统", explain: "管硬件、给程序提供运行环境的那一层。" },
  pages: [
    { html: `
      <p>你的桌面 App 装在用户电脑上要跑——但要看用户用什么系统。</p>
      <p>程序和硬件中间的那一层叫<em>操作系统</em>。</p>
      <p>三大主流：<em>Windows</em>（大部分 PC）、<em>macOS</em>（苹果）、<em>Linux</em>（开发者）。每种能跑的文件不一样。</p>
    ` },
  ],
  children: [node_compile],
};

const node_where_desktop = {
  id: "where-desktop",
  emoji: "💻",
  title: "在电脑里双击打开",
  concept: { name: "桌面应用", explain: "双击图标就打开的程序——Word、QQ、剪映。" },
  pages: [
    { html: `
      <p>想做用户在电脑上双击图标就打开的程序？像 Word、QQ、剪映那样。</p>
      <p>这类叫<em>桌面应用</em>。</p>
      <p><em>Windows</em> 和 <em>macOS</em> 是两套不通的系统，原生写不能两边都跑。</p>
    ` },
  ],
  children: [node_os],
};

// ====== 手机分支链 ======

const node_appstore = {
  id: "appstore",
  emoji: "🏪",
  title: "应用商店",
  concept: { name: "应用商店", explain: "手机 App 必须通过的分发门。" },
  pages: [
    { html: `
      <p>想让用户在手机商店搜到、下载你的 App？</p>
      <p>手机 App 不像网页能直接发——必须通过<em>应用商店</em>审核。</p>
      <p>苹果：<em>App Store</em>（$99 / 年 + 审核几天到几周）。安卓：国外 <em>Google Play</em>、国内华为 / 小米 / OPPO / vivo 各家。</p>
    ` },
  ],
  children: [],
};

const node_cross = {
  id: "cross",
  emoji: "↔️",
  title: "跨平台",
  concept: { name: "跨平台", explain: "一份代码生成 iOS 和 Android 两端。" },
  pages: [
    { html: `
      <p>想一份代码同时出 iOS 和 Android App？</p>
      <p>这叫<em>跨平台</em>。主流两种：<em>Flutter</em>（Dart 语言）、<em>React Native</em>（JS，会写网页快上手）。</p>
      <p>出活快。代价是偶尔撞性能瓶颈或最新系统功能支持不全。</p>
    ` },
  ],
  children: [node_appstore],
};

const node_native = {
  id: "native",
  emoji: "⚙️",
  title: "原生开发",
  concept: { name: "原生开发", explain: "针对单一系统写——iOS 用 Swift、Android 用 Kotlin。" },
  pages: [
    { html: `
      <p>想要 App 性能最好、体验最贴近系统？</p>
      <p>针对一个系统单独写：iOS 用 <em>Swift</em>、Android 用 <em>Kotlin</em>——叫<em>原生开发</em>。</p>
      <p>代价：要写两遍。大厂主力 App 基本都走这条。</p>
    ` },
  ],
  children: [node_cross],
};

const node_where_mobile = {
  id: "where-mobile",
  emoji: "📱",
  title: "在手机上用",
  concept: { name: "iOS / Android", explain: "两大手机系统，彼此不通。" },
  pages: [
    { html: `
      <p>想做用户能在手机上下载的 App？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🍎</span>
        <span class="ei-label">iOS（iPhone）</span>
        <span class="ei-arrow">vs</span>
        <span class="ei-emoji">🤖</span>
        <span class="ei-label">Android（其他厂）</span>
      </div>
      <p>手机有两套不通的系统：苹果的 <em>iOS</em>、其他厂的 <em>Android</em>。</p>
      <p>原生写要写两遍；或者用跨平台工具一份代码两端跑。</p>
    ` },
  ],
  children: [node_native],
};

// ====== 命令行分支链 ======

const node_cron = {
  id: "cron",
  emoji: "⏰",
  title: "定时任务",
  concept: { name: "定时任务", explain: "操作系统的时间表——告诉它几点跑什么。" },
  pages: [
    { html: `
      <p>想让脚本每天 9 点自己跑？每小时签到一次？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">⏰</span>
        <span class="ei-label">每天 9:00</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📜</span>
        <span class="ei-label">自动跑脚本</span>
      </div>
      <p>告诉系统「几点跑什么」——这叫<em>定时任务</em>。</p>
      <p>Linux / macOS 上叫 <em>cron</em>，Windows 上叫"计划任务"。</p>
    ` },
  ],
  children: [],
};

const node_pkg = {
  id: "pkg",
  emoji: "📦",
  title: "包管理器",
  concept: { name: "包管理器", explain: "装别人写好的代码库的工具。" },
  pages: [
    { html: `
      <p>想抓网页？读 Excel？解析 PDF？发邮件？</p>
      <p>别人写过的代码（叫"包"或"库"）一行命令装上就能用。</p>
      <p>装它们的工具叫<em>包管理器</em>——<em>Python</em> 用 <em>pip</em>、<em>Node.js</em> 用 <em>npm</em>。</p>
    ` },
  ],
  children: [node_cron],
};

const node_python = {
  id: "python",
  emoji: "🅿️",
  title: "Python",
  concept: { name: "Python", explain: "写脚本和数据处理最常用的语言。" },
  pages: [
    { html: `
      <p>想做爬虫、数据分析、训练 AI、写自动化小工具？</p>
      <p><em>Python</em> 是这些用得最多的语言。</p>
      <p>语法接近英文，几行就跑通——常被推荐当"第一门编程语言"。</p>
    ` },
  ],
  children: [node_pkg],
};

const node_script = {
  id: "script",
  emoji: "📜",
  title: "脚本",
  concept: { name: "脚本", explain: "一段写好后可以反复跑的代码。" },
  pages: [
    { html: `
      <p>想让一段代码反复跑——批量处理文件、每天处理一次、写个 bot？</p>
      <p>这种代码叫<em>脚本</em>。</p>
      <p>不用安装，保存成 .py / .js / .sh 就能跑。</p>
    ` },
  ],
  children: [node_python],
};

const node_where_cli = {
  id: "where-cli",
  emoji: "⌨️",
  title: "在命令行里跑",
  concept: { name: "命令行", explain: "靠敲文字命令做事的黑窗口。" },
  pages: [
    { html: `
      <p>做"只给自己用"的小工具？批量处理文件？写个 bot？</p>
      <p><em>命令行</em>（黑窗口、敲文字命令）这条路上手最快，几行代码就跑。</p>
      <p>Mac / Linux 上叫 Terminal，Windows 上叫 cmd / PowerShell。</p>
    ` },
  ],
  children: [node_script],
};

// ====== 服务分支链 ======

const node_deploy_server = {
  id: "deploy-server",
  emoji: "🚀",
  title: "部署",
  concept: { name: "部署（服务端）", explain: "把服务程序传到服务器上一直跑。" },
  pages: [
    { html: `
      <p>想让你的 bot / API / 后端服务 24 小时不停？挂了能自动重启？</p>
      <p>把服务搬到服务器上让它一直跑——这一步叫<em>部署</em>。</p>
      <p>省心的：<em>Railway</em>、<em>Render</em>、<em>Fly.io</em>——绑 GitHub 自动部署。</p>
    ` },
  ],
  children: [{ ref: "shared-server" }, node_backup_monitor],
};

const node_webhook = {
  id: "webhook",
  emoji: "🪝",
  title: "Webhook / 别人主动通知你",
  lightbulb: true,
  concept: { name: "Webhook / 反向接口", explain: "对方有事发生时主动 POST 一个请求来告诉你，不用你一直去问对方「有没有动静」。" },
  pages: [
    { html: `
      <p>普通 API：你问对方"有新数据吗" → 对方回。频繁问浪费两边资源。</p>
      <p><em>Webhook</em>（反向 webhook）：对方有事发生时主动 POST 一个请求到你提供的网址，告诉你"刚发生了 X"——你被动接收，不用反复问。</p>
      <p>例子：</p>
      <ul>
        <li>Stripe 支付：用户付完钱 → Stripe POST 到你的 <em>/webhook/stripe</em> → 你的服务器才知道"这笔订单已付"</li>
        <li>GitHub：仓库有人推代码 → GitHub POST 到你的 <em>/webhook/github</em> → 你触发自动部署</li>
        <li>飞书 / 钉钉 bot：群里 @ 你的 bot → 平台 POST 给你 → 你回消息</li>
      </ul>
      <p>实现：自己服务上提供一个 <em>POST 接口</em>，把网址填到对方平台的"Webhook URL"设置里，再 + <em>signature 验签</em>防伪造。</p>
    ` },
  ],
  children: [],
};

const node_api_http_server = {
  id: "api-http-server",
  emoji: "🔌",
  title: "API / HTTP",
  concept: { name: "API / HTTP（服务端）", explain: "你的服务对外开放的接口 + 底层对话协议。" },
  pages: [
    { html: `
      <p>想让别人能调用你的服务（比如做个公开的 AI API、Webhook 接收器）？</p>
      <p>你按定好的格式接收请求 + 按格式回——这组接口叫 <em>API</em>，底下用 <em>HTTP</em>。</p>
      <p>要想：谁能调（鉴权）、调多频繁（限流）、出错怎么回（错误码）。</p>
    ` },
  ],
  children: [node_deploy_server, node_webhook],
};

const node_oauth = {
  id: "oauth",
  emoji: "🌐",
  title: "OAuth / 第三方登录",
  lightbulb: true,
  concept: { name: "OAuth / 用别家账号登录", explain: "让用户用微信 / Google / GitHub 账号登录你的产品——你不存密码，安全又省事。" },
  pages: [
    { html: `
      <p>做产品不想自己管"注册 / 改密码 / 找回密码"这套？让用户用现成的微信 / Google 账号登录就行——这套机制叫 <em>OAuth</em>。</p>
      <p>流程（用户视角）：</p>
      <ul>
        <li>① 用户点"用微信登录"</li>
        <li>② 跳到微信授权页"是否允许 X 应用获取你的昵称头像"</li>
        <li>③ 用户同意 → 跳回你的产品，自动登录</li>
      </ul>
      <p>你拿到什么：用户的微信 <em>openid</em>（唯一标识）+ 昵称 + 头像。<strong>拿不到</strong>密码（在微信那边，你看不到）。</p>
      <p>实现：用现成方案省 95% 工作量——<em>Supabase Auth</em> / <em>Clerk</em> / <em>Auth0</em> / <em>NextAuth</em> 都直接配几行接好微信 / Google / Apple / GitHub。</p>
      <p>注意：第三方平台都要先注册"开发者应用"拿 <em>client_id / client_secret</em>，按平台规则审核才能上线（微信尤其严）。</p>
    ` },
  ],
  children: [],
};

const node_auth_server = {
  id: "auth-server",
  emoji: "🔐",
  title: "登录",
  concept: { name: "认证 / 授权", explain: "认证验证你是谁，授权决定你能干什么。" },
  pages: [
    { html: `
      <p>想让用户登录后才能用你的服务？</p>
      <p><em>认证</em>：验证你是谁（密码、短信验证码、第三方登录）。</p>
      <p><em>授权</em>：决定你能干什么（管理员 / 普通用户）。</p>
      <p>用 <em>Supabase Auth</em> / <em>Clerk</em> / <em>Auth0</em> 接现成更稳。</p>
    ` },
  ],
  children: [node_api_http_server, node_oauth],
};

const node_database_server = {
  id: "database-server",
  emoji: "🗃️",
  title: "数据库",
  concept: { name: "数据库", explain: "专门存数据、能快速找到的程序。" },
  pages: [
    { html: `
      <p>服务要保存账号、订单、签到记录、爬到的内容？</p>
      <p>用 txt 文件存太慢——百万条数据找一条要扫一遍。</p>
      <p>专门干这个的程序叫<em>数据库</em>——<em>SQLite</em>、<em>MySQL</em>、<em>PostgreSQL</em>。</p>
    ` },
  ],
  children: [node_auth_server],
};

const node_where_server = {
  id: "where-server",
  emoji: "☁️",
  title: "长期挂着自己跑",
  concept: { name: "后台服务", explain: "没界面、24 小时跑在服务器上的程序。" },
  pages: [
    { html: `
      <p>想做 Discord 机器人？AI 套壳后端？定时签到？爬虫一直跑？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🤖</span>
        <span class="ei-label">bot</span>
        <span class="ei-emoji">⏰</span>
        <span class="ei-label">签到</span>
        <span class="ei-emoji">🧬</span>
        <span class="ei-label">爬虫</span>
        <span class="ei-emoji">🧠</span>
        <span class="ei-label">AI 后端</span>
      </div>
      <p>没有用户界面、自己在服务器上一直跑的程序，叫<em>后台服务</em>。</p>
      <p>用户不直接看到它，但它一直在工作。</p>
    ` },
  ],
  children: [node_database_server, node_product_types, node_big_arch],
};

// ====== 硬件分支链 ======

const node_iot = {
  id: "iot",
  emoji: "🛰️",
  title: "物联网",
  concept: { name: "物联网", explain: "让小硬件能联网——往云端发数据 / 接收命令。" },
  pages: [
    { html: `
      <p>想用手机控制家里的灯？想看到家里温度？让你做的硬件接收远程命令？</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span>
        <span class="ei-arrow">📶</span>
        <span class="ei-emoji">☁️</span>
        <span class="ei-arrow">📶</span>
        <span class="ei-emoji">💡</span>
        <span class="ei-label">远程开灯</span>
      </div>
      <p>硬件接 Wi-Fi / 蓝牙后能联网——这叫<em>物联网</em>（英文 IoT）。</p>
      <p>做物联网最方便的板子：<em>ESP32</em>（自带 Wi-Fi，几十块）。</p>
    ` },
  ],
  children: [],
};

const node_sensor = {
  id: "sensor",
  emoji: "🌡️",
  title: "传感器 / 执行器",
  concept: { name: "传感器 / 执行器", explain: "传感器读环境，执行器做动作。" },
  pages: [
    { html: `
      <p>想做"温度超过 28 度就开风扇"、"有人靠近就亮灯"这种？</p>
      <p>核心循环：</p>
      <div class="loop-flow">
        <div class="flow-step"><span class="flow-emoji">📡</span><span class="flow-name">传感器</span><span class="flow-role">读</span></div>
        <span class="flow-op">→</span>
        <div class="flow-step"><span class="flow-emoji">🧠</span><span class="flow-name">代码</span><span class="flow-role">判断</span></div>
        <span class="flow-op">→</span>
        <div class="flow-step"><span class="flow-emoji">💡</span><span class="flow-name">执行器</span><span class="flow-role">做</span></div>
      </div>
      <p><em>传感器</em>：读温度、湿度、距离、光、动作。</p>
      <p><em>执行器</em>：点灯、转马达、发声。</p>
    ` },
  ],
  children: [node_iot],
};

const node_board = {
  id: "board",
  emoji: "🔲",
  title: "开发板",
  concept: { name: "开发板", explain: "带芯片和接口的小板子。" },
  pages: [
    { html: `
      <p>做硬件项目，你需要一块带芯片和接口的板子——叫<em>开发板</em>。</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span>
        <span class="ei-arrow">📤</span>
        <span class="ei-emoji">🔲</span>
        <span class="ei-label">代码烧进板子</span>
      </div>
      <p>写好代码用一根线连到电脑、把代码"烧"到板子上——板子自己就能跑。</p>
      <p>三种常用：<em>Arduino</em>（几十块，最入门）、<em>树莓派</em>（小型 Linux 电脑，能跑完整程序）、<em>ESP32</em>（自带 Wi-Fi，做物联网最方便）。</p>
    ` },
  ],
  children: [node_sensor],
};

const node_where_hardware = {
  id: "where-hardware",
  emoji: "🔌",
  title: "做真实的硬件",
  concept: { name: "嵌入式 / IoT", explain: "代码跑在小芯片上控制实物。" },
  pages: [
    { html: `
      <p>想做智能家居？温度计盒子？传感器项目？小机器人？</p>
      <p>代码跑在巴掌大的小芯片上控制电、灯、马达、传感器——这类项目叫<em>嵌入式</em>。</p>
      <p>联网之后叫<em>物联网</em>（IoT）。</p>
      <p>跟纯软件最大差别：要焊电路、烧固件，改一次成本高。</p>
    ` },
  ],
  children: [node_board],
};

// ============================================================
// 平台分支：基础链 + 工具链走完后，到这里挑平台
// 包含 6 个 where-* 主选项 + 多端 / 语言细分灯泡支线
// ============================================================

const node_cross_platform = {
  id: "cross-platform",
  emoji: "🔄",
  title: "想一次跑多个平台？",
  lightbulb: true,
  concept: { name: "多端 / 跨平台", explain: "同一份代码同时跑在浏览器 / iOS / Android / 桌面——叫多端 / 跨平台。" },
  pages: [
    { html: `
      <p>想做的东西不是只跑一个地方——浏览器 / iOS / Android / 桌面同时都要？</p>
      <p>这叫<em>多端</em>（也叫<em>跨平台</em>）。常见做法：</p>
      <ul>
        <li><em>React Native</em> / <em>Flutter</em>：一套代码同时出 iOS + Android App</li>
        <li><em>Electron</em> / <em>Tauri</em>：把网页代码包成 Windows / Mac 桌面 App</li>
        <li><em>响应式网页</em>：一份 HTML/CSS 自动适配电脑 + 手机浏览器</li>
        <li><em>uni-app</em> / <em>Taro</em>：一套代码出微信小程序 + App + H5 网页</li>
      </ul>
      <p>代价：每个平台都有自己的细节差异，跨平台框架能抹平 80-90%，剩下还是要分别处理。</p>
      <p>vibecoder 起步建议：先挑一个最重要的平台做，做完了再考虑要不要多端。</p>
    ` },
  ],
  children: [],
};

const node_lang_choice = {
  id: "lang-choice",
  emoji: "🔤",
  title: "用什么编程语言？",
  lightbulb: true,
  concept: { name: "编程语言选择", explain: "不同平台 / 不同用途适合不同语言——按要做的东西挑。" },
  pages: [
    { html: `
      <p>挑语言不是看"哪个好"——是看"做的东西适合用哪个"。</p>
      <ul>
        <li><em>JavaScript</em> / <em>TypeScript</em>：网页前端 / 跨平台 App / Node 后端——覆盖最广</li>
        <li><em>Python</em>：脚本 / 爬虫 / AI / 数据分析——非软件人最好上手</li>
        <li><em>Swift</em>：iOS / Mac 原生 App 专用</li>
        <li><em>Kotlin</em>：Android 原生 App 专用</li>
        <li><em>C / C++</em>：嵌入式硬件 / 性能要求极高的场景</li>
        <li><em>Go</em> / <em>Rust</em>：后端服务 / 系统编程 / 性能 + 安全</li>
        <li><em>Solidity</em>：写智能合约（区块链）专用</li>
      </ul>
      <p>vibecoder 起步推荐两个：</p>
      <ul>
        <li>想做网页 / App / 桌面：<em>JavaScript</em>（一套语言通吃前后端 + 多端）</li>
        <li>想做脚本 / 数据 / AI 工具：<em>Python</em>（语法最像人话）</li>
      </ul>
    ` },
  ],
  children: [],
};

const node_platform_pick = {
  id: "platform-pick",
  emoji: "🎯",
  title: "挑平台开始做",
  concept: { name: "平台选择", explain: "你的东西最后要让用户在哪里用——浏览器 / 电脑 / 手机 / 命令行 / 服务器 / 硬件。" },
  pages: [
    { html: `
      <p>基础 + 工具搞清楚了。现在想一想：</p>
      <p><strong>你要做的东西，最后是给用户跑在哪里？</strong></p>
      <div class="emoji-illust">
        <span class="ei-emoji">🌐</span><span class="ei-label">网页</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">💻</span><span class="ei-label">桌面</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">📱</span><span class="ei-label">手机</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">⌨️</span><span class="ei-label">命令行</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">☁️</span><span class="ei-label">服务器</span>
        <span class="ei-arrow">/</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">硬件</span>
      </div>
      <p>不同平台 → 用的<em>编程语言</em>、<em>框架</em>、<em>部署方式</em>都不一样。挑一个开始走。</p>
      <p>实在不确定？看灯泡支线「想一次跑多个平台？」+「用什么编程语言？」帮你定。</p>
    ` },
  ],
  children: [
    node_where_web,
    node_where_desktop,
    node_where_mobile,
    node_where_cli,
    node_where_server,
    node_where_hardware,
    node_cross_platform,
    node_lang_choice,
  ],
};

// ====== 术语解释表 ======
const TERM_GLOSSARY = {
  // ---- 基础代码概念 ----
  "代码": "一段写给电脑的指令——告诉它做什么、什么时候做、怎么做。",
  "变量": "给一个值取个名字——之后能用名字代替这个值。",
  "函数": "一段写好后取了名字、可以反复调用的代码。给输入吐输出。",
  "function": "函数（function）：一段可重复调用的代码。",
  "参数": "传给函数的输入。英文 parameter / argument。",
  "parameter": "参数：函数定义时占的位子。",
  "argument": "参数：函数调用时实际传进去的值。",
  "返回值": "函数算完吐出来的结果。英文 return value。",
  "return value": "函数算完吐出来的结果。",
  "数据类型": "数据的种类——字符串 / 数字 / 布尔 / 数组 / 对象 / null。",
  "字符串": "文字（用引号包），如 \"hello\"。英文 string。",
  "string": "字符串：一段文字。",
  "数字": "数值类型，如 123、3.14。英文 number。",
  "number": "数字：数值类型。",
  "布尔": "只能是 true 或 false 的类型。英文 boolean。",
  "boolean": "布尔：只能 true / false 的类型。",
  "true": "布尔值「真」。",
  "false": "布尔值「假」。",
  "数组": "一串按顺序排好的东西，如 [1, 2, 3]。英文 array。",
  "array": "数组：一串按顺序排好的元素。",
  "对象": "一组带标签的属性，如 { name: \"小明\", age: 10 }。英文 object。",
  "object": "对象：一组带标签的属性。",
  "null": "表示「没值 / 空」。",
  "undefined": "表示「还没赋值」，比 null 更常见。",
  "条件": "如果 X 就做 A 否则做 B。英文 if / else。",
  "if": "条件判断关键字——如果 X 就做 A。",
  "else": "条件判断的「否则」分支。",
  "循环": "反复跑同一段代码。英文 for / while。",
  "for": "for 循环：知道要跑几次。",
  "while": "while 循环：跑到某条件不成立为止。",
  "报错": "程序出错弹的红字——含错误类型、文件名、行号。英文 error。",
  "error": "报错——程序出错时的红字提示。",
  "bug": "程序里没修好的错误。",
  "调试": "找出 bug 原因并修好。英文 debug。",
  "debug": "调试——找出 bug 并修好的过程。",
  "TypeError": "类型错——你把数字当函数调、或者别的类型错配。",
  "ReferenceError": "引用错——变量没定义就用。",
  "SyntaxError": "语法错——括号没配对、漏分号之类。",
  "undefined is not a function": "这个名字写得像函数其实啥都不是（值是 undefined）。",
  "Cannot read property X of undefined": "对着空的东西取属性——常是 API 没返回正确数据。",
  "console.log": "JavaScript 里打印一行字到控制台的命令。最常用 debug 工具。",
  "print": "Python 里打印一行字的命令。",
  "F12": "浏览器里打开开发者工具的快捷键（Windows）。",
  "Cmd+Option+I": "浏览器里打开开发者工具的快捷键（Mac）。",
  // ---- 栈 / 内存 / OOP ----
  "栈": "内存里放当前正在跑的函数 + 局部变量的区。英文 stack。",
  "stack": "栈——放当前正在跑的函数 + 局部变量。",
  "堆": "内存里放比较大 / 大小不定的东西（数组 / 对象）的区。英文 heap。",
  "heap": "堆——放大对象的内存区。",
  "栈溢出": "函数互相调用太深，把栈塞满了。英文 stack overflow。",
  "stack overflow": "栈溢出——函数调用太深栈塞满。",
  "内存泄漏": "用过的内存没释放，越占越多。英文 memory leak。",
  "memory leak": "内存泄漏——用过的内存没释放。",
  "调用栈": "报错里那串「哪个函数被哪个函数调用」的轨迹。英文 call stack。",
  "call stack": "调用栈——函数调用层级轨迹。",
  "类": "写「这一类东西都长什么样、能做什么」的模板。英文 class。",
  "class": "类——一类东西的模板。",
  "实例": "按模板（类）造出来的具体一个。英文 instance。",
  "instance": "实例——按类造出来的具体一个。",
  "属性": "实例身上的数据（用户的名字、年龄）。英文 property。",
  "property": "属性——实例身上的数据。",
  "方法": "实例能做的动作（用户.下单()）。英文 method。",
  "method": "方法——实例能做的动作。",
  "继承": "一个类基于另一个类扩展（管理员基于用户加东西）。英文 inherit。",
  "inherit": "继承——一个类基于另一个类扩展。",
  "OOP": "面向对象编程，Object-Oriented Programming。把代码组织成类和对象。",
  // ---- HTML / CSS / JS ----
  "HTML": "一种标记语言。写网页骨架——决定页面里有什么（标题、按钮、图、输入框）。",
  "CSS": "一种样式语言。写网页外观——决定颜色、字体、大小、布局。",
  "JavaScript": "浏览器里能跑的编程语言。写网页逻辑——决定怎么响应、怎么动。",
  "JS": "JavaScript 的简称。",
  "浏览器": "运行网页的程序——Chrome、Safari、Edge 都是。",
  "前端": "用户能看到、能点的部分。跑在用户的浏览器里。",
  "后端": "用户看不到的部分。跑在你的服务器上，负责存数据、验证账号、收钱。",
  "API": "两个程序之间「互相通话」的标准格式——你按对方写好的格式发请求，对方按格式回。调 GPT / 调微信 / 查天气都是按对方的 API 发请求。",
  "HTTP": "浏览器和服务器之间对话用的协议。网址前的 http:// 就是它。",
  // ---- JSON / 请求方法 / 状态码 ----
  "JSON": "网络上传数据最常用的格式：大括号 + 键值对 + 引号包字符串。",
  "GET": "HTTP 请求方法——查数据（拿天气、读列表）。",
  "POST": "HTTP 请求方法——发新数据（提交表单）。",
  "PUT": "HTTP 请求方法——改已有数据（整体替换）。",
  "PATCH": "HTTP 请求方法——改已有数据（部分修改）。",
  "DELETE": "HTTP 请求方法——删数据。",
  "状态码": "HTTP 回应的「成不成功」暗号——200 成功、404 找不到、500 服务器崩。",
  "status code": "状态码——HTTP 回应的成败暗号。",
  "200": "状态码 200：请求成功。",
  "301": "状态码 301：永久跳转去别的网址。",
  "302": "状态码 302：临时跳转。",
  "400": "状态码 400：你发的内容有问题。",
  "401": "状态码 401：你没登录 / 没权限。",
  "403": "状态码 403：知道你是谁但不让你做这事。",
  "404": "状态码 404：找不到（网址错了或东西删了）。",
  "429": "状态码 429：你调太频繁、被限流了。",
  "500": "状态码 500：服务器自己崩了。",
  // ---- 数据库 ----
  "数据库": "专门存数据、能快速查找的程序。",
  "SQLite": "最简单的数据库。一个文件即数据库，适合小项目。",
  "MySQL": "开源主流数据库。多人同时读写、正经服务器用。",
  "PostgreSQL": "开源主流数据库。功能丰富、稳定。",
  "Redis": "极快的内存数据库，常做缓存。",
  "Memcached": "纯内存缓存系统，比 Redis 更轻量。",
  // ---- 认证 / 部署 / 网址 ----
  "认证": "验证你是谁——密码、短信验证码、第三方登录都是。英文 Authentication。",
  "授权": "决定你能干什么——管理员 / 普通用户的权限。英文 Authorization。",
  "Supabase Auth": "现成的认证服务，免费起步。",
  "Clerk": "现成的认证服务，体验好但贵。",
  "Auth0": "老牌认证服务。",
  "部署": "把你的程序传到服务器上让别人能访问。",
  "服务器": "一台一直开着、连着公网的电脑。你的程序跑上去 24 小时不停。",
  "Cloudflare Pages": "免费静态网页部署服务。绑 GitHub 自动部署。",
  "Vercel": "免费网页部署服务。Next.js 官方推荐。",
  "Netlify": "免费网页部署服务。",
  "Railway": "服务程序部署平台。绑 GitHub 自动部署。",
  "Render": "服务程序部署平台。",
  "Fly.io": "服务程序部署平台。",
  "IP": "每台联网电脑的真实编号（像 142.250.4.100）。",
  "域名": "给人记的名字（example.com、bilibili.com）。",
  "DNS": "把域名翻成 IP 的电话本。",
  // ---- localhost / 端口 ----
  "localhost": "就是「你这台电脑自己」——等价于 127.0.0.1。只有你本机能访问。",
  "127.0.0.1": "指向本机的特殊 IP，等价于 localhost。",
  "端口": "程序在网络上的「门牌号」。一台电脑能同时跑很多程序、每个占一个端口。英文 port。",
  "port": "端口——程序在网络上的门牌号。",
  "ngrok": "把本机端口暴露成公网网址的工具，临时分享 demo 用。",
  "Cloudflare Tunnel": "把本机端口暴露成公网网址的工具，Cloudflare 出的。",
  "防火墙": "网络上拦截不该进来 / 不该出去的连接的程序。英文 firewall。",
  "firewall": "防火墙——网络层的访问控制。",
  // ---- 环境变量 / API key ----
  "API key": "调用第三方服务（GPT、支付）的钥匙。一长串字符。绝对不能写代码里上传 GitHub。",
  "secret": "密钥——和 API key 同义，要保密的凭证。",
  "环境变量": "操作系统级别的变量，程序启动时能读到。常用来放 API key。英文 environment variable。",
  "environment variable": "环境变量——操作系统级别的变量。",
  ".env": "项目根目录放环境变量的文件，写 KEY=VALUE 一行一个。绝对不能上传 GitHub。",
  ".gitignore": "告诉 Git 哪些文件别上传 GitHub 的清单。",
  // ---- 前端框架 ----
  "前端框架": "帮你管页面状态、拆组件的工具。",
  "React": "Meta 做的前端框架。最流行。",
  "Vue": "华人 Evan You 做的前端框架。简单易上手。",
  "Svelte": "轻量新秀前端框架。",
  // ---- 桌面 / 移动 / 命令行 ----
  "桌面应用": "用户在电脑上双击图标就打开的程序——Word、QQ、剪映。",
  "操作系统": "管硬件、给程序提供运行环境的那一层。",
  "Windows": "微软的操作系统。大部分 PC 用。",
  "macOS": "苹果电脑的操作系统。",
  "Linux": "免费开源的操作系统。服务器和开发者用得多。",
  "编译": "把代码翻译成机器能跑的可执行文件（.exe / .app）。",
  "Electron": "把网页代码包成桌面 App 的工具。VS Code / Slack / Discord 都是用它做的。",
  "Tauri": "把网页代码包成桌面 App 的轻量工具。用系统自带浏览器内核，体积比 Electron 小。",
  "iOS": "苹果手机的操作系统。",
  "Android": "其他厂手机的操作系统（小米、华为、三星、Pixel）。",
  "原生开发": "针对单一系统单独写——iOS 用 Swift、Android 用 Kotlin。",
  "Swift": "iOS 主力开发语言。苹果做的。",
  "Kotlin": "Android 主力开发语言。",
  "跨平台": "一份代码生成 iOS 和 Android 两端 App。",
  "Flutter": "Google 做的跨平台 App 工具。用 Dart 语言。",
  "React Native": "用 JavaScript 写跨平台 App 的工具。",
  "应用商店": "手机 App 必须通过的分发门。",
  "App Store": "苹果的应用商店。$99 / 年 + 审核。",
  "Google Play": "安卓的国际应用商店。",
  "命令行": "黑窗口，靠敲文字命令做事。Terminal、cmd、PowerShell 都是。",
  "脚本": "一段写好后可以反复跑的代码。.py / .js / .sh 文件。",
  "Python": "写脚本和数据处理最常用的语言。语法接近英文。",
  "Node.js": "在电脑 / 服务器上跑 JavaScript 的环境。",
  // ---- 终端 / 命令 ----
  "终端": "电脑里那个黑窗口，敲文字命令做事。英文 terminal。",
  "terminal": "终端——敲文字命令的黑窗口。",
  "bash": "Linux / Mac 上最常见的 shell（终端解释器）。",
  "zsh": "Mac 默认 shell（macOS Catalina 后）。",
  "cmd": "Windows 老式终端。",
  "PowerShell": "Windows 现代终端，功能更强。",
  "shell": "终端里执行命令的解释器（bash / zsh / PowerShell 都是 shell）。",
  "cd": "终端命令：进入某个文件夹（change directory）。",
  "ls": "终端命令：列出当前目录文件（Linux / Mac）。Windows 是 dir。",
  // ---- 包管理 ----
  "包管理器": "装别人写好的代码库的工具。",
  "pip": "Python 的包管理器。",
  "npm": "Node.js 的包管理器。",
  "依赖": "项目用到的别人写的代码包。",
  "npm install": "终端命令：按 package.json 装齐所有依赖。",
  "pip install": "终端命令：装 Python 包。",
  "node_modules": "npm 装好的所有包堆放的文件夹。几百兆正常。不上传 GitHub。",
  "package.json": "项目根目录文件，记录用了哪些依赖、什么版本。",
  "requirements.txt": "Python 项目记录依赖的文件。",
  "semver": "语义化版本号（Semantic Versioning）：大版本.小版本.修复版本。",
  // ---- Git / GitHub ----
  "Git": "代码的存档系统。记下每次改了什么，能随时回退。",
  "commit": "Git 操作：存一档 + 写注释说改了啥。",
  "add": "Git 操作：选哪些改动要进下一个 commit。",
  "push": "Git 操作：把本地 commit 传到 GitHub。",
  "pull": "Git 操作：把 GitHub 上别人新的改动拉到本地。",
  "clone": "Git 操作：把整个仓库下到本地。",
  "branch": "分支：开一条独立线试新东西不影响主线。",
  "main": "Git 主分支的默认名字（2020 年后新仓库）。",
  "master": "Git 主分支的旧默认名字。",
  "merge": "合并：把一条分支的改动整合到另一条分支。",
  "PR": "Pull Request：让别人审你的改动决定合不合并。",
  "Pull Request": "PR：开源协作标配的代码审核机制。",
  "conflict": "冲突：你和别人改了同一行，Git 不知道选哪个，得你手动解决。",
  "GitHub": "存放代码项目的网站，全球最大。免费账号能传无限公开项目。",
  "repo": "仓库（repository）的简称。一个 Git 项目。",
  "GitLab": "类似 GitHub 的代码托管平台。可以自己搭。",
  "Gitee": "国内的代码托管平台。",
  "SSH": "Secure Shell——用一对密钥证明身份的协议。GitHub 上传代码常用。",
  "SSH key": "一对密钥（公钥贴 GitHub、私钥留本机），证明 push 的是你。",
  "token": "一长串字符当临时密码用。GitHub 不再支持密码 push 后用它。",
  // ---- AI 编辑器 / 助手 ----
  "VS Code": "微软出的免费代码编辑器。全宇宙最流行。",
  "IDE": "Integrated Development Environment——集成开发环境，比编辑器更全功能。",
  "Cursor": "基于 VS Code 改的、AI 深度集成的编辑器。vibe coding 首选。",
  "Windsurf": "和 Cursor 竞争的 AI 编辑器。",
  "Claude Code": "Anthropic 出的终端 AI 编程助手。能读改整个项目、跑命令、自己 debug。",
  "GitHub Copilot": "微软出的 AI 代码补全插件。",
  "Lovable": "网页里聊一句出 App 的 AI 工具。",
  "Bolt.new": "StackBlitz 出的网页版 vibe coding 工具。",
  "Replit Agent": "Replit 出的网页 IDE + AI 一条龙。",
  "v0": "Vercel 出的 AI 前端 UI 生成工具。",
  "Sublime Text": "老牌轻量代码编辑器。",
  "Vim": "极客向终端编辑器，键盘流。",
  "Emacs": "另一款极客向编辑器，扩展性极强。",
  "JetBrains": "出 IntelliJ / PyCharm / WebStorm 的公司，付费 IDE。",
  "IntelliJ": "Java 开发主力 IDE，JetBrains 出。",
  "PyCharm": "Python 开发主力 IDE，JetBrains 出。",
  "WebStorm": "前端开发 IDE，JetBrains 出。",
  "语法高亮": "编辑器把不同代码块上不同颜色让你看清结构。",
  "自动补全": "编辑器在你敲一半时弹出候选词。",
  "跳定义": "编辑器能跳到某变量 / 函数最初定义的位置。",
  // ---- LLM / Prompt ----
  "Prompt": "提示词——你给 AI 的那段指令。",
  "Context": "上下文——AI 一次能「看到」的所有内容。",
  "Token": "AI 把文字拆成的小块单位。API 按 token 收费。",
  "Context window": "AI 模型一次最多能容下多少 token。",
  "LLM": "大语言模型——会说话写字答问题的 AI 统称（Claude / ChatGPT / Gemini / DeepSeek 都是）。",
  "hallucination": "AI 一本正经编不存在的东西（函数名、库名、API）。",
  // ---- 浏览器扩展 / 小程序 / 游戏 ----
  "extension": "浏览器扩展——装在 Chrome / Edge 上的 mini 程序。",
  "浏览器扩展": "装在 Chrome / Edge 上能改任意网页的 mini 程序。",
  "Tampermonkey": "油猴——装在浏览器里跑用户自写脚本的扩展。",
  "油猴脚本": "一段加给某网站的 JS，不用上架商店。",
  "Chrome 商店": "Chrome 扩展的官方分发市场。开发者账号 $5 一次性。",
  "微信小程序": "跑在微信里、不用下载的程序。微信开放平台审核后发布。",
  "WXML": "微信小程序的「类 HTML」。",
  "WXSS": "微信小程序的「类 CSS」。",
  "支付宝小程序": "跑在支付宝里、和微信小程序类似。",
  "抖音小程序": "跑在抖音里的小程序。",
  "百度小程序": "跑在百度 App 里的小程序。",
  "Phaser": "JavaScript 写 2D Web 游戏的框架。",
  "PixiJS": "JavaScript 写 2D 渲染（含游戏）的库。",
  "Three.js": "JavaScript 写 3D Web 内容的库。",
  "Babylon.js": "JavaScript 写 3D Web 游戏的引擎。",
  "Unity": "全平台游戏引擎，C# 语言。独立游戏首选之一。",
  "Godot": "免费开源轻量游戏引擎。",
  "Unreal": "3A 级游戏引擎，画面顶级。Epic 出的。",
  // ---- 大型架构 ----
  "单体应用": "所有功能都装一个程序里。简单但难扩展。英文 monolith。",
  "monolith": "单体应用——所有功能装一个程序里。",
  "微服务": "把一个大系统拆成很多小程序、每个管一摊事（一个管用户、一个管订单、一个管支付），各自独立部署。一个挂了别的还活。",
  "microservice": "微服务——把大系统拆成很多小程序各管一摊。",
  "注册中心": "微服务的「通讯录」——每个服务报自己在哪，别人来查地址。英文 registry。",
  "registry": "注册中心——微服务的通讯录。",
  "服务发现": "几十个小服务跑在不同机器上时，互相找到对方「在哪台机器、哪个端口」的机制——靠一个公共「通讯录」（注册中心）。",
  "Consul": "HashiCorp 的注册中心。",
  "Nacos": "阿里出的注册中心 + 配置中心。",
  "Eureka": "Netflix 出的注册中心，Java 生态。",
  "etcd": "分布式 KV 存储，常做注册中心。Kubernetes 内部就用它。",
  "API gateway": "外面所有请求都先到的「前台」——它再分发给后面具体哪个服务来处理。中文叫网关。",
  "网关": "外面所有请求都先到的「前台」——它再分发给后面具体哪个服务来处理。顺便做「验登录、限流量、写日志」等。",
  "Nginx": "全球用得最多的「流量门卫」程序——接 Web 请求、转发给后端、把流量分摊到多台机器、缓存静态文件，一身多职。",
  "Kong": "基于 Nginx 的 API 网关。",
  "Spring Cloud Gateway": "Spring 生态的 API 网关。",
  "APISIX": "开源 API 网关，国内用得多。",
  "限流": "限制每秒最多接多少请求。英文 rate limit。防爬虫 / 防被刷爆。",
  "rate limit": "限流——限制单位时间请求量。",
  "熔断": "下游服务一直挂了就自动暂停调它——好比家里电路出毛病时跳闸，避免拖垮整栋楼。",
  "circuit breaker": "熔断的英文——好比家里跳闸，下游一直挂就自动暂停调它。",
  "降级": "核心服务挂了给用户返回兜底数据，不让整页崩。",
  "Sentinel": "阿里开源的限流熔断框架。",
  "Hystrix": "Netflix 出的熔断框架（已停止维护）。",
  "Resilience4j": "Java 生态的熔断库。",
  "缓存": "把热门数据先放内存里下次直接读，秒回。英文 cache。",
  "cache": "缓存——把热门数据放内存里。",
  "消息队列": "中间一个「任务排队仓库」——你做完事就把「通知」塞进去回头继续，后面有别的服务慢慢从仓库里拿走处理。下单后发短信 / 写积分 / 推送都靠它异步做。",
  "message queue": "消息队列——任务排队仓库，做完事丢通知进去，别的服务慢慢拿走处理。",
  "MQ": "消息队列（Message Queue）的缩写。",
  "解耦": "把强依赖的模块拆开，一方挂了不影响另一方。",
  "Kafka": "高吞吐量的分布式消息队列，LinkedIn 出的。",
  "RabbitMQ": "经典 AMQP 消息队列。",
  "RocketMQ": "阿里出的消息队列。",
  "NATS": "轻量高性能消息队列。",
  "分表": "数据多到一张表扛不住——按规则把一张大表拆成多张小表（比如按用户 ID 拆 16 张订单表）分散查询压力。",
  "sharding": "分表 / 分片——把数据拆成多块。",
  "分库": "数据多到一台数据库机器扛不住——把数据拆到几台不同的数据库机器上各装一部分。",
  "读写分离": "数据库分「主从」——写操作只去一台主库，读操作分散到几台从库（查数据远比写多）。读多写少的场景能扛更多。",
  "master": "主库——可读可写。",
  "slave": "从库——只读，数据从主库同步过来。",
  "replica": "副本——从库的别名。",
  "container": "容器——程序 + 运行依赖打包成的标准盒子，搬到任何机器都能跑。Docker 出品。",
  "容器": "把程序 + 它要的所有依赖打包成一个标准盒子，搬哪台机器都能跑。Docker 是最流行的容器工具。",
  "Docker": "把程序 + 它运行需要的所有东西打包成一个标准盒子的工具——彻底解决「在我电脑能跑、在你电脑跑不了」。最流行。",
  "image": "镜像——已经装好东西的容器盒子的「备份照片」，能复制无数份。你下载一次就能起 100 个一样的容器。",
  "镜像": "已经装好东西的容器盒子的「备份照片」——下载一次就能复制无数份用。",
  "Kubernetes": "管理几百几千个容器的工具——挂了自动重启、流量大自动加机器。简称 K8s。",
  "K8s": "Kubernetes 缩写（K 和 s 之间 8 个字母）。",
  "负载均衡": "一个入口把蜂拥而来的请求分摊给后面几台机器，每台干一部分——一台扛不住的事多台一起扛。",
  "load balancer": "负载均衡——把请求分摊给后面多台机器一起扛。",
  "反向代理": "用户访问的不是真实服务器，而是中间一道「前台」——前台再去问后面的真实服务器、把结果转回来。能藏真实地址 + 加缓存 + 做路由。",
  "reverse proxy": "反向代理——用户访问的是中间「前台」，前台再去问真实服务器拿结果。",
  "CDN": "把图片 / 视频 / 网页这些不变的文件提前分发到全球各地节点。你打开网页时从离你最近的节点拿——加载快、还省主服务器带宽。",
  "Cloudflare": "全球最大的 CDN + 安全防护服务商。",
  "七牛": "国内 CDN + 对象存储服务商。",
  "阿里云 CDN": "阿里云的 CDN 服务。",
  "tracing": "链路追踪——一次请求经过哪些服务、每段多久。",
  "链路追踪": "tracing——追踪请求在微服务之间的完整轨迹。",
  "Prometheus": "时序数据库 + 监控系统。CNCF 项目。",
  "Grafana": "可视化监控图表工具。配 Prometheus 用。",
  "ELK": "Elasticsearch + Logstash + Kibana 的组合，做日志聚合。",
  "Loki": "Grafana 出的轻量日志聚合系统。",
  "Jaeger": "开源链路追踪系统。",
  "SkyWalking": "国内主流链路追踪系统，Apache 项目。",
  // ---- 定时任务 / 后台 / 硬件 ----
  "定时任务": "操作系统的时间表——告诉它几点跑什么。",
  "cron": "Linux / macOS 的定时任务系统。",
  "后台服务": "没界面、24 小时跑在服务器上的程序——bot、爬虫、API 后端。",
  "嵌入式": "代码跑在小芯片上控制实物的项目。",
  "物联网": "让小硬件能联网——往云端发数据 / 接收命令。英文 IoT。",
  "IoT": "Internet of Things，物联网。",
  "开发板": "带芯片和接口的小板子。",
  "Arduino": "最入门的开发板，几十块。适合简单逻辑。",
  "树莓派": "巴掌大的小型 Linux 电脑，能跑完整程序。",
  "ESP32": "自带 Wi-Fi 的开发板，做物联网最方便。几十块。",
  "传感器": "读环境数据的硬件零件——温度、湿度、距离、光。",
  "执行器": "做动作的硬件零件——点灯、转马达、发声。",
  "example.com": "样例占位域名，被设计为永远不解析到真实网站。",
  // ---- 电商 / 交易 ----
  "SKU": "Stock Keeping Unit，一个具体规格的商品单元（同一件衣服 S 码红色和 M 码黑色是两个 SKU）。",
  "库存预占": "下单瞬间先把库存「锁住」，等付款再扣减——防止超卖。",
  "订单状态机": "订单走的「轨道」：待支付 → 已支付 → 已发货 → 已完成 / 已退款。",
  "支付回调": "用户付完钱后第三方支付（微信 / 支付宝 / Stripe）通知你系统「成功了」的请求。",
  "风控": "防止恶意行为的系统——薅羊毛、刷单、洗钱、欺诈。",
  "推荐引擎": "根据用户行为推它可能喜欢的商品 / 内容的系统。",
  // ---- 社交 / 内容 ----
  "关系链": "用户之间「关注 / 粉丝 / 好友」的关系数据。",
  "Feed 流": "微博 / 小红书首页那串「最新动态」列表。两种做法：要么发布时复制到所有粉丝的收件箱、要么粉丝刷新时去拉所有关注人最新发的。",
  "推送系统": "服务器主动把消息推给手机的系统（iOS 用 APNs / 安卓用 FCM）。",
  "内容审核": "过滤违规内容——敏感词 + AI 鉴黄鉴政 + 人工复审。",
  "推荐算法": "决定给你看什么的算法——记下你点过什么、停留多久、搜过什么，推它觉得你会喜欢的。抖音 / 小红书首页那种「猜你喜欢」就是它。",
  // ---- 视频 / 直播 ----
  "转码": "把一个视频文件转成多种清晰度 / 多种格式。",
  "HLS": "苹果出的流媒体协议，把视频切成 10 秒小片让浏览器逐片下载。",
  "DASH": "通用流媒体切片协议，和 HLS 类似但更开放。",
  "RTMP": "Real-Time Messaging Protocol——直播推流最常用的协议。",
  "WebRTC": "浏览器内的实时音视频通话技术。Google Meet / 腾讯会议都用。",
  "DRM": "Digital Rights Management——数字版权保护，防视频被下载盗版。",
  "弹幕系统": "万人同时发短消息漂屏幕上、还不能崩的系统。",
  // ---- 游戏后端 ----
  "匹配引擎": "按段位 / 延迟 / 等待时间凑齐对局玩家的系统。",
  "帧同步": "游戏同步方式：只同步玩家操作，各客户端按相同规则算出相同画面。MOBA 类常用。",
  "状态同步": "游戏同步方式：服务器是唯一仲裁，所有人按服务器发的状态渲染。射击 / MMO 常用。",
  "录像回放": "存下整局游戏的操作 / 状态序列、后续能完整重播。",
  "反外挂": "检测和封禁作弊行为——行为检测 + 内存校验 + 机器学习。",
  "虚拟经济": "游戏内的金币 / 钻石 / 商城系统——也是大公司游戏收入的核心。",
  "区服": "按地区分的游戏服务器组（国服 / 美服 / 亚服）。物理就近降低延迟。",
  // ---- 通讯 / IM ----
  "长连接": "手机和服务器之间一直保持着的连接——不是每次发消息都重新拨号。微信能秒收消息就靠它。",
  "WebSocket": "浏览器和服务器之间保持的「一直开着的电话线」——一方有话立刻能跟另一方说，不用每次新建连接。微信聊天、实时弹幕都用。",
  "TCP 长连": "比 WebSocket 更底层、原生 App 常用的长连接方式。",
  "消息存储": "用户离线时消息要存住，上线后推给他——不能丢。",
  "已读回执": "对方读了你消息的「已读」提示，要双方协议好。",
  "群聊": "万人群消息怎么扇出（一条消息复制 9999 份还不能慢）是技术难题。",
  "E2EE": "消息从你手机出去就加密、到对方手机才解密——中间所有服务器看到的都是乱码。哪怕黑客或运营商也拆不开。Signal / iMessage 这么干。",
  "端到端加密": "消息从发送方手机出去就加密、到接收方手机才解密——中间任何服务器都看不到内容。微信不是端到端加密、Signal 是。",
  // ---- SaaS / 协作 ----
  "多租户": "同一套软件部署一份，同时给好几家公司用，每家看到的数据严格隔离——SaaS 软件的基础。",
  "RBAC": "把用户分配一个「角色」（管理员 / 编辑 / 只读），给角色定权限——比给每个人单独定权限轻松 100 倍。",
  "SSO": "公司一套账号通用所有内部系统——员工一次登录就能用所有公司软件，不用每个系统记一个密码。",
  "SSO 单点登录": "公司一套账号通用所有内部系统——员工不用每个系统记一套密码、一次登录就走遍所有。",
  "SAML": "企业「一套账号通用所有系统」的老牌协议——大公司内部用得多。",
  "OIDC": "现代版「用第三方账号登录」的标准——你看到的「用 Google 账号登录」「用微信登录」按钮底下就是 OIDC。",
  "订阅计费": "按月 / 按年自动扣费、试用 / 升级 / 退订的系统。",
  "Stripe Billing": "Stripe 出的订阅计费 SaaS，省去自己写。",
  "Paddle": "类似 Stripe Billing 的订阅计费服务，专做软件订阅。",
  "审计日志": "记录「谁在什么时候做了什么」的不可改日志，合规需要。",
  "实时协同": "多人同时编辑一个文档不打架的能力——Figma / Notion / Google Docs 的核心。",
  "CRDT": "一种神奇的数据结构——好多人同时改一份文档时各改各的，最终无论谁先谁后总能合出一致的结果，不会撞。Figma / Notion 多人协作就是靠它。",
  "OT": "另一种「多人同时改不撞」的老算法，Google Docs 早期版本用。比 CRDT 更老。",
  // ---- AI 套壳 ----
  "LLM API": "调用大模型 AI 的接口——你的程序发一段话给 OpenAI / Anthropic / Google，对方算完把 AI 的回答返回给你。按字数收钱。",
  "Streaming": "AI 一边想一边把字一个一个吐出来给你看，不用等它全部想完才出现。ChatGPT 那种「打字机效果」就是 Streaming。",
  "流式输出": "AI 一边想一边把字一个个吐出来给你看——打字机效果。英文 Streaming。",
  "token 计费": "AI API 按「字数」收费——1 个中文字约算 1.5 个 token，1 个英文词约算 1.3 个 token。你发给 AI 的字 + AI 回的字都收钱。",
  "Embedding": "把一段文字算成一串数字（几百个），含义相近的文字算出来的数字串也相近——电脑用这套数字串就能比「哪两段意思接近」，做「按意思找相似内容」。",
  "向量数据库": "专门存「被算成数字串的文字」的数据库，能秒查「哪几段文字的含义最接近这一句」——AI 应用做「按意思搜内容」的标配。",
  "Pinecone": "云上向量数据库服务，AI 创业公司常用。",
  "Qdrant": "开源向量数据库，可以自己搭。",
  "Weaviate": "开源向量数据库，功能丰富。",
  "pgvector": "PostgreSQL 的向量扩展——已有 Postgres 直接加，不用单独搭。",
  "RAG": "让 AI 知道你公司私有资料的标准做法——把资料按段落收进一个特殊数据库，用户问问题时先找最相关的几段贴到 AI 的指令里再让它回答。AI 本来不知道你的内部资料，靠这套就知道了。",
  "Agent": "能自己规划任务、调用工具、走多步推理才把事情完成的 AI——不是「问一句答一句」，更像一个能动脑做事的小助手。",
  "Tool use": "让 AI 能调你写好的程序——比如 AI 想查天气，它告诉你「我要调 get_weather('北京')」，你跑完把结果交给它，它接着答用户。也叫 Function calling。",
  "Function calling": "AI 调你写的程序的能力——和 Tool use 是一回事，OpenAI 用这个叫法。",
  "Prompt 工程": "把给 AI 的指令写得更精准、让它更听话、办事更准的技巧——拆步骤、给例子、定输出格式、说清角色，都属于这个。",
  // ---- 数据 / BI ----
  "数据仓库": "专门给「运营 / 老板看数据看板」用的大型数据库，和业务数据库分开——做大型统计查询时不会拖慢用户用产品。",
  "BigQuery": "Google 出的云数据仓库，按查询量计费。",
  "ClickHouse": "开源列式数据库，做实时大数据分析极快。",
  "Snowflake": "云数据仓库平台，企业 BI 主流之一。",
  "ETL": "把业务数据「搬 + 清洗 + 装」到分析专用大库的标准流程。每天 / 每小时跑一遍，把线上业务库的数据更新到数据仓库里供老板看报表。",
  "ELT": "和 ETL 类似的「搬数据 + 装数据 + 清洗」流程，只是顺序不同：先把数据搬装进数据仓库，再用数据仓库自己的算力做清洗。云数仓时代主流做法。",
  "OLTP": "做日常业务用的数据库（用户登录、下单、发评论这种小而快的请求）——MySQL / PostgreSQL 都是这类。",
  "OLAP": "做大型统计分析用的数据库（「过去 90 天每天新增多少用户」这种聚合大查询）——BigQuery / ClickHouse 都是这类。",
  "数据看板": "公司高层 / 运营每天看的图表页面——指标 / 趋势 / 报警。",
  "Tableau": "经典商业 BI 工具，画图能力强。",
  "Metabase": "开源 BI 工具，免费起步。",
  "Superset": "Apache 出的开源 BI 工具。",
  "埋点": "在前端 / 后端代码里埋记录用户行为的代码（点了什么 / 看了多久 / 从哪进来的）。",
  "ECharts": "百度出的开源图表库，画图常用。",
  // ---- 通用补充 ----
  "分布式锁": "多台服务器同时操作同一资源时用的锁——常用 Redis 实现。",
  "幂等": "同一个操作做多次和做一次效果一样（重复支付不会扣两次钱）。",
  "服务发现": "几十个小服务跑在不同机器上时，互相找到对方「在哪台机器、哪个端口」的机制——靠一个公共「通讯录」（注册中心）。",
  "Webhook": "事情发生时对方主动通知你的「反向接口」。比如用户付钱后，Stripe 自动发一个请求告诉你「有人付了 50 块」——你不用一直去问它「付了没」。",
  // ---- 产品类后端能力（拆树后新增） ----
  "KYC": "Know Your Customer——金融行业的实名审核流程，证明你是真人 + 这账号是你 + 资金来源合法。",
  "HIPAA": "美国医疗隐私法。任何医疗 / 健康数据的存储、传输、共享都要满足这套规定，违规罚得很重。",
  "LBS": "Location-Based Service——基于位置的服务。地图 / 附近搜索 / 共享单车 / 打车都属于这类。",
  "路径规划": "从 A 点到 B 点算出最快路线的算法（含路况 / 红绿灯 / 限行）。高德 / 滴滴 / Google Maps 都靠它。",
  "司乘匹配": "叫车时把「附近的可用司机」和「等车的乘客」撮合到一起的算法。要平衡等待时间、距离、司机收益。",
  "ETA": "Estimated Time of Arrival——预计到达时间。骑手离我多久、车到机场多久、外卖几点送到。",
  "电子围栏": "在地图上画一个虚拟边界——设备 / 用户进入 / 离开就触发动作。共享单车判断「是不是停在禁停区」用它。",
  "GDS": "全球分销系统。机票 / 酒店行业的中央库存数据库——OTA 都是从这里查实时库存、改签退票也要回这里。",
  "简历解析": "用 OCR + NLP 模型从 PDF / Word 简历里抽出工作经历、技能、教育、地点等结构化字段。",
  "间隔重复": "Spaced Repetition——根据你对每个知识点的答对 / 答错记录，动态算「下次什么时候让你再复习」。多邻国 / Anki 的核心算法。",
  "IMAP": "邮箱客户端从服务器收信的协议。比 POP3 强：邮件留在服务器、多设备能同步状态。",
  "SMTP": "发邮件的协议——客户端把邮件交给发件服务器、服务器再投递给收件方。",
  "PageRank": "Google 早期排序算法的核心思路：一个网页被越多「高质量」网页链接到 → 它就越重要。",
  "智能合约": "部署在区块链上、按写好的规则自动执行的程序——没人能改、谁满足条件就自动转账 / 发 NFT。Solidity 写。",
  "Gas 费": "在区块链上做一笔交易要付的「算力费」——付给帮你验证 + 写区块的矿工 / 验证者，按这笔交易占的计算量算。",
  "Matter": "智能家居跨厂家协议（Apple + Google + 三星 + 小米合搞）——让不同品牌设备能互通。",
  "双向链接": "笔记 A 链到笔记 B 时，B 也自动显示「被 A 引用了」——Obsidian / Roam / 飞书文档都有。",
  "Markdown": "用 # / * / [] 这种符号写格式化文档的轻量标记语言。GitHub / Notion / Obsidian 都用。",
  "本地存储": "数据直接存在用户浏览器 / 手机上，不传服务器。番茄钟 / Todo 这类自用工具可以本地存就够。浏览器里常用 IndexedDB。",
  "IndexedDB": "浏览器内置的本地数据库——能存大量结构化数据，比 localStorage 强很多。",
};

// ====== root ======

const TREE_DATA = {
  id: "root",
  emoji: "💡",
  title: "我想做一个东西！",
  pages: [
    {
      html: `
        <p>不管你最后想做的东西跑在哪——<strong>先要懂一点代码本身 + 开发工具</strong>。</p>
        <p>这部分是<strong>所有路径的公共前置</strong>，走完会自动把你带到「挑平台」那一步。</p>
      `,
    },
  ],
  children: [
    node_basics_entry,
    { ref: "tools-entry", jump: true },
    { ref: "platform-pick", jump: true },
    { ref: "product-types", jump: true },
  ],
};

// ============================================================
// children 接续：基础链尾 → 工具入口；工具链尾 → 平台中转
// 用赋值是因为 platform_pick 在 npm 之后定义（forward reference）
// ============================================================
node_console_log.children = [node_tools_entry];
node_npm.children = [node_platform_pick];

// ============================================================
// PRODUCT_TYPES_SUBTREE
// node_product_types 的分支拆分：6 大方向 → 每个大类挂具体产品类节点。
// 每个产品类节点 1 页 ≤ 80 字 + 1 个互动 widget；叶子节点（children: []）。
// 之前 v12c 用单节点 11 页 + reveal-card 一次性倾倒 25 类的设计已废弃，
// 因为违反"每页只给一点点、按分支逐渐分类"原则（宝宝 v13 反馈）。
// ============================================================

// ---- 大类 1：消费交易类 ----

const node_pt_ecommerce = {
  id: "pt-ecommerce",
  emoji: "🛒",
  title: "电商 / 交易",
  concept: { name: "电商交易后端", explain: "卖货收钱型——淘宝 / 京东 / Shopify / Etsy。" },
  pages: [
    { html: `
      <p>卖货收钱型——淘宝 / 京东 / Shopify / Etsy。</p>
      <p><strong>整体结构</strong>（一个电商至少由这几块组成）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">订单 / 库存 / 商品库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💳</span><span class="ei-label">支付网关</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📦</span><span class="ei-label">物流接口</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔥</span><span class="ei-label">推荐引擎</span>
      </div>
      <p>四个最难搞的：① 库存不能超卖 ② 钱不能算错 / 丢单 ③ 满减 / 优惠券规则极复杂 ④ 物流要对接好几家。</p>
      <p>关键词：<em>SKU</em> / <em>库存预占</em> / <em>订单状态机</em> / <em>支付回调</em> / <em>风控</em>。</p>
      <div class="matching-game">
        <div class="match-hint">把「问题」连「对应技术」↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">同时下单怕超卖</div>
            <div class="match-item" data-match="B">订单要走多个阶段</div>
            <div class="match-item" data-match="C">付完钱要继续发货</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="C">支付回调</div>
            <div class="match-item" data-match="A">分布式锁 / 库存预占</div>
            <div class="match-item" data-match="B">订单状态机</div>
          </div>
        </div>
        <div class="match-done">✓</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_delivery = {
  id: "pt-delivery",
  emoji: "🍔",
  title: "外卖 / 物流",
  concept: { name: "外卖物流后端", explain: "实时调度型——美团 / 饿了么 / 顺丰 / DoorDash。" },
  pages: [
    { html: `
      <p>实时调度型——美团 / 饿了么 / 顺丰 / DoorDash。</p>
      <p><strong>整体结构</strong>（三方协同 + 实时调度）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">用户端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🛵</span><span class="ei-label">骑手端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🏪</span><span class="ei-label">商家端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API + 长连接</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🤖</span><span class="ei-label">调度算法</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🛰️</span><span class="ei-label">实时定位</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">订单库</span>
      </div>
      <p>关键词：<em>调度算法</em> / 骑手司机端<em>长连接</em> / <em>订单状态机</em> / 三方（用户-商家-骑手）协同 / <em>ETA</em> 预估 / 运力预测。</p>
      <div class="reveal-card">
        <div class="reveal-q">美团骑手怎么知道下一单接谁？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          后台<em>调度算法</em>实时算：每个骑手当前位置、手上几单、顺路系数、商家出餐时间——综合算出"派给谁送得最快"。订单状态更新通过长连接秒级推给骑手手机。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_travel = {
  id: "pt-travel",
  emoji: "🏨",
  title: "旅游 / 住宿",
  concept: { name: "旅游住宿后端", explain: "库存复杂型——携程 / Airbnb / Booking / 飞猪。" },
  pages: [
    { html: `
      <p>库存复杂型——携程 / Airbnb / Booking / 飞猪。</p>
      <p><strong>整体结构</strong>（平台是中间商，库存其实在航司 / 酒店那边）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">📅</span><span class="ei-label">库存日历</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🏨</span><span class="ei-label">航司 / 酒店 GDS</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💱</span><span class="ei-label">跨币种支付</span>
      </div>
      <p>关键词：库存日历（每日不同价 / 不同剩余）/ 动态定价 / 合作方 <em>GDS</em> 接口对接 / 跨币种支付 / 改签退款规则极复杂。</p>
      <div class="quiz-card">
        <div class="quiz-q">"为什么订完机票要改签很贵？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">系统懒得改</button>
          <button class="quiz-opt" type="button" data-correct="true">机票库存在航司 GDS 那边、改签要重新走他们的流程 + 退原座位</button>
          <button class="quiz-opt" type="button" data-correct="false">是 OTA 故意黑钱</button>
        </div>
        <div class="quiz-result">机票后面是航司 <em>GDS</em>（全球分销系统）——OTA 只是中间商，改签退票要走完一整圈跨系统流程。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_property = {
  id: "pt-property",
  emoji: "🏠",
  title: "房产 / 二手",
  concept: { name: "房产二手后端", explain: "本地交易型——链家 / 贝壳 / 闲鱼 / 转转 / 58 同城。" },
  pages: [
    { html: `
      <p>本地交易型——链家 / 贝壳 / 闲鱼 / 转转 / 58 同城。</p>
      <p><strong>整体结构</strong>（附近搜 + 撮合 + 防欺诈）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端（带定位）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗺️</span><span class="ei-label">地理索引库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💬</span><span class="ei-label">长聊系统</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🛡️</span><span class="ei-label">防欺诈风控</span>
      </div>
      <p>关键词：<em>LBS</em>（附近搜索）/ 长聊系统 / 估价模型 / 看房预约 / 二手交易闭环 / 防欺诈。</p>
      <div class="reveal-card">
        <div class="reveal-q">闲鱼怎么知道你附近有什么在卖？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          每个商品上架时带经纬度坐标存进<em>地理索引</em>（比如 PostgreSQL 的 PostGIS、Redis GEO）。你打开 App 时定位 → 索引秒查"距离你 5km 内的商品" → 按距离 / 时间 / 热度排序返回。这一类技术统称 <em>LBS</em>（基于位置的服务）。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_mobility = {
  id: "pt-mobility",
  emoji: "🚕",
  title: "出行 / 地图",
  concept: { name: "出行地图后端", explain: "实时位置型——滴滴 / Uber / 高德 / 共享单车。" },
  pages: [
    { html: `
      <p>实时位置型——滴滴 / Uber / 高德 / 共享单车。</p>
      <p><strong>整体结构</strong>（位置流不停上报 + 匹配 + 路径）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">乘客端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🚗</span><span class="ei-label">司机端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🛰️</span><span class="ei-label">实时位置服务</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🤖</span><span class="ei-label">司乘匹配</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗺️</span><span class="ei-label">地图 / 路径规划</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💳</span><span class="ei-label">支付</span>
      </div>
      <p>关键词：实时定位上报 / <em>路径规划</em> / 地图瓦片渲染 / <em>司乘匹配</em> / 动态调度 / <em>ETA</em> 预估 / 热力图 / <em>电子围栏</em>。</p>
      <div class="matching-game">
        <div class="match-hint">连一连 ↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">叫到车</div>
            <div class="match-item" data-match="B">导航最快路径</div>
            <div class="match-item" data-match="C">还共享单车判断在不在停车区</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="C">电子围栏</div>
            <div class="match-item" data-match="A">司乘匹配</div>
            <div class="match-item" data-match="B">路径规划</div>
          </div>
        </div>
        <div class="match-done">✓</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_consumer = {
  id: "pt-consumer",
  emoji: "🛍️",
  title: "消费 / 交易类",
  concept: { name: "消费交易类产品", explain: "面向消费者卖东西 / 提供本地服务的产品——共同点是订单 / 钱 / 物理世界对接。" },
  pages: [
    { html: `
      <p>面向消费者、有<strong>订单 + 钱 + 物理世界对接</strong>的产品都归这一类。</p>
      <p>共同特点：库存 / 状态机 / 支付 / 多方协同。</p>
      <p>选一个你最像的看 →</p>
    ` },
  ],
  children: [],
};

// ---- 大类 2：社交内容类 ----

const node_pt_social_feed = {
  id: "pt-social-feed",
  emoji: "💭",
  title: "社交 / 内容",
  concept: { name: "社交内容后端", explain: "关系链 + Feed 流型——微博 / 小红书 / 知乎 / Twitter。" },
  pages: [
    { html: `
      <p>关系链 + Feed 流型——微博 / 小红书 / 知乎 / Twitter / Threads。</p>
      <p><strong>整体结构</strong>（内容产生 → 审核 → 分发到每个粉丝）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">内容 / 关系库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📰</span><span class="ei-label">Feed 流系统</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🛡️</span><span class="ei-label">内容审核</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔥</span><span class="ei-label">推荐算法</span>
      </div>
      <p>关键词：<em>关系链</em>（关注 / 粉丝）/ <em>Feed 流</em>（写扩散 vs 读扩散）/ <em>推送系统</em> / <em>内容审核</em> / <em>推荐算法</em>。</p>
      <div class="quiz-card">
        <div class="quiz-q">"我刷小红书首页那些'猜你喜欢'是怎么来的？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">编辑手动挑的</button>
          <button class="quiz-opt" type="button" data-correct="true">推荐算法看你的点赞 / 停留 / 搜索算出来的</button>
          <button class="quiz-opt" type="button" data-correct="false">完全随机</button>
        </div>
        <div class="quiz-result"><em>推荐算法</em> + 用户画像 + 协同过滤。大平台都靠这个。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_im = {
  id: "pt-im",
  emoji: "📨",
  title: "通讯 / IM",
  concept: { name: "通讯 IM 后端", explain: "实时消息型——微信 / Discord / Slack / Telegram / 钉钉 / 飞书。" },
  pages: [
    { html: `
      <p>实时消息型——微信 / Discord / Slack / Telegram / 钉钉 / 飞书。</p>
      <p><strong>整体结构</strong>（手机和服务器之间始终一条不断的"水管"）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🌐</span><span class="ei-label">WebSocket 长连</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🖥️</span><span class="ei-label">消息网关</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">消息存储</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔔</span><span class="ei-label">推送服务</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📞</span><span class="ei-label">WebRTC（音视频）</span>
      </div>
      <p>关键词：<em>长连接</em> / <em>WebSocket</em> / 消息存储 / 已读回执 / 群聊扇出 / <em>E2EE</em>（端到端加密）/ <em>WebRTC</em>。</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么微信发一条消息能秒到？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          手机和服务器之间一直保持<em>长连接</em>（不是每次发消息才建连接）。你发消息推到服务器、服务器立刻把它推给对方那条长连接——一来一回毫秒级。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_video = {
  id: "pt-video",
  emoji: "🎬",
  title: "视频 / 直播 / 音频",
  concept: { name: "视频直播音频后端", explain: "大文件分发型——B 站 / 抖音 / YouTube / Twitch / Spotify。" },
  pages: [
    { html: `
      <p>大文件分发型——B 站 / 抖音 / YouTube / Twitch / Spotify / 播客。</p>
      <p><strong>整体结构</strong>（视频上传 → 转码 → CDN 全球分发）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📹</span><span class="ei-label">上传 / 推流</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🎞️</span><span class="ei-label">转码集群</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">💾</span><span class="ei-label">源站</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🌐</span><span class="ei-label">CDN 全球节点</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📱</span><span class="ei-label">观众前端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💬</span><span class="ei-label">弹幕系统</span>
      </div>
      <p>关键词：<em>CDN</em> / <em>转码</em> / <em>HLS</em> / <em>DASH</em>（点播协议）/ <em>RTMP</em>（直播推流）/ <em>WebRTC</em>（实时通话）/ <em>DRM</em> / <em>弹幕系统</em>。</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么全世界看 YouTube 几乎不卡？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          每个视频提前<em>转码</em>成几种清晰度（自动切换），然后 push 到全球 <em>CDN</em> 节点。你看的时候从最近的节点拿——延迟低 + 不占源站带宽。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_news = {
  id: "pt-news",
  emoji: "📰",
  title: "资讯 / 阅读",
  concept: { name: "资讯阅读后端", explain: "内容聚合型——Feedly / Pocket / 即刻 / Hacker News / RSS 类。" },
  pages: [
    { html: `
      <p>内容聚合型——Feedly / Pocket / 即刻 / Hacker News / RSS 类。</p>
      <p><strong>整体结构</strong>（一直爬别人 → 聚合 → 分发给你看）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🕸️</span><span class="ei-label">爬虫 / RSS 订阅器</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">内容聚合库</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔔</span><span class="ei-label">推送 / 稍后读</span>
      </div>
      <p>关键词：内容抓取（爬虫 + RSS 订阅）/ 聚合 / 推送通知 / 稍后阅读 / 智能分类 / 个性化排序。</p>
      <div class="quiz-card">
        <div class="quiz-q">"Feedly 怎么从几千个网站抓最新文章？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">编辑天天手动复制</button>
          <button class="quiz-opt" type="button" data-correct="true">订阅每个网站的 RSS / Atom 源，定时拉取 + 增量更新</button>
          <button class="quiz-opt" type="button" data-correct="false">用户自己上传</button>
        </div>
        <div class="quiz-result">RSS / Atom 是网站对外发布的"最新内容流"格式。聚合器订阅了之后就能自动拿到更新。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_social = {
  id: "pt-social",
  emoji: "💬",
  title: "社交 / 内容类",
  concept: { name: "社交内容类产品", explain: "围绕内容生产 / 关系链 / 实时消息的产品——共同点是 Feed 流 + 长连接 + 推荐算法。" },
  pages: [
    { html: `
      <p>围绕<strong>内容生产 + 关系链 + 实时通讯</strong>的产品都归这一类。</p>
      <p>共同特点：用户产生内容、需要分发 / 推送 / 推荐，常带实时性。</p>
      <p>选一个你最像的看 →</p>
    ` },
  ],
  children: [],
};

// ---- 大类 3：强体验类 ----

const node_pt_game = {
  id: "pt-game",
  emoji: "🎮",
  title: "游戏后端",
  concept: { name: "游戏后端", explain: "实时同步型——王者荣耀 / 原神 / CSGO / Fall Guys / Steam。" },
  pages: [
    { html: `
      <p>实时同步型——王者荣耀 / 原神 / CSGO / Fall Guys / Steam。</p>
      <p><strong>整体结构</strong>（客户端跟战斗服务器实时同步 + 账号经济独立）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🎮</span><span class="ei-label">游戏客户端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🌐</span><span class="ei-label">长连接</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🖥️</span><span class="ei-label">战斗服 / 区服</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🤖</span><span class="ei-label">匹配引擎</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">账号 / 装备库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🛡️</span><span class="ei-label">反外挂</span>
      </div>
      <p>关键词：匹配引擎 / <em>帧同步</em> vs <em>状态同步</em> / 录像回放 / 反外挂 / 虚拟经济 / <em>区服</em>。</p>
      <div class="reveal-card">
        <div class="reveal-q">两人 PK 时怎么保证你们看到的画面是一致的？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          两种打法：① <em>帧同步</em>——只同步玩家操作，各自客户端按相同规则算出相同画面（MOBA 常用）。② <em>状态同步</em>——服务器是唯一仲裁，所有人按服务器发的状态渲染（射击 / MMO 常用）。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_aigc = {
  id: "pt-aigc",
  emoji: "🎙️",
  title: "AIGC 生成",
  concept: { name: "AIGC 生成后端", explain: "重计算生成型——Suno / Runway / HeyGen / ElevenLabs / Midjourney。" },
  pages: [
    { html: `
      <p>重计算生成型——Suno（音乐）/ Runway（视频）/ HeyGen（数字人）/ ElevenLabs（语音）/ Midjourney。</p>
      <p><strong>整体结构</strong>（前端不直接等结果 → 丢任务队列 → GPU 慢慢算 → 回调）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">📥</span><span class="ei-label">任务队列</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🎮</span><span class="ei-label">GPU 集群</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">💾</span><span class="ei-label">对象存储</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💳</span><span class="ei-label">按量计费</span>
      </div>
      <p>关键词：GPU 集群推理 / 任务队列 / 生成结果存储 / 版权水印 / 按使用量计费。</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么生成一张图 / 一段视频要排队几秒到几分钟？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          生成模型要在 GPU 上跑几亿次计算——每张 GPU 同时只能处理少量任务。后端把请求丢进<em>消息队列</em>，GPU worker 一个个拿出来跑、结果存对象存储、回调通知前端。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_creator = {
  id: "pt-creator",
  emoji: "🎨",
  title: "创作工具",
  concept: { name: "创作工具后端", explain: "大文件操作型——剪映 / Premiere / Photoshop / Lightroom / Figma / Procreate。" },
  pages: [
    { html: `
      <p>大文件操作型——剪映 / Premiere / Photoshop / Lightroom / Figma / Procreate。</p>
      <p><strong>整体结构</strong>（多数活在客户端做，后端只管文件 + 协作）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">💻</span><span class="ei-label">客户端（撤销栈 / GPU 加速）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">💾</span><span class="ei-label">文件存储 + 版本</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🤝</span><span class="ei-label">协作 / 同步</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🧩</span><span class="ei-label">插件 SDK</span>
      </div>
      <p>关键词：大文件处理 / 撤销 / 重做栈 / 协作 / 同步 / 专业插件 SDK / 本地 GPU 加速 / 版本历史。</p>
      <div class="reveal-card">
        <div class="reveal-q">Photoshop 撤销几十步几乎不卡，怎么做到的？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          每一步操作只记<strong>差量</strong>（这次改了哪几个像素 / 哪条路径），不是每次都存整张图。撤销 = 反向应用差量。栈里几十步加起来比一张原图还小。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_experience = {
  id: "pt-experience",
  emoji: "🎭",
  title: "强体验 / 内容生产类",
  concept: { name: "强体验类产品", explain: "重交互 / 重计算 / 大文件的产品——游戏 / AIGC / 创作工具。" },
  pages: [
    { html: `
      <p>重<strong>交互 + 计算 + 大文件</strong>的产品都归这一类。</p>
      <p>共同特点：客户端复杂、服务器算力 / 带宽要求高、对延迟敏感。</p>
      <p>选一个你最像的看 →</p>
    ` },
  ],
  children: [],
};

// ---- 大类 4：工作工具类 ----

const node_pt_saas = {
  id: "pt-saas",
  emoji: "🏢",
  title: "SaaS / 协作",
  concept: { name: "SaaS 协作后端", explain: "企业订阅型——Notion / Figma / Slack / 飞书 / Linear / Salesforce。" },
  pages: [
    { html: `
      <p>企业订阅型——Notion / Figma / Slack / 飞书 / Linear / Salesforce。</p>
      <p><strong>整体结构</strong>（一套系统给 N 家公司共用 + 数据严格隔离）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">多租户数据库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔐</span><span class="ei-label">SSO 单点登录</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💳</span><span class="ei-label">订阅计费</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📋</span><span class="ei-label">审计日志</span>
      </div>
      <p>关键词：<em>多租户</em> / <em>RBAC</em> / <em>SSO</em> / 订阅计费（Stripe Billing）/ 审计日志 / 实时协同 / <em>CRDT</em>。</p>
      <div class="quiz-card">
        <div class="quiz-q">"Figma 多人同时改一个文件，为什么不会撞？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">谁先点谁优先</button>
          <button class="quiz-opt" type="button" data-correct="true">用 CRDT 这种数学上自动合并的数据结构</button>
          <button class="quiz-opt" type="button" data-correct="false">服务器排队处理</button>
        </div>
        <div class="quiz-result"><em>CRDT</em> 允许各客户端各改各的，合并时数学上保证一致。Figma / Notion / 石墨都用它。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_b2b = {
  id: "pt-b2b",
  emoji: "🏭",
  title: "B2B 工业 / ERP",
  concept: { name: "B2B ERP 后端", explain: "重流程定制型——SAP / 用友 / 钉钉宜搭 / MES 制造 / 低代码平台。" },
  pages: [
    { html: `
      <p>重流程定制型——SAP / 用友 / 钉钉宜搭 / MES 制造 / 低代码平台。</p>
      <p><strong>整体结构</strong>（核心是工作流引擎 + 对接 N 个老系统）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端（可配置）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">⚙️</span><span class="ei-label">工作流引擎</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">数据库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔐</span><span class="ei-label">权限矩阵</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔗</span><span class="ei-label">老 OA / 财务 / ERP 对接</span>
      </div>
      <p>关键词：复杂<em>工作流引擎</em> / 审批流 / 报表 / 权限矩阵 / 定制能力 / 对接老 OA / 财务系统。</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么 SAP 卖一套要几百万到几千万？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          每家公司的流程都不一样——SAP 要支撑工作流引擎 + 审批配置 + 权限矩阵 + 报表 + 二次开发 + 对接老系统。一套上线要数百人月做配置 + 培训 + 数据迁移。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_bi = {
  id: "pt-bi",
  emoji: "📊",
  title: "数据 / BI",
  concept: { name: "数据 BI 后端", explain: "公司高层每天看的数据看板、报表系统、用户行为分析——Tableau / Metabase / Looker。" },
  pages: [
    { html: `
      <p>报表分析型——公司高层每天看的数据看板、报表系统、用户行为分析。Tableau / Metabase / Looker / Mixpanel。</p>
      <p><strong>整体结构</strong>（业务库的数据搬到分析库，再画图）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🗃️</span><span class="ei-label">业务库（OLTP）</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">⚙️</span><span class="ei-label">ETL 搬运</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🏬</span><span class="ei-label">数据仓库（OLAP）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">BI API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">📊</span><span class="ei-label">看板前端</span>
      </div>
      <p>关键词：<em>数据仓库</em>（BigQuery / ClickHouse / Snowflake）/ <em>ETL</em> / <em>OLAP</em> vs <em>OLTP</em> / 数据看板 / <em>埋点</em>。</p>
      <div class="quiz-card">
        <div class="quiz-q">"为什么不直接从业务库画看板？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">省事</button>
          <button class="quiz-opt" type="button" data-correct="true">大查询会拖垮业务库 / 影响真实用户</button>
          <button class="quiz-opt" type="button" data-correct="false">数据仓库免费</button>
        </div>
        <div class="quiz-result"><em>OLTP</em> 扛在线请求；<em>OLAP</em> 扛聚合查询——两套库分工。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_hr = {
  id: "pt-hr",
  emoji: "💼",
  title: "求职 / 招聘",
  concept: { name: "求职招聘后端", explain: "双边匹配型——BOSS 直聘 / LinkedIn / 智联 / 拉勾。" },
  pages: [
    { html: `
      <p>双边匹配型——BOSS 直聘 / LinkedIn / 智联 / 拉勾。</p>
      <p><strong>整体结构</strong>（双端 + 解析 + 撮合）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">求职者端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🏢</span><span class="ei-label">企业端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">简历 / 岗位库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📄</span><span class="ei-label">简历解析</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🤖</span><span class="ei-label">双向匹配推荐</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💬</span><span class="ei-label">聊天</span>
      </div>
      <p>关键词：<em>简历解析</em> / 双向匹配推荐 / 聊天功能 / 招聘流程管理 / 企业认证。</p>
      <div class="reveal-card">
        <div class="reveal-q">你扔个 PDF 简历上去，BOSS 怎么知道你"3 年 Java 经验、住北京"？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          <em>简历解析</em>：用 OCR + NLP 模型从 PDF / Word 里抽出工作经历、技能、教育、地点 → 转成结构化字段存数据库 → 才能和岗位做匹配。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_edu = {
  id: "pt-edu",
  emoji: "📚",
  title: "教育 / 学习",
  concept: { name: "教育学习后端", explain: "学习进度型——Coursera / 多邻国 / 网易云课堂 / Khan Academy / 各种刷题 App。" },
  pages: [
    { html: `
      <p>学习进度型——Coursera / 多邻国 / 网易云课堂 / Khan Academy / 各种刷题 App。</p>
      <p><strong>整体结构</strong>（看视频 + 做题 + 记进度）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">课程 / 题库 / 进度</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🎬</span><span class="ei-label">视频 CDN + 防盗版</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🧠</span><span class="ei-label">间隔重复算法</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🏅</span><span class="ei-label">证书系统</span>
      </div>
      <p>关键词：视频播放（<em>CDN</em> + 防盗版）/ 测试 / 错题本 / 进度追踪 / 证书发放 / 答疑社区 / <em>间隔重复</em> 算法。</p>
      <div class="reveal-card">
        <div class="reveal-q">多邻国 / Anki 为什么每天都让你复习一点旧的？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          <em>间隔重复</em>算法（SRS）：根据你每个知识点的答对 / 答错记录、动态算"下次什么时候让你再复习"——快忘的时候刚好再出现一次，记忆最深。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_email = {
  id: "pt-email",
  emoji: "📧",
  title: "邮件 / 日历",
  concept: { name: "邮件日历后端", explain: "标准协议型——Outlook / Gmail / Apple Mail / 超人邮箱 / Spike。" },
  pages: [
    { html: `
      <p>标准协议型——Outlook / Gmail / Apple Mail / 超人邮箱 / Spike。</p>
      <p><strong>整体结构</strong>（你的 App 是客户端，邮件其实在邮箱服务器上）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">客户端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">📥</span><span class="ei-label">IMAP（收）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📤</span><span class="ei-label">SMTP（发）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🖥️</span><span class="ei-label">邮件服务器</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🛡️</span><span class="ei-label">垃圾邮件过滤</span>
      </div>
      <p>关键词：<em>IMAP</em> / <em>SMTP</em>（收发协议）/ 垃圾邮件过滤 / 附件 / 推送 / 跨设备同步 / 统一收件箱。</p>
      <div class="matching-game">
        <div class="match-hint">连一连邮件干啥用什么 ↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">从邮箱服务器收信</div>
            <div class="match-item" data-match="B">把邮件发出去</div>
            <div class="match-item" data-match="C">新邮件不用刷新就到</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="C">推送（IMAP IDLE）</div>
            <div class="match-item" data-match="A">IMAP</div>
            <div class="match-item" data-match="B">SMTP</div>
          </div>
        </div>
        <div class="match-done">✓</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_search = {
  id: "pt-search",
  emoji: "🔍",
  title: "搜索 / 浏览器",
  concept: { name: "搜索浏览器后端", explain: "信息检索型——Google / 百度 / Bing / Brave / Arc / DuckDuckGo。" },
  pages: [
    { html: `
      <p>信息检索型——Google / 百度 / Bing / Brave / Arc / DuckDuckGo。</p>
      <p><strong>整体结构</strong>（一直爬全网 → 建索引 → 用户查的时候排序）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">🕸️</span><span class="ei-label">爬虫（爬全网）</span>
        <span class="ei-arrow">→</span>
        <span class="ei-emoji">🔍</span><span class="ei-label">倒排索引</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">查询服务</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📊</span><span class="ei-label">排序模型（PageRank + 多信号）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
      </div>
      <p>关键词：爬虫 / 索引 / 排序（<em>PageRank</em>）/ 查询解析 / 广告系统 / 隐私保护。</p>
      <div class="reveal-card">
        <div class="reveal-q">你搜"咖啡店"——Google 怎么知道哪个网页该排第一？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          经典思路 <em>PageRank</em>：一个网页被越多"高质量"网页链接到 → 它就越重要。再加内容相关度 / 点击行为 / 几百个其他信号综合算出排序。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_work = {
  id: "pt-work",
  emoji: "🗂️",
  title: "工作 / 工具类",
  concept: { name: "工作工具类产品", explain: "面向公司 / 工作场景的产品——SaaS / ERP / BI / 招聘 / 教育 / 邮件 / 搜索。" },
  pages: [
    { html: `
      <p>面向<strong>公司 / 工作 / 效率场景</strong>的产品都归这一类。</p>
      <p>共同特点：多用户协同、流程 / 权限 / 报表是核心。</p>
      <p>选一个你最像的看 →</p>
    ` },
  ],
  children: [],
};

// ---- 大类 5：强合规重型 ----

const node_pt_finance = {
  id: "pt-finance",
  emoji: "💰",
  title: "金融 / FinTech",
  concept: { name: "金融 FinTech 后端", explain: "强合规型——支付宝 / 招行 App / Robinhood / Stripe / 加密钱包。" },
  pages: [
    { html: `
      <p>强合规型——支付宝 / 招行 App / Robinhood / Stripe / 加密钱包 / 理财平台。</p>
      <p><strong>整体结构</strong>（每一步都被风控 + KYC 审查 + 对银行系统结算）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🛡️</span><span class="ei-label">风控引擎</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">✅</span><span class="ei-label">KYC 实名</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">账户库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🏦</span><span class="ei-label">银行 / 清算接口</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📋</span><span class="ei-label">监管报表</span>
      </div>
      <p>关键词：强合规 / <em>风控</em>反洗钱 / <em>KYC</em> 实名审核 / 清算对账（钱算到分）/ 灾备多活 / 监管报表 / 跨境支付。</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么银行 App 大额转账时要刷脸 + 短信码 + 提示"风控审核"？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          后台<em>风控</em>系统实时跑：你的设备 / 位置 / 金额 / 收款方风险 / 当日累计——任何一项异常就触发额外验证。<em>KYC</em>（Know Your Customer）+ 反洗钱是金融合规硬要求。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_medical = {
  id: "pt-medical",
  emoji: "🏥",
  title: "健康 / 医疗",
  concept: { name: "健康医疗后端", explain: "敏感数据型——好大夫 / 丁香 / Keep / Strava / HealthKit / 心理咨询 App。" },
  pages: [
    { html: `
      <p>敏感数据型——好大夫 / 丁香 / Keep / Strava / HealthKit / 心理咨询 App。</p>
      <p><strong>整体结构</strong>（双端 + 强加密数据 + 保险 / 设备对接）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">用户端</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">👨‍⚕️</span><span class="ei-label">医生端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">病历库（强加密）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">⌚</span><span class="ei-label">可穿戴同步</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🏥</span><span class="ei-label">保险 / 医院对接</span>
      </div>
      <p>关键词：个人健康数据强隐私（<em>HIPAA</em> / 国内等保）/ 医生-患者两端 / 保险对接 / 可穿戴设备同步 / 电子病历。</p>
      <div class="quiz-card">
        <div class="quiz-q">"为什么 Keep / Apple Health 不能随便把你心率数据分享给别的 App？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">嫌麻烦</button>
          <button class="quiz-opt" type="button" data-correct="true">受医疗隐私法规约束——任何健康数据流转都要明确授权 + 审计</button>
          <button class="quiz-opt" type="button" data-correct="false">数据值钱不愿给</button>
        </div>
        <div class="quiz-result">美国叫 <em>HIPAA</em>、国内叫等保 + 个人信息保护法——医疗数据是最高级别敏感数据。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_govt = {
  id: "pt-govt",
  emoji: "🏛️",
  title: "政府 / 公共服务",
  concept: { name: "政府公共服务后端", explain: "国家级稳定型——健康码 / 个税 / 医保 / 12345 / 国家政务。" },
  pages: [
    { html: `
      <p>国家级稳定型——健康码 / 个税 / 医保 / 12345 / 国家政务。</p>
      <p><strong>整体结构</strong>（实名 + 多活灾备 + 全国产化栈）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">API</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">✅</span><span class="ei-label">公安实名认证</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗃️</span><span class="ei-label">多活灾备数据库</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🇨🇳</span><span class="ei-label">信创栈（国产化）</span>
      </div>
      <p>关键词：实名（身份证 / 公安认证）/ 超大稳定性（不能崩）/ 数据合规 / 信创栈（国产化）/ 不依赖外国云。</p>
      <div class="reveal-card">
        <div class="reveal-q">健康码高峰时全国十几亿人同时扫，为什么从来不崩？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          多活灾备（一个机房挂了瞬间切到另一个）+ 全国按省分库分压 + 极简接口（只查不写复杂逻辑）+ 多级<em>缓存</em>挡住 99% 请求。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_regulated = {
  id: "pt-regulated",
  emoji: "🔐",
  title: "强合规 / 重型类",
  concept: { name: "强合规重型产品", explain: "受法律 / 行业监管的产品——金融 / 医疗 / 政府公共服务。" },
  pages: [
    { html: `
      <p>受<strong>法律 / 行业监管</strong>的产品都归这一类。</p>
      <p>共同特点：数据隐私要求极高、稳定性要求极高、合规审计是硬指标。</p>
      <p>选一个你最像的看 →</p>
    ` },
  ],
  children: [],
};

// ---- 大类 6：前沿 / 个人 ----

const node_pt_ai_app = {
  id: "pt-ai-app",
  emoji: "🤖",
  title: "AI 套壳应用",
  concept: { name: "AI 套壳应用后端", explain: "基于 GPT / Claude / Gemini 做的应用——chatbot / 文案工具 / AI 客服 / AI 写代码。" },
  pages: [
    { html: `
      <p>基于 GPT / Claude / Gemini 做的应用——chatbot / 文案工具 / AI 客服 / AI 写代码 / Perplexity / Character.ai。</p>
      <p><strong>整体结构</strong>（你的后端是个"中转 + 加私有知识"层）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端（流式 UI）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🔌</span><span class="ei-label">你的后端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🤖</span><span class="ei-label">LLM API</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗄️</span><span class="ei-label">向量数据库（RAG）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔧</span><span class="ei-label">Tool use 工具</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">💳</span><span class="ei-label">按 token 计费</span>
      </div>
      <p>关键词：<em>LLM API</em> / Streaming（流式返回）/ token 计费 / <em>Embedding</em> / <em>向量数据库</em> / <em>RAG</em>（检索增强）/ <em>Agent</em> / <em>Tool use</em>。</p>
      <div class="matching-game">
        <div class="match-hint">连一连 ↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">让 AI 知道你公司内部资料</div>
            <div class="match-item" data-match="B">让 AI 能调你的 API 做事</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="B">Tool use</div>
            <div class="match-item" data-match="A">RAG + 向量数据库</div>
          </div>
        </div>
        <div class="match-done">✓</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_web3 = {
  id: "pt-web3",
  emoji: "🪙",
  title: "区块链 / Web3",
  concept: { name: "区块链 Web3 后端", explain: "链上交互型——MetaMask / OpenSea / Uniswap / Lens / NFT 市场。" },
  pages: [
    { html: `
      <p>链上交互型——MetaMask / OpenSea / Uniswap / Lens / NFT 市场。</p>
      <p><strong>整体结构</strong>（没有传统中心服务器，所有"账本"在链上）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">👛</span><span class="ei-label">钱包前端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🌐</span><span class="ei-label">区块链节点</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">📜</span><span class="ei-label">智能合约</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🗂️</span><span class="ei-label">IPFS（大文件）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">📊</span><span class="ei-label">链上数据索引（The Graph）</span>
      </div>
      <p>关键词：链上交互（<em>智能合约</em>调用）/ 签名（私钥不出本机）/ <em>Gas 费</em> / 跨链桥 / 节点同步 / 链上数据索引（The Graph）/ IPFS。</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么用 MetaMask 转一笔小额都要付 <em>Gas 费</em>？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          区块链没有"中心服务器"——你的转账要让全网节点验证 + 写进新区块。出力的矿工 / 验证者要拿报酬——这就是 <em>Gas 费</em>，按你这笔交易占的计算量算。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_iot = {
  id: "pt-iot",
  emoji: "🏘️",
  title: "IoT 智能家居",
  concept: { name: "IoT 智能家居后端", explain: "设备控制型——米家 / HomeKit / Google Home / Aqara。" },
  pages: [
    { html: `
      <p>设备控制型——米家 / HomeKit / Google Home / Aqara。</p>
      <p><strong>整体结构</strong>（手机 ↔ 云 ↔ 设备 都靠长连接保持）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">手机控制端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">☁️</span><span class="ei-label">云端</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">🌐</span><span class="ei-label">长连接</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">💡</span><span class="ei-label">设备（灯 / 空调 / 门锁）</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🤖</span><span class="ei-label">场景联动引擎</span>
      </div>
      <p>关键词：设备配网（蓝牙 / Wi-Fi）/ <em>长连接</em>控制 / 场景联动（"回家"自动开灯）/ 多用户分享 / <em>Matter</em>（跨厂家协议）。</p>
      <div class="reveal-card">
        <div class="reveal-q">米家怎么让全屋几十个设备一起响应"我回家了"？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          每个设备都和米家云保持<em>长连接</em>。你触发"回家"场景 → 云端按你预设的列表，给灯 / 空调 / 窗帘 / 音响各推一条指令——几乎同时响应。新出的 <em>Matter</em> 协议让不同厂家设备能互通。
        </div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_personal_tool = {
  id: "pt-personal-tool",
  emoji: "📝",
  title: "工具 / 笔记 / 个人",
  concept: { name: "个人工具后端", explain: "本地优先型——Obsidian / Bear / 番茄钟 / Todo / 翻译 / OCR / 计算器 / 习惯打卡。" },
  pages: [
    { html: `
      <p>本地优先型——Obsidian / Bear / 番茄钟 / Todo / 翻译 / OCR / 计算器 / 习惯打卡。</p>
      <p><strong>整体结构</strong>（通常不要后端：前端 + 本地存储就够；做大才加同步）：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">📱</span><span class="ei-label">前端（HTML/CSS/JS）</span>
        <span class="ei-arrow">↔</span>
        <span class="ei-emoji">💾</span><span class="ei-label">本地存储（IndexedDB）</span>
      </div>
      <p>做大了再加：</p>
      <div class="emoji-illust">
        <span class="ei-emoji">☁️</span><span class="ei-label">云同步服务</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔐</span><span class="ei-label">端到端加密</span>
        <span class="ei-arrow">+</span>
        <span class="ei-emoji">🔔</span><span class="ei-label">推送提醒</span>
      </div>
      <p>关键词：<em>本地存储</em>就够（IndexedDB / SQLite）/ <em>Markdown</em> / <em>双向链接</em> / 做大才加云同步 / 端到端加密。</p>
      <div class="quiz-card">
        <div class="quiz-q">"我想做个习惯打卡 App，需要后端吗？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="true">不一定——本地存储就够，做大才加云同步</button>
          <button class="quiz-opt" type="button" data-correct="false">必须微服务架构</button>
          <button class="quiz-opt" type="button" data-correct="false">必须区块链</button>
        </div>
        <div class="quiz-result">大多个人工具<strong>本地存储就够</strong>。后端是为多用户 / 多端同步 / 数据安全才加的——单机自用先别上。</div>
      </div>
    ` },
  ],
  children: [],
};

const node_pt_emerging = {
  id: "pt-emerging",
  emoji: "🔮",
  title: "前沿 / 个人类",
  concept: { name: "前沿 / 个人类产品", explain: "新兴技术类 + 个人工具类——AI 套壳 / Web3 / IoT / 笔记打卡。" },
  pages: [
    { html: `
      <p><strong>新兴技术 + 个人工具</strong>两类放一起：要么用最新模型 / 协议、要么足够简单本地就能跑。</p>
      <p>选一个你最像的看 →</p>
    ` },
  ],
  children: [],
};

// ---- 把 6 大类挂到 product_types 入口 + 各大类下挂具体产品类 ----

node_pt_consumer.children = [
  node_pt_ecommerce,
  node_pt_delivery,
  node_pt_travel,
  node_pt_property,
  node_pt_mobility,
];
node_pt_social.children = [
  node_pt_social_feed,
  node_pt_im,
  node_pt_video,
  node_pt_news,
];
node_pt_experience.children = [
  node_pt_game,
  node_pt_aigc,
  node_pt_creator,
];
node_pt_work.children = [
  node_pt_saas,
  node_pt_b2b,
  node_pt_bi,
  node_pt_hr,
  node_pt_edu,
  node_pt_email,
  node_pt_search,
];
node_pt_regulated.children = [
  node_pt_finance,
  node_pt_medical,
  node_pt_govt,
];
node_pt_emerging.children = [
  node_pt_ai_app,
  node_pt_web3,
  node_pt_iot,
  node_pt_personal_tool,
];

node_product_types.children = [
  node_pt_consumer,
  node_pt_social,
  node_pt_experience,
  node_pt_work,
  node_pt_regulated,
  node_pt_emerging,
];

// ============================================================
// v14：把这几个主题入口加进 SHARED_NODES，让 root 的"跳转选项"能引用它们
// ref 机制：一个节点可被多父连入。这里 root 通过 ref 给用户提供"绕过基础链直接跳到主题"的快速入口
// ============================================================
SHARED_NODES["tools-entry"] = node_tools_entry;
SHARED_NODES["platform-pick"] = node_platform_pick;
SHARED_NODES["product-types"] = node_product_types;
