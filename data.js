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
  concept: { name: "产品类型与所需后端能力", explain: "电商 / 社交 / 直播 / 游戏 / IM / SaaS / AI 套壳 / 数据 BI——每类有它特有的技术名词和系统。" },
  pages: [
    { html: `
      <p><strong>🛒 电商 / 交易类</strong>（淘宝、京东、Shopify、Etsy、各种小程序商城）</p>
      <div class="reveal-card">
        <div class="reveal-q">这类产品最难搞的是什么？想想再点击揭晓。</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          ① 库存不能超卖 ② 钱不能算错 / 丢单 ③ 优惠玩法（满减 / 优惠券 / 限时折扣）规则极复杂 ④ 物流接口要对接好几家
        </div>
      </div>
      <p>特殊名词：<em>SKU</em>（一个具体规格商品）、<em>库存预占</em>（下单先锁库存）、<em>订单状态机</em>（待支付/已支付/已发货/退款）、<em>支付回调</em>（钱到账后通知系统）、<em>风控</em>（防薅羊毛 / 刷单）、<em>推荐引擎</em>。</p>
      <div class="matching-game">
        <div class="match-hint">把「问题」和「对应技术」连起来 ↓</div>
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
        <div class="match-done">全对，可以走了 →</div>
      </div>
    ` },
    { html: `
      <p><strong>💬 社交 / 内容平台类</strong>（微博、小红书、即刻、Twitter / X、知乎）</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么打开微博能立刻看到几亿用户里你关注的最新动态？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          底下有 <em>Feed 流</em> 系统：要么"写扩散"（你发一条 → 复制到所有粉丝的收件箱）、要么"读扩散"（粉丝刷新时 → 拉取所有关注人最新发的）。明星用读扩散、普通用户用写扩散，混着来。
        </div>
      </div>
      <p>特殊名词：<em>关系链</em>（关注 / 粉丝）、<em>Feed 流</em>（写扩散 vs 读扩散）、<em>推送系统</em>、<em>内容审核</em>（敏感词 / AI 鉴黄 / 人工复审）、<em>推荐算法</em>（协同过滤 / 用户画像）。</p>
      <div class="quiz-card">
        <div class="quiz-q">"我刷小红书首页那些'猜你喜欢'是怎么来的？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">编辑手动挑的</button>
          <button class="quiz-opt" type="button" data-correct="true">推荐算法看你的点赞 / 停留 / 搜索算出来的</button>
          <button class="quiz-opt" type="button" data-correct="false">完全随机</button>
        </div>
        <div class="quiz-result">推荐算法 + 用户画像 + 协同过滤。大平台都靠这个。</div>
      </div>
    ` },
    { html: `
      <p><strong>🎬 视频 / 直播 / 音频类</strong>（B 站、抖音、YouTube、虎牙、Twitch、Spotify、播客）</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么全世界看视频几乎不卡？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          每个视频提前转成几种清晰度（自动切换），然后 push 到全球 <em>CDN</em> 节点。你看的时候从最近的节点拿——延迟低 + 不占源站带宽。
        </div>
      </div>
      <p>特殊名词：<em>CDN</em>（内容分发网络）、<em>转码</em>（同一个视频出 4 种清晰度）、<em>HLS</em> / <em>DASH</em>（视频切片协议）、<em>RTMP</em>（直播推流）、<em>WebRTC</em>（实时音视频）、<em>DRM</em>（版权保护）、<em>弹幕系统</em>（万人同时发不能崩）。</p>
      <div class="matching-game">
        <div class="match-hint">连一连 ↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">主播推流到平台</div>
            <div class="match-item" data-match="B">观众拉视频看</div>
            <div class="match-item" data-match="C">视频网站防盗版</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="B">CDN + HLS</div>
            <div class="match-item" data-match="C">DRM</div>
            <div class="match-item" data-match="A">RTMP 推流</div>
          </div>
        </div>
        <div class="match-done">全对 →</div>
      </div>
    ` },
    { html: `
      <p><strong>🎮 游戏后端</strong>（王者荣耀、原神、CSGO、Fall Guys）</p>
      <div class="reveal-card">
        <div class="reveal-q">两人 PK 时，怎么保证你们看到的画面是一致的？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          两种打法：① <em>帧同步</em>——只同步玩家操作，各自客户端按相同规则算出相同画面（MOBA 类常用）。② <em>状态同步</em>——服务器是唯一仲裁，所有人都根据服务器发的状态渲染（射击 / MMO 常用）。
        </div>
      </div>
      <p>特殊名词：<em>匹配引擎</em>（按段位 / 延迟 / 等待时间凑齐人）、<em>帧同步</em> / <em>状态同步</em>、<em>录像回放</em>、<em>反外挂</em>（行为检测 + 内存校验）、<em>虚拟经济</em>（金币 / 钻石 / 商城）。</p>
      <div class="quiz-card">
        <div class="quiz-q">"为什么我在国服打外服延迟那么高？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">你电脑太慢</button>
          <button class="quiz-opt" type="button" data-correct="true">游戏服务器在国外，每个数据包在地球上跑一圈才回来</button>
          <button class="quiz-opt" type="button" data-correct="false">游戏 bug</button>
        </div>
        <div class="quiz-result">物理距离决定网络延迟下限。大厂用全球分布的<em>区服</em>就是为了解决这个。</div>
      </div>
    ` },
    { html: `
      <p><strong>💬 通讯 / IM 类</strong>（微信、QQ、Discord、Slack、Telegram、钉钉）</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么微信发一条消息能秒到？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          手机和服务器之间一直保持着<em>长连接</em>（不是每次发消息才建连接）。你发的消息推服务器、服务器立刻把它推给对方那条长连接。
        </div>
      </div>
      <p>特殊名词：<em>长连接</em>（<em>WebSocket</em> / <em>TCP 长连</em>）、<em>消息存储</em>（离线消息不丢）、<em>已读回执</em>、<em>群聊</em>（万人群消息扇出）、<em>E2EE 端到端加密</em>（服务器都看不到内容）、<em>WebRTC</em>（音视频通话）。</p>
      <div class="matching-game">
        <div class="match-hint">连一连 ↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">秒收消息</div>
            <div class="match-item" data-match="B">视频通话</div>
            <div class="match-item" data-match="C">只你和对方看得到</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="C">端到端加密</div>
            <div class="match-item" data-match="A">WebSocket 长连</div>
            <div class="match-item" data-match="B">WebRTC</div>
          </div>
        </div>
        <div class="match-done">全对 →</div>
      </div>
    ` },
    { html: `
      <p><strong>🏢 SaaS / 协作工具类</strong>（Notion、Figma、Slack、飞书、Salesforce、Linear）</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么这些"企业版"软件比个人版贵 10 倍？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          要做<em>多租户</em>（每家公司数据严格隔离）、<em>角色权限</em>（员工不同等级看到的不一样）、<em>SSO 单点登录</em>（公司内部一套账号通用）、<em>审计日志</em>（合规需要）。这些都贵。
        </div>
      </div>
      <p>特殊名词：<em>多租户</em>（一份代码服务多家公司）、<em>RBAC</em>（角色权限）、<em>SSO 单点登录</em> / <em>SAML</em>、<em>订阅计费</em>（<em>Stripe Billing</em> / <em>Paddle</em>）、<em>审计日志</em>、<em>实时协同</em>（多人同时改一个文档）、<em>CRDT</em>（冲突自动合并的数据结构）。</p>
      <div class="quiz-card">
        <div class="quiz-q">"Figma 多人同时改一个文件，为什么不会撞？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">谁先点谁优先</button>
          <button class="quiz-opt" type="button" data-correct="true">用 CRDT 这种数学上自动合并的数据结构</button>
          <button class="quiz-opt" type="button" data-correct="false">服务器排队处理</button>
        </div>
        <div class="quiz-result"><em>CRDT</em>（Conflict-free Replicated Data Type）允许各客户端各改各的，合并时数学上保证一致。Figma / Notion / 石墨都用它。</div>
      </div>
    ` },
    { html: `
      <p><strong>🤖 AI 套壳应用</strong>（基于 GPT / Claude / Gemini 做的 App——chatbot、文案工具、AI 客服、AI 写代码）</p>
      <div class="reveal-card">
        <div class="reveal-q">为什么 ChatGPT 不知道你公司内部文档？怎么让它知道？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          AI 模型本身没学过你公司的资料。做法：把你公司文档切成小段、变成<em>embedding</em>向量存进<em>向量数据库</em>；用户问问题时先查最相关的几段、塞进 prompt 给 AI。这套叫 <em>RAG</em>（检索增强生成）。
        </div>
      </div>
      <p>特殊名词：<em>LLM API</em>（调 OpenAI / Anthropic / Google）、<em>Streaming</em>（流式回复，字一个个吐）、<em>token 计费</em>、<em>Embedding</em>（把文字变成向量）、<em>向量数据库</em>（<em>Pinecone</em> / <em>Qdrant</em> / <em>Weaviate</em> / <em>pgvector</em>）、<em>RAG</em>（检索增强生成）、<em>Agent</em> / <em>Tool use</em>（让 AI 调外部工具）、<em>Prompt 工程</em>。</p>
      <div class="matching-game">
        <div class="match-hint">连一连 ↓</div>
        <div class="match-rows">
          <div class="match-col">
            <div class="match-item" data-match="A">让 AI 知道私有资料</div>
            <div class="match-item" data-match="B">字一个个慢慢吐</div>
            <div class="match-item" data-match="C">让 AI 调你写的 API</div>
          </div>
          <div class="match-col">
            <div class="match-item" data-match="C">Tool use / Function calling</div>
            <div class="match-item" data-match="A">RAG + 向量数据库</div>
            <div class="match-item" data-match="B">Streaming</div>
          </div>
        </div>
        <div class="match-done">全对 →</div>
      </div>
    ` },
    { html: `
      <p><strong>📊 数据 / BI / 后台分析</strong>（公司高层每天看的数据看板、报表系统、用户行为分析）</p>
      <div class="reveal-card">
        <div class="reveal-q">公司每天看的"昨日新增用户 / 留存率 / 销售额"，数据从哪来？</div>
        <button class="reveal-btn" type="button">揭晓 →</button>
        <div class="reveal-a" hidden>
          线上业务库（MySQL / PostgreSQL）的数据每天 / 每小时通过 <em>ETL</em> 流程"搬"到一个专门做分析的<em>数据仓库</em>（如 BigQuery / ClickHouse / Snowflake）；BI 工具（Tableau / Metabase / 自研看板）从数据仓库查、画图。
        </div>
      </div>
      <p>特殊名词：<em>数据仓库</em>（<em>BigQuery</em> / <em>ClickHouse</em> / <em>Snowflake</em>）、<em>ETL</em>（Extract Transform Load 数据搬运）、<em>OLAP</em>（分析型数据库）vs <em>OLTP</em>（业务型）、<em>数据看板</em>（<em>Tableau</em> / <em>Metabase</em> / <em>Superset</em>）、<em>埋点</em>（前端记录用户行为）、<em>ECharts</em> / <em>Grafana</em>（画图库）。</p>
      <div class="quiz-card">
        <div class="quiz-q">"为什么不直接从业务数据库查数据画看板？"</div>
        <div class="quiz-opts">
          <button class="quiz-opt" type="button" data-correct="false">省事，没必要分两个库</button>
          <button class="quiz-opt" type="button" data-correct="true">复杂分析查询会把业务数据库拖垮，影响真实用户用产品</button>
          <button class="quiz-opt" type="button" data-correct="false">数据仓库免费</button>
        </div>
        <div class="quiz-result"><em>OLTP</em>（业务数据库）扛在线请求；<em>OLAP</em>（数据仓库）扛大型聚合查询——两套库分工。</div>
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
