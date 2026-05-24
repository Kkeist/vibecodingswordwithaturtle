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
      <p>程序里没修好的错误叫 <em>bug</em>（英文意思是"虫子"）。整个"找 bug + 修 bug" 的过程叫<em>调试</em>（英文 <em>debug</em>）。</p>
      <p>常见报错关键词：</p>
      <ul>
        <li><em>TypeError</em>：类型错了（你把数字当函数调）</li>
        <li><em>ReferenceError</em>：变量没定义就用</li>
        <li><em>SyntaxError</em>：语法写错（括号没配对、漏分号）</li>
        <li><em>undefined is not a function</em>：你以为是函数其实啥也不是</li>
        <li><em>Cannot read property X of undefined</em>：对着空的东西取属性</li>
      </ul>
      <p>看不懂报错就把红字整段复制问 AI——比自己猜快十倍。</p>
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
      <p>报错里出现「X is undefined」一般是：你以为某变量有值其实没有。</p>
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
      <p>看懂这几个，AI 跟你说什么、报错说什么，能听懂大半。</p>
      <p>你不一定要会自己写——但这些名词得知道是什么。</p>
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
  children: [node_git, node_prompt],
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
      <p>看 vibe coding 评论说"完整电商系统要微服务架构、注册中心、熔断限流、分库分表、消息队列"——这都什么？</p>
      <p>你做小项目，全装一个程序里就行，叫<em>单体应用</em>（<em>monolith</em>）。</p>
      <p>用户量上几十万到几百万——单体扛不住，开始拆。</p>
      <p>下面这些概念都是"为了扛大流量 / 不崩溃"加进来的。先翻几页看个大概，记住"小项目用不到"。</p>
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
  children: [{ ref: "shared-server" }, node_localhost],
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
  children: [node_fe_be, node_framework],
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
  children: [node_web_trio, node_dns, node_other_web],
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
  emoji: "🐍",
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
  children: [{ ref: "shared-server" }],
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
  children: [node_deploy_server],
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
  children: [node_api_http_server],
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
        <span class="ei-emoji">🕷️</span>
        <span class="ei-label">爬虫</span>
        <span class="ei-emoji">🧠</span>
        <span class="ei-label">AI 后端</span>
      </div>
      <p>没有用户界面、自己在服务器上一直跑的程序，叫<em>后台服务</em>。</p>
      <p>用户不直接看到它，但它一直在工作。</p>
    ` },
  ],
  children: [node_database_server, node_big_arch],
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
  "undefined is not a function": "你以为是函数其实啥都不是（值是 undefined）。",
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
  "API": "程序之间约定的请求格式。调 GPT、调微信、查天气都是按对方的 API 发请求。",
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
  "LLM": "Large Language Model——大语言模型（Claude / GPT / Gemini 都是）。",
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
  "微服务": "把大系统拆成多个独立小服务各跑各的。英文 microservice。",
  "microservice": "微服务——拆成独立小服务。",
  "注册中心": "微服务的「通讯录」——每个服务报自己在哪，别人来查地址。英文 registry。",
  "registry": "注册中心——微服务的通讯录。",
  "服务发现": "微服务通过注册中心找到彼此地址的机制。",
  "Consul": "HashiCorp 的注册中心。",
  "Nacos": "阿里出的注册中心 + 配置中心。",
  "Eureka": "Netflix 出的注册中心，Java 生态。",
  "etcd": "分布式 KV 存储，常做注册中心。Kubernetes 内部就用它。",
  "API gateway": "网关——所有外部请求先到的「前台」，再分发给后面的微服务。",
  "网关": "API gateway——所有外部请求先到的「前台」。",
  "Nginx": "又是 Web 服务器又是反向代理又是负载均衡的多面手，全球使用最广。",
  "Kong": "基于 Nginx 的 API 网关。",
  "Spring Cloud Gateway": "Spring 生态的 API 网关。",
  "APISIX": "开源 API 网关，国内用得多。",
  "限流": "限制每秒最多接多少请求。英文 rate limit。防爬虫 / 防被刷爆。",
  "rate limit": "限流——限制单位时间请求量。",
  "熔断": "下游一直挂就自动暂停调它，避免连锁崩溃。英文 circuit breaker。",
  "circuit breaker": "熔断——断路器，自动暂停调挂的下游。",
  "降级": "核心服务挂了给用户返回兜底数据，不让整页崩。",
  "Sentinel": "阿里开源的限流熔断框架。",
  "Hystrix": "Netflix 出的熔断框架（已停止维护）。",
  "Resilience4j": "Java 生态的熔断库。",
  "缓存": "把热门数据先放内存里下次直接读，秒回。英文 cache。",
  "cache": "缓存——把热门数据放内存里。",
  "消息队列": "异步任务的中转站——发了消息立刻回，后面的事慢慢处理。英文 message queue / MQ。",
  "message queue": "消息队列——异步任务中转站。",
  "MQ": "消息队列（Message Queue）的缩写。",
  "解耦": "把强依赖的模块拆开，一方挂了不影响另一方。",
  "Kafka": "高吞吐量的分布式消息队列，LinkedIn 出的。",
  "RabbitMQ": "经典 AMQP 消息队列。",
  "RocketMQ": "阿里出的消息队列。",
  "NATS": "轻量高性能消息队列。",
  "分表": "把一张大表按规则拆成多张小表分散查询压力。英文 sharding。",
  "sharding": "分表 / 分片——把数据拆成多块。",
  "分库": "把数据库拆到多台机器上。",
  "读写分离": "写一台主库，读分散到多台从库。读多写少时能扛更多。",
  "master": "主库——可读可写。",
  "slave": "从库——只读，数据从主库同步过来。",
  "replica": "副本——从库的别名。",
  "container": "容器——把程序 + 依赖打包成一个标准盒子。",
  "容器": "container——把程序 + 依赖打包成标准盒子。",
  "Docker": "最流行的容器工具。",
  "image": "镜像——装好的容器盒子的快照，能复制无数份。",
  "镜像": "image——容器的快照模板。",
  "Kubernetes": "管理几百几千个容器的工具——挂了自动重启、流量大自动加机器。简称 K8s。",
  "K8s": "Kubernetes 缩写（K 和 s 之间 8 个字母）。",
  "负载均衡": "一个入口把流量分摊给后面几台机器。英文 load balancer。",
  "load balancer": "负载均衡——流量分摊器。",
  "反向代理": "用户访问的不是真实服务器而是中间层，中间层再去问真实服务器。英文 reverse proxy。",
  "reverse proxy": "反向代理——用户和真实服务器之间的中间层。",
  "CDN": "Content Delivery Network——把静态文件分发到全球各地节点，用户从最近的拿。",
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
};

// ====== root ======

const TREE_DATA = {
  id: "root",
  emoji: "💡",
  title: "我想做一个东西！",
  pages: [
    {
      html: `
        <p>头两条是<strong>基础准备</strong>（代码概念 / 开发工具）；底下 6 条按<strong>跑在哪</strong>分。挑一条开始。</p>
      `,
    },
  ],
  children: [
    node_basics_entry,
    node_tools_entry,
    node_where_web,
    node_where_desktop,
    node_where_mobile,
    node_where_cli,
    node_where_server,
    node_where_hardware,
  ],
};
